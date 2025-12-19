# 🚀 Setup Guide - Panvel Municipal Corporation Portal

Complete setup instructions for the Water Tax Management Portal.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or **yarn** >= 1.22.0)
- **Git** (for version control)

Check your versions:
```bash
node --version
npm --version
```

---

## ⚡ Quick Start (5 Minutes)

### 1️⃣ Clone/Extract the Project

```bash
# If using Git
git clone <repository-url>
cd panvel-municipal-crm

# OR just extract the ZIP file and navigate to it
cd panvel-municipal-crm
```

### 2️⃣ Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS 4.0
- Motion (Framer Motion)
- Radix UI components
- And more...

### 3️⃣ Setup Environment Variables

```bash
# Copy the example env file
cp .env.example .env.local

# Edit .env.local with your values (optional for development)
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** in your browser! 🎉

---

## 🏗️ Project Structure Setup

### Current Structure (Before Migration)

```
/
├── components/          # Old components location
├── hooks/              # Old hooks location
├── services/           # Old services location
├── types/              # Old types location
└── src/
    ├── app/
    ├── components/     # Some new components
    └── lib/
```

### Target Structure (After Migration)

```
src/
├── app/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   ├── modules/water-tax/
│   ├── common/
│   └── ui/
├── config/
├── hooks/
├── lib/
├── services/
└── types/
```

### 🔄 Migration Required

**Follow the `/MIGRATION_GUIDE.md` to move files to the proper structure.**

Quick migration command:
```bash
chmod +x migrate-files.sh
./migrate-files.sh
```

---

## 📦 Available Scripts

### Development
```bash
npm run dev        # Start development server at localhost:3000
```

### Production
```bash
npm run build      # Build for production
npm start          # Start production server
```

### Code Quality
```bash
npm run lint       # Run ESLint
npm run type-check # Check TypeScript types
```

---

## 🎨 Features Overview

### ✅ What's Working

1. **Dashboard**
   - Stats overview cards
   - Application listing
   - Filtering and search
   - Pagination

2. **Application Management**
   - 5-step registration wizard
   - Edit applications
   - View details
   - Status tracking

3. **Approval System**
   - Multi-level approvals
   - Notesheet workflow
   - Digital signatures
   - Officer reviews

4. **Payment Processing**
   - Online transactions
   - DD/Cheque approval
   - Payment tracking

5. **Reports**
   - Zonewise reports
   - Download register
   - Excel export

### 🔧 Configuration

Edit `/src/config/app.config.ts` to customize:
- Pagination settings
- File upload limits
- Application types
- Status options
- Zones and wards

---

## 🌐 Environment Variables

### Required
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Optional
```env
NEXT_PUBLIC_APP_NAME=Panvel Municipal Corporation
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### For Production
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-production-domain.com
```

---

## 🗃️ Database Setup (Optional)

Currently, the application uses mock data. To connect a real database:

### 1. Choose a Database
- PostgreSQL (Recommended)
- MySQL
- MongoDB
- Supabase

### 2. Install Database Client
```bash
npm install prisma @prisma/client
# OR
npm install pg
# OR
npm install mongoose
```

### 3. Update Services
Update `/src/services/application.service.ts` to use real API calls.

### 4. Create API Routes
Update `/src/app/api/applications/route.ts` with database queries.

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Set Environment Variables**
   - Go to Vercel Dashboard
   - Project Settings → Environment Variables
   - Add all variables from `.env.example`

### Other Platforms

#### Netlify
```bash
npm run build
# Deploy the .next folder
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

#### Traditional Hosting
```bash
npm run build
npm start
# Use PM2 or similar process manager
```

---

## 🧪 Testing

### Run Type Checks
```bash
npm run type-check
```

### Manual Testing Checklist

- [ ] Dashboard loads successfully
- [ ] Can register new application
- [ ] Can edit application
- [ ] Can view application details
- [ ] Filters work correctly
- [ ] Pagination works
- [ ] Payment modals open
- [ ] Notesheet workflow functions
- [ ] Reports generate
- [ ] Mobile responsive

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Type Errors
```bash
# Rebuild TypeScript
npm run type-check

# Check tsconfig.json paths
cat tsconfig.json
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Import Errors After Migration
```bash
# Use VS Code find and replace
# Find: from ['"]\.+/components/
# Replace: from '@/components/modules/water-tax/
```

---

## 📚 Documentation

- **Migration Guide**: `/MIGRATION_GUIDE.md`
- **Button Design System**: `/BUTTON_DESIGN_SYSTEM.md`
- **API Integration**: `/API_INTEGRATION_GUIDE.md`
- **README**: `/README.md`

---

## 🔐 Security Considerations

### Before Production

1. **Environment Variables**
   - Never commit `.env.local`
   - Use secure values in production
   - Rotate secrets regularly

2. **API Security**
   - Implement authentication
   - Add rate limiting
   - Validate all inputs
   - Use HTTPS only

3. **File Uploads**
   - Validate file types
   - Scan for malware
   - Limit file sizes
   - Store securely

4. **Data Protection**
   - Encrypt sensitive data
   - Follow GDPR/privacy laws
   - Regular backups
   - Access controls

---

## 🆘 Support

### Common Issues

**Q: "Module not found" errors**  
A: Run `npm install` and check `tsconfig.json` paths

**Q: "Port 3000 already in use"**  
A: Use `PORT=3001 npm run dev` or kill the process

**Q: TypeScript errors after migration**  
A: Run `npm run type-check` and fix import paths

**Q: Components not rendering**  
A: Check browser console for errors and verify imports

### Getting Help

1. Check `/MIGRATION_GUIDE.md`
2. Review error messages in terminal
3. Check browser developer console
4. Verify all files are in correct locations

---

## ✅ Post-Setup Checklist

After setup, verify:

- [ ] Development server runs without errors
- [ ] All pages load successfully
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] Components render correctly
- [ ] Modals open and close properly
- [ ] Forms submit successfully
- [ ] Responsive design works

---

## 🎉 You're Ready!

Your Panvel Municipal Corporation portal is now set up and ready for development!

### Next Steps:

1. ✅ Complete file migration (see `/MIGRATION_GUIDE.md`)
2. ✅ Configure environment variables
3. ✅ Customize branding in config
4. ✅ Connect to real database (optional)
5. ✅ Deploy to production

**Happy Coding! 🚀**
