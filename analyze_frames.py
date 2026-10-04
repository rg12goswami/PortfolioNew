import cv2
import numpy as np
import os

cap = cv2.VideoCapture('public/character.mp4')
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

os.makedirs('scratch/all_frames', exist_ok=True)

# Save every frame thumbnail or inspect frames
for idx in range(total_frames):
    ret, frame = cap.read()
    if not ret:
        break
    # save a smaller version for quick review or analysis
    small = cv2.resize(frame, (320, 180))
    cv2.imwrite(f'scratch/all_frames/f_{idx:03d}.jpg', small)

cap.release()
print(f"Extracted {total_frames} frame thumbnails to scratch/all_frames/")
