# Cloudinary Configuration Guide - Full Setup

## Problem Explained

The 401 error happens because:
1. Cloudinary upload preset has **restricted access**
2. Raw files are treated as **private by default**
3. Unsigned requests need **explicit permission**
4. The URL format doesn't include **transformation flags**

## Solution Overview

### What We Changed in Code
✅ Updated the URL generation to include `fl_attachment` transformation

**Before:**
```typescript
const uploadedUrl = responseData.secure_url;
// Result: https://res.cloudinary.com/.../raw/upload/v123.../file.pdf
```

**After:**
```typescript
const downloadableUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/raw/upload/fl_attachment/${publicId}`;
// Result: https://res.cloudinary.com/.../raw/upload/fl_attachment/file.pdf
```

### What You Need to Change in Cloudinary Dashboard
1. Set upload preset to **Public** access
2. Enable **Unsigned requests**
3. Keep **Resource type** as **Raw**

---

## Detailed Cloudinary Setup

### Accessing Your Cloudinary Settings

**Method 1: Direct Link**
```
https://cloudinary.com/console/settings/upload
```

**Method 2: Navigate from Dashboard**
1. Go to: https://cloudinary.com/console
2. Click: **⚙️ Settings** (gear icon, top right)
3. Click: **Upload** tab
4. Scroll to: **Upload presets**

### Configuring Your Upload Preset

**Preset Name:** Check your `.env` file for `VITE_CLOUDINARY_UPLOAD_PRESET`

**Required Settings:**

| Setting | Required Value | Location in Dashboard |
|---------|---|---|
| **Access mode** | `Public` | Settings → Upload → Upload preset → Access mode |
| **Type** | `Unsigned` | Settings → Upload → Upload preset → Type |
| **Resource type** | `Raw` | Settings → Upload → Upload preset → Resource type |
| **Folder** | `tech_blitz_2k26/papers` | Settings → Upload → Upload preset → Folder |

### Step-by-Step Configuration

**Step 1: Open Upload Presets**
```
Dashboard → Settings ⚙️ → Upload tab → Upload presets section
```

**Step 2: Click Your Preset Name**
- Look for preset matching your `.env` value
- Click on it to edit

**Step 3: Find "Access mode" Setting**
- Scroll through the form
- Look for: **"Access mode"** dropdown
- Current value: Usually "Authenticated" or "Token"
- **Change to: "Public"**

**Step 4: Find "Type" Setting**
- Look for: **"Type"** field
- **Verify: "Unsigned"** is selected

**Step 5: Find "Resource type" Setting**
- Look for: **"Resource type"** dropdown
- **Verify: "Raw"** is selected
- (Don't change to "Image" unless you're uploading images)

**Step 6: Find "Folder" Setting**
- Look for: **"Folder"** field
- **Verify: "tech_blitz_2k26/papers"** is set

**Step 7: Save Changes**
- Scroll to bottom
- Click: **"Save"** button (blue button)
- Wait for: "Successfully updated" message

---

## Cloudinary Settings Explanation

### Access Mode
- **Public** ✅ CHOOSE THIS
  - Anyone with the URL can access the file
  - Good for papers that students consent to share
  - No authentication needed
  
- **Authenticated** ❌ Don't use
  - Requires Cloudinary credentials to access
  - Causes 401 errors for direct URLs
  
- **Token** ❌ Don't use
  - Requires special token in URL
  - Too complex for this use case

### Type
- **Unsigned** ✅ CHOOSE THIS
  - Frontend can upload without backend involvement
  - Doesn't require API key exposure
  - Perfect for browser-based uploads
  
- **Signed** ❌ Don't use for this
  - Requires backend to sign upload requests
  - More secure but more complex
  - Unnecessary for this use case

### Resource Type
- **Raw** ✅ KEEP THIS
  - For PDF, DOCX, DOC files
  - Treats as files, not images
  - Preserves file format
  
- **Image** ❌ Don't use
  - Applies image transformations
  - Might compress PDFs
  - Not suitable for documents

---

## URL Format Explanation

### With fl_attachment Transformation
```
https://res.cloudinary.com/[CLOUD_NAME]/raw/upload/fl_attachment/[PUBLIC_ID]
                                                     ↑
                                    This flag makes it downloadable
```

**What fl_attachment does:**
- Forces browser to download (not preview)
- Sets proper MIME type headers
- Bypasses access control for public files
- Makes URL work without authentication

### Alternative Transformations (If Needed)

**For forcing specific filename:**
```
https://res.cloudinary.com/[CLOUD_NAME]/raw/upload/fl_attachment:my_paper.pdf/[PUBLIC_ID]
```

**For inline preview instead of download:**
```
https://res.cloudinary.com/[CLOUD_NAME]/raw/upload/[PUBLIC_ID]
```

**For bandwidth optimization:**
```
https://res.cloudinary.com/[CLOUD_NAME]/raw/upload/fl_attachment,q_auto/[PUBLIC_ID]
```

---

## Testing the Configuration

### Test 1: Upload a File
```
1. Go to registration page
2. Select "Paper Presentation" event
3. Upload a PDF file
4. Check console (F12) for logs
5. Look for: "Downloadable URL: https://..."
6. Should have "fl_attachment" in the URL
```

### Test 2: Check Console Logs
```
=== PAPER FILE UPLOAD DEBUG ===
File details: { name: "thesis.pdf", type: "application/pdf", size: 2500000, sizeInMB: "2.38" }
Is file type valid? true
File size check: 2.38MB / 10MB
Starting upload to Cloudinary...
📤 Sending fetch request...
📥 Response received: { status: 200, statusText: "OK", ok: true }
✅ Paper file upload successful!
Downloadable URL: https://res.cloudinary.com/dhq0xlc5r/raw/upload/fl_attachment/tech_blitz_2k26/papers/abc123
=== END PAPER FILE UPLOAD DEBUG ===
```

### Test 3: Download from Paper Files Tab
```
1. Go to Admin Panel
2. Click "Paper Files" tab
3. Find your newly uploaded paper
4. Click "Download" button
5. File should download ✅
```

### Test 4: Direct URL Test
```
1. Copy the URL from Paper Files tab
2. Paste in new browser tab
3. File should download or preview (PDF should preview)
4. If 401 error → settings not applied
5. If error persists → check Cloudinary status
```

---

## Environment Variables

Make sure `.env` has correct values:

```env
# .env file
VITE_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_actual_preset_name
```

### How to Find These Values

**Cloud Name:**
- Dashboard → Top left corner
- Shows: "Cloud name: dhq0xlc5r" (or your name)
- Copy the name part

**Upload Preset:**
- Settings → Upload → Upload presets
- Shows list of preset names
- Look for the one you configured for papers
- Example: `tech_blitz_2k26_papers` or `unsigned_preset`

---

## Cloudinary Security Considerations

### This Setup is Secure Because:
1. **Folder structure** - Papers stored in `/tech_blitz_2k26/papers`
2. **Non-sequential IDs** - Public IDs are random (not guessable)
3. **Application control** - Only authenticated students can upload
4. **Firestore control** - Only authorized admins can see the list
5. **HTTPS** - All traffic encrypted in transit

### If You Need More Security:

**Option 1: Restrict Uploads to Authenticated Users**
- Backend validates student authentication before generating upload token
- More complex but more secure

**Option 2: Use Signed URLs**
- Generate signed URLs that expire after time limit
- Requires backend implementation
- Better for sensitive documents

**Option 3: Proxy Through Backend**
- Backend downloads from Cloudinary and serves to user
- Full control over access
- Higher server load

For now, **Option 1 (current setup) is sufficient** for paper presentations since:
- Students already authenticated to register
- Papers are meant to be submitted/shared
- No sensitive information beyond the PDF content

---

## Troubleshooting Common Errors

### Error: HTTP 401 Unauthorized
**Cause:** Preset access mode is not Public

**Fix:**
1. Go to Settings → Upload → Upload presets
2. Open your preset
3. Set "Access mode" to "Public"
4. Save
5. Upload a **new** file (old files won't be affected)

### Error: HTTP 400 Bad Request
**Cause:** Invalid preset name or cloud name

**Fix:**
1. Check `.env` file for correct values
2. Verify in Cloudinary dashboard
3. Hard refresh browser (Ctrl+F5)
4. Try uploading again

### Error: HTTP 403 Forbidden
**Cause:** Preset is set to "Authenticated" or "Token"

**Fix:** Same as 401 error - change access mode to "Public"

### Error: Upload Hangs (Uploading... forever)
**Cause:** Cloudinary credentials wrong or network issue

**Fix:**
1. Check internet connection
2. Check .env has correct cloud name and preset
3. Try uploading smaller file
4. Check Cloudinary status: https://status.cloudinary.com

### Downloaded File Won't Open
**Cause:** File corrupted during upload

**Fix:**
1. Delete the file
2. Upload a fresh copy
3. Try different file
4. Try with smaller file

---

## Files Updated

| File | Change | Purpose |
|------|--------|---------|
| `src/cloudinaryUtils.ts` | Added `fl_attachment` flag | Make files downloadable |
| `CLOUDINARY_401_FIX.md` | Documentation | Guide to fix settings |
| `CLOUDINARY_401_QUICK_FIX.md` | Quick reference | Fast fix checklist |

---

## Testing Checklist

Before considering it fixed, verify all of these:

- [ ] Cloudinary preset access mode set to "Public"
- [ ] Cloudinary preset type set to "Unsigned"
- [ ] Cloudinary preset resource type is "Raw"
- [ ] .env file has correct CLOUD_NAME and UPLOAD_PRESET
- [ ] New paper file uploaded successfully
- [ ] Console shows "fl_attachment" in downloadable URL
- [ ] Download button appears in Paper Files tab
- [ ] Download button works without 401 error
- [ ] Downloaded file opens correctly
- [ ] Excel export shows new URL format
- [ ] Old files still don't work (expected - only new uploads work)

---

## Support Resources

| Resource | URL |
|----------|-----|
| Cloudinary Console | https://cloudinary.com/console |
| Cloudinary Docs | https://cloudinary.com/documentation |
| Upload API | https://cloudinary.com/documentation/upload_api_reference |
| Transformations | https://cloudinary.com/documentation/image_transformation_reference |
| Upload Presets | https://cloudinary.com/documentation/upload_presets |
| Status Page | https://status.cloudinary.com |

---

**Last Updated:** January 21, 2026  
**Status:** Complete Implementation
