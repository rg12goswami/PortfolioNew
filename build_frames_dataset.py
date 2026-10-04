import cv2
import numpy as np
import os

# Target wine color #8a1f2b in BGR format
TARGET_BGR = np.array([43, 31, 138], dtype=np.float32)

def recolor_background(frame):
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    img_float = frame.astype(np.float32)
    
    H = hsv[:, :, 0].astype(np.float32)
    S = hsv[:, :, 1].astype(np.float32)
    V = hsv[:, :, 2].astype(np.float32)
    
    # Distance from red hue (0 or 180 in OpenCV)
    dist_red1 = np.abs(H - 0.0)
    dist_red2 = np.abs(H - 180.0)
    min_dist_red = np.minimum(dist_red1, dist_red2)
    
    # Mask weights
    hue_score = np.maximum(0.0, 1.0 - (min_dist_red / 14.0))
    sat_score = np.clip((S - 50.0) / 70.0, 0.0, 1.0)
    val_score = np.clip((V - 40.0) / 60.0, 0.0, 1.0)
    
    mask = hue_score * sat_score * val_score
    mask_blur = cv2.GaussianBlur(mask, (3, 3), 0.5)
    mask_3d = np.dstack([mask_blur, mask_blur, mask_blur])
    
    recolored = img_float * (1.0 - mask_3d) + TARGET_BGR * mask_3d
    return np.clip(recolored, 0, 255).astype(np.uint8)

def main():
    cap = cv2.VideoCapture('public/character.mp4')
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Loading {total_frames} frames from public/character.mp4...")
    
    all_frames = []
    for i in range(total_frames):
        ret, frame = cap.read()
        if not ret:
            break
        all_frames.append(frame)
    cap.release()
    
    # Compute head displacement and angle for all frames
    frames_info = []
    for idx, frame in enumerate(all_frames):
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        bg_mask1 = cv2.inRange(hsv, (0, 100, 50), (12, 255, 255))
        bg_mask2 = cv2.inRange(hsv, (170, 100, 50), (180, 255, 255))
        bg_mask = cv2.bitwise_or(bg_mask1, bg_mask2)
        char_mask = cv2.bitwise_not(bg_mask)
        
        # Crop head region
        head_region = char_mask[120:450, 480:800]
        M = cv2.moments(head_region)
        if M["m00"] > 0:
            hx = (M["m10"] / M["m00"]) + 480
            hy = (M["m01"] / M["m00"]) + 120
        else:
            hx, hy = 640.0, 285.0
            
        dx = hx - 640.0
        dy = hy - 285.0
        dist = np.hypot(dx, dy)
        deg = np.degrees(np.arctan2(dy, dx)) % 360.0
        
        frames_info.append({
            'index': idx,
            'dx': dx,
            'dy': dy,
            'dist': dist,
            'deg': deg,
            'frame': frame
        })
        
    os.makedirs('public/frames', exist_ok=True)
    
    # 1. Extract 64 WebP frames (0 to 63)
    # Target angle for frame k = k * (360 / 64) = k * 5.625
    NUM_FRAMES = 64
    extracted_mapping = {}
    
    for k in range(NUM_FRAMES):
        target_deg = (k * 360.0 / NUM_FRAMES) % 360.0
        
        # Find video frame with closest angle, requiring dist > 2.5 to avoid static neutral frames
        best_candidate = None
        min_angle_diff = 360.0
        
        for info in frames_info:
            if info['dist'] >= 2.0:
                diff = abs((info['deg'] - target_deg + 180.0) % 360.0 - 180.0)
                if diff < min_angle_diff:
                    min_angle_diff = diff
                    best_candidate = info
                    
        # Fallback if none found with dist >= 2.0
        if best_candidate is None:
            best_candidate = min(frames_info, key=lambda info: abs((info['deg'] - target_deg + 180.0) % 360.0 - 180.0))
            
        extracted_mapping[k] = best_candidate
        
        # Recolor and save webp
        recolored_frame = recolor_background(best_candidate['frame'])
        file_path = f'public/frames/frame_{k}.webp'
        cv2.imwrite(file_path, recolored_frame, [cv2.IMWRITE_WEBP_QUALITY, 90])
        
    print(f"Saved {NUM_FRAMES} frames to public/frames/frame_0.webp .. frame_{NUM_FRAMES-1}.webp")
    
    # 2. Extract Center Neutral Frame (frame 220 or lowest dist frame near end)
    center_info = min(frames_info[200:], key=lambda info: info['dist'])
    recolored_center = recolor_background(center_info['frame'])
    cv2.imwrite('public/frames/center.webp', recolored_center, [cv2.IMWRITE_WEBP_QUALITY, 92])
    cv2.imwrite('public/center.webp', recolored_center, [cv2.IMWRITE_WEBP_QUALITY, 92])
    print(f"Saved center frame (from video frame {center_info['index']}) to public/frames/center.webp and public/center.webp")

    # Print summary of key compass directions
    compass_indices = {
        'RIGHT (0°)': 0,
        'DOWN-RIGHT (45°)': 8,
        'DOWN (90°)': 16,
        'DOWN-LEFT (135°)': 24,
        'LEFT (180°)': 32,
        'UP-LEFT (225°)': 40,
        'UP (270°)': 48,
        'UP-RIGHT (315°)': 56
    }
    print("\nCompass frame mapping summary:")
    for label, idx in compass_indices.items():
        m = extracted_mapping[idx]
        print(f"  {label:20s} -> frame_{idx}.webp (video frame {m['index']:03d}, angle={m['deg']:.1f}°)")

if __name__ == '__main__':
    main()
