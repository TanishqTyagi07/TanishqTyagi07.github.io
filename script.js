// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        projects.forEach(project => {
            if (filter === 'all' || project.dataset.category === filter) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });
});

function fetchGitHubProjects() {
    fetch('https://api.github.com/users/yourusername/repos')
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.querySelector('#projects .row');
            data.forEach(repo => {
                const projectHtml = `
                    <div class="col-md-6 mb-4 project" data-category="${repo.topics[0] || 'other'}">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">${repo.name}</h3>
                                <p class="card-text">${repo.description}</p>
                                <a href="${repo.html_url}" class="btn btn-primary" target="_blank">View on GitHub</a>
                            </div>
                        </div>
                    </div>
                `;
                projectsContainer.innerHTML += projectHtml;
            });
        })
        .catch(error => console.error('Error:', error));
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', fetchGitHubProjects);
