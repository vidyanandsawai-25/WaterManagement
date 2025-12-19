// Service-specific type definitions

export interface ApplicationCreateInput {
  upicId: string;
  consumerNo?: string;
  applicantName: string;
  address: string;
  mobileNumber: string;
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
  zone?: string;
  ward?: string;
}

export interface ApplicationUpdateInput {
  applicantName?: string;
  address?: string;
  mobileNumber?: string;
  status?: string;
  connectionType?: string;
  propertyType?: string;
  propertyArea?: string;
}

export interface NotesheetCreateInput {
  applicationId: string;
  title: string;
  description: string;
  documents?: File[];
}

export interface ApprovalInput {
  applicationId: string;
  status: 'approved' | 'rejected';
  comments?: string;
  approvedBy: string;
}

export interface PaymentInput {
  applicationId: string;
  amount: number;
  type: 'online' | 'dd_cheque' | 'cash';
  paymentMethod?: string;
  transactionId?: string;
  bankName?: string;
  ddChequeNumber?: string;
  ddChequeDate?: string;
}

export interface FileUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
