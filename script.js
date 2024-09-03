// Object to store Google Form URLs for each state
const stateForms = {
    'Bihar': 'https://docs.google.com/forms/d/e/1FAIpQLSfBhqC0zVu8yikJ2VwBrsoIrWB8P79UF8GtUh-JGShWQNnpaQ/viewform?embedded=true',
    'Maharashtra': 'https://docs.google.com/forms/d/e/1FAIpQLSeDvGjHNlJBdcxrBcXRUfLsNJgsjCOJyZf3Vgx9EKFWjSlQqA/viewform?embedded=true',
    'Delhi': 'https://docs.google.com/forms/d/e/1FAIpQLSdIiOzIJpIpG2TkZheDaHo-DRF6iAMWN6Ni-VKOCRjZa8XUiQ/viewform?embedded=true',
    'South-India': 'https://docs.google.com/forms/d/e/1FAIpQLScUo1ibJEzxEhxLgUGLd0mMkOvdLuEQMwM1j8XN6JVajlxdEA/viewform?embedded=true'
};

// Function to open tab content
function openTab(stateName) {
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    // Add active class to the clicked tab button
    document.querySelector(`.tab-button[data-state="${stateName}"]`).classList.add('active');

    const content = document.getElementById('tab-content');
    
    // Fade out content before changing it
    content.style.opacity = 0;
    
    setTimeout(() => {
        content.innerHTML = `
            <h3>${stateName} Freelancers</h3>
            <div id="form-container">
            <iframe src="${stateForms[stateName]}" width="100%" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            <button class="fullscreen-btn" onclick="openFullscreen('tab-content')">Full Screen</button>
            </div>
        `;
        
        // Fade in content
        content.style.opacity = 1;
    }, 300);
}

// Function to open form in overlay
function openForm(stateName) {
    const overlay = document.getElementById('form-overlay');
    const formTitle = document.getElementById('form-title');
    const formContainer = document.getElementById('form-container');
    const iframe = document.getElementById('form-iframe');

    formTitle.textContent = `Join ${stateName} Community`;
    formContainer.innerHTML = `
        <button id="fullscreen-button" onclick="openFullscreen('form-container')">Full Screen</button>
        <iframe src="${stateForms[stateName]}" width="100%" height="500" frameborder="0" marginheight="0" marginwidth="0" id="form-iframe">Loading…</iframe>
    `;
    
    overlay.style.display = 'block';
}

// Function to open full-screen mode
function openFullscreen(containerId) {
    const elem = document.getElementById(containerId);

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }
}

// Function to close the form overlay
function closeForm() {
    const overlay = document.getElementById('form-overlay');
    overlay.style.display = 'none';
}

// Function to close the notification banner
function closeNotification() {
    const banner = document.getElementById('notification-banner');
    if (banner) {
        banner.style.display = 'none';
        localStorage.setItem('notificationClosed', 'true');
    }
}

// Initialize tabs and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Open Bihar tab by default
    openTab('Bihar');
    
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            openTab(button.dataset.state);
        });
    });

    // Set up form overlay close button
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeForm);
    }

    // Set up notification close button
    const notificationCloseButton = document.getElementById('close-notification');
    if (notificationCloseButton) {
        notificationCloseButton.addEventListener('click', closeNotification);
    }

    // Check if notification was previously closed
    if (localStorage.getItem('notificationClosed') === 'true') {
        const banner = document.getElementById('notification-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();

        document.querySelector(event.target.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Change navbar style on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer to add 'in-view' class
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// JavaScript for responsive navbar toggle

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close the menu when clicking a link (optional)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
});


