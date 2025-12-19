# 🚀 Quick Start Guide
## Get Running in 3 Minutes!

---

## ⚡ Super Fast Setup

### Windows Users:

```bash
# 1. Open terminal in project folder
# Press Win+R, type 'cmd', navigate to project folder

# 2. Install dependencies
npm install

# 3. Start the app
npm run dev

# 4. Open browser
# Go to: http://localhost:3000
```

### Mac/Linux Users:

```bash
# 1. Open terminal in project folder

# 2. Install dependencies
npm install

# 3. Start the app
npm run dev

# 4. Open browser
# Go to: http://localhost:3000
```

---

## ✅ That's It!

Your CRM dashboard should now be running! 🎉

---

## 🐛 If Something Goes Wrong

### Issue: "npm: command not found"

**You need to install Node.js:**
1. Go to https://nodejs.org/
2. Download and install the LTS version
3. Restart your terminal
4. Try again

### Issue: "Port 3000 already in use"

**Use a different port:**
```bash
npm run dev -- -p 3001
```
Then open: http://localhost:3001

### Issue: Errors during `npm install`

**Try this:**
```bash
# Delete existing files
rm -rf node_modules
rm package-lock.json

# Install again
npm install
```

### Issue: TypeScript errors in VS Code

**Restart TypeScript:**
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "TypeScript: Restart TS Server"
3. Press Enter

---

## 📚 What's Next?

Once the app is running:

1. **Explore the Dashboard**
   - Click "Register Application" to create new applications
   - Try filtering and sorting
   - Test the Edit and View features

2. **Read the Documentation**
   - `VSCODE_SETUP.md` - Detailed VS Code setup
   - `API_INTEGRATION_GUIDE.md` - Backend integration
   - `README.md` - Project overview

3. **Start Customizing**
   - Change the logo in `/public/logo.png`
   - Modify colors in component files
   - Add your backend API endpoints

---

## 🎯 Current Features

✅ **Application Management**
- Create, Edit, View, Delete applications
- Four types: New Connection, Mutation, Alteration, Disconnection

✅ **Advanced Features**
- Filtering by type, status, priority
- Sorting by multiple fields
- Pagination
- Search functionality

✅ **Beautiful UI**
- Responsive design (mobile-friendly)
- Smooth animations
- Modern glassmorphism effects
- Water ripple effects on interactions

✅ **Data Storage**
- Currently uses localStorage (no backend needed)
- Easy to switch to API when backend is ready

---

## 🔧 Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check types
npm run type-check

# Run linter
npm run lint
```

---

## 📂 Important Files

- **App.tsx** - Main application component
- **components/** - All React components
- **data/applications.ts** - Sample data (development)
- **styles/globals.css** - Global styles
- **.env.local** - Environment variables

---

## 🆘 Need Help?

1. Check `VSCODE_SETUP.md` for detailed troubleshooting
2. Make sure Node.js 18+ is installed
3. Try deleting `node_modules` and reinstalling
4. Restart VS Code

---

## 🎉 Success Checklist

After running `npm run dev`, you should see:

✅ Terminal shows "ready started server on 0.0.0.0:3000"  
✅ No error messages in terminal  
✅ Browser opens to http://localhost:3000  
✅ Dashboard loads with header and sidebar  
✅ Sample applications are visible  
✅ No console errors in browser (F12)  

---

**Time to First Run:** ~3 minutes  
**Time to Production:** See `PRODUCTION_DEPLOYMENT.md`

**Made with ❤️ for Akola Municipal Corporation**
