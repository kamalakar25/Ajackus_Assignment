

class EmployeeDirectory {
    constructor() {
        this.employees = [...mockEmployees]; // Local copy of employee data
        this.filteredEmployees = [...this.employees];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.currentView = 'grid';
        this.currentSort = { field: 'firstName', direction: 'asc' };
        this.filters = { department: '', role: '', searchTerm: '' };
        this.editingEmployee = null;
        this.isLoading = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderEmployees();
        this.updateEmployeeCount();
        this.renderPagination();
        this.initializeAnimations();
    }

    initializeAnimations() {
        // Add staggered animation delays to existing cards
        const cards = document.querySelectorAll('.employee-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    bindEvents() {
        // Add Employee Button
        document.getElementById('add-employee-btn').addEventListener('click', () => {
            this.showModal();
        });

        // Search functionality with debouncing
        let searchTimeout;
        document.getElementById('search-input').addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.filters.searchTerm = e.target.value;
                this.applyFiltersAndSort();
            }, 300);
        });

        // Filter panel toggle
        document.getElementById('filter-btn').addEventListener('click', () => {
            this.toggleFilterPanel();
        });

        // Close filter panel
        document.getElementById('close-filter-btn').addEventListener('click', () => {
            this.toggleFilterPanel();
        });

        // Apply filters
        document.getElementById('apply-filter-btn').addEventListener('click', () => {
            this.applyFilters();
        });

        // Clear filters
        document.getElementById('clear-filter-btn').addEventListener('click', () => {
            this.clearFilters();
        });

        // Sort dropdown
        document.getElementById('sort-select').addEventListener('change', (e) => {
            const [field, direction] = e.target.value.split('-');
            this.currentSort = { field, direction };
            this.applyFiltersAndSort();
        });

        // View toggle with animation
        document.getElementById('grid-view-btn').addEventListener('click', () => {
            this.setView('grid');
        });

        document.getElementById('list-view-btn').addEventListener('click', () => {
            this.setView('list');
        });

        // Pagination
        document.getElementById('items-per-page').addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderEmployees();
            this.renderPagination();
        });

        document.getElementById('prev-page-btn').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderEmployees();
                this.renderPagination();
                this.scrollToTop();
            }
        });

        document.getElementById('next-page-btn').addEventListener('click', () => {
            if (this.currentPage < this.getTotalPages()) {
                this.currentPage++;
                this.renderEmployees();
                this.renderPagination();
                this.scrollToTop();
            }
        });

        // Modal events
        document.getElementById('close-modal-btn').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('modal-overlay').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('cancel-btn').addEventListener('click', () => {
            this.hideModal();
        });

        // Form submission
        document.getElementById('employee-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Dynamic event delegation for edit and delete buttons
        document.getElementById('employee-list').addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-btn')) {
                const employeeId = parseInt(e.target.dataset.id);
                this.editEmployee(employeeId);
            } else if (e.target.classList.contains('delete-btn')) {
                const employeeId = parseInt(e.target.dataset.id);
                this.deleteEmployee(employeeId);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'k':
                        e.preventDefault();
                        document.getElementById('search-input').focus();
                        break;
                    case 'n':
                        e.preventDefault();
                        this.showModal();
                        break;
                }
            }
            if (e.key === 'Escape') {
                this.hideModal();
                this.toggleFilterPanel(false);
            }
        });

        // Smooth scroll for better UX
        this.addSmoothScrolling();
    }

    addSmoothScrolling() {
        // Add smooth scrolling to page navigation
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Filter and Sort Methods with Loading States
    applyFiltersAndSort() {
        this.showLoading();
        
        // Simulate processing time for better UX
        setTimeout(() => {
            let filtered = [...this.employees];

            // Apply search filter
            if (this.filters.searchTerm) {
                const searchTerm = this.filters.searchTerm.toLowerCase();
                filtered = filtered.filter(employee => 
                    employee.firstName.toLowerCase().includes(searchTerm) ||
                    employee.lastName.toLowerCase().includes(searchTerm) ||
                    employee.email.toLowerCase().includes(searchTerm)
                );
            }

            // Apply department filter
            if (this.filters.department) {
                filtered = filtered.filter(employee => employee.department === this.filters.department);
            }

            // Apply role filter
            if (this.filters.role) {
                filtered = filtered.filter(employee => employee.role === this.filters.role);
            }

            // Apply sorting
            filtered.sort((a, b) => {
                const aValue = a[this.currentSort.field];
                const bValue = b[this.currentSort.field];
                
                if (this.currentSort.direction === 'asc') {
                    return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
                } else {
                    return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
                }
            });

            this.filteredEmployees = filtered;
            this.currentPage = 1;
            this.hideLoading();
            this.renderEmployees();
            this.updateEmployeeCount();
            this.renderPagination();
        }, 200);
    }

    showLoading() {
        this.isLoading = true;
        const employeeList = document.getElementById('employee-list');
        employeeList.classList.add('loading');
    }

    hideLoading() {
        this.isLoading = false;
        const employeeList = document.getElementById('employee-list');
        employeeList.classList.remove('loading');
    }

    applyFilters() {
        this.filters.department = document.getElementById('filter-department').value;
        this.filters.role = document.getElementById('filter-role').value;
        this.applyFiltersAndSort();
        this.toggleFilterPanel();
        this.showNotification('Filters applied successfully!', 'success');
    }

    clearFilters() {
        this.filters = { department: '', role: '', searchTerm: '' };
        document.getElementById('filter-department').value = '';
        document.getElementById('filter-role').value = '';
        document.getElementById('search-input').value = '';
        this.applyFiltersAndSort();
        this.toggleFilterPanel();
        this.showNotification('Filters cleared!', 'success');
    }

    toggleFilterPanel(force = null) {
        const panel = document.getElementById('filter-panel');
        if (force !== null) {
            panel.classList.toggle('filter-panel--visible', force);
        } else {
            panel.classList.toggle('filter-panel--visible');
        }
    }

    // Enhanced View Methods with Animations
    setView(view) {
        if (this.currentView === view) return;
        
        this.currentView = view;
        const employeeList = document.getElementById('employee-list');
        
        // Add transition class
        employeeList.style.opacity = '0.5';
        employeeList.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            document.getElementById('grid-view-btn').classList.toggle('btn--active', view === 'grid');
            document.getElementById('list-view-btn').classList.toggle('btn--active', view === 'list');
            
            employeeList.classList.toggle('employee-list--list', view === 'list');
            employeeList.classList.toggle('employee-list--grid', view === 'grid');
            
            // Restore transition
            employeeList.style.opacity = '1';
            employeeList.style.transform = 'scale(1)';
            
            this.showNotification(`Switched to ${view} view`, 'success');
        }, 150);
    }

    // Pagination Methods
    getTotalPages() {
        return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
    }

    getPaginatedEmployees() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.filteredEmployees.slice(startIndex, endIndex);
    }

    renderPagination() {
        const totalPages = this.getTotalPages();
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredEmployees.length);
        
        // Update pagination info with animation
        const paginationInfo = document.getElementById('pagination-info');
        paginationInfo.style.opacity = '0';
        setTimeout(() => {
            paginationInfo.textContent = 
                `Showing ${startIndex + 1}-${endIndex} of ${this.filteredEmployees.length} employees`;
            paginationInfo.style.opacity = '1';
        }, 100);
        
        // Update previous/next buttons
        const prevBtn = document.getElementById('prev-page-btn');
        const nextBtn = document.getElementById('next-page-btn');
        
        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === totalPages || totalPages === 0;
        
        // Render page numbers with animation
        const pagesContainer = document.getElementById('pagination-pages');
        pagesContainer.innerHTML = '';
        
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = `btn btn--small ${i === this.currentPage ? 'btn--active' : ''}`;
            pageBtn.style.animationDelay = `${(i - startPage) * 0.05}s`;
            pageBtn.addEventListener('click', () => {
                if (i !== this.currentPage) {
                    this.currentPage = i;
                    this.renderEmployees();
                    this.renderPagination();
                    this.scrollToTop();
                }
            });
            pagesContainer.appendChild(pageBtn);
        }
    }

    // Enhanced Employee CRUD Methods
    renderEmployees() {
        const employeeList = document.getElementById('employee-list');
        const employees = this.getPaginatedEmployees();
        
        // Fade out current content
        employeeList.style.opacity = '0.3';
        
        setTimeout(() => {
            if (employees.length === 0) {
                employeeList.innerHTML = `
                    <div class="no-employees" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">👥</div>
                        <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">No employees found</h3>
                        <p style="color: var(--text-muted);">Try adjusting your search or filter criteria</p>
                    </div>
                `;
            } else {
                employeeList.innerHTML = employees.map((employee, index) => `
                    <div class="employee-card" data-employee-id="${employee.id}" style="animation-delay: ${index * 0.1}s">
                        <div class="employee-card__header">
                            <h3 class="employee-card__name">${employee.firstName} ${employee.lastName}</h3>
                            <div class="employee-card__actions">
                                <button class="btn btn--icon edit-btn" data-id="${employee.id}" title="Edit employee">
                                    ✏️
                                </button>
                                <button class="btn btn--icon delete-btn" data-id="${employee.id}" title="Delete employee">
                                    🗑️
                                </button>
                            </div>
                        </div>
                        <div class="employee-card__content">
                            <div class="employee-card__info">
                                <p class="employee-card__id">ID: ${employee.id}</p>
                                <p class="employee-card__email">📧 ${employee.email}</p>
                                <p class="employee-card__phone">📞 ${employee.phone}</p>
                                <p class="employee-card__date">📅 Started: ${new Date(employee.startDate).toLocaleDateString()}</p>
                            </div>
                            <div class="employee-card__badges">
                                <span class="badge badge--department">${employee.department}</span>
                                <span class="badge badge--role">${employee.role}</span>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            
            // Fade in new content
            employeeList.style.opacity = '1';
            
            // Re-initialize animations for new cards
            this.initializeAnimations();
        }, 150);
    }

    updateEmployeeCount() {
        const countElement = document.getElementById('employee-count-text');
        countElement.style.transform = 'scale(0.8)';
        setTimeout(() => {
            countElement.textContent = `Showing ${this.filteredEmployees.length} employees`;
            countElement.style.transform = 'scale(1)';
        }, 100);
    }

    // Enhanced Modal Methods
    showModal(employee = null) {
        this.editingEmployee = employee;
        const modal = document.getElementById('employee-modal');
        const title = document.getElementById('modal-title');
        const form = document.getElementById('employee-form');
        
        // Ensure modal exists
        if (!modal) {
            console.error('Modal element not found');
            return;
        }
        
        title.textContent = employee ? 'Edit Employee' : 'Add New Employee';
        
        if (employee) {
            this.populateForm(employee);
        } else {
            form.reset();
            this.clearFormErrors();
        }
        
        // Show modal with proper display and animation
        modal.style.display = 'flex';
        modal.classList.add('modal--visible');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        setTimeout(() => {
            const firstInput = form.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 300);
    }

    hideModal() {
        const modal = document.getElementById('employee-modal');
        if (!modal) return;
        
        modal.classList.remove('modal--visible');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.editingEmployee = null;
            this.clearFormErrors();
        }, 300);
    }

    populateForm(employee) {
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('lastName').value = employee.lastName;
        document.getElementById('email').value = employee.email;
        document.getElementById('phone').value = employee.phone;
        document.getElementById('department').value = employee.department;
        document.getElementById('role').value = employee.role;
        document.getElementById('startDate').value = employee.startDate;
    }

    // Enhanced Form Validation with Animations
    validateForm() {
        const formData = new FormData(document.getElementById('employee-form'));
        const errors = {};
        
        // Required field validation
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'department', 'role', 'startDate'];
        requiredFields.forEach(field => {
            if (!formData.get(field) || !formData.get(field).trim()) {
                errors[field] = `${this.formatFieldName(field)} is required`;
            }
        });
        
        // Email validation
        const email = formData.get('email');
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        // Phone validation
        const phone = formData.get('phone');
        if (phone && !/^\+?[\d\s\-\(\)]+$/.test(phone)) {
            errors.phone = 'Please enter a valid phone number';
        }
        
        // Check for duplicate email (exclude current employee when editing)
        if (email) {
            const existingEmployee = this.employees.find(emp => 
                emp.email === email && (!this.editingEmployee || emp.id !== this.editingEmployee.id)
            );
            if (existingEmployee) {
                errors.email = 'This email address is already in use';
            }
        }
        
        this.displayFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    formatFieldName(field) {
        return field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }

    displayFormErrors(errors) {
        this.clearFormErrors();
        
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(`${field}-error`);
            const inputElement = document.getElementById(field);
            
            if (errorElement && inputElement) {
                errorElement.textContent = errors[field];
                inputElement.classList.add('form-input--error');
                
                // Add shake animation
                inputElement.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    inputElement.style.animation = '';
                }, 500);
            }
        });
    }

    clearFormErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        const inputElements = document.querySelectorAll('.form-input, .form-select');
        
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        inputElements.forEach(element => {
            element.classList.remove('form-input--error');
        });
    }

    handleFormSubmit() {
        if (!this.validateForm()) {
            this.showNotification('Please fix the errors in the form', 'error');
            return;
        }
        
        const formData = new FormData(document.getElementById('employee-form'));
        const employeeData = {
            firstName: formData.get('firstName').trim(),
            lastName: formData.get('lastName').trim(),
            email: formData.get('email').trim(),
            phone: formData.get('phone').trim(),
            department: formData.get('department'),
            role: formData.get('role'),
            startDate: formData.get('startDate')
        };
        
        if (this.editingEmployee) {
            this.updateEmployee(this.editingEmployee.id, employeeData);
        } else {
            this.addEmployee(employeeData);
        }
        
        this.hideModal();
    }

    addEmployee(employeeData) {
        const newEmployee = {
            id: Math.max(...this.employees.map(emp => emp.id)) + 1,
            ...employeeData
        };
        
        this.employees.push(newEmployee);
        this.applyFiltersAndSort();
        this.showNotification(`${newEmployee.firstName} ${newEmployee.lastName} added successfully!`, 'success');
    }

    updateEmployee(id, employeeData) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            this.employees[index] = { id, ...employeeData };
            this.applyFiltersAndSort();
            this.showNotification(`${employeeData.firstName} ${employeeData.lastName} updated successfully!`, 'success');
        }
    }

    editEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (employee) {
            this.showModal(employee);
        }
    }

    deleteEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (employee && confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?\n\nThis action cannot be undone.`)) {
            this.employees = this.employees.filter(emp => emp.id !== id);
            this.applyFiltersAndSort();
            this.showNotification(`${employee.firstName} ${employee.lastName} deleted successfully!`, 'success');
        }
    }

    // Enhanced Utility Methods
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.2rem;">${icon}</span>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('notification--visible');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('notification--visible');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Performance optimization for large datasets
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to body
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.body.style.transition = 'all 0.6s ease-out';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
        
        // Initialize the application
        new EmployeeDirectory();
        
        // Add welcome message
        setTimeout(() => {
            const app = document.querySelector('.container');
            if (app) {
                const welcomeMessage = document.createElement('div');
                welcomeMessage.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
                    z-index: 1000;
                    font-weight: 600;
                    animation: welcomeSlideIn 0.5s ease-out;
                `;
                welcomeMessage.innerHTML = '🎉 Welcome to Employee Directory!';
                
                // Add welcome animation keyframes
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes welcomeSlideIn {
                        from {
                            opacity: 0;
                            transform: translateX(-50%) translateY(-50px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(-50%) translateY(0);
                        }
                    }
                `;
                document.head.appendChild(style);
                
                document.body.appendChild(welcomeMessage);
                
                setTimeout(() => {
                    welcomeMessage.style.animation = 'welcomeSlideIn 0.5s ease-out reverse';
                    setTimeout(() => {
                        if (welcomeMessage.parentNode) {
                            welcomeMessage.parentNode.removeChild(welcomeMessage);
                        }
                    }, 500);
                }, 2500);
            }
        }, 1000);
    }, 100);
});
