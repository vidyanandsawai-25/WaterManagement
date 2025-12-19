#!/bin/bash

# ===========================================
# File Migration Script
# Moves components to proper Next.js structure
# ===========================================

echo "🚀 Starting file migration..."
echo ""

# Create necessary directories
echo "📁 Creating directory structure..."
mkdir -p src/components/layout
mkdir -p src/components/modules/water-tax
mkdir -p src/components/common
mkdir -p src/components/ui

# Move layout components
echo ""
echo "📦 Moving layout components..."
if [ -f "components/Header.tsx" ]; then
    mv components/Header.tsx src/components/layout/
    echo "  ✅ Header.tsx"
fi

if [ -f "components/Sidebar.tsx" ]; then
    mv components/Sidebar.tsx src/components/layout/
    echo "  ✅ Sidebar.tsx"
fi

# Move water-tax module components
echo ""
echo "📦 Moving water-tax module components..."

# Array of component files to move
water_tax_components=(
    "CRMDashboard.tsx"
    "StatsGrid.tsx"
    "FilterBar.tsx"
    "ApplicationsTableSimple.tsx"
    "ApplicationsTable.tsx"
    "ApplicationsTableVibrant.tsx"
    "ZonewiseTable.tsx"
    "RegisterApplicationModalStepWise.tsx"
    "RegisterApplicationModal.tsx"
    "EditApplicationModal.tsx"
    "ApplicationViewModal.tsx"
    "ApplicationDetailsDialog.tsx"
    "ApplicationSubmitSuccessDialog.tsx"
    "ApproveApplicationModal.tsx"
    "ApprovalModal.tsx"
    "AllocateApplicationModal.tsx"
    "NotesheetApprovalFlow.tsx"
    "UploadNotesheetModal.tsx"
    "ReviewNotesheetModal.tsx"
    "OfficerApprovalModal.tsx"
    "SendApprovalPreviewModal.tsx"
    "PaymentModal.tsx"
    "PaymentTransactionStatusModal.tsx"
    "ApproveOnlineTransaction.tsx"
    "DDChequeApproval.tsx"
    "CollapsibleFilterSection.tsx"
    "DDChequeCollapsibleFilter.tsx"
    "ZonewiseFilterReportModal.tsx"
    "DownloadRegisterModal.tsx"
    "DocumentViewerModal.tsx"
    "AIAnalyticsDashboard.tsx"
    "AIApprovalMonitor.tsx"
    "FloatingAIButton.tsx"
    "WaterRipple.tsx"
)

for component in "${water_tax_components[@]}"; do
    if [ -f "components/$component" ]; then
        mv "components/$component" "src/components/modules/water-tax/"
        echo "  ✅ $component"
    fi
done

# Move UI components
echo ""
echo "📦 Moving UI components..."
if [ -d "components/ui" ]; then
    # Copy all ui components
    cp -r components/ui/* src/components/ui/ 2>/dev/null || true
    echo "  ✅ UI components copied"
fi

# Move data files
echo ""
echo "📦 Moving data files..."
if [ -f "data/applications.ts" ]; then
    mkdir -p src/data
    mv data/applications.ts src/data/
    echo "  ✅ applications.ts"
fi

echo ""
echo "✅ File migration complete!"
echo ""
echo "⚠️  IMPORTANT: Next steps:"
echo "   1. Update import paths in all moved files"
echo "   2. Run 'npm run type-check' to find broken imports"
echo "   3. Run 'npm run dev' to test the application"
echo ""
echo "📖 See /MIGRATION_GUIDE.md for detailed import update instructions"
echo ""
