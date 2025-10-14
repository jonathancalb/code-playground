# ⚛️ Task Manager - React

## 🎯 Objective

Build a task management app to practice **state management, hooks, and fundamental React concepts**.

**Duration:** 1 hour max

---

## 💻 EXERCISE: Task Manager

Create a task management application using **React** (with Vite).

### **Functional Requirements**

#### 1. Task Form (Controlled Components)
- Input for title
  - Required
  - Minimum 3 characters
  - No duplicates
- Select for priority (Low, Medium, High)
  - Required
- Real-time validation
- Show specific errors
- Clear form on add

#### 2. Task List (List Rendering)
- Render with `.map()` and correct `key`
- Each task shows:
  - Title
  - Priority badge with color
  - Complete/Undo button
  - Delete button
- Conditional styles based on state
- Empty state when no tasks

#### 3. Filters (State Management)
- Real-time search
- Case-sensitive toggle
- Sort by: date, priority, alphabetical

#### 4. Counter (Derived State)
Calculate and display: Total | Active | Completed

---

## 🚀 Setup

```bash
npm create vite@latest . -- --template react
npm install
npm run dev
```

---

## 📦 Suggested Component Structure

```
src/
  ├── App.jsx           # Main state + logic
  ├── TaskForm.jsx      # Controlled form
  ├── TaskList.jsx      # Task list
  ├── TaskItem.jsx      # Individual item
  ├── Filters.jsx       # Filters and sorting
  └── Stats.jsx         # Counter
```

---

## 🛠️ React Concepts to Use

### State Management
- `useState` for tasks, form data, errors, filters
- Immutable updates with spread operator
- Derived state for calculations

### Task Structure
```javascript
{
  id: Date.now(),
  title: 'Study React',
  priority: 'high',
  completed: false,
  createdAt: new Date().toISOString()
}
```

### Controlled Inputs
Bind input `value` to state and `onChange` to update state

### List Rendering
Use `.map()` with unique `key` prop

### Immutable Updates
- Add: spread and append
- Update: map and replace
- Delete: filter out

### Conditional Rendering
Use ternary operators or `&&`

---

## 💡 Implementation Guidelines

### Form Validation
- Create validation function
- Check all fields
- Store errors in state
- Return boolean

### Event Handling
- `onSubmit` → prevent default, validate, add task
- `onChange` → update form state
- `onClick` → toggle complete, delete task

### Filtering & Sorting
- Create function to get filtered tasks
- Apply search filter (case-sensitive option)
- Apply sorting logic
- Return filtered array

### Stats Calculation
Use `.filter()` to calculate totals from task array

---

## 🎨 Styling Guidelines

### Conditional Classes
Use template literals: `` `task ${completed ? 'completed' : ''}` ``

### Priority Colors
- High: red border
- Medium: orange border
- Low: green border

### Completed State
- Reduced opacity
- Strikethrough text

---

## ✅ Testing Checklist

- [ ] Empty form → shows errors
- [ ] Title < 3 chars → error
- [ ] No priority → error
- [ ] Duplicate → error
- [ ] Valid add → appears in list with unique key
- [ ] Complete → changes styles
- [ ] Delete → removes from state
- [ ] Search → filters correctly
- [ ] Case-sensitive → toggle works
- [ ] Sort → changes visual order
- [ ] Stats → update in real-time
- [ ] Re-renders → component updates when state changes

---

## ⏱️ Time Distribution (60 min)

- **10 min:** Setup + component structure
- **15 min:** Main state + TaskForm with validation
- **15 min:** TaskList + TaskItem with actions
- **10 min:** Filters and sorting
- **10 min:** Stats + styles + testing

---

## 🎯 React Concepts Covered

✅ **useState** - State management  
✅ **Controlled components** - Forms  
✅ **Event handling** - onClick, onChange, onSubmit  
✅ **Immutability** - Spread operator, immutable methods  
✅ **List rendering** - map() and keys  
✅ **Conditional rendering** - Ternaries, &&  
✅ **Props** - Passing data and functions  
✅ **Derived state** - Calculations from state  
✅ **Component composition** - Breaking into components  

---

## 🚀 Advanced Feature: Virtualization with Intersection Observer

### **Performance Optimization**
This exercise includes an advanced implementation of **virtualized lists** using React hooks and the Intersection Observer API for optimal performance with large datasets.

#### **Key Features:**
- **Fixed height items** (20px per row)
- **Lazy loading** - items load as user scrolls
- **Batch loading** - loads 20 items at a time
- **Smooth scrolling** with loading indicators
- **Memory efficient** - only renders visible items
- **React integration** - uses hooks for state management

#### **Benefits:**
- **Scalability** - handles thousands of items without performance issues
- **User Experience** - smooth scrolling with progressive loading
- **Memory Management** - only keeps visible items in DOM
- **React Integration** - leverages hooks for state management
- **Modern API** - uses Intersection Observer for efficient scroll detection

---

## 🚀 Optional Optimizations

If you finish early:

1. **useEffect** - Persist to localStorage
2. **useMemo** - Cache filtering/sorting
3. **useCallback** - Memoize handler functions
4. **Custom hook** - useLocalStorage
5. **React.memo** - Optimize TaskItem re-renders
6. **Implement virtualization** (already included in this exercise!)
7. **useReducer** - Complex state management
8. **Context API** - Global state management
