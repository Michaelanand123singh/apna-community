// Ensure DOM is fully loaded before executing any JS code
document.addEventListener("DOMContentLoaded", function() {
    
    // Function to open a course and display its content
    function openCourse(courseId) {
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

        // Check if the provided course ID exists in the courseLinks object
        if (courseLinks[courseId]) {
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
            document.getElementById('course-details').innerHTML = courseContent;
        } else {
            // Display a message if the course ID does not exist in the courseLinks object
            document.getElementById('course-details').innerHTML = '<p>Course not found.</p>';
        }
    }

    // Attach event listeners to the course buttons
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const courseId = this.getAttribute('data-course-id');
            openCourse(courseId);
        });
    });

});
