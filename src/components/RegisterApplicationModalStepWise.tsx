import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Search, Loader2, CheckCircle, X, User, Phone, MapPin, FileText, Calendar, Upload, Sparkles, Eye, Trash2, Hash, Home, Building2, UserCircle2, Plug, ChevronRight, ChevronLeft, Check, Zap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { motion, AnimatePresence } from 'motion/react';
import { sendSMSNotification, SMS_TEMPLATES } from '../utils/smsNotification';

interface RegisterApplicationModalProps {
  open: boolean;
  onClose: () => void;
  onRegister?: (applicationData: any) => void;
}

interface ConsumerData {
  upicId: string;
  consumerNo: string;
  name: string;
  address: string;
  mobileNo: string;
  connectionType: string;
  applicationNo?: string;
}

// Mock consumer database
const MOCK_CONSUMERS = [
  { upicId: 'UP123456', consumerNo: 'CN001', name: 'Rajesh Kumar', address: 'Shivaji Nagar, Akola', mobileNo: '9876543210', connectionType: 'Domestic' },
  { upicId: 'UP789012', consumerNo: 'CN002', name: 'Priya Sharma', address: 'Gandhi Road, Akola', mobileNo: '9876543211', connectionType: 'Commercial' },
  { upicId: 'UP345678', consumerNo: 'CN003', name: 'Amit Patel', address: 'Station Road, Akola', mobileNo: '9876543212', connectionType: 'Domestic' },
  { upicId: 'UP456789', consumerNo: 'CN004', name: 'Suresh Gupta', address: 'MG Road, Akola', mobileNo: '9123456789', connectionType: 'Commercial' },
  { upicId: 'UP567890', consumerNo: 'CN005', name: 'Anita Desai', address: 'Civil Lines, Akola', mobileNo: '9234567890', connectionType: 'Domestic' },
];

const SPAM_NUMBERS = ['8888888888', '9999999999', '1234567890', '0000000000', '7777777777'];
const FRAUD_PATTERNS = [
  /^(.)\1{9}$/, // All same digits
  /^1234567890$/, // Sequential
  /^0{10}$/, // All zeros
];

// Mock property database with existing water connections
const MOCK_PROPERTIES = [
  {
    propertyNo: 'PROP001',
    address: 'Plot 123, Shivaji Nagar, Ward 5, Akola',
    ownerName: 'Rajesh Kumar',
    zone: 'Zone A',
    ward: 'Ward 5',
    connections: [
      { connectionNo: 'WC-2021-001', tapSize: '15mm', connectionType: 'Residential', status: 'Active' },
    ]
  },
  {
    propertyNo: 'PROP002',
    address: 'Plot 456, Gandhi Road, Ward 3, Akola',
    ownerName: 'Priya Sharma',
    zone: 'Zone B',
    ward: 'Ward 3',
    connections: [
      { connectionNo: 'WC-2020-045', tapSize: '20mm', connectionType: 'Commercial', status: 'Active' },
      { connectionNo: 'WC-2022-012', tapSize: '15mm', connectionType: 'Residential', status: 'Active' },
    ]
  },
  {
    propertyNo: 'PROP003',
    address: 'Plot 789, Station Road, Ward 7, Akola',
    ownerName: 'Amit Patel',
    zone: 'Zone C',
    ward: 'Ward 7',
    connections: []
  },
  {
    propertyNo: 'PROP004',
    address: 'Plot 234, MG Road, Ward 2, Akola',
    ownerName: 'Suresh Gupta',
    zone: 'Zone A',
    ward: 'Ward 2',
    connections: [
      { connectionNo: 'WC-2019-078', tapSize: '25mm', connectionType: 'Commercial', status: 'Active' },
    ]
  },
];

export function RegisterApplicationModalStepWise({ open, onClose, onRegister }: RegisterApplicationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [mode, setMode] = useState<'search' | 'new-connection'>('search');
  
  // Step 1: Search
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [searchType, setSearchType] = useState<'mobile' | 'property' | null>(null);
  
  // Step 2: Consumer Selection
  const [consumers, setConsumers] = useState<ConsumerData[]>([]);
  const [selectedConsumer, setSelectedConsumer] = useState<ConsumerData | null>(null);
  
  // Property Search Flow
  const [propertySearchResults, setPropertySearchResults] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [propertyConnections, setPropertyConnections] = useState<any[]>([]);
  const [selectedConnection, setSelectedConnection] = useState<any>(null);
  const [showPropertyFlow, setShowPropertyFlow] = useState(false);
  
  // New Connection Flow - Property Search (old states - can be cleaned up)
  const [propertySearchStep, setPropertySearchStep] = useState<'search' | 'select-property' | 'show-connections' | 'form'>('search');
  const [propertyNumber, setPropertyNumber] = useState('');
  const [propertyList, setPropertyList] = useState<any[]>([]);
  const [existingConnections, setExistingConnections] = useState<any[]>([]);
  const [isSearchingProperty, setIsSearchingProperty] = useState(false);
  
  // Step 2 (New Connection): Consumer Details
  const [newConnApplicantName, setNewConnApplicantName] = useState('');
  const [newConnApplicantAddress, setNewConnApplicantAddress] = useState('');
  const [newConnMobileNumber, setNewConnMobileNumber] = useState('');
  
  // Step 3: Application Details
  const [applicationType, setApplicationType] = useState('');
  const [reason, setReason] = useState('');
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Step 4: Upload Documents
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewFiles, setPreviewFiles] = useState<{file: File, preview: string | null}[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  // Step 5: Submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessConfirmation, setShowSuccessConfirmation] = useState(false);
  const [registeredApplicationNo, setRegisteredApplicationNo] = useState('');

  const steps = [
    { number: 1, label: 'Search', icon: Search },
    { number: 2, label: mode === 'new-connection' ? 'Consumer Details' : 'Select Consumer', icon: User },
    { number: 3, label: 'Application Details', icon: FileText },
    { number: 4, label: 'Upload Documents', icon: Upload },
    { number: 5, label: 'Review & Submit', icon: CheckCircle },
  ];

  const handleReset = () => {
    setCurrentStep(1);
    setMode('search');
    setSearchValue('');
    setConsumers([]);
    setSelectedConsumer(null);
    setApplicationType('');
    setReason('');
    setApplicationDate(new Date().toISOString().split('T')[0]);
    setUploadedFiles([]);
    setPreviewFiles([]);
    setIsSubmitting(false);
    setMobileError('');
    setShowSuccessConfirmation(false);
    setRegisteredApplicationNo('');
    setNewConnApplicantName('');
    setNewConnApplicantAddress('');
    setNewConnMobileNumber('');
    setPropertySearchStep('search');
    setPropertyNumber('');
    setPropertyList([]);
    setSelectedProperty(null);
    setExistingConnections([]);
    setIsSearchingProperty(false);
    setSearchType(null);
    setPropertySearchResults([]);
    setSelectedConnection(null);
    setShowPropertyFlow(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      handleClose();
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // If input is all digits, restrict to 10 characters max
    if (/^\d+$/.test(value)) {
      if (value.length <= 10) {
        setSearchValue(value);
      }
    } else {
      // Allow non-digit characters (for UPIC/Consumer No search)
      setSearchValue(value);
    }
    
    setMobileError('');
    if (consumers.length > 0) {
      setConsumers([]);
      setSelectedConsumer(null);
    }
  };

  const checkSpamNumber = (mobile: string): boolean => {
    if (SPAM_NUMBERS.includes(mobile)) return true;
    return FRAUD_PATTERNS.some(pattern => pattern.test(mobile));
  };

  const handleSearch = () => {
    if (!searchValue.trim()) {
      setMobileError('Please enter a search value');
      return;
    }

    if (/^\d{10}$/.test(searchValue) && checkSpamNumber(searchValue)) {
      setMobileError('⚠️ Spam/Fraud number detected by AI system');
      return;
    }

    setIsSearching(true);
    setMobileError('');
    // Clear previous results immediately
    setConsumers([]);
    setSelectedConsumer(null);
    setPropertySearchResults([]);
    setSelectedProperty(null);

    setTimeout(() => {
      console.log('🔍 Searching for:', searchValue);
      
      // Check if it's a property number search (starts with PROP)
      const propertyResults = MOCK_PROPERTIES.filter(property => 
        property.propertyNo.toUpperCase() === searchValue.toUpperCase()
      );

      if (propertyResults.length > 0) {
        // Property search flow
        console.log('✅ Found properties:', propertyResults);
        setPropertySearchResults(propertyResults);
        setSearchType('property');
        setShowPropertyFlow(true);
        setCurrentStep(2);
        toast.success(`Found ${propertyResults.length} property!`);
        setIsSearching(false);
        return;
      }
      
      // Consumer search flow (existing logic)
      const results = MOCK_CONSUMERS.filter(consumer => {
        const mobileMatch = consumer.mobileNo === searchValue;
        const upicMatch = consumer.upicId.toLowerCase() === searchValue.toLowerCase();
        const consumerNoMatch = consumer.consumerNo.toLowerCase() === searchValue.toLowerCase();
        
        console.log(`Checking ${consumer.name}:`, {
          mobileMatch,
          upicMatch,
          consumerNoMatch,
          mobile: consumer.mobileNo,
          searchValue
        });
        
        return mobileMatch || upicMatch || consumerNoMatch;
      });

      console.log('✅ Search results:', results);

      if (results.length > 0) {
        setConsumers(results);
        setSearchType('mobile');
        setShowPropertyFlow(false);
        setCurrentStep(2);
        toast.success(`Found ${results.length} consumer(s)!`);
      } else {
        toast.error('No consumer or property found');
        setMobileError('No consumer or property found with this information');
      }
      setIsSearching(false);
    }, 800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    
    setTimeout(() => {
      setUploadedFiles(prev => [...prev, ...files]);
      
      const newPreviews = files.map(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewFiles(prev => [...prev, { file, preview: reader.result as string }]);
          };
          reader.readAsDataURL(file);
          return null;
        }
        return { file, preview: null };
      });
      
      setPreviewFiles(prev => [...prev, ...newPreviews.filter(p => p !== null) as {file: File, preview: string | null}[]]);
      setIsUploading(false);
      toast.success(`${files.length} file(s) uploaded successfully!`);
      e.target.value = '';
    }, 500);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewFiles(prev => prev.filter((_, i) => i !== index));
    toast.info('File removed');
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        // For search mode, need search results. For new connection, can always proceed
        if (mode === 'search') {
          return searchValue.trim() !== '' && (consumers.length > 0 || propertySearchResults.length > 0);
        } else {
          return true; // Can always go to step 2 in new connection mode
        }
      case 2:
        if (mode === 'search') {
          // If property flow, must select a connection or add new
          if (showPropertyFlow) {
            return selectedConsumer !== null;
          }
          return selectedConsumer !== null;
        } else {
          return newConnApplicantName.trim() !== '' && 
                 newConnApplicantAddress.trim() !== '' && 
                 newConnMobileNumber.length === 10;
        }
      case 3:
        return applicationType !== '' && reason.trim() !== '';
      case 4:
        return true; // Documents are optional
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!canProceedToNextStep()) {
      toast.error('Please fill all required fields');
      return;
    }
    
    if (currentStep === 1 && mode === 'new-connection') {
      setCurrentStep(2);
      return;
    }
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      const applicationNo = `APP${Date.now()}`;
      const now = new Date();
      const dateTime = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
      
      const newApplication = {
        id: Date.now(),
        applicationNo,
        dateTime,
        date,
        upicId: selectedConsumer?.upicId || 'NEW',
        consumerNo: selectedConsumer?.consumerNo || 'NEW',
        applicantName: selectedConsumer?.name || newConnApplicantName,
        mobileNumber: selectedConsumer?.mobileNo || newConnMobileNumber,
        details: applicationType,
        stage: 'Under Review',
        status: 'Pending',
        office: 'Online',
        days: 0,
        address: selectedConsumer?.address || newConnApplicantAddress,
        connectionType: selectedConsumer?.connectionType || 'Domestic',
        applicationType,
        reason,
        applicationDate,
        uploadedFiles: uploadedFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString()
        }))
      };
      
      setIsSubmitting(false);
      setRegisteredApplicationNo(applicationNo);
      setShowSuccessConfirmation(true);
      
      toast.success(`Application ${applicationNo} registered successfully!`, {
        duration: 5000,
      });
      
      sendSMSNotification({
        mobileNumber: newApplication.mobileNumber,
        applicationNo: newApplication.applicationNo,
        message: SMS_TEMPLATES.REGISTRATION(newApplication.applicationNo),
        stage: 'Application Registered'
      });
      
      if (onRegister) {
        onRegister(newApplication);
      }
      
      setTimeout(() => {
        handleClose();
      }, 3000);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent 
        className="max-w-[90vw] w-[90vw] sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1000px] max-h-[92vh] overflow-y-auto bg-slate-50 border-2 border-white/60 p-4 sm:p-6"
        style={{
          boxShadow: '0 25px 80px -15px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8) inset'
        }}
      >
        {/* Header */}
        <DialogHeader className="relative bg-gradient-to-r from-blue-500 to-blue-400 px-4 py-4 -mt-6 -mx-6 mb-4 overflow-hidden border-b-2 border-white/20" style={{ zIndex: 1 }}>
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }}
              animate={{
                backgroundPosition: ['0px 0px', '32px 32px']
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative z-10 flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center relative overflow-hidden border border-white/30 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
              <Sparkles className="w-5 h-5 text-white relative z-10" />
            </motion.div>
            <div>
              <DialogTitle className="text-lg text-white drop-shadow-lg" style={{ fontWeight: 800 }}>Register New Application</DialogTitle>
              <DialogDescription className="text-xs mt-0.5 text-white/90" style={{ fontWeight: 500 }}>
                Complete the registration in 5 easy steps
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Step Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>

            {/* Steps */}
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.number;
              const isActive = currentStep === step.number;
              
              return (
                <div key={step.number} className="relative flex flex-col items-center" style={{ zIndex: 10 }}>
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      isCompleted
                        ? 'bg-green-500 border-green-500'
                        : isActive
                        ? 'bg-blue-500 border-blue-500'
                        : 'bg-white border-gray-300'
                    } transition-all shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    )}
                  </motion.div>
                  <span className={`text-[10px] mt-2 text-center ${isActive ? 'text-blue-600 font-bold' : 'text-gray-500'} hidden sm:block`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Confirmation */}
        <AnimatePresence>
          {showSuccessConfirmation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Application Registered!</h3>
                <p className="text-gray-600 mb-4">
                  Your application number is
                </p>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4">
                  <p className="text-2xl font-bold text-blue-600">{registeredApplicationNo}</p>
                </div>
                <p className="text-sm text-gray-500">
                  SMS notification has been sent to the registered mobile number
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Content */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {/* Step 1: Search */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative bg-white backdrop-blur-xl rounded-2xl border-2 border-blue-200/50 p-6 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-teal-50/30 to-cyan-50/50 rounded-2xl pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-t-2xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <Search className="w-5 h-5 text-teal-600" />
                      <span className="text-blue-900 text-sm font-bold">Search Consumer</span>
                    </div>

                    <div className="space-y-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                        <Input
                          placeholder="Enter Mobile/UPIC/Consumer No/Property No"
                          value={searchValue}
                          onChange={handleSearchInput}
                          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                          className="pl-10 pr-10 h-12 border-2 rounded-[100px] text-sm bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all focus:border-blue-500"
                        />
                        {searchValue && (
                          <button
                            onClick={() => {
                              setSearchValue('');
                              setConsumers([]);
                              setSelectedConsumer(null);
                              setMobileError('');
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-600 transition-all cursor-pointer flex items-center justify-center"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      
                      {/* Helper text showing valid numbers */}
                      <div className="text-xs text-blue-700 bg-blue-50/80 px-3 py-2 rounded-lg border border-blue-200/60">
                        <p className="font-semibold mb-1">💡 Test with these:</p>
                        <p className="text-blue-600 font-mono mb-1">Mobile: 9876543210, 9876543211, 9876543212</p>
                        <p className="text-green-600 font-mono">Property: PROP001, PROP002, PROP003, PROP004</p>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          onClick={handleSearch} 
                          disabled={isSearching}
                          className="flex-1 h-12 bg-[#0EA5E9] hover:bg-[#0284C7] text-white shadow-md hover:shadow-lg transition-all rounded-xl"
                        >
                          {isSearching ? (
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          ) : (
                            <Search className="w-5 h-5 mr-2" />
                          )}
                          Search
                        </Button>

                        <Button 
                          onClick={() => {
                            setMode('new-connection');
                            setCurrentStep(2);
                          }}
                          className="flex-1 h-12 bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-md hover:shadow-lg transition-all rounded-xl"
                        >
                          <Plug className="w-5 h-5 mr-2" />
                          New Connection
                        </Button>
                      </div>

                      {mobileError && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs text-red-600 flex items-center gap-1.5 bg-red-50/80 px-3 py-2 rounded-lg border border-red-200/60"
                        >
                          <X className="w-3.5 h-3.5" />
                          {mobileError}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Consumer (Search Mode) */}
            {currentStep === 2 && mode === 'search' && !showPropertyFlow && (
              <motion.div
                key="step2-search"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white backdrop-blur-xl border-2 border-green-200/60 rounded-2xl shadow-lg overflow-hidden">
                  <div className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-bold">Consumer Found ({consumers.length})</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-slate-100 to-slate-50">
                          <tr>
                            <th className="px-3 py-2 text-center text-xs text-slate-700 font-bold">Select</th>
                            <th className="px-3 py-2 text-left text-xs text-slate-700 font-bold">Name</th>
                            <th className="px-3 py-2 text-left text-xs text-slate-700 font-bold">Consumer No</th>
                            <th className="px-3 py-2 text-left text-xs text-slate-700 font-bold">Mobile</th>
                            <th className="px-3 py-2 text-left text-xs text-slate-700 font-bold">Address</th>
                            <th className="px-3 py-2 text-left text-xs text-slate-700 font-bold">Type</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-100">
                          {consumers.map((consumer, idx) => (
                            <motion.tr
                              key={idx}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              onClick={() => setSelectedConsumer(consumer)}
                              className={`cursor-pointer transition-all ${
                                selectedConsumer?.consumerNo === consumer.consumerNo
                                  ? 'bg-indigo-50'
                                  : 'hover:bg-slate-50'
                              }`}
                            >
                              <td className="px-3 py-2">
                                <div className="flex items-center justify-center">
                                  {selectedConsumer?.consumerNo === consumer.consumerNo ? (
                                    <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                      <CheckCircle className="w-4 h-4 text-white" />
                                    </div>
                                  ) : (
                                    <div className="w-5 h-5 border-2 border-slate-300 rounded-full" />
                                  )}
                                </div>
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                                    consumer.connectionType === 'Domestic' 
                                      ? 'bg-gradient-to-br from-teal-400 to-cyan-500' 
                                      : 'bg-gradient-to-br from-amber-400 to-orange-500'
                                  }`}>
                                    <UserCircle2 className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-slate-800 font-semibold">{consumer.name}</span>
                                </div>
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-1">
                                  <Hash className="w-3 h-3 text-indigo-500" />
                                  <span className="text-slate-700 font-semibold">{consumer.consumerNo}</span>
                                </div>
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-emerald-500" />
                                  <span className="text-slate-700 font-semibold">{consumer.mobileNo}</span>
                                </div>
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-1">
                                  <Home className="w-3 h-3 text-purple-500" />
                                  <span className="text-slate-600">{consumer.address}</span>
                                </div>
                              </td>
                              <td className="px-3 py-2">
                                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold ${
                                  consumer.connectionType === 'Domestic' 
                                    ? 'bg-teal-100 text-teal-700' 
                                    : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {consumer.connectionType === 'Domestic' ? (
                                    <Home className="w-3 h-3" />
                                  ) : (
                                    <Building2 className="w-3 h-3" />
                                  )}
                                  {consumer.connectionType}
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {selectedConsumer && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200/60 rounded-xl p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-blue-600" />
                          <span className="text-xs text-blue-700 font-bold">Selected Consumer</span>
                        </div>
                        <div className="text-sm text-gray-900 font-bold mb-2">{selectedConsumer.name}</div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                            <User className="w-3 h-3" />
                            {selectedConsumer.consumerNo}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">
                            <Phone className="w-3 h-3" />
                            {selectedConsumer.mobileNo}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Property Flow (When searched by property number) */}
            {currentStep === 2 && mode === 'search' && showPropertyFlow && propertySearchResults.length > 0 && !selectedProperty && (
              <motion.div
                key="step2-property-select"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white backdrop-blur-xl border-2 border-purple-200/60 rounded-2xl shadow-lg overflow-hidden">
                  <div className="px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-400 text-white">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm font-bold">Property Found - Select Property</span>
                    </div>
                  </div>

                  <div className="p-4">
                    {propertySearchResults.map((property, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => {
                          setSelectedProperty(property);
                          setPropertyConnections(property.connections);
                        }}
                        className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all mb-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Hash className="w-4 h-4 text-purple-600" />
                              <span className="font-bold text-gray-900">{property.propertyNo}</span>
                            </div>
                            <div className="space-y-1 text-xs">
                              <div className="flex items-center gap-2">
                                <User className="w-3 h-3 text-blue-600" />
                                <span className="text-gray-700"><span className="font-semibold">Owner:</span> {property.ownerName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-orange-600" />
                                <span className="text-gray-700">{property.address}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md font-semibold">
                                  <Building2 className="w-3 h-3" />
                                  {property.zone}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-md font-semibold">
                                  <MapPin className="w-3 h-3" />
                                  {property.ward}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-purple-500 flex-shrink-0" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Property Connections (After property selected) */}
            {currentStep === 2 && mode === 'search' && showPropertyFlow && selectedProperty && (
              <motion.div
                key="step2-property-connections"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white backdrop-blur-xl border-2 border-cyan-200/60 rounded-2xl shadow-lg overflow-hidden">
                  <div className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Plug className="w-4 h-4" />
                        <span className="text-sm font-bold">Water Connections on {selectedProperty.propertyNo}</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedProperty(null);
                          setPropertyConnections([]);
                        }}
                        className="text-white/80 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    {/* Property Info Banner */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-bold text-gray-900">{selectedProperty.ownerName}</span>
                      </div>
                      <div className="text-xs text-gray-600">{selectedProperty.address}</div>
                    </div>

                    {/* Connections List */}
                    {propertyConnections.length > 0 ? (
                      <div className="space-y-3 mb-4">
                        <div className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-cyan-600" />
                          Existing Connections ({propertyConnections.length})
                        </div>
                        {propertyConnections.map((connection, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => {
                              setSelectedConnection(connection);
                              // Create a consumer object from connection
                              const consumer = {
                                upicId: selectedProperty.propertyNo,
                                consumerNo: connection.connectionNo,
                                name: selectedProperty.ownerName,
                                address: selectedProperty.address,
                                mobileNo: '9999999999', // Will need to enter
                                connectionType: connection.connectionType
                              };
                              setSelectedConsumer(consumer);
                              
                              // Automatically move to next step (Application Details)
                              setTimeout(() => {
                                setCurrentStep(3);
                                toast.success(`Connection ${connection.connectionNo} selected. Continue with application details.`);
                              }, 300);
                            }}
                            className={`bg-gradient-to-br from-cyan-50 to-blue-50 border-2 rounded-lg p-3 cursor-pointer hover:shadow-md transition-all ${
                              selectedConnection?.connectionNo === connection.connectionNo
                                ? 'border-cyan-500 ring-2 ring-cyan-200'
                                : 'border-cyan-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                    connection.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                                  }`}>
                                    <Plug className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-gray-900">{connection.connectionNo}</div>
                                    <div className="text-xs text-gray-600">{connection.connectionType}</div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs font-semibold">
                                    Tap: {connection.tapSize}
                                  </span>
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${
                                    connection.status === 'Active' 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {connection.status}
                                  </span>
                                </div>
                              </div>
                              {selectedConnection?.connectionNo === connection.connectionNo && (
                                <CheckCircle className="w-5 h-5 text-cyan-600" />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Plug className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm font-semibold">No existing water connections</p>
                        <p className="text-xs">Click "Add New Connection" to register a new connection</p>
                      </div>
                    )}

                    {/* Add New Connection Button */}
                    <div className="flex justify-end pt-4 border-t border-gray-200">
                      <Button
                        onClick={() => {
                          // Switch to new connection mode with pre-filled property info
                          setMode('new-connection');
                          setNewConnApplicantName(selectedProperty.ownerName);
                          setNewConnApplicantAddress(selectedProperty.address);
                          setShowPropertyFlow(false);
                          toast.info('Please complete the new connection form');
                        }}
                        className="bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-md hover:shadow-lg transition-all rounded-xl"
                      >
                        <Plug className="w-4 h-4 mr-2" />
                        Add New Connection
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Consumer Details (New Connection Mode) */}
            {currentStep === 2 && mode === 'new-connection' && (
              <motion.div
                key="step2-new"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative bg-white backdrop-blur-xl rounded-2xl border-2 border-emerald-200/50 p-6 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-cyan-50/50 rounded-2xl pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-t-2xl" />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Plug className="w-5 h-5 text-emerald-600" />
                      <span className="text-emerald-900 text-sm font-bold">New Connection Details</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs flex items-center gap-1.5 font-bold">
                          <User className="w-3.5 h-3.5 text-blue-600" />
                          Applicant Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Enter name"
                          value={newConnApplicantName}
                          onChange={(e) => setNewConnApplicantName(e.target.value)}
                          className="h-11 border-2 border-blue-200/70 focus:border-blue-600 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs flex items-center gap-1.5 font-bold">
                          <Phone className="w-3.5 h-3.5 text-green-600" />
                          Mobile Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="10-digit mobile"
                          value={newConnMobileNumber}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {
                              setNewConnMobileNumber(value);
                            }
                          }}
                          className="h-11 border-2 border-cyan-200/70 focus:border-cyan-600 rounded-xl"
                          maxLength={10}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-xs flex items-center gap-1.5 font-bold">
                          <MapPin className="w-3.5 h-3.5 text-orange-600" />
                          Applicant Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Enter address"
                          value={newConnApplicantAddress}
                          onChange={(e) => setNewConnApplicantAddress(e.target.value)}
                          className="h-11 border-2 border-teal-200/70 focus:border-teal-600 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Application Details */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative bg-white backdrop-blur-xl rounded-2xl border-2 border-purple-200/50 p-6 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/70 via-pink-50/30 to-blue-50/50 rounded-2xl pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-400 rounded-t-2xl" />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <span className="text-purple-900 text-sm font-bold">Application Details</span>
                    </div>

                    <div className="grid grid-cols-12 gap-4">
                      {/* Application Type - col-span-3 */}
                      <div className="space-y-2 col-span-12 sm:col-span-3">
                        <Label className="text-xs flex items-center gap-1.5 font-bold">
                          <FileText className="w-3.5 h-3.5 text-purple-600" />
                          Application Type <span className="text-red-500">*</span>
                        </Label>
                        <Select value={applicationType} onValueChange={setApplicationType}>
                          <SelectTrigger className="h-11 border-2 border-purple-300/60 focus:border-purple-500 rounded-xl">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {mode === 'new-connection' ? (
                              <>
                                <SelectItem value="new-connection">
                                  <div className="flex items-center gap-2">
                                    <span>✨</span>
                                    <span className="text-sm">New Connection</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="resume-connection">
                                  <div className="flex items-center gap-2">
                                    <span>🔄</span>
                                    <span className="text-sm">Resume Previous Connection</span>
                                  </div>
                                </SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="alteration">
                                  <div className="flex items-center gap-2">
                                    <span>🔧</span>
                                    <span className="text-sm">Alteration</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="mutation">
                                  <div className="flex items-center gap-2">
                                    <span>📝</span>
                                    <span className="text-sm">Mutation</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="disconnection">
                                  <div className="flex items-center gap-2">
                                    <span>⚡</span>
                                    <span className="text-sm">Disconnection</span>
                                  </div>
                                </SelectItem>
                                {/* <SelectItem value="new-connection">
                                  <div className="flex items-center gap-2">
                                    <span>✨</span>
                                    <span className="text-sm">New Connection</span>
                                  </div>
                                </SelectItem> */}
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Application Date - col-span-3 */}
                      <div className="space-y-2 col-span-12 sm:col-span-2">
                        <Label className="text-xs flex items-center gap-1.5 font-bold">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          Application Date <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="date"
                          value={applicationDate}
                          onChange={(e) => setApplicationDate(e.target.value)}
                          className="h-11 border-2 border-blue-200/70 focus:border-blue-600 rounded-xl"
                        />
                      </div>

                      {/* Reason - col-span-6 */}
                      <div className="space-y-2 col-span-12 sm:col-span-7">
                        <Label className="text-xs flex items-center gap-1.5 font-bold">
                          <FileText className="w-3.5 h-3.5 text-orange-600" />
                          Reason <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Enter reason"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          className="h-11 border-2 border-orange-200/70 focus:border-orange-600 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Upload Documents */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative bg-white backdrop-blur-xl rounded-2xl border-2 border-indigo-200/50 p-6 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/70 via-purple-50/30 to-pink-50/50 rounded-2xl pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-t-2xl" />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Upload className="w-5 h-5 text-indigo-600" />
                      <span className="text-indigo-900 text-sm font-bold">Upload Documents (Optional)</span>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-xs flex items-center gap-1.5 font-bold">
                        <Upload className="w-3.5 h-3.5 text-green-600" />
                        Select Files
                      </Label>
                      <Input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="h-11 border-2 border-indigo-200/70 focus:border-indigo-600 rounded-xl file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-600 file:to-teal-500 file:text-white file:cursor-pointer"
                        multiple
                      />

                      {previewFiles.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-xs flex items-center gap-1.5 font-bold">
                            <Eye className="w-3.5 h-3.5 text-purple-600" />
                            Uploaded Documents ({previewFiles.length})
                          </Label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {previewFiles.map((item, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-square rounded-xl overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-teal-50">
                                  {item.preview && item.file.type.startsWith('image/') ? (
                                    <img src={item.preview} alt={item.file.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center p-2">
                                      <FileText className="w-8 h-8 text-purple-500 mb-1" />
                                      <span className="text-[9px] text-center text-gray-600 line-clamp-2 font-semibold">
                                        {item.file.name}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <button
                                  onClick={() => handleRemoveFile(index)}
                                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative bg-white backdrop-blur-xl rounded-2xl border-2 border-green-200/50 p-6 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/70 via-emerald-50/30 to-teal-50/50 rounded-2xl pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-teal-400 rounded-t-2xl" />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-900 text-sm font-bold">Review & Submit</span>
                    </div>

                    <div className="space-y-4">
                      {/* Consumer Info */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
                        <h4 className="text-xs font-bold text-blue-900 mb-3 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Consumer Information
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-gray-600">Name:</span>
                            <p className="font-semibold text-gray-900">{selectedConsumer?.name || newConnApplicantName}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Mobile:</span>
                            <p className="font-semibold text-gray-900">{selectedConsumer?.mobileNo || newConnMobileNumber}</p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-600">Address:</span>
                            <p className="font-semibold text-gray-900">{selectedConsumer?.address || newConnApplicantAddress}</p>
                          </div>
                        </div>
                      </div>

                      {/* Application Details */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                        <h4 className="text-xs font-bold text-purple-900 mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Application Details
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-gray-600">Type:</span>
                            <p className="font-semibold text-gray-900">{applicationType}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Reason:</span>
                            <p className="font-semibold text-gray-900">{reason}</p>
                          </div>
                        </div>
                      </div>

                      {/* Documents */}
                      {previewFiles.length > 0 && (
                        <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 border-2 border-indigo-200 rounded-xl p-4">
                          <h4 className="text-xs font-bold text-indigo-900 mb-3 flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Documents ({previewFiles.length})
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {previewFiles.map((item, index) => (
                              <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-indigo-200 rounded-lg text-xs">
                                <FileText className="w-3 h-3 text-indigo-600" />
                                {item.file.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t-2 border-gray-200">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
            className="px-6 h-11 border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2] rounded-xl disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          {currentStep < 5 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceedToNextStep()}
              className="px-6 h-11 bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-xl disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 h-11 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}