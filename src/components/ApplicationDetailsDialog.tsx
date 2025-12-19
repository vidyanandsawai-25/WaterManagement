import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Calendar, User, FileText, MapPin, Clock, CheckCircle, Building2, Hash, IdCard, RefreshCw, X, Sparkles, Phone, Zap } from 'lucide-react';
import { Label } from './ui/label';
import { motion } from 'motion/react';

interface ApplicationDetailsDialogProps {
  application: any;
  onClose: () => void;
  onApprove?: (app: any) => void;
  onReject?: (app: any) => void;
  onRequestInfo?: (app: any) => void;
}

export function ApplicationDetailsDialog({
  application,
  onClose,
  onApprove,
  onReject,
  onRequestInfo,
}: ApplicationDetailsDialogProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-700';
      case 'pending verified':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-yellow-700';
      case 'rejected':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-700';
      case 'under review':
        return 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white border-cyan-700';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-700';
    }
  };

  const getDaysColor = (days: number) => {
    if (days <= 2) return 'from-green-500 to-green-600';
    if (days <= 4) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[85vw] w-[85vw] sm:max-w-[85vw] md:max-w-[85vw] lg:max-w-[85vw] xl:max-w-[85vw] max-h-[90vh] overflow-hidden bg-gradient-to-br from-white to-blue-50">
        {/* Header Section */}
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  Application Details
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Complete information for application <span className="text-blue-600" style={{ fontWeight: 700 }}>{application?.applicationNo}</span>
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${getStatusColor(application.status)} text-sm px-4 py-2 shadow-md border-2`} style={{ fontWeight: 700 }}>
                {application.status}
              </Badge>
              <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-md">
                <div className="text-xs text-yellow-900" style={{ fontWeight: 600 }}>Days Pending</div>
                <div className="text-xl text-yellow-900 text-center" style={{ fontWeight: 800 }}>{application?.days || 0}</div>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Main Content - 3 Columns Horizontal */}
        <div className="overflow-y-auto max-h-[calc(90vh-150px)] pr-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-4"
          >
            {/* Column 1: Application Details */}
            <div className="bg-white rounded-lg border-2 border-blue-200 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3">
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
                  className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <User className="w-4 h-4 text-purple-600" />
                    <div className="text-xs text-gray-600" style={{ fontWeight: 600 }}>Consumer No</div>
                  </div>
                  <div className="text-purple-700 text-sm" style={{ fontWeight: 700 }}>{application?.consumerNo || 'N/A'}</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-orange-50 to-orange-100 p-3 rounded-lg border border-orange-200"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <div className="text-xs text-gray-600" style={{ fontWeight: 600 }}>Date</div>
                  </div>
                  <div className="text-orange-700 text-sm" style={{ fontWeight: 700 }}>{application?.dateTime || 'N/A'}</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-gradient-to-r from-teal-50 to-teal-100 p-3 rounded-lg border border-teal-200"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <FileText className="w-4 h-4 text-teal-600" />
                    <div className="text-xs text-gray-600" style={{ fontWeight: 600 }}>Application Type</div>
                  </div>
                  <div className="text-teal-700 text-sm" style={{ fontWeight: 700 }}>{application?.details || 'N/A'}</div>
                </motion.div>

                {/* Show Disconnection Reason if available */}
                {application?.disconnectionReason && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.28 }}
                    className="bg-gradient-to-r from-red-50 to-red-100 p-3 rounded-lg border border-red-200"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Zap className="w-4 h-4 text-red-600" />
                      <div className="text-xs text-gray-600" style={{ fontWeight: 600 }}>Disconnection Reason</div>
                    </div>
                    <div className="text-red-700 text-sm" style={{ fontWeight: 700 }}>{application.disconnectionReason}</div>
                  </motion.div>
                )}

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg border border-green-200"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <div className="text-xs text-gray-600" style={{ fontWeight: 600 }}>Risk Level</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      application?.risk === 'High' ? 'bg-red-500' : 
                      application?.risk === 'Medium' ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`}></div>
                    <div className="text-green-700 text-sm" style={{ fontWeight: 700 }}>{application?.risk || 'Low'}</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Column 2: Consumer Details */}
            <div className="bg-white rounded-lg border-2 border-purple-200 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-3">
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
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2.5 text-sm text-gray-700 min-h-[60px]" style={{ fontWeight: 500 }}>
                    Plot No. 123, Ward 5, Akola, Maharashtra - 444001
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-1.5"
                >
                  <Label className="text-xs flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                    <FileText className="w-3.5 h-3.5 text-orange-600" />
                    Remarks
                  </Label>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2.5 text-sm text-gray-500 min-h-[60px]">
                    Enter any remarks or notes
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-1.5"
                >
                  <Label className="text-xs flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                    <FileText className="w-3.5 h-3.5 text-green-600" />
                    Upload Document
                  </Label>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2.5 text-sm text-gray-500">
                    No file chosen
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Column 3: Service Type & Details */}
            <div className="bg-white rounded-lg border-2 border-green-200 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Service Details</h3>
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
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    Application Type
                  </Label>
                  <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-lg p-2.5 text-sm text-indigo-700" style={{ fontWeight: 700 }}>
                    {application?.details || 'N/A'}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="space-y-1.5"
                >
                  <Label className="text-xs flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                    <RefreshCw className="w-3.5 h-3.5 text-cyan-600" />
                    Current Stage
                  </Label>
                  <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-lg p-2.5 text-sm text-cyan-700" style={{ fontWeight: 700 }}>
                    {application?.stage || 'N/A'}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-1.5"
                >
                  <Label className="text-xs flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                    <Building2 className="w-3.5 h-3.5 text-pink-600" />
                    Office
                  </Label>
                  <div className="bg-gradient-to-r from-pink-50 to-pink-100 border-2 border-pink-200 rounded-lg p-2.5 text-sm text-pink-700" style={{ fontWeight: 700 }}>
                    {application?.office || 'N/A'}
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
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
      </DialogContent>
    </Dialog>
  );
}
