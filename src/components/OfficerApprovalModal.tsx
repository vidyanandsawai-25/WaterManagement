import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { X, CheckCircle, UserCheck, XCircle } from 'lucide-react';
import { WaterRipple } from './WaterRipple';
import { toast } from 'sonner@2.0.3';
import { VisuallyHidden } from './ui/visually-hidden';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface OfficerApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (officerName: string, remarks: string) => void;
  onReject: (officerName: string, remarks: string) => void;
  officerRole: string;
  expectedOfficerName: string;
}

export function OfficerApprovalModal({
  isOpen,
  onClose,
  onApprove,
  onReject,
  officerRole,
  expectedOfficerName
}: OfficerApprovalModalProps) {
  const [officerName, setOfficerName] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleApprove = () => {
    if (!officerName.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    onApprove(officerName, remarks);
    handleClose();
  };

  const handleReject = () => {
    if (!officerName.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    if (!remarks.trim()) {
      toast.error('Please provide remarks for rejection');
      return;
    }

    onReject(officerName, remarks);
    handleClose();
  };

  const handleClose = () => {
    setOfficerName('');
    setRemarks('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[90vw] sm:w-[500px] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-3 border-blue-400 shadow-2xl">
        <DialogHeader className="border-b-2 border-blue-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl text-slate-900" style={{ fontWeight: 800 }}>
                Approve Application
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-600">
                Role: {officerRole}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Officer Name Input */}
          <div className="space-y-2">
            <Label htmlFor="officer-name" className="text-slate-900" style={{ fontWeight: 700 }}>
              Enter Your Full Name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="officer-name"
              type="text"
              value={officerName}
              onChange={(e) => setOfficerName(e.target.value)}
              placeholder={`e.g., ${expectedOfficerName}`}
              className="border-2 border-slate-300 focus:border-blue-500"
            />
            <p className="text-xs text-slate-500">
              Please enter your full name to confirm this action
            </p>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label htmlFor="remarks" className="text-slate-900" style={{ fontWeight: 700 }}>
              Remarks <span className="text-slate-500 text-xs">(Optional for approval, Required for rejection)</span>
            </Label>
            <Textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add your comments or remarks..."
              className="min-h-[100px] border-2 border-slate-300 focus:border-blue-500"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              <span style={{ fontWeight: 700 }}>Note:</span> By entering your name and clicking approve/reject, 
              you are digitally confirming this action. This will be recorded with a timestamp.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-blue-200">
          <WaterRipple color="rgba(100, 116, 139, 0.3)">
            <Button
              onClick={handleClose}
              variant="outline"
              className="border-2 border-slate-400 text-slate-700 hover:bg-slate-100"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </WaterRipple>

          <WaterRipple color="rgba(239, 68, 68, 0.3)">
            <Button
              onClick={handleReject}
              variant="outline"
              className="border-2 border-red-500 text-red-600 hover:bg-red-50"
              disabled={!officerName.trim() || !remarks.trim()}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </WaterRipple>

          <WaterRipple color="rgba(34, 197, 94, 0.3)">
            <Button
              onClick={handleApprove}
              disabled={!officerName.trim()}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </WaterRipple>
        </div>
      </DialogContent>
    </Dialog>
  );
}
