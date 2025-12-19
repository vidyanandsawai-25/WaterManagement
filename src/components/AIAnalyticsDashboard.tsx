import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  DollarSign,
  FileEdit,
  RefreshCcw,
  Zap,
  BarChart3,
  PieChart,
  Activity,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  Brain,
  LineChart,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Application {
  id: number;
  applicationNo: string;
  applicantName: string;
  stage: string;
  status: string;
  days: number;
  details: string;
}

interface AIAnalyticsDashboardProps {
  open: boolean;
  onClose: () => void;
  applications: Application[];
}

interface AnalysisResult {
  category: string;
  totalApplications: number;
  avgDelay: number;
  criticalCount: number;
  warningCount: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  insights: string[];
  recommendations: string[];
}

export function AIAnalyticsDashboard({ open, onClose, applications }: AIAnalyticsDashboardProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [correctionAnalysis, setCorrectionAnalysis] = useState<AnalysisResult | null>(null);
  const [paymentAnalysis, setPaymentAnalysis] = useState<AnalysisResult | null>(null);
  const [recoveryAnalysis, setRecoveryAnalysis] = useState<AnalysisResult | null>(null);
  const [overallScore, setOverallScore] = useState(0);

  const analyzeApplications = () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);

    // Simulate AI processing
    setTimeout(() => {
      // Analyze Correction Delays
      const correctionApps = applications.filter(app => 
        app.details.toLowerCase().includes('correction')
      );
      const correctionDelays = correctionApps.map(app => app.days);
      const correctionAvg = correctionDelays.length > 0 
        ? correctionDelays.reduce((a, b) => a + b, 0) / correctionDelays.length 
        : 0;
      const correctionCritical = correctionApps.filter(app => app.days > 7).length;
      const correctionWarning = correctionApps.filter(app => app.days >= 5 && app.days <= 7).length;

      setCorrectionAnalysis({
        category: 'Correction Processing',
        totalApplications: correctionApps.length,
        avgDelay: Math.round(correctionAvg * 10) / 10,
        criticalCount: correctionCritical,
        warningCount: correctionWarning,
        trend: correctionAvg > 6 ? 'increasing' : correctionAvg < 4 ? 'decreasing' : 'stable',
        insights: [
          `${correctionApps.length} correction applications in system`,
          `Average processing time: ${Math.round(correctionAvg)} days`,
          correctionCritical > 0 
            ? `⚠️ ${correctionCritical} applications critically delayed (7+ days)`
            : '✅ No critical delays detected',
          `${correctionApps.filter(app => app.status === 'Approved').length} corrections completed`,
        ],
        recommendations: [
          correctionAvg > 5 ? '🔴 Urgent: Increase correction team capacity' : '🟢 Correction processing on track',
          correctionCritical > 2 ? '⚡ Prioritize oldest correction requests immediately' : '✓ Delay management acceptable',
          'Consider automated pre-validation for common correction types',
          'Implement escalation workflow for 5+ day pending corrections',
        ],
      });

      // Analyze Payment Delays
      const paymentApps = applications.filter(app => 
        app.stage.toLowerCase().includes('payment') || 
        app.details.toLowerCase().includes('payment')
      );
      const paymentDelays = paymentApps.map(app => app.days);
      const paymentAvg = paymentDelays.length > 0 
        ? paymentDelays.reduce((a, b) => a + b, 0) / paymentDelays.length 
        : 0;
      const paymentCritical = paymentApps.filter(app => app.days > 10).length;
      const paymentWarning = paymentApps.filter(app => app.days >= 7 && app.days <= 10).length;

      setPaymentAnalysis({
        category: 'Payment Processing',
        totalApplications: paymentApps.length,
        avgDelay: Math.round(paymentAvg * 10) / 10,
        criticalCount: paymentCritical,
        warningCount: paymentWarning,
        trend: paymentAvg > 8 ? 'increasing' : paymentAvg < 5 ? 'decreasing' : 'stable',
        insights: [
          `${paymentApps.length} payment-related applications tracked`,
          `Average payment processing: ${Math.round(paymentAvg)} days`,
          paymentCritical > 0 
            ? `🚨 ${paymentCritical} payments critically overdue (10+ days)`
            : '✅ All payments within acceptable timeframe',
          `Payment efficiency: ${paymentApps.filter(app => app.days < 5).length}/${paymentApps.length} processed quickly`,
        ],
        recommendations: [
          paymentAvg > 7 ? '🔴 Critical: Review payment gateway and approval process' : '🟢 Payment processing efficient',
          paymentCritical > 0 ? '⚠️ Send immediate payment reminders to pending consumers' : '✓ No critical payment delays',
          'Enable automated payment status notifications',
          'Consider implementing online payment tracking dashboard',
        ],
      });

      // Analyze Recovery/Disconnect Delays
      const recoveryApps = applications.filter(app => 
        app.details.toLowerCase().includes('disconnect') ||
        app.stage.toLowerCase().includes('recovery')
      );
      const recoveryDelays = recoveryApps.map(app => app.days);
      const recoveryAvg = recoveryDelays.length > 0 
        ? recoveryDelays.reduce((a, b) => a + b, 0) / recoveryDelays.length 
        : 0;
      const recoveryCritical = recoveryApps.filter(app => app.days > 8).length;
      const recoveryWarning = recoveryApps.filter(app => app.days >= 6 && app.days <= 8).length;

      setRecoveryAnalysis({
        category: 'Recovery & Disconnection',
        totalApplications: recoveryApps.length,
        avgDelay: Math.round(recoveryAvg * 10) / 10,
        criticalCount: recoveryCritical,
        warningCount: recoveryWarning,
        trend: recoveryAvg > 7 ? 'increasing' : recoveryAvg < 4 ? 'decreasing' : 'stable',
        insights: [
          `${recoveryApps.length} recovery/disconnect applications active`,
          `Average recovery time: ${Math.round(recoveryAvg)} days`,
          recoveryCritical > 0 
            ? `⚠️ ${recoveryCritical} recovery actions critically delayed`
            : '✅ Recovery operations on schedule',
          `Success rate: ${Math.round((recoveryApps.filter(app => app.status === 'Approved').length / recoveryApps.length) * 100)}%`,
        ],
        recommendations: [
          recoveryAvg > 6 ? '🔴 Urgent: Expedite disconnect/recovery workflow' : '🟢 Recovery timeline acceptable',
          recoveryCritical > 1 ? '⚡ Deploy field team for pending disconnections' : '✓ Field operations running smoothly',
          'Automate recovery notices and final warnings',
          'Implement GPS tracking for field recovery teams',
        ],
      });

      // Calculate Overall Performance Score
      const totalCritical = correctionCritical + paymentCritical + recoveryCritical;
      const avgAllDelays = (correctionAvg + paymentAvg + recoveryAvg) / 3;
      const score = Math.max(0, 100 - (totalCritical * 10) - (avgAllDelays * 2));
      setOverallScore(Math.round(score));

      setIsAnalyzing(false);
      setAnalysisComplete(true);

      // Show completion toast
      toast.success(
        <div className="flex items-center gap-3">
          <Brain className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-semibold">AI Analysis Complete!</p>
            <p className="text-sm text-gray-600">Generated comprehensive delay insights</p>
          </div>
        </div>,
        { duration: 3000 }
      );
    }, 3000);
  };

  useEffect(() => {
    if (open && !analysisComplete) {
      analyzeApplications();
    }
  }, [open]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Improvement';
    return 'Critical';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'increasing') return <TrendingUp className="w-4 h-4 text-red-600" />;
    if (trend === 'decreasing') return <TrendingDown className="w-4 h-4 text-green-600" />;
    return <Activity className="w-4 h-4 text-blue-600" />;
  };

  const AnalysisCard = ({ analysis, icon: Icon, color }: { analysis: AnalysisResult | null, icon: any, color: string }) => {
    if (!analysis) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br ${color} p-4 rounded-xl shadow-xl border border-white/20 backdrop-blur-sm`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{analysis.category}</h3>
              <p className="text-xs text-white/80">{analysis.totalApplications} Applications</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
            {getTrendIcon(analysis.trend)}
            <span className="text-xs text-white capitalize">{analysis.trend}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <p className="text-xs text-white/80">Avg Delay</p>
            <p className="font-bold text-white">{analysis.avgDelay}d</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <p className="text-xs text-white/80">Critical</p>
            <p className="font-bold text-white">{analysis.criticalCount}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <p className="text-xs text-white/80">Warning</p>
            <p className="font-bold text-white">{analysis.warningCount}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <h4 className="text-xs font-semibold text-white">AI Insights</h4>
            </div>
            <ul className="space-y-0.5">
              {analysis.insights.slice(0, 3).map((insight, index) => (
                <li key={index} className="text-xs text-white/90 break-words">• {insight}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <Target className="w-3.5 h-3.5 text-white" />
              <h4 className="text-xs font-semibold text-white">Recommendations</h4>
            </div>
            <ul className="space-y-0.5">
              {analysis.recommendations.slice(0, 2).map((rec, index) => (
                <li key={index} className="text-xs text-white/90 break-words">• {rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full lg:max-w-6xl max-h-[85vh] overflow-hidden flex flex-col p-0 bg-white border-2 border-purple-400">
        <DialogHeader className="px-6 pt-6 pb-4 border-b-2 border-purple-200 bg-gradient-to-r from-purple-400/80 via-purple-400/70 to-blue-500/80">
          <DialogTitle className="flex items-center gap-3 text-2xl text-white">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            AI Delay Analysis Dashboard
          </DialogTitle>
          <DialogDescription className="text-white/90">
            Advanced AI-powered analysis of correction, payment, and recovery delays
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-6 pb-6">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="p-6 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-full"
                  >
                    <Cpu className="w-12 h-12 text-white" />
                  </motion.div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">AI Analysis in Progress...</h3>
                    <p className="text-gray-600">Processing {applications.length} applications</p>
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                      <Zap className="w-4 h-4" />
                      <span>Analyzing correction delays</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
                      <DollarSign className="w-4 h-4" />
                      <span>Evaluating payment patterns</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
                      <RefreshCcw className="w-4 h-4" />
                      <span>Checking recovery timelines</span>
                    </div>
                  </div>

                  <motion.div
                    className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ) : analysisComplete ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 py-4"
              >
                {/* Overall Score */}
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white/90 text-sm mb-1">Overall Performance Score</h3>
                      <p className={`text-5xl font-bold text-white`}>{overallScore}/100</p>
                      <p className="text-white/80 text-sm mt-1">{getScoreLabel(overallScore)} Performance</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-white/90 mb-2">
                        <BarChart3 className="w-5 h-5" />
                        <span className="text-sm">AI Score</span>
                      </div>
                      <div className="space-y-1 text-xs text-white/70">
                        <p>• Based on {applications.length} applications</p>
                        <p>• Multi-factor delay analysis</p>
                        <p>• Real-time processing</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnalysisCard 
                    analysis={correctionAnalysis} 
                    icon={FileEdit}
                    color="from-orange-500 to-red-600"
                  />
                  <AnalysisCard 
                    analysis={paymentAnalysis} 
                    icon={DollarSign}
                    color="from-green-500 to-emerald-600"
                  />
                  <AnalysisCard 
                    analysis={recoveryAnalysis} 
                    icon={RefreshCcw}
                    color="from-blue-500 to-indigo-600"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Analysis completed at {new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={analyzeApplications}
                      className="flex items-center gap-2"
                    >
                      <RefreshCcw className="w-4 h-4" />
                      Re-analyze
                    </Button>
                    <Button onClick={onClose}>Close Dashboard</Button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}