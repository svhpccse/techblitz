# Paper File Upload Debug Guide

## Console Logging Overview

Console logs have been added throughout the paper file upload process to help debug issues. Open your browser's Developer Tools (F12) and go to the **Console** tab to see detailed logs.

---

## Upload Flow with Console Messages

### 1. **File Selection Phase**
```
📎 Paper file input changed
Files: FileList { 0: File, length: 1 }
=== PAPER FILE INPUT CHANGE ===
File details: {
  name: "my-paper.docx",
  type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  size: 245000,
  sizeInMB: "0.23"
}
```

### 2. **File Validation Phase**
```
Valid MIME types: [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]
Is file type valid? true
File size check: 0.23MB / 10MB
```

### 3. **Cloudinary Upload Phase**
```
=== PAPER FILE UPLOAD DEBUG ===
Starting upload to Cloudinary...
{
  cloudName: "your-cloud-name",
  preset: "your-preset",
  fileSize: 245000,
  fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  fileName: "my-paper.docx"
}
Upload URL: https://api.cloudinary.com/v1_1/[cloud-name]/raw/upload
📤 Sending fetch request...
```

### 4. **Response Phase**
```
📥 Response received: {
  status: 200,
  statusText: "OK",
  ok: true
}
Response JSON: {
  public_id: "tech_blitz_2k26/papers/...",
  version: 1234567890,
  signature: "...",
  width: null,
  height: null,
  format: "docx",
  resource_type: "raw",
  created_at: "2026-01-21T...",
  tags: [],
  bytes: 245000,
  type: "upload",
  etag: "...",
  placeholder: false,
  url: "http://res.cloudinary.com/...",
  secure_url: "https://res.cloudinary.com/...",
  folder: "tech_blitz_2k26/papers",
  original_filename: "my-paper"
}
✅ Paper file upload successful!
Uploaded URL: https://res.cloudinary.com/...
=== END PAPER FILE UPLOAD DEBUG ===
```

### 5. **Form Update Phase**
```
Updating form data with paper file
Updated form data: {
  paperFile: "https://res.cloudinary.com/... [URL set]",
  paperFileName: "my-paper.docx"
}
✅ Paper file upload process complete
```

---

## Form Submission Console Logs

When submitting the registration form:

```
=== FORM SUBMISSION START ===
Form data at submission: {
  name: "John Doe",
  email: "john@example.com",
  eventType: "paper_presentation",
  eventName: "Paper Presentation: AI in Healthcare",
  paymentScreenshot: "https://... [SET]",
  paperFile: "https://res.cloudinary.com/... [SET]",
  paperFileName: "my-paper.docx"
}
Validating registration data...
Validation result: {
  isValid: true,
  errors: []
}
✅ Validation passed
✅ Payment screenshot present
Event type: paper_presentation
Paper presentation detected - checking for paper file...
✅ Paper file present: my-paper.docx
Saving registration to Firestore...
✅ Registration saved successfully
=== FORM SUBMISSION END ===
```

---

## Troubleshooting with Console Logs

### Issue: "Only PDF and Word documents are allowed"

**Check these logs:**
```
File details: {
  name: "file.xyz",
  type: "text/plain",  // ❌ Wrong type!
  size: 1000
}
Valid MIME types: [...]
Is file type valid? false  // ❌ False!
❌ Invalid file type: text/plain
```

**Solution:** Ensure you're uploading only PDF or Word documents (.pdf, .doc, .docx)

---

### Issue: "File size must be less than 10MB"

**Check these logs:**
```
File size check: 12.50MB / 10MB  // ❌ Exceeds limit!
❌ File too large: 12.50 MB
```

**Solution:** Compress the file or use a smaller document

---

### Issue: Upload hangs or shows "Uploading..."

**Check these logs:**
```
📤 Sending fetch request...
// ... Nothing after this for a long time
```

**Possible causes:**
- Internet connection issue
- Cloudinary configuration wrong (check .env file)
- Cloudinary API down

**Check:**
```
Upload URL: https://api.cloudinary.com/v1_1/[cloud-name]/raw/upload
```

Make sure `[cloud-name]` is correctly populated from `.env`

---

### Issue: Upload shows error but can't see what it is

**Check these logs:**
```
❌ Cloudinary paper file upload error: Error: ...
Error message: Failed to upload paper file
Response JSON: {
  error: {
    message: "Invalid upload preset"  // ← Actual error here
  }
}
```

**Solution:** Look for the actual error message in the response

---

### Issue: File uploads but form says "Paper file not uploaded"

**Check these logs:**
```
✅ Paper file upload successful!
Uploaded URL: https://res.cloudinary.com/...
Updating form data with paper file
Updated form data: {
  paperFile: "https://... [URL set]",  // ✅ Should be SET
  paperFileName: "my-paper.docx"
}
```

Then in submission:
```
paperFile: "https://res.cloudinary.com/... [NOT SET]"  // ❌ Changed to NOT SET!
```

This indicates a state management issue.

---

## Supported File Types

These file types are supported. Check the console to see what MIME type your file has:

| File Type | MIME Type | File Extension |
|-----------|-----------|---|
| PDF | `application/pdf` | `.pdf` |
| Word 97-2003 | `application/msword` | `.doc` |
| Word 2007+ | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` | `.docx` |

---

## Steps to Debug Your Specific Issue

1. **Open Developer Tools**: Press `F12` in your browser
2. **Go to Console tab**: Click on the "Console" tab
3. **Select Paper Presentation event**: This shows the file upload field
4. **Try uploading a file**: Look for `📎 Paper file input changed` log
5. **Watch the logs**: Follow the flow from file selection to upload
6. **Look for ✅ or ❌ symbols**: These indicate success or failure
7. **Copy the error messages**: If there's an error, the console will show the exact reason

---

## Example Success Scenario

You should see logs like this for a successful upload:

```
📎 Paper file input changed
=== PAPER FILE INPUT CHANGE ===
Starting paper file upload...
Calling uploadPaperFile function...
=== PAPER FILE UPLOAD DEBUG ===
✅ Paper file upload successful!
✅ Paper file upload process complete
=== END PAPER FILE INPUT CHANGE ===
```

And after form submission:

```
=== FORM SUBMISSION START ===
Event type: paper_presentation
Paper presentation detected - checking for paper file...
✅ Paper file present: my-paper.docx
Saving registration to Firestore...
✅ Registration saved successfully
=== FORM SUBMISSION END ===
```

---

## Environment Configuration

Make sure your `.env` file has these variables set:

```
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

Check the console logs to see what values are being used:

```
Upload URL: https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/raw/upload
```

If you see `undefined`, your environment variables are not configured correctly.
