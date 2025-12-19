# ⚡ Quick Start Guide

**Get your Panvel Municipal Corporation portal running in 5 minutes!**

---

## 🚀 Super Quick Start (3 Commands)

```bash
npm install
./migrate-files.sh   # Windows: migrate-files.bat
npm run dev
```

**Open:** http://localhost:3000 🎉

---

## 📋 Complete Workflow

### 1️⃣ First Time Setup (One Time Only)

```bash
# Navigate to project
cd panvel-municipal-crm

# Install dependencies (takes 2-5 min)
npm install

# Migrate files to proper structure
chmod +x migrate-files.sh
./migrate-files.sh

# Optional: Setup environment
cp .env.example .env.local
```

### 2️⃣ Start Development

```bash
# Start the dev server
npm run dev

# Open browser at:
# http://localhost:3000
```

### 3️⃣ Verify Everything Works

```bash
# Check TypeScript (should show no errors)
npm run type-check

# Build to test production
npm run build
```

---

## 📁 Project Structure Overview

```
panvel-municipal-crm/
│
├── src/                          # 🎯 Main source code (NEW)
│   ├── app/
│   │   ├── page.tsx             # 🏠 Dashboard (Home page)
│   │   ├── layout.tsx           # 🎨 Root layout
│   │   └── api/                 # 🔌 API routes
│   │
│   ├── components/
│   │   ├── modules/
│   │   │   └── water-tax/       # 💧 All water tax components
│   │   ├── layout/              # 🎨 Header, Sidebar
│   │   └── ui/                  # 🧩 UI components
│   │
│   ├── hooks/                   # 🪝 Custom React hooks
│   ├── lib/                     # 🛠️ Utilities
│   ├── services/                # 🔌 API services
│   ├── types/                   # 📝 TypeScript types
│   └── config/                  # ⚙️ Configuration
│
├── components/                   # ⚠️ OLD (migrate these)
├── styles/                       # 🎨 Global CSS
└── public/                       # 📸 Static assets
```

---

## 🎯 What Works Out of the Box

### ✅ Features Ready

- ✅ Dashboard with live stats
- ✅ Application listing and filtering
- ✅ 5-step registration wizard
- ✅ Edit and view applications
- ✅ Approval workflows
- ✅ Payment processing
- ✅ Notesheet system
- ✅ Reports and exports
- ✅ Zonewise filtering
- ✅ Responsive design

### ⚙️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animations**: Motion (Framer Motion)
- **UI**: Radix UI + Custom Components
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: Sonner

---

## 📝 Daily Development Workflow

### Starting Your Day
```bash
# Pull latest changes (if using Git)
git pull

# Start dev server
npm run dev
```

### While Developing
```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Type checking (optional)
npm run type-check --watch
```

### Before Committing
```bash
# Check for errors
npm run type-check
npm run lint

# Test build
npm run build
```

---

## 🗂️ Key Files to Know

### Configuration
```
/src/config/app.config.ts        # App settings
/tsconfig.json                   # TypeScript config
/next.config.js                  # Next.js config
/.env.local                      # Environment variables
```

### Entry Points
```
/src/app/page.tsx                # Home page (Dashboard)
/src/app/layout.tsx              # Root layout
/src/components/client/DashboardClient.tsx  # Main client component
```

### Main Components (After Migration)
```
/src/components/modules/water-tax/
├── CRMDashboard.tsx             # Main dashboard
├── RegisterApplicationModalStepWise.tsx  # Registration wizard
├── ApplicationsTableSimple.tsx  # Application table
├── FilterBar.tsx                # Filters
└── [35+ other components]
```

---

## 🔧 Common Tasks

### Add a New Component
```bash
# Create in appropriate folder
/src/components/modules/water-tax/MyNewComponent.tsx

# Export in index
/src/components/modules/water-tax/index.ts
```

### Add a New Hook
```bash
# Create hook
/src/hooks/useMyHook.ts

# Export in index
/src/hooks/index.ts
```

### Add API Route
```bash
# Create route
/src/app/api/my-endpoint/route.ts

# Define types
/src/types/service.types.ts
```

### Update Configuration
```bash
# Edit app config
/src/config/app.config.ts
```

---

## 🎨 Customization Quick Guide

### Change Branding
```typescript
// /src/config/app.config.ts
export const appConfig = {
  name: 'Your Corporation Name',
  shortName: 'YCN',
  description: 'Your Description',
  // ...
};
```

### Add New Zone
```typescript
// /src/config/app.config.ts
zones: [
  { value: 'zone-e', label: 'Zone E' },  // Add here
],
```

### Modify Pagination
```typescript
// /src/config/app.config.ts
pagination: {
  defaultPageSize: 20,  // Change from 10
  pageSizeOptions: [10, 20, 50, 100],
},
```

---

## 🐛 Troubleshooting

### Development Server Won't Start
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9

# Clear cache
rm -rf .next

# Restart
npm run dev
```

### Import Errors
```bash
# Check file locations match imports
npm run type-check

# Update tsconfig.json paths if needed
```

### Build Fails
```bash
# Clean build
rm -rf .next node_modules
npm install
npm run build
```

### Slow Performance
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

---

## 📚 Documentation Index

| Document | Purpose |
|----------|---------|
| `README.md` | Project overview and features |
| `SETUP.md` | Detailed setup instructions |
| `MIGRATION_GUIDE.md` | File reorganization guide |
| `DOWNLOAD_AND_RUN.md` | Installation walkthrough |
| `QUICK_START_GUIDE.md` | This file - quick reference |
| `BUTTON_DESIGN_SYSTEM.md` | UI button guidelines |
| `API_INTEGRATION_GUIDE.md` | API usage guide |

---

## ⌨️ Keyboard Shortcuts

### Development
```
Ctrl/Cmd + C        # Stop dev server
Ctrl/Cmd + S        # Save (auto-reload)
F12                 # Open browser DevTools
Ctrl/Cmd + Shift + R # Hard reload browser
```

### VS Code (Recommended)
```
Ctrl/Cmd + P        # Quick file open
Ctrl/Cmd + Shift + F # Find in files
Ctrl/Cmd + `        # Toggle terminal
Alt + Up/Down       # Move line up/down
```

---

## 🔥 Pro Tips

### 1. Use TypeScript Autocomplete
Your IDE will show available props and types. Use `Ctrl+Space` for suggestions.

### 2. Hot Module Replacement
Changes auto-reload in browser. No need to refresh!

### 3. Component Library
All UI components in `/src/components/ui/` are pre-built and ready to use.

### 4. Type Safety
Let TypeScript catch errors before runtime:
```bash
npm run type-check
```

### 5. Debugging
Use browser DevTools (F12) to inspect components and network requests.

---

## 🎯 Next Steps After Setup

1. **✅ Complete File Migration**
   ```bash
   ./migrate-files.sh  # or migrate-files.bat on Windows
   ```

2. **✅ Read Key Documentation**
   - `/README.md` for overview
   - `/MIGRATION_GUIDE.md` for file structure

3. **✅ Explore Components**
   - Check `/src/components/modules/water-tax/`
   - See how components are organized

4. **✅ Test Features**
   - Try registering an application
   - Test approval workflow
   - Generate reports

5. **✅ Customize**
   - Update branding in config
   - Modify colors and styles
   - Add your own features

---

## 📱 Access Points

### Local Development
```
http://localhost:3000
```

### Network (for testing on mobile)
```bash
# Find your IP
ifconfig | grep inet  # Mac/Linux
ipconfig              # Windows

# Access from device on same network
http://YOUR_IP:3000
```

### Production (after deployment)
```
https://your-domain.com
```

---

## ✅ Quick Checklist

**Before you start coding:**
- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Files migrated to new structure
- [ ] Dev server running (`npm run dev`)
- [ ] Dashboard loads at localhost:3000
- [ ] No errors in terminal
- [ ] No errors in browser console

**You're ready!** 🚀

---

## 🆘 Quick Help

**Problem**: Can't start server  
**Fix**: `npm install` then `npm run dev`

**Problem**: Module not found  
**Fix**: Check import paths match file locations

**Problem**: TypeScript errors  
**Fix**: `npm run type-check` to see all errors

**Problem**: Port in use  
**Fix**: `lsof -ti:3000 | xargs kill -9`

**Problem**: Changes not showing  
**Fix**: Hard reload browser (Ctrl+Shift+R)

---

## 🎉 You're All Set!

### Quick Commands Reference:
```bash
npm run dev          # Start development
npm run build        # Build for production
npm run type-check   # Check types
npm run lint         # Check code quality
```

### Important URLs:
- Dashboard: http://localhost:3000
- API Health: http://localhost:3000/api/health

**Happy Coding! 🚀**

---

*Last updated: December 2024*
*Version: 1.0.0*
