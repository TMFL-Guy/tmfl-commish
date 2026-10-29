#!/bin/bash
# TMFL Commissioner — local-only web server. Tailscale Serve supplies private HTTPS.
set -e
cd "$(dirname "$0")"
echo "Starting TMFL Commissioner on http://127.0.0.1:8765"
echo "Keep this window open while using the app."
echo "To stop: press Ctrl+C."
python3 -m http.server 8765 --bind 127.0.0.1
