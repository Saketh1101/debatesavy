# Participant Names Feature - Friendly Debate ✅

## What Changed

Added a **Participant Names** column to the friendly debate creation form where users can input names for each participant.

## Features

### **Frontend Changes** (`app/modes/friendly/page.tsx`)

1. **New State for Names**
   ```typescript
   const [participantNames, setParticipantNames] = useState<string[]>(['', '']);
   ```

2. **Dynamic Name Input Fields**
   - Shows input fields based on number of participants selected
   - Updates automatically when participant count changes
   - Accepts custom names for each participant

3. **Validation**
   - Requires at least one participant name to create debate
   - Shows helpful error message if no names provided

4. **Updated Functions**
   - `handleNumPersonsChange()` - Updates names array when participant count changes
   - `handleNameChange()` - Updates individual participant names
   - `handleCreateDebate()` - Sends participant names to backend

### **Backend Changes** (`app/api/debates/friendly/route.ts`)

1. **Accepts Participant Names**
   ```typescript
   const { numPersons, title, topic, participantNames } = await req.json();
   ```

2. **Assigns Custom Names to Participants**
   - Uses provided names if available
   - Falls back to generic names if not provided
   - Creates participants with proper IDs and names

## UI Layout

```
┌─────────────────────────────────────────────────┐
│ Create a Debate                                 │
├─────────────────────────────────────────────────┤
│ Debate Title: [________________]                │
│                                                 │
│ Debate Topic: [____________________]            │
│              [____________________]             │
│              [____________________]             │
│              [____________________]             │
│                                                 │
│ Number of Participants:  [-]  4  [+]           │
│                                                 │
│ Participant Names:                              │
│ ┌─────────────────────────────────────────────┐ │
│ │ Participant 1 name (e.g., Alice)    [____] │ │
│ │ Participant 2 name (e.g., Bob)      [____] │ │
│ │ Participant 3 name (e.g., Charlie)  [____] │ │
│ │ Participant 4 name (e.g., Diana)    [____] │ │
│ │ 💡 At least one name is required           │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│                [Create Debate]                  │
└─────────────────────────────────────────────────┘
```

## How It Works

1. **User enters number of participants** (2-8)
   ↓
2. **Input fields appear for each participant name**
   ↓
3. **User fills in names** (e.g., Alice, Bob, Charlie)
   ↓
4. **Click "Create Debate"**
   ↓
5. **Debate created with named participants**
   ↓
6. **Split-view/debate room shows actual names instead of "Bot 1", "Bot 2"**

## Example

**Input:**
- Debate Title: "AI in Education"
- Topic: "Should AI replace teachers?"
- Number of Participants: 3
- Names: "Alice", "Bob", "" (empty for 3rd)

**Result:**
- Participant 1: Alice
- Participant 2: Bob
- Participant 3: Participant 3 (fallback name)

## Testing

1. Go to `/modes/friendly`
2. Fill in Debate Title and Topic
3. Use +/- buttons to set participant count
4. Enter names for participants
5. Click "Create Debate"
6. Open split-view → See named participants!

---

**Status: COMPLETE ✅** - Participant names feature fully implemented!
