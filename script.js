document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('openSidebar');
    const closeBtn = document.getElementById('closeSidebar');

    if (openBtn && closeBtn) {
        openBtn.addEventListener('click', () => {
            sidebar.classList.add('mobile-open');
        });
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('mobile-open');
        });
    }

    // 2. Dark Mode Toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const body = document.body;
    
    // Start in Light Mode by Default

    const moonIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    const sunIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

    if (themeToggleBtn) {
        themeToggleBtn.innerHTML = body.classList.contains('dark-mode') ? sunIcon : moonIcon;
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                themeToggleBtn.innerHTML = sunIcon;
            } else {
                themeToggleBtn.innerHTML = moonIcon;
            }
        });
    }

    // 3. Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs and panes
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab
            btn.classList.add('active');

            // Show corresponding content
            const targetId = btn.getAttribute('data-target');
            if (targetId) {
                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.add('active');
                    // Reset animation sequence to ensure it replays
                    targetPane.style.animation = 'none';
                    targetPane.offsetHeight; // trigger reflow
                    targetPane.style.animation = ''; // let CSS handle the animation 
                    // (Ensure style.css has standard animation setup for .tab-pane.active)
                }
            }
        });
    });

    // 4. Live Search (Global)
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const questionCards = document.querySelectorAll('.question-card');
            const tabPanes = document.querySelectorAll('.tab-pane');

            if (searchTerm === "") {
                // Reset search state
                tabPanes.forEach(pane => pane.classList.remove('search-active'));
                questionCards.forEach(card => card.classList.remove('hidden-card'));
            } else {
                tabPanes.forEach(pane => pane.classList.add('search-active'));
                questionCards.forEach(card => {
                    const textContent = card.innerText.toLowerCase();
                    if (textContent.includes(searchTerm)) {
                        card.classList.remove('hidden-card');
                    } else {
                        card.classList.add('hidden-card');
                    }
                });
            }
        });
    }

    // 5. Copy Functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const card = btn.closest('.question-card');
            if (!card) return;

            const questionTextEl = card.querySelector('.question-title');
            const answerTextEl = card.querySelector('.answer-text');
            const marksBoosterEl = card.querySelector('.extra-text');

            const questionText = questionTextEl ? questionTextEl.innerText.trim() : '';
            const answerText = answerTextEl ? answerTextEl.innerText.trim() : '';
            const marksBoosterText = marksBoosterEl ? marksBoosterEl.innerText.trim() : '';

            const textToCopy = `Q: ${questionText}\nAns: ${answerText}\nMarks Booster: ${marksBoosterText}`;

            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Visual feedback saving original svg layout
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<span style="font-size: 11px; font-weight: bold; background: var(--bg-surface); padding: 2px 4px; border-radius: 4px; border: 1px solid var(--border-light);">Copied!</span>';
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    });

    // Subject/Chapter Navigation Logic
    const subjectLinks = document.querySelectorAll('.subject-link, .dropdown-link');
    const questionsFeed = document.getElementById('questions-feed');
    const contentUnavailable = document.getElementById('content-unavailable');
    const tabNavigation = document.querySelector('.tab-navigation');
    const bannerTitle = document.querySelector('.chapter-header-banner h1');
    const bannerBadge = document.querySelector('.chapter-header-banner .badge');

    subjectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active style from all links
            document.querySelectorAll('.active-dropdown').forEach(el => el.classList.remove('active-dropdown'));
            if (link.classList.contains('dropdown-link')) {
                link.classList.add('active-dropdown');
            }

            // Demo logic: If it's not Computer Science Chapter 9, say "Content is not available"
            const linkText = link.innerText.trim();
            let isAvailable = false;
            const hasDropdown = link.closest('.has-dropdown');
            if (hasDropdown) {
                const parentSubject = hasDropdown.querySelector('.nav-link span').innerText.trim();
                if (linkText === 'Chapter 9' && parentSubject === 'Computer Science') {
                    isAvailable = true;
                }
            }
            
            if (!isAvailable) {
                questionsFeed.style.display = 'none';
                if (tabNavigation) tabNavigation.style.display = 'none';
                contentUnavailable.style.display = 'block';
                if (link.classList.contains('subject-link')) {
                    bannerBadge.innerText = link.getAttribute('data-subject') || linkText;
                    bannerTitle.innerText = "No Chapters Available";
                } else {
                    bannerTitle.innerText = linkText;
                }
            } else {
                questionsFeed.style.display = 'block';
                if (tabNavigation) tabNavigation.style.display = 'flex';
                contentUnavailable.style.display = 'none';
                bannerBadge.innerText = 'Computer Science';
                bannerTitle.innerText = 'Chapter 9: Entrepreneurship in Digital Age';
            }
        });
    });

    // 6. Scroll Progress Bar
    const contentArea = document.getElementById('contentArea');
    const progressBar = document.getElementById('progressBar');

    if (contentArea && progressBar) {
        contentArea.addEventListener('scroll', () => {
            const scrollTop = contentArea.scrollTop;
            const scrollHeight = contentArea.scrollHeight - contentArea.clientHeight;
            if (scrollHeight > 0) {
                const scrollPercentage = (scrollTop / scrollHeight) * 100;
                progressBar.style.width = scrollPercentage + '%';
            } else {
                progressBar.style.width = '0%';
            }
        });
    }
});
