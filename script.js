async function loadProjects() {
    const projects = [
        {
            folder: 'fine_dropdown',
            github: 'https://github.com/densenden/css_typography/tree/main/fine_dropdown'
        },
        {
            folder: 'flexbox_layout',
            github: 'https://github.com/densenden/css_typography/tree/main/flexbox_layout'
        },
        {
            folder: 'slanted_menu',
            github: 'https://github.com/densenden/css_typography/tree/main/slanted_menu'
        },
        {
            folder: 'rebuild_exercise',
            github: 'https://github.com/densenden/css_typography/tree/main/rebuild_exercise'
        },
        {
            folder: 'post_its_spicker',
            github: 'https://github.com/densenden/css_typography/tree/main/post_its_spicker'
        },
        {
            folder: 'fixed_form_video',
            github: 'https://github.com/densenden/css_typography/tree/main/fixed_form_video'
        }
    ];

    const grid = document.querySelector('.projects-grid');

    const projectCards = projects.map(project => `
        <article class="project-card">
            <div class="project-preview">
                <iframe
                    src="./${project.folder}/index.html"
                    loading="lazy"
                    sandbox="allow-same-origin allow-scripts">
                    <p>Your browser does not support iframes or the content cannot be loaded.</p>
                </iframe>
            </div>
            <div class="project-info">
                <h2>${project.folder.replace(/_/g, ' ')}</h2>
                <div class="project-links">
                    <a href="./${project.folder}/index.html" target="_blank" class="demo-btn">Open Project</a>
                    <a href="${project.github}" target="_blank" class="source-btn">Source</a>
                </div>
            </div>
        </article>
    `).join('');

    grid.innerHTML = projectCards;
}

document.addEventListener('DOMContentLoaded', loadProjects);