# Cloudinary 401 Error - Quick Fix Checklist

## Problem
Paper file downloads show: **HTTP ERROR 401**

## Quick Fix (5 minutes)

### Step 1: Cloudinary Dashboard Settings
- [ ] Go to https://cloudinary.com/console
- [ ] Click **Settings** (gear icon)
- [ ] Click **Upload** tab
- [ ] Click **Upload presets**
- [ ] Open your preset (from .env file)
- [ ] Find: **Access mode** → Change to: **Public**
- [ ] Find: **Type** → Set to: **Unsigned**
- [ ] Find: **Resource type** → Keep as: **Raw**
- [ ] Click **Save**

### Step 2: Verify .env File
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name
```

### Step 3: Code Update (Already Done ✅)
- ✅ cloudinaryUtils.ts has been updated
- ✅ New URL format with `fl_attachment` flag
- ✅ Should work automatically

### Step 4: Test
- [ ] Upload a **NEW** paper file
- [ ] Go to Paper Files tab
- [ ] Click Download button
- [ ] File should download ✅

---

## URL Examples

### Before (❌ 401 Error):
```
https://res.cloudinary.com/dhq0xlc5r/raw/upload/v1769019564/tech_blitz_2k26/papers/bdueddjh0ygg5cqtcnk3.pdf
```

### After (✅ Works):
```
https://res.cloudinary.com/dhq0xlc5r/raw/upload/fl_attachment/tech_blitz_2k26/papers/bdueddjh0ygg5cqtcnk3
```

---

## Console Logs to Verify

Open F12 → Console → Upload a paper file

**Look for:**
```
✅ Paper file upload successful!
Downloadable URL: https://res.cloudinary.com/...fl_attachment...
```

If you see `fl_attachment` in the URL → Fix is working ✅

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Still 401 error | Upload a **NEW** file after changing settings |
| Can't find preset | Check your `.env` for preset name |
| Preset not public | Go to Settings → Upload presets → Your preset → Access mode: Public |
| Old files still fail | Only new uploads work. Old files were saved with wrong URLs |
| Download button missing | Make sure file was uploaded (check for checkmark ✓) |

---

## Files Updated
- ✅ `src/cloudinaryUtils.ts` - New URL generation
- ✅ `CLOUDINARY_401_FIX.md` - Detailed guide

## Next Steps
1. Update Cloudinary preset settings (5 min)
2. Upload a new paper file (1 min)
3. Download from Paper Files tab (1 min)
4. Verify it works ✅

---

**Est. Time:** 10 minutes  
**Difficulty:** Easy
