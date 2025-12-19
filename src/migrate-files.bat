@echo off
REM ===========================================
REM File Migration Script for Windows
REM Moves components to proper Next.js structure
REM ===========================================

echo.
echo 🚀 Starting file migration...
echo.

REM Create necessary directories
echo 📁 Creating directory structure...
if not exist "src\components\layout" mkdir "src\components\layout"
if not exist "src\components\modules\water-tax" mkdir "src\components\modules\water-tax"
if not exist "src\components\common" mkdir "src\components\common"
if not exist "src\components\ui" mkdir "src\components\ui"

REM Move layout components
echo.
echo 📦 Moving layout components...
if exist "components\Header.tsx" (
    move "components\Header.tsx" "src\components\layout\" >nul
    echo   ✅ Header.tsx
)

if exist "components\Sidebar.tsx" (
    move "components\Sidebar.tsx" "src\components\layout\" >nul
    echo   ✅ Sidebar.tsx
)

REM Move water-tax module components
echo.
echo 📦 Moving water-tax module components...

setlocal enabledelayedexpansion
set components=CRMDashboard.tsx StatsGrid.tsx FilterBar.tsx ApplicationsTableSimple.tsx ApplicationsTable.tsx ApplicationsTableVibrant.tsx ZonewiseTable.tsx RegisterApplicationModalStepWise.tsx RegisterApplicationModal.tsx EditApplicationModal.tsx ApplicationViewModal.tsx ApplicationDetailsDialog.tsx ApplicationSubmitSuccessDialog.tsx ApproveApplicationModal.tsx ApprovalModal.tsx AllocateApplicationModal.tsx NotesheetApprovalFlow.tsx UploadNotesheetModal.tsx ReviewNotesheetModal.tsx OfficerApprovalModal.tsx SendApprovalPreviewModal.tsx PaymentModal.tsx PaymentTransactionStatusModal.tsx ApproveOnlineTransaction.tsx DDChequeApproval.tsx CollapsibleFilterSection.tsx DDChequeCollapsibleFilter.tsx ZonewiseFilterReportModal.tsx DownloadRegisterModal.tsx DocumentViewerModal.tsx AIAnalyticsDashboard.tsx AIApprovalMonitor.tsx FloatingAIButton.tsx WaterRipple.tsx

for %%c in (%components%) do (
    if exist "components\%%c" (
        move "components\%%c" "src\components\modules\water-tax\" >nul
        echo   ✅ %%c
    )
)

REM Move UI components
echo.
echo 📦 Moving UI components...
if exist "components\ui" (
    xcopy "components\ui\*" "src\components\ui\" /E /I /Y >nul 2>&1
    echo   ✅ UI components copied
)

REM Move data files
echo.
echo 📦 Moving data files...
if not exist "src\data" mkdir "src\data"
if exist "data\applications.ts" (
    move "data\applications.ts" "src\data\" >nul
    echo   ✅ applications.ts
)

echo.
echo ✅ File migration complete!
echo.
echo ⚠️  IMPORTANT: Next steps:
echo    1. Update import paths in all moved files
echo    2. Run 'npm run type-check' to find broken imports
echo    3. Run 'npm run dev' to test the application
echo.
echo 📖 See /MIGRATION_GUIDE.md for detailed import update instructions
echo.

pause
