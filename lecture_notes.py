import sys
from faster_whisper import WhisperModel

print("Loading model...")
model = WhisperModel("base")

video = sys.argv[1]
print("Transcribing:", video)

segments, _ = model.transcribe(video)

text = ""
for seg in segments:
    text += seg.text + "\n"

with open("notes.txt", "w", encoding="utf-8") as f:
    f.write(text)

print("DONE")
