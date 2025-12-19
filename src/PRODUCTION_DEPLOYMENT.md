# Production Deployment Guide
## Akola Municipal Corporation CRM System

Complete guide for deploying the frontend application to production with .NET microservices integration.

---

## 📋 Pre-Deployment Checklist

### Backend Requirements
- [ ] .NET microservices are running and accessible
- [ ] All API endpoints are implemented (see API_INTEGRATION_GUIDE.md)
- [ ] CORS is configured for frontend origin
- [ ] JWT authentication is working
- [ ] File upload service is configured
- [ ] Database is set up and migrations are run
- [ ] SSL certificates are installed (HTTPS)

### Frontend Requirements
- [ ] Node.js 18+ is installed
- [ ] Environment variables are configured
- [ ] API endpoints are tested
- [ ] Build succeeds without errors
- [ ] All dependencies are installed

---

## 🚀 Deployment Steps

### Step 1: Configure Environment Variables

Create `.env.production` file:

```env
# Production API URLs
NEXT_PUBLIC_API_BASE_URL=https://api.akolacrm.gov.in/api
NEXT_PUBLIC_APPLICATIONS_API_URL=https://applications-api.akolacrm.gov.in/api
NEXT_PUBLIC_AUTH_API_URL=https://auth-api.akolacrm.gov.in/api
NEXT_PUBLIC_FILE_API_URL=https://files-api.akolacrm.gov.in/api
NEXT_PUBLIC_USERS_API_URL=https://users-api.akolacrm.gov.in/api

# Environment
NEXT_PUBLIC_ENV=production

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_DEBUG_MODE=false
```

### Step 2: Replace App Component

**Option A: Direct Replacement (Recommended)**
```bash
# Backup current App.tsx
cp App.tsx App.development.tsx

# Use production version
cp App.production.tsx App.tsx
```

**Option B: Gradual Migration**
Keep both files and use environment variable to switch:
```typescript
// App.tsx
import ProductionApp from './App.production';
import DevelopmentApp from './App.development';

const App = process.env.NEXT_PUBLIC_ENV === 'production' ? ProductionApp : DevelopmentApp;
export default App;
```

### Step 3: Update Component Imports

Update all components to remove static data dependencies. Main files to update:

#### 1. Header Component
Remove static `applications` prop:
```typescript
// Before
<Header applications={applications} ... />

// After  
<Header ... />
```

Use `useApplications` hook inside Header if needed:
```typescript
import { useApplications } from '@/hooks/useApplications';

function Header() {
  const { applications, loading } = useApplications();
  // ... rest of component
}
```

#### 2. CRMDashboard Component
Replace localStorage with API calls:
```typescript
import { useApplications } from '@/hooks/useApplications';
import { useApplication } from '@/hooks/useApplication';

function CRMDashboard() {
  const { 
    applications, 
    loading, 
    fetchApplications 
  } = useApplications();
  
  const { 
    createApplication, 
    updateApplication, 
    deleteApplication 
  } = useApplication();

  useEffect(() => {
    fetchApplications({ page: 1, pageSize: 10 });
  }, []);

  // Rest of component uses hooks instead of setState
}
```

### Step 4: Build for Production

```bash
# Install dependencies
npm install

# Run tests (if you have them)
npm test

# Build for production
npm run build

# The build will be in /.next directory
```

### Step 5: Deploy

#### Option A: Deploy to Vercel (Recommended for Next.js)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Option B: Deploy to Traditional Server
```bash
# Build the application
npm run build

# Start production server
npm start

# Or use PM2 for process management
pm2 start npm --name "akola-crm" -- start
```

#### Option C: Docker Deployment
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t akola-crm-frontend .
docker run -p 3000:3000 akola-crm-frontend
```

---

## 🔧 Configuration

### Next.js Configuration

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: [
      'storage.akolacrm.gov.in', // Your file storage domain
      'api.akolacrm.gov.in',
    ],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### CORS Configuration (.NET Backend)

Add to your .NET Startup.cs or Program.cs:

```csharp
// In ConfigureServices or builder.Services
services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder
            .WithOrigins(
                "https://crm.akolacrm.gov.in", // Production
                "http://localhost:3000" // Development
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// In Configure or app pipeline
app.UseCors("AllowFrontend");
```

---

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit `.env.production` to version control
- Use secure environment variable management (Azure Key Vault, AWS Secrets Manager, etc.)

### 2. API Security
- Always use HTTPS in production
- Implement rate limiting on backend
- Validate all inputs server-side
- Use secure JWT tokens with short expiration

### 3. File Uploads
- Validate file types and sizes server-side
- Scan uploaded files for malware
- Store files in secure, isolated storage
- Use signed URLs for file access

### 4. Authentication
- Implement secure password policies
- Use refresh tokens for session management
- Implement logout on all devices
- Monitor for suspicious activity

---

## 📊 Monitoring & Logging

### Frontend Monitoring

Add error tracking (optional):

```bash
npm install @sentry/nextjs
```

Configure Sentry:
```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_ENV,
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring

Monitor:
- API response times
- Page load times
- Error rates
- User interactions

---

## 🧪 Testing in Production

### 1. Smoke Tests
```bash
# Test health endpoint
curl https://api.akolacrm.gov.in/health

# Test authentication
curl -X POST https://api.akolacrm.gov.in/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@akola.gov.in","password":"password"}'

# Test applications endpoint
curl https://api.akolacrm.gov.in/api/applications?page=1&pageSize=10 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Integration Tests
- Test complete user workflows
- Test all CRUD operations
- Test file uploads
- Test error scenarios

### 3. Load Testing
Use tools like Apache JMeter or k6 to test:
- Concurrent users
- Request throughput
- Response times under load

---

## 🔄 Rollback Plan

If issues occur in production:

### 1. Quick Rollback
```bash
# Switch back to development version
cp App.development.tsx App.tsx

# Rebuild and redeploy
npm run build
npm start
```

### 2. Database Rollback
- Keep database backups
- Document migration scripts
- Test rollback procedures

---

## 📈 Performance Optimization

### 1. Code Splitting
Already implemented with Next.js dynamic imports.

### 2. Image Optimization
Use Next.js `<Image>` component:
```typescript
import Image from 'next/image';

<Image 
  src="/logo.png" 
  alt="Logo" 
  width={200} 
  height={100} 
  priority 
/>
```

### 3. API Caching
Implement caching strategies:
- Browser caching for static assets
- API response caching (Redis on backend)
- Service worker for offline support

### 4. Bundle Size Optimization
```bash
# Analyze bundle size
npm run build
npm run analyze
```

---

## 🚦 Health Checks

Implement health check endpoint in your application:

```typescript
// pages/api/health.ts
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
}
```

---

## 📱 Mobile Considerations

The application is already responsive, but consider:
- Testing on real devices
- Optimizing touch interactions
- Reducing data usage for mobile networks
- Implementing Progressive Web App (PWA) features

---

## 🎯 Post-Deployment Tasks

- [ ] Verify all features are working
- [ ] Test authentication flow
- [ ] Test CRUD operations
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Document any issues
- [ ] Plan for future updates

---

## 📞 Support & Maintenance

### Regular Maintenance
- Weekly: Check error logs
- Monthly: Review performance metrics
- Quarterly: Security audits
- Annually: Dependency updates

### Emergency Contacts
- Backend Team: backend@akola.gov.in
- Frontend Team: frontend@akola.gov.in
- DevOps Team: devops@akola.gov.in

---

## 📝 Change Log

Keep track of all changes:
- Version numbers
- Feature additions
- Bug fixes
- Breaking changes

---

**Deployment Version:** 1.0.0  
**Last Updated:** December 2025  
**Maintained By:** Akola Municipal Corporation IT Department
