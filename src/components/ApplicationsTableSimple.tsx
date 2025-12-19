import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Edit, Download, CheckCircle, Upload, CreditCard, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { WaterRipple } from './WaterRipple';
import { ApplicationViewModal } from './ApplicationViewModal';
import { EditApplicationModal } from './EditApplicationModal';
import { UploadNotesheetModal } from './UploadNotesheetModal';
import { ApprovalModal } from './ApprovalModal';
import { PaymentModal } from './PaymentModal';
import { ApplicationSubmitSuccessDialog } from './ApplicationSubmitSuccessDialog';
import { ReviewNotesheetModal } from './ReviewNotesheetModal';
import { SendApprovalPreviewModal } from './SendApprovalPreviewModal';
import { toast } from 'sonner@2.0.3';

interface ApplicationsTableProps {
  searchQuery: string;
  selectedType: string;
  selectedStatus: string;
  entriesPerPage: number;
  applications: any[];
  onUpdateApplications: (apps: any[]) => void;
  resetToFirstPage?: number;
  activeCardFilter?: string;
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc' | null;
};

export function ApplicationsTableSimple({
  searchQuery,
  selectedType,
  selectedStatus,
  entriesPerPage,
  applications,
  onUpdateApplications,
  resetToFirstPage,
  activeCardFilter = 'all',
}: ApplicationsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadNotesheetOpen, setIsUploadNotesheetOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReviewNotesheetOpen, setIsReviewNotesheetOpen] = useState(false);
  const [isSendApprovalPreviewOpen, setIsSendApprovalPreviewOpen] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successApplicationNo, setSuccessApplicationNo] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: null });
  const [currentUserRole, setCurrentUserRole] = useState('Assistant Engineer'); // Can be dynamic based on login
  
  // Static current logged-in user - in production, this would come from auth context
  const currentUser = {
    name: 'Rajesh Patil',
    designation: 'Jr. Engineer',
    role: 'Assistant Engineer'
  };

  useEffect(() => {
    if (resetToFirstPage && resetToFirstPage > 0) {
      setCurrentPage(1);
    }
  }, [resetToFirstPage]);

  const filteredData = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = searchQuery === '' ||
        app.applicationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.consumerNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.applicantName.toLowerCase().includes(searchQuery.toLowerCase());

      // Type filter mapping
      let matchesType = true;
      if (selectedType !== 'all') {
        const appDetailsLower = app.details.toLowerCase();
        const selectedTypeLower = selectedType.toLowerCase();
        
        if (selectedTypeLower === 'new_connection_installed' || 
            selectedTypeLower === 'new_tap_connection' || 
            selectedTypeLower === 'new_meter_connection') {
          matchesType = appDetailsLower.includes('new connection');
        } else if (selectedTypeLower === 'alteration') {
          matchesType = appDetailsLower.includes('alteration');
        } else if (selectedTypeLower === 'disconnection') {
          matchesType = appDetailsLower.includes('disconnect');
        } else if (selectedTypeLower === 'other_tap_connection') {
          matchesType = appDetailsLower.includes('correction in demand bill');
        } else {
          matchesType = appDetailsLower.includes(selectedTypeLower);
        }
      }

      // Status filter mapping
      let matchesStatus = true;
      if (selectedStatus !== 'all') {
        const appStatusLower = app.status.toLowerCase();
        const selectedStatusLower = selectedStatus.toLowerCase().replace(/_/g, ' ');
        
        // Map filter values to actual status values
        if (selectedStatusLower === 'application accepted') {
          matchesStatus = appStatusLower === 'application accepted';
        } else if (selectedStatusLower === 'application processed') {
          matchesStatus = appStatusLower === 'application processed';
        } else if (selectedStatusLower === 'notesheet upload pending') {
          matchesStatus = appStatusLower === 'upload note sheet';
        } else if (selectedStatusLower === 'send to approval') {
          matchesStatus = appStatusLower === 'pending approval';
        } else if (selectedStatusLower === 'payment approval pending') {
          matchesStatus = appStatusLower === 'approved';
        } else if (selectedStatusLower === 'meter details pending') {
          matchesStatus = appStatusLower === 'meter details pending';
        } else if (selectedStatusLower === 'make payment') {
          matchesStatus = appStatusLower === 'approved';
        } else if (selectedStatusLower === 'meter added') {
          matchesStatus = appStatusLower === 'meter added';
        } else if (selectedStatusLower === 'application disapproved') {
          matchesStatus = appStatusLower === 'rejected';
        } else if (selectedStatusLower === 'discard by operator') {
          matchesStatus = appStatusLower === 'rejected';
        } else if (selectedStatusLower === 'disapproved') {
          matchesStatus = appStatusLower === 'rejected';
        } else if (selectedStatusLower === 'initiated') {
          matchesStatus = appStatusLower === 'initiated' || appStatusLower === 'pending verified';
        } else {
          matchesStatus = appStatusLower.includes(selectedStatusLower);
        }
      }

      // Apply active card filter
      let matchesCardFilter = true;
      if (activeCardFilter === 'new_connection') {
        matchesCardFilter = app.details === 'New Connection';
      } else if (activeCardFilter === 'mutation') {
        matchesCardFilter = app.details === 'Correction in Demand Bill';
      } else if (activeCardFilter === 'alteration') {
        matchesCardFilter = app.details === 'Alteration';
      } else if (activeCardFilter === 'total_complaint') {
        // Show all applications for total complaints
        matchesCardFilter = true;
      } else if (activeCardFilter === 'today_complaint') {
        // Filter by today's date based on dateTime field
        if (!app.dateTime) {
          matchesCardFilter = false;
        } else {
          try {
            const appDate = new Date(app.dateTime);
            const today = new Date();
            matchesCardFilter = appDate.getFullYear() === today.getFullYear() &&
                               appDate.getMonth() === today.getMonth() &&
                               appDate.getDate() === today.getDate();
          } catch (error) {
            matchesCardFilter = false;
          }
        }
      }

      return matchesSearch && matchesType && matchesStatus && matchesCardFilter;
    });
  }, [applications, searchQuery, selectedType, selectedStatus, activeCardFilter]);

  const sortedData = useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig.key && sortConfig.direction) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / entriesPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'initiated':
        return (
          <span className="text-gray-600 text-[11px]" style={{ fontWeight: 600 }}>
            Initiated
          </span>
        );
      case 'upload note sheet':
        return (
          <span className="text-indigo-600 text-[11px]" style={{ fontWeight: 600 }}>
            Upload Note Sheet
          </span>
        );
      case 'application accepted':
      case 'application_accepted':
        return (
          <span className="text-green-600 text-[11px]" style={{ fontWeight: 600 }}>
            Application Accepted
          </span>
        );
      case 'application processed':
      case 'application_processed':
        return (
          <span className="text-blue-600 text-[11px]" style={{ fontWeight: 600 }}>
            Application Processed
          </span>
        );
      case 'notesheet upload pending':
      case 'notesheet_upload_pending':
        return (
          <span className="text-amber-600 text-[11px]" style={{ fontWeight: 600 }}>
            Notesheet Upload Pending
          </span>
        );
      case 'send to approval':
      case 'send_to_approval':
        return (
          <span className="text-indigo-600 text-[11px]" style={{ fontWeight: 600 }}>
            Send To Approval
          </span>
        );
      case 'payment approval pending':
      case 'payment_approval_pending':
        return (
          <span className="text-purple-600 text-[11px]" style={{ fontWeight: 600 }}>
            Payment Approval Pending
          </span>
        );
      case 'meter details pending':
      case 'meter_details_pending':
        return (
          <span className="text-cyan-600 text-[11px]" style={{ fontWeight: 600 }}>
            Meter Details Pending
          </span>
        );
      case 'make payment':
      case 'make_payment':
        return (
          <span className="text-emerald-600 text-[11px]" style={{ fontWeight: 600 }}>
            Make Payment
          </span>
        );
      case 'meter added':
      case 'meter_added':
        return (
          <span className="text-teal-600 text-[11px]" style={{ fontWeight: 600 }}>
            Meter Added
          </span>
        );
      case 'disapproved':
        return (
          <span className="text-red-600 text-[11px]" style={{ fontWeight: 600 }}>
            DisApproved
          </span>
        );
      case 'application disapproved':
      case 'application_disapproved':
        return (
          <span className="text-red-700 text-[11px]" style={{ fontWeight: 600 }}>
            Application DisApproved
          </span>
        );
      case 'discard by operator':
      case 'discard_by_operator':
        return (
          <span className="text-rose-600 text-[11px]" style={{ fontWeight: 600 }}>
            Discard by Operator
          </span>
        );
      case 'pending':
        return (
          <span className="text-orange-600 text-[11px]" style={{ fontWeight: 600 }}>
            Pending Verified
          </span>
        );
      case 'pending verified':
        return (
          <span className="text-slate-600 text-[11px]" style={{ fontWeight: 600 }}>
            Pending Verified
          </span>
        );
      case 'approved':
        return (
          <span className="text-green-600 text-[11px]" style={{ fontWeight: 600 }}>
            Installed
          </span>
        );
      case 'rejected':
        return (
          <span className="text-red-600 text-[11px]" style={{ fontWeight: 600 }}>
            Rejected
          </span>
        );
      case 'reverted to consumer':
        return (
          <span className="text-orange-600 text-[11px]" style={{ fontWeight: 600 }}>
            Reverted to Consumer
          </span>
        );
      case 'under review':
        return (
          <span className="text-blue-600 text-[11px]" style={{ fontWeight: 600 }}>
            Under Review
          </span>
        );
      case 'payment completed':
        return (
          <span className="text-slate-700 text-[11px]" style={{ fontWeight: 600 }}>
            Payment Completed
          </span>
        );
      case 'submitted':
        return (
          <span className="text-blue-600 text-[11px]" style={{ fontWeight: 600 }}>
            Submitted
          </span>
        );
      case 'pending approval':
        return (
          <span className="text-orange-600 text-[11px]" style={{ fontWeight: 600 }}>
            Pending Approval
          </span>
        );
      case 'notesheet approval level 2':
        return (
          <span className="text-purple-600 text-[11px]" style={{ fontWeight: 600 }}>
            Pending Level 2 Approval
          </span>
        );
      case 'notesheet approval level 3':
        return (
          <span className="text-indigo-600 text-[11px]" style={{ fontWeight: 600 }}>
            Pending Level 3 Approval
          </span>
        );
      default:
        return (
          <span className="text-slate-600 text-[11px]" style={{ fontWeight: 600 }}>
            {status}
          </span>
        );
    }
  };

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="w-3 h-3 ml-1 inline opacity-50" />;
    }
    if (sortConfig.direction === 'asc') {
      return <ArrowUp className="w-3 h-3 ml-1 inline" />;
    }
    return <ArrowDown className="w-3 h-3 ml-1 inline" />;
  };

  const handleDownloadApplication = (app: any, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Import jsPDF dynamically
    import('jspdf').then(({ jsPDF }) => {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Set document properties
      doc.setProperties({
        title: `Application - ${app.applicationNo}`,
        subject: 'Water Connection Application Details',
        author: 'Akola Municipal Corporation',
        keywords: 'application, water connection, details',
        creator: 'Akola Municipal Corporation CRM'
      });

      // Add header with logo and title
      doc.setFillColor(10, 77, 158); // Deep blue color (#0A4D9E)
      doc.rect(0, 0, 210, 40, 'F');
      
      // Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('Akola Municipal Corporation', 105, 15, { align: 'center' });
      
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text('Water Supply Department', 105, 24, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Application Details', 105, 33, { align: 'center' });

      // Reset text color for body
      doc.setTextColor(0, 0, 0);
      
      // Application Header Section
      let yPos = 52;
      
      // Application Number (Large and prominent)
      doc.setFillColor(240, 242, 245);
      doc.rect(15, yPos - 5, 180, 12, 'F');
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(10, 77, 158);
      doc.text(`Application No: ${app.applicationNo}`, 20, yPos);
      doc.setTextColor(0, 0, 0);

      // Basic Details Section
      yPos += 15;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setFillColor(59, 130, 246);
      doc.rect(15, yPos - 5, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text('Basic Information', 20, yPos);
      doc.setTextColor(0, 0, 0);

      yPos += 10;
      const basicDetails = [
        { label: 'Consumer No:', value: app.consumerNo },
        { label: 'Applicant Name:', value: app.applicantName },
        { label: 'Mobile Number:', value: app.mobileNumber || 'N/A' },
        { label: 'Email:', value: app.email || 'N/A' },
        { label: 'Address:', value: app.address || 'N/A' },
      ];

      basicDetails.forEach((detail) => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(detail.label, 20, yPos);
        doc.setFont('helvetica', 'normal');
        const labelWidth = doc.getTextWidth(detail.label);
        const valueText = doc.splitTextToSize(detail.value, 140);
        doc.text(valueText, 25 + labelWidth, yPos);
        yPos += 6 * valueText.length;
      });

      // Application Details Section
      yPos += 5;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setFillColor(99, 102, 241);
      doc.rect(15, yPos - 5, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text('Application Information', 20, yPos);
      doc.setTextColor(0, 0, 0);

      yPos += 10;
      const appDetails = [
        { label: 'Application Type:', value: app.details },
        { label: 'Stage:', value: app.stage },
        { label: 'Registration Date:', value: app.date },
        { label: 'Status:', value: app.status },
      ];

      appDetails.forEach((detail) => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(detail.label, 20, yPos);
        doc.setFont('helvetica', 'normal');
        const labelWidth = doc.getTextWidth(detail.label);
        doc.text(detail.value, 25 + labelWidth, yPos);
        yPos += 6;
      });

      // Property Details Section (if available)
      if (app.propertyNo || app.zone || app.ward) {
        yPos += 5;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setFillColor(139, 92, 246);
        doc.rect(15, yPos - 5, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('Property Details', 20, yPos);
        doc.setTextColor(0, 0, 0);

        yPos += 10;
        const propertyDetails = [
          { label: 'Property No:', value: app.propertyNo || 'N/A' },
          { label: 'Zone:', value: app.zone || 'N/A' },
          { label: 'Ward:', value: app.ward || 'N/A' },
        ];

        propertyDetails.forEach((detail) => {
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text(detail.label, 20, yPos);
          doc.setFont('helvetica', 'normal');
          const labelWidth = doc.getTextWidth(detail.label);
          doc.text(detail.value, 25 + labelWidth, yPos);
          yPos += 6;
        });
      }

      // Connection Details Section (if available)
      if (app.connectionType || app.pipeSize || app.meterNumber) {
        yPos += 5;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setFillColor(16, 185, 129);
        doc.rect(15, yPos - 5, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('Connection Details', 20, yPos);
        doc.setTextColor(0, 0, 0);

        yPos += 10;
        const connectionDetails = [
          { label: 'Connection Type:', value: app.connectionType || 'N/A' },
          { label: 'Pipe Size:', value: app.pipeSize || 'N/A' },
          { label: 'Meter Number:', value: app.meterNumber || 'N/A' },
        ];

        connectionDetails.forEach((detail) => {
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text(detail.label, 20, yPos);
          doc.setFont('helvetica', 'normal');
          const labelWidth = doc.getTextWidth(detail.label);
          doc.text(detail.value, 25 + labelWidth, yPos);
          yPos += 6;
        });
      }

      // Payment Details Section (if available)
      if (app.cnbNumber || app.receiptNumber || app.paymentAmount) {
        yPos += 5;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setFillColor(34, 197, 94);
        doc.rect(15, yPos - 5, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('Payment Details', 20, yPos);
        doc.setTextColor(0, 0, 0);

        yPos += 10;
        const paymentDetails = [
          { label: 'CNB Number:', value: app.cnbNumber || 'N/A' },
          { label: 'Receipt Number:', value: app.receiptNumber || 'N/A' },
          { label: 'Payment Amount:', value: app.paymentAmount ? `₹${app.paymentAmount}` : 'N/A' },
          { label: 'Payment Date:', value: app.paymentDate || 'N/A' },
        ];

        paymentDetails.forEach((detail) => {
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text(detail.label, 20, yPos);
          doc.setFont('helvetica', 'normal');
          const labelWidth = doc.getTextWidth(detail.label);
          doc.text(detail.value, 25 + labelWidth, yPos);
          yPos += 6;
        });
      }

      // Status Badge Section
      yPos += 5;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setFillColor(234, 179, 8);
      doc.rect(15, yPos - 5, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text('Current Status', 20, yPos);
      doc.setTextColor(0, 0, 0);

      yPos += 10;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      
      // Status color coding
      let statusColor: [number, number, number] = [71, 85, 105]; // Default slate
      const status = app.status.toLowerCase();
      if (status.includes('accepted') || status.includes('approved')) {
        statusColor = [34, 197, 94]; // Green
      } else if (status.includes('rejected') || status.includes('disapproved')) {
        statusColor = [239, 68, 68]; // Red
      } else if (status.includes('pending') || status.includes('initiated')) {
        statusColor = [251, 146, 60]; // Orange
      } else if (status.includes('payment') || status.includes('completed')) {
        statusColor = [16, 185, 129]; // Emerald
      }

      doc.setFillColor(...statusColor);
      doc.roundedRect(20, yPos - 5, 170, 10, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text(app.status, 105, yPos, { align: 'center' });
      doc.setTextColor(0, 0, 0);

      // Footer with timestamp
      yPos = 282;
      doc.setFillColor(10, 77, 158);
      doc.rect(0, yPos, 210, 15, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('This is a computer-generated document.', 105, yPos + 6, { align: 'center' });
      doc.text(`Generated on: ${new Date().toLocaleString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`, 105, yPos + 11, { align: 'center' });

      // Save the PDF
      doc.save(`Application_${app.applicationNo}_${new Date().getTime()}.pdf`);
      
      toast.success(`✅ Application ${app.applicationNo} downloaded successfully!`);
    }).catch((error) => {
      console.error('Error generating PDF:', error);
      toast.error('❌ Failed to download application PDF');
    });
  };

  return (
    <div className="flex flex-col ">
      {/* Application View Modal - Only show when NOT in any other modal */}
      {!isEditModalOpen && !isUploadNotesheetOpen && !isApprovalModalOpen && !isPaymentModalOpen && (
        <ApplicationViewModal
          application={selectedApplication}
          isOpen={!!selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}

      {/* Edit Application Modal */}
      <EditApplicationModal
        application={selectedApplication}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedApplication(null);
        }}
        onUpdate={(updatedApp) => {
          const updatedApps = applications.map(app => 
            app.id === updatedApp.id ? updatedApp : app
          );
          onUpdateApplications(updatedApps);
          setIsEditModalOpen(false);
          setSelectedApplication(null);
        }}
        onSuccess={(applicationNo) => {
          // Show success dialog after modal closes
          setTimeout(() => {
            setSuccessApplicationNo(applicationNo);
            setShowSuccessDialog(true);
          }, 100);
        }}
      />

      {/* Upload Notesheet Modal */}
      <UploadNotesheetModal
        application={selectedApplication}
        isOpen={isUploadNotesheetOpen}
        onClose={() => {
          setIsUploadNotesheetOpen(false);
          setSelectedApplication(null);
        }}
        onSendToApproval={(updatedApp) => {
          const updatedApps = applications.map(app => 
            app.id === updatedApp.id ? updatedApp : app
          );
          onUpdateApplications(updatedApps);
          setIsUploadNotesheetOpen(false);
          setSelectedApplication(null);
        }}
      />

      {/* Approval Modal */}
      <ApprovalModal
        application={selectedApplication}
        isOpen={isApprovalModalOpen}
        onClose={() => {
          setIsApprovalModalOpen(false);
          setSelectedApplication(null);
        }}
        onApprove={(updatedApp) => {
          const updatedApps = applications.map(app => 
            app.id === updatedApp.id ? updatedApp : app
          );
          onUpdateApplications(updatedApps);
          setIsApprovalModalOpen(false);
          setSelectedApplication(null);
        }}
        onReject={(updatedApp) => {
          const updatedApps = applications.map(app => 
            app.id === updatedApp.id ? updatedApp : app
          );
          onUpdateApplications(updatedApps);
          setIsApprovalModalOpen(false);
          setSelectedApplication(null);
        }}
      />

      {/* Payment Modal */}
      <PaymentModal
        application={selectedApplication}
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false);
          setSelectedApplication(null);
        }}
        onPaymentComplete={(updatedApp) => {
          const updatedApps = applications.map(app => 
            app.id === updatedApp.id ? updatedApp : app
          );
          onUpdateApplications(updatedApps);
          setIsPaymentModalOpen(false);
          setSelectedApplication(null);
        }}
      />

      {/* Send Approval Preview Modal - Shows before Review Notesheet Modal */}
      {selectedApplication && (
        <SendApprovalPreviewModal
          application={selectedApplication}
          isOpen={isSendApprovalPreviewOpen}
          onClose={() => {
            setIsSendApprovalPreviewOpen(false);
            setSelectedApplication(null);
          }}
          onProceedToApproval={() => {
            // Close preview modal and open review modal
            setIsSendApprovalPreviewOpen(false);
            setTimeout(() => {
              setIsReviewNotesheetOpen(true);
            }, 300);
          }}
          currentOfficerRole={currentUserRole}
          approvalLevel={selectedApplication.currentApprovalLevel || 2}
        />
      )}

      {/* Review Notesheet Modal - For officer approval */}
      {selectedApplication && (
        <ReviewNotesheetModal
          application={selectedApplication}
          isOpen={isReviewNotesheetOpen}
          onClose={() => {
            setIsReviewNotesheetOpen(false);
            setSelectedApplication(null);
          }}
          onApprove={(approvalData) => {
            // Update the application with the approval
            const updatedApp = { ...selectedApplication };
            
            // Initialize approvalData if it doesn't exist
            if (!updatedApp.approvalData) {
              updatedApp.approvalData = [];
            }
            
            // Determine which level was approved
            const currentLevel = updatedApp.currentApprovalLevel || 2; // Default to level 2
            
            // Add the approval to the approvalData array
            updatedApp.approvalData.push({
              id: `level-${currentLevel}`,
              officerRole: currentLevel === 2 ? 'Assistant Engineer' : 'Executive Engineer',
              officerName: currentLevel === 2 ? 'Priya Sharma' : 'Amit Patel',
              order: currentLevel,
              status: 'approved',
              approvedByName: approvalData.officerName,
              remarks: approvalData.remarks,
              actionDate: new Date().toISOString()
            });
            
            // Check if all approvals are complete (3 levels)
            const approvedCount = updatedApp.approvalData.filter((a: any) => a.status === 'approved').length;
            
            if (approvedCount >= 3) {
              // All 3 levels approved - move to "Pending Approval" for final approval
              updatedApp.status = 'Pending Approval';
              updatedApp.currentApprovalLevel = null;
              toast.success('✅ Notesheet approved by all officers!', {
                description: 'Application is now pending final approval. Click the Approve button to proceed.',
              });
            } else {
              // Move to next level
              updatedApp.currentApprovalLevel = currentLevel + 1;
              updatedApp.status = `Notesheet Approval Level ${currentLevel + 1}`;
              toast.success(`✅ Approved by ${currentLevel === 2 ? 'Assistant' : 'Executive'} Engineer!`, {
                description: `Forwarded to ${currentLevel === 2 ? 'Executive Engineer' : 'next level'} for approval.`,
              });
            }
            
            const updatedApps = applications.map(app => 
              app.id === updatedApp.id ? updatedApp : app
            );
            onUpdateApplications(updatedApps);
            setIsReviewNotesheetOpen(false);
            setSelectedApplication(null);
          }}
          onReject={(rejectionData) => {
            // Update the application with rejection
            const updatedApp = { ...selectedApplication };
            
            if (!updatedApp.approvalData) {
              updatedApp.approvalData = [];
            }
            
            const currentLevel = updatedApp.currentApprovalLevel || 2;
            
            updatedApp.approvalData.push({
              id: `level-${currentLevel}`,
              officerRole: currentLevel === 2 ? 'Assistant Engineer' : 'Executive Engineer',
              officerName: currentLevel === 2 ? 'Priya Sharma' : 'Amit Patel',
              order: currentLevel,
              status: 'rejected',
              approvedByName: rejectionData.officerName,
              remarks: rejectionData.remarks,
              actionDate: new Date().toISOString()
            });
            
            updatedApp.status = 'Rejected';
            updatedApp.currentApprovalLevel = null;
            
            toast.error('❌ Application rejected!', {
              description: `Rejected by ${currentLevel === 2 ? 'Assistant' : 'Executive'} Engineer.`,
            });
            
            const updatedApps = applications.map(app => 
              app.id === updatedApp.id ? updatedApp : app
            );
            onUpdateApplications(updatedApps);
            setIsReviewNotesheetOpen(false);
            setSelectedApplication(null);
          }}
          currentOfficerRole={currentUserRole}
          approvalLevel={selectedApplication.currentApprovalLevel || 2}
        />
      )}

      {/* Application Submit Success Dialog */}
      <ApplicationSubmitSuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        applicationNo={successApplicationNo}
      />

      {/* Mobile Card View - Visible on mobile only */}
      <div className="lg:hidden flex-1 overflow-hidden flex flex-col">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 flex-1 flex flex-col">
          <div className="overflow-y-auto flex-1 p-3 space-y-3">
            {paginatedData.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No applications found</p>
              </div>
            ) : (
              paginatedData.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedApplication(app)}
                  className="bg-gradient-to-br from-white to-slate-50 rounded-lg border-2 border-gray-200 p-4 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Complaint No</div>
                      <div className="text-red-600 text-sm" style={{ fontWeight: 700 }}>
                        {app.consumerNo}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">Application No</div>
                      <div className="text-blue-600 text-sm" style={{ fontWeight: 700 }}>
                        {app.applicationNo}
                      </div>
                    </div>
                  </div>

                  {/* Application Info */}
                  <div className="space-y-2 mb-3">
                    <div>
                      <div className="text-xs text-gray-500">Applicant Name</div>
                      <div className="text-slate-800 text-sm" style={{ fontWeight: 600 }}>
                        {app.applicantName}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-gray-500">Application Date</div>
                        <div className="text-slate-700 text-xs" style={{ fontWeight: 600 }}>
                          {app.date}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Application Type</div>
                        <div className="text-slate-700 text-xs" style={{ fontWeight: 600 }}>
                          {app.applicationType || app.details}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Remarks</div>
                      <div className="text-slate-600 text-xs" style={{ fontWeight: 500 }}>
                        {app.remarks || app.reason || '-'}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-gray-500">Mode</div>
                        <span 
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] ${
                            app.office === 'Online' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-orange-100 text-orange-700'
                          }`}
                          style={{ fontWeight: 600 }}
                        >
                          {app.office}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Status</div>
                      {getStatusBadge(app.status)}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {/* Edit Button */}
                      {(app.status === 'Initiated' || app.status === 'Under Review' || (app.status !== 'Upload Note Sheet' && app.status !== 'Submitted' && app.status !== 'Pending Approval' && app.status !== 'Approved' && app.status !== 'Payment Completed' && app.status !== 'Application Accepted' && app.status !== 'Reverted to Consumer')) && (
                        <WaterRipple color="rgba(34, 197, 94, 0.3)">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (app.status === 'Rejected' || app.status === 'Reverted to Consumer') return;
                              setSelectedApplication(app);
                              setIsEditModalOpen(true);
                            }}
                            disabled={app.status === 'Rejected' || app.status === 'Reverted to Consumer'}
                            className={`w-9 h-9 rounded-full ${
                              (app.status === 'Rejected' || app.status === 'Reverted to Consumer')
                                ? 'bg-gray-300 cursor-not-allowed opacity-50'
                                : 'bg-gradient-to-r from-green-500 to-green-600'
                            } text-white flex items-center justify-center shadow-md transition-all`}
                            title={app.status === 'Rejected' ? 'Application Rejected' : app.status === 'Reverted to Consumer' ? 'Reverted to Consumer' : 'Edit Application'}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </WaterRipple>
                      )}

                      {/* Upload Notesheet Button */}
                      {app.status === 'Upload Note Sheet' && (
                        <WaterRipple color="rgba(99, 102, 241, 0.3)">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedApplication(app);
                              setIsUploadNotesheetOpen(true);
                            }}
                            className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white flex items-center justify-center shadow-md"
                            title="Upload Notesheet"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                        </WaterRipple>
                      )}

                      {/* Approval Button */}
                      {(app.status === 'Submitted' || app.status === 'Pending Approval' || app.status === 'Send to Approval') && (
                        <WaterRipple color="rgba(16, 185, 129, 0.3)">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedApplication(null); // Close view modal first
                              setTimeout(() => {
                                setSelectedApplication(app);
                                setIsApprovalModalOpen(true);
                              }, 0);
                            }}
                            className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-md"
                            title="Approve Application"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        </WaterRipple>
                      )}

                      {/* Show disabled Approve icon if status is Approved (mobile view) */}
                      {app.status === 'Approved' && (
                        <div className="relative group">
                          <button 
                            disabled
                            className="w-9 h-9 rounded-full bg-gray-300 cursor-not-allowed opacity-60 text-white flex items-center justify-center shadow-sm"
                            title="Already Approved"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Payment Button */}
                      {app.status === 'Approved' && 
                       app.details !== 'Alteration' && 
                       app.details !== 'Correction in Demand Bill' &&
                       app.details !== 'Disconnection' &&
                       app.details !== 'Disconnect Connection' && (
                        <WaterRipple color="rgba(34, 197, 94, 0.3)">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedApplication(app);
                              setIsPaymentModalOpen(true);
                            }}
                            className="w-9 h-9 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center shadow-md"
                            title="Payment"
                          >
                            <CreditCard className="w-4 h-4" />
                          </button>
                        </WaterRipple>
                      )}

                      {/* Download Button */}
                      <WaterRipple color="rgba(59, 130, 246, 0.3)">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadApplication(app, e);
                          }}
                          className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-md"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </WaterRipple>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Mobile Pagination */}
          <div className="border-t border-gray-200 px-3 py-3 bg-gradient-to-r from-slate-50 to-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">
                Showing {((currentPage - 1) * entriesPerPage) + 1}-{Math.min(currentPage * entriesPerPage, filteredData.length)} of {filteredData.length}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className="h-8 px-2"
                >
                  ←
                </Button>
                <span className="px-2 text-slate-700" style={{ fontWeight: 600 }}>
                  {currentPage} / {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                  className="h-8 px-2"
                >
                  →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:flex bg-white rounded-xl shadow-lg border border-blue-100/50 overflow-hidden flex-1 flex-col">
        {/* Table */}
        <div className="flex-1" style={{ maxHeight: 'calc(100vh - 380px)', overflowY: 'auto', overflowX: 'hidden' }}>
          <table className="w-full table-fixed">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gradient-to-r from-[#0077B6] via-[#00A8E8] to-[#00C6FF] text-white shadow-md">
                <th 
                  className="w-[10%] px-2 py-2.5 text-left border-l border-white/20 cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 700, fontSize: '12px' }}
                  onClick={() => requestSort('consumerNo')}
                >
                  Consumer No. {getSortIcon('consumerNo')}
                </th>
                <th 
                  className="w-[10%] px-2 py-2.5 text-left border-l border-white/20 cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 700, fontSize: '12px' }}
                  onClick={() => requestSort('applicationNo')}
                >
                  Application No. {getSortIcon('applicationNo')}
                </th>
                <th 
                  className="w-[11%] px-2 py-2.5 text-left border-l border-white/20 cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 700, fontSize: '12px' }}
                  onClick={() => requestSort('applicantName')}
                >
                  Applicant Name {getSortIcon('applicantName')}
                </th>
                <th 
                  className="w-[8%] px-2 py-2.5 text-center border-l border-white/20 cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 700, fontSize: '12px' }}
                  onClick={() => requestSort('date')}
                >
                  Date {getSortIcon('date')}
                </th>
                <th 
                  className="w-[10%] px-2 py-2.5 text-left border-l border-white/20 cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 700, fontSize: '12px' }}
                  onClick={() => requestSort('applicationType')}
                >
                  Type {getSortIcon('applicationType')}
                </th>
                <th 
                  className="w-[10%] px-2 py-2.5 text-center border-l border-white/20 cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 700, fontSize: '12px' }}
                  onClick={() => requestSort('status')}
                >
                  Status {getSortIcon('status')}
                </th>
                <th 
                  className="w-[10%] px-2 py-2.5 text-left border-l border-white/20 cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 700, fontSize: '12px' }}
                  onClick={() => requestSort('processedBy')}
                >
                  Processed By {getSortIcon('processedBy')}
                </th>
                <th 
                  className="w-[7%] px-2 py-2.5 text-center border-l border-white/20 cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 700, fontSize: '12px' }}
                  onClick={() => requestSort('office')}
                >
                  Mode {getSortIcon('office')}
                </th>
                <th className="w-[14%] px-2 py-2.5 text-center border-l border-white/20" style={{ fontWeight: 700, fontSize: '12px' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((app, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <motion.tr
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedApplication(app)}
                    className={`${
                      isEven ? 'bg-white' : 'bg-blue-50/30'
                    } hover:bg-cyan-50/60 transition-colors border-b border-blue-100/50 cursor-pointer`}
                  >
                    {/* Consumer Number */}
                    <td className="px-2 py-2 border-l border-blue-100/30">
                      <span className="text-red-600 block truncate" style={{ fontWeight: 600, fontSize: '13px' }}>
                        {app.consumerNo}
                      </span>
                    </td>

                    {/* Application Number */}
                    <td className="px-2 py-2 border-l border-blue-100/30">
                      <span className="text-blue-600 block truncate" style={{ fontWeight: 600, fontSize: '13px' }}>
                        {app.applicationNo}
                      </span>
                    </td>

                    {/* Applicant's Name */}
                    <td className="px-2 py-2 border-l border-blue-100/30">
                      <span className="text-slate-700 block truncate" style={{ fontWeight: 500, fontSize: '13px' }}>
                        {app.applicantName}
                      </span>
                    </td>

                    {/* Application Date */}
                    <td className="px-2 py-2 text-center border-l border-blue-100/30">
                      <span className="text-slate-700 block" style={{ fontWeight: 600, fontSize: '12px' }}>
                        {app.date}
                      </span>
                    </td>

                    {/* Application Type */}
                    <td className="px-2 py-2 border-l border-blue-100/30">
                      <span className="text-slate-700 block truncate" style={{ fontWeight: 500, fontSize: '13px' }}>
                        {app.applicationType || app.details}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-2 py-2 text-center border-l border-blue-100/30">
                      {getStatusBadge(app.status)}
                    </td>

                    {/* Processed By - Shows current logged-in user */}
                    <td className="px-2 py-2 border-l border-blue-100/30">
                      <div className="flex flex-col">
                        <span className="text-slate-700 block truncate" style={{ fontWeight: 600, fontSize: '13px' }}>
                          {currentUser.name}
                        </span>
                        <span className="text-slate-500 block truncate" style={{ fontWeight: 400, fontSize: '10px' }}>
                          {currentUser.designation}
                        </span>
                      </div>
                    </td>

                    {/* Mode */}
                    <td className="px-2 py-2 text-center border-l border-blue-100/30">
                      <span 
                        className={`inline-block px-2 py-0.5 rounded-full ${
                          app.office === 'Online' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}
                        style={{ fontWeight: 600, fontSize: '11px' }}
                      >
                        {app.office}
                      </span>
                    </td>

                    {/* Actions Required */}
                    <td className="px-2 py-2.5 text-center border-l border-blue-100/30" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Show Edit button if status is Initiated or Under Review (after revert) */}
                        {(app.status === 'Initiated' || app.status === 'Under Review' || (app.status !== 'Upload Note Sheet' && app.status !== 'Send to Approval' && app.status !== 'Submitted' && app.status !== 'Pending Approval' && app.status !== 'Approved' && app.status !== 'Payment Completed' && app.status !== 'Application Accepted' && app.status !== 'Reverted to Consumer')) && (
                          <WaterRipple color="rgba(34, 197, 94, 0.3)">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                if (app.status === 'Rejected' || app.status === 'Reverted to Consumer') return;
                                setSelectedApplication(null); // Close view modal first
                                setTimeout(() => {
                                  setSelectedApplication(app);
                                  setIsEditModalOpen(true);
                                }, 0);
                              }}
                              disabled={app.status === 'Rejected' || app.status === 'Reverted to Consumer'}
                              className={`w-7 h-7 rounded-full ${
                                (app.status === 'Rejected' || app.status === 'Reverted to Consumer')
                                  ? 'bg-gray-300 cursor-not-allowed opacity-50'
                                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                              } text-white flex items-center justify-center shadow-md transition-all`}
                              title={app.status === 'Rejected' ? 'Application Rejected' : app.status === 'Reverted to Consumer' ? 'Reverted to Consumer' : 'Edit Application'}
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                          </WaterRipple>
                        )}

                        {/* Show Upload Notesheet button if status is Upload Note Sheet */}
                        {app.status === 'Upload Note Sheet' && (
                          <WaterRipple color="rgba(99, 102, 241, 0.3)">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedApplication(null); // Close view modal first
                                setTimeout(() => {
                                  setSelectedApplication(app);
                                  setIsUploadNotesheetOpen(true);
                                }, 0);
                              }}
                              className="w-7 h-7 rounded-full cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white flex items-center justify-center shadow-md transition-all"
                              title="Upload Notesheet"
                            >
                              <Upload className="w-3.5 h-3.5" />
                            </button>
                          </WaterRipple>
                        )}

                        {/* Show Review Notesheet button if awaiting officer approval (Level 2 or 3) */}
                        {(app.status === 'Notesheet Approval Level 2' || app.status === 'Notesheet Approval Level 3') && (
                          <WaterRipple color="rgba(99, 102, 241, 0.3)">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedApplication(null);
                                setTimeout(() => {
                                  setSelectedApplication(app);
                                  setIsSendApprovalPreviewOpen(true);
                                }, 0);
                              }}
                              className="w-7 h-7 rounded-full cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white flex items-center justify-center shadow-md transition-all"
                              title="Review & Approve Notesheet"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                          </WaterRipple>
                        )}

                        {/* Show Approve button if status is Send to Approval */}
                        {app.status === 'Send to Approval' && (
                          <WaterRipple color="rgba(16, 185, 129, 0.3)">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedApplication(null); // Close view modal first
                                setTimeout(() => {
                                  setSelectedApplication(app);
                                  setIsApprovalModalOpen(true);
                                }, 0);
                              }}
                              className="w-7 h-7 rounded-full cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center justify-center shadow-md transition-all"
                              title="Approve Application"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                          </WaterRipple>
                        )}

                        {/* Show Send to Approval button if status is Submitted */}
                        {app.status === 'Submitted' && (
                          <WaterRipple color="rgba(99, 102, 241, 0.3)">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedApplication(null); // Close view modal first
                                setTimeout(() => {
                                  setSelectedApplication(app);
                                  setIsApprovalModalOpen(true);
                                }, 0);
                              }}
                              className="w-7 h-7 rounded-full cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center justify-center shadow-md transition-all"
                              title="Send to Approval"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                          </WaterRipple>
                        )}

                        {/* Show Approve button if status is Pending Approval */}
                        {app.status === 'Pending Approval' && (
                          <WaterRipple color="rgba(16, 185, 129, 0.3)">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedApplication(null); // Close view modal first
                                setTimeout(() => {
                                  setSelectedApplication(app);
                                  setIsApprovalModalOpen(true);
                                }, 0);
                              }}
                              className="w-7 h-7 rounded-full cursor-pointer bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white flex items-center justify-center shadow-md transition-all"
                              title="Approve Application"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                          </WaterRipple>
                        )}

                        {/* Show disabled Approve icon if status is Approved (to maintain visual consistency) */}
                        {app.status === 'Approved' && (
                          <div className="relative group">
                            <button 
                              disabled
                              className="w-7 h-7 rounded-full bg-gray-300 cursor-not-allowed opacity-60 text-white flex items-center justify-center shadow-sm"
                              title="Already Approved"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                            <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded whitespace-nowrap z-10">
                              Already Approved
                            </div>
                          </div>
                        )}

                        {/* Show Payment button if status is Approved */}
                        {/* Don't show payment button for alteration/mutation/disconnection - they skip payment flow */}
                        {app.status === 'Approved' && 
                         app.details !== 'Alteration' && 
                         app.details !== 'Correction in Demand Bill' &&
                         app.details !== 'Disconnection' &&
                         app.details !== 'Disconnect Connection' && (
                          <WaterRipple color="rgba(34, 197, 94, 0.3)">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedApplication(null); // Close view modal first
                                setTimeout(() => {
                                  setSelectedApplication(app);
                                  setIsPaymentModalOpen(true);
                                }, 0);
                              }}
                              className="w-7 h-7 rounded-full cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center justify-center shadow-md transition-all"
                              title="Payment"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                            </button>
                          </WaterRipple>
                        )}
                        
                        {/* Download button - always visible except for Rejected */}
                        <WaterRipple color="rgba(59, 130, 246, 0.3)">
                          <button 
                            onClick={(e) => handleDownloadApplication(app, e)}
                            disabled={app.status === 'Rejected'}
                            className={`w-7 h-7 rounded-full cursor-pointer ${
                              app.status === 'Rejected'
                                ? 'bg-gray-300 cursor-not-allowed opacity-50'
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                            } text-white flex items-center justify-center shadow-md transition-all`}
                            title={app.status === 'Rejected' ? 'Application Rejected' : 'Download'}
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </WaterRipple>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="text-slate-600 text-[11px]" style={{ fontWeight: 600 }}>
            Showing {((currentPage - 1) * entriesPerPage) + 1} to {Math.min(currentPage * entriesPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
              className="text-[11px]"
              style={{ fontWeight: 600 }}
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <WaterRipple key={pageNum} color="rgba(59, 130, 246, 0.3)">
                    <button
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg cursor-pointer transition-all text-[11px] ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                          : 'bg-white border border-gray-300 text-slate-700 hover:bg-blue-50'
                      }`}
                      style={{ fontWeight: 700 }}
                    >
                      {pageNum}
                    </button>
                  </WaterRipple>
                );
              })}
            </div>
            
            <Button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
              className="text-[11px]"
              style={{ fontWeight: 600 }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}