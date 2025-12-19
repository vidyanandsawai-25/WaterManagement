import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { FileText, Loader2, CheckCircle, X, User, Calendar, Building2, Hash, MapPin, Phone, AlertCircle, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface ApproveApplicationModalProps {
  open: boolean;
  onClose: () => void;
  application: any;
  onApprove?: (app: any, remarks: string) => void;
  onReject?: (app: any, remarks: string) => void;
  onRevert?: (app: any, reason: string) => void;
}

export function ApproveApplicationModal({ open, onClose, application, onApprove, onReject, onRevert }: ApproveApplicationModalProps) {
  const [approvalRemarks, setApprovalRemarks] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRevertDialog, setShowRevertDialog] = useState(false);
  const [revertReason, setRevertReason] = useState('');
  const [isReverting, setIsReverting] = useState(false);

  const handleApprove = () => {
    if (!approvalRemarks.trim()) {
      toast.error('Please enter approval remarks');
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Application approved successfully!');
      
      // Update application status and mark as processed
      const updatedApplication = {
        ...application,
        status: 'Approved',
        approved: true, // Add flag to hide Approve button
        approvalRemarks: approvalRemarks,
        approvalDate: new Date().toISOString(),
      };
      
      if (onApprove) {
        onApprove(updatedApplication, approvalRemarks);
      }
      
      handleClose();
    }, 1000);
  };

  const handleReject = () => {
    if (!approvalRemarks.trim()) {
      toast.error('Please enter rejection reason');
      return;
    }

    if (confirm('Are you sure you want to reject this application?')) {
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        toast.error('Application rejected');
        
        // Update application status and mark as processed
        const updatedApplication = {
          ...application,
          status: 'Rejected',
          approved: true, // Add flag to hide Approve button (processed either way)
          rejectionRemarks: approvalRemarks,
          rejectionDate: new Date().toISOString(),
        };
        
        if (onReject) {
          onReject(updatedApplication, approvalRemarks);
        }
        
        handleClose();
      }, 1000);
    }
  };

  const handleRevert = () => {
    if (confirm('Are you sure you want to revert this application?')) {
      setIsReverting(true);
      
      setTimeout(() => {
        setIsReverting(false);
        toast.info('Application reverted');
        
        // Update application status and mark as processed
        const updatedApplication = {
          ...application,
          status: 'Pending',
          approved: false, // Add flag to hide Approve button (processed either way)
          revertReason: 'Reverted by admin',
          revertDate: new Date().toISOString(),
        };
        
        if (onRevert) {
          onRevert(updatedApplication, 'Reverted by admin');
        }
        
        handleClose();
      }, 1000);
    }
  };

  const handleClose = () => {
    setApprovalRemarks('');
    setIsProcessing(false);
    onClose();
  };

  // Get application type specific details
  const getApplicationTypeDetails = () => {
    const type = application?.details?.toLowerCase() || 'alteration';
    
    switch(type) {
      case 'mutation':
        return {
          title: 'Mutation Details',
          color: 'purple',
          fields: [
            { label: 'Previous Owner', value: 'Rajesh Kumar', icon: User },
            { label: 'New Owner', value: 'Amit Sharma', icon: User },
            { label: 'Transfer Reason', value: 'Sale of Property', icon: FileText },
            { label: 'Property Document', value: 'DOC-2024-1234', icon: FileText },
          ]
        };
      case 'disconnection':
        return {
          title: 'Disconnection Details',
          color: 'red',
          fields: [
            { label: 'Disconnection Reason', value: 'Permanent Closure', icon: AlertCircle },
            { label: 'Final Reading', value: '1523 units', icon: Hash },
            { label: 'Pending Dues', value: '₹0', icon: FileText },
            { label: 'Request Date', value: new Date().toLocaleDateString(), icon: Calendar },
          ]
        };
      case 'new connection':
      case 'newconnection':
        return {
          title: 'New Connection Details',
          color: 'blue',
          fields: [
            { label: 'Applicant Type', value: 'Residential', icon: User },
            { label: 'Required Load', value: '5 KW', icon: Building2 },
            { label: 'Purpose', value: 'Domestic Use', icon: FileText },
            { label: 'Plot Area', value: '1200 sq. ft.', icon: Building2 },
          ]
        };
      case 'alteration':
      default:
        return {
          title: 'Alteration Details',
          color: 'purple',
          fields: [
            { label: 'Tap Size', value: '15mm', icon: Building2 },
            { label: 'Connection Load', value: '5 KW', icon: FileText },
            { label: 'Meter Number', value: 'MTR2024567890', icon: Hash },
            { label: 'Sanctioned Load', value: '10 KW', icon: Building2 },
          ]
        };
    }
  };

  const typeDetails = getApplicationTypeDetails();

  return (
    <>
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[85vw] w-[85vw] sm:max-w-[85vw] md:max-w-[85vw] lg:max-w-[85vw] xl:max-w-[85vw] max-h-[90vh] overflow-hidden bg-white">
        <DialogHeader className="border-b pb-4 bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl text-white">
                  Application Details
                </DialogTitle>
                <DialogDescription className="text-white/90">
                  Complete information for application <span className="text-white" style={{ fontWeight: 700 }}>{application?.applicationNo}</span>
                </DialogDescription>
              </div>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-white/20 to-white/30 rounded-lg shadow-md">
              <div className="text-xs text-white" style={{ fontWeight: 600 }}>Days Pending</div>
              <div className="text-xl text-white text-center" style={{ fontWeight: 800 }}>{application?.days || 0}</div>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)] pr-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-4"
          >
            {/* Column 1: Application Details */}
            <div className="bg-white rounded-lg border-2 border-blue-200 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-400/80 via-blue-400/70 to-blue-500/80 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Application Details</h3>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Hash className="w-4 h-4 text-blue-600" />
                    <div className="text-xs text-gray-600" style={{ fontWeight: 600 }}>Application No</div>
                  </div>
                  <div className="text-blue-700 text-sm" style={{ fontWeight: 700 }}>{application?.applicationNo || 'N/A'}</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-gradient-to-r from-sky-50 to-sky-100 p-3 rounded-lg border border-sky-200"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <User className="w-4 h-4 text-sky-600" />
                    <div className="text-xs text-gray-900" style={{ fontWeight: 600 }}>Consumer No</div>
                  </div>
                  <div className="text-sky-700 text-sm" style={{ fontWeight: 700 }}>{application?.consumerNo || 'N/A'}</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-3 rounded-lg border border-cyan-200"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Calendar className="w-4 h-4 text-cyan-600" />
                    <div className="text-xs text-gray-900" style={{ fontWeight: 600 }}>Date</div>
                  </div>
                  <div className="text-cyan-700 text-sm" style={{ fontWeight: 700 }}>{application?.dateTime || 'N/A'}</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-gradient-to-r from-blue-50 to-sky-100 p-3 rounded-lg border border-blue-200"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <div className="text-xs text-gray-900" style={{ fontWeight: 600 }}>Application Type</div>
                  </div>
                  <div className="text-blue-700 text-sm" style={{ fontWeight: 700 }}>{application?.details || 'N/A'}</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-cyan-50 to-sky-100 p-3 rounded-lg border border-cyan-200"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <AlertCircle className="w-4 h-4 text-cyan-600" />
                    <div className="text-xs text-gray-600" style={{ fontWeight: 600 }}>Risk Level</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      application?.risk === 'High' ? 'bg-red-500' : 
                      application?.risk === 'Medium' ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`}></div>
                    <div className="text-cyan-700 text-sm" style={{ fontWeight: 700 }}>{application?.risk || 'Low'}</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Column 2: Consumer Details */}
            <div className="bg-white rounded-lg border-2 border-sky-200 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-sky-400/80 via-cyan-400/70 to-blue-500/80 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Consumer Details</h3>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-1.5"
                >
                  <Label className="text-xs flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                    <User className="w-3.5 h-3.5 text-teal-600" />
                    Consumer Name
                  </Label>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2.5 text-sm text-gray-700" style={{ fontWeight: 600 }}>
                    {application?.applicantName || 'N/A'}
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="space-y-1.5"
                >
                  <Label className="text-xs flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                    <Phone className="w-3.5 h-3.5 text-green-600" />
                    Mobile Number
                  </Label>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2.5 text-sm text-gray-700" style={{ fontWeight: 600 }}>
                    9876543210
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-1.5"
                >
                  <Label className="text-xs flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    Address
                  </Label>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2.5 text-sm text-gray-700" style={{ fontWeight: 600 }}>
                    Plot No. 123, Ward 5, Akola, Maharashtra - 444001
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-1.5"
                >
                  <Label htmlFor="approvalRemarks" className="text-xs flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                    <FileText className="w-3.5 h-3.5 text-orange-600" />
                    Approval/Rejection Remarks <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="approvalRemarks"
                    value={approvalRemarks}
                    onChange={(e) => setApprovalRemarks(e.target.value)}
                    placeholder="Enter remarks for approval or rejection..."
                    className="border-2 border-sky-200 focus:border-sky-500 rounded-lg min-h-[120px] text-sm resize-none"
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-amber-50 to-amber-100 p-3 rounded-lg border border-amber-200"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <div className="text-xs text-amber-800" style={{ fontWeight: 700 }}>Important Note</div>
                  </div>
                  <div className="text-xs text-amber-700" style={{ fontWeight: 500 }}>
                    Please verify all details before approving. Once approved, the decision cannot be undone.
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Column 3: Type-Specific Details */}
            <div className="bg-white rounded-lg border-2 border-green-200 shadow-md overflow-hidden">
              <div className={`bg-gradient-to-r from-${typeDetails.color}-400/80 via-${typeDetails.color}-400/70 to-${typeDetails.color}-500/80 px-4 py-3`}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>{typeDetails.title}</h3>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {typeDetails.fields.map((field, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="space-y-1.5"
                  >
                    <Label className="text-xs flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                      <field.icon className="w-3.5 h-3.5 text-blue-600" />
                      {field.label}
                    </Label>
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2.5 text-sm text-gray-700" style={{ fontWeight: 600 }}>
                      {field.value}
                    </div>
                  </motion.div>
                ))}

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="pt-3 border-t border-gray-200"
                >
                  <Label className="text-xs flex items-center gap-1.5 mb-2" style={{ fontWeight: 600 }}>
                    <FileText className="w-3.5 h-3.5 text-green-600" />
                    Documents Uploaded
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-green-50 p-2.5 rounded-lg border border-green-200">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <div className="flex-1">
                        <div className="text-xs text-gray-700" style={{ fontWeight: 600 }}>Aadhar Card.pdf</div>
                        <div className="text-xs text-gray-500">256 KB</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 p-2.5 rounded-lg border border-green-200">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <div className="flex-1">
                        <div className="text-xs text-gray-700" style={{ fontWeight: 600 }}>Property Document.pdf</div>
                        <div className="text-xs text-gray-500">512 KB</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <DialogFooter className="border-t pt-4 mt-4 flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleClose} 
            disabled={isProcessing} 
            className="border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg flex-1 h-11 cursor-pointer"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleReject}
            disabled={isProcessing || !approvalRemarks.trim()}
            className="bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-md hover:shadow-lg transition-all rounded-lg flex-1 h-11 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <X className="w-4 h-4 mr-2" />
                Reject
              </>
            )}
          </Button>
          <Button
            onClick={handleApprove}
            disabled={isProcessing || !approvalRemarks.trim()}
            className="bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-md hover:shadow-lg transition-all rounded-lg flex-1 h-11 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Application
              </>
            )}
          </Button>
          <Button
            onClick={() => setShowRevertDialog(true)}
            disabled={isReverting}
            className="bg-[#F97316] hover:bg-[#EA580C] text-white shadow-md hover:shadow-lg transition-all rounded-lg flex-1 h-11 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isReverting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Reverting...
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4 mr-2" />
                Revert
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Revert Dialog */}
    <AlertDialog open={showRevertDialog} onOpenChange={setShowRevertDialog}>
      <AlertDialogContent className="max-w-lg bg-white border-2 border-orange-300">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <RotateCcw className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <AlertDialogTitle className="text-xl text-orange-900">
                Revert Application to User
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 text-sm">
                Application: {application?.applicationNo}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="revertReason" className="text-sm" style={{ fontWeight: 600 }}>
              Reason for Reverting <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="revertReason"
              value={revertReason}
              onChange={(e) => setRevertReason(e.target.value)}
              placeholder="Please enter the reason for reverting this application (e.g., Wrong documents attached, information needs correction)"
              className="border-2 border-orange-200 focus:border-orange-500 rounded-lg min-h-[120px] text-sm resize-none"
            />
          </div>

          <div className="bg-white/60 border border-orange-200 rounded-lg p-3 space-y-1 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
              User will be notified with your reason
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
              Application status will change to "Reverted to User"
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
              User can make corrections and resubmit
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-2 border-gray-300">
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={() => {
              if (!revertReason.trim()) {
                toast.error('Please enter a reason for reverting');
                return;
              }
              
              if (onRevert) {
                setIsReverting(true);
                setShowRevertDialog(false);
                
                setTimeout(() => {
                  setIsReverting(false);
                  toast.success('Application successfully reverted to user!', {
                    description: `Reason: ${revertReason}`,
                    duration: 5000,
                  });
                  
                  onRevert(application, revertReason);
                  setRevertReason('');
                  handleClose();
                }, 1000);
              }
            }}
            disabled={isReverting || !revertReason.trim()}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg"
          >
            {isReverting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Reverting...
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4 mr-2" />
                Confirm Revert
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}