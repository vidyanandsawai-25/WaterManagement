# 🔄 Notesheet Approval System - Complete Workflow

## 📋 Overview

The complete notesheet approval system combines **TWO approval stages**:

1. **Stage 1: 3-Level Officer Approval** (Notesheet Level) - NEW
2. **Stage 2: Final Approval Modal** (Application Level) - OLD

After notesheet upload and digital signing, **3 officers approve the notesheet sequentially**. Once all 3 officers approve, the application status changes to **"Pending Approval"** which shows the green **Approve button**. Clicking this opens the **ApprovalModal** for final approval with payment and meter details.

---

## 🎯 Complete Workflow (All Applications)

### Stage 1: Upload & 3-Level Officer Approval (Notesheet)

#### Step 1: Upload Notesheet
```
CRM Dashboard 
  → Select Application
  → Click "Send to Approval" (actions menu)
  → Notesheet Modal Opens
```

#### Step 2: Digital Sign
```
In Notesheet Modal:
  → Click "Digital Sign & Upload"
  → Notesheet automatically signed with timestamp ✅
  → Toast: "Notesheet digitally signed & uploaded successfully!"
```

#### Step 3: Send to 3-Level Approval
```
Click "Send to Approval" button
  → Multi-Level Approval Flow Modal opens
  → Shows 3 clickable approval levels:
     • Level 1: Junior Engineer (✅ already approved)
     • Level 2: Assistant Engineer (🔵 in progress - blue, clickable)
     • Level 3: Executive Engineer (⏳ pending - gray)
```

#### Step 4: Level 2 Officer Approves
```
Assistant Engineer:
  → Clicks on blue Level 2 card
  → Officer Approval Modal opens
  → Enters full name: "Priya Sharma"
  → Adds remarks (optional): "Technical feasibility confirmed"
  → Clicks "Approve" button
  → ✅ Level 2 approved!
  → Toast: "Approved by Assistant Engineer!"
```

#### Step 5: Level 3 Officer Approves
```
Executive Engineer:
  → Level 3 automatically becomes active (blue)
  → Clicks on Level 3 card
  → Officer Approval Modal opens
  → Enters full name: "Amit Patel"
  → Adds remarks (optional): "Final notesheet approval granted"
  → Clicks "Approve" button
  → ✅ Level 3 approved!
  → Toast: "Notesheet fully approved!"
```

#### Step 6: Status Changes
```
After all 3 officers approve:
  → Status changes to "Pending Approval" (orange badge)
  → Multi-level approval modal closes
  → Toast: "Notesheet approved by all officers! Application is now pending final approval. Click the Approve button to proceed."
  → Back to CRM Dashboard
```

---

### Stage 2: Final Approval (Application Level)

#### Step 7: Open ApprovalModal
```
Back in CRM Dashboard:
  → Application shows status "Pending Approval" (orange badge)
  → Green "Approve" button appears in actions
  → Click green "Approve" button
  → ApprovalModal opens (existing modal)
```

#### Step 8: Complete Final Approval
```
In ApprovalModal:
  → Review application details
  → View notesheet approval data (all 3 signatures)
  → Check documents (if needed)
  
  For New Connection:
    → Expand payment section
    → Fill payment details (mode, amount, mobile)
    → Complete payment
    → Fill meter details (if required)
    → Fill CNB Number, Receipt Number
  
  For Alteration:
    → Review tax details (auto-shown)
    → Check pending tax: ₹1,690
    → Check running tax: ₹16,416
    → Total payable: ₹18,106
  
  For Mutation/Disconnection:
    → No payment required
    → Just review details
  
  → Click "Approve & Accept Application" button
  → Status changes to "Application Accepted" ✅
  → Done!
```

---

## 📊 Complete Status Flow

```
Initiated 
  ↓
Upload Note Sheet (clerk clicks "Send to Approval")
  ↓
[3-Level Approval Process]
  ├─ Level 1: Junior Engineer ✅
  ├─ Level 2: Assistant Engineer → Clicks, enters name, approves
  └─ Level 3: Executive Engineer → Clicks, enters name, approves
  ↓
Pending Approval (after all 3 approve notesheet)
  ↓
[Final Approval in ApprovalModal]
  ├─ Payment (if New Connection)
  ├─ Meter Details (if required)
  └─ Tax Review (if Alteration)
  ↓
Application Accepted ✅
```

---

## 🎨 Visual Flow Diagram

### Complete Dual-Stage Flow:
```
┌──────────────────────────────────────────────┐
│ STAGE 1: NOTESHEET APPROVAL (3-LEVEL)       │
└──────────────────────────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│ 1. Upload Notesheet Modal                    │
│    ├─ Digital Sign & Upload                  │
│    └─ Click "Send to Approval"               │
└────────────────┬─────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────┐
│ 2. Multi-Level Approval Modal Opens          │
│    ├─ ✅ Level 1: Junior Engineer (approved) │
│    ├─ 🔵 Level 2: Assistant Engineer         │
│    └─ ⏳ Level 3: Executive Engineer         │
└────────────────┬─────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────┐
│ 3. Level 2 Officer Actions                   │
│    ├─ Click blue Level 2 card                │
│    ├─ Enter name: "Priya Sharma"             │
│    ├─ Add remarks (optional)                 │
│    └─ Click "Approve"                        │
└────────────────┬─────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────┐
│ 4. Level 3 Officer Actions                   │
│    ├─ Level 3 becomes blue (active)          │
│    ├─ Click Level 3 card                     │
│    ├─ Enter name: "Amit Patel"               │
│    ├─ Add remarks (optional)                 │
│    └─ Click "Approve"                        │
└────────────────┬─────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────┐
│ 5. Notesheet Approved!                       │
│    ├─ Status → "Pending Approval"            │
│    ├─ Modal closes                           │
│    └─ Back to CRM Dashboard                  │
└────────────────┬─────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────┐
│ STAGE 2: FINAL APPROVAL (APPLICATION)        │
└──────────────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────┐
│ 6. CRM Dashboard                             │
│    ├─ Orange "Pending Approval" badge        │
│    └─ Green "Approve" button visible         │
└────────────────┬─────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────┐
│ 7. ApprovalModal Opens                       │
│    ├─ Review all details                     │
│    ├─ Fill payment (if New Connection)       │
│    ├─ Add meter (if required)                │
│    ├─ Review tax (if Alteration)             │
│    └─ Click "Approve & Accept Application"   │
└────────────────┬─────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────┐
│ 8. Status → "Application Accepted" ✅        │
└──────────────────────────────────────────────┘
```

---

## 🧪 Complete Testing Guide

### Test for New Connection:

1. **Start Application**
   ```
   Details: "New Connection"
   Status: "Upload Note Sheet"
   ```

2. **Upload Notesheet**
   ```
   CRM Dashboard → Actions → "Send to Approval"
   Notesheet Modal → "Digital Sign & Upload"
   Wait for success toast
   ```

3. **Send to 3-Level Approval**
   ```
   Click "Send to Approval" button
   ✅ Multi-Level Approval Modal opens
   ✅ Shows 3 levels with Junior Engineer already approved
   ✅ Level 2 is blue (active)
   ```

4. **Level 2 Approval**
   ```
   Click on blue Level 2 card
   Officer Approval Modal opens
   Enter name: "Priya Sharma"
   Add remarks: "Technical check complete"
   Click "Approve"
   ✅ Level 2 approved
   ✅ Level 3 becomes blue
   ```

5. **Level 3 Approval**
   ```
   Click on blue Level 3 card
   Enter name: "Amit Patel"
   Add remarks: "Final notesheet approval"
   Click "Approve"
   ✅ Level 3 approved
   ✅ Toast: "Notesheet approved by all officers!"
   ```

6. **Verify Status Change**
   ```
   ✅ Multi-level modal closes
   ✅ Status changes to "Pending Approval" (orange)
   ✅ Green "Approve" button appears
   ✅ Toast: "Application is now pending final approval. Click the Approve button to proceed."
   ```

7. **Final Approval**
   ```
   Click green "Approve" button
   ApprovalModal opens
   Expand payment section
   Select payment mode: "Cash"
   Enter mobile: "9876543210"
   Enter amount: "7700"
   Click "Complete Payment"
   Fill meter details (if shown)
   Enter CNB Number: "CNB123456"
   Enter Receipt Number: "RCP789012"
   Click "Approve & Accept Application"
   ✅ Status → "Application Accepted"
   ```

### Test for Alteration:

1. **Start Application**
   ```
   Details: "Alteration"
   Status: "Upload Note Sheet"
   ```

2. **Upload Notesheet & 3-Level Approval**
   ```
   Same as New Connection (Steps 2-5)
   All 3 officers approve notesheet
   Status → "Pending Approval"
   ```

3. **Final Approval**
   ```
   Click green "Approve" button
   ApprovalModal opens
   Tax details automatically shown:
     • Pending Tax: ₹1,690
     • Running Tax: ₹16,416
     • Total Payable: ₹18,106
   No payment section needed (alteration skips payment)
   Click "Approve & Accept Application"
   ✅ Status → "Application Accepted"
   ```

### Test Rejection in Notesheet:

1. **Follow Steps 1-4** (Upload notesheet, Level 2 approves)

2. **Level 3 Rejects**
   ```
   Click on blue Level 3 card
   Enter name: "Amit Patel"
   Add remarks: "Site not suitable, water pressure insufficient"
   Click "Reject" button
   ✅ Rejection recorded
   ```

3. **Verify Rejection**
   ```
   ✅ Status changes to "Rejected"
   ✅ Toast: "Application rejected! The application has been rejected by an officer."
   ✅ Application marked as rejected in dashboard
   ```

---

## 💡 Key Features

### Stage 1: 3-Level Notesheet Approval

✅ **Clickable Approval Levels**
- Each level is a clickable card
- Active level has blue glowing border
- Completed levels show green checkmark
- Pending levels are gray and disabled

✅ **Simple Officer Input**
- Just enter full name
- Add optional remarks
- Click Approve or Reject
- Fast and efficient

✅ **Sequential Approval**
- Levels must be completed in order
- Next level activates only after current approval
- Clear visual feedback at each stage

✅ **Digital Record**
- Each approval timestamped
- Officer name recorded
- Remarks saved
- Full audit trail

### Stage 2: Final Approval Modal

✅ **Comprehensive Review**
- All application details visible
- Documents viewable inline
- Notesheet approval data shown
- Tax details (for Alteration)

✅ **Conditional Sections**
- Payment (New Connection only)
- Meter Details (if required)
- Tax Summary (Alteration only)
- Smart form based on type

✅ **Complete Processing**
- Final status update
- Payment completion
- Meter allocation
- Acceptance letter generation

---

## 📊 Application Type Workflows

| Application Type | Stage 1 (Notesheet) | Stage 2 (Final) | Payment | Final Status |
|------------------|---------------------|-----------------|---------|--------------|
| **New Connection** | 3-Level Approval | ApprovalModal with Payment | Yes | Application Accepted |
| **Alteration** | 3-Level Approval | ApprovalModal with Tax | No | Application Accepted |
| **Mutation** | 3-Level Approval | ApprovalModal | No | Application Accepted |
| **Disconnection** | 3-Level Approval | ApprovalModal | No | Application Accepted |

---

## 🔧 Technical Implementation

### File: `/components/UploadNotesheetModal.tsx`

#### 3-Level Approval Trigger:
```typescript
const handleApprove = () => {
  if (!isUploaded) {
    toast.error('❌ Please sign and upload the notesheet first!');
    return;
  }

  // Always use 3-level approval for notesheet
  const useNewApprovalFlow = true;
  
  if (useNewApprovalFlow) {
    // Open multi-level approval modal
    setShowApprovalFlow(true);
  }
};
```

#### After 3-Level Approval Complete:
```typescript
const handleApprovalComplete = (app: any, approvalData: any) => {
  const isRejected = approvalData.some((level: any) => level.status === 'rejected');
  
  // Set status to "Pending Approval" (not "Application Accepted")
  // This shows the green Approve button in dashboard
  onSendToApproval({
    ...application,
    status: isRejected ? 'Rejected' : 'Pending Approval',
    notesheetUploaded: true,
    digitallySigned: true,
    signedAt: new Date().toLocaleString(),
    approvalData: approvalData  // Store all 3 officer signatures
  });
  
  toast.success('✅ Notesheet approved by all officers!', {
    description: 'Application is now pending final approval. Click the Approve button to proceed.',
  });
  
  onClose();
};
```

---

## 🎯 Benefits of Dual-Stage System

### Enhanced Security:
✅ **Two-Level Verification**
- Notesheet approved by 3 officers
- Final approval by designated officer
- Multiple checkpoints prevent errors

### Better Tracking:
✅ **Complete Audit Trail**
- Notesheet: 3 officer signatures with timestamps
- Final: Payment, meter, approval details
- Full history maintained

### Flexibility:
✅ **Different Requirements**
- Notesheet: Technical/administrative checks
- Final: Payment, meter allocation, acceptance
- Separation of concerns

### User Experience:
✅ **Clear Process**
- Stage 1: Get notesheet approved
- Stage 2: Complete payment & details
- Easy to understand and follow

---

## 🚀 Future Enhancements

### Possible Additions:

1. **Conditional 3-Level Approval**
   ```typescript
   // Different approval levels based on amount
   const approvalLevels = amount > 100000 ? 5 : 3;
   
   // VIP applications skip Level 1
   const startLevel = isVIP ? 2 : 1;
   ```

2. **Parallel Approvals**
   - Allow Level 2 and 3 to approve simultaneously
   - Reduce approval time for urgent cases
   - Still maintain audit trail

3. **Mobile Notifications**
   - SMS/email to next officer when their level is active
   - Reminder if approval pending for > 24 hours
   - Real-time status updates

4. **Approval Analytics**
   - Average approval time per level
   - Officer-wise approval statistics
   - Bottleneck identification

---

## 📞 Support & FAQs

### Q: Why two approval stages?
**A:** 
- **Stage 1 (Notesheet):** Administrative and technical verification by 3 officers
- **Stage 2 (Final):** Payment processing, meter allocation, final acceptance

### Q: Can I skip the 3-level approval?
**A:** No, all applications must go through 3-level notesheet approval for compliance and audit purposes.

### Q: What if Level 2 officer rejects?
**A:** Application status becomes "Rejected" immediately. Level 3 approval is not needed.

### Q: Can officers approve out of order?
**A:** No, approvals must be sequential: Level 1 → Level 2 → Level 3.

### Q: Where are the 3 signatures stored?
**A:** In `application.approvalData` array. Each entry contains officer role, name, remarks, status, and timestamp.

### Q: What happens if payment fails in Stage 2?
**A:** User cannot click "Approve & Accept Application" until payment is completed successfully.

### Q: Can I see who approved the notesheet?
**A:** Yes! The ApprovalModal shows all 3 officer signatures with names and timestamps in the approval data section.

### Q: Is there a time limit for approvals?
**A:** Currently no. Future enhancement may add SLA timers for each level.

---

## ✅ Checklist Before Going Live

### Stage 1 (Notesheet) Testing:
- [ ] Notesheet uploads successfully
- [ ] Digital signature applies correctly
- [ ] 3-level modal opens on "Send to Approval"
- [ ] Level 2 card is clickable (blue)
- [ ] Officer can enter name and approve
- [ ] Level 3 becomes active after Level 2 approval
- [ ] All 3 approvals complete successfully
- [ ] Status changes to "Pending Approval"

### Stage 2 (Final) Testing:
- [ ] Green "Approve" button appears
- [ ] ApprovalModal opens correctly
- [ ] Payment section works (New Connection)
- [ ] Tax details shown (Alteration)
- [ ] Meter details can be added
- [ ] Final approval completes successfully
- [ ] Status changes to "Application Accepted"

### Rejection Testing:
- [ ] Level 2 can reject with remarks
- [ ] Level 3 can reject with remarks
- [ ] Status changes to "Rejected"
- [ ] Rejection data stored correctly

### Data Integrity:
- [ ] Approval data saved correctly
- [ ] Timestamps accurate
- [ ] Officer names recorded
- [ ] Remarks preserved

---

**🎉 Dual-Stage Approval System Active!**

*Complete workflow: 3-Level Notesheet Approval → Pending Approval → Final ApprovalModal → Application Accepted* ✨

**Maharashtra Water Department | Akola Municipal Corporation** 🇮🇳
