# SVG Icons - Usage Examples & Code Snippets

## How to Use Icons in DebateIQ

### Basic Import
```tsx
import { 
  UsersIcon, 
  StarIcon, 
  GlobeIcon, 
  RobotIcon,
  BarChartIcon,
  LightbulbIcon,
  // ... other icons
} from '@/app/components/Icons';
```

---

## 1. Simple Icon Display

### Basic Usage (Default)
```tsx
<UsersIcon />
// Size: 24px (default)
// Stroke width: 1.5px (default)
// Color: inherit from parent text color
```

### With Custom Size
```tsx
<RobotIcon size={32} />
<BarChartIcon size={18} />
<LightbulbIcon size={48} />
```

### With Custom Stroke Width
```tsx
<StarIcon size={24} strokeWidth={1.3} />
<GlobeIcon size={28} strokeWidth={2} />
```

---

## 2. With Tailwind Colors

### Standalone Icon
```tsx
<TrophyIcon size={24} className="text-amber-400" />
```

### Icon with Hover Effect
```tsx
<RobotIcon 
  size={24} 
  className="text-blue-400 hover:text-white transition-colors duration-300" 
/>
```

### Icon with Scale Animation
```tsx
<UsersIcon 
  size={20} 
  className="hover:scale-110 transition-transform duration-300"
  strokeWidth={1.5}
/>
```

---

## 3. Icons in Buttons

### Icon-Only Button
```tsx
<button className="p-2 hover:bg-slate-800 rounded transition-all">
  <RobotIcon size={24} className="text-blue-400" />
</button>
```

### Icon + Text Button
```tsx
<button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-all">
  <GamepadIcon size={20} strokeWidth={1.5} />
  <span>Find Opponent</span>
</button>
```

### Icon with Hover Scale
```tsx
<button className="flex items-center gap-2 group">
  <UsersIcon size={20} className="group-hover:scale-110 transition-transform" />
  <span>Friendly Debate</span>
</button>
```

---

## 4. Category Selection Cards

### Category Card Example
```tsx
const CategoryCard = ({ category }) => {
  const IconComponent = category.icon;
  
  return (
    <button
      onClick={() => setSelectedCategory(category.id)}
      className={`p-6 rounded-lg border-2 transition-all duration-300 group ${
        selectedCategory === category.id
          ? 'border-blue-500 bg-slate-800 shadow-lg shadow-blue-500/20'
          : 'border-slate-700 bg-slate-800 hover:border-slate-600'
      }`}
    >
      <div className="mb-3 flex justify-center text-slate-300 group-hover:text-blue-400 transition-colors">
        <IconComponent size={32} strokeWidth={1.3} />
      </div>
      <div className={`font-semibold transition-colors ${
        selectedCategory === category.id 
          ? 'text-blue-400' 
          : 'text-white group-hover:text-blue-400'
      }`}>
        {category.label}
      </div>
    </button>
  );
};
```

---

## 5. Dashboard Stats Cards

### Stats with Icons
```tsx
<div className="grid grid-cols-3 gap-6">
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
    <div className="flex items-center gap-3 mb-2">
      <TrophyIcon size={20} className="text-amber-400" strokeWidth={1.5} />
      <p className="text-slate-400 text-sm">Current Rating</p>
    </div>
    <p className="text-4xl font-bold text-blue-400">1200</p>
  </div>
  
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
    <div className="flex items-center gap-3 mb-2">
      <BarChartIcon size={20} className="text-blue-400" strokeWidth={1.5} />
      <p className="text-slate-400 text-sm">Total Debates</p>
    </div>
    <p className="text-4xl font-bold">5</p>
  </div>
  
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <p className="text-slate-400 text-sm">Active Debates</p>
    </div>
    <p className="text-4xl font-bold">2</p>
  </div>
</div>
```

---

## 6. Feature Section with Icons

### Feature Grid
```tsx
<div className="grid md:grid-cols-3 gap-6">
  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
    <div className="text-blue-400 mt-1 flex-shrink-0">
      <RobotIcon size={24} strokeWidth={1.5} />
    </div>
    <div>
      <h4 className="text-blue-400 font-semibold mb-2">AI Assistant</h4>
      <p className="text-gray-400 text-sm">Get real-time feedback and suggestions on your arguments</p>
    </div>
  </div>
  
  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
    <div className="text-blue-400 mt-1 flex-shrink-0">
      <BarChartIcon size={24} strokeWidth={1.5} />
    </div>
    <div>
      <h4 className="text-blue-400 font-semibold mb-2">Analytics</h4>
      <p className="text-gray-400 text-sm">Track your performance and improve your debate skills</p>
    </div>
  </div>
  
  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
    <div className="text-blue-400 mt-1 flex-shrink-0">
      <MessageCircleIcon size={24} strokeWidth={1.5} />
    </div>
    <div>
      <h4 className="text-blue-400 font-semibold mb-2">Text-Based</h4>
      <p className="text-gray-400 text-sm">Pure text debates - focus on your arguments</p>
    </div>
  </div>
</div>
```

---

## 7. Floating Action Button (AI Assistant)

### FAB with Icon
```tsx
<button
  onClick={() => setIsOpen(!isOpen)}
  className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-40 group"
  title="Open AI Assistant"
>
  <RobotIcon size={24} className="group-hover:scale-125 transition-transform" strokeWidth={1.3} />
</button>
```

---

## 8. List Items with Icons

### Tips/Feature List
```tsx
<div className="space-y-3 text-gray-400 text-sm">
  <div className="flex items-center gap-2">
    <span className="text-green-400">✓</span>
    <span>Be specific with your debate title</span>
  </div>
  <div className="flex items-center gap-2">
    <span className="text-green-400">✓</span>
    <span>Provide context in the topic description</span>
  </div>
  <div className="flex items-center gap-2">
    <span className="text-green-400">✓</span>
    <span>2-4 people works best for good pacing</span>
  </div>
</div>
```

---

## 9. Loading States with Icons

### Search with Loading Icon
```tsx
<button
  onClick={handleFindOpponent}
  disabled={isSearching}
  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 text-lg flex items-center justify-center gap-3 group"
>
  {isSearching ? (
    <>
      <SearchIcon size={20} className="animate-spin" strokeWidth={2} />
      Searching for Opponent...
    </>
  ) : (
    <>
      <GamepadIcon size={20} className="group-hover:scale-110 transition-transform" strokeWidth={2} />
      Find Opponent
    </>
  )}
</button>
```

---

## 10. Active Status Indicators

### Live Debates
```tsx
<div className="flex items-center gap-2 mb-4">
  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
  <h3 className="text-xl font-bold text-white">Active Debates</h3>
</div>
```

### Live Badge
```tsx
<div className="flex items-center gap-2 justify-between mb-2">
  <h4 className="text-white font-semibold text-sm flex-1">Debate Title</h4>
  <span className="text-xs bg-red-900/80 text-red-200 px-2 py-1 rounded font-semibold">
    LIVE
  </span>
</div>
```

---

## 11. Icon-Only Sections

### Inline Icons in Text
```tsx
<div className="flex items-center gap-1.5">
  <UsersIcon size={14} strokeWidth={2} className="text-slate-500" />
  <span>4 players</span>
</div>

<div className="flex items-center gap-1.5">
  <MessageSquare size={14} strokeWidth={2} className="text-amber-400" />
  <span>12 arguments</span>
</div>
```

---

## 12. Close Button

### Modal/Dialog Close
```tsx
<button
  onClick={() => setIsOpen(false)}
  className="text-white hover:text-blue-100 transition-colors p-1 hover:bg-white/10 rounded"
  title="Close"
>
  <XIcon size={20} strokeWidth={2.5} />
</button>
```

---

## 13. Number Controls

### Increment/Decrement Buttons
```tsx
<div className="flex items-center gap-4">
  <button
    onClick={() => setNumPersons(Math.max(2, numPersons - 1))}
    className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-3 rounded transition-all hover:scale-110 active:scale-95"
    title="Decrease participants"
  >
    <MinusIcon size={20} strokeWidth={2} />
  </button>
  
  <div className="text-4xl font-bold text-blue-400 w-20 text-center">
    {numPersons}
  </div>
  
  <button
    onClick={() => setNumPersons(Math.min(8, numPersons + 1))}
    className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-3 rounded transition-all hover:scale-110 active:scale-95"
    title="Increase participants"
  >
    <PlusIcon size={20} strokeWidth={2} />
  </button>
</div>
```

---

## 14. All Available Icon Sizes

```tsx
// Extra Small
<LightbulbIcon size={14} />

// Small
<RobotIcon size={18} />

// Default
<UsersIcon size={24} />

// Medium
<BarChartIcon size={28} />

// Large
<StarIcon size={32} />

// Extra Large
<GlobeIcon size={48} />
```

---

## 15. Icon Color Variations

```tsx
// Primary Blue
<RobotIcon className="text-blue-400" />

// Success Green
<CheckIcon className="text-green-400" />

// Warning Amber
<TrophyIcon className="text-amber-400" />

// Danger Red
<AlertIcon className="text-red-400" />

// Neutral Slate
<SettingsIcon className="text-slate-400" />

// Custom Gradient (via parent)
<div className="text-gradient-to-r from-blue-400 to-purple-400">
  <SparklesIcon />
</div>
```

---

## Best Practices

### ✅ DO
- Use consistent sizes for similar UI elements
- Apply hover animations for interactivity
- Pair icons with text for clarity
- Use color to distinguish icon meanings
- Adjust stroke width for hierarchy
- Use size 20-24px for standard UI elements

### ❌ DON'T
- Mix emoji and SVG icons in same section
- Use icons without context (always pair with text in primary UI)
- Apply too many hover effects (keep it simple)
- Make icons smaller than 14px (readability issue)
- Override Tailwind text colors inconsistently

---

## Performance Tips

1. **Inline SVGs**: No additional HTTP requests
2. **Reusable Components**: React memoization for performance
3. **Tailwind Integration**: CSS-based colors (no inline styles)
4. **Bundle Size**: ~2KB total for all 25 icons (minified)
5. **Rendering**: Hardware-accelerated SVG rendering

---

## Accessibility

All icons maintain:
- Proper semantic SVG markup
- Clear visual contrast
- Optional `title` attributes for tooltips
- Support for `aria-label` in parent elements
- Color + visual distinction (not color-only)

---

## Troubleshooting

### Icon Not Displaying
- Check import path is correct: `@/app/components/Icons`
- Verify component name matches export
- Ensure size prop is a number (not string)

### Icon Color Not Showing
- Confirm Tailwind class is applied to icon (e.g., `text-blue-400`)
- Check parent container doesn't have conflicting color
- Ensure `currentColor` inheritance works (CSS inheritance)

### Performance Issues
- Icons are lightweight; if performance issue, check component re-render
- Use React.memo() if icon component renders frequently
- No additional optimization typically needed

