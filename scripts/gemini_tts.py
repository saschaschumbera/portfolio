"""
Gemini-TTS-Segmente fuer Demo-Videos generieren.

Aufruf:  python gemini_tts.py <segments.json> <out_dir>

segments.json: [{"file": "01_intro.wav", "text": "..."}, ...]
Keys: GEMINI_API_KEYS (Komma-Liste) aus tiktok_autopilot/.env oder Umgebung,
mit Rotation bei Quota-Fehlern (Muster aus tiktok_autopilot/gemini_tts.py).
Nur Standardbibliothek; Ausgabe: WAV 24 kHz mono.
"""

import base64
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
import wave

MODEL = "gemini-2.5-flash-preview-tts"
VOICE = "Charon"  # maennlich, ruhig
STYLE = (
    "Sprich den folgenden deutschen Text ruhig, klar und professionell, "
    "wie ein seriöser Sprecher in einem Produktvideo. "
    "Sprich nur den Text, keine Meta-Kommentare.\n\nText:\n"
)
SECONDS_BETWEEN_CALLS = 21  # ~3 RPM pro Key (Free Tier)

KEYS_FILE = r"C:\Users\Sascha\Projekte\tiktok_autopilot\.env"


def load_api_keys() -> list[str]:
    env_keys = os.environ.get("GEMINI_API_KEYS", "")
    keys = [k.strip() for k in re.split(r"[,;\s]+", env_keys) if k.strip()]
    if not keys and os.path.exists(KEYS_FILE):
        with open(KEYS_FILE, encoding="utf-8") as f:
            keys = re.findall(r"AIza[0-9A-Za-z_\-]{30,}", f.read())
    if not keys:
        raise SystemExit("Keine Gemini-Keys gefunden")
    return keys


def tts(text: str, api_key: str) -> bytes:
    """Gibt rohe PCM-Daten (s16le, 24 kHz, mono) zurueck."""
    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        f"{MODEL}:generateContent?key={api_key}"
    )
    body = {
        "contents": [{"parts": [{"text": STYLE + text}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": VOICE}}
            },
        },
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        data = json.load(resp)
    part = data["candidates"][0]["content"]["parts"][0]
    return base64.b64decode(part["inlineData"]["data"])


def write_wav(path: str, pcm: bytes) -> None:
    with wave.open(path, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(24000)
        w.writeframes(pcm)


def generate(segments: list[dict], out_dir: str) -> None:
    keys = load_api_keys()
    key_idx = 0
    print(f"{len(keys)} Keys geladen, Stimme: {VOICE}")

    for seg in segments:
        out_path = os.path.join(out_dir, seg["file"])
        attempts = 0
        while True:
            key = keys[key_idx % len(keys)]
            try:
                pcm = tts(seg["text"], key)
                break
            except urllib.error.HTTPError as e:
                attempts += 1
                if attempts >= len(keys) * 2 + 3:
                    raise
                if e.code == 429:
                    key_idx += 1  # Quota: naechster Key
                    print(f"  429 -> Key-Rotation ({key_idx % len(keys)})")
                elif e.code in (500, 503, 504):
                    print(f"  {e.code} -> warte 20s")
                    time.sleep(20)
                else:
                    raise
        write_wav(out_path, pcm)
        print(f"  OK {seg['file']} ({len(pcm) / 48000:.1f}s)")
        key_idx += 1  # Round-Robin entlastet jeden Key
        time.sleep(2)


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Aufruf: python gemini_tts.py <segments.json> <out_dir>")
    seg_file, out_dir = sys.argv[1], sys.argv[2]
    os.makedirs(out_dir, exist_ok=True)
    with open(seg_file, encoding="utf-8") as f:
        segments = json.load(f)
    generate(segments, out_dir)
    print("Fertig ->", out_dir)


if __name__ == "__main__":
    main()
