# 📦 Component Migration Guide

## Quick Component Copy Guide

You need to copy components from `/components/` to `/src/components/modules/` to complete the Next.js migration.

---

## 🎯 Components to Copy

### **Step 1: Create modules folder**

The `/src/components/modules/` folder needs all these components:

```
src/components/modules/
├── AIAnalyticsDashboard.tsx
├── AIApprovalMonitor.tsx
├── AllocateApplicationModal.tsx
├── ApplicationDetailsDialog.tsx
├── ApplicationSubmitSuccessDialog.tsx
├── ApplicationViewModal.tsx
├── ApplicationsTable.tsx
├── ApprovalModal.tsx
├── ApproveApplicationModal.tsx
├── ApproveOnlineTransaction.tsx
├── CRMDashboard.tsx
├── DDChequeApproval.tsx
├── DocumentViewerModal.tsx
├── DownloadRegisterModal.tsx
├── EditApplicationModal.tsx
├── FilterBar.tsx
├── PaymentModal.tsx
├── PaymentTransactionStatusModal.tsx
├── RegisterApplicationModal.tsx
├── StatsGrid.tsx
├── UploadNotesheetModal.tsx
├── WaterRipple.tsx
├── ZonewiseFilterReportModal.tsx
└── ZonewiseTable.tsx
```

### **Step 2: Copy Sidebar to layout**

```
src/components/layout/
├── Header.tsx ✅ (already done)
├── Sidebar.tsx ❌ (needs to be copied)
└── index.ts
```

---

## 🚀 Quick Copy Commands

### **For Unix/Mac/Linux:**

```bash
# Create modules directory
mkdir -p src/components/modules

# Copy all dashboard/modal components
cp components/AIAnalyticsDashboard.tsx src/components/modules/
cp components/AIApprovalMonitor.tsx src/components/modules/
cp components/AllocateApplicationModal.tsx src/components/modules/
cp components/ApplicationDetailsDialog.tsx src/components/modules/
cp components/ApplicationSubmitSuccessDialog.tsx src/components/modules/
cp components/ApplicationViewModal.tsx src/components/modules/
cp components/ApplicationsTable.tsx src/components/modules/
cp components/ApprovalModal.tsx src/components/modules/
cp components/ApproveApplicationModal.tsx src/components/modules/
cp components/ApproveOnlineTransaction.tsx src/components/modules/
cp components/CRMDashboard.tsx src/components/modules/
cp components/DDChequeApproval.tsx src/components/modules/
cp components/DocumentViewerModal.tsx src/components/modules/
cp components/DownloadRegisterModal.tsx src/components/modules/
cp components/EditApplicationModal.tsx src/components/modules/
cp components/FilterBar.tsx src/components/modules/
cp components/PaymentModal.tsx src/components/modules/
cp components/PaymentTransactionStatusModal.tsx src/components/modules/
cp components/RegisterApplicationModal.tsx src/components/modules/
cp components/StatsGrid.tsx src/components/modules/
cp components/UploadNotesheetModal.tsx src/components/modules/
cp components/WaterRipple.tsx src/components/modules/
cp components/ZonewiseFilterReportModal.tsx src/components/modules/
cp components/ZonewiseTable.tsx src/components/modules/

# Copy Sidebar to layout
cp components/Sidebar.tsx src/components/layout/

# Copy UI components (if not already there)
cp -r components/ui src/components/ 2>/dev/null || true

# Copy figma components
cp -r components/figma src/components/ 2>/dev/null || true
```

### **For Windows (PowerShell):**

```powershell
# Create modules directory
New-Item -ItemType Directory -Force -Path src/components/modules

# Copy all dashboard/modal components
Copy-Item components/AIAnalyticsDashboard.tsx src/components/modules/
Copy-Item components/AIApprovalMonitor.tsx src/components/modules/
Copy-Item components/AllocateApplicationModal.tsx src/components/modules/
Copy-Item components/ApplicationDetailsDialog.tsx src/components/modules/
Copy-Item components/ApplicationSubmitSuccessDialog.tsx src/components/modules/
Copy-Item components/ApplicationViewModal.tsx src/components/modules/
Copy-Item components/ApplicationsTable.tsx src/components/modules/
Copy-Item components/ApprovalModal.tsx src/components/modules/
Copy-Item components/ApproveApplicationModal.tsx src/components/modules/
Copy-Item components/ApproveOnlineTransaction.tsx src/components/modules/
Copy-Item components/CRMDashboard.tsx src/components/modules/
Copy-Item components/DDChequeApproval.tsx src/components/modules/
Copy-Item components/DocumentViewerModal.tsx src/components/modules/
Copy-Item components/DownloadRegisterModal.tsx src/components/modules/
Copy-Item components/EditApplicationModal.tsx src/components/modules/
Copy-Item components/FilterBar.tsx src/components/modules/
Copy-Item components/PaymentModal.tsx src/components/modules/
Copy-Item components/PaymentTransactionStatusModal.tsx src/components/modules/
Copy-Item components/RegisterApplicationModal.tsx src/components/modules/
Copy-Item components/StatsGrid.tsx src/components/modules/
Copy-Item components/UploadNotesheetModal.tsx src/components/modules/
Copy-Item components/WaterRipple.tsx src/components/modules/
Copy-Item components/ZonewiseFilterReportModal.tsx src/components/modules/
Copy-Item components/ZonewiseTable.tsx src/components/modules/

# Copy Sidebar to layout
Copy-Item components/Sidebar.tsx src/components/layout/

# Copy UI components
Copy-Item -Recurse components/ui src/components/ -Force
Copy-Item -Recurse components/figma src/components/ -Force
```

---

## ✏️ After Copying - Update Imports

After copying each file, you need to update the imports.

### **Import Pattern Changes:**

```typescript
// ❌ OLD (Vite/React style)
import { Header } from './Header';
import { Button } from './ui/button';
import { applications } from '../data/applications';
import '../styles/globals.css';

// ✅ NEW (Next.js style)
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { applications } from '@/data/applications';
import '@/styles/globals.css';
```

---

## 🔧 Common Import Replacements

### **1. Component Imports:**

```typescript
// From same folder
'./ComponentName' → '@/components/modules/ComponentName'

// From parent folder
'../ComponentName' → '@/components/modules/ComponentName'

// UI components
'./ui/button' → '@/components/ui/button'
'../ui/dialog' → '@/components/ui/dialog'

// Layout components
'./Header' → '@/components/layout/Header'
'./Sidebar' → '@/components/layout/Sidebar'
```

---

### **2. Data/Utils Imports:**

```typescript
// Data
'../data/applications' → '@/data/applications'
'../../data/applications' → '@/data/applications'

// Utils
'../utils/helpers' → '@/utils/helpers'
'../../utils/helpers' → '@/utils/helpers'

// Services
'../services/api.service' → '@/services/api.service'
'../../services/api.service' → '@/services/api.service'
```

---

### **3. Hooks:**

```typescript
// Hooks
'../hooks/useApplications' → '@/hooks/useApplications'
'../../hooks/useApplication' → '@/hooks/useApplication'
```

---

## 📝 Example: Updating CRMDashboard.tsx

### **Before:**

```tsx
import { useState } from 'react';
import { StatsGrid } from './StatsGrid';
import { FilterBar } from './FilterBar';
import { ApplicationsTable } from './ApplicationsTable';
import { Button } from './ui/button';
import { applications } from '../data/applications';
```

### **After:**

```tsx
'use client';  // Add this if component uses hooks!

import { useState } from 'react';
import { StatsGrid } from '@/components/modules/StatsGrid';
import { FilterBar } from '@/components/modules/FilterBar';
import { ApplicationsTable } from '@/components/modules/ApplicationsTable';
import { Button } from '@/components/ui/button';
import { applications } from '@/data/applications';
```

---

## 🎯 Components That Need 'use client'

Add `'use client';` at the top of these files:

```typescript
'use client';  // Add this line!

import { useState } from 'react';
// ... rest of imports
```

**List of components needing 'use client':**

- ✅ All components with `useState`
- ✅ All components with `useEffect`
- ✅ All components with `useRef`
- ✅ All components with event handlers (onClick, onChange, etc.)
- ✅ All components with `motion` from motion/react
- ✅ All modal/dialog components
- ✅ All form components

**Specifically:**
- CRMDashboard.tsx
- FilterBar.tsx
- StatsGrid.tsx
- ApplicationsTable.tsx
- Sidebar.tsx
- All Modal components
- All Dialog components

---

## ✅ Checklist

After copying and updating each component:

- [ ] File copied to correct location
- [ ] Added `'use client'` if needed
- [ ] Updated all imports to use `@/` aliases
- [ ] Removed relative paths (`./`, `../`)
- [ ] Component renders without errors
- [ ] No TypeScript errors

---

## 🧪 Testing After Migration

```bash
# 1. Run type check
npm run type-check

# 2. Start dev server
npm run dev

# 3. Check console for errors
# 4. Test each feature:
   - Create application
   - Update application
   - Delete application
   - Filter/search
   - Modal interactions
```

---

## 🐛 Common Errors & Fixes

### **Error: "Module not found: Can't resolve './ComponentName'"**

**Fix:** Update import to use `@/` alias:

```typescript
// ❌ Wrong
import { Component } from './ComponentName';

// ✅ Correct
import { Component } from '@/components/modules/ComponentName';
```

---

### **Error: "You're importing a component that needs useState..."**

**Fix:** Add `'use client'` at top of file:

```typescript
'use client';  // Add this!

import { useState } from 'react';
```

---

### **Error: "Cannot find module '@/components/modules/...'"**

**Fix:** Make sure you copied the file:

```bash
# Check if file exists
ls src/components/modules/ComponentName.tsx

# If not, copy it:
cp components/ComponentName.tsx src/components/modules/
```

---

## 📊 Progress Tracker

Track your migration progress:

```
Core Components:
[ ] CRMDashboard.tsx
[ ] FilterBar.tsx
[ ] StatsGrid.tsx
[ ] ApplicationsTable.tsx

Layout:
[✅] Header.tsx (already done!)
[ ] Sidebar.tsx

Modals:
[ ] RegisterApplicationModal.tsx
[ ] AllocateApplicationModal.tsx
[ ] DownloadRegisterModal.tsx
[ ] ApplicationViewModal.tsx
[ ] EditApplicationModal.tsx
[ ] ApprovalModal.tsx
[ ] PaymentModal.tsx
[ ] UploadNotesheetModal.tsx

Analytics:
[ ] AIAnalyticsDashboard.tsx
[ ] AIApprovalMonitor.tsx

Others:
[ ] ApproveOnlineTransaction.tsx
[ ] DDChequeApproval.tsx
[ ] ZonewiseTable.tsx
[ ] WaterRipple.tsx
```

---

## 🎊 After Completion

Once all components are migrated:

```bash
# 1. Test application thoroughly
npm run dev

# 2. Run type check
npm run type-check

# 3. Build for production
npm run build

# 4. (Optional) Remove old components folder
rm -rf components/  # Unix/Mac/Linux
Remove-Item -Recurse -Force components/  # Windows PowerShell

# 5. (Optional) Remove old App.tsx
rm App.tsx  # Unix/Mac/Linux
Remove-Item App.tsx  # Windows PowerShell
```

---

## 🚀 You're Almost There!

Just copy the components, update the imports, and you'll have a fully migrated Next.js application! 🎉
