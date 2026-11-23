#!/bin/bash
# Start the Fumu AI Static Site Server
echo "Starting Fumu AI site..."
echo "Open http://127.0.0.1:8080 in your browser."
cd "$(dirname "$0")" && python3 -m http.server 8080 --bind 0.0.0.0
