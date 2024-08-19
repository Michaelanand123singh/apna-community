document.addEventListener("DOMContentLoaded", function() {
    // Get the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course');

    const courseData = {
        'video-editing': {
            title: 'Video Editing',
            description: 'Master video editing with these top resources, handpicked by our experts.',
            videos: [
                { title: 'Introduction to Video Editing', url: 'https://www.youtube.com/watch?v=sample1' },
                { title: 'Advanced Editing Techniques', url: 'https://www.youtube.com/watch?v=sample2' }
            ]
        },
        'web-development': {
            title: 'Web Development',
            description: 'Become a skilled web developer with these comprehensive tutorials.',
            videos: [
                { title: 'Getting Started with HTML & CSS', url: 'https://www.youtube.com/watch?v=sample3' },
                { title: 'JavaScript Essentials', url: 'https://www.youtube.com/watch?v=sample4' }
            ]
        },
        'freelancing': {
            title: 'Freelancing',
            description: 'Learn how to start and grow your freelancing career effectively.',
            videos: [
                { title: 'Freelancing 101', url: 'https://www.youtube.com/watch?v=sample5' },
                { title: 'Building a Client Base', url: 'https://www.youtube.com/watch?v=sample6' }
            ]
        }
    };

    if (courseData[courseId]) {
        const course = courseData[courseId];

        document.getElementById('course-title').innerText = course.title;
        document.getElementById('course-description').innerText = course.description;

        const videoList = course.videos.map(video => `<li><a href="${video.url}" target="_blank" rel="noopener noreferrer">${video.title}</a></li>`).join('');
        document.getElementById('video-list').innerHTML = videoList;
    } else {
        document.getElementById('course-title').innerText = 'Course Not Found';
        document.getElementById('course-description').innerText = 'We couldn\'t find the course you were looking for.';
    }
});
