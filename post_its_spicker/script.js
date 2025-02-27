async function loadContent() {
    const response = await fetch('content.json');
    const content = await response.json();

    const container = document.querySelector('.postits-container');
    const postits = content.map(item => `
        <div class="postit" tabindex="0">
            <div class="postit-inner">
                <div class="postit-front">${item.front}</div>
                <div class="postit-back">
                    <p>${item.back}</p>
                    <p class="postit-shortcut">${item.shortcut}</p>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = postits;
}

document.addEventListener('DOMContentLoaded', loadContent);