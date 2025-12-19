# Migration Guide - File Reorganization

This guide helps you move files from the old structure to the new Next.js structure.

## 📋 File Movement Plan

### ✅ Step 1: Move Layout Components

Move these files from `/components/` to `/src/components/layout/`:

```bash
# Layout Components
/components/Header.tsx → /src/components/layout/Header.tsx
/components/Sidebar.tsx → /src/components/layout/Sidebar.tsx
```

**After moving, update imports:**
- Change `import { Header } from './Header'` to `import { Header } from '@/components/layout'`
- Change `import { Sidebar } from './Sidebar'` to `import { Sidebar } from '@/components/layout'`

---

### ✅ Step 2: Move Water Tax Module Components

Move ALL these files from `/components/` to `/src/components/modules/water-tax/`:

```bash
# Main Dashboard
/components/CRMDashboard.tsx → /src/components/modules/water-tax/CRMDashboard.tsx
/components/StatsGrid.tsx → /src/components/modules/water-tax/StatsGrid.tsx
/components/FilterBar.tsx → /src/components/modules/water-tax/FilterBar.tsx

# Application Tables
/components/ApplicationsTableSimple.tsx → /src/components/modules/water-tax/ApplicationsTableSimple.tsx
/components/ApplicationsTable.tsx → /src/components/modules/water-tax/ApplicationsTable.tsx
/components/ApplicationsTableVibrant.tsx → /src/components/modules/water-tax/ApplicationsTableVibrant.tsx
/components/ZonewiseTable.tsx → /src/components/modules/water-tax/ZonewiseTable.tsx

# Application Modals
/components/RegisterApplicationModalStepWise.tsx → /src/components/modules/water-tax/RegisterApplicationModalStepWise.tsx
/components/RegisterApplicationModal.tsx → /src/components/modules/water-tax/RegisterApplicationModal.tsx
/components/EditApplicationModal.tsx → /src/components/modules/water-tax/EditApplicationModal.tsx
/components/ApplicationViewModal.tsx → /src/components/modules/water-tax/ApplicationViewModal.tsx
/components/ApplicationDetailsDialog.tsx → /src/components/modules/water-tax/ApplicationDetailsDialog.tsx
/components/ApplicationSubmitSuccessDialog.tsx → /src/components/modules/water-tax/ApplicationSubmitSuccessDialog.tsx

# Approval Modals
/components/ApproveApplicationModal.tsx → /src/components/modules/water-tax/ApproveApplicationModal.tsx
/components/ApprovalModal.tsx → /src/components/modules/water-tax/ApprovalModal.tsx
/components/AllocateApplicationModal.tsx → /src/components/modules/water-tax/AllocateApplicationModal.tsx

# Notesheet System
/components/NotesheetApprovalFlow.tsx → /src/components/modules/water-tax/NotesheetApprovalFlow.tsx
/components/UploadNotesheetModal.tsx → /src/components/modules/water-tax/UploadNotesheetModal.tsx
/components/ReviewNotesheetModal.tsx → /src/components/modules/water-tax/ReviewNotesheetModal.tsx
/components/OfficerApprovalModal.tsx → /src/components/modules/water-tax/OfficerApprovalModal.tsx
/components/SendApprovalPreviewModal.tsx → /src/components/modules/water-tax/SendApprovalPreviewModal.tsx

# Payment & Transactions
/components/PaymentModal.tsx → /src/components/modules/water-tax/PaymentModal.tsx
/components/PaymentTransactionStatusModal.tsx → /src/components/modules/water-tax/PaymentTransactionStatusModal.tsx
/components/ApproveOnlineTransaction.tsx → /src/components/modules/water-tax/ApproveOnlineTransaction.tsx
/components/DDChequeApproval.tsx → /src/components/modules/water-tax/DDChequeApproval.tsx

# Filters
/components/CollapsibleFilterSection.tsx → /src/components/modules/water-tax/CollapsibleFilterSection.tsx
/components/DDChequeCollapsibleFilter.tsx → /src/components/modules/water-tax/DDChequeCollapsibleFilter.tsx

# Reports
/components/ZonewiseFilterReportModal.tsx → /src/components/modules/water-tax/ZonewiseFilterReportModal.tsx
/components/DownloadRegisterModal.tsx → /src/components/modules/water-tax/DownloadRegisterModal.tsx

# Document Management
/components/DocumentViewerModal.tsx → /src/components/modules/water-tax/DocumentViewerModal.tsx

# AI & Analytics
/components/AIAnalyticsDashboard.tsx → /src/components/modules/water-tax/AIAnalyticsDashboard.tsx
/components/AIApprovalMonitor.tsx → /src/components/modules/water-tax/AIApprovalMonitor.tsx
/components/FloatingAIButton.tsx → /src/components/modules/water-tax/FloatingAIButton.tsx

# Utilities
/components/WaterRipple.tsx → /src/components/modules/water-tax/WaterRipple.tsx
```

---

### ✅ Step 3: Move UI Components

Move ALL files from `/components/ui/` to `/src/components/ui/`:

```bash
/components/ui/* → /src/components/ui/*
```

**Keep the existing UI components:**
- All Radix UI based components
- All shadcn/ui components
- ImageWithFallback component is in `/src/components/common/`

---

### ✅ Step 4: Move Common Components

Create and move to `/src/components/common/`:

```bash
# Already exists:
/src/components/common/BackgroundPatterns.tsx ✓

# Create index file:
/src/components/common/index.ts
```

---

### ✅ Step 5: Update Import Paths

After moving all files, you'll need to update imports throughout the codebase.

#### Old Import Pattern:
```typescript
import { Header } from './Header';
import { CRMDashboard } from './CRMDashboard';
import { Button } from './ui/button';
```

#### New Import Pattern:
```typescript
import { Header } from '@/components/layout';
import { CRMDashboard } from '@/components/modules/water-tax';
import { Button } from '@/components/ui/button';
```

---

### ✅ Step 6: Update DashboardClient.tsx

Update `/src/components/client/DashboardClient.tsx` imports:

```typescript
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout';
import { Sidebar } from '@/components/layout';
import { CRMDashboard } from '@/components/modules/water-tax';
import type { Application } from '@/types';

// Rest of the component...
```

---

### ✅ Step 7: Create Layout Index Files

**Create `/src/components/layout/index.ts`:**
```typescript
export { Header } from './Header';
export { Sidebar } from './Sidebar';
```

---

## 🔄 Import Path Reference

### Before (Old)
```typescript
import { CRMDashboard } from './components/CRMDashboard';
import { Header } from './components/Header';
import { Button } from './components/ui/button';
import type { Application } from './types';
```

### After (New)
```typescript
import { CRMDashboard } from '@/components/modules/water-tax';
import { Header } from '@/components/layout';
import { Button } from '@/components/ui/button';
import type { Application } from '@/types';
```

---

## 🛠️ Automated Migration Script

You can use this bash script to move files automatically:

```bash
#!/bin/bash

# Create directories
mkdir -p src/components/layout
mkdir -p src/components/modules/water-tax

# Move layout components
mv components/Header.tsx src/components/layout/
mv components/Sidebar.tsx src/components/layout/

# Move water-tax module components (List all files)
mv components/CRMDashboard.tsx src/components/modules/water-tax/
mv components/StatsGrid.tsx src/components/modules/water-tax/
mv components/FilterBar.tsx src/components/modules/water-tax/
mv components/ApplicationsTableSimple.tsx src/components/modules/water-tax/
mv components/ApplicationsTable.tsx src/components/modules/water-tax/
mv components/ApplicationsTableVibrant.tsx src/components/modules/water-tax/
mv components/ZonewiseTable.tsx src/components/modules/water-tax/
mv components/RegisterApplicationModalStepWise.tsx src/components/modules/water-tax/
mv components/RegisterApplicationModal.tsx src/components/modules/water-tax/
mv components/EditApplicationModal.tsx src/components/modules/water-tax/
mv components/ApplicationViewModal.tsx src/components/modules/water-tax/
mv components/ApplicationDetailsDialog.tsx src/components/modules/water-tax/
mv components/ApplicationSubmitSuccessDialog.tsx src/components/modules/water-tax/
mv components/ApproveApplicationModal.tsx src/components/modules/water-tax/
mv components/ApprovalModal.tsx src/components/modules/water-tax/
mv components/AllocateApplicationModal.tsx src/components/modules/water-tax/
mv components/NotesheetApprovalFlow.tsx src/components/modules/water-tax/
mv components/UploadNotesheetModal.tsx src/components/modules/water-tax/
mv components/ReviewNotesheetModal.tsx src/components/modules/water-tax/
mv components/OfficerApprovalModal.tsx src/components/modules/water-tax/
mv components/SendApprovalPreviewModal.tsx src/components/modules/water-tax/
mv components/PaymentModal.tsx src/components/modules/water-tax/
mv components/PaymentTransactionStatusModal.tsx src/components/modules/water-tax/
mv components/ApproveOnlineTransaction.tsx src/components/modules/water-tax/
mv components/DDChequeApproval.tsx src/components/modules/water-tax/
mv components/CollapsibleFilterSection.tsx src/components/modules/water-tax/
mv components/DDChequeCollapsibleFilter.tsx src/components/modules/water-tax/
mv components/ZonewiseFilterReportModal.tsx src/components/modules/water-tax/
mv components/DownloadRegisterModal.tsx src/components/modules/water-tax/
mv components/DocumentViewerModal.tsx src/components/modules/water-tax/
mv components/AIAnalyticsDashboard.tsx src/components/modules/water-tax/
mv components/AIApprovalMonitor.tsx src/components/modules/water-tax/
mv components/FloatingAIButton.tsx src/components/modules/water-tax/
mv components/WaterRipple.tsx src/components/modules/water-tax/

# Move UI components
mv components/ui/* src/components/ui/ 2>/dev/null || true

echo "✅ File migration complete!"
echo "⚠️  Remember to update import paths in all files!"
```

Save this as `migrate-files.sh` and run:
```bash
chmod +x migrate-files.sh
./migrate-files.sh
```

---

## ✅ Verification Checklist

After migration, verify:

- [ ] All files are in correct directories
- [ ] No broken imports (run `npm run type-check`)
- [ ] Development server runs (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] All features work in browser

---

## 🔍 Finding and Replacing Imports

Use VS Code's "Find and Replace" (Ctrl/Cmd + Shift + F):

### Replace patterns:

1. **Layout imports:**
   - Find: `from ['"]\.+/Header['"]`
   - Replace: `from '@/components/layout'`

2. **Water-tax imports:**
   - Find: `from ['"]\.+/CRMDashboard['"]`
   - Replace: `from '@/components/modules/water-tax'`

3. **Type imports:**
   - Find: `from ['"]\.+/types['"]`
   - Replace: `from '@/types'`

4. **Hook imports:**
   - Find: `from ['"]\.+/hooks/`
   - Replace: `from '@/hooks/`

5. **Service imports:**
   - Find: `from ['"]\.+/services/`
   - Replace: `from '@/services/'`

---

## 📝 Notes

- Keep `/components/figma/ImageWithFallback.tsx` protected (don't move)
- All `.md` documentation files can stay in root
- `/data/applications.ts` can be moved to `/src/data/`
- Clean up old `/components/` directory after migration
- Clean up old `/hooks/`, `/services/`, `/types/` directories after migration

---

## 🎯 Final Structure

```
src/
├── app/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── client/
│   ├── common/
│   ├── figma/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── index.ts
│   ├── modules/
│   │   └── water-tax/
│   │       ├── [All 35+ components]
│   │       └── index.ts
│   └── ui/
│       └── [All UI components]
├── config/
├── hooks/
├── lib/
├── services/
└── types/
```

---

**Ready to migrate? Follow the steps above and you'll have a clean, organized Next.js project!** 🚀