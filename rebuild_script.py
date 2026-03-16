import sys

js_content = r'''// script.js

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

// SVG Icons for Moon and Sun
const moonIcon = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const sunIcon = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>; 

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggleBtn.innerHTML = sunIcon;
        } else {
            themeToggleBtn.innerHTML = moonIcon;
        }
    });
}

// 3. Live Search Functionality
const searchInput = document.getElementById('searchInput');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // Look through active tab preferably, or all
        const questionCards = document.querySelectorAll('.question-card');
        
        questionCards.forEach(card => {
            const questionText = card.querySelector('.question-title').innerText.toLowerCase();
            const answerText = card.querySelector('.answer-text').innerText.toLowerCase();

            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// 4. Copy to Clipboard Functionality (using Event Delegation)
const copyIcons = {
    default: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>,
    success: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
};

document.body.addEventListener('click', async (e) => {
    // Find closest copy button
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;

    const card = btn.closest('.question-card');
    if (!card) return;

    const questionText = card.querySelector('.question-title').innerText.trim();
    const answerText = card.querySelector('.answer-text').innerText.trim(); 
    const shareableContent = Q: \nAns: \n\nVia: EduNotes Mastery;

    try {
        await navigator.clipboard.writeText(shareableContent);
        btn.innerHTML = copyIcons.success;
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = copyIcons.default;
            btn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text:', err);
    }
});

// 5 & 6. Tab Navigation Logic and Ripple Functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding pane
        const targetId = btn.getAttribute('data-target');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    });
});

// Ripple Effect via Event Delegation
document.body.addEventListener('mousedown', function(e) {
    const target = e.target.closest('.copy-btn, .theme-btn, .nav-link, .tab-btn');
    if (!target) return;

    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');

    // Calculate coords
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    target.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// 7. Scroll Progress Bar Logic
const contentArea = document.getElementById('contentArea') || document.querySelector('.content-area');
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
'''

with open(r'd:\Python_ka_chilla\script.js', 'w', encoding='utf-8') as f:
    f.write(js_content)
print("Rebuilt script.js securely!")
