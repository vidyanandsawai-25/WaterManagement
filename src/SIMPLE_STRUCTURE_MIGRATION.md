# 🚀 Simple Folder Structure Migration

## 🎯 New Structure (Simpler & Cleaner!)

```
project-root/
├── src/                           # ALL code under src/
│   ├── app/                      # ✅ Already exists
│   ├── components/               # ✅ Organizing now
│   ├── config/                   # 🔄 Moving
│   ├── data/                     # 🔄 Moving
│   ├── hooks/                    # 🔄 Moving
│   ├── imports/                  # 🔄 Moving
│   ├── lib/                      # ✅ Keeping actions
│   ├── public/                   # 🔄 Moving (optional)
│   ├── services/                 # 🔄 Moving
│   ├── styles/                   # 🔄 Moving
│   ├── types/                    # 🔄 Moving
│   └── utils/                    # 🔄 Moving
│
├── package.json
├── tsconfig.json
└── next.config.js
```

---

## 📋 Migration Commands

Run these commands in your terminal:

### **Step 1: Create Folders**
```bash
# Create all necessary folders
mkdir -p src/components/features/applications
mkdir -p src/components/features/approvals
mkdir -p src/components/features/dashboard
mkdir -p src/components/features/documents
mkdir -p src/components/features/payment
mkdir -p src/components/features/reports
mkdir -p src/components/common
mkdir -p src/components/layout
mkdir -p src/components/ui
mkdir -p src/components/figma
mkdir -p src/config
mkdir -p src/data
mkdir -p src/hooks
mkdir -p src/imports
mkdir -p src/services
mkdir -p src/styles
mkdir -p src/types
mkdir -p src/utils
```

### **Step 2: Move Files**

#### **A. Move data/**
```bash
cp data/applications.ts src/data/applications.ts
```

#### **B. Move config/**
```bash
cp config/api.config.ts src/config/api.config.ts
```

#### **C. Move hooks/**
```bash
cp hooks/useApplication.ts src/hooks/useApplication.ts
cp hooks/useApplications.ts src/hooks/useApplications.ts
cp hooks/useFileUpload.ts src/hooks/useFileUpload.ts
```

#### **D. Move imports/**
```bash
cp -r imports/* src/imports/
```

#### **E. Move services/**
```bash
cp services/api.service.ts src/services/api.service.ts
cp services/application.service.ts src/services/application.service.ts
cp services/auth.service.ts src/services/auth.service.ts
cp services/file.service.ts src/services/file.service.ts
```

#### **F. Move types/**
```bash
cp types/index.ts src/types/index.ts
```

#### **G. Move utils/**
```bash
cp utils/helpers.ts src/utils/helpers.ts
cp utils/smsNotification.ts src/utils/smsNotification.ts
```

#### **H. Move styles/**
```bash
cp styles/globals.css src/styles/globals.css
```

#### **I. Move components to features/**

**Applications:**
```bash
cp components/ApplicationsTable.tsx src/components/features/applications/
cp components/ApplicationsTableSimple.tsx src/components/features/applications/
cp components/ApplicationsTableVibrant.tsx src/components/features/applications/
cp components/ApplicationDetailsDialog.tsx src/components/features/applications/
cp components/ApplicationViewModal.tsx src/components/features/applications/
cp components/RegisterApplicationModal.tsx src/components/features/applications/
cp components/EditApplicationModal.tsx src/components/features/applications/
cp components/AllocateApplicationModal.tsx src/components/features/applications/
cp components/ApplicationSubmitSuccessDialog.tsx src/components/features/applications/
```

**Approvals:**
```bash
cp components/ApproveApplicationModal.tsx src/components/features/approvals/
cp components/ApprovalModal.tsx src/components/features/approvals/
cp components/ApproveOnlineTransaction.tsx src/components/features/approvals/
cp components/DDChequeApproval.tsx src/components/features/approvals/
cp components/DDChequeCollapsibleFilter.tsx src/components/features/approvals/
```

**Dashboard:**
```bash
cp components/CRMDashboard.tsx src/components/features/dashboard/
cp components/StatsGrid.tsx src/components/features/dashboard/
cp components/FilterBar.tsx src/components/features/dashboard/
cp components/CollapsibleFilterSection.tsx src/components/features/dashboard/
```

**Documents:**
```bash
cp components/DocumentViewerModal.tsx src/components/features/documents/
cp components/UploadNotesheetModal.tsx src/components/features/documents/
```

**Payment:**
```bash
cp components/PaymentModal.tsx src/components/features/payment/
cp components/PaymentTransactionStatusModal.tsx src/components/features/payment/
```

**Reports:**
```bash
cp components/DownloadRegisterModal.tsx src/components/features/reports/
cp components/ZonewiseFilterReportModal.tsx src/components/features/reports/
cp components/ZonewiseTable.tsx src/components/features/reports/
cp components/AIAnalyticsDashboard.tsx src/components/features/reports/
```

**Common:**
```bash
cp components/WaterRipple.tsx src/components/common/
cp components/FloatingAIButton.tsx src/components/common/
cp components/AIApprovalMonitor.tsx src/components/common/
```

**Layout:**
```bash
cp components/Sidebar.tsx src/components/layout/
```

**UI:**
```bash
cp -r components/ui/* src/components/ui/
```

**Figma:**
```bash
cp -r components/figma/* src/components/figma/
```

---

## 🔧 Update Import Paths

Use VS Code Find & Replace (`Ctrl+Shift+H` or `Cmd+Shift+H`):

### **1. Data imports**
- Find: `from './data/applications'`
- Replace: `from '@/data/applications'`

- Find: `from '../data/applications'`
- Replace: `from '@/data/applications'`

- Find: `from '../../data/applications'`
- Replace: `from '@/data/applications'`

### **2. Config imports**
- Find: `from './config/`
- Replace: `from '@/config/`

- Find: `from '../config/`
- Replace: `from '@/config/`

### **3. Hooks imports**
- Find: `from './hooks/`
- Replace: `from '@/hooks/`

- Find: `from '../hooks/`
- Replace: `from '@/hooks/`

### **4. Services imports**
- Find: `from './services/`
- Replace: `from '@/services/`

- Find: `from '../services/`
- Replace: `from '@/services/`

### **5. Utils imports**
- Find: `from './utils/`
- Replace: `from '@/utils/`

- Find: `from '../utils/`
- Replace: `from '@/utils/`

### **6. Types imports**
- Find: `from './types'`
- Replace: `from '@/types'`

- Find: `from '../types'`
- Replace: `from '@/types'`

### **7. Styles imports**
- Find: `'../styles/globals.css'`
- Replace: `'@/styles/globals.css'`

### **8. Imports folder**
- Find: `from './imports/`
- Replace: `from '@/imports/`

- Find: `from '../imports/`
- Replace: `from '@/imports/`

---

## 📝 Update Specific Files

### **Update src/app/page.tsx**
```typescript
// Change:
import { applications as initialApplications } from '@/lib/data/applications';

// To:
import { applications as initialApplications } from '@/data/applications';
```

### **Update src/app/layout.tsx**
```typescript
// Change:
import '../styles/globals.css';

// To:
import '@/styles/globals.css';
```

### **Update src/app/api/applications/route.ts**
```typescript
// Change:
import { applications as mockApplications } from '@/lib/data/applications';

// To:
import { applications as mockApplications } from '@/data/applications';
```

### **Update src/app/api/applications/[id]/route.ts**
```typescript
// Change:
import { applications as mockApplications } from '@/lib/data/applications';

// To:
import { applications as mockApplications } from '@/data/applications';
```

### **Update src/lib/actions/applications.ts**
Keep as is (it's already in src/lib/)

---

## 🎯 Final Structure

```
src/
├── app/                           # Next.js App Router
│   ├── api/
│   │   ├── applications/
│   │   └── health/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/                    # React Components
│   ├── client/
│   │   └── DashboardClient.tsx
│   ├── common/
│   │   ├── BackgroundPatterns.tsx
│   │   ├── WaterRipple.tsx
│   │   ├── FloatingAIButton.tsx
│   │   └── AIApprovalMonitor.tsx
│   ├── features/
│   │   ├── applications/        # 9 files
│   │   ├── approvals/           # 5 files
│   │   ├── dashboard/           # 4 files
│   │   ├── documents/           # 2 files
│   │   ├── payment/             # 2 files
│   │   └── reports/             # 4 files
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── ui/                      # 50+ files
│   └── figma/
│       └── ImageWithFallback.tsx
│
├── config/
│   └── api.config.ts
│
├── data/
│   └── applications.ts
│
├── hooks/
│   ├── useApplication.ts
│   ├── useApplications.ts
│   └── useFileUpload.ts
│
├── imports/
│   ├── ReportsDashboardDesign.tsx
│   └── svg-jus756szwr.ts
│
├── lib/
│   └── actions/
│       └── applications.ts
│
├── services/
│   ├── api.service.ts
│   ├── application.service.ts
│   ├── auth.service.ts
│   └── file.service.ts
│
├── styles/
│   └── globals.css
│
├── types/
│   └── index.ts
│
└── utils/
    ├── helpers.ts
    └── smsNotification.ts
```

---

## ✅ Testing

```bash
# 1. Type check
npm run type-check

# 2. Build
npm run build

# 3. Run dev
npm run dev
```

---

## 🗑️ Cleanup (After Testing!)

Once everything works:
```bash
rm -rf components/
rm -rf data/
rm -rf config/
rm -rf hooks/
rm -rf imports/
rm -rf services/
rm -rf types/
rm -rf utils/
rm -rf styles/
```

Keep only:
- src/
- public/ (in root or src/)
- package.json
- tsconfig.json
- next.config.js
- *.md

---

## 🎉 Done!

Your project now has a clean, simple structure with everything under `src/`!
