# 🚀 Complete Migration Guide - Move Everything to src/

## 📋 Overview

This guide will help you move **all project files** to `src/` with a professional folder structure.

---

## 🎯 Target Folder Structure

```
project-root/
├── public/                          # Static assets (stays in root)
├── src/                            # ALL code goes here ⭐
│   ├── app/                        # Next.js App Router
│   │   ├── api/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/                 # ALL components
│   │   ├── client/                # Client components
│   │   ├── common/                # Shared components
│   │   ├── features/              # Feature-based organization
│   │   │   ├── applications/     # 9 files
│   │   │   ├── approvals/        # 5 files
│   │   │   ├── dashboard/        # 4 files
│   │   │   ├── documents/        # 2 files
│   │   │   ├── payment/          # 2 files
│   │   │   └── reports/          # 4 files
│   │   ├── layout/               # Header, Sidebar
│   │   ├── ui/                   # shadcn components
│   │   └── figma/                # Figma imports
│   │
│   ├── config/                    # Configuration
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Library code
│   │   ├── actions/              # Server actions
│   │   ├── data/                 # Mock data
│   │   └── utils/                # Utilities
│   ├── services/                  # API services
│   ├── styles/                    # Global styles
│   └── types/                     # TypeScript types
│
├── package.json                    # Root config files
├── tsconfig.json
├── next.config.js
└── *.md                           # Documentation
```

---

## 🔄 Migration Steps

### **Step 1: Create Folder Structure**

Run these commands in your terminal:

```bash
# Create all directories
mkdir -p src/components/features/applications
mkdir -p src/components/features/approvals
mkdir -p src/components/features/dashboard
mkdir -p src/components/features/documents
mkdir -p src/components/features/payment
mkdir -p src/components/features/reports
mkdir -p src/components/common
mkdir -p src/components/ui
mkdir -p src/components/figma
mkdir -p src/config
mkdir -p src/hooks
mkdir -p src/lib/data
mkdir -p src/lib/utils
mkdir -p src/services
mkdir -p src/styles
mkdir -p src/types
```

---

### **Step 2: Move Files (Copy-Paste Approach)**

#### **A. Move lib/data/**
```bash
# Copy /data/applications.ts → /src/lib/data/applications.ts
```

#### **B. Move lib/utils/**
```bash
# Copy /utils/helpers.ts → /src/lib/utils/helpers.ts
# Copy /utils/smsNotification.ts → /src/lib/utils/smsNotification.ts
```

#### **C. Move config/**
```bash
# Copy /config/api.config.ts → /src/config/api.config.ts
```

#### **D. Move hooks/**
```bash
# Copy /hooks/useApplication.ts → /src/hooks/useApplication.ts
# Copy /hooks/useApplications.ts → /src/hooks/useApplications.ts
# Copy /hooks/useFileUpload.ts → /src/hooks/useFileUpload.ts
```

#### **E. Move services/**
```bash
# Copy /services/api.service.ts → /src/services/api.service.ts
# Copy /services/application.service.ts → /src/services/application.service.ts
# Copy /services/auth.service.ts → /src/services/auth.service.ts
# Copy /services/file.service.ts → /src/services/file.service.ts
```

#### **F. Move types/**
```bash
# Copy /types/index.ts → /src/types/index.ts
```

#### **G. Move styles/**
```bash
# Copy /styles/globals.css → /src/styles/globals.css
```

---

### **Step 3: Move Components (Feature-Based)**

#### **Applications (9 files) → src/components/features/applications/**
```
✓ ApplicationsTable.tsx
✓ ApplicationsTableSimple.tsx
✓ ApplicationsTableVibrant.tsx
✓ ApplicationDetailsDialog.tsx
✓ ApplicationViewModal.tsx
✓ RegisterApplicationModal.tsx
✓ EditApplicationModal.tsx
✓ AllocateApplicationModal.tsx
✓ ApplicationSubmitSuccessDialog.tsx
```

#### **Approvals (5 files) → src/components/features/approvals/**
```
✓ ApproveApplicationModal.tsx
✓ ApprovalModal.tsx
✓ ApproveOnlineTransaction.tsx
✓ DDChequeApproval.tsx
✓ DDChequeCollapsibleFilter.tsx
```

#### **Dashboard (4 files) → src/components/features/dashboard/**
```
✓ CRMDashboard.tsx
✓ StatsGrid.tsx
✓ FilterBar.tsx
✓ CollapsibleFilterSection.tsx
```

#### **Documents (2 files) → src/components/features/documents/**
```
✓ DocumentViewerModal.tsx
✓ UploadNotesheetModal.tsx
```

#### **Payment (2 files) → src/components/features/payment/**
```
✓ PaymentModal.tsx
✓ PaymentTransactionStatusModal.tsx
```

#### **Reports (4 files) → src/components/features/reports/**
```
✓ DownloadRegisterModal.tsx
✓ ZonewiseFilterReportModal.tsx
✓ ZonewiseTable.tsx
✓ AIAnalyticsDashboard.tsx
```

#### **Common (3 files) → src/components/common/**
```
✓ WaterRipple.tsx
✓ FloatingAIButton.tsx
✓ AIApprovalMonitor.tsx
✓ BackgroundPatterns.tsx (already exists)
```

#### **Layout (1 file) → src/components/layout/**
```
✓ Sidebar.tsx
✓ Header.tsx (already exists)
```

#### **UI (all files) → src/components/ui/**
```bash
# Copy all files from /components/ui/ to /src/components/ui/
```

#### **Figma → src/components/figma/**
```bash
# Copy all files from /components/figma/ to /src/components/figma/
```

---

## 📝 Import Path Updates

After moving files, update imports in **ALL files**:

### **Find and Replace (Use VS Code)**

Press `Ctrl+Shift+H` (Windows/Linux) or `Cmd+Shift+H` (Mac) for global find and replace:

#### **Replace 1: Data imports**
- Find: `from './data/applications'`
- Replace: `from '@/lib/data/applications'`

- Find: `from '../data/applications'`  
- Replace: `from '@/lib/data/applications'`

#### **Replace 2: Component imports**
- Find: `from './components/`
- Replace: `from '@/components/features/` (then manually organize by feature)

- Find: `from '../components/`
- Replace: `from '@/components/features/` (then manually organize by feature)

#### **Replace 3: Hooks**
- Find: `from './hooks/`
- Replace: `from '@/hooks/`

- Find: `from '../hooks/`
- Replace: `from '@/hooks/`

#### **Replace 4: Utils**
- Find: `from './utils/`
- Replace: `from '@/lib/utils/`

- Find: `from '../utils/`
- Replace: `from '@/lib/utils/`

#### **Replace 5: Services**
- Find: `from './services/`
- Replace: `from '@/services/`

- Find: `from '../services/`
- Replace: `from '@/services/`

#### **Replace 6: Config**
- Find: `from './config/`
- Replace: `from '@/config/`

- Find: `from '../config/`
- Replace: `from '@/config/`

#### **Replace 7: Types**
- Find: `from './types'`
- Replace: `from '@/types'`

- Find: `from '../types'`
- Replace: `from '@/types'`

---

## 🔧 Update tsconfig.json

Make sure your `tsconfig.json` has the correct paths:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    // ... other options
  }
}
```

---

## 🔧 Update next.config.js (if needed)

No changes needed - `@/` alias works automatically!

---

## 🎨 Update globals.css Import

Update `/src/app/layout.tsx`:

```typescript
// Change from:
import '../styles/globals.css';

// To:
import '@/styles/globals.css';
```

---

## 🧪 Testing After Migration

### **1. Type Check**
```bash
npm run type-check
```

Fix any import errors.

### **2. Build**
```bash
npm run build
```

Should complete without errors.

### **3. Run Dev Server**
```bash
npm run dev
```

### **4. Test All Features**
- ✓ Page loads
- ✓ Create application
- ✓ Edit application
- ✓ Delete application
- ✓ Approve application
- ✓ Payment flow
- ✓ Upload documents
- ✓ View reports
- ✓ All modals open/close

---

## 🗑️ Cleanup (After Successful Migration)

Once everything works, delete old folders:

```bash
# ⚠️ ONLY after confirming everything works!

rm -rf components/  # (keep only src/components/)
rm -rf data/
rm -rf utils/
rm -rf config/
rm -rf hooks/
rm -rf services/
rm -rf types/
rm -rf styles/      # (keep only src/styles/)
```

---

## 📊 Migration Checklist

### **Folders Created**
- [ ] src/components/features/applications/
- [ ] src/components/features/approvals/
- [ ] src/components/features/dashboard/
- [ ] src/components/features/documents/
- [ ] src/components/features/payment/
- [ ] src/components/features/reports/
- [ ] src/components/common/
- [ ] src/components/layout/
- [ ] src/components/ui/
- [ ] src/components/figma/
- [ ] src/config/
- [ ] src/hooks/
- [ ] src/lib/data/
- [ ] src/lib/utils/
- [ ] src/services/
- [ ] src/styles/
- [ ] src/types/

### **Files Moved**
- [ ] All data files
- [ ] All utils files
- [ ] All config files
- [ ] All hooks files
- [ ] All services files
- [ ] All types files
- [ ] All styles files
- [ ] All application components (9)
- [ ] All approval components (5)
- [ ] All dashboard components (4)
- [ ] All document components (2)
- [ ] All payment components (2)
- [ ] All report components (4)
- [ ] All common components (4)
- [ ] All layout components (2)
- [ ] All UI components
- [ ] All Figma components

### **Imports Updated**
- [ ] Data imports use @/lib/data/
- [ ] Component imports use @/components/
- [ ] Hook imports use @/hooks/
- [ ] Utils imports use @/lib/utils/
- [ ] Service imports use @/services/
- [ ] Config imports use @/config/
- [ ] Type imports use @/types/
- [ ] Style imports use @/styles/

### **Testing**
- [ ] Type check passes
- [ ] Build succeeds
- [ ] Dev server runs
- [ ] All features work
- [ ] No console errors
- [ ] No 404 errors

### **Cleanup**
- [ ] Old folders deleted
- [ ] Documentation updated
- [ ] Git commit created

---

## 🎯 Quick Migration (Copy-Paste Method)

If you prefer to do it manually:

1. **Create all folders** (see Step 1)
2. **Open two file explorers side by side**
3. **Drag and drop files** from old location to new location
4. **Use VS Code Find & Replace** to update imports
5. **Test**
6. **Delete old folders**

---

## 🚨 Common Issues

### **Issue: Module not found**
**Solution:** Check the import path uses `@/` prefix

### **Issue: Cannot find module '@/lib/data/applications'**
**Solution:** Ensure file was moved to correct location

### **Issue: Circular dependency**
**Solution:** Check barrel exports (index.ts files)

### **Issue: Type errors after moving**
**Solution:** Restart TypeScript server in VS Code:
- `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

---

## ✅ Success Indicators

After migration, you should see:

✅ All files in `src/` folder  
✅ Clean folder structure by feature  
✅ No errors in terminal  
✅ Application runs normally  
✅ All imports use `@/` alias  
✅ Easy to find any file  
✅ Professional project structure  

---

## 📚 Benefits

### **Before (Scattered)**
```
components/ (32 files mixed together)
data/
utils/
config/
hooks/
services/
types/
styles/
src/
  app/
```

### **After (Organized)**
```
src/
  components/
    features/
      applications/ (9 files)
      approvals/ (5 files)
      dashboard/ (4 files)
      documents/ (2 files)
      payment/ (2 files)
      reports/ (4 files)
    common/ (4 files)
    layout/ (2 files)
    ui/ (all UI components)
    figma/ (Figma imports)
  config/
  hooks/
  lib/
  services/
  styles/
  types/
```

**Result:** 10x easier to navigate! 🚀

---

## 🎉 Ready to Migrate!

Follow the steps above and you'll have a professional, organized codebase!

**Need help?** The structure is clear, imports are documented, and testing steps are provided.

**Let's go! 🚀**
