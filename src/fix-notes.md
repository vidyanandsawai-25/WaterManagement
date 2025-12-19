# Issues Found in EditApplicationModal.tsx

## Issue 1: Line 267 - Undefined variable and incorrect indentation
- Line 267 uses `file.name` but should use `newFiles[0].name`
- The toast.success call has incorrect indentation (missing 2 spaces)
- Line 270 closes with `}` but should have proper indentation

## Issue 2: Brace structure
The handleFileChange function has:
```
266: if (newFiles.length === 1) {
267:   toast.success(...)  // Missing indentation
270: }  // This closes the if
271: };  // This closes something but there's a structure issue
```

Should be:
```
266: if (newFiles.length === 1) {
267:     toast.success(...)  // Proper indentation
269:   });
270:   }  // Close if
271: }  // Close if (files && files.length > 0)
272: };  // Close handleFileChange
```

Let me fix this specific section.
