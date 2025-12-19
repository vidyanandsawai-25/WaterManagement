import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { FileText, Loader2, FileCheck, Search } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface AllocateApplicationModalProps {
  open: boolean;
  onClose: () => void;
}

interface ApplicationRow {
  id: string;
  applicationNo: string;
  dateTime: string;
  upicId: string;
  consumerNo: string;
  details: string;
  applicantName: string;
  applicationType: string;
  remark: string;
  awaitedDays: number;
  office: string;
  hasDocuments: boolean;
  status: string;
}

const municipalStaff = [
  { id: '1', name: 'Rajesh Patil - Field Officer' },
  { id: '2', name: 'Sunita Deshmukh - Senior Inspector' },
  { id: '3', name: 'Anil Kumar - Executive Engineer' },
  { id: '4', name: 'Priya Sharma - Assistant Engineer' },
  { id: '5', name: 'Vikram Singh - Junior Engineer' },
];

const mockApplications: ApplicationRow[] = [
  {
    id: '1',
    applicationNo: 'CRM202532404',
    dateTime: '10/14/2025 09:30',
    upicId: 'PMC302420',
    consumerNo: 'PMC302420',
    details: 'New Connection',
    applicantName: 'Ramesh Kumar Sharma',
    applicationType: 'New Connection',
    remark: 'Site verification pending',
    awaitedDays: 2,
    office: 'Online',
    hasDocuments: true,
    status: 'Pending Verified',
  },
  {
    id: '2',
    applicationNo: 'CRM202532405',
    dateTime: '10/13/2025 14:20',
    upicId: 'PMC302421',
    consumerNo: 'PMC302421',
    details: 'Mutation',
    applicantName: 'Anjali Deshmukh',
    applicationType: 'Mutation',
    remark: 'Documents verified',
    awaitedDays: 3,
    office: 'Online',
    hasDocuments: true,
    status: 'Pending Verified',
  },
  {
    id: '3',
    applicationNo: 'CRM202532406',
    dateTime: '10/12/2025 11:15',
    upicId: 'PMC302422',
    consumerNo: 'PMC302422',
    details: 'Disconnection',
    applicantName: 'Suresh Yadav',
    applicationType: 'Disconnection',
    remark: 'Final reading pending',
    awaitedDays: 4,
    office: 'Online',
    hasDocuments: true,
    status: 'Pending Verified',
  },
];

export function AllocateApplicationModal({ open, onClose }: AllocateApplicationModalProps) {
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [userAssignments, setUserAssignments] = useState<Record<string, string>>({});
  const [isAllocating, setIsAllocating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleApplication = (id: string) => {
    setSelectedApplications(prev =>
      prev.includes(id) ? prev.filter(appId => appId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedApplications.length === mockApplications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(mockApplications.map(app => app.id));
    }
  };

  const handleUserAssignment = (appId: string, userId: string) => {
    setUserAssignments(prev => ({
      ...prev,
      [appId]: userId,
    }));
  };

  const handleAllocate = () => {
    if (selectedApplications.length === 0) {
      toast.error('Please select at least one application');
      return;
    }

    const unassigned = selectedApplications.filter(id => !userAssignments[id]);
    if (unassigned.length > 0) {
      toast.error('Please assign users to all selected applications');
      return;
    }

    setIsAllocating(true);
    // Simulate API call
    setTimeout(() => {
      setIsAllocating(false);
      toast.success(`${selectedApplications.length} application(s) allocated successfully!`);
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    setSelectedApplications([]);
    setUserAssignments({});
    setIsAllocating(false);
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending verified':
        return 'bg-yellow-100 text-yellow-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDaysColor = (days: number) => {
    if (days <= 2) return 'bg-green-500 text-white';
    if (days <= 4) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  const filteredApplications = mockApplications.filter(app =>
    app.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.upicId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.consumerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.remark.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.dateTime.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="!max-w-[98vw] w-[98vw] sm:!max-w-[96vw] md:!max-w-[95vw] lg:!max-w-[95vw] xl:!max-w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-white to-blue-50">
        <DialogHeader className="border-b sm:pb-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded-[31px] pt-[0px] pr-[0px] pb-[11px] pl-[0px]">
          <div className="flex items-center gap-2 sm:gap-3 py-[0px] px-[25px] pt-[8px] pr-[25px] pl-[25px] rounded-[28px] pb-[-1px]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400/70 to-blue-500/70 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
              <FileCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg sm:text-2xl text-white truncate">
                Allocate Applications
              </DialogTitle>
              <DialogDescription className="text-white/90 text-xs sm:text-sm truncate">
                Assign to staff members
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="bg-gradient-to-br from-blue-50/60 to-blue-100/60 p-4 rounded-xl border border-blue-200/50 shadow-sm">
            <div className="text-xs text-blue-600 mb-1" style={{ fontWeight: 600 }}>Total Applications</div>
            <div className="text-2xl text-blue-700" style={{ fontWeight: 700 }}>{mockApplications.length}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50/60 to-purple-100/60 p-4 rounded-xl border border-purple-200/50 shadow-sm">
            <div className="text-xs text-purple-600 mb-1" style={{ fontWeight: 600 }}>Selected</div>
            <div className="text-2xl text-purple-700" style={{ fontWeight: 700 }}>{selectedApplications.length}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50/60 to-green-100/60 p-4 rounded-xl border border-green-200/50 shadow-sm">
            <div className="text-xs text-green-600 mb-1" style={{ fontWeight: 600 }}>Assigned</div>
            <div className="text-2xl text-green-700" style={{ fontWeight: 700 }}>
              {Object.keys(userAssignments).filter(id => selectedApplications.includes(id)).length}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500/70" />
            <Input
              type="text"
              placeholder="Search by anything... (Application No, Name, Type, UPIC ID, Consumer No, Date, Status, Remark)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-[41px] pr-[16px] h-12 border border-blue-300/60 focus:border-blue-500/80 rounded-[22px] bg-white shadow-sm text-sm placeholder:text-gray-400 pt-[4px] pb-[4px]"
            />
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ×
              </motion.button>
            )}
          </div>
          {searchTerm && (
            <div className="mt-2 text-xs text-gray-600">
              Found <span className="text-blue-600" style={{ fontWeight: 700 }}>{filteredApplications.length}</span> result(s)
            </div>
          )}
        </motion.div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200/60">
          <Table className="p-[0px]">
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 border-b border-blue-400/30">
                <TableHead className="text-white text-center" style={{ fontWeight: 700 }}>
                  <Checkbox
                    checked={selectedApplications.length === mockApplications.length}
                    onCheckedChange={toggleAll}
                    className="border border-white"
                  />
                </TableHead>
                <TableHead className="text-white text-center text-xs" style={{ fontWeight: 700 }}>Sr No</TableHead>
                <TableHead className="text-white text-xs" style={{ fontWeight: 700 }}>Application No</TableHead>
                <TableHead className="text-white text-xs" style={{ fontWeight: 700 }}>Date/Time</TableHead>
                <TableHead className="text-white text-xs" style={{ fontWeight: 700 }}>UPIC ID</TableHead>
                <TableHead className="text-white text-xs" style={{ fontWeight: 700 }}>Consumer No</TableHead>
                <TableHead className="text-white text-xs" style={{ fontWeight: 700 }}>Application Details</TableHead>
                <TableHead className="text-white text-xs" style={{ fontWeight: 700 }}>Applicant Name</TableHead>
                <TableHead className="text-white text-xs" style={{ fontWeight: 700 }}>Application Type</TableHead>
                <TableHead className="text-white text-xs" style={{ fontWeight: 700 }}>Remark</TableHead>
                <TableHead className="text-white text-center text-xs" style={{ fontWeight: 700 }}>Awaited Days</TableHead>
              
                <TableHead className="text-white text-center text-xs" style={{ fontWeight: 700 }}>Documents</TableHead>
                <TableHead className="text-white text-xs" style={{ fontWeight: 700 }}>Status</TableHead>
                <TableHead className="text-white text-xs" style={{ fontWeight: 700 }}>Select User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app, index) => (
                <TableRow
                  key={app.id}
                  className={`hover:bg-blue-50/30 transition-colors border-b ${selectedApplications.includes(app.id) ? 'bg-gradient-to-r from-blue-50/40 to-purple-50/40 border-blue-200/40' : ''}`}
                >
                  <TableCell className="text-center">
                    <Checkbox
                      checked={selectedApplications.includes(app.id)}
                      onCheckedChange={() => toggleApplication(app.id)}
                      className="border"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-700 text-xs mx-auto shadow-sm" style={{ fontWeight: 600 }}>
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell className="text-blue-600 text-xs" style={{ fontWeight: 700 }}>{app.applicationNo}</TableCell>
                  <TableCell className="text-xs text-gray-600 whitespace-nowrap" style={{ fontWeight: 500 }}>{app.dateTime}</TableCell>
                  <TableCell className="text-purple-600 text-xs" style={{ fontWeight: 600 }}>{app.upicId}</TableCell>
                  <TableCell className="text-purple-600 text-xs" style={{ fontWeight: 600 }}>{app.consumerNo}</TableCell>
                  <TableCell className="text-xs" style={{ fontWeight: 600 }}>{app.details}</TableCell>
                  <TableCell className="text-xs" style={{ fontWeight: 600 }}>{app.applicantName}</TableCell>
                  <TableCell className="text-xs">{app.applicationType}</TableCell>
                  <TableCell className="text-xs text-gray-600">{app.remark}</TableCell>
                  <TableCell className="text-center">
                    <div className={`w-9 h-9 rounded-full ${getDaysColor(app.awaitedDays)} flex items-center justify-center mx-auto shadow-md ring-2 ring-white ring-offset-1`}>
                      <span className="text-xs" style={{ fontWeight: 800 }}>{app.awaitedDays}</span>
                    </div>
                  </TableCell>
                 
                  <TableCell className="text-center">
                    {app.hasDocuments && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full bg-blue-100 hover:bg-blue-200"
                        title="View Documents"
                      >
                        <FileText className="w-4 h-4 text-blue-600" />
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(app.status)} text-xs`} style={{ fontWeight: 700 }}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-left text-[15px] font-bold not-italic no-underline">
                    <Select
                      value={userAssignments[app.id] || ''}
                      onValueChange={(value) => handleUserAssignment(app.id, value)}
                      disabled={!selectedApplications.includes(app.id)}
                    >
                      <SelectTrigger className={`w-[180px] border rounded-lg ${ 
                        selectedApplications.includes(app.id) 
                          ? 'border-blue-300/60 bg-blue-50/30' 
                          : 'border-gray-200/60'
                      }`}>
                        <SelectValue placeholder="Select User" />
                      </SelectTrigger>
                      <SelectContent>
                        {municipalStaff.map((staff) => (
                          <SelectItem key={staff.id} value={staff.id}>
                            👤 {staff.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200/60 bg-gradient-to-r from-blue-50/30 to-purple-50/30 px-4 py-3 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-700" style={{ fontWeight: 600 }}>
              {selectedApplications.length} application(s) selected
            </div>
            {selectedApplications.length > 0 && (
              <div className="text-xs text-orange-600 bg-orange-100 px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>
                {Object.keys(userAssignments).filter(id => selectedApplications.includes(id)).length}/{selectedApplications.length} assigned
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">💡</span>
            </div>
            <span>Tip: Select applications and assign users before allocating</span>
          </div>
        </div>

        <DialogFooter className="border-t pt-4 mt-2">
          <Button variant="outline" onClick={handleClose} disabled={isAllocating} className="border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg">
            Cancel
          </Button>
          <Button
            onClick={handleAllocate}
            disabled={isAllocating || selectedApplications.length === 0}
            className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white shadow-sm hover:shadow-md transition-all rounded-lg px-6"
          >
            {isAllocating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Allocating...
              </>
            ) : (
              <>
                <FileCheck className="w-4 h-4 mr-2" />
                Allocate Selected ({selectedApplications.length})
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}