# 🚀 Migration Guide: Restructure to src/ Folder

## ✅ What's Been Done

I've created the new folder structure and updated key files. Here's what's ready:

### Created Files:
1. ✅ `/src/app/layout.tsx` - Root layout with metadata
2. ✅ `/src/app/page.tsx` - Main page with updated imports
3. ✅ `/src/components/layout/Header.tsx` - Header with @ imports
4. ✅ `tsconfig.json` - Updated paths to `@/*` → `./src/*`

---

## 📋 Complete Migration Steps

### Step 1: Create Remaining Folder Structure

```bash
# Create all necessary directories
mkdir -p src/components/layout
mkdir -p src/components/common
mkdir -p src/components/modules
mkdir -p src/components/ui
mkdir -p src/config
mkdir -p src/hooks
mkdir -p src/lib/api
mkdir -p src/lib/constants
mkdir -p src/lib/data
mkdir -p src/lib/utils
mkdir -p src/services
mkdir -p src/styles
mkdir -p src/types
```

### Step 2: Move Layout Components

```bash
# Already created: src/components/layout/Header.tsx
# Now copy Sidebar
cp components/Sidebar.tsx src/components/layout/Sidebar.tsx
```

Then update imports in `src/components/layout/Sidebar.tsx`:
- Change `'./components/*'` → `'@/components/*'`
- Change `'../components/*'` → `'@/components/*'`

### Step 3: Move Common Components

```bash
cp components/WaterRipple.tsx src/components/common/WaterRipple.tsx
cp components/figma/ImageWithFallback.tsx src/components/common/ImageWithFallback.tsx
```

### Step 4: Move Module Components

```bash
# Copy all feature-specific components to modules/
cp components/AIAnalyticsDashboard.tsx src/components/modules/
cp components/AIApprovalMonitor.tsx src/components/modules/
cp components/AllocateApplicationModal.tsx src/components/modules/
cp components/ApplicationDetailsDialog.tsx src/components/modules/
cp components/ApplicationSubmitSuccessDialog.tsx src/components/modules/
cp components/ApplicationViewModal.tsx src/components/modules/
cp components/ApplicationsTable.tsx src/components/modules/
cp components/ApplicationsTableSimple.tsx src/components/modules/
cp components/ApplicationsTableVibrant.tsx src/components/modules/
cp components/ApprovalModal.tsx src/components/modules/
cp components/ApproveApplicationModal.tsx src/components/modules/
cp components/ApproveOnlineTransaction.tsx src/components/modules/
cp components/CollapsibleFilterSection.tsx src/components/modules/
cp components/CRMDashboard.tsx src/components/modules/
cp components/DDChequeApproval.tsx src/components/modules/
cp components/DDChequeCollapsibleFilter.tsx src/components/modules/
cp components/DocumentViewerModal.tsx src/components/modules/
cp components/DownloadRegisterModal.tsx src/components/modules/
cp components/EditApplicationModal.tsx src/components/modules/
cp components/FilterBar.tsx src/components/modules/
cp components/FloatingAIButton.tsx src/components/modules/
cp components/PaymentModal.tsx src/components/modules/
cp components/PaymentTransactionStatusModal.tsx src/components/modules/
cp components/RegisterApplicationModal.tsx src/components/modules/
cp components/StatsGrid.tsx src/components/modules/
cp components/UploadNotesheetModal.tsx src/components/modules/
cp components/ZonewiseFilterReportModal.tsx src/components/modules/
cp components/ZonewiseTable.tsx src/components/modules/
```

### Step 5: Move UI Components

```bash
# Copy all shadcn/ui components
cp -r components/ui/* src/components/ui/
```

### Step 6: Move Services

```bash
cp services/api.service.ts src/services/
cp services/application.service.ts src/services/
cp services/auth.service.ts src/services/
cp services/file.service.ts src/services/
```

### Step 7: Move Hooks

```bash
cp hooks/useApplication.ts src/hooks/
cp hooks/useApplications.ts src/hooks/
cp hooks/useFileUpload.ts src/hooks/
```

### Step 8: Move Types

```bash
cp types/index.ts src/types/
```

### Step 9: Move Config

```bash
cp config/api.config.ts src/config/
```

### Step 10: Move Utils & Data

```bash
cp utils/helpers.ts src/lib/utils/
cp utils/smsNotification.ts src/lib/utils/
cp data/applications.ts src/lib/data/
```

### Step 11: Move Styles

```bash
cp styles/globals.css src/styles/
```

---

## 🔄 Update All Imports

After moving files, you need to update imports in each file. Here's the pattern:

### Before (Old Imports):
```typescript
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CRMDashboard } from './components/CRMDashboard';
import { applications } from './data/applications';
import { Button } from './components/ui/button';
import { useApplications } from './hooks/useApplications';
import { apiService } from './services/api.service';
```

### After (New Imports):
```typescript
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { CRMDashboard } from '@/components/modules/CRMDashboard';
import { applications } from '@/lib/data/applications';
import { Button } from '@/components/ui/button';
import { useApplications } from '@/hooks/useApplications';
import { apiService } from '@/services/api.service';
```

---

## 🔍 Find & Replace Patterns

Use your IDE's find & replace (Ctrl+Shift+H in VS Code) across all files in `/src`:

### Pattern 1: Component Imports
Find: `from '\./components/([^']+)'`  
Replace: `from '@/components/modules/$1'`

### Pattern 2: UI Component Imports  
Find: `from '\./ui/([^']+)'`  
Replace: `from '@/components/ui/$1'`

### Pattern 3: Relative Imports  
Find: `from '\.\./components/([^']+)'`  
Replace: `from '@/components/modules/$1'`

### Pattern 4: Data Imports  
Find: `from '\./data/([^']+)'`  
Replace: `from '@/lib/data/$1'`

### Pattern 5: Service Imports  
Find: `from '\./services/([^']+)'`  
Replace: `from '@/services/$1'`

### Pattern 6: Hook Imports  
Find: `from '\./hooks/([^']+)'`  
Replace: `from '@/hooks/$1'`

### Pattern 7: Utils Imports  
Find: `from '\./utils/([^']+)'`  
Replace: `from '@/lib/utils/$1'`

---

## 📝 Specific Import Updates

### In All Module Components:

1. **Common Components:**
   ```typescript
   // Old
   import { WaterRipple } from './WaterRipple';
   
   // New
   import { WaterRipple } from '@/components/common/WaterRipple';
   ```

2. **UI Components:**
   ```typescript
   // Old
   import { Button } from './ui/button';
   import { Dialog } from './ui/dialog';
   
   // New
   import { Button } from '@/components/ui/button';
   import { Dialog } from '@/components/ui/dialog';
   ```

3. **Other Modules:**
   ```typescript
   // Old
   import { AIAnalyticsDashboard } from './AIAnalyticsDashboard';
   
   // New
   import { AIAnalyticsDashboard } from '@/components/modules/AIAnalyticsDashboard';
   ```

4. **Services:**
   ```typescript
   // Old
   import { applicationService } from '../services/application.service';
   
   // New
   import { applicationService } from '@/services/application.service';
   ```

5. **Hooks:**
   ```typescript
   // Old
   import { useApplications } from '../hooks/useApplications';
   
   // New
   import { useApplications } from '@/hooks/useApplications';
   ```

6. **Utils:**
   ```typescript
   // Old
   import { sendSMSNotification } from '../utils/smsNotification';
   
   // New
   import { sendSMSNotification } from '@/lib/utils/smsNotification';
   ```

7. **Data:**
   ```typescript
   // Old
   import { applications } from './data/applications';
   
   // New
   import { applications } from '@/lib/data/applications';
   ```

---

## ✅ Verification Steps

After migration, verify everything works:

### 1. Type Checking
```bash
npm run type-check
```
Should show no errors.

### 2. Start Dev Server
```bash
npm run dev
```
Should start without errors.

### 3. Manual Testing
- [ ] App loads at http://localhost:3000
- [ ] Header renders correctly
- [ ] Sidebar works
- [ ] CRM Dashboard displays
- [ ] Click "Register Application" - modal opens
- [ ] Create an application - works
- [ ] Edit an application - works
- [ ] View application details - works
- [ ] Filters work
- [ ] Pagination works
- [ ] File uploads work
- [ ] No console errors

### 4. Build Test
```bash
npm run build
```
Should build successfully.

---

## 🧹 Cleanup (After Verification)

Once everything works, remove old folders:

```bash
# ⚠️ ONLY DO THIS AFTER VERIFYING EVERYTHING WORKS!

# Remove old folders
rm -rf components/
rm -rf services/
rm -rf hooks/
rm -rf types/
rm -rf config/
rm -rf utils/
rm -rf data/
rm -rf styles/

# Keep root files
# - App.tsx (as backup)
# - App.production.tsx (as backup)
# - All .md files
# - tsconfig.json
# - package.json
# - next.config.js
```

---

## 🚨 Troubleshooting

### Error: Cannot find module '@/...'

**Solution:** 
1. Check `tsconfig.json` has `"@/*": ["./src/*"]`
2. Restart VS Code
3. Restart dev server

### Error: Module not found '../../components/...'

**Solution:** You missed updating an import. Use find & replace patterns above.

### Error: React hooks must be called in function components

**Solution:** Make sure all components in `/src/app/` start with `'use client';` directive.

### TypeScript errors in moved files

**Solution:**
1. Check all imports updated
2. Make sure UI components are in `/src/components/ui/`
3. Restart TypeScript server (Ctrl+Shift+P → "Restart TS Server")

---

## 📦 Auto-Migration Script (Advanced)

If you want to automate, create `migrate.sh`:

```bash
#!/bin/bash

echo "🚀 Starting migration to src/ folder..."

# Create folders
echo "📁 Creating folder structure..."
mkdir -p src/{app,components/{layout,common,modules,ui},config,hooks,lib/{api,constants,data,utils},services,styles,types}

# Copy files
echo "📦 Copying files..."
cp App.tsx src/app/page.tsx.bak  # Backup
cp components/Header.tsx src/components/layout/
cp components/Sidebar.tsx src/components/layout/
cp components/WaterRipple.tsx src/components/common/
cp -r components/ui/* src/components/ui/
cp services/* src/services/
cp hooks/* src/hooks/
cp types/* src/types/
cp config/* src/config/
cp utils/* src/lib/utils/
cp data/* src/lib/data/
cp styles/* src/styles/

# Copy module components
for file in components/*.tsx; do
  if [[ ! "$file" =~ (Header|Sidebar|WaterRipple|figma) ]]; then
    cp "$file" src/components/modules/
  fi
done

echo "✅ Files copied! Now update imports manually or use IDE find & replace."
echo "📝 See MIGRATE_TO_SRC.md for import update patterns."
```

---

## 🎯 Final Structure

After migration, you should have:

```
project-root/
├── src/                      # ✅ NEW: All source code
│   ├── app/
│   ├── components/
│   ├── config/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── styles/
│   └── types/
│
├── public/                   # Unchanged
├── node_modules/             # Unchanged
├── *.md                      # Documentation
├── package.json
├── tsconfig.json             # ✅ Updated paths
├── next.config.js
└── .gitignore
```

---

## ⏱️ Estimated Time

- **Manual migration:** 1-2 hours (careful, methodical)
- **With script + cleanup:** 30-45 minutes  
- **Testing:** 30 minutes

**Total:** ~2-3 hours for complete migration

---

## 📚 Benefits After Migration

✅ **Clean structure** - Industry standard organization  
✅ **Better imports** - `@/` instead of `../../`  
✅ **Scalable** - Easy to add new features  
✅ **Professional** - Matches modern Next.js apps  
✅ **IDE support** - Better auto-complete  
✅ **Team ready** - New developers find files easily  

---

**Status:** Ready to Execute  
**Risk:** Low (with proper testing)  
**Reversible:** Yes (keep backups)  

**Good luck with the migration! 🚀**
