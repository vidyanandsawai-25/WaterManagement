// Common TypeScript type definitions

export interface Application {
  id: string;
  upicId: string;
  consumerNo: string;
  applicantName: string;
  address: string;
  mobileNumber: string;
  applicationDate: string;
  registeredBy: string;
  status: 'pending_approval' | 'approved' | 'rejected' | 'pending_payment' | 'payment_completed' | 'in_progress' | 'completed';
  type: 'new_connection' | 'mutation' | 'alteration' | 'disconnection';
  connectionType?: string;
  propertyType?: string;
  propertyArea?: string;
  existingConsumerNo?: string;
  transferType?: string;
  transferorName?: string;
  transfereeName?: string;
  alterationType?: string;
  reason?: string;
  before?: {
    connectionSize?: string;
    connectionType?: string;
    propertyType?: string;
    propertyArea?: string;
  };
  after?: {
    connectionSize?: string;
    connectionType?: string;
    propertyType?: string;
    propertyArea?: string;
  };
  pendingTax?: TaxEntry[];
  runningTax?: TaxEntry[];
  documents?: Document[];
  zone?: string;
  ward?: string;
}

export interface TaxEntry {
  id: string;
  year: string;
  amount: number;
  status: 'pending' | 'paid';
  dueDate?: string;
  paidDate?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Notesheet {
  id: string;
  applicationId: string;
  title: string;
  description: string;
  status: 'draft' | 'pending_review' | 'approved' | 'rejected';
  createdBy: string;
  createdAt: string;
  approvals: NotesheetApproval[];
  documents?: Document[];
}

export interface NotesheetApproval {
  id: string;
  notesheetId: string;
  officerId: string;
  officerName: string;
  officerRole: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  signature?: string;
  timestamp?: string;
}

export interface Transaction {
  id: string;
  applicationId: string;
  consumerNo: string;
  amount: number;
  type: 'online' | 'dd_cheque' | 'cash';
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  paymentMethod?: string;
  transactionId?: string;
  bankName?: string;
  ddChequeNumber?: string;
  ddChequeDate?: string;
  createdAt: string;
  approvedAt?: string;
}

export interface Officer {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
}

export interface FilterOptions {
  type?: string;
  subType?: string;
  status?: string;
  zone?: string;
  ward?: string;
  fromDate?: string;
  toDate?: string;
  consumerNo?: string;
  taxPayerName?: string;
  txnId?: string;
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Stats {
  totalApplications: number;
  pendingApproval: number;
  approved: number;
  rejected: number;
  inProgress: number;
  completed: number;
  pendingPayment: number;
  paymentCompleted: number;
}
