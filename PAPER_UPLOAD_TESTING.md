# Quick Testing Guide - Paper File Upload

## How to Test Paper File Upload

### Prerequisites
1. Open the registration page
2. Select **"Paper Presentation"** from Event Type dropdown
3. Select a Paper Presentation topic from the Event dropdown
4. The paper file upload field should appear

### Test Files to Upload

You can test with these file types:
- ✅ **PDF**: Any `.pdf` file
- ✅ **Word (DOCX)**: Any `.docx` file  
- ✅ **Word (DOC)**: Any `.doc` file
- ❌ **Text files** (.txt): Will be rejected
- ❌ **Images** (.jpg, .png): Will be rejected
- ❌ **Videos** (.mp4, .avi): Will be rejected

### Testing Steps

#### Step 1: Open Developer Console
```
Press: F12
Go to: Console Tab
```

You'll see logs like this:
```
📎 Paper file input changed
Files: FileList { 0: File, length: 1 }
```

#### Step 2: Upload a Valid PDF File
**Expected Console Output:**
```
=== PAPER FILE INPUT CHANGE ===
File details: {
  name: "paper.pdf",
  type: "application/pdf",
  size: 1234567,
  sizeInMB: "1.18"
}
Valid MIME types: [...]
Is file type valid? true ✅
File size check: 1.18MB / 10MB ✅
Starting upload to Cloudinary...
📤 Sending fetch request...
📥 Response received: { status: 200, statusText: "OK", ok: true }
✅ Paper file upload successful!
Uploaded URL: https://res.cloudinary.com/...
```

**What you should see in UI:**
- File name appears below upload area
- Green checkmark "✓ Uploaded successfully" appears
- Remove button (❌) appears

#### Step 3: Upload a Valid Word (DOCX) File
**Expected Console Output:**
```
File details: {
  name: "thesis.docx",
  type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  size: 2048000,
  sizeInMB: "1.95"
}
Is file type valid? true ✅
```

Same success behavior as PDF.

#### Step 4: Try Invalid File Type (e.g., .txt)
**Expected Console Output:**
```
File details: {
  name: "paper.txt",
  type: "text/plain",
  size: 50000
}
Is file type valid? false ❌
❌ Invalid file type: text/plain
```

**What you should see in UI:**
- Error message in red: "Only PDF and Word documents are allowed"
- File upload field cleared

#### Step 5: Try File > 10MB
**Expected Console Output:**
```
File size check: 12.50MB / 10MB ❌
❌ File too large: 12.50 MB
```

**What you should see in UI:**
- Error message: "File size must be less than 10MB"
- File upload field cleared

#### Step 6: Submit Form with Paper File
**Expected Console Output:**
```
=== FORM SUBMISSION START ===
Form data at submission: {
  ...
  paperFile: "https://res.cloudinary.com/... [SET]"
  paperFileName: "paper.pdf"
}
Event type: paper_presentation
Paper presentation detected - checking for paper file...
✅ Paper file present: paper.pdf
✅ Registration saved successfully
=== FORM SUBMISSION END ===
```

**What you should see in UI:**
- Success page appears
- Message: "Registration Successful!"
- Your event name shows the paper presentation topic

---

## Common Issues & Solutions

### Issue 1: "Uploading..." Never Finishes
**Console shows:**
```
📤 Sending fetch request...
// ... long wait, then nothing or error
```

**Causes:**
- Cloudinary credentials not configured in `.env`
- Internet connection lost
- Cloudinary API is down

**Solution:**
Check `.env` file has:
```
VITE_CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-actual-preset
```

---

### Issue 2: File Selected but Upload Button Doesn't Work
**Console shows:**
```
📎 Paper file input changed
Files: FileList { 0: File, length: 1 }
// Then nothing else happens
```

**Possible causes:**
- JavaScript error (check console for red errors)
- Upload function not being called
- Network issue

**Solution:**
- Refresh the page
- Check browser console for any red error messages
- Check network tab for failed requests

---

### Issue 3: Upload Works but Form Says "Paper file not uploaded"
**Console shows successful upload:**
```
✅ Paper file upload successful!
Uploaded URL: https://res.cloudinary.com/...
```

**But form submission shows:**
```
❌ Paper file missing for paper presentation
```

**Cause:**
- Form data not updating after upload
- State management issue

**Solution:**
- Try uploading file again
- Verify the file name appears on the page after upload
- If still fails, check browser console for React errors

---

## Testing Checklist

- [ ] Can select "Paper Presentation" event type
- [ ] Paper upload field appears after event selection
- [ ] Can upload PDF file successfully
- [ ] Can upload DOCX file successfully  
- [ ] Can upload DOC file successfully
- [ ] File name displays after upload
- [ ] Remove button works (clears the file)
- [ ] Can upload again after removing
- [ ] Form prevents submission without paper file
- [ ] Form submits successfully with paper file
- [ ] Success message appears
- [ ] Admin panel shows paper download button for paper presentations
- [ ] Can download paper from admin panel
- [ ] Excel export includes paper file URLs

---

## What Each Console Log Means

| Log | Meaning |
|-----|---------|
| `📎 Paper file input changed` | User clicked and selected a file |
| `=== PAPER FILE INPUT CHANGE ===` | Starting the file upload process |
| `File details: {...}` | File information (name, type, size) |
| `Is file type valid? true ✅` | File type is allowed |
| `Is file type valid? false ❌` | File type is NOT allowed |
| `File size check: X.XXmb / 10MB ✅` | File size is OK |
| `❌ File too large` | File exceeds 10MB limit |
| `Starting upload to Cloudinary...` | About to send to Cloudinary |
| `📤 Sending fetch request...` | HTTP request being sent |
| `📥 Response received: {...}` | Got response back from Cloudinary |
| `✅ Paper file upload successful!` | Upload completed successfully |
| `Uploaded URL: https://...` | Cloudinary URL where file is stored |
| `❌ Cloudinary paper file upload error` | Upload failed |
| `=== END PAPER FILE INPUT CHANGE ===` | File upload process finished |

---

## Console Log Tips

**Filter logs:**
- Type in Console search box: "PAPER" to see only paper-related logs
- Type: "❌" to see only errors
- Type: "✅" to see only successes

**Copy full logs:**
- Right-click on log entry → Copy
- Paste in text editor for detailed analysis

**Export console:**
```javascript
// Paste this in console to save all logs to a file
var logs = [];
var oldLog = console.log;
console.log = function(msg) { 
  logs.push(msg);
  oldLog.apply(console, arguments);
};
// ... do your uploads ...
// Then copy logs to clipboard
copy(JSON.stringify(logs, null, 2))
```
