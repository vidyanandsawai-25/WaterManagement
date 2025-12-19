import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { FileText, Filter, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import React from 'react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
interface ApplicationDetail {
  id: string;
  applicationNo: string;
  consumerNo: string;
  applicantName: string;
  mobileNumber: string;
  email: string;
  address: string;
  applicationType: string;
  status: 'Pending' | 'Approved' | 'Start' | 'Stop';
  connectionCategory: 'Quarterly' | 'Yearly';
  registrationDate: string;
  approvalDate?: string;
  propertyType: string;
  connectionSize: string;
  ward: string;
}

interface ZoneData {
  zone: string;
  newConnection: { pending: number; approved: number };
  disconnect: { pending: number; approved: number };
  alteration: { pending: number; approved: number };
  mutation: { pending: number; approved: number };
  complaint: { pending: number; approved: number };
  objection: { pending: number; approved: number };
  totalPending: number;
  totalApproved: number;
  grandTotal: number;
  applications?: ApplicationDetail[];
}

interface ZonewiseFilterReportModalProps {
  open: boolean;
  onClose: () => void;
  zoneName: string;
  applications: any[];
}

// ============================================================================
// MOCK DATA
// ============================================================================
const zoneWiseData: ZoneData[] = [
  {
    zone: 'Zone 1',
    newConnection: { pending: 45, approved: 89 },
    disconnect: { pending: 12, approved: 34 },
    alteration: { pending: 23, approved: 56 },
    mutation: { pending: 15, approved: 42 },
    complaint: { pending: 8, approved: 28 },
    objection: { pending: 5, approved: 15 },
    totalPending: 108,
    totalApproved: 264,
    grandTotal: 372,
    applications: [
      {
        id: '1',
        applicationNo: 'APP001',
        consumerNo: 'CON001',
        applicantName: 'John Doe',
        mobileNumber: '1234567890',
        email: 'john.doe@example.com',
        address: '123 Main St, Zone 1',
        applicationType: 'New Connection',
        status: 'Start',
        connectionCategory: 'Quarterly',
        registrationDate: '2023-10-01',
        propertyType: 'Residential',
        connectionSize: '1/2"',
        ward: 'Ward 1',
      },
      {
        id: '2',
        applicationNo: 'APP002',
        consumerNo: 'CON002',
        applicantName: 'Jane Smith',
        mobileNumber: '0987654321',
        email: 'jane.smith@example.com',
        address: '456 Elm St, Zone 1',
        applicationType: 'Alteration',
        status: 'Approved',
        connectionCategory: 'Yearly',
        registrationDate: '2023-10-02',
        approvalDate: '2023-10-05',
        propertyType: 'Commercial',
        connectionSize: '3/4"',
        ward: 'Ward 2',
      },
      {
        id: '3',
        applicationNo: 'APP003',
        consumerNo: 'CON003',
        applicantName: 'Raj Patel',
        mobileNumber: '9876543210',
        email: 'raj.patel@example.com',
        address: '789 Oak Ave, Zone 1',
        applicationType: 'Mutation',
        status: 'Stop',
        connectionCategory: 'Quarterly',
        registrationDate: '2023-10-03',
        propertyType: 'Residential',
        connectionSize: '1"',
        ward: 'Ward 1',
      },
      {
        id: '4',
        applicationNo: 'APP004',
        consumerNo: 'CON004',
        applicantName: 'Sita Sharma',
        mobileNumber: '8765432109',
        email: 'sita.sharma@example.com',
        address: '321 Maple St, Zone 1',
        applicationType: 'New Connection',
        status: 'Pending',
        connectionCategory: 'Yearly',
        registrationDate: '2023-10-04',
        propertyType: 'Industrial',
        connectionSize: '1.5"',
        ward: 'Ward 3',
      },
    ],
  },
  {
    zone: 'Zone 2',
    newConnection: { pending: 53, approved: 95 },
    disconnect: { pending: 8, approved: 28 },
    alteration: { pending: 18, approved: 45 },
    mutation: { pending: 12, approved: 38 },
    complaint: { pending: 6, approved: 22 },
    objection: { pending: 4, approved: 12 },
    totalPending: 101,
    totalApproved: 240,
    grandTotal: 341,
  },
  {
    zone: 'Zone 3',
    newConnection: { pending: 38, approved: 78 },
    disconnect: { pending: 10, approved: 32 },
    alteration: { pending: 20, approved: 48 },
    mutation: { pending: 14, approved: 35 },
    complaint: { pending: 7, approved: 25 },
    objection: { pending: 3, approved: 10 },
    totalPending: 92,
    totalApproved: 228,
    grandTotal: 320,
  },
  {
    zone: 'Zone 4',
    newConnection: { pending: 62, approved: 102 },
    disconnect: { pending: 15, approved: 38 },
    alteration: { pending: 25, approved: 52 },
    mutation: { pending: 18, approved: 45 },
    complaint: { pending: 9, approved: 30 },
    objection: { pending: 6, approved: 18 },
    totalPending: 135,
    totalApproved: 285,
    grandTotal: 420,
  },
  {
    zone: 'Zone 5',
    newConnection: { pending: 41, approved: 85 },
    disconnect: { pending: 9, approved: 30 },
    alteration: { pending: 17, approved: 42 },
    mutation: { pending: 11, approved: 33 },
    complaint: { pending: 5, approved: 20 },
    objection: { pending: 2, approved: 8 },
    totalPending: 85,
    totalApproved: 218,
    grandTotal: 303,
  },
  {
    zone: 'Zone 6',
    newConnection: { pending: 55, approved: 92 },
    disconnect: { pending: 13, approved: 35 },
    alteration: { pending: 22, approved: 50 },
    mutation: { pending: 16, approved: 40 },
    complaint: { pending: 8, approved: 27 },
    objection: { pending: 5, approved: 14 },
    totalPending: 119,
    totalApproved: 258,
    grandTotal: 377,
  },
];

// ============================================================================
// ZONEWISE FILTER REPORT MODAL COMPONENT
// ============================================================================
export function ZonewiseFilterReportModal({ 
  open, 
  onClose,
  zoneName,
  applications 
}: ZonewiseFilterReportModalProps) {
  const [connectionCategory, setConnectionCategory] = useState('all');
  const [connectionUse, setConnectionUse] = useState('all');
  const [tapSize, setTapSize] = useState('all');
  const [selectionStatus, setSelectionStatus] = useState('all');
  const [applicationType, setApplicationType] = useState('all');
  const [filteredApplications, setFilteredApplications] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Auto-update filtered applications whenever filters change
  useEffect(() => {
    // Don't auto-filter - only filter when user clicks search
    // Reset hasSearched when modal closes
    if (!open) {
      setHasSearched(false);
      setFilteredApplications([]);
    }
  }, [open]);

  const handleSearch = () => {
    let filteredApps = [...applications];

    if (connectionCategory !== 'all') {
      filteredApps = filteredApps.filter(app => 
        app.connectionCategory?.toLowerCase() === connectionCategory.toLowerCase()
      );
    }

    if (connectionUse !== 'all') {
      filteredApps = filteredApps.filter(app => 
        app.propertyType?.toLowerCase().includes(connectionUse.toLowerCase())
      );
    }

    if (tapSize !== 'all') {
      filteredApps = filteredApps.filter(app => app.connectionSize?.includes(tapSize));
    }

    if (selectionStatus !== 'all') {
      filteredApps = filteredApps.filter(app => 
        app.status?.toLowerCase() === selectionStatus.toLowerCase()
      );
    }

    if (applicationType === 'today') {
      const today = new Date().toISOString().split('T')[0];
      filteredApps = filteredApps.filter(app => app.registrationDate?.includes(today));
    }

    setFilteredApplications(filteredApps);
    setHasSearched(true);
    
    toast.success(`Found ${filteredApps.length} records matching your filters`);
  };

  const generatePDFReport = () => {
    const filteredApps = filteredApplications;

    // Generate HTML for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            @page {
              size: A4 landscape;
              margin: 15mm;
            }
            body {
              font-family: Arial, sans-serif;
              font-size: 9px;
              margin: 0;
              padding: 10px;
            }
            .header {
              text-align: center;
              margin-bottom: 15px;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
            }
            .header h1 {
              margin: 0;
              font-size: 16px;
              color: #0A4D9E;
            }
            .header h2 {
              margin: 5px 0 0 0;
              font-size: 14px;
              color: #333;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
              page-break-inside: auto;
            }
            tr {
              page-break-inside: avoid;
              page-break-after: auto;
            }
            th, td {
              border: 1px solid #000;
              padding: 4px 2px;
              text-align: center;
              font-size: 8px;
            }
            th {
              background-color: #0A4D9E;
              color: white;
              font-weight: bold;
              font-size: 9px;
            }
            td {
              background-color: #fff;
            }
            tr:nth-child(even) td {
              background-color: #f9f9f9;
            }
            .filter-info {
              background-color: #E3F2FD;
              padding: 8px;
              margin-bottom: 10px;
              border-radius: 5px;
              font-size: 9px;
            }
            .footer {
              margin-top: 15px;
              text-align: center;
              font-size: 8px;
              color: #666;
              border-top: 1px solid #ccc;
              padding-top: 8px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
              <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #0A4D9E 0%, #1976D2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 28px; font-weight: bold;">अ</span>
              </div>
              <div>
                <h1>अकोला महानगरपालिका, इले पाणीपुरवठा विभाग</h1>
                <h2>${zoneName} - Connection Report</h2>
              </div>
            </div>
          </div>

          <div class="filter-info">
            <strong>Report Filters:</strong>
            ${connectionCategory !== 'all' ? `Connection Category: <strong>${connectionCategory}</strong> | ` : ''}
            ${connectionUse !== 'all' ? `Connection Use: <strong>${connectionUse}</strong> | ` : ''}
            ${tapSize !== 'all' ? `Tap Size: <strong>${tapSize}mm</strong> | ` : ''}
            ${selectionStatus !== 'all' ? `Status: <strong>${selectionStatus}</strong> | ` : ''}
            ${applicationType !== 'all' ? `Application Type: <strong>${applicationType}</strong> | ` : ''}
            <strong>Total Records: ${filteredApps.length}</strong> | 
            <strong>Generated: ${new Date().toLocaleString()}</strong>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 4%;">Sr. No.</th>
                <th style="width: 10%;">Application No</th>
                <th style="width: 6%;">Zone</th>
                <th style="width: 6%;">Ward</th>
                <th style="width: 15%;">Customer Name</th>
                <th style="width: 12%;">Address</th>
                <th style="width: 8%;">Connection Category</th>
                <th style="width: 8%;">Connection Use</th>
                <th style="width: 7%;">Pipe Size</th>
                <th style="width: 6%;">Approval Date</th>
                <th style="width: 6%;">Paid Amount</th>
                <th style="width: 6%;">Demand Amount</th>
                <th style="width: 6%;">Collected Amount</th>
              </tr>
            </thead>
            <tbody>
              ${filteredApps.map((app, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td style="text-align: left; padding-left: 4px;">${app.applicationNo || 'N/A'}</td>
                  <td>${app.ward?.charAt(0) || 'A'}</td>
                  <td>${app.ward?.match(/\\d+/)?.[0] || '2'}</td>
                  <td style="text-align: left; padding-left: 4px;">${app.applicantName || 'N/A'}</td>
                  <td style="text-align: left; padding-left: 4px; font-size: 7px;">${app.address || 'City'}</td>
                  <td>${app.connectionCategory || 'Quarterly'}</td>
                  <td>${app.propertyType || 'Residential'}</td>
                  <td>${app.connectionSize || '1/2"'}</td>
                  <td>${app.approvalDate || '0'}</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>
              <strong>अकोला महानगरपालिका</strong> | 
              इले पाणीपुरवठा विभाग | 
              रिपोर्ट तयार केली: ${new Date().toLocaleString()} | 
              एकूण नोंदी: ${filteredApps.length}
            </p>
          </div>
        </body>
      </html>
    `;

    // Create and download the HTML file (which can be opened as PDF)
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${zoneName}_Connection_Report_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`✅ Report generated successfully! ${filteredApps.length} records found.`);
  };

  const handleDownload = () => {
    if (filteredApplications.length === 0) {
      toast.error('❌ No records to download. Please adjust your filters.');
      return;
    }
    generatePDFReport();
  };

  const handleReset = () => {
    setConnectionCategory('all');
    setConnectionUse('all');
    setTapSize('all');
    setSelectionStatus('all');
    setApplicationType('all');
    setFilteredApplications([]);
    setHasSearched(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-2 border-sky-200/60 !max-w-[95vw] sm:!max-w-[95vw] w-[95vw] max-h-[90vh] flex flex-col p-0 bg-white rounded-2xl">
        <DialogHeader className="border-b-2 pb-3 border-sky-200/60 pt-3 pr-4 pl-4 bg-gradient-to-r from-sky-400/90 via-blue-400/90 to-cyan-400/90 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl text-white" style={{ fontWeight: 700 }}>
                Connection Report - Live Preview
              </DialogTitle>
              <DialogDescription className="text-white/95 text-xs" style={{ fontWeight: 500 }}>
                {zoneName} - {filteredApplications.length} records found
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-5 space-y-5 px-5 flex-1 overflow-auto">
          {/* Filter Fields - All in One Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Connection Category */}
            <div>
              <label className="block text-xs text-slate-700 mb-2" style={{ fontWeight: 700 }}>
                Connection Category
              </label>
              <Select value={connectionCategory} onValueChange={setConnectionCategory}>
                <SelectTrigger className="bg-white border-2 border-gray-300 focus:border-sky-400 hover:border-sky-300 h-10 transition-colors rounded-lg">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Select Category</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Connection Use */}
            <div>
              <label className="block text-xs text-slate-700 mb-2" style={{ fontWeight: 700 }}>
                Connection Use
              </label>
              <Select value={connectionUse} onValueChange={setConnectionUse}>
                <SelectTrigger className="bg-white border-2 border-gray-300 focus:border-sky-400 hover:border-sky-300 h-10 transition-colors rounded-lg">
                  <SelectValue placeholder="Select Use" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Select Use</SelectItem>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tap Size */}
            <div>
              <label className="block text-xs text-slate-700 mb-2" style={{ fontWeight: 700 }}>
                Pipe Size (mm)
              </label>
              <Select value={tapSize} onValueChange={setTapSize}>
                <SelectTrigger className="bg-white border-2 border-gray-300 focus:border-sky-400 hover:border-sky-300 h-10 transition-colors rounded-lg">
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Select Size</SelectItem>
                  <SelectItem value="1/2">1/2" (12.7mm)</SelectItem>
                  <SelectItem value="3/4">3/4" (19mm)</SelectItem>
                  <SelectItem value="1">1" (25.4mm)</SelectItem>
                  <SelectItem value="1.5">1.5" (38mm)</SelectItem>
                  <SelectItem value="2">2" (50mm)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Selection Status */}
            <div>
              <label className="block text-xs text-slate-700 mb-2" style={{ fontWeight: 700 }}>
                Select Status
              </label>
              <Select value={selectionStatus} onValueChange={setSelectionStatus}>
                <SelectTrigger className="bg-white border-2 border-gray-300 focus:border-sky-400 hover:border-sky-300 h-10 transition-colors rounded-lg">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Select Status</SelectItem>
                  <SelectItem value="Start">Start</SelectItem>
                  <SelectItem value="Stop">Stop</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Application Type */}
            <div>
              <label className="block text-xs text-slate-700 mb-2" style={{ fontWeight: 700 }}>
                Application Type
              </label>
              <Select value={applicationType} onValueChange={setApplicationType}>
                <SelectTrigger className="bg-white border-2 border-gray-300 focus:border-sky-400 hover:border-sky-300 h-10 transition-colors rounded-lg">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Select Application Type</SelectItem>
                  <SelectItem value="today">Today's Applications</SelectItem>
                  <SelectItem value="upto">Applications Upto Date</SelectItem>
                  <SelectItem value="all_time">All Applications</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white h-10 px-6 rounded-xl shadow-xl text-base"
              style={{ fontWeight: 700 }}
            >
              <Filter className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-blue-200 my-4"></div>

          {/* Report Preview Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-700">
                <FileText className="w-5 h-5" />
                <div className="text-sm">
                  <strong>Live Report Preview:</strong> Showing {filteredApplications.length} records
                </div>
              </div>
              <div className="text-xs text-gray-600">
                Updated: {new Date().toLocaleString()}
              </div>
            </div>
          </div>

          {/* Preview Table */}
          <div className="border-2 border-blue-200 rounded-xl overflow-hidden bg-white shadow-lg">
            <div className="overflow-x-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="sticky top-0 bg-gradient-to-r from-blue-400/80 via-blue-400/70 to-indigo-500/80 text-white">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs" style={{ fontWeight: 700 }}>Sr. No.</th>
                    <th className="px-3 py-3 text-left text-xs" style={{ fontWeight: 700 }}>Application No</th>
                    <th className="px-3 py-3 text-left text-xs" style={{ fontWeight: 700 }}>Zone</th>
                    <th className="px-3 py-3 text-left text-xs" style={{ fontWeight: 700 }}>Ward</th>
                    <th className="px-3 py-3 text-left text-xs" style={{ fontWeight: 700 }}>Customer Name</th>
                    <th className="px-3 py-3 text-left text-xs" style={{ fontWeight: 700 }}>Address</th>
                    <th className="px-3 py-3 text-left text-xs" style={{ fontWeight: 700 }}>Connection Category</th>
                    <th className="px-3 py-3 text-left text-xs" style={{ fontWeight: 700 }}>Connection Use</th>
                    <th className="px-3 py-3 text-left text-xs" style={{ fontWeight: 700 }}>Pipe Size</th>
                    <th className="px-3 py-3 text-center text-xs" style={{ fontWeight: 700 }}>Approval Date</th>
                    <th className="px-3 py-3 text-center text-xs" style={{ fontWeight: 700 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((app, index) => (
                      <tr 
                        key={app.id || index}
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50 transition-colors border-b border-gray-200`}
                      >
                        <td className="px-3 py-3 text-xs text-gray-700">{index + 1}</td>
                        <td className="px-3 py-3 text-xs text-gray-700" style={{ fontWeight: 600 }}>{app.applicationNo || 'N/A'}</td>
                        <td className="px-3 py-3 text-xs text-gray-700">{app.ward?.charAt(0) || 'A'}</td>
                        <td className="px-3 py-3 text-xs text-gray-700">{app.ward?.match(/\d+/)?.[0] || '2'}</td>
                        <td className="px-3 py-3 text-xs text-gray-700" style={{ fontWeight: 600 }}>{app.applicantName || 'N/A'}</td>
                        <td className="px-3 py-3 text-xs text-gray-600">{app.address || 'City'}</td>
                        <td className="px-3 py-3 text-xs text-gray-700">{app.connectionCategory || 'Quarterly'}</td>
                        <td className="px-3 py-3 text-xs text-gray-700">{app.propertyType || 'Residential'}</td>
                        <td className="px-3 py-3 text-xs text-gray-700">{app.connectionSize || '1/2"'}</td>
                        <td className="px-3 py-3 text-xs text-gray-700 text-center">{app.approvalDate || '-'}</td>
                        <td className="px-3 py-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            app.status?.toLowerCase() === 'approved' ? 'bg-green-100 text-green-700' :
                            app.status?.toLowerCase() === 'pending' ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-700'
                          }`} style={{ fontWeight: 600 }}>
                            {app.status || 'N/A'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="px-3 py-8 text-center text-gray-500">
                        No records found matching the selected filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 pt-6 border-t-2 border-blue-200 mt-6">
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-2 border-gray-400 text-gray-700 hover:bg-gray-100 h-12 px-8 rounded-xl shadow-md"
            >
              <Filter className="w-5 h-5 mr-2" />
              Reset Filters
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-2 border-slate-400 text-slate-700 hover:bg-slate-100 h-12 px-8 rounded-xl shadow-md"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDownload}
              className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:to-green-800 text-white h-12 px-12 rounded-xl shadow-xl text-base"
              style={{ fontWeight: 700 }}
              disabled={filteredApplications.length === 0}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Report ({filteredApplications.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================================
// ZONEWISE TABLE COMPONENT (Main Export)
// ============================================================================
export function ZonewiseTable() {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<{ name: string; applications: any[] } | null>(null);

  const openFilterModal = (zoneName: string, applications: any[]) => {
    setSelectedZone({ name: zoneName, applications });
    setFilterModalOpen(true);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 px-4 py-3 border-b border-slate-500">
        <h3 className="text-white" style={{ fontWeight: 700 }}>
          Zone-wise Application Summary
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
              <th className="px-4 py-3 text-left text-[13px]" style={{ fontWeight: 700 }}>Zone</th>
              <th className="px-3 py-3 text-center text-[13px] border-l border-slate-500" colSpan={2} style={{ fontWeight: 700 }}>
                New Connection
              </th>
              <th className="px-3 py-3 text-center text-[13px] border-l border-slate-500" colSpan={2} style={{ fontWeight: 700 }}>
                Disconnect
              </th>
              <th className="px-3 py-3 text-center text-[13px] border-l border-slate-500" colSpan={2} style={{ fontWeight: 700 }}>
                Alteration
              </th>
              <th className="px-3 py-3 text-center text-[13px] border-l border-slate-500" colSpan={2} style={{ fontWeight: 700 }}>
                Mutation
              </th>
              <th className="px-3 py-3 text-center text-[13px] border-l border-slate-500" colSpan={2} style={{ fontWeight: 700 }}>
                Complaint
              </th>
              <th className="px-3 py-3 text-center text-[13px] border-l border-slate-500" colSpan={2} style={{ fontWeight: 700 }}>
                Objection
              </th>
              <th className="px-3 py-3 text-center text-[13px] border-l border-slate-500" style={{ fontWeight: 700 }}>
                Total Pending
              </th>
              <th className="px-3 py-3 text-center text-[13px] border-l border-slate-500" style={{ fontWeight: 700 }}>
                Total Approved
              </th>
              <th className="px-3 py-3 text-center text-[13px] border-l border-slate-500" style={{ fontWeight: 700 }}>
                Grand Total
              </th>
            </tr>
            <tr className="bg-slate-500 text-white text-xs">
              <th className="px-4 py-2"></th>
              <th className="px-2 py-2 text-center border-l border-slate-400" style={{ fontWeight: 600 }}>Regular</th>
              <th className="px-2 py-2 text-center" style={{ fontWeight: 600 }}>Yearly</th>
              <th className="px-2 py-2 text-center border-l border-slate-400" style={{ fontWeight: 600 }}>Regular</th>
              <th className="px-2 py-2 text-center" style={{ fontWeight: 600 }}>Yearly</th>
              <th className="px-2 py-2 text-center border-l border-slate-400" style={{ fontWeight: 600 }}>Regular</th>
              <th className="px-2 py-2 text-center" style={{ fontWeight: 600 }}>Yearly</th>
              <th className="px-2 py-2 text-center border-l border-slate-400" style={{ fontWeight: 600 }}>Regular</th>
              <th className="px-2 py-2 text-center" style={{ fontWeight: 600 }}>Yearly</th>
              <th className="px-2 py-2 text-center border-l border-slate-400" style={{ fontWeight: 600 }}>Regular</th>
              <th className="px-2 py-2 text-center" style={{ fontWeight: 600 }}>Yearly</th>
              <th className="px-2 py-2 text-center border-l border-slate-400" style={{ fontWeight: 600 }}>Regular</th>
              <th className="px-2 py-2 text-center" style={{ fontWeight: 600 }}>Yearly</th>
              <th className="px-2 py-2 text-center border-l border-slate-400" style={{ fontWeight: 600 }}></th>
              <th className="px-2 py-2 text-center border-l border-slate-400" style={{ fontWeight: 600 }}></th>
              <th className="px-2 py-2 text-center border-l border-slate-400" style={{ fontWeight: 600 }}></th>
            </tr>
          </thead>
          <tbody>
            {zoneWiseData.map((zone, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <React.Fragment key={zone.zone}>
                  <motion.tr
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`${
                      isEven ? 'bg-white' : 'bg-slate-50'
                    } hover:bg-blue-50/50 transition-colors cursor-pointer border-b border-gray-200`}
                    onClick={() => openFilterModal(zone.zone, zone.applications || [])}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-700" style={{ fontWeight: 600 }}>
                          {zone.zone}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] text-orange-600 border-l border-gray-200" style={{ fontWeight: 600 }}>
                      {zone.newConnection.pending}
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] text-green-600" style={{ fontWeight: 600 }}>
                      {zone.newConnection.approved}
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] text-orange-600 border-l border-gray-200" style={{ fontWeight: 600 }}>
                      {zone.disconnect.pending}
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] text-green-600" style={{ fontWeight: 600 }}>
                      {zone.disconnect.approved}
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] text-orange-600 border-l border-gray-200" style={{ fontWeight: 600 }}>
                      {zone.alteration.pending}
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] text-green-600" style={{ fontWeight: 600 }}>
                      {zone.alteration.approved}
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] text-orange-600 border-l border-gray-200" style={{ fontWeight: 600 }}>
                      {zone.mutation.pending}
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] text-green-600" style={{ fontWeight: 600 }}>
                      {zone.mutation.approved}
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] text-orange-600 border-l border-gray-200" style={{ fontWeight: 600 }}>
                      {zone.complaint.pending}
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] text-green-600" style={{ fontWeight: 600 }}>
                      {zone.complaint.approved}
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] text-orange-600 border-l border-gray-200" style={{ fontWeight: 600 }}>
                      {zone.objection.pending}
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] text-green-600" style={{ fontWeight: 600 }}>
                      {zone.objection.approved}
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] bg-orange-50 text-orange-700 border-l border-gray-200" style={{ fontWeight: 700 }}>
                      {zone.totalPending}
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] bg-green-50 text-green-700 border-l border-gray-200" style={{ fontWeight: 700 }}>
                      {zone.totalApproved}
                    </td>
                    <td className="px-2 py-3 text-center text-[13px] bg-blue-50 text-blue-700 border-l border-gray-200" style={{ fontWeight: 700 }}>
                      {zone.grandTotal}
                    </td>
                  </motion.tr>
                </React.Fragment>
              );
            })}
          </tbody>
          
          {/* Total Row */}
          <tfoot>
            <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
              <td className="px-4 py-3" style={{ fontWeight: 700 }}>Total</td>
              <td className="px-2 py-3 text-center text-[13px] border-l border-slate-600" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.newConnection.pending, 0)}
              </td>
              <td className="px-2 py-3 text-center text-[13px]" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.newConnection.approved, 0)}
              </td>
              <td className="px-2 py-3 text-center text-[13px] border-l border-slate-600" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.disconnect.pending, 0)}
              </td>
              <td className="px-2 py-3 text-center text-[13px]" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.disconnect.approved, 0)}
              </td>
              <td className="px-2 py-3 text-center text-[13px] border-l border-slate-600" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.alteration.pending, 0)}
              </td>
              <td className="px-2 py-3 text-center text-[13px]" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.alteration.approved, 0)}
              </td>
              <td className="px-2 py-3 text-center text-[13px] border-l border-slate-600" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.mutation.pending, 0)}
              </td>
              <td className="px-2 py-3 text-center text-[13px]" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.mutation.approved, 0)}
              </td>
              <td className="px-2 py-3 text-center text-[13px] border-l border-slate-600" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.complaint.pending, 0)}
              </td>
              <td className="px-2 py-3 text-center text-[13px]" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.complaint.approved, 0)}
              </td>
              <td className="px-2 py-3 text-center text-[13px] border-l border-slate-600" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.objection.pending, 0)}
              </td>
              <td className="px-2 py-3 text-center text-[13px]" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.objection.approved, 0)}
              </td>
              <td className="px-2 py-3 text-center text-[13px] bg-orange-100/20 border-l border-slate-600" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.totalPending, 0)}
              </td>
              <td className="px-2 py-3 text-center text-[13px] bg-green-100/20 border-l border-slate-600" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.totalApproved, 0)}
              </td>
              <td className="px-2 py-3 text-center text-[13px] bg-blue-100/20 border-l border-slate-600" style={{ fontWeight: 700 }}>
                {zoneWiseData.reduce((sum, z) => sum + z.grandTotal, 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Filter Report Modal */}
      {selectedZone && (
        <ZonewiseFilterReportModal
          open={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          zoneName={selectedZone.name}
          applications={selectedZone.applications}
        />
      )}
    </div>
  );
}
