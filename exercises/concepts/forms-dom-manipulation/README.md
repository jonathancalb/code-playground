# 📝 Forms & DOM Manipulation - Vanilla JavaScript

## 🎯 Objective

Practice **pure vanilla JavaScript** to master forms, validation, and DOM manipulation.

**Duration:** 1 hour max

---

## 💻 EXERCISE: Task Manager

Create a task management application using **only HTML + CSS + vanilla JavaScript** (no frameworks).

### **Functional Requirements**

#### 1. Task Form
- Text input for title
  - Required
  - Minimum 3 characters
  - No duplicates allowed (case-insensitive)
- Select for priority (Low, Medium, High)
  - Required
- "Add Task" button
- **Validation:**
  - Show specific error messages
  - Apply error CSS class to invalid inputs
  - Clear form after adding task

#### 2. Task List
- Each task displays:
  - Title
  - Priority with color (red=high, orange=medium, green=low)
  - "Complete" / "Undo" button
  - "Delete" button
- **Conditional styles:**
  - Left border by priority
  - Strikethrough text + reduced opacity when completed
- **Edge case:** Show "No tasks" message when list is empty

#### 3. Filters
- Real-time search by title
- "Case Sensitive" checkbox
- Sort by:
  - Order Added
  - Priority (High → Medium → Low)
  - Alphabetical (A-Z)

#### 4. Counter
Display: `Total: X | Active: Y | Completed: Z`

---

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Task Manager</title>
    <style>
        /* YOUR STYLES HERE */
    </style>
</head>
<body>
    <h1>Task Manager</h1>
    
    <!-- Form -->
    <form id="taskForm">
        <div>
            <input type="text" id="taskTitle" placeholder="Task title...">
            <span id="titleError" class="error"></span>
        </div>
        
        <div>
            <select id="taskPriority">
                <option value="">Select priority...</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <span id="priorityError" class="error"></span>
        </div>
        
        <button type="submit">Add Task</button>
    </form>

    <!-- Filters -->
    <div class="filters">
        <input type="text" id="searchInput" placeholder="Search...">
        <label>
            <input type="checkbox" id="caseSensitive"> Case Sensitive
        </label>
        <select id="sortBy">
            <option value="order">Order Added</option>
            <option value="priority">Priority</option>
            <option value="name">Alphabetical</option>
        </select>
    </div>

    <!-- Counter -->
    <div id="taskCounter"></div>

    <!-- List -->
    <ul id="taskList"></ul>

    <script>
        // YOUR CODE HERE
    </script>
</body>
</html>
```

---

## 🛠️ DOM Methods Reference

### Element Selection
- `document.getElementById('id')`
- `document.querySelector('.class')`
- `document.querySelectorAll('.class')`

### Creating & Manipulating Elements
- `document.createElement('div')`
- `element.textContent = 'text'`
- `element.innerHTML = '<b>html</b>'`
- `input.value = 'value'`

### Adding/Removing from DOM
- `parent.appendChild(child)`
- `element.remove()`

### CSS Classes
- `element.classList.add('class')`
- `element.classList.remove('class')`
- `element.classList.toggle('class')`

### Event Listeners
- `form.addEventListener('submit', handler)`
- `button.addEventListener('click', handler)`
- `input.addEventListener('input', handler)`
- `event.preventDefault()`
- `form.reset()`

### Array Methods
- `array.filter(item => condition)`
- `array.find(item => condition)`
- `array.sort((a, b) => a - b)`
- `array.some(item => condition)`

---

## 💡 Implementation Tips

### State Structure
```javascript
let tasks = []
// Each task: { id, title, priority, completed, order }
```

### Validation Pattern
- Clear previous errors
- Validate each field
- Show specific error messages
- Return true/false

### Rendering Pattern
- Filter and sort data
- Clear list (`innerHTML = ''`)
- Create elements with `createElement`
- Add with `appendChild`

### Case-Sensitive Filtering
Compare both strings in same case (lower or as-is) based on checkbox state

### Priority Sorting
Use object mapping: `{ high: 3, medium: 2, low: 1 }`

---

## ✅ Testing Checklist

- [ ] Empty form → shows error "Required"
- [ ] Title with 2 chars → shows "Min 3 characters"
- [ ] No priority → shows error
- [ ] Duplicate task → prevents adding
- [ ] Valid task → appears in list
- [ ] Click Complete → strikethrough text
- [ ] Click Undo → back to normal
- [ ] Click Delete → removes from list
- [ ] Search "task" → filters correctly
- [ ] Toggle case-sensitive → changes results
- [ ] Sort by priority → High, Medium, Low
- [ ] Sort alphabetically → A-Z
- [ ] Counter updates
- [ ] Empty list → shows "No tasks"

---

## ⏱️ Time Distribution (60 min)

- **10 min:** HTML + basic CSS
- **15 min:** Form + validation
- **20 min:** Render list + actions
- **10 min:** Filters and sorting
- **5 min:** Counter + testing

---

## 🎯 Concepts Covered

✅ Form handling  
✅ Input validation  
✅ DOM selection  
✅ DOM creation  
✅ DOM manipulation  
✅ Event listeners  
✅ Array methods  
✅ Case-sensitive filtering  
✅ Conditional rendering  
✅ Conditional styling  

---

## 🚀 Advanced Feature: Virtualization with Intersection Observer

### **Performance Optimization**
This exercise includes an advanced implementation of **virtualized lists** using the Intersection Observer API for optimal performance with large datasets.

#### **Key Features:**
- **Fixed height items** (20px per row)
- **Lazy loading** - items load as user scrolls
- **Batch loading** - loads 20 items at a time
- **Smooth scrolling** with loading indicators
- **Memory efficient** - only renders visible items

#### **Benefits:**
- **Scalability** - handles thousands of items without performance issues
- **User Experience** - smooth scrolling with progressive loading
- **Memory Management** - only keeps visible items in DOM
- **Modern API** - uses Intersection Observer for efficient scroll detection

---

## 💪 Optional Challenges

If you finish early:

1. Add localStorage for persistence
2. Allow editing existing tasks
3. Add categories/tags
4. Filter by status (Active/Completed/All)
5. **Implement virtualization** (already included in this exercise!)
6. Add drag & drop reordering
7. Implement keyboard shortcuts
