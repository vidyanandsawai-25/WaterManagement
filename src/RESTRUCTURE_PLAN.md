# 📁 Folder Restructure Plan

## Current Structure → New Structure

### ✅ New Folder Organization

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Home page (main CRM)
│
├── components/                   # All React components
│   ├── common/                  # Reusable UI components
│   │   ├── ImageWithFallback.tsx
│   │   └── WaterRipple.tsx
│   │
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── modules/                 # Feature-specific modules
│   │   ├── AIAnalyticsDashboard.tsx
│   │   ├── AIApprovalMonitor.tsx
│   │   ├── AllocateApplicationModal.tsx
│   │   ├── ApplicationDetailsDialog.tsx
│   │   ├── ApplicationSubmitSuccessDialog.tsx
│   │   ├── ApplicationViewModal.tsx
│   │   ├── ApplicationsTable.tsx
│   │   ├── ApplicationsTableSimple.tsx
│   │   ├── ApplicationsTableVibrant.tsx
│   │   ├── ApprovalModal.tsx
│   │   ├── ApproveApplicationModal.tsx
│   │   ├── ApproveOnlineTransaction.tsx
│   │   ├── CollapsibleFilterSection.tsx
│   │   ├── CRMDashboard.tsx
│   │   ├── DDChequeApproval.tsx
│   │   ├── DDChequeCollapsibleFilter.tsx
│   │   ├── DocumentViewerModal.tsx
│   │   ├── DownloadRegisterModal.tsx
│   │   ├── EditApplicationModal.tsx
│   │   ├── FilterBar.tsx
│   │   ├── FloatingAIButton.tsx
│   │   ├── PaymentModal.tsx
│   │   ├── PaymentTransactionStatusModal.tsx
│   │   ├── RegisterApplicationModal.tsx
│   │   ├── StatsGrid.tsx
│   │   ├── UploadNotesheetModal.tsx
│   │   ├── ZonewiseFilterReportModal.tsx
│   │   └── ZonewiseTable.tsx
│   │
│   └── ui/                      # shadcn/ui components (unchanged)
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       └── ... (all other ui components)
│
├── config/                       # Configuration files
│   └── api.config.ts
│
├── hooks/                        # Custom React hooks
│   ├── useApplication.ts
│   ├── useApplications.ts
│   └── useFileUpload.ts
│
├── lib/                          # Utilities and helpers
│   ├── api/                     # API client utilities
│   │   └── client.ts
│   │
│   ├── constants/               # Constants
│   │   └── routes.ts
│   │
│   ├── data/                    # Static/mock data
│   │   └── applications.ts
│   │
│   └── utils/                   # Helper functions
│       ├── helpers.ts
│       └── smsNotification.ts
│
├── services/                     # API services
│   ├── api.service.ts
│   ├── application.service.ts
│   ├── auth.service.ts
│   └── file.service.ts
│
├── styles/                       # Global styles
│   └── globals.css
│
└── types/                        # TypeScript definitions
    └── index.ts
```

---

## 📦 File Mapping

### Layout Components
| Old Path | New Path |
|----------|----------|
| `/components/Header.tsx` | `/src/components/layout/Header.tsx` |
| `/components/Sidebar.tsx` | `/src/components/layout/Sidebar.tsx` |

### Common Components
| Old Path | New Path |
|----------|----------|
| `/components/figma/ImageWithFallback.tsx` | `/src/components/common/ImageWithFallback.tsx` |
| `/components/WaterRipple.tsx` | `/src/components/common/WaterRipple.tsx` |

### Module Components (All in `/src/components/modules/`)
- AIAnalyticsDashboard.tsx
- AIApprovalMonitor.tsx
- AllocateApplicationModal.tsx
- ApplicationDetailsDialog.tsx
- ApplicationSubmitSuccessDialog.tsx
- ApplicationViewModal.tsx
- ApplicationsTable.tsx
- ApplicationsTableSimple.tsx
- ApplicationsTableVibrant.tsx
- ApprovalModal.tsx
- ApproveApplicationModal.tsx
- ApproveOnlineTransaction.tsx
- CollapsibleFilterSection.tsx
- CRMDashboard.tsx
- DDChequeApproval.tsx
- DDChequeCollapsibleFilter.tsx
- DocumentViewerModal.tsx
- DownloadRegisterModal.tsx
- EditApplicationModal.tsx
- FilterBar.tsx
- FloatingAIButton.tsx
- PaymentModal.tsx
- PaymentTransactionStatusModal.tsx
- RegisterApplicationModal.tsx
- StatsGrid.tsx
- UploadNotesheetModal.tsx
- ZonewiseFilterReportModal.tsx
- ZonewiseTable.tsx

### UI Components
Keep all `/components/ui/*` files → Move to `/src/components/ui/*`

### Services
| Old Path | New Path |
|----------|----------|
| `/services/api.service.ts` | `/src/services/api.service.ts` |
| `/services/application.service.ts` | `/src/services/application.service.ts` |
| `/services/auth.service.ts` | `/src/services/auth.service.ts` |
| `/services/file.service.ts` | `/src/services/file.service.ts` |

### Hooks
| Old Path | New Path |
|----------|----------|
| `/hooks/useApplication.ts` | `/src/hooks/useApplication.ts` |
| `/hooks/useApplications.ts` | `/src/hooks/useApplications.ts` |
| `/hooks/useFileUpload.ts` | `/src/hooks/useFileUpload.ts` |

### Types
| Old Path | New Path |
|----------|----------|
| `/types/index.ts` | `/src/types/index.ts` |

### Config
| Old Path | New Path |
|----------|----------|
| `/config/api.config.ts` | `/src/config/api.config.ts` |

### Utils & Data
| Old Path | New Path |
|----------|----------|
| `/utils/helpers.ts` | `/src/lib/utils/helpers.ts` |
| `/utils/smsNotification.ts` | `/src/lib/utils/smsNotification.ts` |
| `/data/applications.ts` | `/src/lib/data/applications.ts` |

### Styles
| Old Path | New Path |
|----------|----------|
| `/styles/globals.css` | `/src/styles/globals.css` |

---

## 🔄 Import Path Changes

### Before (Old Imports)
```typescript
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { applications } from './data/applications';
import { toast } from './components/ui/sonner';
```

### After (New Imports with Path Aliases)
```typescript
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { applications } from '@/lib/data/applications';
import { toast } from '@/components/ui/sonner';
```

---

## ⚙️ Configuration Updates

### tsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### next.config.js
No changes needed - already configured

---

## 🎯 Benefits

### 1. **Clear Separation of Concerns**
- Layout components separate from feature components
- Common/reusable components easily identifiable
- Module-specific components grouped together

### 2. **Better Scalability**
- Easy to add new modules
- Clear structure for new developers
- Prevents component sprawl

### 3. **Improved Imports**
- Path aliases (`@/`) for clean imports
- No more `../../../` relative paths
- Auto-complete works better in IDE

### 4. **Industry Standard**
- Follows Next.js 13+ conventions
- Similar to popular open-source projects
- Familiar to experienced developers

### 5. **Better Organization**
- All utilities in `/lib`
- All services in `/services`
- All hooks in `/hooks`
- Clear file purposes

---

## 📝 Migration Steps

### Step 1: Create New Folder Structure
```bash
mkdir -p src/app
mkdir -p src/components/{common,layout,modules,ui}
mkdir -p src/config
mkdir -p src/hooks
mkdir -p src/lib/{api,constants,data,utils}
mkdir -p src/services
mkdir -p src/styles
mkdir -p src/types
```

### Step 2: Move Files
- Copy all files to their new locations
- Update all import paths
- Test each component

### Step 3: Update Configuration
- Update `tsconfig.json` with path aliases
- Verify `next.config.js` settings

### Step 4: Testing
- Run `npm run dev`
- Test all features
- Verify all imports work
- Check for broken paths

### Step 5: Cleanup
- Delete old `/components` folder
- Delete old `/services` folder
- Delete old `/hooks` folder
- Delete old `/types` folder
- Delete old `/config` folder
- Delete old `/utils` folder
- Delete old `/data` folder
- Delete old `/styles` folder

---

## ✅ Verification Checklist

After restructuring:

- [ ] App runs without errors
- [ ] All components render correctly
- [ ] Header and Sidebar work
- [ ] CRM Dashboard functions properly
- [ ] All modals open/close correctly
- [ ] File uploads work
- [ ] Forms submit successfully
- [ ] Filters and search work
- [ ] Mobile responsiveness maintained
- [ ] No TypeScript errors
- [ ] No broken imports
- [ ] Hot reload works

---

## 🚀 Next Steps After Restructuring

1. **Update Documentation**
   - Update README.md with new structure
   - Update API_INTEGRATION_GUIDE.md
   - Create ARCHITECTURE.md

2. **Add More Organization**
   - Create `/src/lib/constants/` for magic numbers
   - Add `/src/middleware/` for Next.js middleware
   - Create `/src/contexts/` for React contexts

3. **Improve Code Quality**
   - Add ESLint rules for import order
   - Add Prettier for consistent formatting
   - Set up Husky for pre-commit hooks

---

**Status:** Ready to Execute ✅  
**Estimated Time:** 30 minutes  
**Risk Level:** Low (all imports will be updated)  
**Backup:** Keep old `/App.tsx` as `/App.backup.tsx`
