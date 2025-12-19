# 🚀 Migration to src/ Folder Structure

## 📋 Goal
Move all project files under `src/` with a clean, professional folder structure following Next.js 14 best practices.

---

## 🎯 Target Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── applications/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── health/route.ts
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
│
├── components/                   # React Components
│   ├── client/                  # Client Components ('use client')
│   │   ├── DashboardClient.tsx
│   │   └── ...
│   │
│   ├── common/                  # Shared/Common Components
│   │   ├── BackgroundPatterns.tsx
│   │   ├── WaterRipple.tsx
│   │   └── ...
│   │
│   ├── features/                # Feature-specific Components
│   │   ├── applications/       # Application-related
│   │   │   ├── ApplicationsTable.tsx
│   │   │   ├── ApplicationDetailsDialog.tsx
│   │   │   ├── ApplicationViewModal.tsx
│   │   │   ├── RegisterApplicationModal.tsx
│   │   │   ├── EditApplicationModal.tsx
│   │   │   ├── AllocateApplicationModal.tsx
│   │   │   └── ApplicationSubmitSuccessDialog.tsx
│   │   │
│   │   ├── approvals/          # Approval-related
│   │   │   ├── ApproveApplicationModal.tsx
│   │   │   ├── ApprovalModal.tsx
│   │   │   ├── ApproveOnlineTransaction.tsx
│   │   │   └── DDChequeApproval.tsx
│   │   │
│   │   ├── payment/            # Payment-related
│   │   │   ├── PaymentModal.tsx
│   │   │   └── PaymentTransactionStatusModal.tsx
│   │   │
│   │   ├── documents/          # Document-related
│   │   │   ├── DocumentViewerModal.tsx
│   │   │   └── UploadNotesheetModal.tsx
│   │   │
│   │   ├── reports/            # Reports & Analytics
│   │   │   ├── DownloadRegisterModal.tsx
│   │   │   ├── ZonewiseFilterReportModal.tsx
│   │   │   ├── ZonewiseTable.tsx
│   │   │   └── AIAnalyticsDashboard.tsx
│   │   │
│   │   └── dashboard/          # Dashboard-specific
│   │       ├── CRMDashboard.tsx
│   │       ├── StatsGrid.tsx
│   │       ├── FilterBar.tsx
│   │       └── CollapsibleFilterSection.tsx
│   │
│   ├── layout/                  # Layout Components
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── ui/                      # UI Components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ... (all shadcn components)
│   │
│   └── figma/                   # Figma-imported Components
│       └── ImageWithFallback.tsx
│
├── config/                       # Configuration Files
│   └── api.config.ts
│
├── hooks/                        # Custom React Hooks
│   ├── useApplication.ts
│   ├── useApplications.ts
│   └── useFileUpload.ts
│
├── lib/                          # Library Code
│   ├── actions/                 # Server Actions
│   │   └── applications.ts
│   ├── data/                    # Mock/Static Data
│   │   └── applications.ts
│   └── utils/                   # Utility Functions
│       ├── helpers.ts
│       └── smsNotification.ts
│
├── services/                     # API Services
│   ├── api.service.ts
│   ├── application.service.ts
│   ├── auth.service.ts
│   └── file.service.ts
│
└── types/                        # TypeScript Types
    └── index.ts
```

---

## 📦 Migration Map

### **1. Components** (components/ → src/components/)

#### **Client Components** → `src/components/client/`
- ✅ DashboardClient.tsx (already exists)

#### **Common Components** → `src/components/common/`
- BackgroundPatterns.tsx (already exists)
- WaterRipple.tsx
- FloatingAIButton.tsx
- AIApprovalMonitor.tsx

#### **Features - Applications** → `src/components/features/applications/`
- ApplicationsTable.tsx
- ApplicationsTableSimple.tsx
- ApplicationsTableVibrant.tsx
- ApplicationDetailsDialog.tsx
- ApplicationViewModal.tsx
- RegisterApplicationModal.tsx
- EditApplicationModal.tsx
- AllocateApplicationModal.tsx
- ApplicationSubmitSuccessDialog.tsx

#### **Features - Approvals** → `src/components/features/approvals/`
- ApproveApplicationModal.tsx
- ApprovalModal.tsx
- ApproveOnlineTransaction.tsx
- DDChequeApproval.tsx
- DDChequeCollapsibleFilter.tsx

#### **Features - Payment** → `src/components/features/payment/`
- PaymentModal.tsx
- PaymentTransactionStatusModal.tsx

#### **Features - Documents** → `src/components/features/documents/`
- DocumentViewerModal.tsx
- UploadNotesheetModal.tsx

#### **Features - Reports** → `src/components/features/reports/`
- DownloadRegisterModal.tsx
- ZonewiseFilterReportModal.tsx
- ZonewiseTable.tsx
- AIAnalyticsDashboard.tsx

#### **Features - Dashboard** → `src/components/features/dashboard/`
- CRMDashboard.tsx
- StatsGrid.tsx
- FilterBar.tsx
- CollapsibleFilterSection.tsx

#### **Layout** → `src/components/layout/`
- Header.tsx (already exists)
- Sidebar.tsx

#### **UI** → `src/components/ui/`
- All shadcn/ui components (button.tsx, dialog.tsx, etc.)

#### **Figma** → `src/components/figma/`
- ImageWithFallback.tsx

---

### **2. Config** (config/ → src/config/)
- api.config.ts

---

### **3. Hooks** (hooks/ → src/hooks/)
- useApplication.ts
- useApplications.ts
- useFileUpload.ts

---

### **4. Lib** (data/, utils/ → src/lib/)

#### **Data** → `src/lib/data/`
- applications.ts (from /data/)

#### **Utils** → `src/lib/utils/`
- helpers.ts (from /utils/)
- smsNotification.ts (from /utils/)

#### **Actions** → `src/lib/actions/`
- applications.ts (already exists)

---

### **5. Services** (services/ → src/services/)
- api.service.ts
- application.service.ts
- auth.service.ts
- file.service.ts

---

### **6. Types** (types/ → src/types/)
- index.ts

---

### **7. App** (src/app/ - already exists)
- ✅ api/applications/route.ts
- ✅ api/applications/[id]/route.ts
- ✅ api/health/route.ts
- ✅ layout.tsx
- ✅ page.tsx

---

## 🔄 Import Path Updates

After migration, all imports need to use the `@/` alias:

### **Before:**
```typescript
import { applications } from '../data/applications';
import { Header } from '../components/Header';
import { useApplications } from '../hooks/useApplications';
```

### **After:**
```typescript
import { applications } from '@/lib/data/applications';
import { Header } from '@/components/layout/Header';
import { useApplications } from '@/hooks/useApplications';
```

---

## 🗑️ Files to Keep in Root

These files stay in root directory:
- Documentation (*.md files)
- Configuration files:
  - package.json
  - tsconfig.json
  - next.config.js
  - .gitignore
  - .env.local
- Public assets:
  - public/
- Styles:
  - styles/globals.css (or move to src/styles/)

---

## 📝 Step-by-Step Migration

### **Phase 1: Create Folder Structure**
1. Create all folders under src/
2. Verify tsconfig.json paths

### **Phase 2: Move Components**
1. Move to features/ subfolders
2. Move to common/
3. Move to layout/
4. Move ui/ components
5. Update all imports

### **Phase 3: Move Other Files**
1. Move config/
2. Move hooks/
3. Move lib/
4. Move services/
5. Move types/
6. Update all imports

### **Phase 4: Testing**
1. Run type check
2. Test all features
3. Fix broken imports
4. Verify build works

### **Phase 5: Cleanup**
1. Delete old folders
2. Update documentation
3. Commit changes

---

## ✅ Benefits

### **Organization**
- Clear separation of concerns
- Easy to find files
- Scalable structure

### **Developer Experience**
- Logical grouping
- Faster navigation
- Better IDE autocomplete

### **Maintenance**
- Easy to refactor
- Clear dependencies
- Better code organization

### **Team Collaboration**
- Consistent structure
- Easy onboarding
- Clear conventions

---

## 🎯 Naming Conventions

### **Folders:**
- lowercase (features, components)
- kebab-case for multi-word (api-routes)

### **Files:**
- PascalCase for components (Header.tsx)
- camelCase for utilities (helpers.ts)
- kebab-case for config (api.config.ts)

### **Component Organization:**
```
feature/
├── FeatureName.tsx          # Main component
├── FeatureName.types.ts     # Types (if large)
├── FeatureName.utils.ts     # Utilities (if needed)
└── components/              # Sub-components (if many)
    ├── SubComponent1.tsx
    └── SubComponent2.tsx
```

---

## 📊 Migration Progress Tracker

- [ ] Create folder structure
- [ ] Move components/features/applications/
- [ ] Move components/features/approvals/
- [ ] Move components/features/payment/
- [ ] Move components/features/documents/
- [ ] Move components/features/reports/
- [ ] Move components/features/dashboard/
- [ ] Move components/common/
- [ ] Move components/layout/
- [ ] Move components/ui/
- [ ] Move config/
- [ ] Move hooks/
- [ ] Move lib/data/
- [ ] Move lib/utils/
- [ ] Move services/
- [ ] Move types/
- [ ] Update all imports
- [ ] Test build
- [ ] Test all features
- [ ] Update documentation
- [ ] Delete old folders

---

## 🚀 Ready to Execute

This plan will create a professional, scalable folder structure that:
- ✅ Follows Next.js 14 best practices
- ✅ Groups related code together
- ✅ Makes navigation easier
- ✅ Improves maintainability
- ✅ Scales with your project

**Next step:** Execute the migration!
