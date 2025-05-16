// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with Web Development",
        date: "March 15, 2024",
        author: "John Doe",
        category: "Web Development",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        id: 2,
        title: "The Future of Artificial Intelligence",
        date: "March 14, 2024",
        author: "Jane Smith",
        category: "Technology",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];

// DOM Elements
const mainContent = document.querySelector('main');
const searchInput = document.createElement('input');
const categoryFilter = document.createElement('select');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    setupSearchBar();
    setupCategoryFilter();
    loadPosts();
    setupEventListeners();
});

// Setup search functionality
function setupSearchBar() {
    searchInput.type = 'text';
    searchInput.placeholder = 'Search posts...';
    searchInput.className = 'search-input';
    document.querySelector('nav').appendChild(searchInput);
}

// Setup category filter
function setupCategoryFilter() {
    const categories = [...new Set(blogPosts.map(post => post.category))];
    categoryFilter.className = 'category-filter';
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'All Categories';
    categoryFilter.appendChild(defaultOption);

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    document.querySelector('nav').appendChild(categoryFilter);
}

// Load and display posts
function loadPosts(filteredPosts = blogPosts) {
    mainContent.innerHTML = '';
    filteredPosts.forEach(post => {
        const article = createPostElement(post);
        mainContent.appendChild(article);
    });
}

// Create post element
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'blog-post';
    article.innerHTML = `
        <h2>${post.title}</h2>
        <div class="meta">
            <span>Posted on: ${post.date}</span> | 
            <span>Author: ${post.author}</span> | 
            <span>Category: ${post.category}</span>
        </div>
        <div class="content">
            <p>${post.content}</p>
        </div>
        <a href="#" class="read-more" data-post-id="${post.id}">Read More →</a>
    `;
    return article;
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPosts = blogPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm)
        );
        loadPosts(filteredPosts);
    });

    // Category filter
    categoryFilter.addEventListener('change', (e) => {
        const selectedCategory = e.target.value;
        const filteredPosts = selectedCategory
            ? blogPosts.filter(post => post.category === selectedCategory)
            : blogPosts;
        loadPosts(filteredPosts);
    });

    // Read More functionality
    mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('read-more')) {
            e.preventDefault();
            const postId = e.target.dataset.postId;
            const post = blogPosts.find(p => p.id === parseInt(postId));
            if (post) {
                showFullPost(post);
            }
        }
    });
}

// Show full post
function showFullPost(post) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${post.title}</h2>
            <div class="meta">
                <span>Posted on: ${post.date}</span> | 
                <span>Author: ${post.author}</span> | 
                <span>Category: ${post.category}</span>
            </div>
            <div class="content">
                <p>${post.content}</p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => {
        modal.remove();
    };

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
}

// Add smooth scroll for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 