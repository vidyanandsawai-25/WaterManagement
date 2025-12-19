# 🧹 File Cleanup & Consolidation Plan

## ✅ Safe to Delete - Will NOT Affect Design

### 1. Unused App Entry Points (Next.js doesn't use these)
- `/App.tsx` - Old React+Vite entry (Next.js uses /src/app/page.tsx)
- `/App.production.tsx` - Production version (not used)

### 2. Duplicate Table Components (Only ApplicationsTableSimple is used)
- `/components/ApplicationsTable.tsx` - NOT USED
- `/components/ApplicationsTableVibrant.tsx` - NOT USED
- **KEEP:** `/components/ApplicationsTableSimple.tsx` ✅ ACTIVELY USED by CRMDashboard

### 3. Duplicate Files in /src/
- `/src/data/applications.ts` - Duplicate of `/data/applications.ts`
- `/src/services/api.service.ts` - Duplicate of `/services/api.service.ts`

### 4. Empty Index Files in /src/components/
- `/src/components/features/applications/index.ts`
- `/src/components/features/approvals/index.ts`
- `/src/components/features/dashboard/index.ts`
- `/src/components/features/documents/index.ts`
- `/src/components/features/payment/index.ts`
- `/src/components/features/reports/index.ts`
- `/src/components/common/index.ts`
- `/src/components/layout/index.ts`
- `/src/components/index.ts`

### 5. Duplicate Layout Components in /src/
- `/src/components/layout/Header.tsx` - Has wrong imports
- `/src/components/common/BackgroundPatterns.tsx` - Can extract from App.tsx if needed
- **KEEP:** `/components/Header.tsx` ✅
- **KEEP:** `/components/Sidebar.tsx` ✅

## Total Files to Delete: ~17 files
## Design Impact: ZERO ❌ (None of these files are actively used)

---

## What Stays (Your Active Components - Will NOT Touch)

### Core Pages
- ✅ `/components/CRMDashboard.tsx`
- ✅ `/components/ApproveOnlineTransaction.tsx`

### Layout
- ✅ `/components/Header.tsx`
- ✅ `/components/Sidebar.tsx`
- ✅ `/components/StatsGrid.tsx`
- ✅ `/components/FilterBar.tsx`

### Tables
- ✅ `/components/ApplicationsTableSimple.tsx` (ACTIVE - Used by CRMDashboard)
- ✅ `/components/ZonewiseTable.tsx`

### All 14 Modal Components (Keep All - Different Purposes)
- ✅ AllocateApplicationModal
- ✅ ApplicationDetailsDialog
- ✅ ApplicationSubmitSuccessDialog
- ✅ ApplicationViewModal
- ✅ ApprovalModal
- ✅ ApproveApplicationModal
- ✅ DocumentViewerModal
- ✅ DownloadRegisterModal
- ✅ EditApplicationModal
- ✅ PaymentModal
- ✅ PaymentTransactionStatusModal
- ✅ RegisterApplicationModal
- ✅ UploadNotesheetModal
- ✅ ZonewiseFilterReportModal

### All Feature Components
- ✅ AIAnalyticsDashboard
- ✅ AIApprovalMonitor
- ✅ DDChequeApproval
- ✅ FloatingAIButton
- ✅ WaterRipple
- ✅ CollapsibleFilterSection
- ✅ DDChequeCollapsibleFilter

### All UI Components (67 shadcn components)
- ✅ ALL files in `/components/ui/` - DO NOT TOUCH

---

## 🎯 Execution Plan

1. Delete 2 unused App.tsx files
2. Delete 2 unused ApplicationsTable variants
3. Delete duplicate data/services in /src/
4. Delete empty index files in /src/components/
5. Delete duplicate layout components in /src/

**Total: 17 files deleted**
**Result: Cleaner codebase, same design, same functionality**

Ready to proceed?
