import { useEffect, useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Clock, Cpu, Zap, Bell, TrendingUp } from 'lucide-react';

interface Application {
  id: number;
  applicationNo: string;
  applicantName: string;
  stage: string;
  status: string;
  days: number;
  details: string;
}

interface AIApprovalMonitorProps {
  applications: Application[];
}

export function AIApprovalMonitor({ applications }: AIApprovalMonitorProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [overdueCount, setOverdueCount] = useState(0);

  // AI Detection thresholds
  const CRITICAL_DAYS = 7; // Critical: Over 7 days
  const WARNING_DAYS = 5;  // Warning: Over 5 days
  const ATTENTION_DAYS = 3; // Attention: Over 3 days

  const checkForgottenApprovals = () => {
    setIsScanning(true);

    // Filter applications that are pending approval
    const pendingApprovals = applications.filter(
      app => 
        (app.status === 'Pending Verified' || app.status === 'Under Review') &&
        app.days >= ATTENTION_DAYS
    );

    const criticalApprovals = pendingApprovals.filter(app => app.days >= CRITICAL_DAYS);
    const warningApprovals = pendingApprovals.filter(app => app.days >= WARNING_DAYS && app.days < CRITICAL_DAYS);
    const attentionApprovals = pendingApprovals.filter(app => app.days >= ATTENTION_DAYS && app.days < WARNING_DAYS);

    setOverdueCount(pendingApprovals.length);

    setTimeout(() => {
      setIsScanning(false);

      // Critical alerts (over 7 days)
      if (criticalApprovals.length > 0) {
        criticalApprovals.forEach((app, index) => {
          setTimeout(() => {
            toast.error(
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="font-semibold">🚨 CRITICAL: Approval Overdue!</span>
                </div>
                <div className="text-sm space-y-1">
                  <p className="font-medium">{app.applicantName}</p>
                  <p className="text-gray-600">Application: {app.applicationNo}</p>
                  <p className="text-gray-600">Type: {app.details}</p>
                  <p className="text-red-600 font-semibold">⏰ Pending for {app.days} days</p>
                  <p className="text-xs text-gray-500 mt-1">AI detected this application requires immediate attention!</p>
                </div>
              </div>,
              {
                duration: 10000,
                position: 'top-right',
                className: 'border-2 border-red-500',
              }
            );
          }, index * 800);
        });
      }

      // Warning alerts (5-7 days)
      if (warningApprovals.length > 0) {
        setTimeout(() => {
          toast.warning(
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="font-semibold">⚠️ WARNING: Approval Delayed!</span>
              </div>
              <div className="text-sm">
                <p className="font-medium">{warningApprovals.length} application(s) pending 5+ days</p>
                <div className="mt-2 space-y-1">
                  {warningApprovals.slice(0, 3).map(app => (
                    <div key={app.id} className="text-xs text-gray-600 border-l-2 border-orange-400 pl-2">
                      • {app.applicantName} - {app.days} days ({app.applicationNo})
                    </div>
                  ))}
                  {warningApprovals.length > 3 && (
                    <p className="text-xs text-gray-500 italic">+ {warningApprovals.length - 3} more...</p>
                  )}
                </div>
              </div>
            </div>,
            {
              duration: 8000,
              position: 'top-right',
            }
          );
        }, criticalApprovals.length * 800 + 500);
      }

      // Attention alerts (3-5 days)
      if (attentionApprovals.length > 0 && criticalApprovals.length === 0 && warningApprovals.length === 0) {
        setTimeout(() => {
          toast.info(
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">📋 Attention: Pending Approvals</span>
              </div>
              <div className="text-sm">
                <p className="font-medium">{attentionApprovals.length} application(s) awaiting approval</p>
                <p className="text-xs text-gray-500 mt-1">AI recommends reviewing these applications soon.</p>
              </div>
            </div>,
            {
              duration: 5000,
              position: 'top-right',
            }
          );
        }, 500);
      }

      // Summary notification
      if (pendingApprovals.length > 0) {
        setTimeout(() => {
          toast(
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">AI Monitoring System</p>
                <p className="text-sm text-gray-600">
                  Found {pendingApprovals.length} application(s) requiring attention
                </p>
              </div>
            </div>,
            {
              duration: 6000,
              position: 'bottom-right',
            }
          );
        }, (criticalApprovals.length + warningApprovals.length) * 800 + 1000);
      } else {
        toast.success(
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-semibold">✅ All Clear!</p>
              <p className="text-sm text-gray-600">No forgotten approvals detected</p>
            </div>
          </div>,
          {
            duration: 4000,
            position: 'bottom-right',
          }
        );
      }
    }, 2000); // Simulate AI processing time
  };

  useEffect(() => {
    // Initial scan after 3 seconds
    const initialScan = setTimeout(() => {
      checkForgottenApprovals();
    }, 3000);

    // Periodic scan every 5 minutes
    const periodicScan = setInterval(() => {
      checkForgottenApprovals();
    }, 5 * 60 * 1000);

    return () => {
      clearTimeout(initialScan);
      clearInterval(periodicScan);
    };
  }, [applications]);

  return (
    <AnimatePresence>
      {isScanning && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20"
              >
                <Cpu className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <p className="font-semibold flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  AI Scanning Applications...
                </p>
                <p className="text-xs text-blue-100">Detecting forgotten approvals</p>
              </div>
            </div>
            
            {/* Scanning progress bar */}
            <motion.div
              className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-white/40 to-white rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
