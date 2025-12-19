#!/bin/bash
# Migration script to move all files to src/

echo "🚀 Starting migration to src/ structure..."

# Create directory structure
echo "📁 Creating folder structure..."

# Features
mkdir -p src/components/features/applications
mkdir -p src/components/features/approvals
mkdir -p src/components/features/payment
mkdir -p src/components/features/documents
mkdir -p src/components/features/reports
mkdir -p src/components/features/dashboard

# Other component folders
mkdir -p src/components/ui
mkdir -p src/components/figma

# Top-level src folders
mkdir -p src/config
mkdir -p src/hooks
mkdir -p src/lib/data
mkdir -p src/lib/utils
mkdir -p src/services
mkdir -p src/types
mkdir -p src/styles

echo "✅ Folder structure created!"

# Move lib/data
echo "📦 Moving data..."
[ -f "data/applications.ts" ] && mv data/applications.ts src/lib/data/

# Move lib/utils
echo "🔧 Moving utils..."
[ -f "utils/helpers.ts" ] && mv utils/helpers.ts src/lib/utils/
[ -f "utils/smsNotification.ts" ] && mv utils/smsNotification.ts src/lib/utils/

# Move config
echo "⚙️ Moving config..."
[ -f "config/api.config.ts" ] && mv config/api.config.ts src/config/

# Move hooks
echo "🪝 Moving hooks..."
[ -f "hooks/useApplication.ts" ] && mv hooks/useApplication.ts src/hooks/
[ -f "hooks/useApplications.ts" ] && mv hooks/useApplications.ts src/hooks/
[ -f "hooks/useFileUpload.ts" ] && mv hooks/useFileUpload.ts src/hooks/

# Move services
echo "🌐 Moving services..."
[ -f "services/api.service.ts" ] && mv services/api.service.ts src/services/
[ -f "services/application.service.ts" ] && mv services/application.service.ts src/services/
[ -f "services/auth.service.ts" ] && mv services/auth.service.ts src/services/
[ -f "services/file.service.ts" ] && mv services/file.service.ts src/services/

# Move types
echo "📝 Moving types..."
[ -f "types/index.ts" ] && mv types/index.ts src/types/

# Move styles
echo "🎨 Moving styles..."
[ -f "styles/globals.css" ] && mv styles/globals.css src/styles/

# Move components/features/applications
echo "📱 Moving application components..."
[ -f "components/ApplicationsTable.tsx" ] && mv components/ApplicationsTable.tsx src/components/features/applications/
[ -f "components/ApplicationsTableSimple.tsx" ] && mv components/ApplicationsTableSimple.tsx src/components/features/applications/
[ -f "components/ApplicationsTableVibrant.tsx" ] && mv components/ApplicationsTableVibrant.tsx src/components/features/applications/
[ -f "components/ApplicationDetailsDialog.tsx" ] && mv components/ApplicationDetailsDialog.tsx src/components/features/applications/
[ -f "components/ApplicationViewModal.tsx" ] && mv components/ApplicationViewModal.tsx src/components/features/applications/
[ -f "components/RegisterApplicationModal.tsx" ] && mv components/RegisterApplicationModal.tsx src/components/features/applications/
[ -f "components/EditApplicationModal.tsx" ] && mv components/EditApplicationModal.tsx src/components/features/applications/
[ -f "components/AllocateApplicationModal.tsx" ] && mv components/AllocateApplicationModal.tsx src/components/features/applications/
[ -f "components/ApplicationSubmitSuccessDialog.tsx" ] && mv components/ApplicationSubmitSuccessDialog.tsx src/components/features/applications/

# Move components/features/approvals
echo "✅ Moving approval components..."
[ -f "components/ApproveApplicationModal.tsx" ] && mv components/ApproveApplicationModal.tsx src/components/features/approvals/
[ -f "components/ApprovalModal.tsx" ] && mv components/ApprovalModal.tsx src/components/features/approvals/
[ -f "components/ApproveOnlineTransaction.tsx" ] && mv components/ApproveOnlineTransaction.tsx src/components/features/approvals/
[ -f "components/DDChequeApproval.tsx" ] && mv components/DDChequeApproval.tsx src/components/features/approvals/
[ -f "components/DDChequeCollapsibleFilter.tsx" ] && mv components/DDChequeCollapsibleFilter.tsx src/components/features/approvals/

# Move components/features/payment
echo "💳 Moving payment components..."
[ -f "components/PaymentModal.tsx" ] && mv components/PaymentModal.tsx src/components/features/payment/
[ -f "components/PaymentTransactionStatusModal.tsx" ] && mv components/PaymentTransactionStatusModal.tsx src/components/features/payment/

# Move components/features/documents
echo "📄 Moving document components..."
[ -f "components/DocumentViewerModal.tsx" ] && mv components/DocumentViewerModal.tsx src/components/features/documents/
[ -f "components/UploadNotesheetModal.tsx" ] && mv components/UploadNotesheetModal.tsx src/components/features/documents/

# Move components/features/reports
echo "📊 Moving report components..."
[ -f "components/DownloadRegisterModal.tsx" ] && mv components/DownloadRegisterModal.tsx src/components/features/reports/
[ -f "components/ZonewiseFilterReportModal.tsx" ] && mv components/ZonewiseFilterReportModal.tsx src/components/features/reports/
[ -f "components/ZonewiseTable.tsx" ] && mv components/ZonewiseTable.tsx src/components/features/reports/
[ -f "components/AIAnalyticsDashboard.tsx" ] && mv components/AIAnalyticsDashboard.tsx src/components/features/reports/

# Move components/features/dashboard
echo "📈 Moving dashboard components..."
[ -f "components/CRMDashboard.tsx" ] && mv components/CRMDashboard.tsx src/components/features/dashboard/
[ -f "components/StatsGrid.tsx" ] && mv components/StatsGrid.tsx src/components/features/dashboard/
[ -f "components/FilterBar.tsx" ] && mv components/FilterBar.tsx src/components/features/dashboard/
[ -f "components/CollapsibleFilterSection.tsx" ] && mv components/CollapsibleFilterSection.tsx src/components/features/dashboard/

# Move components/common
echo "🔧 Moving common components..."
[ -f "components/WaterRipple.tsx" ] && mv components/WaterRipple.tsx src/components/common/
[ -f "components/FloatingAIButton.tsx" ] && mv components/FloatingAIButton.tsx src/components/common/
[ -f "components/AIApprovalMonitor.tsx" ] && mv components/AIApprovalMonitor.tsx src/components/common/

# Move components/layout
echo "🏗️ Moving layout components..."
[ -f "components/Sidebar.tsx" ] && mv components/Sidebar.tsx src/components/layout/

# Move components/ui
echo "🎨 Moving UI components..."
mv components/ui/* src/components/ui/ 2>/dev/null || true

# Move components/figma
echo "🎨 Moving Figma components..."
mv components/figma/* src/components/figma/ 2>/dev/null || true

echo "✅ Migration complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update imports in all files"
echo "2. Run: npm run type-check"
echo "3. Run: npm run dev"
echo "4. Test all features"
