import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CheckCircle, X, FileText, Gauge, Calendar, Home, RotateCcw, Eye, File, Image as ImageIcon, ChevronDown, ChevronUp, CreditCard, IndianRupee } from 'lucide-react';
import { WaterRipple } from './WaterRipple';
import { toast } from 'sonner@2.0.3';
import { motion, AnimatePresence } from 'motion/react';

interface ApprovalModalProps {
  application: any;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (app: any) => void;
  onReject: (app: any) => void;
}

export function ApprovalModal({ application, isOpen, onClose, onApprove, onReject }: ApprovalModalProps) {
  const [showMeterDetails, setShowMeterDetails] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);
  const [showDocuments, setShowDocuments] = useState(false); // Collapsed by default
  const [showNotesheet, setShowNotesheet] = useState(false); // For inline notesheet view
  const [showPayment, setShowPayment] = useState(false); // Collapsed by default
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showApprovalLetter, setShowApprovalLetter] = useState(false);
  const [paymentData, setPaymentData] = useState({
    paymentMode: 'Cash',
    mobileNumber: '',
    bankName: '',
    amount: '7700',
  });
  const [cnbNumber, setCnbNumber] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [meterData, setMeterData] = useState({
    meterNo: '',
    meterSize: '15',
    meterValue: '',
    meterCompany: '',
    meterStatus: 'Start',
    excessMeterReading: '',
    dateWhenMeterIssued: '',
    meterTest: 'Yes',
    meterReadingBeforeTest: '',
    meterReadingAfterTest: '',
    dateWhenMeterTest: '',
    remarksForMeter: '',
  });

  if (!application) return null;

  const handleApprove = () => {
    // Check if it's alteration, mutation, or disconnection (skip payment flow)
    const skipPaymentFlow = 
      application.details === 'Alteration' || 
      application.details === 'Correction in Demand Bill' ||
      application.details === 'Disconnection' ||
      application.details === 'Disconnect Connection';

    const isNewConnection = application.details === 'New Connection' || application.applicationType === 'New Connection';

    // For new connections, check if payment is completed
    if (isNewConnection && !paymentCompleted) {
      toast.error('❌ Please complete the payment first!');
      return;
    }

    // Check if meter details are required and filled
    if (showMeterDetails) {
      if (!meterData.meterNo || !meterData.meterSize || !meterData.meterStatus || !meterData.dateWhenMeterIssued || !meterData.meterTest) {
        toast.error('❌ Please fill all mandatory meter details!');
        return;
      }
    }

    // For alteration/mutation/disconnection, directly mark as Application Accepted (no payment needed)
    const finalStatus = skipPaymentFlow ? 'Application Accepted' : 'Application Accepted';

    onApprove({
      ...application,
      status: finalStatus,
      meterDetails: showMeterDetails ? meterData : null,
      cnbNumber: isNewConnection ? cnbNumber : null,
      receiptNumber: isNewConnection ? receiptNumber : null,
      paymentDetails: isNewConnection ? paymentData : null,
    });
    
    if (skipPaymentFlow) {
      toast.success('✅ Application approved and accepted successfully! No payment required for this application type.');
      onClose();
    } else if (isNewConnection) {
      // For new connections, show approval letter first before closing
      toast.success('✅ Application approved and accepted successfully!', {
        description: 'Generating approval letter...',
      });
      
      setTimeout(() => {
        setShowApprovalLetter(true);
      }, 300);
    } else {
      toast.success('✅ Application approved and accepted successfully!');
      onClose();
    }
  };

  const handleReject = () => {
    onReject({
      ...application,
      status: 'Rejected',
    });
    
    onClose();
    toast.error('❌ Application rejected!');
  };

  const handleRevertToEdit = () => {
    if (window.confirm('Are you sure you want to revert this application for editing?')) {
      onReject({
        ...application,
        status: 'Under Review',
      });
      
      onClose();
      toast.warning('🔄 Application reverted to Under Review!', {
        description: 'Application can now be edited again.',
      });
    }
  };

  const handleCompletePayment = () => {
    // Validate payment details
    if (!paymentData.mobileNumber || !paymentData.bankName) {
      toast.error('❌ Please fill all payment details!');
      return;
    }

    // Generate CNB Number and Receipt Number
    const generatedCNB = `WTDG${Math.floor(10000 + Math.random() * 90000)}`;
    const generatedReceipt = `RCP${Math.floor(100000 + Math.random() * 900000)}`;
    
    setCnbNumber(generatedCNB);
    setReceiptNumber(generatedReceipt);
    setPaymentCompleted(true);
    
    toast.success(`✅ Payment completed successfully! CNB Number: ${generatedCNB}`);
  };

  // Payment breakdown
  const paymentBreakdown = [
    { name: 'Connection Fee', amount: 300 },
    { name: 'Security Deposit', amount: 500 },
    { name: 'Base Amount', amount: 1500 },
    { name: 'Meter Installation Charge', amount: 700 },
    { name: 'Other Charges', amount: 4500 },
  ];

  const totalAmount = paymentBreakdown.reduce((sum, item) => sum + item.amount, 0);

  const isNewConnection = application?.details === 'New Connection' || application?.applicationType === 'New Connection';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[98vw] sm:w-[96vw] lg:w-[95vw] !max-w-none p-0 overflow-hidden bg-white border border-blue-300/50 shadow-lg max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="relative bg-gradient-to-r from-blue-400 via-blue-400 to-blue-500 px-3 sm:px-6 py-2 sm:py-3 text-white overflow-hidden sticky top-0 z-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-30"></div>
          <div className="relative flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-sm flex-shrink-0">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-black m-0 text-sm sm:text-lg truncate" style={{ fontWeight: 800 }}>
                  Application Approval
                </DialogTitle>
                <DialogDescription className="text-blue-100 text-[10px] sm:text-xs mt-0.5 truncate">
                  {application.applicationNo}
                </DialogDescription>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-sm transition-all flex-shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-2 space-y-2">
          {/* Application Details - Row 1 */}
          <div className="bg-white rounded-lg shadow-sm border border-blue-300/40 overflow-hidden">
            <div className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
              <span className="text-sm" style={{ fontWeight: 800 }}>Application Details</span>
            </div>
            
            <div className="p-3">
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-gradient-to-br from-blue-50/60 to-blue-100/60 rounded-lg p-2.5 border border-blue-300/50">
                  <div className="text-xs text-gray-900 mb-1" style={{ fontWeight: 700 }}>Application No</div>
                  <div className="text-blue-900 text-sm" style={{ fontWeight: 900 }}>{application.applicationNo}</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50/60 to-sky-100/60 rounded-lg p-2.5 border border-blue-300/50">
                  <div className="text-xs text-gray-900 mb-1" style={{ fontWeight: 700 }}>Consumer Name</div>
                  <div className="text-blue-900 text-sm" style={{ fontWeight: 900 }}>{application.applicantName}</div>
                </div>
                <div className="bg-gradient-to-br from-sky-50/60 to-cyan-100/60 rounded-lg p-2.5 border border-sky-300/50">
                  <div className="text-xs text-gray-900 mb-1" style={{ fontWeight: 700 }}>Consumer No</div>
                  <div className="text-sky-900 text-sm" style={{ fontWeight: 900 }}>{application.consumerNo}</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-50/60 to-blue-100/60 rounded-lg p-2.5 border border-cyan-300/50">
                  <div className="text-xs text-gray-900 mb-1" style={{ fontWeight: 700 }}>Application Type</div>
                  <div className="text-cyan-900 text-sm" style={{ fontWeight: 900 }}>{application.applicationType}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Consumer Details - Row 2 */}
          <div className="bg-white rounded-lg shadow-sm border border-purple-300/40 overflow-hidden">
            <div className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
              <span className="text-sm" style={{ fontWeight: 800 }}>Consumer Details</span>
            </div>
            
            <div className="p-3">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <div className="text-xs text-black mb-1" style={{ fontWeight: 700 }}>Ward No</div>
                  <div className="text-gray-900 text-sm bg-gray-100 px-2 py-1 rounded" style={{ fontWeight: 800 }}>{application.wardNo || '5'}</div>
                </div>
                <div>
                  <div className="text-xs text-black mb-1" style={{ fontWeight: 700 }}>Zone No</div>
                  <div className="text-gray-900 text-sm bg-gray-100 px-2 py-1 rounded" style={{ fontWeight: 800 }}>{application.zoneNo || 'Zone A'}</div>
                </div>
                <div>
                  <div className="text-xs text-black mb-1" style={{ fontWeight: 700 }}>Mobile Number</div>
                  <div className="text-gray-900 text-sm bg-gray-100 px-2 py-1 rounded" style={{ fontWeight: 800 }}>{application.mobileNumber || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-black mb-1" style={{ fontWeight: 700 }}>Address</div>
                  <div className="text-gray-900 text-sm bg-gray-100 px-2 py-1 rounded" style={{ fontWeight: 800 }}>{application.address || 'Plot No. 123, Ward 5, Akola'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Application Type Specific Details - Row 3 */}
          {application.applicationType === 'New Connection' && (
            <div className="bg-white rounded-lg shadow-sm border border-indigo-300/50 overflow-hidden">
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                <span className="text-sm" style={{ fontWeight: 800 }}>New Connection Details</span>
              </div>
              
              <div className="p-3">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-black mb-0.5" style={{ fontWeight: 700 }}>Applicant Type</div>
                    <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{application.applicantType || 'Residential'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-black mb-0.5" style={{ fontWeight: 700 }}>Required Load</div>
                    <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{application.requiredLoad || '5 KW'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-black mb-0.5" style={{ fontWeight: 700 }}>Connection Type</div>
                    <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{application.connectionType || 'Single Phase'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-black mb-0.5" style={{ fontWeight: 700 }}>Plot Area</div>
                    <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{application.plotArea || '1200'} sq. ft.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {application.applicationType === 'Alteration' && (
            <div className="bg-white rounded-lg shadow-sm border border-indigo-300/40 overflow-hidden">
              <div className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                <span className="text-sm" style={{ fontWeight: 800 }}>Alteration Details (Before → After)</span>
              </div>
              
              <div className="p-3">
                {/* Before/After Stack */}
                <div className="space-y-3">
                  {/* BEFORE Section */}
                  <div className="bg-orange-50/60 rounded-lg border border-orange-300/50 p-3">
                    <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-orange-300/50">
                      <div className="w-6 h-6 rounded bg-orange-500/80 flex items-center justify-center">
                        <span className="text-white text-xs" style={{ fontWeight: 800 }}>📋</span>
                      </div>
                      <span className="text-sm text-orange-800" style={{ fontWeight: 900 }}>BEFORE - Current Connection</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <div className="text-xs text-gray-900 mb-1" style={{ fontWeight: 700 }}>Property Type</div>
                        <div className="text-red-900 text-sm bg-red-50 px-2 py-1 rounded border border-red-200" style={{ fontWeight: 800 }}>{application.alterationBeforePropertyType || 'Building'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-900 mb-1" style={{ fontWeight: 700 }}>Building Type</div>
                        <div className="text-red-900 text-sm bg-red-50 px-2 py-1 rounded border border-red-200" style={{ fontWeight: 800 }}>{application.alterationBeforeBuildingType || 'House'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-900 mb-1" style={{ fontWeight: 700 }}>Connection Category</div>
                        <div className="text-red-900 text-sm bg-red-50 px-2 py-1 rounded border border-red-200" style={{ fontWeight: 800 }}>{application.alterationBeforeConnectionCategory || 'Quarterly'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-900 mb-1" style={{ fontWeight: 700 }}>Connection Type</div>
                        <div className="text-red-900 text-sm bg-red-50 px-2 py-1 rounded border border-red-200" style={{ fontWeight: 800 }}>{application.alterationBeforeConnectionType || 'Residential'}</div>
                      </div>
                    </div>
                  </div>

                  {/* AFTER Section */}
                  <div className="bg-green-50/60 rounded-lg border border-green-300/50 p-3">
                    <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-green-300/50">
                      <div className="w-6 h-6 rounded bg-green-500/80 flex items-center justify-center">
                        <span className="text-white text-xs" style={{ fontWeight: 800 }}>✨</span>
                      </div>
                      <span className="text-sm text-green-800" style={{ fontWeight: 900 }}>AFTER - Requested Changes</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <div className="text-xs text-gray-900 mb-1" style={{ fontWeight: 700 }}>Property Type</div>
                        <div className="text-blue-900 text-sm bg-blue-50 px-2 py-1 rounded border border-blue-200" style={{ fontWeight: 800 }}>{application.alterationAfterPropertyType || 'Building'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-900 mb-1" style={{ fontWeight: 700 }}>Building Type</div>
                        <div className="text-blue-900 text-sm bg-blue-50 px-2 py-1 rounded border border-blue-200" style={{ fontWeight: 800 }}>{application.alterationAfterBuildingType || 'House'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-900 mb-1" style={{ fontWeight: 700 }}>Connection Category</div>
                        <div className="text-blue-900 text-sm bg-blue-50 px-2 py-1 rounded border border-blue-200" style={{ fontWeight: 800 }}>{application.alterationAfterConnectionCategory || 'Quarterly'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-900 mb-1" style={{ fontWeight: 700 }}>Connection Type</div>
                        <div className="text-blue-900 text-sm bg-blue-50 px-2 py-1 rounded border border-blue-200" style={{ fontWeight: 800 }}>{application.alterationAfterConnectionType || 'Residential'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tax Details - Only for Alteration */}
          {application.applicationType === 'Alteration' && (
            <div className="bg-white rounded-lg shadow-sm border border-purple-300/40 overflow-hidden">
              <div className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                <span className="text-sm" style={{ fontWeight: 800 }}>Tax Details Summary</span>
              </div>
              
              <div className="p-3">
                <div className="grid grid-cols-2 gap-3">
                  {/* Pending Tax */}
                  <div className="bg-gradient-to-br from-amber-50/60 to-amber-100/60 rounded-lg border border-amber-300/50 p-3">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-6 h-6 rounded bg-amber-500/80 text-white flex items-center justify-center">
                        <IndianRupee className="w-3.5 h-3.5" />
                      </div>
                      <h5 className="text-amber-900 text-sm" style={{ fontWeight: 900 }}>Pending Tax</h5>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-amber-200">
                          <tr>
                            <th className="px-2 py-1.5 text-left text-amber-900 text-xs" style={{ fontWeight: 800 }}>Year</th>
                            <th className="px-2 py-1.5 text-left text-amber-900 text-xs" style={{ fontWeight: 800 }}>Tax</th>
                            <th className="px-2 py-1.5 text-left text-amber-900 text-xs" style={{ fontWeight: 800 }}>Interest</th>
                            <th className="px-2 py-1.5 text-left text-amber-900 text-xs" style={{ fontWeight: 800 }}>Payable</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="border-b border-amber-200">
                            <td className="px-2 py-2 text-xs" style={{ fontWeight: 600 }}>2025</td>
                            <td className="px-2 py-2 text-xs" style={{ fontWeight: 700 }}>₹1,690</td>
                            <td className="px-2 py-2 text-xs" style={{ fontWeight: 700 }}>₹0</td>
                            <td className="px-2 py-2 text-xs text-amber-700 bg-amber-50" style={{ fontWeight: 900 }}>₹1,690</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Running Tax */}
                  <div className="bg-gradient-to-br from-blue-50/60 to-blue-100/60 rounded-lg border border-blue-300/50 p-3">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-6 h-6 rounded bg-blue-500/80 text-white flex items-center justify-center">
                        <IndianRupee className="w-3.5 h-3.5" />
                      </div>
                      <h5 className="text-blue-900 text-sm" style={{ fontWeight: 900 }}>Running Tax</h5>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-blue-200">
                          <tr>
                            <th className="px-2 py-1.5 text-left text-blue-900 text-xs" style={{ fontWeight: 800 }}>Year</th>
                            <th className="px-2 py-1.5 text-left text-blue-900 text-xs" style={{ fontWeight: 800 }}>Tax</th>
                            <th className="px-2 py-1.5 text-left text-blue-900 text-xs" style={{ fontWeight: 800 }}>Interest</th>
                            <th className="px-2 py-1.5 text-left text-blue-900 text-xs" style={{ fontWeight: 800 }}>Payable</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="border-b border-blue-200">
                            <td className="px-2 py-2 text-xs" style={{ fontWeight: 600 }}>2024</td>
                            <td className="px-2 py-2 text-xs" style={{ fontWeight: 700 }}>₹16,416</td>
                            <td className="px-2 py-2 text-xs" style={{ fontWeight: 700 }}>₹0</td>
                            <td className="px-2 py-2 text-xs text-blue-700 bg-blue-50" style={{ fontWeight: 900 }}>₹16,416</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 p-2.5 bg-purple-100/60 rounded-lg border border-purple-300/50">
                  <div className="text-sm text-purple-900 text-center" style={{ fontWeight: 800 }}>
                    Total Payable: <span className="text-purple-700 text-base" style={{ fontWeight: 900 }}>₹18,106</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {application.applicationType === 'Disconnection' && (
            <div className="bg-white rounded-lg shadow-sm border border-indigo-300/40 overflow-hidden">
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                <span className="text-sm" style={{ fontWeight: 800 }}>Installation Status</span>
              </div>
              
              <div className="p-3">
                {/* Installation Status Table */}
                <div className="overflow-hidden rounded-lg border border-gray-300/40">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="bg-white px-3 py-2 text-left text-xs text-black border-r border-b border-gray-300/40" style={{ fontWeight: 700 }}>
                          Point Type
                        </th>
                        <th className="px-3 py-2 text-center text-xs border-r border-b border-gray-300/40 bg-gradient-to-r from-blue-500 to-blue-400 text-white" style={{ fontWeight: 800 }}>
                          Electricity Installation
                        </th>
                        <th className="px-3 py-2 text-center text-xs border-b border-gray-300/40 bg-gradient-to-r from-blue-500 to-blue-400 text-white" style={{ fontWeight: 800 }}>
                          Settlement Installation
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="bg-gray-50 px-3 py-2 text-xs text-black border-r border-b border-gray-300/40" style={{ fontWeight: 600 }}>
                          Meter Point
                        </td>
                        <td className="bg-white px-3 py-2 text-center text-sm text-gray-900 border-r border-b border-gray-300/40" style={{ fontWeight: 700 }}>
                          Stop
                        </td>
                        <td className="bg-white px-3 py-2 text-center text-sm text-red-600 border-b border-gray-300/40" style={{ fontWeight: 700 }}>
                          Stop
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-gray-50 px-3 py-2 text-xs text-black border-r border-gray-300/40" style={{ fontWeight: 600 }}>
                          Connection Point
                        </td>
                        <td className="bg-white px-3 py-2 text-center text-sm text-gray-900 border-r border-gray-300/40" style={{ fontWeight: 700 }}>
                          Start
                        </td>
                        <td className="bg-white px-3 py-2 text-center text-sm text-red-600 border-gray-300/40" style={{ fontWeight: 700 }}>
                          Stop
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {application.applicationType === 'Mutation' && (
            <div className="bg-white rounded-lg shadow-sm border border-indigo-300/40 overflow-hidden">
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                <span className="text-sm" style={{ fontWeight: 800 }}>Mutation Details (Read Only)</span>
              </div>
              
              <div className="p-3 space-y-3">
                {/* BEFORE Section - Full Width Row */}
                <div className="bg-red-50/60 rounded-lg border border-red-300/50 p-3">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-red-300/50">
                    <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center">
                      <span className="text-white text-xs" style={{ fontWeight: 800 }}>📋</span>
                    </div>
                    <span className="text-sm text-red-700" style={{ fontWeight: 800 }}>BEFORE - Old Owner Details</span>
                  </div>
                  
                  {/* All fields in one horizontal row */}
                  <div className="grid grid-cols-7 gap-3">
                    <div>
                      <div className="text-xs text-red-600 mb-1" style={{ fontWeight: 700 }}>Old Owner Name</div>
                      <div className="text-red-900 text-sm" style={{ fontWeight: 600 }}>{application.mutationOldName || application.beforeOwnerName || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-red-600 mb-1" style={{ fontWeight: 700 }}>Old Address</div>
                      <div className="text-red-900 text-sm" style={{ fontWeight: 600 }}>{application.mutationOldAddress || application.beforeAddress || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-red-600 mb-1" style={{ fontWeight: 700 }}>Old Mobile No</div>
                      <div className="text-red-900 text-sm" style={{ fontWeight: 600 }}>{application.mutationOldMobile || application.beforeMobile || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-red-600 mb-1" style={{ fontWeight: 700 }}>Old Property Type</div>
                      <div className="text-red-900 text-sm" style={{ fontWeight: 600 }}>{application.beforePropertyType || 'building'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-red-600 mb-1" style={{ fontWeight: 700 }}>Old Connection Type</div>
                      <div className="text-red-900 text-sm" style={{ fontWeight: 600 }}>{application.beforeConnectionType || 'Residential'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-red-600 mb-1" style={{ fontWeight: 700 }}>Old Connection Count</div>
                      <div className="text-red-900 text-sm" style={{ fontWeight: 600 }}>{application.beforeConnectionCount || '1'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-red-600 mb-1" style={{ fontWeight: 700 }}>Old Tap Size</div>
                      <div className="text-red-900 text-sm" style={{ fontWeight: 600 }}>{application.beforeTapSize || '15mm'}</div>
                    </div>
                  </div>
                </div>

                {/* AFTER Section - Full Width Row */}
                <div className="bg-blue-50/60 rounded-lg border border-blue-300/50 p-3">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-300/50">
                    <div className="w-6 h-6 rounded bg-blue-500/80 flex items-center justify-center">
                      <span className="text-white text-xs" style={{ fontWeight: 800 }}>✨</span>
                    </div>
                    <span className="text-sm text-gray-900" style={{ fontWeight: 800 }}>AFTER - New Owner Details</span>
                  </div>
                  
                  {/* All fields in one horizontal row */}
                  <div className="grid grid-cols-7 gap-3">
                    <div>
                      <div className="text-xs text-blue-600 mb-1" style={{ fontWeight: 700 }}>New Owner Name</div>
                      <div className="text-blue-900 text-sm" style={{ fontWeight: 600 }}>{application.mutationNewName || application.applicantName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 mb-1" style={{ fontWeight: 700 }}>New Address</div>
                      <div className="text-blue-900 text-sm" style={{ fontWeight: 600 }}>{application.mutationNewAddress || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 mb-1" style={{ fontWeight: 700 }}>New Mobile</div>
                      <div className="text-blue-900 text-sm" style={{ fontWeight: 600 }}>{application.mutationNewMobile || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 mb-1" style={{ fontWeight: 700 }}>Property Type</div>
                      <div className="text-blue-900 text-sm" style={{ fontWeight: 600 }}>{application.afterPropertyType || 'building'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 mb-1" style={{ fontWeight: 700 }}>Connection Type</div>
                      <div className="text-blue-900 text-sm" style={{ fontWeight: 600 }}>{application.afterConnectionType || 'Residential'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 mb-1" style={{ fontWeight: 700 }}>Connection Count</div>
                      <div className="text-blue-900 text-sm" style={{ fontWeight: 600 }}>{application.afterConnectionCount || '1'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 mb-1" style={{ fontWeight: 700 }}>Tap Size</div>
                      <div className="text-blue-900 text-sm" style={{ fontWeight: 600 }}>{application.afterTapSize || '15mm'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Preview Section */}
          <div className="bg-white rounded-xl shadow-sm border border-cyan-300/40 overflow-hidden">
            <button 
              onClick={() => setShowDocuments(!showDocuments)}
              className="w-full px-4 py-2 flex items-center justify-between transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-400 text-white"
            >
              <span className="text-sm" style={{ fontWeight: 800 }}>Uploaded Documents</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{showDocuments ? 'Collapse' : 'Expand'}</span>
                {showDocuments ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </button>
            
            <AnimatePresence>
              {showDocuments && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Application Documents */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                              <File className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-xs text-blue-900" style={{ fontWeight: 700 }}>Application Documents</div>
                              <div className="text-[10px] text-blue-600">ID Proof, Address Proof, etc.</div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between bg-white rounded-lg p-2 border border-blue-200">
                            <div className="flex items-center gap-2">
                              <ImageIcon className="w-4 h-4 text-blue-600" />
                              <span className="text-xs text-black">Aadhar_Card.pdf</span>
                            </div>
                            <WaterRipple color="rgba(59, 130, 246, 0.3)">
                              <button
                                onClick={() => setViewingDocument('aadhar')}
                                className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center justify-center shadow-md transition-all"
                                title="View Document"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </WaterRipple>
                          </div>
                          <div className="flex items-center justify-between bg-white rounded-lg p-2 border border-blue-200">
                            <div className="flex items-center gap-2">
                              <ImageIcon className="w-4 h-4 text-blue-600" />
                              <span className="text-xs text-black">Address_Proof.pdf</span>
                            </div>
                            <WaterRipple color="rgba(59, 130, 246, 0.3)">
                              <button
                                onClick={() => setViewingDocument('address')}
                                className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center justify-center shadow-md transition-all"
                                title="View Document"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </WaterRipple>
                          </div>
                          <div className="flex items-center justify-between bg-white rounded-lg p-2 border border-blue-200">
                            <div className="flex items-center gap-2">
                              <ImageIcon className="w-4 h-4 text-blue-600" />
                              <span className="text-xs text-black">Property_Documents.pdf</span>
                            </div>
                            <WaterRipple color="rgba(59, 130, 246, 0.3)">
                              <button
                                onClick={() => setViewingDocument('property')}
                                className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center justify-center shadow-md transition-all"
                                title="View Document"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </WaterRipple>
                          </div>
                        </div>
                      </div>

                      {/* Note Sheet */}
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-xs text-purple-900" style={{ fontWeight: 700 }}>Note Sheet</div>
                              <div className="text-[10px] text-purple-600">Uploaded by officer</div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <button
                            onClick={() => setShowNotesheet(!showNotesheet)}
                            className="w-full flex items-center justify-between bg-white rounded-lg p-2 border border-purple-200 hover:bg-purple-50 transition-all"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-purple-600" />
                              <span className="text-xs text-black">Note_Sheet_{application.applicationNo}.pdf</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-purple-600" style={{ fontWeight: 600 }}>
                                {showNotesheet ? 'Hide' : 'View'}
                              </span>
                              <WaterRipple color="rgba(59, 130, 246, 0.3)">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white flex items-center justify-center shadow-md transition-all">
                                  {showNotesheet ? (
                                    <ChevronUp className="w-3.5 h-3.5" />
                                  ) : (
                                    <Eye className="w-3.5 h-3.5" />
                                  )}
                                </div>
                              </WaterRipple>
                            </div>
                          </button>
                          
                          {/* Inline Notesheet Content */}
                          <AnimatePresence>
                            {showNotesheet && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="bg-white rounded-lg shadow-xl border-2 border-purple-300 p-3 space-y-2">
                                  {/* Notesheet Header */}
                                  <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-3 py-2 rounded-lg">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <h4 className="text-sm" style={{ fontWeight: 800 }}>Official Notesheet</h4>
                                        <p className="text-[10px] text-blue-100">Akola Municipal Corporation - Water Department</p>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-[10px] text-blue-100">Date: {new Date().toLocaleDateString('en-IN')}</div>
                                        <div className="text-[10px] text-blue-100">Time: {new Date().toLocaleTimeString('en-IN')}</div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Application Information */}
                                  <div className="border border-blue-200 rounded-lg p-2 bg-blue-50/50">
                                    <h5 className="text-blue-900 mb-1.5 flex items-center gap-1 text-xs" style={{ fontWeight: 800 }}>
                                      <FileText className="w-3 h-3" />
                                      Application Information
                                    </h5>
                                    <div className="grid grid-cols-2 gap-1.5">
                                      <div className="bg-white rounded p-1.5 border border-blue-200">
                                        <div className="text-[9px] text-blue-600 mb-0.5" style={{ fontWeight: 700 }}>Application No</div>
                                        <div className="text-blue-900 text-[10px]" style={{ fontWeight: 800 }}>{application.applicationNo}</div>
                                      </div>
                                      <div className="bg-white rounded p-1.5 border border-blue-200">
                                        <div className="text-[9px] text-blue-600 mb-0.5" style={{ fontWeight: 700 }}>Consumer No</div>
                                        <div className="text-blue-900 text-[10px]" style={{ fontWeight: 800 }}>{application.consumerNo}</div>
                                      </div>
                                      <div className="bg-white rounded p-1.5 border border-blue-200">
                                        <div className="text-[9px] text-blue-600 mb-0.5" style={{ fontWeight: 700 }}>Applicant Name</div>
                                        <div className="text-blue-900 text-[10px]" style={{ fontWeight: 800 }}>{application.applicantName}</div>
                                      </div>
                                      <div className="bg-white rounded p-1.5 border border-blue-200">
                                        <div className="text-[9px] text-blue-600 mb-0.5" style={{ fontWeight: 700 }}>Application Type</div>
                                        <div className="text-blue-900 text-[10px]" style={{ fontWeight: 800 }}>{application.applicationType || application.details}</div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Inspection & Verification */}
                                  <div className="border border-blue-200 rounded-lg p-2 bg-blue-50/50">
                                    <h5 className="text-blue-900 mb-1.5 flex items-center gap-1 text-xs" style={{ fontWeight: 800 }}>
                                      <CheckCircle className="w-3 h-3" />
                                      Inspection & Verification Report
                                    </h5>
                                    <div className="space-y-1">
                                      <div className="flex items-start gap-1.5 text-[10px]">
                                        <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                          <span style={{ fontWeight: 700 }}>Site Inspection: </span>
                                          <span className="text-slate-700">Completed successfully on {new Date().toLocaleDateString('en-IN')}</span>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-1.5 text-[10px]">
                                        <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                          <span style={{ fontWeight: 700 }}>Document Verification: </span>
                                          <span className="text-slate-700">All documents verified and found valid</span>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-1.5 text-[10px]">
                                        <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                          <span style={{ fontWeight: 700 }}>Feasibility Check: </span>
                                          <span className="text-slate-700">Connection feasible as per technical norms</span>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-1.5 text-[10px]">
                                        <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                          <span style={{ fontWeight: 700 }}>Zone/Ward Verification: </span>
                                          <span className="text-slate-700">{application.zoneNo || 'Zone A'}, Ward {application.wardNo || '5'}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Officer's Recommendation */}
                                  <div className="border border-blue-200 rounded-lg p-2 bg-blue-50/50">
                                    <h5 className="text-blue-900 mb-1 flex items-center gap-1 text-xs" style={{ fontWeight: 800 }}>
                                      <FileText className="w-3 h-3" />
                                      Officer's Recommendation
                                    </h5>
                                    <p className="text-[10px] text-blue-800 leading-relaxed">
                                      Based on the site inspection and document verification, the application is found to be in order. All technical and administrative requirements have been fulfilled. The application is recommended for approval.
                                    </p>
                                  </div>

                                  {/* Footer */}
                                  <div className="flex items-center justify-between text-[9px] text-slate-600 pt-1 border-t border-slate-200">
                                    <div className="flex items-center gap-1">
                                      <FileText className="w-3 h-3 text-slate-500" />
                                      <span>Generated automatically by Akola Municipal CRM System</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-green-600">
                                      <CheckCircle className="w-3 h-3" />
                                      <span style={{ fontWeight: 600 }}>Secure & Encrypted</span>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          {!showNotesheet && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                              <p className="text-[10px] text-gray-900">
                                <strong>Note:</strong> Note sheet contains verification details and officer's notes.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Payment Section - Only for New Connection */}
          {isNewConnection && (
            <div className="bg-white rounded-xl shadow-sm border border-purple-300/40 overflow-hidden">
              <button 
                onClick={() => setShowPayment(!showPayment)}
                className="w-full px-4 py-2 flex items-center justify-between transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-400 text-white"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-sm" style={{ fontWeight: 800 }}>Make Payment</span>
                  {paymentCompleted && (
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">✓ Completed</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">{showPayment ? 'Collapse' : 'Expand'}</span>
                  {showPayment ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {showPayment && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-4">
                      {!paymentCompleted ? (
                        <>
                          {/* Payment Breakdown */}
                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
                            <div className="text-sm text-purple-900 mb-2" style={{ fontWeight: 700 }}>Fee Details</div>
                            <table className="w-full text-xs">
                              <tbody>
                                {paymentBreakdown.map((item, index) => (
                                  <tr key={index} className="border-b border-purple-200">
                                    <td className="py-1.5 text-gray-700">{item.name}</td>
                                    <td className="text-right py-1.5 text-gray-900" style={{ fontWeight: 600 }}>₹ {item.amount}</td>
                                  </tr>
                                ))}
                                <tr className="border-t-2 border-purple-400">
                                  <td className="py-2 text-purple-900" style={{ fontWeight: 800 }}>Total</td>
                                  <td className="text-right py-2 text-purple-900" style={{ fontWeight: 800 }}>₹ {totalAmount}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Payment Form */}
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                                  Payment Mode *
                                </label>
                                <select
                                  value={paymentData.paymentMode}
                                  onChange={(e) => setPaymentData({ ...paymentData, paymentMode: e.target.value })}
                                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm h-9"
                                >
                                  <option value="Cash">Cash</option>
                                  <option value="Cheque">Cheque</option>
                                  <option value="UPI">UPI</option>
                                  <option value="Net Banking">Net Banking</option>
                                  <option value="Credit Card">Credit Card</option>
                                  <option value="Debit Card">Debit Card</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                                  Mobile Number *
                                </label>
                                <Input
                                  value={paymentData.mobileNumber}
                                  onChange={(e) => setPaymentData({ ...paymentData, mobileNumber: e.target.value })}
                                  className="border border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg h-9 text-sm"
                                  placeholder="9876543210"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                                  Bank Details *
                                </label>
                                <select
                                  value={paymentData.bankName}
                                  onChange={(e) => setPaymentData({ ...paymentData, bankName: e.target.value })}
                                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm h-9"
                                >
                                  <option value="">Select Bank</option>
                                  <option value="SBI - Main Branch">SBI - Main Branch</option>
                                  <option value="SBI - City Center">SBI - City Center</option>
                                  <option value="SBI - Market Area">SBI - Market Area</option>
                                  <option value="HDFC Bank">HDFC Bank</option>
                                  <option value="ICICI Bank">ICICI Bank</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                                  Payment Amount
                                </label>
                                <Input
                                  value={`₹ ${totalAmount}`}
                                  readOnly
                                  className="border border-gray-300 bg-gray-100 rounded-lg h-9 text-sm"
                                />
                              </div>
                            </div>

                            {/* Pay Now Button */}
                            <div className="flex justify-center pt-2">
                              <WaterRipple color="rgba(168, 85, 247, 0.3)">
                                <Button
                                  onClick={handleCompletePayment}
                                  className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-8 py-2 rounded-lg shadow-lg"
                                >
                                  <IndianRupee className="w-4 h-4 mr-2" />
                                  Complete Payment
                                </Button>
                              </WaterRipple>
                            </div>
                          </div>
                        </>
                      ) : (
                        /* Payment Success Display */
                        <div className="space-y-3">
                          <div className="bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg p-4 text-center">
                            <CheckCircle className="w-12 h-12 text-white mx-auto mb-2" />
                            <h3 className="text-white text-lg mb-1" style={{ fontWeight: 800 }}>Payment Successful!</h3>
                            <p className="text-green-100 text-xs">CNB Number has been generated</p>
                          </div>

                          <div className="bg-gradient-to-br from-blue-50/60 to-cyan-100/60 rounded-lg p-4 border border-blue-300/50 text-center">
                            <div className="text-xs text-gray-900 mb-1" style={{ fontWeight: 700 }}>Consumer Number (CNB)</div>
                            <div className="text-blue-900 text-2xl mb-3" style={{ fontWeight: 900, letterSpacing: '0.1em' }}>{cnbNumber}</div>
                            
                            <div className="grid grid-cols-2 gap-3 text-left">
                              <div className="bg-white rounded-lg p-2 border border-green-200">
                                <div className="text-[10px] text-green-600 mb-0.5" style={{ fontWeight: 700 }}>Receipt No</div>
                                <div className="text-green-900 text-sm" style={{ fontWeight: 800 }}>{receiptNumber}</div>
                              </div>
                              <div className="bg-white rounded-lg p-2 border border-green-200">
                                <div className="text-[10px] text-green-600 mb-0.5" style={{ fontWeight: 700 }}>Amount Paid</div>
                                <div className="text-green-900 text-sm" style={{ fontWeight: 800 }}>₹ {totalAmount}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Meter Reading Details Toggle - Hide for Mutation, Alteration, and Disconnection */}
          {!['Mutation', 'Alteration', 'Correction in Demand Bill', 'Disconnection'].includes(application.applicationType) && (
          <div className={`bg-white rounded-xl shadow-sm border border-green-300/40 overflow-hidden ${isNewConnection && !paymentCompleted ? 'opacity-50 pointer-events-none' : ''}`}>
            <button 
              onClick={() => {
                if (isNewConnection && !paymentCompleted) {
                  toast.warning('⚠️ Please complete the payment first to add meter details!');
                  return;
                }
                setShowMeterDetails(!showMeterDetails);
              }}
              className="w-full px-4 py-2 flex items-center justify-between transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-400 text-white"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ fontWeight: 800 }}>Meter Reading Details</span>
                {isNewConnection && !paymentCompleted && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">🔒 Payment Required</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">{showMeterDetails ? 'Collapse' : 'Expand'}</span>
                {showMeterDetails ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </button>
            
            <AnimatePresence>
              {showMeterDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 space-y-3">
                    {/* Row 1 - 6 columns */}
                    <div className="grid grid-cols-6 gap-3">
                      <div>
                        <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                          Meter No <span className="text-red-500">*</span>
                        </label>
                        <Input
                          value={meterData.meterNo}
                          onChange={(e) => setMeterData({ ...meterData, meterNo: e.target.value })}
                          className="border border-gray-300 rounded-lg h-8 text-sm"
                          placeholder="Enter meter number"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                          Meter Size <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={meterData.meterSize}
                          onChange={(e) => setMeterData({ ...meterData, meterSize: e.target.value })}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm h-8"
                        >
                          <option value="15">15</option>
                          <option value="20">20</option>
                          <option value="100">100</option>
                          <option value="150">150</option>
                          <option value="200">200</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                          Meter Value
                        </label>
                        <Input
                          value={meterData.meterValue}
                          onChange={(e) => setMeterData({ ...meterData, meterValue: e.target.value })}
                          className="border border-gray-300 rounded-lg h-8 text-sm"
                          placeholder="Enter value"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                          Meter Company
                        </label>
                        <Input
                          value={meterData.meterCompany}
                          onChange={(e) => setMeterData({ ...meterData, meterCompany: e.target.value })}
                          className="border border-gray-300 rounded-lg h-8 text-sm"
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                          Meter Status <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={meterData.meterStatus}
                          onChange={(e) => setMeterData({ ...meterData, meterStatus: e.target.value })}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm h-8"
                        >
                          <option value="Start">Start</option>
                          <option value="Stop">Stop</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                          Excess Meter Reading
                        </label>
                        <Input
                          value={meterData.excessMeterReading}
                          onChange={(e) => setMeterData({ ...meterData, excessMeterReading: e.target.value })}
                          className="border border-gray-300 rounded-lg h-8 text-sm"
                          placeholder="Enter reading"
                        />
                      </div>
                    </div>

                    {/* Row 2 - 5 columns */}
                    <div className="grid grid-cols-5 gap-3">
                      <div>
                        <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                          Date When Meter Issued <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="date"
                          value={meterData.dateWhenMeterIssued}
                          onChange={(e) => setMeterData({ ...meterData, dateWhenMeterIssued: e.target.value })}
                          className="border border-gray-300 rounded-lg h-8 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                          Meter Test <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={meterData.meterTest}
                          onChange={(e) => setMeterData({ ...meterData, meterTest: e.target.value })}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm h-8"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                          Meter Reading Before Test
                        </label>
                        <Input
                          value={meterData.meterReadingBeforeTest}
                          onChange={(e) => setMeterData({ ...meterData, meterReadingBeforeTest: e.target.value })}
                          className="border border-gray-300 rounded-lg h-8 text-sm"
                          placeholder="Before test"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                          Meter Reading After Test
                        </label>
                        <Input
                          value={meterData.meterReadingAfterTest}
                          onChange={(e) => setMeterData({ ...meterData, meterReadingAfterTest: e.target.value })}
                          className="border border-gray-300 rounded-lg h-8 text-sm"
                          placeholder="After test"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                          Date When Meter Test
                        </label>
                        <Input
                          type="date"
                          value={meterData.dateWhenMeterTest}
                          onChange={(e) => setMeterData({ ...meterData, dateWhenMeterTest: e.target.value })}
                          className="border border-gray-300 rounded-lg h-8 text-sm"
                        />
                      </div>
                    </div>

                    {/* Row 3 - Full width textarea for remarks */}
                    <div>
                      <label className="text-xs text-black mb-1 block" style={{ fontWeight: 700 }}>
                        Remarks for Meter
                      </label>
                      <textarea
                        value={meterData.remarksForMeter}
                        onChange={(e) => setMeterData({ ...meterData, remarksForMeter: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm resize-none"
                        rows={2}
                        placeholder="Enter remarks for meter..."
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                      <p className="text-xs text-blue-800">
                        <strong>Note:</strong> Fields marked with <span className="text-red-500">*</span> are mandatory
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          )}

          {/* Remarks Section */}
          <div className="bg-white rounded-xl shadow-sm border border-yellow-300/40 overflow-hidden">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
              <span className="text-sm" style={{ fontWeight: 800 }}>Remarks</span>
            </div>
            
            <div className="p-3">
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-sm resize-none"
                rows={2}
                placeholder="Enter remarks..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <WaterRipple color="rgba(239, 68, 68, 0.3)">
              <Button
                onClick={handleReject}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg shadow-lg"
              >
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </WaterRipple>

            <WaterRipple color="rgba(251, 146, 60, 0.3)">
              <Button
                onClick={handleRevertToEdit}
                className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white px-6 py-2 rounded-lg shadow-lg"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Revert to Edit
              </Button>
            </WaterRipple>

            <WaterRipple color="rgba(100, 116, 139, 0.3)">
              <Button
                onClick={onClose}
                variant="outline"
                className="border border-slate-300/50 text-slate-700 hover:bg-slate-100 px-6 py-2 rounded-lg shadow-sm"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Back to Dashboard
              </Button>
            </WaterRipple>

            <WaterRipple color="rgba(34, 197, 94, 0.3)">
              <Button
                onClick={handleApprove}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-6 py-2 rounded-lg shadow-lg"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
            </WaterRipple>
          </div>
        </div>
      </DialogContent>

      {/* Approval Letter Modal - TODO: Create ApprovalLetterModal component */}
      {/* {showApprovalLetter && (
        <ApprovalLetterModal
          application={{
            ...application,
            cnbNumber: cnbNumber,
            receiptNumber: receiptNumber,
            paymentDetails: paymentData,
          }}
          isOpen={showApprovalLetter}
          onClose={() => {
            setShowApprovalLetter(false);
            onClose(); // Close the ApprovalModal as well
          }}
        />
      )} */}
    </Dialog>
  );
}