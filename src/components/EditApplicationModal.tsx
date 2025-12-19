import { toast } from 'sonner@2.0.3';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, FileText, User, Home, Calendar, Hash, Phone, MapPin, MessageSquare, Upload, Zap, Activity, Eye, RefreshCw, Slash, Building2, IndianRupee, Gauge, CheckCircle2, AlertCircle, Download, Lock, RotateCcw, Plus, ChevronDown, ChevronUp, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { WaterRipple } from './WaterRipple';

interface EditApplicationModalProps {
  application: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedApp: any) => void;
  onSuccess?: (applicationNo: string) => void; // New callback for success
}

export function EditApplicationModal({ application, isOpen, onClose, onUpdate, onSuccess }: EditApplicationModalProps) {
  const [formData, setFormData] = useState({
    consumerName: application?.applicantName || application?.consumerName || 'Rahul Sharma',
    mobileNumber: application?.mobileNumber || application?.mobile || '9876543210',
    address: application?.address || 'Plot No. 123, Ward 5, Akola',
    zoneNo: application?.zoneNo || 'Zone A',
    wardNo: application?.wardNo || '5',
    propertyNo: application?.propertyNo || '123',
    buildingStatus: application?.buildingStatus || 'Self',
    applicationType: application?.applicationType || 'New Connection',
    
    // New Connection fields
    propertyType: application?.propertyType || 'building', // New field for radio button
    buildingType: application?.buildingType || 'House', // New field
    isOldConsumer: application?.isOldConsumer || false, // New checkbox field
    applicantType: application?.applicantType || 'Residential',
    requiredLoad: application?.requiredLoad || '5 KW',
    purpose: application?.purpose || 'Domestic Use',
    plotArea: application?.plotArea || '1200',
    connectionType: application?.connectionType || 'Single Phase',
    sanctionedLoad: application?.sanctionedLoad || '5 KW',
    connectionCategory: application?.connectionCategory || 'Quarterly',
    isMultipleConnection: application?.isMultipleConnection || false, // New field for radio button
    connectionCount: application?.connectionCount || '1', // New field
    connections: application?.connections || [{ tapSize: '15mm', connectionType: 'Residential' }], // Array for multiple connections
    tapSize: application?.tapSize || '15mm', // New field
    nearestPoleNo: application?.nearestPoleNo || 'P-1234',
    
    // Mutation fields - Before/After
    mutationReason: application?.mutationReason || 'Property Transfer',
    mutationNewName: application?.mutationNewName || '',
    mutationNewAddress: application?.mutationNewAddress || '',
    mutationNewMobile: application?.mutationNewMobile || '',
    beforePropertyType: application?.beforePropertyType || 'building',
    beforeBuildingType: application?.beforeBuildingType || 'House',
    beforeConnectionCategory: application?.beforeConnectionCategory || 'Quarterly',
    beforeConnectionType: application?.beforeConnectionType || 'Residential',
    beforeConnectionCount: application?.beforeConnectionCount || '1',
    beforeTapSize: application?.beforeTapSize || '15mm',
    beforePurpose: application?.beforePurpose || 'Domestic Use',
    afterPropertyType: application?.afterPropertyType || 'building',
    afterBuildingType: application?.afterBuildingType || 'House',
    afterConnectionCategory: application?.afterConnectionCategory || 'Quarterly',
    afterConnectionType: application?.afterConnectionType || 'Residential',
    afterConnectionCount: application?.afterConnectionCount || '1',
    afterTapSize: application?.afterTapSize || '15mm',
    afterPurpose: application?.afterPurpose || 'Domestic Use',
    
    // Alteration fields - Before/After
    alterationReason: application?.alterationReason || 'Load Enhancement',
    alterationBeforePropertyType: application?.alterationBeforePropertyType || 'building',
    alterationBeforeBuildingType: application?.alterationBeforeBuildingType || 'House',
    alterationBeforeConnectionCategory: application?.alterationBeforeConnectionCategory || 'Quarterly',
    alterationBeforeConnectionType: application?.alterationBeforeConnectionType || 'Residential',
    alterationBeforeConnectionCount: application?.alterationBeforeConnectionCount || '1',
    alterationBeforeTapSize: application?.alterationBeforeTapSize || '15mm',
    alterationBeforePurpose: application?.alterationBeforePurpose || 'Domestic Use',
    alterationAfterPropertyType: application?.alterationAfterPropertyType || 'building',
    alterationAfterBuildingType: application?.alterationAfterBuildingType || 'House',
    alterationAfterConnectionCategory: application?.alterationAfterConnectionCategory || 'Quarterly',
    alterationAfterConnectionType: application?.alterationAfterConnectionType || 'Residential',
    alterationAfterConnectionCount: application?.alterationAfterConnectionCount || '1',
    alterationAfterTapSize: application?.alterationAfterTapSize || '15mm',
    alterationAfterPurpose: application?.alterationAfterPurpose || 'Domestic Use',
    
    // Disconnection fields
    disconnectionReason: application?.disconnectionReason || 'Shifting to new location',
    finalMeterReading: application?.finalMeterReading || '12580',
    disconnectionDate: application?.disconnectionDate || '2024-01-15',
    refundRequired: application?.refundRequired || 'No',
    
    // Disconnection Action - Radio button (only one can be selected)
    disconnectionAction: application?.disconnectionAction || 'meterDisconnection', // Default selection
    disconnectionRemarks: application?.disconnectionRemarks || '',
  });

  const [viewingDocument, setViewingDocument] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Multiple file upload
  const [showNotesheetDownload, setShowNotesheetDownload] = useState(false);

  // Tab state for New Connection applications
  const [activeEditTab, setActiveEditTab] = useState<'application' | 'consumer' | 'connection'>('application');

  // Tax section states
  const [pendingTaxQuarter, setPendingTaxQuarter] = useState('01/04/2025 - 31/03/2026');
  const [pendingTaxYear, setPendingTaxYear] = useState('2025');
  const [pendingTaxTotal, setPendingTaxTotal] = useState('1690');
  const [pendingTaxInterest, setPendingTaxInterest] = useState('0');
  const [pendingTaxPayable, setPendingTaxPayable] = useState('1690');
  const [pendingTaxRuntimeInterest, setPendingTaxRuntimeInterest] = useState(true);
  const [pendingTaxEditingIndex, setPendingTaxEditingIndex] = useState<number>(0);
  const [pendingTaxRows, setPendingTaxRows] = useState<any[]>([
    {
      quarter: '01/04/2025 - 31/03/2026',
      year: '2025',
      totalTax: '1690',
      interest: '0',
      payableAmount: '1690',
      runtimeInterest: true
    }
  ]);

  const [runningTaxQuarter, setRunningTaxQuarter] = useState('01/04/2025 - 31/03/2026');
  const [runningTaxYear, setRunningTaxYear] = useState('2024');
  const [runningTaxTotal, setRunningTaxTotal] = useState('16416');
  const [runningTaxInterest, setRunningTaxInterest] = useState('0');
  const [runningTaxPayable, setRunningTaxPayable] = useState('16416');
  const [runningTaxRuntimeInterest, setRunningTaxRuntimeInterest] = useState(true);
  const [runningTaxEditingIndex, setRunningTaxEditingIndex] = useState<number>(0);
  
  // Collapse/Expand state for Alteration Consumer Details (collapsed by default)
  const [isConsumerDetailsExpanded, setIsConsumerDetailsExpanded] = useState(false);
  
  // Accessibility: Reduced motion preference
  const prefersReducedMotion = useReducedMotion();
  
  // Accessibility: Focus management refs
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Accessibility: ARIA live region for announcements
  const [announcement, setAnnouncement] = useState('');
  
  const [runningTaxRows, setRunningTaxRows] = useState<any[]>([
    {
      quarter: '01/04/2025 - 31/03/2026',
      year: '2024',
      totalTax: '16416',
      interest: '0',
      payableAmount: '16416',
      runtimeInterest: true
    }
  ]);

  // Calculate payable amount when interest changes
  const handlePendingTaxInterestChange = (value: string) => {
    setPendingTaxInterest(value);
    const total = parseFloat(pendingTaxTotal) || 0;
    const interest = parseFloat(value) || 0;
    setPendingTaxPayable((total + interest).toString());
  };

  const handleRunningTaxInterestChange = (value: string) => {
    setRunningTaxInterest(value);
    const total = parseFloat(runningTaxTotal) || 0;
    const interest = parseFloat(value) || 0;
    setRunningTaxPayable((total + interest).toString());
  };

  // Edit pending tax row - populate form fields
  const handleEditPendingTaxRow = (index: number) => {
    const row = pendingTaxRows[index];
    setPendingTaxQuarter(row.quarter);
    setPendingTaxYear(row.year);
    setPendingTaxTotal(row.totalTax);
    setPendingTaxInterest(row.interest);
    setPendingTaxPayable(row.payableAmount);
    setPendingTaxRuntimeInterest(row.runtimeInterest);
    setPendingTaxEditingIndex(index);
    toast.info(`📝 Editing Pending Tax Row ${index + 1}`);
  };

  // Edit running tax row - populate form fields
  const handleEditRunningTaxRow = (index: number) => {
    const row = runningTaxRows[index];
    setRunningTaxQuarter(row.quarter);
    setRunningTaxYear(row.year);
    setRunningTaxTotal(row.totalTax);
    setRunningTaxInterest(row.interest);
    setRunningTaxPayable(row.payableAmount);
    setRunningTaxRuntimeInterest(row.runtimeInterest);
    setRunningTaxEditingIndex(index);
    toast.info(`📝 Editing Running Tax Row ${index + 1}`);
  };

  // Update pending tax row
  const handleAddPendingTaxRow = () => {
    const updatedRow = {
      quarter: pendingTaxQuarter,
      year: pendingTaxYear,
      totalTax: pendingTaxTotal,
      interest: pendingTaxInterest,
      payableAmount: pendingTaxPayable,
      runtimeInterest: pendingTaxRuntimeInterest
    };
    
    const updatedRows = [...pendingTaxRows];
    updatedRows[pendingTaxEditingIndex] = updatedRow;
    setPendingTaxRows(updatedRows);
    toast.success(`✅ Pending tax row ${pendingTaxEditingIndex + 1} updated successfully!`);
  };

  // Update running tax row
  const handleAddRunningTaxRow = () => {
    const updatedRow = {
      quarter: runningTaxQuarter,
      year: runningTaxYear,
      totalTax: runningTaxTotal,
      interest: runningTaxInterest,
      payableAmount: runningTaxPayable,
      runtimeInterest: runningTaxRuntimeInterest
    };
    
    const updatedRows = [...runningTaxRows];
    updatedRows[runningTaxEditingIndex] = updatedRow;
    setRunningTaxRows(updatedRows);
    toast.success(`✅ Running tax row ${runningTaxEditingIndex + 1} updated successfully!`);
  };

  // Get application type from the application object
  // Check both 'applicationType' and 'details' fields for backward compatibility
  const rawApplicationType = application?.applicationType || application?.details || 'New Connection';
  
  // Normalize application type to match exact expected values
  const normalizeApplicationType = (type: string): string => {
    const lowerType = type.toLowerCase().replace(/-/g, ' '); // Replace hyphens with spaces
    if (lowerType === 'new connection') return 'New Connection';
    if (lowerType === 'resume previous connection' || lowerType === 'resume connection') return 'Resume Previous Connection';
    if (lowerType === 'mutation') return 'Mutation';
    if (lowerType === 'alteration') return 'Alteration';
    if (lowerType === 'disconnection' || lowerType === 'disconnect connection') return 'Disconnection';
    if (lowerType === 'temporary connection') return 'Temporary Connection';
    if (lowerType === 'reconnection') return 'Reconnection';
    if (lowerType === 'correction in demand bill') return 'Correction in Demand Bill';
    // Default: capitalize first letter of each word
    return type.split(/[\s-]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };
  
  const applicationType = normalizeApplicationType(rawApplicationType);

  // Accessibility: Focus management when modal opens/closes
  useEffect(() => {
    if (isOpen && closeButtonRef.current && application) {
      // Set focus to close button when modal opens
      closeButtonRef.current.focus();
      // Announce modal opening to screen readers
      setAnnouncement(`Edit Application Modal opened for ${application?.applicationNo || 'application'}`);
    }
  }, [isOpen, application]);

  // Accessibility: Clear announcements after they're read
  useEffect(() => {
    if (announcement) {
      const timer = setTimeout(() => setAnnouncement(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [announcement]);

  // Accessibility: Helper function to announce changes
  const announce = (message: string) => {
    setAnnouncement(message);
  };

  if (!application) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      // Accessibility: Announce file selection to screen readers
      const filesText = newFiles.length === 1 
        ? `File ${newFiles[0].name} selected, size ${(newFiles[0].size / 1024).toFixed(2)} KB`
        : `${newFiles.length} files selected`;
      announce(filesText);
      
      // Toast notification
      if (newFiles.length === 1) {
        toast.success(`File "${newFiles[0].name}" selected successfully`, {
          description: `Size: ${(newFiles[0].size / 1024).toFixed(2)} KB | Type: ${newFiles[0].type}`
        });
      }
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const removedFile = selectedFiles[indexToRemove];
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    announce(`File ${removedFile.name} removed`);
    toast.info(`File "${removedFile.name}" removed`, {
      duration: 2000,
    });
  };

  const getRequiredDocuments = (appType: string): string[] => {
    switch(appType) {
      case 'New Connection':
        return [
          'Aadhar Card',
          'Property Documents',
          'Building Plan',
          'NOC Certificate',
          'Passport Photo',
          'Address Proof'
        ];
      case 'Mutation':
        return [
          'Transfer Deed',
          'Old Consumer ID',
          'Aadhar Card (New Owner)',
          'No Objection Certificate',
          'Legal Heir Certificate (if applicable)',
          'Property Tax Receipt'
        ];
      case 'Alteration':
        return [
          'Existing Connection Details',
          'Modified Building Plan',
          'Load Enhancement Request',
          'Property Tax Receipt',
          'NOC from Society',
          'Electrical Safety Certificate'
        ];
      case 'Disconnection':
        return [
          'Final Meter Reading Photo',
          'Pending Bill Clearance',
          'Security Deposit Receipt',
          'Connection Removal Request',
          'Aadhar Card',
          'Last Bill Copy'
        ];
      default:
        return [];
    }
  };

  const handleFileButtonClick = () => {
    document.getElementById('file-upload-input')?.click();
  };

  const handleSubmitClick = () => {
    // Accessibility: Announce submission action
    announce('Submitting application');
    // Directly submit without confirmation
    confirmSubmit();
  };

  const confirmSubmit = () => {
    const updatedApp = {
      ...application,
      applicantName: formData.consumerName,
      mobileNumber: formData.mobileNumber,
      address: formData.address,
      zoneNo: formData.zoneNo,
      wardNo: formData.wardNo,
      propertyNo: formData.propertyNo,
      applicationType: applicationType,
      propertyType: formData.propertyType,
      buildingType: formData.buildingType,
      isOldConsumer: formData.isOldConsumer,
      applicantType: formData.applicantType,
      requiredLoad: formData.requiredLoad,
      purpose: formData.purpose,
      plotArea: formData.plotArea,
      connectionType: formData.connectionType,
      sanctionedLoad: formData.sanctionedLoad,
      connectionCategory: formData.connectionCategory,
      isMultipleConnection: formData.isMultipleConnection,
      connectionCount: formData.connectionCount,
      connections: formData.connections,
      tapSize: formData.tapSize,
      nearestPoleNo: formData.nearestPoleNo,
      buildingStatus: formData.buildingStatus,
      mutationReason: formData.mutationReason,
      mutationNewName: formData.mutationNewName,
      mutationNewAddress: formData.mutationNewAddress,
      mutationNewMobile: formData.mutationNewMobile,
      beforePropertyType: formData.beforePropertyType,
      beforeBuildingType: formData.beforeBuildingType,
      beforeConnectionCategory: formData.beforeConnectionCategory,
      beforeConnectionType: formData.beforeConnectionType,
      beforeConnectionCount: formData.beforeConnectionCount,
      beforeTapSize: formData.beforeTapSize,
      beforePurpose: formData.beforePurpose,
      afterPropertyType: formData.afterPropertyType,
      afterBuildingType: formData.afterBuildingType,
      afterConnectionCategory: formData.afterConnectionCategory,
      afterConnectionType: formData.afterConnectionType,
      afterConnectionCount: formData.afterConnectionCount,
      afterTapSize: formData.afterTapSize,
      afterPurpose: formData.afterPurpose,
      alterationReason: formData.alterationReason,
      alterationBeforePropertyType: formData.alterationBeforePropertyType,
      alterationBeforeBuildingType: formData.alterationBeforeBuildingType,
      alterationBeforeConnectionCategory: formData.alterationBeforeConnectionCategory,
      alterationBeforeConnectionType: formData.alterationBeforeConnectionType,
      alterationBeforeConnectionCount: formData.alterationBeforeConnectionCount,
      alterationBeforeTapSize: formData.alterationBeforeTapSize,
      alterationBeforePurpose: formData.alterationBeforePurpose,
      alterationAfterPropertyType: formData.alterationAfterPropertyType,
      alterationAfterBuildingType: formData.alterationAfterBuildingType,
      alterationAfterConnectionCategory: formData.alterationAfterConnectionCategory,
      alterationAfterConnectionType: formData.alterationAfterConnectionType,
      alterationAfterConnectionCount: formData.alterationAfterConnectionCount,
      alterationAfterTapSize: formData.alterationAfterTapSize,
      alterationAfterPurpose: formData.alterationAfterPurpose,
      disconnectionReason: formData.disconnectionReason,
      finalMeterReading: formData.finalMeterReading,
      disconnectionDate: formData.disconnectionDate,
      refundRequired: formData.refundRequired,
      // New disconnection fields
      meterDisconnection: formData.meterDisconnection,
      restartMeter: formData.restartMeter,
      connectionClose: formData.connectionClose,
      connectionStart: formData.connectionStart,
      disconnectionRemarks: formData.disconnectionRemarks,
      status: 'Upload Note Sheet', // Change status to Upload Note Sheet
      stage: 'Document Upload', // Change stage
    };
    
    // Update application and close modal first
    onUpdate(updatedApp);
    
    // Show success message
    toast.success('Application submitted successfully!', {
      description: `Application ${application.applicationNo} has been updated and moved to "Upload Note Sheet" status.`,
    });
    
    // Accessibility: Announce success
    announce(`Application ${application.applicationNo} submitted successfully`);
    
    onClose();
    
    // Call onSuccess callback if provided (this will trigger success dialog from parent)
    if (onSuccess) {
      onSuccess(application.applicationNo);
    }
  };

  const handleReject = () => {
    // Accessibility: Announce rejection action
    announce(`Rejecting application ${application.applicationNo}`);
    onUpdate({
      ...application,
      status: 'Rejected',
    });
    onClose();
    toast.error('Application rejected!');
  };

  const handleRevertToConsumer = () => {
    if (window.confirm('Are you sure you want to revert this application to the consumer?')) {
      // Accessibility: Announce revert action
      announce(`Reverting application ${application.applicationNo} to consumer`);
      onUpdate({
        ...application,
        status: 'Reverted to Consumer',
      });
      onClose();
      toast.warning('🔄 Application reverted to consumer!', {
        description: 'Consumer needs to resubmit the application with corrections.',
      });
    }
  };

  // Calculate days pending - safely handle date parsing
  let daysPending = 0;
  let dateDisplay = 'Invalid Date';
  let isValidDate = false;
  try {
    const appDate = new Date(application.date);
    if (!isNaN(appDate.getTime())) {
      isValidDate = true;
      daysPending = Math.floor((new Date().getTime() - appDate.getTime()) / (1000 * 60 * 60 * 24));
      daysPending = Math.max(0, daysPending);
      dateDisplay = appDate.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  } catch (e) {
    daysPending = 0;
  }

  // Render AFTER section for Alteration/Mutation (to be placed in separate row)
  const renderAfterSection = () => {
    if (applicationType === 'Mutation') {
      return (
        <div className="bg-white rounded-xl shadow-lg border border-blue-300/40 overflow-hidden">
          <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-blue-200">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-100 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1976D2]" />
            </div>
            <span className="text-xs sm:text-sm text-[#1976D2]" style={{ fontWeight: 700 }}>AFTER - Requested Changes</span>
          </div>
          
          <div className="p-2 sm:p-3">
            {/* Mutation Reason - Full Width */}
            <div className="mb-3">
              <label className="flex items-center gap-1.5 text-purple-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                <MessageSquare className="w-3.5 h-3.5" />
                Mutation Reason
              </label>
              <Input
                value={formData.mutationReason}
                disabled
                className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-8 text-xs"
                placeholder="Reason for mutation"
              />
            </div>

            {/* New Consumer Name and Mobile - Same Row */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                  <User className="w-3.5 h-3.5" />
                  New Consumer Name
                </label>
                <Input
                  value={formData.mutationNewName}
                  onChange={(e) => setFormData({ ...formData, mutationNewName: e.target.value })}
                  className="border border-blue-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-8 text-xs"
                  placeholder="Enter new name"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                  <Phone className="w-3.5 h-3.5" />
                  New Mobile Number
                </label>
                <Input
                  value={formData.mutationNewMobile}
                  onChange={(e) => setFormData({ ...formData, mutationNewMobile: e.target.value })}
                  className="border border-blue-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-8 text-xs"
                  placeholder="Enter new mobile"
                />
              </div>
            </div>

            {/* New Address - Full Width */}
            <div className="mb-3">
              <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                <MapPin className="w-3.5 h-3.5" />
                New Address
              </label>
              <Input
                value={formData.mutationNewAddress}
                onChange={(e) => setFormData({ ...formData, mutationNewAddress: e.target.value })}
                className="border border-blue-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-8 text-xs"
                placeholder="Enter new address"
              />
            </div>

            {/* Property details in one horizontal row for compact display - Hidden for Mutation */}
            {applicationType !== 'Mutation' && (
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              <div>
                <label className="flex items-center gap-1 text-blue-700 text-[10px] sm:text-xs mb-1" style={{ fontWeight: 700 }}>
                  <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Property Type
                </label>
                <select
                  value={formData.afterPropertyType}
                  onChange={(e) => setFormData({ ...formData, afterPropertyType: e.target.value })}
                  className="w-full px-1.5 sm:px-2.5 py-1 sm:py-1.5 border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-[10px] sm:text-xs"
                >
                  <option value="building">building</option>
                  <option value="plot">plot</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1 text-blue-700 text-[10px] sm:text-xs mb-1" style={{ fontWeight: 700 }}>
                  <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Building Type
                </label>
                <select
                  value={formData.afterBuildingType}
                  onChange={(e) => setFormData({ ...formData, afterBuildingType: e.target.value })}
                  disabled={formData.afterPropertyType === 'plot'}
                  className={`w-full px-1.5 sm:px-2.5 py-1 sm:py-1.5 border rounded-lg focus:ring-1 outline-none text-[10px] sm:text-xs ${
                    formData.afterPropertyType === 'plot'
                      ? 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'border-blue-300 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                >
                  <option value="House">House</option>
                  <option value="Shop">Shop</option>
                  <option value="Petrol Pump">Petrol Pump</option>
                  <option value="Factory">Factory</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Office">Office</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1 text-blue-700 text-[10px] sm:text-xs mb-1" style={{ fontWeight: 700 }}>
                  <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Connection Category
                </label>
                <select
                  value={formData.afterConnectionCategory}
                  onChange={(e) => setFormData({ ...formData, afterConnectionCategory: e.target.value })}
                  className="w-full px-1.5 sm:px-2.5 py-1 sm:py-1.5 border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-[10px] sm:text-xs"
                >
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1 text-blue-700 text-[10px] sm:text-xs mb-1" style={{ fontWeight: 700 }}>
                  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Connection Type
                </label>
                <select
                  value={formData.afterConnectionType}
                  onChange={(e) => setFormData({ ...formData, afterConnectionType: e.target.value })}
                  className="w-full px-1.5 sm:px-2.5 py-1 sm:py-1.5 border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-[10px] sm:text-xs"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
            </div>
            )}
          </div>
        </div>
      );
    }

    if (applicationType === 'Alteration') {
      return (
        <div className="bg-white rounded-xl shadow-lg border border-blue-300/40 overflow-hidden">
          <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-green-200">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16A34A]" />
            </div>
            <span className="text-xs sm:text-sm text-[#16A34A]" style={{ fontWeight: 700 }}>AFTER - New Connection (Editable)</span>
          </div>
          
          <div className="p-2 sm:p-3">
            {/* Alteration Reason - Full Width */}
            <div className="mb-3">
              <label className="flex items-center gap-1.5 text-purple-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                <MessageSquare className="w-3.5 h-3.5" />
                Alteration Reason
              </label>
              <Input
                value={formData.alterationReason}
                onChange={(e) => setFormData({ ...formData, alterationReason: e.target.value })}
                className="border border-blue-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-8 text-xs"
                placeholder="Reason for alteration"
              />
            </div>

            {/* Property Type Radio Buttons */}
            <div className="mb-3">
              <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1.5" style={{ fontWeight: 700 }}>
                <Building2 className="w-3.5 h-3.5" />
                Property Type
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="alterationAfterPropertyType"
                    value="building"
                    checked={formData.alterationAfterPropertyType === 'building'}
                    onChange={(e) => setFormData({ ...formData, alterationAfterPropertyType: e.target.value })}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-blue-900" style={{ fontWeight: 600 }}>Building</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="alterationAfterPropertyType"
                    value="plot"
                    checked={formData.alterationAfterPropertyType === 'plot'}
                    onChange={(e) => setFormData({ ...formData, alterationAfterPropertyType: e.target.value })}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-blue-900" style={{ fontWeight: 600 }}>Plot</span>
                </label>
              </div>
            </div>

            {/* Row 1: Building Type and Connection Category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                  <Building2 className="w-3.5 h-3.5" />
                  Building Type
                </label>
                <select
                  value={formData.alterationAfterBuildingType}
                  onChange={(e) => setFormData({ ...formData, alterationAfterBuildingType: e.target.value })}
                  disabled={formData.alterationAfterPropertyType === 'plot'}
                  className={`w-full px-2.5 py-1.5 border rounded-lg focus:ring-1 outline-none text-xs ${
                    formData.alterationAfterPropertyType === 'plot'
                      ? 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'border-blue-300 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                >
                  <option value="House">House</option>
                  <option value="Shop">Shop</option>
                  <option value="Petrol Pump">Petrol Pump</option>
                  <option value="Factory">Factory</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Office">Office</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                  <Activity className="w-3.5 h-3.5" />
                  Connection Category
                </label>
                <select
                  value={formData.alterationAfterConnectionCategory}
                  onChange={(e) => setFormData({ ...formData, alterationAfterConnectionCategory: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-xs"
                >
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>

            {/* Row 2: Connection Type and Connection Count */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                  <Zap className="w-3.5 h-3.5" />
                  Connection Type
                </label>
                <select
                  value={formData.alterationAfterConnectionType}
                  onChange={(e) => setFormData({ ...formData, alterationAfterConnectionType: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-xs"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                  <Hash className="w-3.5 h-3.5" />
                  Connection Count
                </label>
                <Input
                  type="number"
                  value={formData.alterationAfterConnectionCount}
                  onChange={(e) => setFormData({ ...formData, alterationAfterConnectionCount: e.target.value })}
                  className="border border-blue-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-8 text-xs"
                  placeholder="e.g., 1"
                />
              </div>
            </div>

            {/* Row 3: Tap Size and Purpose */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                  <Gauge className="w-3.5 h-3.5" />
                  Tap Size
                </label>
                <select
                  value={formData.alterationAfterTapSize}
                  onChange={(e) => setFormData({ ...formData, alterationAfterTapSize: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-xs"
                >
                  <option value="15mm">15mm</option>
                  <option value="20mm">20mm</option>
                  <option value="25mm">25mm</option>
                  <option value="32mm">32mm</option>
                  <option value="40mm">40mm</option>
                  <option value="50mm">50mm</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                  <Activity className="w-3.5 h-3.5" />
                  Purpose
                </label>
                <Input
                  value={formData.alterationAfterPurpose}
                  onChange={(e) => setFormData({ ...formData, alterationAfterPurpose: e.target.value })}
                  className="border border-blue-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-8 text-xs"
                  placeholder="Enter purpose"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Render dynamic fields based on application type
  const renderApplicationTypeFields = () => {
    switch (applicationType) {
      case 'New Connection':
        return (
          <>
            {/* Is Old Consumer Checkbox */}
            {/* <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-3 border border-cyan-300 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isOldConsumer}
                  onChange={(e) => setFormData({ ...formData, isOldConsumer: e.target.checked })}
                  className="w-4 h-4 text-cyan-600 focus:ring-cyan-500 rounded"
                />
                <span className="text-sm text-cyan-900" style={{ fontWeight: 600 }}>Is Old Consumer</span>
              </label>
            </div> */}

            {/* Property Type Radio Buttons */}
            <fieldset className="bg-white rounded-lg p-3 border border-blue-300 mb-3">
              <legend className="flex items-center gap-1.5 text-blue-700 text-xs mb-2" style={{ fontWeight: 700 }}>
                <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                Property Type
              </legend>
              <div className="flex items-center gap-6" role="radiogroup" aria-label="Property type selection">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="propertyType"
                    value="building"
                    checked={formData.propertyType === 'building'}
                    onChange={(e) => {
                      setFormData({ ...formData, propertyType: e.target.value });
                      announce('Property type changed to Building');
                    }}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    aria-label="Building property type"
                  />
                  <span className="text-sm text-blue-900" style={{ fontWeight: 600 }}>Building</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="propertyType"
                    value="plot"
                    checked={formData.propertyType === 'plot'}
                    onChange={(e) => {
                      setFormData({ ...formData, propertyType: e.target.value });
                      announce('Property type changed to Plot');
                    }}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    aria-label="Plot property type"
                  />
                  <span className="text-sm text-blue-900" style={{ fontWeight: 600 }}>Plot</span>
                </label>
              </div>
            </fieldset>

            {/* Building Type and Connection Category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label 
                  htmlFor="building-type-select"
                  className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" 
                  style={{ fontWeight: 700 }}
                >
                  <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Building Type
                </label>
                <select
                  id="building-type-select"
                  value={formData.buildingType}
                  onChange={(e) => {
                    setFormData({ ...formData, buildingType: e.target.value });
                    announce(`Building type changed to ${e.target.value}`);
                  }}
                  disabled={formData.propertyType === 'plot'}
                  className={`w-full px-2.5 py-1.5 border rounded-lg focus:ring-1 outline-none text-xs ${
                    formData.propertyType === 'plot'
                      ? 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'border-blue-300 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                  aria-required="true"
                  aria-disabled={formData.propertyType === 'plot'}
                >
                  <option value="House">House</option>
                  <option value="Shop">Shop</option>
                  <option value="Petrol Pump">Petrol Pump</option>
                  <option value="Factory">Factory</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Office">Office</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-purple-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                  <Activity className="w-3.5 h-3.5" />
                  Connection Category
                </label>
                <select
                  value={formData.connectionCategory}
                  onChange={(e) => setFormData({ ...formData, connectionCategory: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-xs"
                >
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>

            {/* Multiple Connection Radio Button */}
            <div className="mb-3">
              <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-2" style={{ fontWeight: 700 }}>
                <Hash className="w-3.5 h-3.5" />
                Connection Mode
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="multipleConnection"
                    checked={!formData.isMultipleConnection}
                    onChange={() => {
                      setFormData({ 
                        ...formData, 
                        isMultipleConnection: false,
                        connectionCount: '1',
                        connections: [{ tapSize: '15mm', connectionType: 'Residential' }]
                      });
                    }}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-blue-900" style={{ fontWeight: 600 }}>Single Connection</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="multipleConnection"
                    checked={formData.isMultipleConnection}
                    onChange={() => {
                      setFormData({ 
                        ...formData, 
                        isMultipleConnection: true,
                        connectionCount: '1',
                        connections: [{ tapSize: '15mm', connectionType: 'Residential' }]
                      });
                    }}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-blue-900" style={{ fontWeight: 600 }}>Multiple Connection</span>
                </label>
              </div>
            </div>

            {/* Connection Type (for Single Connection) */}
            {!formData.isMultipleConnection && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                    <Zap className="w-3.5 h-3.5" />
                    Connection Type
                  </label>
                  <select
                    value={formData.applicantType}
                    onChange={(e) => setFormData({ ...formData, applicantType: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-xs"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                    <Gauge className="w-3.5 h-3.5" />
                    Tap Size
                  </label>
                  <select
                    value={formData.tapSize}
                    onChange={(e) => setFormData({ ...formData, tapSize: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-xs"
                  >
                    <option value="15mm">15mm</option>
                    <option value="20mm">20mm</option>
                    <option value="25mm">25mm</option>
                    <option value="32mm">32mm</option>
                    <option value="40mm">40mm</option>
                    <option value="50mm">50mm</option>
                  </select>
                </div>
              </div>
            )}

            {/* Connection Count (for Multiple Connection) */}
            {formData.isMultipleConnection && (
              <div className="mb-3">
                <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                  <Hash className="w-3.5 h-3.5" />
                  Connection Count
                </label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.connectionCount}
                  onChange={(e) => {
                    const count = parseInt(e.target.value) || 1;
                    const newConnections = Array.from({ length: count }, (_, i) => 
                      formData.connections[i] || { tapSize: '15mm', connectionType: 'Residential' }
                    );
                    setFormData({ 
                      ...formData, 
                      connectionCount: e.target.value,
                      connections: newConnections
                    });
                  }}
                  className="border border-blue-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-8 text-xs w-full"
                  placeholder="Enter number of connections"
                />
              </div>
            )}

            {/* Dynamic Connection Rows (for Multiple Connection) */}
            {formData.isMultipleConnection && formData.connections.map((connection, index) => (
              <div key={index} className="bg-white border border-blue-200 rounded-lg p-3 mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-xs text-white" style={{ fontWeight: 700 }}>{index + 1}</span>
                  </div>
                  <span className="text-xs text-blue-900" style={{ fontWeight: 700 }}>Connection {index + 1}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-orange-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                      <Gauge className="w-3.5 h-3.5" />
                      Tap Size
                    </label>
                    <select
                      value={connection.tapSize}
                      onChange={(e) => {
                        const newConnections = [...formData.connections];
                        newConnections[index] = { ...newConnections[index], tapSize: e.target.value };
                        setFormData({ ...formData, connections: newConnections });
                      }}
                      className="w-full px-2.5 py-1.5 border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-xs"
                    >
                      <option value="15mm">15mm</option>
                      <option value="20mm">20mm</option>
                      <option value="25mm">25mm</option>
                      <option value="32mm">32mm</option>
                      <option value="40mm">40mm</option>
                      <option value="50mm">50mm</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                      <Zap className="w-3.5 h-3.5" />
                      Connection Type
                    </label>
                    <select
                      value={connection.connectionType}
                      onChange={(e) => {
                        const newConnections = [...formData.connections];
                        newConnections[index] = { ...newConnections[index], connectionType: e.target.value };
                        setFormData({ ...formData, connections: newConnections });
                      }}
                      className="w-full px-2.5 py-1.5 border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-xs"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* Purpose Field - Always visible */}
            
          </>
        );

      case 'Mutation':
        return (
          <div className="bg-white rounded-xl shadow-lg border border-blue-300/40 overflow-hidden">
            <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-orange-200">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-orange-100 flex items-center justify-center">
                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F97316]" />
              </div>
              <span className="text-xs sm:text-sm text-[#F97316]" style={{ fontWeight: 700 }}>BEFORE - Current Connection</span>
            </div>
            
            <div className="p-2 sm:p-3">
              {/* Consumer details for Mutation - Read Only */}
              {applicationType === 'Mutation' && (
                <div className="space-y-2 sm:space-y-3">
                  {/* Consumer Name and Mobile - Same Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <label className="flex items-center gap-1 sm:gap-1.5 text-orange-700 text-[10px] sm:text-xs mb-1" style={{ fontWeight: 700 }}>
                        <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        Current Consumer Name
                      </label>
                      <Input
                        value={formData.consumerName || 'N/A'}
                        disabled
                        className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1 sm:gap-1.5 text-orange-700 text-[10px] sm:text-xs mb-1" style={{ fontWeight: 700 }}>
                        <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        Current Mobile Number
                      </label>
                      <Input
                        value={formData.mobileNumber || 'N/A'}
                        disabled
                        className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs"
                      />
                    </div>
                  </div>

                  {/* Address - Full Width */}
                  <div>
                    <label className="flex items-center gap-1 sm:gap-1.5 text-orange-700 text-[10px] sm:text-xs mb-1" style={{ fontWeight: 700 }}>
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Current Address
                    </label>
                    <Input
                      value={formData.address || 'N/A'}
                      disabled
                      className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs"
                    />
                  </div>
                </div>
              )}

              {/* All fields in one horizontal row for compact display - Hidden for Mutation */}
              {applicationType !== 'Mutation' && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                <div>
                  <label className="flex items-center gap-1 text-orange-700 text-[10px] sm:text-xs mb-1" style={{ fontWeight: 700 }}>
                    <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Property Type
                  </label>
                  <Input
                    value={formData.beforePropertyType}
                    disabled
                    className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 text-orange-700 text-[10px] sm:text-xs mb-1" style={{ fontWeight: 700 }}>
                    <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Building Type
                  </label>
                  <Input
                    value={formData.beforeBuildingType}
                    disabled
                    className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 text-orange-700 text-[10px] sm:text-xs mb-1" style={{ fontWeight: 700 }}>
                    <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Connection Category
                  </label>
                  <Input
                    value={formData.beforeConnectionCategory}
                    disabled
                    className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 text-orange-700 text-[10px] sm:text-xs mb-1" style={{ fontWeight: 700 }}>
                    <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Connection Type
                  </label>
                  <Input
                    value={formData.beforeConnectionType}
                    disabled
                    className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs"
                  />
                </div>
              </div>
              )}
            </div>
          </div>
        );

      case 'Alteration':
        return (
          <div className="bg-white rounded-xl shadow-lg border border-blue-300/40 overflow-hidden">
            <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-gray-300">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gray-200 flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
              </div>
              <span className="text-xs sm:text-sm text-gray-700" style={{ fontWeight: 700 }}>BEFORE - Current Connection (Read Only)</span>
            </div>
            
            <div className="p-2 sm:p-3">
              
              {/* Property Type Radio Buttons - Read Only */}
              <div className="mb-3">
                <label className="flex items-center gap-1.5 text-orange-700 text-xs mb-2" style={{ fontWeight: 700 }}>
                  <Building2 className="w-3.5 h-3.5" />
                  Property Type
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 opacity-60 cursor-not-allowed">
                    <input
                      type="radio"
                      name="alterationBeforePropertyType"
                      value="building"
                      checked={formData.alterationBeforePropertyType === 'building'}
                      disabled
                      className="w-4 h-4 text-orange-600"
                    />
                    <span className="text-sm text-blue-900" style={{ fontWeight: 600 }}>Building</span>
                  </label>
                  <label className="flex items-center gap-2 opacity-60 cursor-not-allowed">
                    <input
                      type="radio"
                      name="alterationBeforePropertyType"
                      value="plot"
                      checked={formData.alterationBeforePropertyType === 'plot'}
                      disabled
                      className="w-4 h-4 text-orange-600"
                    />
                    <span className="text-sm text-blue-900" style={{ fontWeight: 600 }}>Plot</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-orange-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                    <Building2 className="w-3.5 h-3.5" />
                    Building Type
                  </label>
                  <select
                    value={formData.alterationBeforeBuildingType}
                    disabled
                    className="w-full px-2.5 py-1.5 border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg focus:ring-1 outline-none text-xs"
                  >
                    <option value="House">House</option>
                    <option value="Shop">Shop</option>
                    <option value="Petrol Pump">Petrol Pump</option>
                    <option value="Factory">Factory</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Office">Office</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-orange-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                    <Activity className="w-3.5 h-3.5" />
                    Connection Category
                  </label>
                  <select
                    value={formData.alterationBeforeConnectionCategory}
                    disabled
                    className="w-full px-2.5 py-1.5 border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg outline-none text-xs"
                  >
                    <option value="Quarterly">Quarterly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="flex items-center gap-1.5 text-orange-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                    <Zap className="w-3.5 h-3.5" />
                    Connection Type
                  </label>
                  <select
                    value={formData.alterationBeforeConnectionType}
                    disabled
                    className="w-full px-2.5 py-1.5 border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg outline-none text-xs"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-orange-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                    <Hash className="w-3.5 h-3.5" />
                    Connection Count
                  </label>
                  <Input
                    type="number"
                    value={formData.alterationBeforeConnectionCount}
                    disabled
                    className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-8 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="flex items-center gap-1.5 text-orange-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                    <Gauge className="w-3.5 h-3.5" />
                    Tap Size
                  </label>
                  <select
                    value={formData.alterationBeforeTapSize}
                    disabled
                    className="w-full px-2.5 py-1.5 border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg outline-none text-xs"
                  >
                    <option value="15mm">15mm</option>
                    <option value="20mm">20mm</option>
                    <option value="25mm">25mm</option>
                    <option value="32mm">32mm</option>
                    <option value="40mm">40mm</option>
                    <option value="50mm">50mm</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-orange-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                    <Activity className="w-3.5 h-3.5" />
                    Purpose
                  </label>
                  <Input
                    value={formData.alterationBeforePurpose}
                    disabled
                    className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-8 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'Disconnection':
      case 'Disconnect Connection':
        return (
          <>
            {/* Disconnection Radio Buttons */}
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-4">
                <h4 className="text-red-700 mb-3 flex items-center gap-2" style={{ fontWeight: 700 }}>
                  <Slash className="w-4 h-4" />
                  Disconnection Actions
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* Meter Disconnection */}
                  <label className={`flex items-center gap-2.5 cursor-pointer bg-white/70 backdrop-blur-sm p-3 rounded-lg border transition-all ${
                    formData.disconnectionAction === 'meterDisconnection' 
                      ? 'border-red-400 bg-red-50/50 shadow-md' 
                      : 'border-red-200/50 hover:bg-white/90'
                  }`}>
                    <input
                      type="radio"
                      name="disconnectionAction"
                      value="meterDisconnection"
                      checked={formData.disconnectionAction === 'meterDisconnection'}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData(prev => ({ ...prev, disconnectionAction: value }));
                      }}
                      className="w-4 h-4 border-red-300 text-red-600 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-red-600" />
                      <span className="text-slate-700 text-xs" style={{ fontWeight: 600 }}>
                        Meter Disconnection
                      </span>
                    </div>
                  </label>

                  {/* Restart Meter */}
                  <label className={`flex items-center gap-2.5 cursor-pointer bg-white/70 backdrop-blur-sm p-3 rounded-lg border transition-all ${
                    formData.disconnectionAction === 'restartMeter' 
                      ? 'border-blue-400 bg-blue-50/50 shadow-md' 
                      : 'border-blue-200/50 hover:bg-white/90'
                  }`}>
                    <input
                      type="radio"
                      name="disconnectionAction"
                      value="restartMeter"
                      checked={formData.disconnectionAction === 'restartMeter'}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData(prev => ({ ...prev, disconnectionAction: value }));
                      }}
                      className="w-4 h-4 border-blue-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-blue-600" />
                      <span className="text-slate-700 text-xs" style={{ fontWeight: 600 }}>
                        Restart Meter
                      </span>
                    </div>
                  </label>

                  {/* Connection Close */}
                  <label className={`flex items-center gap-2.5 cursor-pointer bg-white/70 backdrop-blur-sm p-3 rounded-lg border transition-all ${
                    formData.disconnectionAction === 'connectionClose' 
                      ? 'border-blue-400 bg-blue-50/50 shadow-md' 
                      : 'border-blue-200/50 hover:bg-white/90'
                  }`}>
                    <input
                      type="radio"
                      name="disconnectionAction"
                      value="connectionClose"
                      checked={formData.disconnectionAction === 'connectionClose'}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData(prev => ({ ...prev, disconnectionAction: value }));
                      }}
                      className="w-4 h-4 border-blue-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-600" />
                      <span className="text-slate-700 text-xs" style={{ fontWeight: 600 }}>
                        Connection Close
                      </span>
                    </div>
                  </label>

                  {/* Connection Start */}
                  <label className={`flex items-center gap-2.5 cursor-pointer bg-white/70 backdrop-blur-sm p-3 rounded-lg border transition-all ${
                    formData.disconnectionAction === 'connectionStart' 
                      ? 'border-blue-400 bg-blue-50/50 shadow-md' 
                      : 'border-blue-200/50 hover:bg-white/90'
                  }`}>
                    <input
                      type="radio"
                      name="disconnectionAction"
                      value="connectionStart"
                      checked={formData.disconnectionAction === 'connectionStart'}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData(prev => ({ ...prev, disconnectionAction: value }));
                      }}
                      className="w-4 h-4 border-blue-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="text-slate-700 text-xs" style={{ fontWeight: 600 }}>
                        Connection Start
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Remarks Field */}
              <div>
                <label className="flex items-center gap-1.5 text-slate-700 text-xs mb-1.5" style={{ fontWeight: 700 }}>
                  <MessageSquare className="w-3.5 h-3.5" />
                  Remarks
                </label>
                <textarea
                  value={formData.disconnectionRemarks}
                  onChange={(e) => setFormData({ ...formData, disconnectionRemarks: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 rounded-lg text-xs outline-none resize-none"
                  placeholder="Enter any remarks or additional information about the disconnection..."
                  rows={3}
                />
              </div>
            </div>
          </>
        );

      case 'Correction in Demand Bill':
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="flex items-center gap-1.5 text-red-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                  <FileText className="w-3.5 h-3.5" />
                  Reason for Correction
                </label>
                <Input
                  value={formData.disconnectionReason || 'Bill correction required'}
                  onChange={(e) => setFormData({ ...formData, disconnectionReason: e.target.value })}
                  className="border border-red-300 focus:border-red-500 focus:ring-red-500 rounded-lg h-8 text-xs"
                  placeholder="Enter reason"
                />
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Accessibility: ARIA live region for announcements */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      
      <DialogContent 
        ref={modalRef}
        className="w-[98vw] sm:w-[96vw] lg:w-[96vw] !max-w-none p-0 bg-slate-50 border sm:border-2 border-blue-400/50 shadow-2xl max-h-[95vh] flex flex-col overflow-hidden"
        aria-describedby={undefined}
      >
        {/* Header */}
        <DialogHeader className="relative bg-[#1976D2] px-3 sm:px-6 py-3 sm:py-4 text-white flex-shrink-0 border-b-2 border-white/20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-30"></div>
          <div className="relative flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg flex-shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-white m-0 text-sm sm:text-lg truncate" style={{ fontWeight: 800 }}>
                  Edit Application Details
                </DialogTitle>
                <DialogDescription 
                  id="modal-description"
                  className="text-blue-100 text-[10px] sm:text-xs mt-0.5 truncate"
                >
                  {application.applicationNo}
                </DialogDescription>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-xl border border-blue-300 flex-shrink-0">
              <div className="text-[10px] sm:text-xs text-white" style={{ fontWeight: 700 }}>Days</div>
              <div className="text-lg sm:text-2xl text-white" style={{ fontWeight: 900 }}>{daysPending}</div>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-2 sm:p-3 overflow-y-auto flex-1">
          {applicationType === 'Alteration' || applicationType === 'Mutation' ? (
            // Alteration and Mutation-specific layout with tax sections
            <>
              {/* Application Details - One Row with all 4 cards */}
              <div className="bg-white rounded-xl shadow-lg border border-blue-200 overflow-hidden mb-3">
                <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-blue-200">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1976D2]" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#1976D2]" style={{ fontWeight: 700 }}>Application Details</span>
                </div>
                
                <div className="p-2 sm:p-3">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
                    {/* Application No */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-2.5">
                      <div className="flex items-center gap-1 mb-1">
                        <Hash className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                        <span className="text-[9px] sm:text-[10px] text-gray-900" style={{ fontWeight: 600 }}>Application No</span>
                      </div>
                      <div className="text-blue-900 text-xs sm:text-sm break-all" style={{ fontWeight: 700 }}>
                        {application.applicationNo}
                      </div>
                    </div>

                    {/* Applicant Name */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-2.5">
                      <div className="flex items-center gap-1 mb-1">
                        <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                        <span className="text-[9px] sm:text-[10px] text-gray-900" style={{ fontWeight: 600 }}>Applicant Name</span>
                      </div>
                      <div className="text-blue-900 text-xs sm:text-sm break-words leading-tight" style={{ fontWeight: 700 }}>
                        {application.applicantName}
                      </div>
                    </div>

                    {/* Consumer No - Hidden for New Connection */}
                    {applicationType !== 'New Connection' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-2.5">
                        <div className="flex items-center gap-1 mb-1">
                          <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                          <span className="text-[9px] sm:text-[10px] text-gray-900" style={{ fontWeight: 600 }}>Consumer No</span>
                        </div>
                        <div className="text-blue-900 text-xs sm:text-sm break-all" style={{ fontWeight: 700 }}>
                          {application.consumerNo}
                        </div>
                      </div>
                    )}

                    {/* Date */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-2.5">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                        <span className="text-[9px] sm:text-[10px] text-gray-900" style={{ fontWeight: 600 }}>Date</span>
                      </div>
                      <div className="text-blue-900 text-xs sm:text-sm" style={{ fontWeight: 700 }}>
                        {isValidDate ? dateDisplay : 'Invalid Date'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consumer Details - Full Section with Expand/Collapse */}
              <div className="bg-white rounded-xl shadow-lg border border-blue-200 overflow-hidden mb-3">
                <button
                  type="button"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-blue-200"
                  onClick={() => {
                    setIsConsumerDetailsExpanded(!isConsumerDetailsExpanded);
                    announce(`Consumer Details section ${!isConsumerDetailsExpanded ? 'expanded' : 'collapsed'}`);
                  }}
                  aria-expanded={isConsumerDetailsExpanded}
                  aria-controls="consumer-details-content"
                  aria-label={`${isConsumerDetailsExpanded ? 'Collapse' : 'Expand'} Consumer Details section`}
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1976D2]" />
                  </div>
                  <span className="text-xs sm:text-sm flex-1 text-[#1976D2]" style={{ fontWeight: 700 }}>Consumer Details</span>
                  <motion.div
                    animate={{ rotate: isConsumerDetailsExpanded ? 180 : 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isConsumerDetailsExpanded && (
                    <motion.div
                      id="consumer-details-content"
                      role="region"
                      aria-labelledby="consumer-details-heading"
                      initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
                  {/* Zone No, Ward No, Property No */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                    <div>
                      <label 
                        htmlFor="zone-input"
                        className="flex items-center gap-0.5 sm:gap-1.5 text-blue-700 text-[9px] sm:text-xs mb-0.5 sm:mb-1" 
                        style={{ fontWeight: 700 }}
                      >
                        <MapPin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                        Zone
                      </label>
                      <Input
                        id="zone-input"
                        value={formData.zoneNo}
                        onChange={(e) => setFormData({ ...formData, zoneNo: e.target.value })}
                        className="border border-blue-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs"
                        placeholder="Zone"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="ward-input"
                        className="flex items-center gap-0.5 sm:gap-1.5 text-blue-700 text-[9px] sm:text-xs mb-0.5 sm:mb-1" 
                        style={{ fontWeight: 700 }}
                      >
                        <Hash className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                        Ward
                      </label>
                      <Input
                        id="ward-input"
                        value={formData.wardNo}
                        onChange={(e) => setFormData({ ...formData, wardNo: e.target.value })}
                        className="border border-blue-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs"
                        placeholder="Ward"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="property-input"
                        className="flex items-center gap-0.5 sm:gap-1.5 text-blue-700 text-[9px] sm:text-xs mb-0.5 sm:mb-1" 
                        style={{ fontWeight: 700 }}
                      >
                        <Hash className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                        Property
                      </label>
                      <Input
                        id="property-input"
                        value={formData.propertyNo}
                        onChange={(e) => setFormData({ ...formData, propertyNo: e.target.value })}
                        className="border border-blue-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs"
                        placeholder="Property"
                        aria-required="true"
                      />
                    </div>
                  </div>

                  {/* Upload Document */}
                  <div>
                    <span 
                      id="upload-documents-label"
                      className="flex items-center gap-1 sm:gap-1.5 text-blue-700 text-[10px] sm:text-xs mb-1 sm:mb-1.5" 
                      style={{ fontWeight: 700 }}
                    >
                      <Upload className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                      Upload Documents
                    </span>

                    {/* Required Documents Checklist - Compact 2-column Grid */}
                    <div className="mb-2 p-2 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg">
                      <p className="text-[9px] sm:text-[10px] text-blue-800 mb-1.5" style={{ fontWeight: 700 }}>
                        Required Documents:
                      </p>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                        {getRequiredDocuments(applicationType).map((doc, index) => (
                          <div key={index} className="flex items-start gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-[8px] sm:text-[9px] text-slate-700 leading-tight">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <input
                      id="file-upload-input-alteration"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      aria-labelledby="upload-documents-label"
                      aria-describedby="file-upload-description"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <span id="file-upload-description" className="sr-only">
                      Upload supporting documents for this application. Multiple files allowed. Accepted file types: PDF, JPG, PNG
                    </span>
                    <label
                      htmlFor="file-upload-input-alteration"
                      className="flex items-center justify-center gap-1.5 sm:gap-2 w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50/60 border border-dashed border-blue-300/50 rounded-lg cursor-pointer hover:border-blue-500/70 hover:bg-blue-100/70 transition-all text-[10px] sm:text-xs text-blue-700 focus-within:ring-2 focus-within:ring-blue-400/50"
                      style={{ fontWeight: 600 }}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          document.getElementById('file-upload-input-alteration')?.click();
                        }
                      }}
                    >
                      <Upload className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                      <span>{selectedFiles.length > 0 ? `${selectedFiles.length} file(s) selected` : 'Choose Files'}</span>
                    </label>

                    {/* Uploaded Files List - Compact Display */}
                    {selectedFiles.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {selectedFiles.map((file, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between gap-2 px-2 py-1 bg-white border border-blue-200 rounded text-[9px] sm:text-[10px]"
                          >
                            <div className="flex items-center gap-1.5 flex-1 min-w-0">
                              <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600 flex-shrink-0" aria-hidden="true" />
                              <span className="text-slate-700 truncate" title={file.name}>{file.name}</span>
                              <span className="text-slate-500 text-[8px] sm:text-[9px] flex-shrink-0">
                                ({(file.size / 1024).toFixed(1)} KB)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded p-0.5 transition-colors flex-shrink-0"
                              aria-label={`Remove ${file.name}`}
                            >
                              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* BEFORE and AFTER sections side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
                {/* BEFORE Section */}
                {renderApplicationTypeFields()}

                {/* AFTER Section */}
                {renderAfterSection()}
              </div>

              {/* Pending Tax and Running Tax Sections - For Alteration Only */}
              {applicationType === 'Alteration' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
                {/* Pending Tax Section */}
                <div className="bg-white rounded-xl shadow-lg border border-blue-300/40 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-amber-200">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                      <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
                    </div>
                    <span className="text-xs sm:text-sm text-amber-700" style={{ fontWeight: 700 }}>Pending Tax</span>
                  </div>
                  
                  <div className="p-2 sm:p-3">
                    {/* Quarter Selection and Year */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div>
                        <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                          Quarter
                        </label>
                        <Input
                          value={pendingTaxQuarter}
                          readOnly
                          className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-8 text-xs"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                          Year
                        </label>
                        <Input
                          type="number"
                          value={pendingTaxYear}
                          onChange={(e) => setPendingTaxYear(e.target.value)}
                          className="border border-blue-300 rounded-lg h-8 text-xs focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                          Total Tax
                        </label>
                        <Input
                          type="number"
                          value={pendingTaxTotal}
                          onChange={(e) => setPendingTaxTotal(e.target.value)}
                          className="border border-blue-300 rounded-lg h-8 text-xs focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                          Interest
                        </label>
                        <Input
                          type="number"
                          value={pendingTaxInterest}
                          onChange={(e) => handlePendingTaxInterestChange(e.target.value)}
                          className="border border-blue-300 rounded-lg h-8 text-xs focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                          Payable Amount
                        </label>
                        <Input
                          type="number"
                          value={pendingTaxPayable}
                          readOnly
                          className="border border-blue-200 bg-blue-50 rounded-lg h-8 text-xs"
                        />
                      </div>
                    </div>

                    {/* Is Runtime Interest Checkbox and Add Button */}
                    <div className="mb-3 flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pendingTaxRuntimeInterest}
                          onChange={(e) => setPendingTaxRuntimeInterest(e.target.checked)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="text-xs text-blue-900" style={{ fontWeight: 600 }}>Is Runtime Interest</span>
                      </label>
                      <WaterRipple color="rgba(245, 158, 11, 0.3)">
                        <Button
                          onClick={handleAddRunningTaxRow}
                          className="bg-gradient-to-r from-blue-400/80 via-blue-400/70 to-blue-500/80 hover:from-blue-500/90 hover:to-blue-600/90 text-white h-7 px-3 rounded-lg shadow-md text-xs flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </Button>
                      </WaterRipple>
                    </div>

                    {/* Tax Details Table */}
                    <div className="overflow-x-auto border border-blue-300 rounded-lg">
                      <table className="w-full text-[10px] sm:text-xs">
                        <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                          <tr>
                            <th className="px-2 py-1.5 text-left" style={{ fontWeight: 700 }}>Edit</th>
                            <th className="px-2 py-1.5 text-left" style={{ fontWeight: 700 }}>Quarter</th>
                            <th className="px-2 py-1.5 text-left" style={{ fontWeight: 700 }}>Year</th>
                            <th className="px-2 py-1.5 text-left" style={{ fontWeight: 700 }}>Total Tax</th>
                            <th className="px-2 py-1.5 text-left" style={{ fontWeight: 700 }}>Interest</th>
                            <th className="px-2 py-1.5 text-left" style={{ fontWeight: 700 }}>Payable Amount</th>
                            <th className="px-2 py-1.5 text-left" style={{ fontWeight: 700 }}>RunTime Interest</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {pendingTaxRows.map((row, index) => (
                            <tr key={index} className="border-b border-slate-200 hover:bg-amber-50 transition-colors">
                              <td className="px-2 py-1.5">
                                <button 
                                  onClick={() => handleEditPendingTaxRow(index)}
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                              </td>
                              <td className="px-2 py-1.5">{row.quarter}</td>
                              <td className="px-2 py-1.5">{row.year}</td>
                              <td className="px-2 py-1.5">{row.totalTax}</td>
                              <td className="px-2 py-1.5">{row.interest}</td>
                              <td className="px-2 py-1.5">{row.payableAmount}</td>
                              <td className="px-2 py-1.5">
                                <span className="text-blue-600" style={{ fontWeight: 600 }}>{row.runtimeInterest ? 'true' : 'false'}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Running Tax Section */}
                <div className="bg-white rounded-xl shadow-lg border border-blue-300/40 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-green-200">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-green-100 flex items-center justify-center">
                      <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-700" />
                    </div>
                    <span className="text-xs sm:text-sm text-green-700" style={{ fontWeight: 700 }}>Running Tax</span>
                  </div>
                  
                  <div className="p-2 sm:p-3">
                    {/* Quarter Selection and Year */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div>
                        <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                          Quarter
                        </label>
                        <Input
                          value={runningTaxQuarter}
                          readOnly
                          className="border border-blue-300 bg-blue-50/50 text-blue-900 cursor-not-allowed rounded-lg h-8 text-xs"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                          Year
                        </label>
                        <Input
                          type="number"
                          value={runningTaxYear}
                          onChange={(e) => setRunningTaxYear(e.target.value)}
                          className="border border-blue-300 rounded-lg h-8 text-xs focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                          Total Tax
                        </label>
                        <Input
                          type="number"
                          value={runningTaxTotal}
                          onChange={(e) => setRunningTaxTotal(e.target.value)}
                          className="border border-blue-300 rounded-lg h-8 text-xs focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                          Interest
                        </label>
                        <Input
                          type="number"
                          value={runningTaxInterest}
                          onChange={(e) => handleRunningTaxInterestChange(e.target.value)}
                          className="border border-blue-300 rounded-lg h-8 text-xs focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                          Payable Amount
                        </label>
                        <Input
                          type="number"
                          value={runningTaxPayable}
                          readOnly
                          className="border border-blue-300 bg-blue-50/30 rounded-lg h-8 text-xs"
                        />
                      </div>
                    </div>

                    {/* Is Runtime Interest Checkbox and Add Button */}
                    <div className="mb-3 flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={runningTaxRuntimeInterest}
                          onChange={(e) => setRunningTaxRuntimeInterest(e.target.checked)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="text-xs text-blue-900" style={{ fontWeight: 600 }}>Is Runtime Interest</span>
                      </label>
                      <WaterRipple color="rgba(59, 130, 246, 0.3)">
                        <Button
                          onClick={handleAddRunningTaxRow}
                          className="bg-gradient-to-r from-blue-400/80 via-blue-400/70 to-blue-500/80 hover:from-blue-500/90 hover:to-blue-600/90 text-white h-7 px-3 rounded-lg shadow-md text-xs flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </Button>
                      </WaterRipple>
                    </div>

                    {/* Tax Details Table */}
                    <div className="overflow-x-auto border border-blue-300 rounded-lg">
                      <table className="w-full text-[10px] sm:text-xs">
                        <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                          <tr>
                            <th className="px-2 py-1.5 text-left" style={{ fontWeight: 700 }}>Edit</th>
                            <th className="px-2 py-1.5 text-left" style={{ fontWeight: 700 }}>Quarter</th>
                            <th className="px-2 py-1.5 text-left" style={{ fontWeight: 700 }}>Year</th>
                            <th className="px-2 py-1.5 text-left" style={{ fontWeight: 700 }}>Total Tax</th>
                            <th className="px-2 py-1.5 text-left" style={{ fontWeight: 700 }}>Interest</th>
                            <th className="px-2 py-1.5 text-left" style={{ fontWeight: 700 }}>Payable Amount</th>
                            <th className="px-2 py-1.5 text-left" style={{ fontWeight: 700 }}>RunTime Interest</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {runningTaxRows.map((row, index) => (
                            <tr key={index} className="border-b border-slate-200 hover:bg-blue-50 transition-colors">
                              <td className="px-2 py-1.5">
                                <button 
                                  onClick={() => handleEditRunningTaxRow(index)}
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                              </td>
                              <td className="px-2 py-1.5">{row.quarter}</td>
                              <td className="px-2 py-1.5">{row.year}</td>
                              <td className="px-2 py-1.5">{row.totalTax}</td>
                              <td className="px-2 py-1.5">{row.interest}</td>
                              <td className="px-2 py-1.5">{row.payableAmount}</td>
                              <td className="px-2 py-1.5">
                                <span className="text-blue-600" style={{ fontWeight: 600 }}>{row.runtimeInterest ? 'true' : 'false'}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </>
          ) : (
            // Original layout for non-alteration applications
            <>
            {/* Showing all sections in single view for New Connection */}

            <div className={`flex ${applicationType === 'New Connection' ? 'flex-row overflow-x-auto' : 'flex-col lg:flex-row'} items-start gap-2 sm:gap-3`}>
              {/* Application Details Card */}
              <div className={`${applicationType === 'New Connection' ? 'w-[280px]' : 'w-full lg:w-[280px]'} bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex-shrink-0`}>
              <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-blue-200">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1976D2]" />
                </div>
                <span className="text-xs sm:text-sm text-[#1976D2]" style={{ fontWeight: 700 }}>Application Details</span>
              </div>

              <div className="p-2 sm:p-3 space-y-2 sm:space-y-2.5">
                {/* Row 1: Application No and Consumer No */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {/* Application No */}
                  <div className="relative bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg p-2 sm:p-2.5 border-l-4 border-blue-500">
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 mb-1">
                        <Hash className="w-3 h-3 text-blue-600" />
                        <span className="text-[9px] sm:text-[10px] text-gray-600" style={{ fontWeight: 600 }}>Application No</span>
                      </div>
                      <div className="text-gray-900 text-xs sm:text-sm break-all" style={{ fontWeight: 700 }}>
                        {application.applicationNo}
                      </div>
                    </div>
                  </div>

                  {/* Consumer No */}
                  <div className="relative bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg p-2 sm:p-2.5 border-l-4 border-green-500">
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 mb-1">
                        <User className="w-3 h-3 text-green-600" />
                        <span className="text-[9px] sm:text-[10px] text-gray-600" style={{ fontWeight: 600 }}>Consumer No</span>
                      </div>
                      <div className="text-gray-900 text-xs sm:text-sm break-all" style={{ fontWeight: 700 }}>
                        {application.consumerNo}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Date and Applicant Name */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {/* Date */}
                  <div className="relative bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg p-2 sm:p-2.5 border-l-4 border-purple-500">
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3 text-purple-600" />
                        <span className="text-[9px] sm:text-[10px] text-gray-600" style={{ fontWeight: 600 }}>Date</span>
                      </div>
                      <div className="text-gray-900 text-xs sm:text-sm" style={{ fontWeight: 700 }}>
                        {isValidDate ? dateDisplay : 'Invalid Date'}
                      </div>
                    </div>
                  </div>

                  {/* Applicant Name */}
                  <div className="relative bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg p-2 sm:p-2.5 border-l-4 border-orange-500">
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 mb-1">
                        <User className="w-3 h-3 text-orange-600" />
                        <span className="text-[9px] sm:text-[10px] text-gray-600" style={{ fontWeight: 600 }}>Applicant Name</span>
                      </div>
                      <div className="text-gray-900 text-xs sm:text-sm break-words leading-tight" style={{ fontWeight: 700 }}>
                        {application.applicantName}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents Preview */}
                <div>
                  <div className="flex items-center gap-1.5 text-blue-700 mb-0.5 sm:mb-1">
                    <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="text-[10px] sm:text-xs" style={{ fontWeight: 700 }}>Documents Uploaded</span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-1.5 sm:p-2 border border-blue-200 space-y-1">
                    <div className="flex items-center justify-between text-[10px] sm:text-xs">
                      <span className="text-blue-700 truncate flex-1 mr-2">Aadhar Card.pdf</span>
                      <WaterRipple color="rgba(59, 130, 246, 0.3)">
                        <button 
                          onClick={() => alert('Viewing Aadhar Card.pdf\n\nDocument preview would open here in a full implementation.')}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </WaterRipple>
                    </div>
                    <div className="flex items-center justify-between text-[10px] sm:text-xs">
                      <span className="text-blue-700 truncate flex-1 mr-2">Property Doc.pdf</span>
                      <WaterRipple color="rgba(59, 130, 246, 0.3)">
                        <button 
                          onClick={() => alert('Viewing Property Doc.pdf\n\nDocument preview would open here in a full implementation.')}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </WaterRipple>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Consumer Details Card - Show for ALL types */}
            {applicationType === 'Disconnection' ? (
              // For Disconnection: Show Consumer Details on the right
              <div className={`w-full lg:flex-1`}>
                {/* Consumer Details (Read-Only) */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-blue-200">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1976D2]" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#1976D2]" style={{ fontWeight: 700 }}>Consumer Details</span>
                  </div>
                  <div className="p-2 sm:p-3">
                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                      <div>
                        <label className="text-[9px] sm:text-[10px] text-blue-700 mb-0.5 block" style={{ fontWeight: 700 }}>Consumer Number</label>
                        <Input value={application.consumerNo || 'DM2ZDWBH100002'} disabled className="border border-blue-200 bg-blue-50/50 text-blue-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs" />
                      </div>
                      <div>
                        <label className="text-[9px] sm:text-[10px] text-blue-700 mb-0.5 block" style={{ fontWeight: 700 }}>Consumer Name</label>
                        <Input value={application.applicantName || formData.consumerName} disabled className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs" />
                      </div>
                      <div>
                        <label className="text-[9px] sm:text-[10px] text-blue-700 mb-0.5 block" style={{ fontWeight: 700 }}>Mobile Number</label>
                        <Input value={formData.mobileNumber || '9876543210'} disabled className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs" />
                      </div>
                      <div>
                        <label className="text-[9px] sm:text-[10px] text-purple-700 mb-0.5 block" style={{ fontWeight: 700 }}>Water Type</label>
                        <Input value="Domestic" disabled className="border border-purple-200 bg-purple-50/50 text-purple-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[9px] sm:text-[10px] text-orange-700 mb-0.5 block" style={{ fontWeight: 700 }}>Address</label>
                        <Input value={formData.address || 'Plot No. 123, Ward 5, Akola'} disabled className="border border-orange-200 bg-orange-50/50 text-orange-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`w-full lg:flex-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden`}>
                <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-blue-200">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1976D2]" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#1976D2]" style={{ fontWeight: 700 }}>Consumer Details{applicationType === 'Mutation' ? ' (Current)' : ''}</span>
                </div>

                <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
                {/* Application Number - Show for Mutation */}
                {applicationType === 'Mutation' && (
                  <div>
                    <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                      <Hash className="w-3.5 h-3.5" />
                      Application Number
                    </label>
                    <Input
                      value={application?.applicationNo || 'N/A'}
                      disabled
                      className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-8 text-xs"
                    />
                  </div>
                )}

                {/* Application Type - Disabled, shows registered type only */}
                {(application?.applicationType === 'New Connection' || application?.details === 'New Connection') && (
                  <div>
                    <label className="flex items-center gap-1.5 text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
                      <FileText className="w-3.5 h-3.5" />
                      Application Type
                    </label>
                    <select
                      value={formData.applicationType}
                      disabled
                      className="w-full px-2.5 py-1.5 border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg outline-none text-xs"
                    >
                      <option value="New Connection">New Connection</option>
                      <option value="Mutation">Mutation</option>
                      <option value="Alteration">Alteration</option>
                      <option value="Disconnection">Disconnection</option>
                      <option value="Temporary Connection">Temporary Connection</option>
                      <option value="Reconnection">Reconnection</option>
                    </select>
                    <p className="text-[9px] sm:text-[10px] text-blue-600 mt-0.5">
                      🔒 Application type is set during registration
                    </p>
                  </div>
                )}

                {/* Consumer Name and Mobile Number - Same Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className="flex items-center gap-1 sm:gap-1.5 text-blue-700 text-[10px] sm:text-xs mb-0.5 sm:mb-1" style={{ fontWeight: 700 }}>
                      <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Consumer Name
                    </label>
                    <Input
                      value={formData.consumerName}
                      onChange={(e) => setFormData({ ...formData, consumerName: e.target.value })}
                      disabled={applicationType === 'Mutation' || formData.applicationType === 'New Connection'}
                      className={`border rounded-lg h-7 sm:h-8 text-[11px] sm:text-xs ${
                        (applicationType === 'Mutation' || formData.applicationType === 'New Connection')
                          ? 'border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed'
                          : 'border-blue-300 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                      placeholder="Enter consumer name"
                    />
                    {(applicationType === 'Mutation' || formData.applicationType === 'New Connection') && (
                      <p className="text-[9px] sm:text-[10px] text-blue-600 mt-0.5">
                        🔒 Name cannot be edited
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="flex items-center gap-1 sm:gap-1.5 text-blue-700 text-[10px] sm:text-xs mb-0.5 sm:mb-1" style={{ fontWeight: 700 }}>
                      <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Mobile Number
                    </label>
                    <Input
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      disabled={applicationType === 'Mutation'}
                      className={`border rounded-lg h-7 sm:h-8 text-[11px] sm:text-xs ${
                        applicationType === 'Mutation'
                          ? 'border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed'
                          : 'border-blue-300 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                      placeholder="Enter mobile number"
                    />
                    {applicationType === 'Mutation' && (
                      <p className="text-[9px] sm:text-[10px] text-blue-600 mt-0.5">
                        🔒 Mobile cannot be edited
                      </p>
                    )}
                  </div>
                </div>

                {/* Address - Full Width */}
                <div>
                  <label className="flex items-center gap-1 sm:gap-1.5 text-orange-700 text-[10px] sm:text-xs mb-0.5 sm:mb-1" style={{ fontWeight: 700 }}>
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Address
                  </label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={applicationType === 'Mutation'}
                    className={`border rounded-lg h-7 sm:h-8 text-[11px] sm:text-xs ${
                      applicationType === 'Mutation'
                        ? 'border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed'
                        : 'border-blue-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    placeholder="Plot No. 123, Ward 5, Akola"
                  />
                  {applicationType === 'Mutation' && (
                    <p className="text-[9px] sm:text-[10px] text-blue-600 mt-0.5">
                      🔒 Address cannot be edited
                    </p>
                  )}
                </div>

                {/* Zone No, Ward No, Property No */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                  <div>
                    <label className="flex items-center gap-0.5 sm:gap-1.5 text-pink-700 text-[9px] sm:text-xs mb-0.5 sm:mb-1" style={{ fontWeight: 700 }}>
                      <MapPin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      Zone
                    </label>
                    <Input
                      value={formData.zoneNo}
                      onChange={(e) => setFormData({ ...formData, zoneNo: e.target.value })}
                      className="border border-pink-300 focus:border-pink-500 focus:ring-pink-500 rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs"
                      placeholder="Zone"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-0.5 sm:gap-1.5 text-purple-700 text-[9px] sm:text-xs mb-0.5 sm:mb-1" style={{ fontWeight: 700 }}>
                      <Hash className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      Ward
                    </label>
                    <Input
                      value={formData.wardNo}
                      onChange={(e) => setFormData({ ...formData, wardNo: e.target.value })}
                      className="border border-purple-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs"
                      placeholder="Ward"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-0.5 sm:gap-1.5 text-cyan-700 text-[9px] sm:text-xs mb-0.5 sm:mb-1" style={{ fontWeight: 700 }}>
                      <Hash className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      Property
                    </label>
                    <Input
                      value={formData.propertyNo}
                      onChange={(e) => setFormData({ ...formData, propertyNo: e.target.value })}
                      className="border border-cyan-300 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs"
                      placeholder="Property"
                    />
                  </div>
                </div>

                {/* Building Status */}
                

                {/* Upload Document */}
                <div>
                  <label className="flex items-center gap-1 sm:gap-1.5 text-emerald-700 text-[10px] sm:text-xs mb-1 sm:mb-1.5" style={{ fontWeight: 700 }}>
                    <Upload className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Upload Documents
                  </label>
                  <input
                    id="file-upload-input"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="flex items-center gap-2">
                    <WaterRipple color="rgba(16, 185, 129, 0.3)">
                      <Button 
                        type="button"
                        onClick={handleFileButtonClick}
                        className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white h-7 sm:h-8 px-3 sm:px-4 rounded-lg shadow-md text-[10px] sm:text-xs"
                      >
                        Choose File
                      </Button>
                    </WaterRipple>
                    <span className="text-[10px] sm:text-xs text-slate-500 truncate flex-1">
                      {selectedFile ? selectedFile.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
              </div>
              </div>
            )}

            {/* Dynamic Application Type Card / Mutation Details (Editable) */}
            {applicationType === 'Mutation' ? (
              // Mutation Details (Editable) - Beside Application Details
              <div className={`w-full lg:flex-1 bg-white rounded-xl shadow-lg border-2 border-green-200 overflow-hidden`}>
                <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-green-200">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#16A34A]" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#16A34A]" style={{ fontWeight: 700 }}>Mutation Details - New Consumer (Editable)</span>
                </div>
                
                <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
                  {/* Mutation Reason - Full Width */}
                  <div>
                    <label className="flex items-center gap-1 sm:gap-1.5 text-purple-700 text-[10px] sm:text-xs mb-0.5 sm:mb-1" style={{ fontWeight: 700 }}>
                      <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Mutation Reason
                    </label>
                    <Input
                      value={formData.mutationReason}
                      onChange={(e) => setFormData({ ...formData, mutationReason: e.target.value })}
                      className="border border-purple-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg h-7 sm:h-8 text-[11px] sm:text-xs"
                      placeholder="Reason for mutation"
                    />
                  </div>

                  {/* New Name and New Mobile Number - Same Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <label className="flex items-center gap-1 sm:gap-1.5 text-blue-700 text-[10px] sm:text-xs mb-0.5 sm:mb-1" style={{ fontWeight: 700 }}>
                        <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        New Consumer Name
                      </label>
                      <Input
                        value={formData.mutationNewName}
                        onChange={(e) => setFormData({ ...formData, mutationNewName: e.target.value })}
                        className="border border-blue-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-7 sm:h-8 text-[11px] sm:text-xs"
                        placeholder="Enter new consumer name"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1 sm:gap-1.5 text-blue-700 text-[10px] sm:text-xs mb-0.5 sm:mb-1" style={{ fontWeight: 700 }}>
                        <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        New Mobile Number
                      </label>
                      <Input
                        value={formData.mutationNewMobile}
                        onChange={(e) => setFormData({ ...formData, mutationNewMobile: e.target.value })}
                        className="border border-blue-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-7 sm:h-8 text-[11px] sm:text-xs"
                        placeholder="Enter new mobile number"
                      />
                    </div>
                  </div>

                  {/* New Address - Full Width */}
                  <div>
                    <label className="flex items-center gap-1 sm:gap-1.5 text-orange-700 text-[10px] sm:text-xs mb-0.5 sm:mb-1" style={{ fontWeight: 700 }}>
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      New Address
                    </label>
                    <Input
                      value={formData.mutationNewAddress}
                      onChange={(e) => setFormData({ ...formData, mutationNewAddress: e.target.value })}
                      className="border border-orange-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg h-7 sm:h-8 text-[11px] sm:text-xs"
                      placeholder="Enter new address"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Original Dynamic Application Type Card for other types (including Disconnection)
              <div className={`w-full lg:flex-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden`}>
                <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-blue-200">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    {applicationType === 'New Connection' && <Home className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1976D2]" />}
                    {applicationType === 'Alteration' && <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1976D2]" />}
                    {applicationType === 'Disconnection' && <Slash className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1976D2]" />}
                  </div>
                  <span className="text-xs sm:text-sm truncate text-[#1976D2]" style={{ fontWeight: 700 }}>{applicationType} Details</span>
                </div>

                <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2 overflow-x-auto">
                  {/* Dynamic Fields Based on Application Type */}
                  {renderApplicationTypeFields()}
                </div>
              </div>
            )}
            </div>
            </>
          )}

          {/* Connection and Meter Details for Disconnection - Full Width Below */}
          {applicationType === 'Disconnection' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 mt-3">
              {/* Connection Details (Read-Only) */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-cyan-200">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-600" />
                  </div>
                  <span className="text-xs sm:text-sm text-cyan-700" style={{ fontWeight: 700 }}>Connection Details</span>
                </div>
                <div className="p-2 sm:p-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                    <div>
                      <label className="text-[9px] sm:text-[10px] text-blue-700 mb-0.5 block" style={{ fontWeight: 700 }}>Connection Type</label>
                      <Input value="Residential" disabled className="border border-blue-200 bg-blue-50/50 text-blue-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs" />
                    </div>
                    <div>
                      <label className="text-[9px] sm:text-[10px] text-cyan-700 mb-0.5 block" style={{ fontWeight: 700 }}>Tap Size</label>
                      <Input value='1/2"' disabled className="border border-cyan-200 bg-cyan-50/50 text-cyan-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs" />
                    </div>
                    <div>
                      <label className="text-[9px] sm:text-[10px] text-blue-700 mb-0.5 block" style={{ fontWeight: 700 }}>Connection Count</label>
                      <Input value="1" disabled className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs" />
                    </div>
                    <div>
                      <label className="text-[9px] sm:text-[10px] text-purple-700 mb-0.5 block" style={{ fontWeight: 700 }}>Building Type</label>
                      <Input value="House" disabled className="border border-purple-200 bg-purple-50/50 text-purple-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs" />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[9px] sm:text-[10px] text-orange-700 mb-0.5 block" style={{ fontWeight: 700 }}>Connection Category</label>
                      <Input value="Quarterly" disabled className="border border-orange-200 bg-orange-50/50 text-orange-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Meter Details (Read-Only) */}
              <div className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden">
                <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-amber-200">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Gauge className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600" />
                  </div>
                  <span className="text-xs sm:text-sm text-amber-700" style={{ fontWeight: 700 }}>Meter Details</span>
                </div>
                <div className="p-2 sm:p-3">
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    <div>
                      <label className="text-[9px] sm:text-[10px] text-blue-700 mb-0.5 block" style={{ fontWeight: 700 }}>Meter Number</label>
                      <Input value="No Meter" disabled className="border border-blue-200 bg-blue-50/50 text-blue-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs" />
                    </div>
                    <div>
                      <label className="text-[9px] sm:text-[10px] text-cyan-700 mb-0.5 block" style={{ fontWeight: 700 }}>Meter Type</label>
                      <Input value="Shop" disabled className="border border-cyan-200 bg-cyan-50/50 text-cyan-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs" />
                    </div>
                    <div>
                      <label className="text-[9px] sm:text-[10px] text-blue-700 mb-0.5 block" style={{ fontWeight: 700 }}>Meter Status</label>
                      <Input value="Start" disabled className="border border-blue-200 bg-blue-50 text-blue-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs" />
                    </div>
                    <div>
                      <label className="text-[9px] sm:text-[10px] text-purple-700 mb-0.5 block" style={{ fontWeight: 700 }}>Last Reading</label>
                      <Input value="12580" disabled className="border border-purple-200 bg-purple-50/50 text-purple-900 cursor-not-allowed rounded-lg h-7 sm:h-8 text-[10px] sm:text-xs" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AFTER Section for Alteration/Mutation - Full Width Below (for non-alteration/mutation types) */}
          {applicationType !== 'Alteration' && applicationType !== 'Mutation' && renderAfterSection()}

          {/* Action Buttons - Centered */}
          <div 
            className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 mt-3 max-w-3xl mx-auto px-2"
            role="group"
            aria-label="Application actions"
          >
            <WaterRipple color="rgba(239, 68, 68, 0.3)">
              <Button
                onClick={onClose}
                variant="outline"
                className="border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2] h-8 sm:h-10 px-4 sm:px-8 rounded-lg shadow-md text-xs sm:text-sm w-full sm:w-auto"
                aria-label="Cancel and close edit application modal"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" aria-hidden="true" />
                <span className="hidden sm:inline p-[0px] mx-[1px] my-[0px] text-center">Cancel</span>
                <span className="sm:hidden">Close</span>
              </Button>
            </WaterRipple>

            <WaterRipple color="rgba(239, 68, 68, 0.3)">
              <Button
                onClick={handleReject}
                className="bg-[#EF4444] hover:bg-[#DC2626] text-white h-8 sm:h-10 px-4 sm:px-8 rounded-lg shadow-lg text-xs sm:text-sm w-full sm:w-auto"
                aria-label={`Reject application ${application.applicationNo}`}
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" aria-hidden="true" />
                Reject
              </Button>
            </WaterRipple>

            <WaterRipple color="rgba(251, 146, 60, 0.3)">
              <Button
                onClick={handleRevertToConsumer}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white h-8 sm:h-10 px-3 sm:px-8 rounded-lg shadow-lg text-xs sm:text-sm w-full sm:w-auto col-span-2"
                aria-label={`Revert application ${application.applicationNo} to consumer`}
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">Revert to Consumer</span>
                <span className="sm:hidden">Revert</span>
              </Button>
            </WaterRipple>

            <WaterRipple color="rgba(34, 197, 94, 0.3)">
              <Button
                onClick={handleSubmitClick}
                className="bg-[#22C55E] hover:bg-[#16A34A] text-white h-8 sm:h-10 px-4 sm:px-8 rounded-lg shadow-lg text-xs sm:text-sm w-full sm:w-auto col-span-2"
                aria-label={`Submit application ${application.applicationNo}`}
              >
                <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">Submit Application</span>
                <span className="sm:hidden">Submit</span>
              </Button>
            </WaterRipple>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}