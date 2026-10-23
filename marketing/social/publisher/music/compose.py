#!/usr/bin/env python3
"""Original background music for Memobrick videos.

Writes a MIDI file in one of three moods and renders it with FluidSynth and the
FluidR3 GM soundfont (MIT license). The music is composed here, so Memobrick
owns it and it is free to use on every platform.

Usage: compose.py <mood> <seconds> <out.wav>
Moods: playful (reveals, guess the photo), warm (couples, family, gifts),
       chill (build timelapses, satisfying clips).
"""
import random
import subprocess
import sys

import mido

SF2 = "/usr/share/sounds/sf2/FluidR3_GM.sf2"

MOODS = {
    # tempo, key root (MIDI), chord degrees per bar, instruments
    "playful": dict(bpm=112, root=60, prog=[0, 4, 5, 3], lead=12, pad=0, bass=33, drums=True),   # marimba
    "warm": dict(bpm=92, root=62, prog=[0, 5, 3, 4], lead=0, pad=48, bass=32, drums=False),      # piano + strings
    "chill": dict(bpm=84, root=57, prog=[5, 3, 0, 4], lead=4, pad=89, bass=33, drums=True),      # e-piano + warm pad
}
MAJOR = [0, 2, 4, 5, 7, 9, 11]


def triad(root, degree):
    notes = []
    for step in (0, 2, 4):
        d = degree + step
        notes.append(root + MAJOR[d % 7] + 12 * (d // 7))
    return notes


def compose(mood, seconds, path, seed=7):
    """Same mood and seed give the same tune; change the seed for a new one."""
    m = MOODS[mood]
    rnd = random.Random(seed)
    tpb = 480
    beat = tpb
    bars = int(seconds * m["bpm"] / 60 / 4) + 2
    mid = mido.MidiFile(ticks_per_beat=tpb)

    def track(channel, program, vol):
        t = mido.MidiTrack()
        mid.tracks.append(t)
        if channel != 9:
            t.append(mido.Message("program_change", channel=channel, program=program, time=0))
        t.append(mido.Message("control_change", channel=channel, control=7, value=vol, time=0))
        t.append(mido.Message("control_change", channel=channel, control=91, value=50, time=0))
        return t

    tempo = mido.MidiTrack()
    mid.tracks.append(tempo)
    tempo.append(mido.MetaMessage("set_tempo", tempo=mido.bpm2tempo(m["bpm"]), time=0))

    events = {0: [], 1: [], 2: [], 9: []}  # channel -> (start, dur, note, vel)
    for bar in range(bars):
        deg = m["prog"][bar % len(m["prog"])]
        chord = triad(m["root"], deg)
        start = bar * 4 * beat
        # pad / chord bed
        if mood == "warm":
            for n in chord:
                events[1].append((start, 4 * beat, n - 12, 62))
        elif mood == "chill":
            for n in chord:
                events[1].append((start, 4 * beat, n - 12, 50))
        # bass
        bass_note = chord[0] - 24
        if mood == "playful":
            for b in range(4):
                events[2].append((start + b * beat, beat // 2, bass_note + (7 if b % 2 else 0), 80))
        else:
            events[2].append((start, 2 * beat, bass_note, 72))
            events[2].append((start + 2 * beat, 2 * beat, bass_note + 7, 64))
        # lead: arpeggio with small melodic variation
        if mood == "playful":
            pattern = [0, 1, 2, 1, 0, 2, 1, 2]
            step = beat // 2
            vel = 78
        elif mood == "warm":
            pattern = [0, 1, 2, 1]
            step = beat
            vel = 70
        else:
            pattern = [0, 2, 1, 2]
            step = beat
            vel = 64
        for i, p in enumerate(pattern * (4 * beat // (step * len(pattern)))):
            n = chord[p] + 12
            if rnd.random() < 0.15:
                n += 12
            events[0].append((start + i * step, int(step * 0.9), n, vel + rnd.randint(-6, 6)))
        # drums (GM channel 10)
        if m["drums"] and bar > 0:
            for b in range(4):
                t0 = start + b * beat
                if b in (0, 2):
                    events[9].append((t0, beat // 4, 36, 70 if mood == "playful" else 58))
                if b in (1, 3):
                    events[9].append((t0, beat // 4, 39 if mood == "playful" else 37, 52))
                for h in (0, beat // 2):
                    events[9].append((t0 + h, beat // 8, 42, 38))

    specs = {0: (m["lead"], 100), 1: (m["pad"], 80), 2: (m["bass"], 90), 9: (0, 90)}
    for ch, evs in events.items():
        if not evs:
            continue
        t = track(ch, specs[ch][0], specs[ch][1])
        msgs = []
        for s, d, n, v in evs:
            msgs.append((s, 1, n, v))
            msgs.append((s + d, 0, n, 0))
        msgs.sort(key=lambda x: (x[0], x[1]))
        now = 0
        for at, on, n, v in msgs:
            kind = "note_on" if on else "note_off"
            t.append(mido.Message(kind, channel=ch, note=max(0, min(127, n)), velocity=v, time=at - now))
            now = at
    midi_path = path.rsplit(".", 1)[0] + ".mid"
    mid.save(midi_path)
    subprocess.run(["fluidsynth", "-ni", "-g", "0.8", "-r", "44100", "-F", path, SF2, midi_path],
                   check=True, capture_output=True)


if __name__ == "__main__":
    compose(sys.argv[1], float(sys.argv[2]), sys.argv[3], int(sys.argv[4]) if len(sys.argv) > 4 else 7)
