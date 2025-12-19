# API Integration Guide
## Akola Municipal Corporation CRM - Frontend

This document provides a comprehensive guide for integrating the Next.js frontend with your .NET microservices backend.

---

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Setup Instructions](#setup-instructions)
3. [API Endpoints Required](#api-endpoints-required)
4. [Data Models](#data-models)
5. [Authentication Flow](#authentication-flow)
6. [Error Handling](#error-handling)
7. [File Upload](#file-upload)
8. [Testing](#testing)

---

## 🏗️ Architecture Overview

### Frontend Structure
```
/
├── types/              # TypeScript type definitions
├── services/           # API service layer
│   ├── api.service.ts      # Core HTTP client
│   ├── application.service.ts  # Application APIs
│   ├── auth.service.ts     # Authentication APIs
│   └── file.service.ts     # File upload/download
├── hooks/              # Custom React hooks
│   ├── useApplications.ts  # Fetch applications list
│   ├── useApplication.ts   # Single application CRUD
│   └── useFileUpload.ts    # File upload hook
├── config/             # Configuration files
│   └── api.config.ts       # API endpoints & config
└── utils/              # Utility functions
    └── helpers.ts          # Helper functions
```

### Communication Flow
```
Component → Custom Hook → Service Layer → API Service → .NET Microservice
```

---

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Single API Gateway (Recommended)
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# OR Multiple Microservices
NEXT_PUBLIC_APPLICATIONS_API_URL=http://localhost:5001/api
NEXT_PUBLIC_AUTH_API_URL=http://localhost:5002/api
NEXT_PUBLIC_FILE_API_URL=http://localhost:5003/api
NEXT_PUBLIC_USERS_API_URL=http://localhost:5004/api
```

### 3. Run Development Server
```bash
npm run dev
# or
yarn dev
```

---

## 🔌 API Endpoints Required

Your .NET backend must implement the following endpoints:

### Authentication API

#### POST `/api/auth/login`
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "Admin",
      "department": "Water Department"
    },
    "token": "jwt_access_token",
    "refreshToken": "jwt_refresh_token",
    "expiresIn": 3600
  },
  "timestamp": "2025-12-03T10:30:00Z"
}
```

#### POST `/api/auth/refresh`
**Request:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response:** Same as login response

#### GET `/api/auth/me`
**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "Admin",
    "department": "Water Department"
  }
}
```

---

### Applications API

#### GET `/api/applications`
**Query Parameters:**
- `page` (number): Page number (default: 1)
- `pageSize` (number): Items per page (default: 10)
- `applicationType` (string): Filter by type
- `status` (string): Filter by status
- `priority` (string): Filter by priority
- `assignedTo` (string): Filter by employee
- `search` (string): Search query
- `dateFrom` (string): Filter from date (ISO 8601)
- `dateTo` (string): Filter to date (ISO 8601)
- `sortField` (string): Field to sort by
- `sortDirection` (string): 'asc' or 'desc'

**Response:**
```json
{
  "success": true,
  "message": "Applications retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "applicationNo": "APP-2025-0001",
      "applicantName": "Ramesh Kumar",
      "applicationType": "New Connection",
      "status": "Initiated",
      "dateSubmitted": "2025-12-03T10:00:00Z",
      "priority": "High",
      "assignedTo": "EMP-001",
      "consumerNo": "CON-12345",
      "consumerName": "Ramesh Kumar",
      "mobileNumber": "9876543210",
      "address": "Plot No. 123, Ward 5, Akola",
      "zoneNo": "Z-01",
      "wardNo": "W-05",
      "propertyNo": "P-123",
      "propertyType": "Residential",
      "buildingType": "Individual",
      "connectionCategory": "Domestic",
      "connectionType": "Metered",
      "loadRequirement": "5 KL/day",
      "installationLocation": "Ground Floor"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalItems": 100,
    "totalPages": 10
  }
}
```

#### GET `/api/applications/{id}`
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "applicationNo": "APP-2025-0001",
    // ... all application fields
  }
}
```

#### POST `/api/applications`
**Request:**
```json
{
  "applicationType": "New Connection",
  "consumerName": "Ramesh Kumar",
  "mobileNumber": "9876543210",
  "address": "Plot No. 123, Ward 5, Akola",
  "zoneNo": "Z-01",
  "wardNo": "W-05",
  "propertyNo": "P-123",
  "propertyType": "Residential",
  "buildingType": "Individual",
  "connectionCategory": "Domestic",
  "connectionType": "Metered",
  "loadRequirement": "5 KL/day",
  "installationLocation": "Ground Floor"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application created successfully",
  "data": {
    "id": "uuid",
    "applicationNo": "APP-2025-0001",
    // ... complete application object
  }
}
```

#### PUT `/api/applications/{id}`
**Request:** Same structure as POST (partial updates allowed)

**Response:** Same as POST response

#### DELETE `/api/applications/{id}`
**Response:**
```json
{
  "success": true,
  "message": "Application deleted successfully"
}
```

#### POST `/api/applications/allocate`
**Request:**
```json
{
  "applicationId": "uuid",
  "employeeId": "EMP-001",
  "priority": "High",
  "notes": "Urgent case"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application allocated successfully",
  "data": {
    // ... updated application object
  }
}
```

#### GET `/api/applications/stats`
**Response:**
```json
{
  "success": true,
  "data": {
    "totalApplications": 1250,
    "pendingApplications": 350,
    "approvedApplications": 800,
    "rejectedApplications": 100,
    "todayApplications": 25,
    "applicationsByType": {
      "New Connection": 450,
      "Mutation": 300,
      "Disconnection": 200,
      "Alteration": 300
    },
    "applicationsByStatus": {
      "Initiated": 200,
      "Upload Note Sheet": 100,
      "Send to Approval": 50,
      "Application Accepted": 800,
      "Make Payment": 100
    },
    "revenueCollected": 5250000
  }
}
```

---

### File Upload API

#### POST `/api/files/upload`
**Request:** `multipart/form-data`
- Single file: `file` (form field)
- Multiple files: `files` (form field, multiple)

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "fileName": "property_tax_receipt_1234567890.pdf",
    "fileUrl": "https://storage.example.com/uploads/property_tax_receipt_1234567890.pdf",
    "fileSize": 524288,
    "uploadedAt": "2025-12-03T10:30:00Z"
  }
}
```

#### GET `/api/files/download/{fileName}`
**Response:** File stream (binary)

#### DELETE `/api/files/{fileName}`
**Response:**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

---

### Users API

#### GET `/api/users`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "EMP-001",
      "name": "Suresh Patil",
      "email": "suresh@akola.gov.in",
      "role": "Engineer",
      "department": "Water Department"
    }
  ]
}
```

#### GET `/api/users/search?query={searchTerm}`
**Response:** Same as GET /api/users

---

## 📊 Data Models

### Application Status Flow

```
New Connection:
Initiated → Upload Note Sheet → Send to Approval → Application Accepted → Make Payment → Application Accepted

Mutation/Alteration/Disconnection:
Initiated → Upload Note Sheet → Send to Approval → Application Accepted
```

### TypeScript Types
All type definitions are in `/types/index.ts`. Key types:

- `Application` - Complete application object
- `CreateApplicationDto` - Data for creating application
- `UpdateApplicationDto` - Data for updating application
- `ApplicationType` - "New Connection" | "Mutation" | "Disconnection" | "Alteration"
- `ApplicationStatus` - Status enum
- `PaginatedResponse<T>` - Paginated API response
- `ApiResponse<T>` - Standard API response wrapper
- `ApiError` - Error response structure

---

## 🔐 Authentication Flow

### 1. Login
```typescript
import { authService } from '@/services/auth.service';

const response = await authService.login(email, password);
// Token is automatically stored in localStorage
```

### 2. Authenticated Requests
All requests automatically include the JWT token in the `Authorization` header:
```
Authorization: Bearer {token}
```

### 3. Token Refresh
```typescript
// Manually refresh token
await authService.refreshToken();

// Or handle 401 errors globally (already implemented)
```

### 4. Logout
```typescript
await authService.logout();
// Clears all tokens and user data
```

### 5. Check Authentication
```typescript
const isLoggedIn = authService.isAuthenticated();
```

---

## ⚠️ Error Handling

### Standard Error Response
```json
{
  "message": "Error message",
  "errors": {
    "field1": ["Validation error 1"],
    "field2": ["Validation error 2"]
  },
  "statusCode": 400,
  "timestamp": "2025-12-03T10:30:00Z"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `204` - No Content
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/expired token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

### Frontend Error Handling
Errors are automatically handled by:
1. API Service layer (retries, timeouts)
2. Custom hooks (state management)
3. Toast notifications (user feedback)

---

## 📁 File Upload

### Supported File Types
- Images: JPEG, PNG
- Documents: PDF

### File Size Limit
Default: 10 MB (configurable in `fileService.validateFile()`)

### Upload Process
```typescript
import { useFileUpload } from '@/hooks/useFileUpload';

const { uploadFile, uploading } = useFileUpload();

const handleUpload = async (file: File) => {
  const result = await uploadFile(file);
  if (result) {
    console.log('File URL:', result.fileUrl);
  }
};
```

---

## 🧪 Testing

### Test API Endpoints
Use tools like Postman or curl:

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@akola.gov.in","password":"password123"}'

# Get Applications (with token)
curl -X GET "http://localhost:5000/api/applications?page=1&pageSize=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Mock Data During Development
If backend is not ready, you can use the existing mock data in `/data/applications.ts` temporarily. The frontend will work with localStorage until APIs are connected.

---

## 🔄 Migration from Static to Dynamic

### Current Implementation
Static data is stored in `/data/applications.ts` and uses localStorage.

### To Connect Backend

1. **Set environment variables** in `.env.local`
2. **Components automatically use hooks** which call the API services
3. **Remove localStorage logic** from components (already done in new architecture)
4. **Test each endpoint** individually
5. **Deploy**

### No Code Changes Needed
The components are already designed to work with the API services through custom hooks.

---

## 📞 Support

For issues or questions:
1. Check API endpoint responses match the expected format
2. Verify authentication tokens are being sent correctly
3. Check CORS configuration on backend
4. Review browser console for errors
5. Check network tab in DevTools

---

## 🎯 Best Practices

### Backend Requirements
1. ✅ **CORS**: Enable CORS for frontend origin
2. ✅ **JWT**: Use standard JWT format
3. ✅ **Pagination**: Always return pagination metadata
4. ✅ **Error Messages**: Provide clear, user-friendly messages
5. ✅ **Validation**: Validate all inputs server-side
6. ✅ **Status Codes**: Use appropriate HTTP status codes
7. ✅ **Timestamps**: Use ISO 8601 format (UTC)
8. ✅ **File Storage**: Return publicly accessible URLs

### Security
- Use HTTPS in production
- Implement rate limiting
- Validate file uploads server-side
- Sanitize all inputs
- Use secure, httpOnly cookies for refresh tokens (recommended)
- Implement CSRF protection

---

## 📝 Next Steps

1. Set up your .NET microservices
2. Implement the required endpoints
3. Configure environment variables
4. Test authentication flow
5. Test CRUD operations
6. Test file uploads
7. Deploy to production

---

**Version:** 1.0.0  
**Last Updated:** December 2025  
**Author:** Akola Municipal Corporation Development Team
