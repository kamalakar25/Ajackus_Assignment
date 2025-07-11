# Employee Directory Web Application

A modern, responsive employee directory built with HTML, CSS, vanilla JavaScript, and Freemarker templates. This application provides a complete employee management system with full CRUD operations, advanced filtering, sorting, and pagination capabilities.

## 🚀 Features

### Core Functionality
- **Employee Management**: Complete CRUD operations (Create, Read, Update, Delete)
- **Advanced Search**: Real-time search across employee names and email addresses
- **Multi-level Filtering**: Filter employees by department and role
- **Flexible Sorting**: Sort by name, department, or start date in ascending/descending order
- **Pagination**: Configurable items per page (10, 25, 50, 100) with page navigation
- **Responsive Design**: Mobile-first design that works on all devices

### User Experience
- **Dual View Modes**: Toggle between grid and list view layouts
- **Modal Forms**: Clean, accessible forms for adding and editing employees
- **Form Validation**: Real-time validation with clear error messaging
- **Confirmation Dialogs**: Safe deletion with confirmation prompts
- **Success Notifications**: User feedback for all actions
- **Professional UI**: Clean, modern interface with smooth animations

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility considerations
- **CSS3**: Modern CSS with custom properties, Grid, and Flexbox
- **Vanilla JavaScript**: ES6+ features for all interactions and data management
- **Freemarker**: Template engine for server-side rendering of initial data

## 📁 Project Structure

```
Ajackus_Assignment/
└── dashboard.html         # Main Freemarker template
└── index.html 
├── css/
│   └── style.css           # Main stylesheet
└── js/
│   ├── data.js             # Mock employee data
│   └── app.js              # Main application logic
└── README.md                       # This file
```

## 🔧 Setup and Installation

### Prerequisites
- A web server capable of processing Freemarker templates

### Option 1: With Freemarker Server
1. Clone the repository
2. Set up a Java application server (Spring Boot, Servlet container, etc.)
3. Configure Freemarker to process `.html` files
4. Place the mock data in your server-side context as `mockEmployees`
5. Start the server and navigate to the dashboard

### Option 2: Static Development (for testing)
1. Clone the repository
2. Convert `dashboard.html` to `index.html`
3. Remove Freemarker directives and replace with static HTML
4. Open `index.html` in a web browser

### Quick Start for Development
```bash
# Clone the repository
git clone [repository-url]
cd employee-directory

# For static testing, create a simple HTML file
cp dashboard.html index.html
# Edit index.html to remove Freemarker syntax

# Open in browser
open index.html
```

## 🎯 Usage

### Adding Employees
1. Click the "Add Employee" button in the header
2. Fill in all required fields (marked with *)
3. Click "Save Employee" to add to the directory

### Editing Employees
1. Click the edit (✏️) button on any employee card
2. Modify the desired fields
3. Click "Save Employee" to update

### Deleting Employees
1. Click the delete (🗑️) button on any employee card
2. Confirm the deletion in the dialog

### Searching and Filtering
1. Use the search bar for quick name/email searches
2. Click "Filter" to access department and role filters
3. Use the sort dropdown to organize results

### Pagination
1. Use the items-per-page dropdown to change display count
2. Navigate pages using Previous/Next buttons or page numbers

## 🎨 Design Features

### CSS Architecture
- **BEM Methodology**: Clean, maintainable CSS class naming
- **CSS Custom Properties**: Consistent theming and easy customization
- **Responsive Grid**: Flexbox and CSS Grid for modern layouts
- **Mobile-First**: Responsive design starting from mobile devices

### Color Scheme
- **Primary**: Blue (#2563eb) for main actions and links
- **Secondary**: Slate (#64748b) for secondary elements
- **Success**: Green (#10b981) for positive actions
- **Error**: Red (#ef4444) for warnings and errors
- **Neutral**: Gray scale for backgrounds and borders

### Typography
- **System Fonts**: Native font stack for optimal performance
- **Hierarchy**: Clear visual hierarchy with appropriate font sizes
- **Accessibility**: Sufficient contrast ratios for all text

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🔒 Form Validation

### Client-Side Validation
- **Required Fields**: All form fields are required
- **Email Format**: RFC-compliant email validation
- **Phone Format**: Flexible phone number validation
- **Duplicate Email**: Prevents duplicate email addresses
- **Real-time Feedback**: Instant validation as users type

### Error Handling
- **Visual Indicators**: Red borders and error messages
- **Contextual Messages**: Specific error descriptions
- **Graceful Degradation**: Fallback for JavaScript-disabled browsers

## 🏗️ Architecture

### Data Management
- **Local State**: All data stored in JavaScript arrays
- **Immutable Updates**: Functional programming patterns
- **Efficient Filtering**: Optimized search and filter algorithms

### Component Structure
- **Modular Design**: Separate concerns for different features
- **Event Delegation**: Efficient event handling
- **Clean Separation**: HTML structure, CSS presentation, JS behavior

## 🚀 Performance Optimizations

- **Efficient DOM Updates**: Minimal DOM manipulation
- **Event Delegation**: Single event listeners for dynamic content
- **Lazy Loading**: Pagination to handle large datasets
- **CSS Optimizations**: Hardware acceleration for animations

## 🔮 Future Enhancements

If given more time, potential improvements would include:

### Technical Enhancements
- **Advanced Search**: Full-text search with highlighting
- **Bulk Operations**: Multi-select for bulk actions
- **Data Export**: CSV/PDF export functionality
- **Keyboard Navigation**: Full keyboard accessibility
- **Local Storage**: Persist data between sessions

### UI/UX Improvements
- **Dark Mode**: Toggle between light and dark themes
- **Advanced Animations**: Micro-interactions and transitions
- **Drag & Drop**: Intuitive reordering of employees
- **Quick Actions**: Keyboard shortcuts for power users

### Data Features
- **Advanced Filtering**: Date ranges, salary ranges, etc.
- **Custom Fields**: User-defined employee attributes
- **Photo Upload**: Employee profile pictures
- **Department Hierarchy**: Organizational structure

## 🐛 Known Issues

- Freemarker integration requires server-side setup
- No persistence layer (data resets on page refresh)
- Limited to client-side validation only

## 📄 License

This project is created for educational purposes as part of a technical assignment.

## 🤝 Contributing

This is an assignment project, but suggestions and improvements are welcome!

---

**Note**: This application demonstrates proficiency in vanilla web technologies and follows modern web development best practices while maintaining compatibility with the specified technology stack.
