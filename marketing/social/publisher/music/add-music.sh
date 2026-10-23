#!/bin/sh
# Put original Memobrick background music under a silent video.
# Usage: add-music.sh <mood> <in.mp4> <out.mp4> [seed]
# The video stream is copied unchanged; music fades in and out and is
# normalized to -16 LUFS so it sits at a comfortable level on phones.
set -e
mood="$1"; in="$2"; out="$3"
dir=$(dirname "$0")
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
tmp=$(mktemp -d)
python3 "$dir/compose.py" "$mood" "$dur" "$tmp/music.wav" "${4:-7}"
fade_start=$(python3 -c "print(max(0, $dur - 1.5))")
ffmpeg -y -v error -i "$in" -i "$tmp/music.wav" \
  -filter_complex "[1:a]atrim=0:$dur,afade=t=in:d=0.3,afade=t=out:st=$fade_start:d=1.5,loudnorm=I=-16:TP=-1.5:LRA=11[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 128k -ar 44100 -shortest -movflags +faststart "$out"
rm -rf "$tmp"
