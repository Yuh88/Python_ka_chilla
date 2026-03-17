document.addEventListener('DOMContentLoaded', () => {
    const splashKey = 'edunotes_splash_seen';
    const splash = document.getElementById('firstVisitSplash');
    const isFirstVisit = !document.documentElement.classList.contains('returning-visitor');
    let featureTourStarted = false;
    let hasPlayedVoiceGreeting = false;
    let isVoiceAttemptInProgress = false;
    let hasBoundVoiceGestureRetry = false;

    const bindVoiceGestureRetry = () => {
        if (!isFirstVisit || hasPlayedVoiceGreeting || hasBoundVoiceGestureRetry) return;
        hasBoundVoiceGestureRetry = true;

        const retryOnGesture = () => {
            hasBoundVoiceGestureRetry = false;
            document.removeEventListener('click', retryOnGesture, true);
            document.removeEventListener('touchstart', retryOnGesture, true);
            document.removeEventListener('keydown', retryOnGesture, true);
            playFirstVisitVoiceGreeting(true);
        };

        document.addEventListener('click', retryOnGesture, true);
        document.addEventListener('touchstart', retryOnGesture, true);
        document.addEventListener('keydown', retryOnGesture, true);
    };

    const getPreferredEnglishVoice = () => {
        const allVoices = window.speechSynthesis.getVoices();
        const englishVoices = allVoices.filter(voice => voice.lang && voice.lang.toLowerCase().startsWith('en'));
        const preferredNameTokens = ['female', 'zira', 'aria', 'samantha', 'joanna', 'karen', 'susan', 'victoria', 'hazel', 'serena'];

        return englishVoices.find(voice => {
            const lowerName = voice.name.toLowerCase();
            return preferredNameTokens.some(token => lowerName.includes(token));
        }) || englishVoices[0] || allVoices[0] || null;
    };

    const playFirstVisitVoiceGreeting = (fromUserGesture = false) => {
        if (!isFirstVisit || hasPlayedVoiceGreeting || isVoiceAttemptInProgress) return;
        if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return;

        isVoiceAttemptInProgress = true;

        const message = 'Assalamualikum! Welcome Dear';
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'en-US';
        utterance.rate = 0.95;
        utterance.pitch = 1;

        const preferredVoice = getPreferredEnglishVoice();

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.onstart = () => {
            hasPlayedVoiceGreeting = true;
            isVoiceAttemptInProgress = false;
            hasBoundVoiceGestureRetry = false;
        };

        utterance.onend = () => {
            isVoiceAttemptInProgress = false;
        };

        utterance.onerror = () => {
            isVoiceAttemptInProgress = false;
            if (!hasPlayedVoiceGreeting && !fromUserGesture) {
                bindVoiceGestureRetry();
            }
        };

        try {
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
            if (!fromUserGesture) {
                window.setTimeout(() => {
                    if (!hasPlayedVoiceGreeting) {
                        bindVoiceGestureRetry();
                    }
                }, 200);
            }
        } catch (error) {
            isVoiceAttemptInProgress = false;
            if (!fromUserGesture) {
                bindVoiceGestureRetry();
            }
        }
    };

    const createTourTooltip = (text) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'feature-tooltip';
        tooltip.textContent = text;
        return tooltip;
    };

    const positionTourTooltip = (tooltip, anchorElement) => {
        const anchorRect = anchorElement.getBoundingClientRect();
        const tipRect = tooltip.getBoundingClientRect();
        const sidePadding = 10;
        const offset = 12;

        let left = anchorRect.left + ((anchorRect.width - tipRect.width) / 2);
        left = Math.max(sidePadding, Math.min(left, window.innerWidth - tipRect.width - sidePadding));

        const top = anchorRect.bottom + offset;

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    };

    const startFeatureTour = () => {
        if (!isFirstVisit || featureTourStarted) return;

        const themeButton = document.getElementById('themeToggleBtn');
        const searchContainer = document.querySelector('.search-container');
        if (!themeButton || !searchContainer) return;

        featureTourStarted = true;
        const tourSteps = [
            { text: 'Search any topic here! 🔍', anchor: searchContainer, pulse: false },
            { text: 'Tap for Night Mode! 🌙', anchor: themeButton, pulse: true }
        ];

        let activeTooltip = null;
        let activeStepIndex = -1;
        let dismissing = false;
        let currentTimer = null;

        const clearCurrentTimer = () => {
            if (currentTimer) {
                window.clearTimeout(currentTimer);
                currentTimer = null;
            }
        };

        const removeActiveTooltip = () => {
            if (!activeTooltip) return;
            const tooltipToRemove = activeTooltip;
            tooltipToRemove.classList.remove('is-visible');
            activeTooltip = null;
            window.setTimeout(() => {
                tooltipToRemove.remove();
            }, 240);
        };

        const updateTooltipPosition = () => {
            if (!activeTooltip || dismissing || activeStepIndex < 0) return;
            positionTourTooltip(activeTooltip, tourSteps[activeStepIndex].anchor);
        };

        const teardownTour = () => {
            clearCurrentTimer();
            themeButton.classList.remove('feature-pulse');
            removeActiveTooltip();
            window.removeEventListener('resize', updateTooltipPosition);
            window.removeEventListener('scroll', dismissTour);
            document.removeEventListener('click', dismissTour, true);
        };

        const showStep = (index) => {
            if (dismissing) return;
            if (index >= tourSteps.length) {
                teardownTour();
                return;
            }

            activeStepIndex = index;
            const step = tourSteps[index];
            themeButton.classList.toggle('feature-pulse', step.pulse);
            removeActiveTooltip();

            const tooltip = createTourTooltip(step.text);
            document.body.appendChild(tooltip);
            activeTooltip = tooltip;

            updateTooltipPosition();
            requestAnimationFrame(() => {
                if (activeTooltip === tooltip && !dismissing) {
                    tooltip.classList.add('is-visible');
                }
            });

            currentTimer = window.setTimeout(() => {
                tooltip.classList.remove('is-visible');
                window.setTimeout(() => {
                    if (activeTooltip === tooltip) {
                        tooltip.remove();
                        activeTooltip = null;
                    }
                    showStep(index + 1);
                }, 240);
            }, 3000);
        };

        const dismissTour = () => {
            if (dismissing) return;
            dismissing = true;
            teardownTour();
        };

        window.addEventListener('resize', updateTooltipPosition);
        window.addEventListener('scroll', dismissTour, { passive: true });
        document.addEventListener('click', dismissTour, true);

        showStep(0);
    };

    const hideSplash = () => {
        if (!splash || splash.classList.contains('is-exiting') || splash.classList.contains('is-hidden')) {
            return;
        }

        splash.classList.add('is-exiting');
        document.body.classList.remove('splash-active');

        window.setTimeout(() => {
            splash.classList.add('is-hidden');
        }, 700);
    };

    const initFirstVisitSplash = () => {
        if (!isFirstVisit) {
            if (splash) {
                splash.classList.add('is-hidden');
            }
            return;
        }

        try {
            localStorage.setItem(splashKey, '1');
        } catch (error) {
            /* no-op */
        }

        if (!splash) {
            startFeatureTour();
            return;
        }

        document.body.classList.add('splash-active');

        splash.addEventListener('click', () => {
            playFirstVisitVoiceGreeting(true);
        }, { once: true });

        let hasClosed = false;
        const closeOnce = () => {
            if (hasClosed) return;
            hasClosed = true;
            playFirstVisitVoiceGreeting();
            hideSplash();
            window.setTimeout(startFeatureTour, 760);
        };

        window.setTimeout(closeOnce, 3000);

    };

    initFirstVisitSplash();

    // 1. Mobile Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('openSidebar');
    const closeBtn = document.getElementById('closeSidebar');

    const isMobileView = () => window.matchMedia('(max-width: 768px)').matches;

    const updateSidebarToggleState = () => {
        if (!openBtn || !sidebar) return;
        const isExpanded = isMobileView()
            ? sidebar.classList.contains('mobile-open')
            : !document.body.classList.contains('sidebar-collapsed');
        openBtn.setAttribute('aria-expanded', String(isExpanded));
        openBtn.setAttribute('aria-label', isExpanded ? 'Hide Sidebar' : 'Show Sidebar');
    };

    if (openBtn && sidebar) {
        openBtn.addEventListener('click', () => {
            if (isMobileView()) {
                sidebar.classList.toggle('mobile-open');
            } else {
                document.body.classList.toggle('sidebar-collapsed');
            }
            updateSidebarToggleState();
        });
    }

    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            if (isMobileView()) {
                sidebar.classList.remove('mobile-open');
            } else {
                document.body.classList.add('sidebar-collapsed');
            }
            updateSidebarToggleState();
        });
    }

    window.addEventListener('resize', () => {
        if (!isMobileView() && sidebar) {
            sidebar.classList.remove('mobile-open');
        }
        updateSidebarToggleState();
    });

    updateSidebarToggleState();

    if (sidebar) {
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.matchMedia('(max-width: 768px)').matches) {
                    sidebar.classList.remove('mobile-open');
                    updateSidebarToggleState();
                }
            });
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

    // Subject Dashboard → Chapters → Content Flow
    const subjectDashboardView = document.getElementById('subjectDashboardView');
    const subjectCards = document.querySelectorAll('.subject-card');
    const chapterSelectionView = document.getElementById('chapterSelectionView');
    const chapterSelectionTitle = document.getElementById('chapterSelectionTitle');
    const chapterList = document.getElementById('chapterList');
    const persistentBackBtn = document.getElementById('persistentBackBtn');
    const sidebarHomeLink = document.getElementById('sidebarHomeLink');
    const subjectLinks = document.querySelectorAll('.subject-link');
    const sidebarDropdownItems = document.querySelectorAll('.sidebar .nav-item.has-dropdown');
    const chapterLinks = document.querySelectorAll('.dropdown-link');
    const chapterHeaderBanner = document.querySelector('.chapter-header-banner');
    const questionsFeed = document.getElementById('questions-feed');
    const contentUnavailable = document.getElementById('content-unavailable');
    const contentUnavailableText = contentUnavailable ? contentUnavailable.querySelector('p') : null;
    const tabNavigation = document.querySelector('.tab-navigation');
    const bannerTitle = document.querySelector('.chapter-header-banner h1');
    const bannerBadge = document.querySelector('.chapter-header-banner .badge');
    const bannerSubtitle = document.querySelector('.chapter-header-banner p');
    const contentAreaView = document.querySelector('.content-area');
    const navStateKey = '__edunotesNav';
    let activeSubject = null;

    const chapterMap = {
        'Computer Science': ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7', 'Chapter 8', 'Chapter 9'],
        'English': ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5'],
        'Physics': ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7', 'Chapter 8'],
        'Urdu': ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6'],
        'Islamiyat': ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6']
    };

    const availableChapterContent = {
        'Computer Science': new Set(['Chapter 9'])
    };

    const hideElement = (element) => {
        if (element) {
            element.classList.add('hidden');
        }
    };

    const showElement = (element) => {
        if (element) {
            element.classList.remove('hidden');
        }
    };

    const playViewTransition = (direction) => {
        if (!contentAreaView || direction === 'none') return;
        contentAreaView.classList.remove('view-transition-forward', 'view-transition-back');
        void contentAreaView.offsetWidth;
        contentAreaView.classList.add(direction === 'back' ? 'view-transition-back' : 'view-transition-forward');
        window.setTimeout(() => {
            contentAreaView.classList.remove('view-transition-forward', 'view-transition-back');
        }, 340);
    };

    const setBackButtonState = (mode) => {
        if (!persistentBackBtn) return;

        if (mode === 'none') {
            hideElement(persistentBackBtn);
            persistentBackBtn.dataset.mode = 'none';
            persistentBackBtn.setAttribute('aria-label', 'Back');
            persistentBackBtn.setAttribute('title', 'Back');
            return;
        }

        showElement(persistentBackBtn);
        persistentBackBtn.dataset.mode = mode;
        const label = mode === 'subjects' ? 'Back to Subjects' : 'Back to Chapters';
        persistentBackBtn.setAttribute('aria-label', label);
        persistentBackBtn.setAttribute('title', label);
    };

    const resetDropdownActiveState = () => {
        document.querySelectorAll('.active-dropdown').forEach(el => el.classList.remove('active-dropdown'));
    };

    const setExpandedSidebarSubject = (subjectName, shouldExpand = true) => {
        sidebarDropdownItems.forEach(item => {
            const itemSubject = item.querySelector('.subject-link') ? item.querySelector('.subject-link').getAttribute('data-subject') : null;
            const isTarget = itemSubject === subjectName;
            item.classList.toggle('expanded', shouldExpand && isTarget);
        });
    };

    const buildNavState = (view, subject = null, chapter = null) => ({
        [navStateKey]: true,
        view,
        subject,
        chapter
    });

    const normalizeNavState = (state) => {
        if (!state || state[navStateKey] !== true) {
            return buildNavState('dashboard');
        }

        if (state.view === 'chapters' && state.subject) {
            return buildNavState('chapters', state.subject);
        }

        if (state.view === 'content' && state.subject && state.chapter) {
            return buildNavState('content', state.subject, state.chapter);
        }

        return buildNavState('dashboard');
    };

    const showSubjectDashboard = () => {
        activeSubject = null;
        showElement(subjectDashboardView);
        hideElement(chapterSelectionView);
        hideElement(chapterHeaderBanner);
        hideElement(tabNavigation);
        hideElement(questionsFeed);
        hideElement(contentUnavailable);
        setBackButtonState('none');
        resetDropdownActiveState();
        setExpandedSidebarSubject('', false);
    };

    const showChapterSelection = (subjectName) => {
        activeSubject = subjectName;
        showElement(chapterSelectionView);
        hideElement(subjectDashboardView);
        hideElement(chapterHeaderBanner);
        hideElement(tabNavigation);
        hideElement(questionsFeed);
        hideElement(contentUnavailable);
        setBackButtonState('subjects');
        setExpandedSidebarSubject(subjectName, true);

        if (chapterSelectionTitle) {
            chapterSelectionTitle.innerText = `${subjectName} Chapters`;
        }

        const chapters = chapterMap[subjectName] || [];
        if (!chapterList) return;

        if (chapters.length === 0) {
            chapterList.innerHTML = '<div class="chapter-empty-state">Content Coming Soon</div>';
            return;
        }

        chapterList.innerHTML = chapters
            .map(chapter => `<button class="chapter-card" type="button" data-subject="${subjectName}" data-chapter="${chapter}">${chapter}</button>`)
            .join('');

        chapterList.querySelectorAll('.chapter-card').forEach(chapterCard => {
            chapterCard.addEventListener('click', () => {
                const subject = chapterCard.getAttribute('data-subject');
                const chapter = chapterCard.getAttribute('data-chapter');
                if (subject && chapter) {
                    navigateToState(buildNavState('content', subject, chapter), 'forward');
                }
            });
        });
    };

    const showChapterContent = (subjectName, chapterName) => {
        activeSubject = subjectName;
        hideElement(subjectDashboardView);
        hideElement(chapterSelectionView);
        showElement(chapterHeaderBanner);
        setBackButtonState('chapters');
        setExpandedSidebarSubject(subjectName, true);

        if (bannerBadge) {
            bannerBadge.innerText = subjectName;
        }
        if (bannerTitle) {
            bannerTitle.innerText = `${chapterName}: ${subjectName}`;
        }
        if (bannerSubtitle) {
            bannerSubtitle.innerText = 'Focused revision view for board preparation.';
        }

        const hasChapterContent = Boolean(availableChapterContent[subjectName] && availableChapterContent[subjectName].has(chapterName));

        if (hasChapterContent) {
            if (bannerTitle) {
                bannerTitle.innerText = 'Chapter 9: Entrepreneurship in Digital Age';
            }
            if (bannerSubtitle) {
                bannerSubtitle.innerText = 'PHASE 1: MOST IMPORTANT & HIGHLY REPEATED BOARD-LEVEL SQs';
            }

            showElement(tabNavigation);
            showElement(questionsFeed);
            hideElement(contentUnavailable);

            const firstTabBtn = document.querySelector('.tab-btn[data-target="tab-most-important"]');
            const firstTabPane = document.getElementById('tab-most-important');
            tabButtons.forEach(button => button.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            if (firstTabBtn) firstTabBtn.classList.add('active');
            if (firstTabPane) firstTabPane.classList.add('active');
        } else {
            hideElement(tabNavigation);
            hideElement(questionsFeed);
            showElement(contentUnavailable);
            if (contentUnavailableText) {
                contentUnavailableText.innerText = 'Content Coming Soon';
            }
        }
    };

    const renderNavState = (state, direction = 'none') => {
        const safeState = normalizeNavState(state);

        if (safeState.view === 'chapters' && safeState.subject) {
            showChapterSelection(safeState.subject);
        } else if (safeState.view === 'content' && safeState.subject && safeState.chapter) {
            showChapterContent(safeState.subject, safeState.chapter);
        } else {
            showSubjectDashboard();
        }

        playViewTransition(direction);
    };

    const navigateToState = (state, direction = 'forward') => {
        const safeState = normalizeNavState(state);
        history.pushState(safeState, '', window.location.href);
        renderNavState(safeState, direction);
    };

    if (sidebarHomeLink) {
        sidebarHomeLink.addEventListener('click', (event) => {
            event.preventDefault();
            navigateToState(buildNavState('dashboard'), 'back');
        });
    }

    subjectCards.forEach(card => {
        card.addEventListener('click', () => {
            const subjectName = card.getAttribute('data-subject');
            if (subjectName) {
                navigateToState(buildNavState('chapters', subjectName), 'forward');
            }
        });
    });

    subjectLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const subjectName = link.getAttribute('data-subject') || link.innerText.trim();

            const sidebarItem = link.closest('.sidebar .nav-item.has-dropdown');
            if (sidebarItem) {
                const isExpanded = sidebarItem.classList.contains('expanded');
                sidebarDropdownItems.forEach(item => item.classList.remove('expanded'));

                if (isExpanded) {
                    return;
                }

                sidebarItem.classList.add('expanded');
            }

            navigateToState(buildNavState('chapters', subjectName), 'forward');
        });
    });

    chapterLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            resetDropdownActiveState();
            link.classList.add('active-dropdown');

            const chapterName = link.innerText.trim();
            const parentDropdownItem = link.closest('.has-dropdown');
            if (parentDropdownItem) {
                sidebarDropdownItems.forEach(item => item.classList.toggle('expanded', item === parentDropdownItem));
            }
            const parentSubjectLink = parentDropdownItem ? parentDropdownItem.querySelector('.subject-link') : null;
            const subjectName = parentSubjectLink ? parentSubjectLink.getAttribute('data-subject') : 'Computer Science';
            navigateToState(buildNavState('content', subjectName || 'Computer Science', chapterName), 'forward');
        });
    });

    if (persistentBackBtn) {
        persistentBackBtn.addEventListener('click', () => {
            const mode = persistentBackBtn.dataset.mode;
            if (mode === 'chapters' || mode === 'subjects') {
                history.back();
            }
        });
    }

    window.addEventListener('popstate', (event) => {
        renderNavState(event.state, 'back');
    });

    const initialState = normalizeNavState(history.state);
    history.replaceState(initialState, '', window.location.href);
    renderNavState(initialState, 'none');

    // 6. Back To Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');

    const toggleBackToTopVisibility = () => {
        if (!backToTopBtn) return;
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('is-visible');
        } else {
            backToTopBtn.classList.remove('is-visible');
        }
    };

    window.addEventListener('scroll', toggleBackToTopVisibility, { passive: true });
    toggleBackToTopVisibility();

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Scroll Progress Bar
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
