# 🚀 Migration Quick Reference Card

## ⚡ Super Quick Start

```bash
# 1. Run migration script
# Windows: .\migrate.ps1
# Mac/Linux: chmod +x migrate.sh && ./migrate.sh

# 2. Move component files (by feature)
# See checklist below ⬇️

# 3. Update imports (VS Code: Ctrl+Shift+H)
# See import table below ⬇️

# 4. Test
npm run type-check && npm run build && npm run dev
```

---

## 📁 Target Structure

```
src/
├── app/          ✅ Already exists
├── components/   📦 Feature-based organization
├── config/       🔧 Configuration
├── data/         ✅ DONE
├── hooks/        🪝 Custom hooks
├── imports/      📥 Figma imports
├── lib/          ✅ Server actions
├── services/     🌐 API services
├── styles/       🎨 Global styles
├── types/        📝 TypeScript types
└── utils/        🛠️ Utilities
```

---

## ✅ Component Migration Checklist

### **Applications** → `src/components/features/applications/`
- [ ] ApplicationsTable.tsx
- [ ] ApplicationsTableSimple.tsx
- [ ] ApplicationsTableVibrant.tsx
- [ ] ApplicationDetailsDialog.tsx
- [ ] ApplicationViewModal.tsx
- [ ] RegisterApplicationModal.tsx
- [ ] EditApplicationModal.tsx
- [ ] AllocateApplicationModal.tsx
- [ ] ApplicationSubmitSuccessDialog.tsx

### **Approvals** → `src/components/features/approvals/`
- [ ] ApproveApplicationModal.tsx
- [ ] ApprovalModal.tsx
- [ ] ApproveOnlineTransaction.tsx
- [ ] DDChequeApproval.tsx
- [ ] DDChequeCollapsibleFilter.tsx

### **Dashboard** → `src/components/features/dashboard/`
- [ ] CRMDashboard.tsx
- [ ] StatsGrid.tsx
- [ ] FilterBar.tsx
- [ ] CollapsibleFilterSection.tsx

### **Documents** → `src/components/features/documents/`
- [ ] DocumentViewerModal.tsx
- [ ] UploadNotesheetModal.tsx

### **Payment** → `src/components/features/payment/`
- [ ] PaymentModal.tsx
- [ ] PaymentTransactionStatusModal.tsx

### **Reports** → `src/components/features/reports/`
- [ ] DownloadRegisterModal.tsx
- [ ] ZonewiseFilterReportModal.tsx
- [ ] ZonewiseTable.tsx
- [ ] AIAnalyticsDashboard.tsx

### **Common** → `src/components/common/`
- [ ] WaterRipple.tsx
- [ ] FloatingAIButton.tsx
- [ ] AIApprovalMonitor.tsx

### **Layout** → `src/components/layout/`
- [ ] Sidebar.tsx

---

## 🔄 Import Replacements (VS Code: Ctrl+Shift+H)

| Find | Replace |
|------|---------|
| `'./data/applications'` | `'@/data/applications'` |
| `'../data/applications'` | `'@/data/applications'` |
| `'./config/` | `'@/config/` |
| `'../config/` | `'@/config/` |
| `'./hooks/` | `'@/hooks/` |
| `'../hooks/` | `'@/hooks/` |
| `'./services/` | `'@/services/` |
| `'../services/` | `'@/services/` |
| `'./utils/` | `'@/utils/` |
| `'../utils/` | `'@/utils/` |
| `'./types'` | `'@/types'` |
| `'../types'` | `'@/types'` |
| `'../styles/globals.css'` | `'@/styles/globals.css'` |
| `'./imports/` | `'@/imports/` |

---

## 📦 Component Import Examples

### **Before**
```typescript
import { ApplicationsTable } from './components/ApplicationsTable';
import { CRMDashboard } from '../components/CRMDashboard';
import { PaymentModal } from './components/PaymentModal';
import { Sidebar } from './components/Sidebar';
import { WaterRipple } from './components/WaterRipple';
import { applications } from './data/applications';
```

### **After**
```typescript
import { ApplicationsTable } from '@/components/features/applications';
import { CRMDashboard } from '@/components/features/dashboard';
import { PaymentModal } from '@/components/features/payment';
import { Sidebar } from '@/components/layout';
import { WaterRipple } from '@/components/common';
import { applications } from '@/data/applications';
```

---

## 🧪 Testing Commands

```bash
# Type check
npm run type-check

# Build
npm run build

# Run dev
npm run dev

# All in one
npm run type-check && npm run build && npm run dev
```

---

## 🗑️ Cleanup (After Testing)

```bash
# Windows PowerShell
Remove-Item -Recurse -Force components,data,config,hooks,imports,services,types,utils,styles

# Mac/Linux
rm -rf components/ data/ config/ hooks/ imports/ services/ types/ utils/ styles/
```

---

## 📊 Progress Tracker

### **Folders Moved**
- [ ] config/ → src/config/
- [x] data/ → src/data/ ✅
- [ ] hooks/ → src/hooks/
- [ ] imports/ → src/imports/
- [ ] services/ → src/services/
- [ ] styles/ → src/styles/
- [ ] types/ → src/types/
- [ ] utils/ → src/utils/

### **Components Moved**
- [ ] Applications (9)
- [ ] Approvals (5)
- [ ] Dashboard (4)
- [ ] Documents (2)
- [ ] Payment (2)
- [ ] Reports (4)
- [ ] Common (3)
- [ ] Layout (1)
- [ ] UI (50+)

### **Imports Updated**
- [x] Data ✅
- [ ] Config
- [ ] Hooks
- [ ] Services
- [ ] Utils
- [ ] Types
- [ ] Styles
- [ ] Components

### **Testing**
- [ ] Type check passes
- [ ] Build succeeds
- [ ] Dev server runs
- [ ] All features work
- [ ] No errors

---

## 🎯 Success Criteria

✅ All code under src/  
✅ Features grouped logically  
✅ Clean @ imports  
✅ Build succeeds  
✅ All features work  
✅ No console errors  
✅ Professional structure  

---

## 🆘 Quick Troubleshooting

### **"Cannot find module '@/data/applications'"**
→ File not moved to src/data/ yet

### **"Type errors after moving"**
→ Restart TypeScript server (VS Code: Ctrl+Shift+P → "Restart TS Server")

### **"Build fails"**
→ Check all imports updated to @/ paths

### **"Components not rendering"**
→ Check component moved to correct feature folder

---

## 📚 Documentation Files

| File | Use When |
|------|----------|
| **This file** | Quick reference |
| **FINAL_MIGRATION_SUMMARY.md** | Complete summary |
| **SIMPLE_STRUCTURE_MIGRATION.md** | Step-by-step |
| **FOLDER_STRUCTURE_VISUAL.md** | Visual guide |
| **migrate.sh / migrate.ps1** | Automated |

---

## ⚡ Fastest Migration Path

1. **Run script**: `.\migrate.ps1` or `./migrate.sh`
2. **Move components**: Use file explorer, drag to feature folders
3. **Update imports**: VS Code Find & Replace (5 minutes)
4. **Test**: `npm run type-check && npm run dev`
5. **Done!** 🎉

---

## 💡 Pro Tips

✨ **Tip 1**: Use VS Code drag-and-drop - it auto-updates imports!  
✨ **Tip 2**: Move one feature at a time, test, continue  
✨ **Tip 3**: Barrel exports make imports cleaner  
✨ **Tip 4**: Git commit after each successful step  
✨ **Tip 5**: Keep old files until everything works  

---

## 🎉 You Got This!

Simple steps, clear checklist, comprehensive docs.  
**Estimated time: 30-60 minutes**

**Let's do it! 🚀**
