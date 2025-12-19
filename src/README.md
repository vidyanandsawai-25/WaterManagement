# 🏛️ Panvel Municipal Corporation - Water Tax CRM Portal

A modern, fully-featured water tax management system built with **Next.js 14, React 18, TypeScript, and Tailwind CSS**.

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)

---

## ⚡ Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# 1. Fix all import versions
chmod +x fix-imports.sh && ./fix-imports.sh

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

### Option 2: Windows PowerShell

```powershell
# 1. Fix imports (copy/paste this entire block)
Get-ChildItem -Recurse -Include *.tsx,*.ts | ForEach-Object {
    (Get-Content $_.FullName) -replace "from 'sonner@2.0.3'", "from 'sonner'" `
                               -replace 'from "sonner@2.0.3"', 'from "sonner"' |
    Set-Content $_.FullName
}

# 2. Install and run
npm install
npm run dev
```

Open **http://localhost:3000** 🎉

---

## 🌟 Features

### 📊 Dashboard
- **Real-time Statistics**: 6 interactive stats cards with mini bar charts
- **Dynamic Filtering**: Filter by application type, status, and search
- **Zone-wise Reports**: Comprehensive zone-wise application summaries
- **Trend Indicators**: Visual trend percentages for all metrics

### 📋 Application Management
- **3-Step Registration Wizard**: User-friendly stepwise application form
- **Smart Search**: Property number search with seamless integration
- **Document Upload**: Multi-file upload with preview
- **Status Tracking**: Complete workflow from registration to approval

### ✅ Approval Workflows
- **Notesheet System**: Complete review and approval flow
- **Multi-level Approvals**: Hierarchical approval system
- **DD Cheque Approval**: Dedicated DD/Cheque processing module
- **Online Transactions**: Real-time payment approval

### 📈 Reports & Analytics
- **Excel Export**: Generate detailed Excel reports
- **PDF Downloads**: Printable zonewise connection reports
- **Custom Filters**: Advanced filtering options
- **Real-time Updates**: Live data synchronization

### 🎨 User Experience
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **AquaFlow Theme**: Soft pastel color scheme throughout
- **Smooth Animations**: Motion-based transitions
- **Accessibility**: ARIA labels and keyboard navigation

---

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 14 (App Router with SSR)
- **Language**: TypeScript 5.3
- **UI Library**: React 18.2

### Styling
- **CSS Framework**: Tailwind CSS 4.0
- **Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)

### Forms & Validation
- **Forms**: React Hook Form 7.49
- **Notifications**: Sonner (Toast)

### Development
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Build Tool**: Next.js SWC

---

## 📁 Project Structure

```
panvel-municipal-crm/
│
├── app/
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page (Client Component)
│
├── components/
│   ├── Dashboard.tsx           # Main dashboard (consolidated)
│   ├── Header.tsx              # Navigation header
│   ├── Sidebar.tsx             # Sidebar navigation
│   ├── ZonewiseComponents.tsx  # Zonewise reports (consolidated)
│   ├── ApproveOnlineTransaction.tsx
│   ├── FilterBar.tsx
│   ├── RegisterApplicationModalStepWise.tsx
│   └── ui/                     # Shadcn/Radix UI components
│
├── data/
│   └── applications.ts         # Sample application data
│
├── utils/
│   └── smsNotification.tsx     # SMS notification utilities
│
├── styles/
│   └── globals.css             # Global styles + Tailwind
│
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── tailwind.config.ts          # Tailwind configuration
```

---

## 🎨 Color Palette (AquaFlow Theme)

### Primary Colors
- **Sky Blue**: `#0EA5E9` - Navigation, search, secondary actions
- **Cyan**: `#06B6D4` - Accents, highlights
- **Green**: `#22C55E` - Success, primary actions
- **Red**: `#EF4444` - Errors, cancel actions

### Backgrounds
- **Gradient**: `from-sky-50 via-blue-50 to-cyan-50`
- **Cards**: Pure white with soft shadows
- **Overlays**: Glassmorphism effects

---

## 📦 Dependencies

### Main Dependencies
```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.3.0",
  "tailwindcss": "^4.0.0",
  "motion": "^10.16.0",
  "lucide-react": "^0.294.0",
  "sonner": "^1.2.0",
  "react-hook-form": "^7.49.0"
}
```

### UI Components
- All Radix UI primitives (`@radix-ui/*`)
- `class-variance-authority` for component variants
- `tailwind-merge` and `clsx` for className utilities

---

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

---

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=your-api-url-here
```

### TypeScript Path Aliases
All imports can use the `@/` prefix:

```typescript
import { Dashboard } from '@/components/Dashboard';
import { applications } from '@/data/applications';
```

---

## 📝 Key Components

### 1. **Dashboard.tsx** (Consolidated)
- `StatsGrid`: Statistics cards with charts
- `CRMDashboard`: Main dashboard container

### 2. **ZonewiseComponents.tsx** (Consolidated)
- `ZonewiseTable`: Zone-wise data table
- `ZonewiseFilterReportModal`: Filterable report modal

### 3. **ApproveOnlineTransaction.tsx**
- DD Cheque approval section
- Online transaction processing
- Excel export functionality

### 4. **RegisterApplicationModalStepWise.tsx**
- 3-step registration wizard
- Property search integration
- Document upload system

---

## 🎯 Features by Module

### CRM Dashboard Module
- ✅ 6 interactive stats cards
- ✅ Real-time filtering and search
- ✅ Application table with pagination
- ✅ Quick actions (Edit, View, Approve)
- ✅ Zone-wise table toggle

### DD Cheque Approval Module
- ✅ Searchable cheque list
- ✅ Bulk approval actions
- ✅ Excel report generation
- ✅ Advanced filters (Date range, status, etc.)
- ✅ Collapsible filter panel

### Online Transactions Module
- ✅ Real-time transaction listing
- ✅ Payment status tracking
- ✅ Quick approval/reject actions
- ✅ Transaction details modal
- ✅ Excel export functionality

### Zonewise Reports Module
- ✅ Comprehensive zone summaries
- ✅ Filterable reports (Category, Use, Size, Status)
- ✅ PDF download functionality
- ✅ Live preview before download

---

## 🐛 Troubleshooting

### Issue: Module Resolution Errors
**Solution**: Ensure `tsconfig.json` has proper path aliases.

### Issue: Tailwind Styles Not Loading
**Solution**: Check that `/styles/globals.css` is imported in `/app/layout.tsx`.

### Issue: "You're importing a component that needs useState"
**Solution**: Add `'use client'` directive at the top of the component.

### Issue: Build Errors
**Solution**: Run `npm run type-check` to identify TypeScript errors.

---

## 🤝 Contributing

This is a municipal corporation project. For contributions or issues, please contact the development team.

---

## 📄 License

Proprietary - Panvel Municipal Corporation

---

## 👨‍💻 Development Team

**Developed for**: Panvel Municipal Corporation  
**Department**: Water Tax Management  
**Technology Stack**: Next.js, React, TypeScript, Tailwind CSS

---

## 📞 Support

For technical support or questions:
- **Email**: support@panvelmc.gov.in
- **Phone**: +91-XXXX-XXXXXX

---

## 🎉 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind Labs** - For Tailwind CSS
- **Radix UI** - For accessible UI primitives
- **Lucide** - For beautiful icons
- **Motion** - For smooth animations

---

**Version**: 1.0.0  
**Last Updated**: December 17, 2025  
**Status**: ✅ Production Ready

🚀 **Happy Coding!**
