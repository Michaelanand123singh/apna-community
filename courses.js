// Ensure DOM is fully loaded before executing any JS code
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    // Function to open a course and display its content
    function openCourse(courseId) {
        console.log(`Attempting to open course: ${courseId}`);

        // Object containing the course IDs and their respective video links
        const courseLinks = {
            'video-editing': [
                'https://www.youtube.com/watch?v=sample1',
                'https://www.youtube.com/watch?v=sample2'
            ],
            'web-development': [
                'https://www.youtube.com/watch?v=sample3',
                'https://www.youtube.com/watch?v=sample4'
            ],
            'freelancing': [
                'https://www.youtube.com/watch?v=sample5',
                'https://www.youtube.com/watch?v=sample6'
            ]
        };

        try {
            // Check if the provided course ID exists in the courseLinks object
            if (courseLinks[courseId]) {
                console.log(`Course ${courseId} found. Generating content...`);

                // Map each video link to a list item (<li>) with a clickable anchor tag (<a>)
                const courseList = courseLinks[courseId].map(link => 
                    `<li><a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a></li>`
                ).join('');

                // Create the content to be displayed in the course-details section
                const courseContent = `
                    <h2>${courseId.replace('-', ' ').toUpperCase()}</h2>
                    <ul>${courseList}</ul>
                `;

                // Insert the created content into the course-details element
                const courseDetailsElement = document.getElementById('course-details');
                if (courseDetailsElement) {
                    courseDetailsElement.innerHTML = courseContent;
                    console.log(`Course content for ${courseId} successfully loaded`);
                } else {
                    throw new Error("course-details element not found in the DOM");
                }
            } else {
                console.warn(`Course ${courseId} not found in courseLinks`);
                document.getElementById('course-details').innerHTML = '<p>Course not found.</p>';
            }
        } catch (error) {
            console.error(`Error in openCourse function: ${error.message}`);
            document.getElementById('course-details').innerHTML = '<p>An error occurred while loading the course. Please try again later.</p>';
        }
    }

    // Attach event listeners to the course buttons
    try {
        const courseButtons = document.querySelectorAll('.btn-primary');
        console.log(`Found ${courseButtons.length} course buttons`);

        courseButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const courseId = this.getAttribute('data-course-id');
                console.log(`Course button clicked for: ${courseId}`);
                openCourse(courseId);
            });
        });

        console.log("Event listeners attached to course buttons");
    } catch (error) {
        console.error(`Error attaching event listeners: ${error.message}`);
    }
});

// Global error handler
window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

// Check if required DOM elements are present
window.addEventListener('load', function() {
    const requiredElements = ['navbar-placeholder', 'course-details'];
    requiredElements.forEach(elementId => {
        if (!document.getElementById(elementId)) {
            console.error(`Required element #${elementId} is missing from the DOM`);
        }
    });
});

// Monitor resource loading
performance.getEntriesByType("resource").forEach(resource => {
    if (resource.initiatorType === "script" || resource.initiatorType === "link") {
        console.log(`Resource loaded: ${resource.name}, Duration: ${resource.duration}ms`);
    }
});