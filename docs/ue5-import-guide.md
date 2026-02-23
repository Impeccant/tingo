# UE5 Import Guide (GLB + Retarget)

## Import
1. Import GLB into UE5 Content Browser.
2. Verify body + clothing are skinned to one unified skeleton.
3. Ensure scale and orientation are correct.

## 5-minute IK Retargeter flow
1. Open IK Retargeter and select imported skeleton.
2. Set source to UE5 mannequin.
3. Map chains and verify spine/arms/legs.
4. Preview animation and fix any chain offsets.
5. Save retarget asset and apply to test animation.

## Requirements
- Bone naming should follow UE5 mannequin conventions.
- Rest pose must be T-pose.