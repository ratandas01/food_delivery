const menuItems = [
    {
        id: 1,
        name: "Paneer Butter Masala",
        price: 250,
        image: "https://t4.ftcdn.net/jpg/15/40/40/85/240_F_1540408537_HUC4CHY9weHIZ5Q6AMOnRwN1DRTARlQp.jpg",
        description: "Cottage cheese in rich tomato gravy"
    },
    {
        id: 2,
        name: "Vegetable Biryani",
        price: 180,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Fragrant rice with mixed vegetables"
    },
    {
        id: 3,
        name: "Masala Dosa",
        price: 120,
        image: "https://images.unsplash.com/photo-1694849789325-914b71ab4075?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9zYXxlbnwwfHwwfHx8MA%3D%3D",
        description: "Crispy crepe with spiced potato filling"
    },
    {
        id: 4,
        name: "Chole Bhature",
        price: 150,
        image: "https://t4.ftcdn.net/jpg/16/45/73/21/240_F_1645732102_vZVtUjBwre6qyeOP3neEVhnrCzHJDIG5.jpg",
        description: "Spiced chickpeas served with hot, fluffy bhature."
    },
    {
        id: 5,
        name: "Vegetable Thali",
        price: 300,
        image: "https://images.unsplash.com/photo-1680993032090-1ef7ea9b51e5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhbGl8ZW58MHx8MHx8fDA%3D",
        description: "Complete meal with multiple dishes"
    },
    {
        id: 6,
        name: "Ice Cream",
        price: 80,
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "A cool and creamy treat for every mood."
    },
    {
        id: 7,
        name: "Papri Chat",
        price: 50,
        image: "https://t4.ftcdn.net/jpg/16/34/52/85/240_F_1634528578_w3JyeZJ0rfg6m7Uf4ib6of3yoxwh1AhP.jpg",
        description: "Crispy, tangy, and sweet—classic papri chaat."
    },
    {
        id: 8,
        name: "Paratha",
        price: 80,
        image: "https://t3.ftcdn.net/jpg/14/18/41/94/240_F_1418419448_T9IcFJIXHIRO8xIKVoZB5H1ZLl2EZ0rF.jpg",
        description: "Flaky, buttery, and perfectly pan-fried paratha."
    }
];

let cart = [];
let isLoggedIn = false;
let currentUser = null;

document.addEventListener('DOMContentLoaded', function() {
    // Load menu items initially
    displayMenuItems();
    updateCartDisplay();
    
    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', checkout);
    document.getElementById('contact-form').addEventListener('submit', handleContactForm);
    document.getElementById('login-link').addEventListener('click', showLoginModal);
    document.getElementById('cart-icon').addEventListener('click', function() {
        document.getElementById('cart').scrollIntoView({ behavior: 'smooth' });
    });
    // Search bar filtering
    document.getElementById('search-bar').addEventListener('input', filterMenuItems);
    document.getElementById('close-order-modal').addEventListener('click', closeOrderModal);
    
    const tabs = document.querySelectorAll('.modal-tab');
    const forms = document.querySelectorAll('.modal-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${targetTab}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });
    
    document.getElementById('btn-login').addEventListener('click', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (email && password) {
            isLoggedIn = true;
            currentUser = {
                email: email,
                name: email.split('@')[0]
            };
            
            document.getElementById('login-link').textContent = 'Logout';
            document.getElementById('login-link').addEventListener('click', function(e) {
                e.preventDefault();
                isLoggedIn = false;
                currentUser = null;
                this.textContent = 'Login';
                alert('You have been logged out.');
            });
            
            closeLoginModal();
        } else {
            alert('Please fill in all fields');
        }
    });
    
    document.getElementById('btn-signup').addEventListener('click', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (name && email && password) {
            alert(`Account created successfully for ${name}! You can now login.`);
            
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelector('[data-tab="login"]').classList.add('active');
            forms.forEach(form => form.classList.remove('active'));
            document.getElementById('login-form').classList.add('active');
            
            document.getElementById('signup-form').reset();
        } else {
            alert('Please fill in all fields');
        }
    });
    
    document.getElementById('login-modal').addEventListener('click', function(e) {
        if (e.target === this) closeLoginModal();
    });
    
    document.getElementById('order-confirmation-modal').addEventListener('click', function(e) {
        if (e.target === this) closeOrderModal();
    });
});

// Filter menu items when user types
function filterMenuItems() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const menuGrid = document.getElementById('menu-grid');
    
    menuGrid.innerHTML = '';
    
    const filteredItems = menuItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery)
    );
    
    if (searchQuery && filteredItems.length > 0) {
        const searchBar = document.querySelector('.search-container');
        const menuSection = document.getElementById('menu');
        const offset = searchBar.offsetHeight + 20;
        
        window.scrollTo({
            top: menuSection.offsetTop - offset,
            behavior: 'smooth'
        });
    }
    
    filteredItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        menuItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="price">₹${item.price}</div>
                <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
            </div>
        `;
        
        menuGrid.appendChild(menuItemElement);
    });
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Initial menu load handler
function displayMenuItems() {
    filterMenuItems();
}

// Add selected item to cart
function addToCart(event) {
    const itemId = parseInt(event.target.getAttribute('data-id'));
    const menuItem = menuItems.find(item => item.id === itemId);
    
    if (menuItem) {
        const existingItem = cart.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...menuItem,
                quantity: 1
            });
        }
        
        updateCartDisplay();
        
        event.target.textContent = 'Added';
        event.target.classList.add('added');
        
        setTimeout(() => {
            event.target.textContent = 'Add to Cart';
            event.target.classList.remove('added');
        }, 2000);
    }
}

// Refresh cart UI
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    
    cartItemsElement.innerHTML = '';
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotalElement.textContent = 'Total: ₹0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>
                </div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>
        `;
        
        cartItemsElement.appendChild(cartItemElement);
    });
    
    const quantityButtons = document.querySelectorAll('.quantity-btn');
    quantityButtons.forEach(button => {
        button.addEventListener('click', adjustQuantity);
    });
    
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
    
    cartTotalElement.textContent = `Total: ₹${total}`;
}

// Increase or decrease quantity
function adjustQuantity(event) {
    const itemId = parseInt(event.target.getAttribute('data-id'));
    const action = event.target.getAttribute('data-action');
    
    const cartItem = cart.find(item => item.id === itemId);
    
    if (cartItem) {
        if (action === 'increase') {
            cartItem.quantity += 1;
        } else if (action === 'decrease' && cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        }
        
        updateCartDisplay();
    }
}

// Remove item from cart
function removeFromCart(event) {
    const itemId = parseInt(event.target.getAttribute('data-id'));
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCartDisplay();
    }
}

// Handle checkout process
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checkout.');
        return;
    }
    
    if (!isLoggedIn) {
        alert('Please login or sign up to complete your order.');
        showLoginModal();
        return;
    }
    
    // Calculate total and item count
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Generate random order number
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    
    // Update confirmation modal with order details
    document.getElementById('customer-name').textContent = currentUser.name;
    document.getElementById('order-total').textContent = `₹${total}`;
    document.getElementById('items-count').textContent = `${itemCount} item${itemCount > 1 ? 's' : ''}`;
    document.getElementById('order-number').textContent = orderNumber;
    
    // Show confirmation modal
    document.getElementById('order-confirmation-modal').style.display = 'flex';
}

// Close order confirmation modal
function closeOrderModal() {
    document.getElementById('order-confirmation-modal').style.display = 'none';
    // Clear cart after successful order
    cart = [];
    updateCartDisplay();
}

// Handle contact form submission
function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    alert(`Thank you ${name}! Your message has been sent successfully.\nWe will get back to you at ${email} soon.`);
    
    document.getElementById('contact-form').reset();
}

// Open login/signup modal
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
    const tabs = document.querySelectorAll('.modal-tab');
    const forms = document.querySelectorAll('.modal-form');
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('[data-tab="login"]').classList.add('active');
    forms.forEach(form => form.classList.remove('active'));
    document.getElementById('login-form').classList.add('active');
}

// Close login/signup modal and reset forms
function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('login-form').reset();
    document.getElementById('signup-form').reset();
}