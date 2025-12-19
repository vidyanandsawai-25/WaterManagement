import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { 
  X, CheckCircle, Clock, UserCheck, Shield, FileText, Download, 
  AlertCircle, ArrowRight, Check, XCircle, MessageSquare, User 
} from 'lucide-react';
import { WaterRipple } from './WaterRipple';
import { toast } from 'sonner@2.0.3';
import { motion, AnimatePresence } from 'motion/react';
import { VisuallyHidden } from './ui/visually-hidden';
import { OfficerApprovalModal } from './OfficerApprovalModal';

interface ApprovalLevel {
  id: string;
  officerName: string;
  officerRole: string;
  order: number;
  status: 'pending' | 'approved' | 'rejected' | 'in-progress';
  approvedByName?: string;
  remarks?: string;
  actionDate?: string;
}

interface NotesheetApprovalFlowProps {
  application: any;
  isOpen: boolean;
  onClose: () => void;
  onApprovalComplete: (app: any, approvalData: ApprovalLevel[]) => void;
  currentUserRole: string;
}

export function NotesheetApprovalFlow({
  application,
  isOpen,
  onClose,
  onApprovalComplete,
  currentUserRole
}: NotesheetApprovalFlowProps) {
  const [approvalLevels, setApprovalLevels] = useState<ApprovalLevel[]>([
    {
      id: 'level-1',
      officerName: 'Rajesh Kumar',
      officerRole: 'Junior Engineer',
      order: 1,
      status: 'approved',
      approvedByName: 'Rajesh Kumar',
      remarks: 'Site inspection completed. All documents verified.',
      actionDate: new Date().toISOString()
    },
    {
      id: 'level-2',
      officerName: 'Priya Sharma',
      officerRole: 'Assistant Engineer',
      order: 2,
      status: currentUserRole === 'Assistant Engineer' ? 'in-progress' : 'pending'
    },
    {
      id: 'level-3',
      officerName: 'Amit Patel',
      officerRole: 'Executive Engineer',
      order: 3,
      status: 'pending'
    }
  ]);

  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<ApprovalLevel | null>(null);

  if (!application) return null;

  const canLevelTakeAction = (level: ApprovalLevel) => {
    // Can only act if status is in-progress or pending
    if (level.status === 'approved' || level.status === 'rejected') {
      return false;
    }

    // Check if previous levels are approved
    const previousLevels = approvalLevels.filter(l => l.order < level.order);
    return previousLevels.every(l => l.status === 'approved');
  };

  const handleLevelClick = (level: ApprovalLevel) => {
    // Check if this level can take action
    if (!canLevelTakeAction(level)) {
      if (level.status === 'approved') {
        toast.info('This level has already been approved');
      } else if (level.status === 'rejected') {
        toast.info('This level has already been rejected');
      } else {
        toast.error('Waiting for previous level approvals');
      }
      return;
    }

    // Open approval modal for this level
    setSelectedLevel(level);
    setShowApprovalModal(true);
  };

  const handleApprove = (officerName: string, remarks: string) => {
    if (!selectedLevel) return;

    // Update the current level with approval
    const updatedLevels = approvalLevels.map(level => {
      if (level.id === selectedLevel.id) {
        return {
          ...level,
          status: 'approved' as const,
          approvedByName: officerName,
          remarks: remarks || 'Approved',
          actionDate: new Date().toISOString()
        };
      }
      // Move next level to in-progress if current is approved
      if (level.order === selectedLevel.order + 1) {
        return {
          ...level,
          status: 'in-progress' as const
        };
      }
      return level;
    });

    setApprovalLevels(updatedLevels);

    // Check if this is the final approval
    const isFinalApproval = selectedLevel.order === Math.max(...approvalLevels.map(l => l.order));

    if (isFinalApproval) {
      toast.success('✅ Notesheet fully approved!', {
        description: 'All approvals completed. Application is now approved.'
      });
      
      setTimeout(() => {
        onApprovalComplete(application, updatedLevels);
        onClose();
      }, 2000);
    } else {
      toast.success(`✅ Approved by ${selectedLevel.officerRole}!`, {
        description: 'Notesheet sent to next approval level.'
      });
    }

    setSelectedLevel(null);
  };

  const handleReject = (officerName: string, remarks: string) => {
    if (!selectedLevel) return;

    // Update the level status
    const updatedLevels = approvalLevels.map(level => {
      if (level.id === selectedLevel.id) {
        return {
          ...level,
          status: 'rejected' as const,
          approvedByName: officerName,
          remarks,
          actionDate: new Date().toISOString()
        };
      }
      return level;
    });

    setApprovalLevels(updatedLevels);
    
    toast.error(`❌ Rejected by ${selectedLevel.officerRole}`, {
      description: 'The application has been sent back.'
    });

    setTimeout(() => {
      onApprovalComplete(application, updatedLevels);
      onClose();
    }, 2000);

    setSelectedLevel(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'from-green-500 to-emerald-600';
      case 'rejected':
        return 'from-red-500 to-rose-600';
      case 'in-progress':
        return 'from-blue-500 to-indigo-600';
      case 'pending':
        return 'from-slate-400 to-slate-500';
      default:
        return 'from-slate-400 to-slate-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="w-5 h-5 text-white" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-white" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-white animate-pulse" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-white" />;
      default:
        return <Clock className="w-5 h-5 text-white" />;
    }
  };

  const getBorderColor = (level: ApprovalLevel) => {
    if (level.status === 'in-progress') return 'border-blue-400 shadow-lg shadow-blue-200';
    if (level.status === 'approved') return 'border-green-300';
    if (level.status === 'rejected') return 'border-red-300';
    return 'border-slate-300';
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[90vw] sm:w-[95vw] !max-w-[1000px] h-auto max-h-[95vh] p-0 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-3 border-blue-400 shadow-2xl">
          <VisuallyHidden>
            <DialogTitle>Notesheet Multi-Level Approval System</DialogTitle>
            <DialogDescription>
              Click on your approval level to approve or reject - Application No: {application.applicationNo}
            </DialogDescription>
          </VisuallyHidden>

          <div className="p-6 max-h-[95vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-xl p-6 mb-6 shadow-xl">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white text-2xl mb-1" style={{ fontWeight: 900 }}>
                      Notesheet Approval Workflow
                    </h2>
                    <p className="text-blue-100 text-sm">
                      Application No: <span style={{ fontWeight: 700 }}>{application.applicationNo}</span> • 
                      Consumer: <span style={{ fontWeight: 700 }}>{application.consumerNo}</span>
                    </p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                  <div className="text-blue-100 text-xs">Current User</div>
                  <div className="text-white" style={{ fontWeight: 800 }}>{currentUserRole}</div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-300 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-cyan-900 mb-1" style={{ fontWeight: 800 }}>How to Approve</h3>
                  <p className="text-cyan-800 text-sm">
                    Click on your approval level card below to open the approval form. 
                    Enter your full name and remarks, then click Approve or Reject.
                  </p>
                </div>
              </div>
            </div>

            {/* Approval Levels - Clickable */}
            <div className="space-y-4">
              {approvalLevels.map((level, index) => {
                const canClick = canLevelTakeAction(level);
                
                return (
                  <div key={level.id}>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleLevelClick(level)}
                      disabled={!canClick && level.status !== 'approved' && level.status !== 'rejected'}
                      className={`w-full text-left bg-white rounded-xl border-3 ${getBorderColor(level)} p-5 transition-all ${
                        canClick 
                          ? 'cursor-pointer hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]' 
                          : level.status === 'approved' || level.status === 'rejected'
                          ? 'cursor-default'
                          : 'cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Level Number & Status Icon */}
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getStatusColor(level.status)} flex items-center justify-center shadow-lg flex-shrink-0`}>
                          {getStatusIcon(level.status)}
                        </div>

                        {/* Officer Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                            <div>
                              <h4 className="text-slate-900 mb-1 flex items-center gap-2" style={{ fontWeight: 800 }}>
                                Level {level.order}: {level.officerRole}
                                {canClick && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full" style={{ fontWeight: 600 }}>
                                    Click to Approve
                                  </span>
                                )}
                              </h4>
                              <p className="text-slate-600 text-sm flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Expected: {level.officerName}
                              </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs ${
                              level.status === 'approved' ? 'bg-green-100 text-green-700' :
                              level.status === 'rejected' ? 'bg-red-100 text-red-700' :
                              level.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                              'bg-slate-100 text-slate-600'
                            }`} style={{ fontWeight: 700 }}>
                              {level.status === 'in-progress' ? 'In Progress' : level.status.charAt(0).toUpperCase() + level.status.slice(1)}
                            </div>
                          </div>

                          {/* Approval Details */}
                          {level.approvedByName && (
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-200 mt-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                <div>
                                  <div className="flex items-center gap-2 text-green-700 mb-1">
                                    <Shield className="w-4 h-4" />
                                    <span style={{ fontWeight: 700 }}>
                                      {level.status === 'approved' ? 'Approved By' : 'Rejected By'}
                                    </span>
                                  </div>
                                  <p className="text-slate-900" style={{ fontWeight: 700 }}>{level.approvedByName}</p>
                                </div>
                                <div>
                                  <span className="text-slate-600" style={{ fontWeight: 600 }}>Date & Time:</span>
                                  <p className="text-slate-900 text-xs" style={{ fontWeight: 600 }}>
                                    {level.actionDate && new Date(level.actionDate).toLocaleString('en-IN')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Remarks */}
                          {level.remarks && (
                            <div className={`${
                              level.status === 'rejected' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                            } border rounded-lg p-3 mt-2`}>
                              <div className="flex items-start gap-2 text-xs">
                                <MessageSquare className={`w-4 h-4 ${
                                  level.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                                } mt-0.5 flex-shrink-0`} />
                                <div>
                                  <span className={`${
                                    level.status === 'rejected' ? 'text-red-900' : 'text-yellow-900'
                                  }`} style={{ fontWeight: 700 }}>Remarks: </span>
                                  <span className={`${
                                    level.status === 'rejected' ? 'text-red-800' : 'text-yellow-800'
                                  }`}>{level.remarks}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.button>

                    {/* Arrow Connector */}
                    {index < approvalLevels.length - 1 && (
                      <div className="flex justify-center my-3">
                        <ArrowRight className="w-6 h-6 text-blue-400 rotate-90" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-4 mt-6 pt-6 border-t-2 border-blue-200">
              <WaterRipple color="rgba(59, 130, 246, 0.2)">
                <Button
                  onClick={() => toast.success('📥 Notesheet downloaded')}
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-700 hover:bg-blue-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Notesheet
                </Button>
              </WaterRipple>

              <WaterRipple color="rgba(100, 116, 139, 0.2)">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="border-2 border-slate-400 text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-4 h-4 mr-2" />
                  Close
                </Button>
              </WaterRipple>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p style={{ fontWeight: 700 }}>Digital Approval System</p>
                  <p className="text-xs mt-1">
                    All approvals are recorded with officer name, timestamp, and remarks. 
                    This creates a complete audit trail for the application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Officer Approval Modal */}
      {showApprovalModal && selectedLevel && (
        <OfficerApprovalModal
          isOpen={showApprovalModal}
          onClose={() => {
            setShowApprovalModal(false);
            setSelectedLevel(null);
          }}
          onApprove={handleApprove}
          onReject={handleReject}
          officerRole={selectedLevel.officerRole}
          expectedOfficerName={selectedLevel.officerName}
        />
      )}
    </>
  );
}
