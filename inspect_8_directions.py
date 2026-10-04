import cv2
import numpy as np
import os

cap = cv2.VideoCapture('public/character.mp4')
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

all_frames = []
for i in range(total_frames):
    ret, frame = cap.read()
    if not ret:
        break
    all_frames.append(frame)
cap.release()

os.makedirs('scratch/direction_search', exist_ok=True)

# Let's inspect frames in chunks of 5 to see head orientation visually
# We can create composite preview images for 8 directions
# Directions:
# 0: RIGHT (0 deg)
# 1: DOWN-RIGHT (45 deg)
# 2: DOWN (90 deg)
# 3: DOWN-LEFT (135 deg)
# 4: LEFT (180 deg)
# 5: UP-LEFT (225 deg)
# 6: UP (270 deg)
# 7: UP-RIGHT (315 deg)
# CENTER: Neutral looking straight at camera

# Let's save a grid of all 240 frames with frame number so we can inspect every single frame
grid_h, grid_w = 12, 20
h, w = 180, 320
thumb_w, thumb_h = 160, 90

grid_rows = []
for r in range(grid_h):
    row_imgs = []
    for c in range(grid_w):
        f_idx = r * grid_w + c
        if f_idx < total_frames:
            img = cv2.resize(all_frames[f_idx], (thumb_w, thumb_h))
            cv2.putText(img, str(f_idx), (5, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
            row_imgs.append(img)
        else:
            row_imgs.append(np.zeros((thumb_h, thumb_w, 3), dtype=np.uint8))
    grid_rows.append(np.hstack(row_imgs))

full_grid = np.vstack(grid_rows)
cv2.imwrite('scratch/direction_search/all_240_grid.jpg', full_grid)
print("Saved all 240 frames grid to scratch/direction_search/all_240_grid.jpg")
