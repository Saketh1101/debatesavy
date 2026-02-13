# Split-Screen Demo Mode - Quick Start

## How to Use the New Split-Screen View

Perfect for hackathon presentations! Manage both debate participants from ONE screen.

### **Step 1: Create a Friendly Debate**
1. Login as any user
2. Go to `/modes/friendly`
3. Fill in:
   - **Title**: e.g., "AI in Education"
   - **Topic**: e.g., "Should AI replace teachers?"
   - **Participants**: 2
4. Click "Create Debate"

### **Step 2: Access Split-Screen View**
Once in the debate room, you'll see a new button in the top-right:
- **📺 Split View** (cyan button)
- Click it to open the split-screen demo

### **Step 3: Demo Both Users Simultaneously**

```
┌─────────────────────────────────────────────────┐
│  Debate Title: AI in Education                  │
│  ← Back to Normal View                          │
├──────────────────────┬──────────────────────────┤
│                      │                          │
│  User 1 (Demo)       │  User 2 (Demo)          │
│  ─────────────       │  ─────────────          │
│                      │                          │
│  [Arguments list]    │  [Arguments list]       │
│                      │                          │
│  [Feedback area]     │  [Feedback area]        │
│                      │                          │
│  [Type argument] [Send]  [Type argument] [Send]│
│  [Get Feedback]      │  [Get Feedback]        │
│                      │                          │
└──────────────────────┴──────────────────────────┘
```

### **Step 4: Present the Demo**

**Left Side (User 1):**
1. Type an argument: "AI can personalize learning at scale"
2. Click **Send** → Argument appears immediately
3. Click **Get Feedback** → AI analysis shows below

**Right Side (User 2):**
1. Type a response: "But it can't replace human connection"
2. Click **Send** → Argument appears immediately
3. Click **Get Feedback** → AI analysis shows below

### **Live Demo Flow**

```
TIME 0s:
  User 1: [empty]          User 2: [empty]

TIME 5s:
  User 1 types and sends
  User 1: ✅ Argument      User 2: [empty]
          [Get Feedback]

TIME 10s:
  User 2 types and sends
  User 1: ✅ Argument      User 2: ✅ Argument
          [Get Feedback]            [Get Feedback]

TIME 15s:
  User 1 clicks Get Feedback
  User 1: ✅ Argument      User 2: ✅ Argument
          ✅ AI Feedback            [Get Feedback]
          [Show complete
           analysis]

TIME 20s:
  User 2 clicks Get Feedback
  User 1: ✅ Complete      User 2: ✅ Complete
  
  Both show full feedback!
```

### **Key Features**

✅ **Instant Arguments** - Type and send for either user  
✅ **Individual Feedback** - Each user gets personalized AI analysis  
✅ **Side-by-Side View** - See both perspectives at once  
✅ **Single Screen** - Perfect for projectors/presentations  
✅ **Real-time Updates** - All changes sync immediately  

### **Formatting**

- **Left (User 1)** - Blue theme
- **Right (User 2)** - Red theme
- **Feedback** - Purple button, inline display
- **Arguments** - Timestamped, scrollable

### **Pro Tips for Demo**

1. **Pre-write arguments** - Have them ready to paste
2. **Use debate topics** - Make it engaging (AI, Climate, Education, etc.)
3. **Show both users** - Demonstrate the collaborative nature
4. **Get feedback** - Show the AI's structured critique working
5. **Iterate** - Add more arguments to show improvement suggestions

### **URL Navigation**

- Normal view: `/debate/[debateId]`
- Split-screen: `/debate/[debateId]/split-view`
- Return link in split-view takes you back

---

**Ready to present!** 🚀 Just create a debate and click "📺 Split View"
