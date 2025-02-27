async function loadContent() {
    const response = await fetch('content.json');
    const content = await response.json();

    const container = document.querySelector('.postits-container');
    const postits = content.map(item => `
        <div class="postit" tabindex="0">
            <div class="postit-inner">
                <div class="postit-front">${item.front}</div>
                <div class="postit-back">
                <button class="copy-btn" onclick="copyToClipboard('${item.back}', this)">
                    <span class="copy-icon">📋</span>
                    <span class="copied-icon" style="display: none;">✔️</span>
                    </button>
                     <p>${item.back}</p>

                    <p class="postit-shortcut">${item.shortcut}</p>

                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = postits;
}

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const copyIcon = button.querySelector('.copy-icon');
        const copiedIcon = button.querySelector('.copied-icon');
        copyIcon.style.display = 'none';
        copiedIcon.style.display = 'inline';
        setTimeout(() => {
            copyIcon.style.display = 'inline';
            copiedIcon.style.display = 'none';
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', loadContent);