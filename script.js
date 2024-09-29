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

const reposToDisplay = [
    'United-States-Airlines-Analysis'
    'Healthcare-Cost-Prediction-and-Analysis-Project',
    'Sales_Comparison_by_Region_Tableau',
    'Cohorts_of_Songs',
    'Marketing-Campaign-Project',
    'Car-Rental-Service-Project',
    'ScienceQtech-Employee-Performance-Mapping-Project',
    // Add more repository names as needed
];

function fetchGitHubProjects() {
    const username = 'TanishqTyagi07'; // Replace with your GitHub username
    
    Promise.all(reposToDisplay.map(repo => 
        fetch(`https://api.github.com/repos/${username}/${repo}`)
            .then(response => response.json())
    ))
    .then(data => {
        const projectsContainer = document.querySelector('#projects .row');
        data.forEach(repo => {
            if (repo.name) { // Check if the repo exists
                const projectHtml = `
                    <div class="col-md-6 mb-4 project" data-category="${repo.topics ? repo.topics[0] : 'other'}">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">${repo.name}</h3>
                                <p class="card-text">${repo.description || 'No description available'}</p>
                                <a href="${repo.html_url}" class="btn btn-primary" target="_blank">View on GitHub</a>
                            </div>
                        </div>
                    </div>
                `;
                projectsContainer.innerHTML += projectHtml;
            }
        });
    })
    .catch(error => console.error('Error:', error));
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', fetchGitHubProjects);
