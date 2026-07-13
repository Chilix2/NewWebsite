#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Sailly Website — Pexels video assets (July 2026 refresh)
#
# Downloads the 6 new stock videos referenced by the homepage hero sequence,
# the 5-card industry grid and the industry sub-pages, then (optionally)
# compresses them with ffmpeg for web delivery.
#
# Usage:   bash scripts/download-pexels-videos.sh
# Re-run safe: existing files are skipped unless FORCE=1 is set.
#
# All clips are free to use under the Pexels license (no attribution required).
# ---------------------------------------------------------------------------
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/public/videos"
mkdir -p "$DIR"

# target-filename|direct CDN url|pexels page (for reference)
ASSETS=(
  "hero-call-2.mp4|https://videos.pexels.com/video-files/6963826/6963826-uhd_2732_1440_25fps.mp4|https://www.pexels.com/de-de/video/6963826/"
  "hero-call-3.mp4|https://videos.pexels.com/video-files/7189796/7189796-uhd_2560_1080_25fps.mp4|https://www.pexels.com/de-de/video/7189796/"
  "hotel-tea-service.mp4|https://videos.pexels.com/video-files/29532416/12712646_1440_2560_30fps.mp4|https://www.pexels.com/de-de/video/29532416/"
  "hotel-checkin.mp4|https://videos.pexels.com/video-files/4880316/4880316-uhd_2560_1440_25fps.mp4|https://www.pexels.com/de-de/video/4880316/"
  "legal-justice.mp4|https://videos.pexels.com/video-files/6100409/6100409-uhd_1440_2732_30fps.mp4|https://www.pexels.com/de-de/video/6100409/"
  "services-studio.mp4|https://videos.pexels.com/video-files/4786180/4786180-uhd_1440_2560_30fps.mp4|https://www.pexels.com/de-de/video/4786180/"
)

HAVE_FFMPEG=0
command -v ffmpeg >/dev/null 2>&1 && HAVE_FFMPEG=1

compress () {
  # $1 = file. Scale longest edge to 1280px, strip audio, H.264 CRF 28.
  local f="$1" tmp="$1.tmp.mp4"
  ffmpeg -y -loglevel error -i "$f" \
    -vf "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(ih,iw),min(1280,ih),-2)'" \
    -an -c:v libx264 -preset slow -crf 28 -movflags +faststart "$tmp"
  mv "$tmp" "$f"
}

for entry in "${ASSETS[@]}"; do
  IFS='|' read -r name url page <<< "$entry"
  out="$DIR/$name"
  min_bytes=100000  # anything smaller is a placeholder/broken download
  size=$(stat -c%s "$out" 2>/dev/null || echo 0)
  if [[ -s "$out" && "$size" -ge "$min_bytes" && "${FORCE:-0}" != "1" ]]; then
    echo "✓ $name already present ($(du -h "$out" | cut -f1)) — skipping"
    continue
  fi
  echo "↓ $name  ←  $url"
  # Primary: direct CDN file. Fallback: Pexels download redirect.
  if ! curl -fSL --retry 3 -o "$out" "$url"; then
    id="$(echo "$page" | grep -oE '[0-9]+' | tail -1)"
    echo "  primary URL failed, trying https://www.pexels.com/download/video/$id/"
    curl -fSL --retry 3 -o "$out" "https://www.pexels.com/download/video/$id/"
  fi
  if [[ "$HAVE_FFMPEG" == "1" ]]; then
    echo "  compressing for web (1280px, crf28, no audio)…"
    compress "$out"
  fi
  echo "  → $(du -h "$out" | cut -f1)  $out"
done

if [[ "$HAVE_FFMPEG" == "0" ]]; then
  echo ""
  echo "⚠ ffmpeg not found — originals kept in UHD (larger files)."
  echo "  Install ffmpeg and re-run with FORCE=1 to compress:  sudo apt-get install -y ffmpeg"
fi

echo ""
echo "Done. Videos in $DIR:"
ls -lh "$DIR" | awk '{print "  " $9 "\t" $5}' | tail -n +2
