// ============================================
// TYPE DEFINITIONS FOR AKOLA MUNICIPAL CORPORATION CRM
// ============================================

/**
 * Application Types
 */
export type ApplicationType = 'New Connection' | 'Mutation' | 'Disconnection' | 'Alteration';

/**
 * Application Status Flow:
 * New Connection: Initiated → Upload Note Sheet → Send to Approval → Application Accepted → Make Payment → Application Accepted
 * Mutation/Alteration/Disconnection: Initiated → Upload Note Sheet → Send to Approval → Application Accepted (no payment)
 */
export type ApplicationStatus = 
  | 'Initiated' 
  | 'Upload Note Sheet' 
  | 'Send to Approval' 
  | 'Application Accepted' 
  | 'Make Payment';

export type PropertyType = 'Residential' | 'Commercial' | 'Industrial';
export type BuildingType = 'Individual' | 'Apartment' | 'Complex';
export type ConnectionCategory = 'Domestic' | 'Non-Domestic' | 'Industrial';
export type ConnectionType = 'Metered' | 'Non-Metered';
export type RiskLevel = 'Low' | 'Medium' | 'High';

/**
 * Core Application Interface
 */
export interface Application {
  id: string;
  applicationNo: string;
  applicantName: string;
  applicationType: ApplicationType;
  status: ApplicationStatus;
  dateSubmitted: string;
  priority: RiskLevel;
  assignedTo: string;
  consumerNo: string;
  consumerName: string;
  mobileNumber: string;
  address: string;
  zoneNo: string;
  wardNo: string;
  propertyNo: string;
  propertyType: PropertyType;
  buildingType: BuildingType;
  connectionCategory: ConnectionCategory;
  connectionType: ConnectionType;
  propertyTaxReceipt?: string;
  identityProof?: string;
  ownershipDocument?: string;
  constructionApproval?: string;
  loadRequirement?: string;
  installationLocation?: string;
  existingMeterNo?: string;
  meterReadingPhoto?: string;
  mutationReason?: string;
  newConsumerName?: string;
  newMobileNumber?: string;
  newAddress?: string;
  disconnectionReason?: string;
  finalMeterReading?: string;
  alterationDetails?: string;
  proposedChanges?: string;
  technicalDrawing?: string;
  uploadedNoteSheet?: string;
  paymentAmount?: string;
  noteSheetUploadDate?: string;
  approvalDate?: string;
  paymentDate?: string;
}

/**
 * API Response Wrapper
 */
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

/**
 * Paginated Response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  success: boolean;
  message: string;
}

/**
 * API Error Response
 */
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
  timestamp: string;
}

/**
 * Filter Parameters for Applications
 */
export interface ApplicationFilters {
  applicationType?: ApplicationType;
  status?: ApplicationStatus;
  priority?: RiskLevel;
  assignedTo?: string;
  searchQuery?: string;
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Sort Parameters
 */
export interface SortParams {
  field: keyof Application;
  direction: 'asc' | 'desc';
}

/**
 * Pagination Parameters
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * Application Query Parameters (combines filters, sorting, pagination)
 */
export interface ApplicationQueryParams extends PaginationParams {
  filters?: ApplicationFilters;
  sort?: SortParams;
}

/**
 * User/Employee Interface
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
}

/**
 * Authentication Response
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Dashboard Statistics
 */
export interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  todayApplications: number;
  applicationsByType: Record<ApplicationType, number>;
  applicationsByStatus: Record<ApplicationStatus, number>;
  revenueCollected: number;
}

/**
 * Create Application DTO
 */
export interface CreateApplicationDto {
  applicationType: ApplicationType;
  consumerNo?: string;
  consumerName: string;
  mobileNumber: string;
  address: string;
  zoneNo: string;
  wardNo: string;
  propertyNo: string;
  propertyType: PropertyType;
  buildingType: BuildingType;
  connectionCategory: ConnectionCategory;
  connectionType: ConnectionType;
  propertyTaxReceipt?: string;
  identityProof?: string;
  ownershipDocument?: string;
  constructionApproval?: string;
  loadRequirement?: string;
  installationLocation?: string;
  existingMeterNo?: string;
  meterReadingPhoto?: string;
  mutationReason?: string;
  newConsumerName?: string;
  newMobileNumber?: string;
  newAddress?: string;
  disconnectionReason?: string;
  finalMeterReading?: string;
  alterationDetails?: string;
  proposedChanges?: string;
  technicalDrawing?: string;
}

/**
 * Update Application DTO
 */
export interface UpdateApplicationDto extends Partial<CreateApplicationDto> {
  status?: ApplicationStatus;
  assignedTo?: string;
  priority?: RiskLevel;
  uploadedNoteSheet?: string;
  paymentAmount?: string;
}

/**
 * Allocate Application DTO
 */
export interface AllocateApplicationDto {
  applicationId: string;
  employeeId: string;
  priority?: RiskLevel;
  notes?: string;
}

/**
 * File Upload Response
 */
export interface FileUploadResponse {
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: string;
}
