async function fetchDatasets() {
                    try {
                        const response = await fetch('cheatsheets/index.json');
                        const datasets = await response.json();
                        const select = document.getElementById('dataset-select');

                        select.innerHTML = datasets.map(dataset =>
                            `<option value="${dataset.value}">${dataset.label}</option>`
                        ).join('');

                        // Load the first dataset by default
                        loadContent(datasets[0].value);
                    } catch (error) {
                        console.error('Error fetching datasets:', error);
                    }
                }

                async function loadContent(dataset) {
                    try {
                        const response = await fetch(`cheatsheets/${dataset}.json`);
                        const content = await response.json();
                        currentDataset = dataset;

                        const container = document.querySelector('.postits-container');

                        // Clear previous copy states
                        document.querySelectorAll('.copy-btn').forEach(btn => {
                            btn.classList.remove('copied');
                            btn.querySelector('.copy-icon').textContent = '📋';
                        });

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
                    } catch (error) {
                        console.error('Error loading content:', error);
                    }
                }

                function copyToClipboard(text, button) {
                    document.querySelectorAll('.copy-btn').forEach(btn => {
                        btn.classList.remove('copied');
                        btn.querySelector('.copy-icon').textContent = '📋';
                    });

                    navigator.clipboard.writeText(text).then(() => {
                        button.classList.add('copied');
                        button.querySelector('.copy-icon').textContent = '✔️';
                    });
                }

                document.addEventListener('DOMContentLoaded', () => {
                    fetchDatasets();
                    document.getElementById('dataset-select').addEventListener('change', (e) => {
                        loadContent(e.target.value);
                    });
                });