async function loadContent() {
        const response = await fetch('content.json');
        const content = await response.json();

        const container = docxument.querySelector('.postits-container');
        const postits = content.map(item => `
            <div class="postit" tabindex="0">
                <div class="postit-wrapper">
                    <div class="postit-front">${item.front}</div>
                    <div class="postit-back">
                        <p class="postit-back-title">${item.front}</p>
                        <button class="copy-btn" onclick="copyToClipboard('${item.back}', this)">
                            <span class="copy-icon">📋</span>
                            <p>${item.back}</p>
                        </button>
                        <p class="postit-shortcut">${item.shortcut}</p>
                    </div>
                </div>
            </div>
        `).join('');
        container.innerHTML = postits;
    }

    function copyToClipboard(text, button) {
        // Reset all buttons first
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.classList.remove('copied');
            btn.querySelector('.copy-icon').textContent = '📋';
        });

        // Copy and mark current button
        navigator.clipboard.writeText(text).then(() => {
            button.classList.add('copied');
            button.querySelector('.copy-icon').textContent = '✔️';
        });
    }

    document.addEventListener('DOMContentLoaded', loadContent);