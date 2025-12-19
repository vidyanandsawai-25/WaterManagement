# 📥 Download and Run Guide

**Complete guide to download, setup, and run the Panvel Municipal Corporation portal**

---

## 🎯 Quick Start (3 Simple Steps)

### Step 1: Download & Extract
```bash
# Extract the ZIP file to your desired location
# Navigate to the extracted folder
cd panvel-municipal-crm
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run the Application
```bash
npm run dev
```

**That's it!** Visit `http://localhost:3000` 🎉

---

## 📦 What's Included

After downloading, you'll have:

```
panvel-municipal-crm/
├── src/                         ✅ New Next.js structure
│   ├── app/                    # Next.js pages and API routes
│   ├── components/             # React components
│   ├── config/                 # App configuration
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities and helpers
│   ├── services/               # API services
│   └── types/                  # TypeScript types
│
├── components/                  ⚠️ Old structure (to be migrated)
├── styles/                      # Global CSS
├── public/                      # Static assets
│
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── next.config.js               # Next.js config
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
│
├── README.md                    # Project overview
├── SETUP.md                     # Detailed setup guide
├── MIGRATION_GUIDE.md           # File migration instructions
├── DOWNLOAD_AND_RUN.md          # This file
│
├── migrate-files.sh             # Migration script (Mac/Linux)
└── migrate-files.bat            # Migration script (Windows)
```

---

## 🖥️ System Requirements

### Minimum Requirements
- **OS**: Windows 10+, macOS 10.15+, or Linux
- **Node.js**: 18.0.0 or higher
- **RAM**: 4GB minimum
- **Disk Space**: 500MB for dependencies

### Recommended
- **Node.js**: 20.x LTS
- **RAM**: 8GB or more
- **SSD**: For faster build times

---

## 🔧 Pre-Installation Checklist

### 1. Install Node.js

**Check if already installed:**
```bash
node --version
npm --version
```

**If not installed, download from:**
- Official: https://nodejs.org/ (Download LTS version)
- Or use nvm: https://github.com/nvm-sh/nvm

**Recommended installation:**
```bash
# Using nvm (recommended)
nvm install 20
nvm use 20
```

### 2. Choose Your Terminal

**Windows:**
- Command Prompt
- PowerShell
- Git Bash
- Windows Terminal (recommended)

**macOS/Linux:**
- Terminal
- iTerm2
- Zsh

---

## 📥 Installation Methods

### Method 1: Direct Download (Easiest)

1. **Extract ZIP**
   ```bash
   # Windows: Right-click → Extract All
   # macOS: Double-click the ZIP file
   # Linux: unzip panvel-municipal-crm.zip
   ```

2. **Open Terminal in folder**
   ```bash
   cd panvel-municipal-crm
   ```

3. **Install & Run**
   ```bash
   npm install
   npm run dev
   ```

### Method 2: Git Clone (If using Git)

```bash
# Clone repository
git clone <repository-url>
cd panvel-municipal-crm

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🚀 Step-by-Step Installation

### Step 1: Navigate to Project
```bash
cd path/to/panvel-municipal-crm
```

### Step 2: Install Dependencies (First Time Only)
```bash
npm install
```

**What this does:**
- Downloads all required packages
- Sets up development environment
- Creates `node_modules` folder
- Takes 2-5 minutes depending on internet speed

**Expected output:**
```
added 300+ packages in 2m
```

### Step 3: Setup Environment (Optional)
```bash
# Copy environment template
cp .env.example .env.local

# Edit if needed (not required for development)
```

### Step 4: Migrate Files to New Structure
```bash
# Mac/Linux
chmod +x migrate-files.sh
./migrate-files.sh

# Windows
migrate-files.bat
```

### Step 5: Start Development Server
```bash
npm run dev
```

**Expected output:**
```
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Ready in 2.5s
```

### Step 6: Open in Browser
Navigate to: **http://localhost:3000**

---

## ✅ Verification Steps

After installation, verify everything works:

### 1. Check Terminal Output
```
✓ Ready in 2.5s
○ Compiling / ...
✓ Compiled / in 1.2s
```

### 2. Check Browser
- Dashboard should load
- No error messages in console (F12)
- Components render correctly

### 3. Run Type Check
```bash
npm run type-check
```
Should show: `no errors found`

### 4. Test Features
- [ ] Dashboard displays
- [ ] Stats cards show data
- [ ] Filter bar works
- [ ] Can open Register modal
- [ ] Table pagination works

---

## 🎨 First Time Setup Tasks

### 1. File Migration (Required)

The project needs file reorganization:

**Option A: Automatic (Recommended)**
```bash
# Mac/Linux
./migrate-files.sh

# Windows
migrate-files.bat
```

**Option B: Manual**
Follow `/MIGRATION_GUIDE.md` step-by-step

### 2. Update Imports (After Migration)

After migrating files, update imports:

```bash
# Run type check to find broken imports
npm run type-check

# Fix imports following /MIGRATION_GUIDE.md
```

### 3. Environment Configuration (Optional)

Edit `.env.local` if needed:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Panvel Municipal Corporation
```

---

## 🛠️ Common Installation Issues

### Issue 1: "npm: command not found"

**Solution:** Install Node.js from https://nodejs.org/

### Issue 2: "Permission denied" (Mac/Linux)

**Solution:**
```bash
sudo chown -R $USER ~/.npm
sudo chown -R $USER ./node_modules
```

### Issue 3: "Port 3000 already in use"

**Solution:**
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Issue 4: Installation Stuck

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 5: "Cannot find module"

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Check Node version
node --version  # Should be 18+
```

---

## 📱 Running on Different Ports

### Default (Port 3000)
```bash
npm run dev
```

### Custom Port
```bash
# Mac/Linux
PORT=3001 npm run dev

# Windows
set PORT=3001 && npm run dev
```

---

## 🌐 Network Access

### Access from Other Devices

**Find your IP address:**
```bash
# Mac/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

**Run with network access:**
```bash
npm run dev -- -H 0.0.0.0
```

**Access from mobile/tablet:**
```
http://YOUR_IP:3000
```

---

## 📊 Available Commands

### Development
```bash
npm run dev          # Start dev server (http://localhost:3000)
```

### Production
```bash
npm run build        # Build for production
npm start            # Run production build
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript
```

---

## 🎯 Post-Installation Checklist

After successful installation:

- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts successfully
- [ ] Browser opens at localhost:3000
- [ ] Dashboard displays correctly
- [ ] No errors in browser console (F12)
- [ ] Files migrated to new structure
- [ ] Type check passes (`npm run type-check`)

---

## 📚 Next Steps

After installation:

1. **Read Documentation**
   - `/README.md` - Project overview
   - `/SETUP.md` - Detailed setup
   - `/MIGRATION_GUIDE.md` - File organization

2. **Migrate Files**
   - Run migration script
   - Update imports
   - Test functionality

3. **Customize**
   - Edit `/src/config/app.config.ts`
   - Update branding
   - Configure settings

4. **Develop**
   - Add features
   - Modify components
   - Test thoroughly

5. **Deploy**
   - Build for production
   - Deploy to hosting
   - Configure environment

---

## 🆘 Getting Help

### Self-Help Resources

1. **Check Documentation**
   - `/README.md`
   - `/SETUP.md`
   - `/MIGRATION_GUIDE.md`

2. **Check Terminal Output**
   - Read error messages carefully
   - Look for specific file names
   - Note line numbers

3. **Check Browser Console**
   - Press F12 in browser
   - Look for red errors
   - Check network tab

### Common Solutions

**Build fails:**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

**Import errors:**
```bash
npm run type-check
# Fix paths shown in errors
```

**Module not found:**
```bash
npm install <missing-package>
```

---

## ✨ You're All Set!

Your Panvel Municipal Corporation portal is ready!

### Quick Reference:

```bash
# Start development
npm run dev

# Build for production
npm run build

# Check for errors
npm run type-check

# Format code
npm run lint
```

### Access:
- **Local**: http://localhost:3000
- **Network**: http://YOUR_IP:3000

**Happy Developing! 🚀**

---

## 📝 Installation Time Estimates

- Download/Extract: 1-2 minutes
- Install Dependencies: 2-5 minutes
- File Migration: 1 minute
- First Build: 1-2 minutes

**Total: 5-10 minutes** ⏱️

---

## 🎉 Success!

If you see the dashboard at http://localhost:3000, you're ready to go!

**Welcome to the Panvel Municipal Corporation Portal!** 🏛️
