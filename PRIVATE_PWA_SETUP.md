# TMFL Commissioner — Private HTTPS PWA setup

This setup **does not publish the commissioner portal publicly**. Your repository stays private. The local computer serves the app on loopback only; Tailscale Serve makes it available over HTTPS to authorized devices on your private tailnet.

## Prerequisites
- Download the private `TMFL-Guy/tmfl-commish` repository to the Mac or PC that will host the app. Do not place it in a public folder.
- Install [Tailscale](https://tailscale.com/download) on that computer and on each phone/tablet/other computer where you will use the app. Sign in to your own tailnet.
- Restrict membership and access permissions to your own devices/account in the [Tailscale admin console](https://login.tailscale.com/admin/acls). Anyone allowed by your tailnet policy may potentially access Serve.
- Make sure MagicDNS and HTTPS certificates are enabled for your tailnet.

## 1. Start the app locally
On macOS, open Terminal in the downloaded repository folder and run:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

On Windows, open PowerShell in the downloaded repository folder and run:

```powershell
py -m http.server 8765 --bind 127.0.0.1
```

The server must stay running. Verify locally at http://127.0.0.1:8765/index.html. Do not bind to `0.0.0.0`.

## 2. Enable private HTTPS via Tailscale Serve
Open a **second** Terminal/PowerShell window on the hosting computer. Run:

```bash
tailscale serve --bg 8765
tailscale serve status
```

Follow any prompts to enable HTTPS. Open the HTTPS `https://<your-machine>.<your-tailnet>.ts.net` URL printed by Serve **only from a device signed into your tailnet**.

**Never use `tailscale funnel` for this app**: Funnel makes the service public. Verify Serve status and your tailnet access rules before proceeding.

## 3. Install the PWA
- **iPhone/iPad:** connect Tailscale, open the HTTPS Serve URL in Safari, tap Share → Add to Home Screen. Enable Open as Web App if shown.
- **Android:** connect Tailscale, open the HTTPS Serve URL in Chrome, menu → Install app / Add to Home screen.
- **Desktop Chrome/Edge:** connect Tailscale, open the HTTPS Serve URL, use Install app from the address bar or browser menu.

The app uses `manifest.webmanifest`, `sw.js`, and `tmfl-512.png` from this private repository.

## 4. Important limits
- The hosting computer must stay awake, connected to Tailscale, and running the Python server. This is **self-hosting**, not an always-on cloud host.
- **Browser data does not automatically transfer** between `file://`, `localhost`, and your Tailscale HTTPS origin. Back up/import your commissioner data before switching.
- GitHub publishing still requires your GitHub token and uses the separate public `TMFL-Guy/fan-tmfl-portal` repository.
- Do not give anyone else access to your tailnet or private repo. The web app itself does not add a second password screen; Tailscale access rules are its network access control.
- The PWA service worker caches only app metadata/icon, not private dashboard pages or data. The app requires network access.
- Tailscale HTTPS certificate issuance may make the machine/tailnet hostname visible in public certificate transparency logs; **the portal content is not thereby public**.

## 5. Stop or troubleshoot
- Stop the local Python server with Ctrl+C.
- Disable private Serve with `tailscale serve reset` (this resets Serve configuration on the host).
- Check `tailscale serve status` to verify you are using Serve and not Funnel.
- See [Tailscale Serve documentation](https://tailscale.com/docs/features/tailscale-serve).

**Privacy:** The public Fan Portal is unchanged. No GitHub Pages site for this private commissioner repo is required.
