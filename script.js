const cursor = document.querySelector('.cursor');
const scrollContainer = document.querySelector('.vertical-scroll-container');
const projectList = document.getElementById('project-list');
const scrollLeftButton = document.getElementById('prev');
const scrollRightButton = document.getElementById('next');
const scrollAmount = 300;

// List of allowed project names
const allowedProjectNames = ['GatorFound', 'SportsBetAI','HackGT_WAYD', 'Osana-Voice-Assistant', 'HelpingSoup-Website','ASP.NET-Core-and-MVC-Test-Application','Sudoku-in-Python','SimpleMeetingJoinBot'];

async function fetchProjects() {
    const response = await fetch('https://api.github.com/users/ShreyasKodela/repos');
    const projects = await response.json();
    projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    displayProjects(projects);
}

function displayProjects(projects) {
    projectList.innerHTML = '';
    projects.forEach(project => {
        // Only display projects that are in the allowedProjectNames array
        if (allowedProjectNames.includes(project.name)) {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            projectItem.innerHTML = `
                <h3>${project.name}</h3>
                <p style="width: 100%; white-space: pre-wrap; overflow-wrap: break-word; word-break: break-word; overflow: hidden;">${project.description || 'No description available.'}</p>
                <a href="${project.html_url}" target="_blank" class="view-project">View Project</a>
            `;
            projectList.appendChild(projectItem);
        }
    });
}

function handleScroll(direction) {
    const maxScrollLeft = projectList.scrollWidth - projectList.clientWidth;
    let newScrollPosition = projectList.scrollLeft + direction * scrollAmount;
    newScrollPosition = Math.max(0, Math.min(newScrollPosition, maxScrollLeft));

    projectList.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
    });
}

scrollLeftButton.addEventListener('click', () => handleScroll(-1));
scrollRightButton.addEventListener('click', () => handleScroll(1));


scrollLeftButton.addEventListener('click', () => handleScroll(-1));
scrollRightButton.addEventListener('click', () => handleScroll(1));

fetchProjects();

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
    document.body.appendChild(glow);
    
    setTimeout(() => glow.remove(), 1000);
});

document.querySelectorAll('.header-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});
