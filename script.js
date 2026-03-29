(() => {
    const url = new URL(window.location.href);
    const rawPath = url.searchParams.get('p');

    if (!rawPath) {
        window.__notescraftBootPathname = '';
        return;
    }

    const normalizedPath = String(rawPath).trim();
    if (!normalizedPath) {
        window.__notescraftBootPathname = '';
        return;
    }

    const withLeadingSlash = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;

    try {
        const parsed = new URL(withLeadingSlash, window.location.origin);
        window.__notescraftBootPathname = parsed.pathname;
    } catch (error) {
        window.__notescraftBootPathname = withLeadingSlash.split('?')[0].split('#')[0] || '';
    }

    url.searchParams.delete('p');
    const cleanRelativeUrl = `${url.pathname}${url.search}${url.hash}`;
    history.replaceState(history.state, '', cleanRelativeUrl);
})();

const initializeNotesCraftApp = () => {
    window.openModelPapers = function openModelPapers() {};

    const savedPath = sessionStorage.getItem('spaRedirect');
    if (savedPath) {
        sessionStorage.removeItem('spaRedirect');
        history.replaceState(null, null, savedPath);
        window.__notescraftBootPathname = savedPath;
    }

    const splashKey = 'notescraft_splash_seen';
    const splash = document.getElementById('firstVisitSplash');
    const isFirstVisit = !document.documentElement.classList.contains('returning-visitor');
    let featureTourStarted = false;

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
        if (!splash || splash.classList.contains('fade-out') || splash.classList.contains('is-hidden')) {
            return;
        }

        splash.classList.add('fade-out');
        document.body.classList.remove('splash-active');

        window.setTimeout(() => {
            splash.classList.add('is-hidden');
            splash.style.display = 'none';
        }, 500);
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

        let hasClosed = false;
        const closeOnce = () => {
            if (hasClosed) return;
            hasClosed = true;
            hideSplash();
            window.setTimeout(startFeatureTour, 760);
        };

        const splashDisplayDuration = window.matchMedia('(max-width: 768px)').matches ? 1400 : 2600;
        window.setTimeout(closeOnce, splashDisplayDuration);

    };

    initFirstVisitSplash();

    // 1. Mobile Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('openSidebar');
    const closeBtn = document.getElementById('closeSidebar');
    const menuDiscoveredStorageKey = 'menuDiscovered';

    const isMobileView = () => window.matchMedia('(max-width: 768px)').matches;

    const hasMenuBeenDiscovered = () => {
        try {
            return localStorage.getItem(menuDiscoveredStorageKey) === 'true';
        } catch (error) {
            return false;
        }
    };

    const markMenuAsDiscovered = () => {
        if (!openBtn) return;
        openBtn.classList.remove('attention-pulse');

        try {
            localStorage.setItem(menuDiscoveredStorageKey, 'true');
        } catch (error) {
            /* no-op */
        }
    };

    const syncMobileMenuCue = () => {
        if (!openBtn) return;
        const shouldPulse = isMobileView() && !hasMenuBeenDiscovered();
        openBtn.classList.toggle('attention-pulse', shouldPulse);
    };

    const closeSidebarOnMobile = () => {
        if (!sidebar || !isMobileView()) return;
        sidebar.classList.remove('mobile-open', 'active');
        updateSidebarToggleState();
    };

    const closeSidebarAfterNavigation = () => {
        if (!sidebar || !isMobileView()) return;
        window.requestAnimationFrame(() => {
            closeSidebarOnMobile();
        });
    };

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
            if (isMobileView() && !hasMenuBeenDiscovered()) {
                markMenuAsDiscovered();
            }

            if (isMobileView()) {
                sidebar.classList.toggle('mobile-open');
            } else {
                document.body.classList.toggle('sidebar-collapsed');
            }
            updateSidebarToggleState();
            syncMobileMenuCue();
        });
    }

    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            if (isMobileView()) {
                closeSidebarOnMobile();
            } else {
                document.body.classList.add('sidebar-collapsed');
                updateSidebarToggleState();
            }
        });
    }

    window.addEventListener('resize', () => {
        if (!isMobileView() && sidebar) {
            sidebar.classList.remove('mobile-open');
        }
        updateSidebarToggleState();
        syncMobileMenuCue();
    });

    updateSidebarToggleState();
    syncMobileMenuCue();

    // 2. Dark Mode Toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const flashcardFabBtn = document.getElementById('flashcardFabBtn');
    const googleSignInBtn = document.getElementById('googleSignInBtn');
    const authUserState = document.getElementById('authUserState');
    const authUserAvatar = document.getElementById('authUserAvatar');
    const authUserName = document.getElementById('authUserName');
    const logoutBtn = document.getElementById('logoutBtn');
    const authStatusText = document.getElementById('authStatusText');
    const loginIncentive = document.getElementById('login-incentive');
    const commentsCompose = document.getElementById('comments-compose');
    const commentsLoginRequired = document.getElementById('comments-login-required');
    const commentInput = document.getElementById('comment-input');
    const postCommentBtn = document.getElementById('post-comment-btn');
    const commentsList = document.getElementById('comments-list');
    const commentsSection = document.getElementById('comments-section');
    const leaderboardTopThree = document.getElementById('leaderboardTopThree');
    const leaderboardEmptyState = document.getElementById('leaderboardEmptyState');
    const profileSetupModal = document.getElementById('profileSetupModal');
    const profileSetupNicknameInput = document.getElementById('profileSetupNicknameInput');
    const profileSetupSaveBtn = document.getElementById('profileSetupSaveBtn');
    const profileSetupError = document.getElementById('profileSetupError');
    const examCountdown = document.getElementById('exam-countdown');
    const examCountdownGrid = document.getElementById('examCountdownGrid');
    const examCountdownMessage = document.getElementById('examCountdownMessage');
    const examDays = document.getElementById('examDays');
    const examHours = document.getElementById('examHours');
    const examMinutes = document.getElementById('examMinutes');
    const examSeconds = document.getElementById('examSeconds');
    const adminAnnouncementPanel = document.getElementById('adminAnnouncementPanel');
    const adminAnnouncementInput = document.getElementById('adminAnnouncementInput');
    const adminAnnouncementSaveBtn = document.getElementById('adminAnnouncementSaveBtn');
    const adminAnnouncementDeleteBtn = document.getElementById('adminAnnouncementDeleteBtn');
    const adminAnnouncementStatus = document.getElementById('adminAnnouncementStatus');
    const globalAnnouncementBanner = document.getElementById('globalAnnouncementBanner');
    const globalAnnouncementText = document.getElementById('globalAnnouncementText');
    const messageAdminBtn = document.getElementById('messageAdminBtn');
    const adminInboxBtn = document.getElementById('adminInboxBtn');
    const privateChatModal = document.getElementById('privateChatModal');
    const privateChatBackdrop = document.getElementById('privateChatBackdrop');
    const privateChatCloseBtn = document.getElementById('privateChatCloseBtn');
    const privateChatTitle = document.getElementById('privateChatTitle');
    const adminInboxPanel = document.getElementById('adminInboxPanel');
    const adminInboxList = document.getElementById('adminInboxList');
    const privateChatMessages = document.getElementById('privateChatMessages');
    const privateChatInput = document.getElementById('privateChatInput');
    const privateChatSendBtn = document.getElementById('privateChatSendBtn');
    const privateChatStatus = document.getElementById('privateChatStatus');
    const body = document.body;
    const themeStorageKey = 'notescraft_theme';
    const flashcardStorageKey = 'notescraft_flashcard_mode';
    let isFlashcardMode = false;
    let completedQuestionIds = new Set();
    let savedQuestionIds = new Set();
    let currentAuthenticatedUser = null;
    let bookmarksUnsubscribe = null;
    let bookmarksListenerUid = '';
    let currentChapterQuestionList = [];
    let currentChapterSubjectName = '';
    let currentChapterName = '';

    const moonIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    const sunIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const firebaseConfig = {
        apiKey: 'AIzaSyChjOOrOc5lv7_TO5DYf7CeZHsP_s8c2fU',
        authDomain: 'notes-craft.firebaseapp.com',
        projectId: 'notes-craft',
        storageBucket: 'notes-craft.firebasestorage.app',
        messagingSenderId: '1047204613728',
        appId: '1:1047204613728:web:8645581af3037555423d05'
    };
    let firebaseAuthInstance = null;
    let firebaseAuthInitPromise = null;
    let isSignInInProgress = false;
    let firestoreDbInstance = null;
    let firestoreFieldValue = null;
    let firestoreInitPromise = null;
    let commentsUnsubscribe = null;
    let isPostingComment = false;
    let latestCommentsCache = [];
    let activeReplyTargetId = null;
    let isInitialCommentsSnapshot = true;
    let pendingProfileSetupUid = '';
    let isNewProfileDocument = false;
    let isProfileSetupSubmitting = false;
    let announcementUnsubscribe = null;
    let latestAnnouncementText = '';
    let adminInboxUnsubscribe = null;
    let userInboxUnreadUnsubscribe = null;
    let privateChatUnsubscribes = [];
    let privateStreamA = [];
    let activePrivateChatUserId = '';
    let isPrivateMessageSending = false;

    const ADMIN_EMAIL = 'johnythewithcher@gmail.com';
    const ADMIN_EMAIL_TEMPLATE = 'APNA_GMAIL_YAHAN_LIKHO';
    const ADMIN_DISPLAY_NAME = 'Admin 👑';
    const UNBLOCKABLE_EMAIL = 'johnythewithcher@gmail.com';
    const ADMIN_CHANNEL_ID = 'admin_email';

    const getInitialTheme = () => {
        try {
            const savedTheme = localStorage.getItem(themeStorageKey);
            if (savedTheme === 'light' || savedTheme === 'dark') {
                return savedTheme;
            }
        } catch (error) {
            /* no-op */
        }
        return 'dark';
    };

    const applyTheme = (theme) => {
        const isDark = theme === 'dark';
        body.classList.toggle('dark-mode', isDark);
        document.documentElement.classList.toggle('dark-mode', isDark);
        document.documentElement.style.backgroundColor = isDark ? '#0b0b0d' : '#f8fafc';
        document.body.style.backgroundColor = isDark ? '#0b0b0d' : '#f8fafc';
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = isDark ? sunIcon : moonIcon;
        }
    };

    const persistTheme = (theme) => {
        try {
            localStorage.setItem(themeStorageKey, theme);
        } catch (error) {
            /* no-op */
        }
    };

    const setAuthStatus = (message = '', isError = false) => {
        if (!authStatusText) return;
        authStatusText.textContent = message;
        authStatusText.classList.toggle('is-error', isError);
    };

    const updateLoginIncentive = (isLoggedIn) => {
        if (!loginIncentive) return;

        if (isLoggedIn) {
            loginIncentive.textContent = '✅ Progress is synced to cloud.';
            loginIncentive.classList.add('is-synced');
        } else {
            loginIncentive.textContent = 'Sign in to sync your saved progress across devices.';
            loginIncentive.classList.remove('is-synced');
        }
    };

    const setCommentsComposerVisibility = (isLoggedIn) => {
        if (!commentsCompose || !commentsLoginRequired) return;

        commentsCompose.classList.toggle('hidden', !isLoggedIn);
        commentsLoginRequired.classList.toggle('hidden', Boolean(isLoggedIn));
    };

    const setCommentsSectionVisibility = (shouldShow) => {
        if (!commentsSection) return;
        commentsSection.classList.toggle('hidden', !shouldShow);
    };

    const normalizeEmail = (emailValue) => String(emailValue || '').trim().toLowerCase();
    const isAdminEmail = (emailValue) => {
        const normalized = normalizeEmail(emailValue);
        const canonicalAdminEmail = normalizeEmail(ADMIN_EMAIL);
        const templateEmail = normalizeEmail(ADMIN_EMAIL_TEMPLATE);
        const templateLooksConfigured = templateEmail.includes('@');
        return normalized === canonicalAdminEmail || (templateLooksConfigured && normalized === templateEmail);
    };
    const isCurrentUserAdmin = () => Boolean(currentAuthenticatedUser && isAdminEmail(currentAuthenticatedUser.email));
    const isUnblockableEmail = (emailValue) => normalizeEmail(emailValue) === UNBLOCKABLE_EMAIL;

    const setAdminAnnouncementStatus = (message = '', isError = false) => {
        if (!adminAnnouncementStatus) return;
        adminAnnouncementStatus.textContent = message;
        adminAnnouncementStatus.classList.toggle('is-error', isError);
    };

    const setPrivateChatStatus = (message = '', isError = false) => {
        if (!privateChatStatus) return;
        privateChatStatus.textContent = message;
        privateChatStatus.classList.toggle('is-error', isError);
    };

    const setSidebarButtonUnreadDot = (button, shouldShow, badgeText = '') => {
        if (!button) return;

        let dot = button.querySelector('.notification-dot.notification-dot-button');
        if (!dot) {
            dot = document.createElement('span');
            dot.className = 'notification-dot notification-dot-button';
            dot.setAttribute('aria-hidden', 'true');
            button.appendChild(dot);
        }

        dot.textContent = badgeText;
        dot.classList.toggle('hidden', !shouldShow);
    };

    const stopUserInboxUnreadListener = () => {
        if (userInboxUnreadUnsubscribe) {
            userInboxUnreadUnsubscribe();
            userInboxUnreadUnsubscribe = null;
        }
        setSidebarButtonUnreadDot(messageAdminBtn, false);
    };

    const startUserInboxUnreadListener = async (uid) => {
        if (!uid || isCurrentUserAdmin()) {
            stopUserInboxUnreadListener();
            return;
        }

        stopUserInboxUnreadListener();

        try {
            const db = await initializeFirestoreCompat();
            userInboxUnreadUnsubscribe = db.collection('inbox').doc(uid).onSnapshot((docSnapshot) => {
                const data = docSnapshot.exists ? (docSnapshot.data() || {}) : {};
                const hasUnread = Boolean(data.hasUnreadForUser);
                setSidebarButtonUnreadDot(messageAdminBtn, hasUnread);
            }, () => {
                setSidebarButtonUnreadDot(messageAdminBtn, false);
            });
        } catch (error) {
            console.warn('Unable to initialize user unread listener.', error);
            setSidebarButtonUnreadDot(messageAdminBtn, false);
        }
    };

    const clearUnreadForAdmin = async (uid) => {
        if (!uid || !isCurrentUserAdmin()) return;

        try {
            const db = await initializeFirestoreCompat();
            await db.collection('inbox').doc(uid).set({ hasUnreadForAdmin: false }, { merge: true });
        } catch (error) {
            console.warn('Unable to clear admin unread state.', error);
        }
    };

    const clearUnreadForUser = async (uid) => {
        if (!uid || isCurrentUserAdmin()) return;

        try {
            const db = await initializeFirestoreCompat();
            await db.collection('inbox').doc(uid).set({ hasUnreadForUser: false }, { merge: true });
        } catch (error) {
            console.warn('Unable to clear user unread state.', error);
        }
    };

    const renderGlobalAnnouncement = (announcementText) => {
        if (!globalAnnouncementBanner || !globalAnnouncementText) return;
        const finalText = String(announcementText || '').trim();

        if (!finalText) {
            globalAnnouncementText.textContent = '';
            globalAnnouncementBanner.classList.add('hidden');
            return;
        }

        globalAnnouncementText.textContent = finalText;
        globalAnnouncementBanner.classList.remove('hidden');
    };

    const toggleAdminUtilityPanels = (isAdmin) => {
        if (adminAnnouncementPanel) {
            adminAnnouncementPanel.classList.toggle('hidden', !isAdmin);
        }
        if (adminInboxBtn) {
            adminInboxBtn.classList.toggle('hidden', !isAdmin);
        }
        if (messageAdminBtn) {
            messageAdminBtn.classList.toggle('hidden', isAdmin || !currentAuthenticatedUser);
        }
    };

    const getPrivateMessageTimestampMs = (timestampValue) => {
        if (!timestampValue) return 0;
        if (typeof timestampValue.toDate === 'function') {
            const dateValue = timestampValue.toDate();
            return dateValue instanceof Date ? dateValue.getTime() : 0;
        }
        if (timestampValue instanceof Date) {
            return timestampValue.getTime();
        }
        return 0;
    };

    const formatPrivateMessageTime = (timestampValue) => {
        const timestampMs = getPrivateMessageTimestampMs(timestampValue);
        if (!timestampMs) return 'Now';
        return new Intl.DateTimeFormat(undefined, {
            hour: 'numeric',
            minute: '2-digit'
        }).format(new Date(timestampMs));
    };

    const clearPrivateConversationListeners = () => {
        privateChatUnsubscribes.forEach((unsubscribe) => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        });
        privateChatUnsubscribes = [];
        privateStreamA = [];
    };

    const closePrivateChatModal = () => {
        if (!privateChatModal) return;
        privateChatModal.classList.add('hidden');
        setPrivateChatStatus('');
        clearPrivateConversationListeners();
        activePrivateChatUserId = '';
    };

    const formatCommentDate = (timestampValue) => {
        if (!timestampValue) return 'Just now';

        let dateValue = null;
        if (timestampValue && typeof timestampValue.toDate === 'function') {
            dateValue = timestampValue.toDate();
        } else if (timestampValue instanceof Date) {
            dateValue = timestampValue;
        }

        if (!dateValue || Number.isNaN(dateValue.getTime())) return 'Just now';

        return new Intl.DateTimeFormat(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(dateValue);
    };

    const createCommentAvatarFallback = (name) => {
        const initial = String(name || 'U').trim().charAt(0).toUpperCase() || 'U';
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72"><rect width="72" height="72" rx="36" fill="#4338ca"/><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="700">${initial}</text></svg>`;
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    };

    const getCommentTimestampMs = (timestampValue) => {
        if (!timestampValue) return 0;
        if (typeof timestampValue.toDate === 'function') {
            const date = timestampValue.toDate();
            return date instanceof Date ? date.getTime() : 0;
        }
        if (timestampValue instanceof Date) {
            return timestampValue.getTime();
        }
        return 0;
    };

    const ensureAdminNotificationPermission = async () => {
        if (!isCurrentUserAdmin() || typeof Notification === 'undefined') return;
        if (Notification.permission === 'default') {
            try {
                await Notification.requestPermission();
            } catch (error) {
                console.warn('Notification permission request failed.', error);
            }
        }
    };

    const notifyAdminForComment = (entry) => {
        if (!isCurrentUserAdmin() || typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
        if (!entry || !entry.text) return;
        if (currentAuthenticatedUser && entry.userUid && entry.userUid === currentAuthenticatedUser.uid) return;

        const commenterName = isAdminEmail(entry.userEmail)
            ? ADMIN_DISPLAY_NAME
            : (entry.userName || 'Student');

        try {
            new Notification('New comment on NotesCraft', {
                body: `${commenterName}: ${entry.text.slice(0, 110)}`,
                icon: entry.userPhoto || undefined,
                tag: `comment-${entry.id}`
            });
        } catch (error) {
            console.warn('Unable to dispatch notification.', error);
        }
    };

    const isUserBlockedForComments = async (uid) => {
        if (!uid) return false;

        try {
            const db = await initializeFirestoreCompat();
            const blockedDoc = await db.collection('blocked_users').doc(uid).get();
            return blockedDoc.exists;
        } catch (error) {
            console.warn('Unable to verify blocked status.', error);
            return false;
        }
    };

    const ensureCurrentUserCanPost = async () => {
        if (!currentAuthenticatedUser || !currentAuthenticatedUser.uid) {
            await requestGoogleSignIn();
            return false;
        }

        if (isUnblockableEmail(currentAuthenticatedUser.email)) {
            return true;
        }

        const blocked = await isUserBlockedForComments(currentAuthenticatedUser.uid);
        if (blocked) {
            setAuthStatus('You are blocked from posting comments.', true);
            return false;
        }

        return true;
    };

    const deleteCommentById = async (commentId) => {
        if (!commentId || !isCurrentUserAdmin()) return;

        try {
            const db = await initializeFirestoreCompat();
            const childReplies = await db.collection('comments').where('parentId', '==', commentId).get();
            const batch = db.batch();

            childReplies.forEach((replyDoc) => {
                batch.delete(replyDoc.ref);
            });

            batch.delete(db.collection('comments').doc(commentId));
            await batch.commit();
        } catch (error) {
            console.warn('Unable to delete comment.', error);
        }
    };

    const togglePinComment = async (commentEntry) => {
        if (!isCurrentUserAdmin() || !commentEntry || !commentEntry.id || commentEntry.parentId) return;

        try {
            const db = await initializeFirestoreCompat();
            await db.collection('comments').doc(commentEntry.id).set({
                pinned: !Boolean(commentEntry.pinned),
                pinnedAt: firestoreFieldValue && typeof firestoreFieldValue.serverTimestamp === 'function'
                    ? firestoreFieldValue.serverTimestamp()
                    : new Date()
            }, { merge: true });
        } catch (error) {
            console.warn('Unable to update pinned state.', error);
        }
    };

    const blockCommentAuthor = async (commentEntry) => {
        if (!isCurrentUserAdmin() || !commentEntry || !commentEntry.userUid) return;
        if (currentAuthenticatedUser && commentEntry.userUid === currentAuthenticatedUser.uid) return;
        if (isUnblockableEmail(commentEntry.userEmail)) {
            setAuthStatus('This account cannot be blocked.', true);
            return;
        }

        try {
            const db = await initializeFirestoreCompat();
            await db.collection('blocked_users').doc(commentEntry.userUid).set({
                uid: commentEntry.userUid,
                email: commentEntry.userEmail || '',
                name: commentEntry.userName || 'Student',
                blockedBy: currentAuthenticatedUser ? currentAuthenticatedUser.uid : '',
                blockedAt: firestoreFieldValue && typeof firestoreFieldValue.serverTimestamp === 'function'
                    ? firestoreFieldValue.serverTimestamp()
                    : new Date()
            }, { merge: true });
        } catch (error) {
            console.warn('Unable to block user.', error);
        }
    };

    const toggleCommentLove = async (commentEntry) => {
        if (!commentEntry || !commentEntry.id) return;

        const canPost = await ensureCurrentUserCanPost();
        if (!canPost || !currentAuthenticatedUser) return;

        const uid = currentAuthenticatedUser.uid;
        const likedBy = Array.isArray(commentEntry.likedBy) ? commentEntry.likedBy : [];
        const hasLiked = likedBy.includes(uid);

        try {
            const db = await initializeFirestoreCompat();
            const payload = {};

            if (firestoreFieldValue) {
                payload.likedBy = hasLiked
                    ? firestoreFieldValue.arrayRemove(uid)
                    : firestoreFieldValue.arrayUnion(uid);
                payload.likesCount = hasLiked
                    ? Math.max(0, (Number(commentEntry.likesCount) || likedBy.length || 0) - 1)
                    : (Number(commentEntry.likesCount) || likedBy.length || 0) + 1;
            } else {
                const nextLikedBy = hasLiked
                    ? likedBy.filter((id) => id !== uid)
                    : [...new Set([...likedBy, uid])];
                payload.likedBy = nextLikedBy;
                payload.likesCount = nextLikedBy.length;
            }

            await db.collection('comments').doc(commentEntry.id).set(payload, { merge: true });
        } catch (error) {
            console.warn('Unable to toggle love on comment.', error);
        }
    };

    const postReply = async (parentId, replyText) => {
        if (!parentId) return;

        const trimmedText = String(replyText || '').trim();
        if (!trimmedText) return;

        const canPost = await ensureCurrentUserCanPost();
        if (!canPost || !currentAuthenticatedUser) return;

        try {
            const db = await initializeFirestoreCompat();
            await db.collection('comments').add({
                parentId,
                text: trimmedText,
                userUid: String(currentAuthenticatedUser.uid || ''),
                userName: String(currentAuthenticatedUser.displayName || 'Student'),
                userEmail: String(currentAuthenticatedUser.email || ''),
                userPhoto: String(currentAuthenticatedUser.photoURL || ''),
                likesCount: 0,
                likedBy: [],
                pinned: false,
                timestamp: firestoreFieldValue && typeof firestoreFieldValue.serverTimestamp === 'function'
                    ? firestoreFieldValue.serverTimestamp()
                    : new Date()
            });

            activeReplyTargetId = null;
        } catch (error) {
            console.warn('Unable to post reply.', error);
        }
    };

    const renderComments = (comments = []) => {
        if (!commentsList) return;

        commentsList.innerHTML = '';

        if (!comments.length) {
            const emptyState = document.createElement('div');
            emptyState.className = 'comment-empty';
            emptyState.textContent = 'No comments yet. Start the discussion!';
            commentsList.appendChild(emptyState);
            return;
        }

        const groupedByParent = new Map();
        comments.forEach((entry) => {
            const parentKey = entry.parentId || 'root';
            if (!groupedByParent.has(parentKey)) {
                groupedByParent.set(parentKey, []);
            }
            groupedByParent.get(parentKey).push(entry);
        });

        const sortComments = (items, includePinPriority) => {
            return [...items].sort((first, second) => {
                if (includePinPriority) {
                    const pinDelta = Number(Boolean(second.pinned)) - Number(Boolean(first.pinned));
                    if (pinDelta !== 0) return pinDelta;
                }
                return getCommentTimestampMs(second.timestamp) - getCommentTimestampMs(first.timestamp);
            });
        };

        const renderCommentNode = (entry, containerElement, depth = 0) => {
            const commentIsAdmin = isAdminEmail(entry.userEmail);
            const displayName = commentIsAdmin ? ADMIN_DISPLAY_NAME : (entry.userName || 'Student');
            const likesCount = Number.isFinite(Number(entry.likesCount))
                ? Number(entry.likesCount)
                : (Array.isArray(entry.likedBy) ? entry.likedBy.length : 0);
            const likedBy = Array.isArray(entry.likedBy) ? entry.likedBy : [];
            const hasLiked = Boolean(currentAuthenticatedUser && likedBy.includes(currentAuthenticatedUser.uid));

            const item = document.createElement('article');
            item.className = `comment-item${depth > 0 ? ' reply-item' : ''}${commentIsAdmin ? ' admin-comment' : ''}`;

            const avatar = document.createElement('img');
            avatar.className = 'comment-avatar';
            avatar.src = entry.userPhoto || createCommentAvatarFallback(displayName);
            avatar.alt = `${displayName} avatar`;

            const content = document.createElement('div');
            content.className = 'comment-content';

            const meta = document.createElement('div');
            meta.className = 'comment-meta';

            const metaLeft = document.createElement('div');
            metaLeft.className = 'comment-meta-left';

            const userName = document.createElement('span');
            userName.className = `comment-user-name${commentIsAdmin ? ' is-admin' : ''}`;
            userName.textContent = displayName;
            metaLeft.appendChild(userName);

            if (entry.pinned && !entry.parentId) {
                const pinnedTag = document.createElement('span');
                pinnedTag.className = 'comment-pin-badge';
                pinnedTag.textContent = '📌 Pinned';
                metaLeft.appendChild(pinnedTag);
            }

            const time = document.createElement('span');
            time.className = 'comment-time';
            time.textContent = formatCommentDate(entry.timestamp);

            meta.appendChild(metaLeft);
            meta.appendChild(time);

            const text = document.createElement('p');
            text.className = 'comment-text';
            text.textContent = entry.text;

            const actions = document.createElement('div');
            actions.className = 'comment-actions';

            const replyBtn = document.createElement('button');
            replyBtn.type = 'button';
            replyBtn.className = 'comment-action-btn';
            replyBtn.textContent = 'Reply';
            replyBtn.addEventListener('click', async () => {
                if (!currentAuthenticatedUser) {
                    await requestGoogleSignIn();
                    return;
                }

                activeReplyTargetId = activeReplyTargetId === entry.id ? null : entry.id;
                renderComments(latestCommentsCache);
            });
            actions.appendChild(replyBtn);

            const loveBtn = document.createElement('button');
            loveBtn.type = 'button';
            loveBtn.className = `comment-action-btn comment-love-btn${hasLiked ? ' active' : ''}`;
            loveBtn.textContent = `❤️ ${likesCount}`;
            loveBtn.addEventListener('click', () => {
                toggleCommentLove(entry);
            });
            actions.appendChild(loveBtn);

            if (isCurrentUserAdmin()) {
                if (!entry.parentId) {
                    const pinBtn = document.createElement('button');
                    pinBtn.type = 'button';
                    pinBtn.className = 'comment-action-btn admin-action';
                    pinBtn.textContent = entry.pinned ? 'Unpin 📌' : 'Pin 📌';
                    pinBtn.addEventListener('click', () => {
                        togglePinComment(entry);
                    });
                    actions.appendChild(pinBtn);
                }

                if (entry.userUid && (!currentAuthenticatedUser || entry.userUid !== currentAuthenticatedUser.uid) && !isUnblockableEmail(entry.userEmail)) {
                    const blockBtn = document.createElement('button');
                    blockBtn.type = 'button';
                    blockBtn.className = 'comment-action-btn admin-action';
                    blockBtn.textContent = 'Block 🚫';
                    blockBtn.addEventListener('click', () => {
                        blockCommentAuthor(entry);
                    });
                    actions.appendChild(blockBtn);
                }

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'comment-action-btn admin-action delete-action';
                deleteBtn.textContent = 'Delete 🗑️';
                deleteBtn.addEventListener('click', () => {
                    deleteCommentById(entry.id);
                });
                actions.appendChild(deleteBtn);
            }

            content.appendChild(meta);
            content.appendChild(text);
            content.appendChild(actions);

            if (activeReplyTargetId === entry.id && currentAuthenticatedUser) {
                const replyComposer = document.createElement('div');
                replyComposer.className = 'reply-compose';

                const replyInput = document.createElement('textarea');
                replyInput.className = 'comment-input reply-input';
                replyInput.rows = 2;
                replyInput.maxLength = 350;
                replyInput.placeholder = 'Write a reply...';

                const replyPostBtn = document.createElement('button');
                replyPostBtn.type = 'button';
                replyPostBtn.className = 'post-comment-btn reply-post-btn';
                replyPostBtn.textContent = 'Reply';
                replyPostBtn.addEventListener('click', async () => {
                    replyPostBtn.disabled = true;
                    await postReply(entry.id, replyInput.value);
                    replyPostBtn.disabled = false;
                });

                replyComposer.appendChild(replyInput);
                replyComposer.appendChild(replyPostBtn);
                content.appendChild(replyComposer);
            }

            const childComments = sortComments(groupedByParent.get(entry.id) || [], false);
            if (childComments.length) {
                const repliesWrap = document.createElement('div');
                repliesWrap.className = 'comment-replies';
                childComments.forEach((childEntry) => {
                    renderCommentNode(childEntry, repliesWrap, depth + 1);
                });
                content.appendChild(repliesWrap);
            }

            item.appendChild(avatar);
            item.appendChild(content);
            containerElement.appendChild(item);
        };

        const rootComments = sortComments(groupedByParent.get('root') || [], true);
        rootComments.forEach((entry) => {
            renderCommentNode(entry, commentsList, 0);
        });
    };

    const startCommentsRealtimeListener = async () => {
        if (commentsUnsubscribe || !commentsList || !window.firebase || !window.firebase.firestore) return;

        try {
            const db = await initializeFirestoreCompat();
            const commentsQuery = db.collection('comments').orderBy('timestamp', 'desc').limit(300);

            isInitialCommentsSnapshot = true;

            commentsUnsubscribe = commentsQuery.onSnapshot(
                (snapshot) => {
                    const mapped = snapshot.docs.map((doc) => {
                        const data = doc.data() || {};
                        return {
                            id: doc.id,
                            text: String(data.text || '').trim(),
                            parentId: data.parentId ? String(data.parentId) : null,
                            userUid: String(data.userUid || ''),
                            userName: String(data.userName || 'Student'),
                            userEmail: String(data.userEmail || data.email || ''),
                            userPhoto: String(data.userPhoto || ''),
                            likesCount: Number(data.likesCount || 0),
                            likedBy: Array.isArray(data.likedBy) ? data.likedBy : [],
                            pinned: Boolean(data.pinned),
                            timestamp: data.timestamp || null
                        };
                    }).filter(item => item.text);

                    latestCommentsCache = mapped;
                    renderComments(latestCommentsCache);

                    if (isCurrentUserAdmin() && !isInitialCommentsSnapshot) {
                        snapshot.docChanges().forEach((change) => {
                            if (change.type !== 'added') return;

                            const data = change.doc.data() || {};
                            notifyAdminForComment({
                                id: change.doc.id,
                                text: String(data.text || ''),
                                userName: String(data.userName || 'Student'),
                                userEmail: String(data.userEmail || data.email || ''),
                                userPhoto: String(data.userPhoto || ''),
                                userUid: String(data.userUid || '')
                            });
                        });
                    }

                    isInitialCommentsSnapshot = false;
                },
                () => {
                    latestCommentsCache = [];
                    renderComments([]);
                }
            );
        } catch (error) {
            latestCommentsCache = [];
            renderComments([]);
            console.warn('Unable to start comments listener.', error);
        }
    };

    const postComment = async () => {
        if (!postCommentBtn || !commentInput) return;

        const canPost = await ensureCurrentUserCanPost();
        if (!canPost || !currentAuthenticatedUser) return;

        const trimmedText = commentInput.value.trim();
        if (!trimmedText || isPostingComment) return;

        isPostingComment = true;
        postCommentBtn.disabled = true;

        try {
            const db = await initializeFirestoreCompat();
            await db.collection('comments').add({
                parentId: null,
                text: trimmedText,
                userUid: String(currentAuthenticatedUser.uid || ''),
                userName: String(currentAuthenticatedUser.displayName || 'Student'),
                userEmail: String(currentAuthenticatedUser.email || ''),
                userPhoto: String(currentAuthenticatedUser.photoURL || ''),
                likesCount: 0,
                likedBy: [],
                pinned: false,
                timestamp: firestoreFieldValue && typeof firestoreFieldValue.serverTimestamp === 'function'
                    ? firestoreFieldValue.serverTimestamp()
                    : new Date()
            });

            commentInput.value = '';
        } catch (error) {
            console.warn('Unable to post comment.', error);
        } finally {
            postCommentBtn.disabled = false;
            isPostingComment = false;
        }
    };

    const initCommentsSection = () => {
        setCommentsComposerVisibility(false);
        setCommentsSectionVisibility(false);
        renderComments([]);

        startCommentsRealtimeListener();

        if (postCommentBtn) {
            postCommentBtn.addEventListener('click', () => {
                postComment();
            });
        }

        if (commentInput) {
            commentInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                    event.preventDefault();
                    postComment();
                }
            });
        }
    };

    const getFirstName = (user) => {
        const preferredName = user && (user.displayName || user.email) ? String(user.displayName || user.email) : 'User';
        const trimmed = preferredName.trim();
        if (!trimmed) return 'User';
        return trimmed.split(/\s+/)[0];
    };

    const buildFallbackAvatar = (name) => {
        const initial = String(name || 'U').charAt(0).toUpperCase();
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" rx="40" fill="#4f46e5"/><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="36" font-weight="700">${initial}</text></svg>`;
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    };

    const buildLeaderboardIdentity = (user) => {
        const displayName = user && (user.displayName || user.email)
            ? String(user.displayName || user.email).trim()
            : 'User';

        return {
            displayName: displayName || 'User',
            photoURL: user && typeof user.photoURL === 'string' ? user.photoURL : ''
        };
    };

    const normalizeLeaderboardNickname = (rawNickname) => {
        const compact = String(rawNickname || '').replace(/\s+/g, ' ').trim();
        return compact.slice(0, 24);
    };

    const setProfileSetupError = (message = '') => {
        if (!profileSetupError) return;
        profileSetupError.textContent = message;
    };

    const closeProfileSetupModal = () => {
        if (!profileSetupModal) return;
        profileSetupModal.classList.add('hidden');
        setProfileSetupError('');
    };

    const openProfileSetupModal = (suggestedNickname = '') => {
        if (!profileSetupModal || !profileSetupNicknameInput || !profileSetupSaveBtn) return;

        const defaultNickname = normalizeLeaderboardNickname(suggestedNickname || '');
        profileSetupNicknameInput.value = defaultNickname;
        profileSetupModal.classList.remove('hidden');
        profileSetupSaveBtn.disabled = false;
        setProfileSetupError('');

        queueMicrotask(() => {
            profileSetupNicknameInput.focus();
            profileSetupNicknameInput.select();
        });
    };

    const saveLeaderboardNickname = async () => {
        if (isProfileSetupSubmitting || !currentAuthenticatedUser || !currentAuthenticatedUser.uid) return;
        if (pendingProfileSetupUid && currentAuthenticatedUser.uid !== pendingProfileSetupUid) return;

        const nickname = normalizeLeaderboardNickname(profileSetupNicknameInput ? profileSetupNicknameInput.value : '');
        if (nickname.length < 2) {
            setProfileSetupError('Nickname must be at least 2 characters.');
            return;
        }

        isProfileSetupSubmitting = true;
        if (profileSetupSaveBtn) {
            profileSetupSaveBtn.disabled = true;
        }
        setProfileSetupError('');

        try {
            const db = await initializeFirestoreCompat();
            const payload = {
                displayName: nickname,
                photoURL: currentAuthenticatedUser.photoURL || ''
            };

            if (isNewProfileDocument) {
                payload.total_points = 0;
            }

            if (firestoreFieldValue && typeof firestoreFieldValue.serverTimestamp === 'function') {
                payload.updatedAt = firestoreFieldValue.serverTimestamp();
            } else {
                payload.updatedAt = new Date();
            }

            await db.collection('users_data').doc(currentAuthenticatedUser.uid).set(payload, { merge: true });

            pendingProfileSetupUid = '';
            isNewProfileDocument = false;
            closeProfileSetupModal();
            await loadLeaderboard();
        } catch (error) {
            console.warn('Unable to save leaderboard nickname.', error);
            setProfileSetupError('Unable to save nickname right now. Please try again.');
        } finally {
            isProfileSetupSubmitting = false;
            if (profileSetupSaveBtn) {
                profileSetupSaveBtn.disabled = false;
            }
        }
    };

    const ensureUserProfileSetup = async (user) => {
        if (!user || !user.uid || !profileSetupModal || !profileSetupNicknameInput) return;

        try {
            const db = await initializeFirestoreCompat();
            const userDoc = await db.collection('users_data').doc(user.uid).get();
            const data = userDoc.exists ? (userDoc.data() || {}) : {};
            const storedDisplayName = typeof data.displayName === 'string' ? data.displayName.trim() : '';

            if (userDoc.exists && storedDisplayName) {
                pendingProfileSetupUid = '';
                isNewProfileDocument = false;
                closeProfileSetupModal();
                return;
            }

            pendingProfileSetupUid = user.uid;
            isNewProfileDocument = !userDoc.exists;
            openProfileSetupModal(storedDisplayName || getFirstName(user));
        } catch (error) {
            console.warn('Unable to check profile setup state.', error);
        }
    };

    const adminRemoveUser = async (uid) => {
        if (!uid || !isCurrentUserAdmin()) return;

        const shouldDelete = window.confirm('Remove this user from leaderboard?');
        if (!shouldDelete) return;

        try {
            const db = await initializeFirestoreCompat();
            const usersDataRef = db.collection('users_data').doc(uid);
            const userProgressRef = db.collection('user_progress').doc(uid);
            const batch = db.batch();

            batch.delete(usersDataRef);
            batch.set(userProgressRef, {
                completedQuestionIds: [],
                resetByAdmin: true,
                updatedAt: firestoreFieldValue && typeof firestoreFieldValue.serverTimestamp === 'function'
                    ? firestoreFieldValue.serverTimestamp()
                    : new Date()
            }, { merge: true });

            await batch.commit();
            await loadLeaderboard();
        } catch (error) {
            console.warn('Unable to remove user from leaderboard.', error);
        }
    };

    const LEADERBOARD_STYLES = ['is-gold', 'is-silver', 'is-bronze'];

    const renderLeaderboard = (users = []) => {
        if (!leaderboardTopThree || !leaderboardEmptyState) return;

        leaderboardTopThree.textContent = '';

        const topThreeUsers = Array.isArray(users) ? users.slice(0, 3) : [];
        const hasUsers = topThreeUsers.length > 0;
        leaderboardEmptyState.classList.toggle('hidden', hasUsers);

        if (!hasUsers) {
            return;
        }

        topThreeUsers.forEach((user, index) => {
            const row = document.createElement('li');
            row.className = `leaderboard-entry ${LEADERBOARD_STYLES[index] || ''}`.trim();

            const rankBadge = document.createElement('span');
            rankBadge.className = 'leaderboard-rank-badge';
            rankBadge.textContent = `#${index + 1}`;

            const avatar = document.createElement('img');
            avatar.className = 'leaderboard-avatar';
            avatar.src = user.photoURL || buildFallbackAvatar(user.displayName || 'User');
            avatar.alt = `${user.displayName || 'User'} profile photo`;

            const meta = document.createElement('div');
            meta.className = 'leaderboard-meta';

            const name = document.createElement('span');
            name.className = 'leaderboard-name';
            name.textContent = user.displayName || 'User';

            const points = document.createElement('span');
            points.className = 'leaderboard-points';
            points.textContent = `${Number(user.total_points || 0)} points`;

            meta.appendChild(name);
            meta.appendChild(points);

            row.appendChild(rankBadge);
            row.appendChild(avatar);
            row.appendChild(meta);

            if (isCurrentUserAdmin() && user.uid) {
                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.className = 'leaderboard-remove-btn';
                removeBtn.setAttribute('aria-label', `Remove ${user.displayName || 'user'} from leaderboard`);
                removeBtn.textContent = '🗑';
                removeBtn.addEventListener('click', () => {
                    adminRemoveUser(user.uid);
                });
                row.appendChild(removeBtn);
            }

            leaderboardTopThree.appendChild(row);
        });
    };

    const animateAuthSwapIn = (element) => {
        if (!element || typeof element.animate !== 'function') return;
        element.animate(
            [
                { opacity: 0, transform: 'translateY(-4px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ],
            {
                duration: 180,
                easing: 'ease-out'
            }
        );
    };

    const updateAuthUi = (user) => {
        if (!googleSignInBtn || !authUserState || !authUserAvatar || !authUserName || !logoutBtn) return;

        if (user) {
            const firstName = getFirstName(user);
            const avatarSrc = user.photoURL || buildFallbackAvatar(firstName);

            authUserName.textContent = firstName;
            authUserAvatar.src = avatarSrc;
            authUserAvatar.alt = `${firstName} avatar`;

            googleSignInBtn.classList.add('hidden');
            authUserState.classList.remove('hidden');
            animateAuthSwapIn(authUserState);
        } else {
            authUserName.textContent = 'User';
            authUserAvatar.src = '';
            authUserAvatar.alt = 'User avatar';

            authUserState.classList.add('hidden');
            googleSignInBtn.classList.remove('hidden');
            animateAuthSwapIn(googleSignInBtn);
        }
    };

    const initializeFirestoreCompat = async () => {
        if (firestoreDbInstance) return firestoreDbInstance;
        if (firestoreInitPromise) return firestoreInitPromise;

        firestoreInitPromise = Promise.resolve().then(() => {
            if (!window.firebase || typeof window.firebase.firestore !== 'function') {
                throw new Error('Firestore compat SDK is not available.');
            }

            let appInstance;
            try {
                appInstance = window.firebase.app();
            } catch (error) {
                appInstance = window.firebase.initializeApp(firebaseConfig);
            }

            firestoreDbInstance = appInstance.firestore();
            firestoreFieldValue = window.firebase.firestore.FieldValue || null;
            return firestoreDbInstance;
        });

        return firestoreInitPromise;
    };

    const startAnnouncementRealtimeListener = async () => {
        if (announcementUnsubscribe) return;

        try {
            const db = await initializeFirestoreCompat();
            announcementUnsubscribe = db.collection('settings').doc('announcement').onSnapshot(
                (docSnapshot) => {
                    const data = docSnapshot.exists ? (docSnapshot.data() || {}) : {};
                    latestAnnouncementText = String(data.text || '').trim();
                    renderGlobalAnnouncement(latestAnnouncementText);

                    if (isCurrentUserAdmin() && adminAnnouncementInput && document.activeElement !== adminAnnouncementInput) {
                        adminAnnouncementInput.value = latestAnnouncementText;
                    }
                },
                (error) => {
                    console.warn('Unable to subscribe announcement.', error);
                }
            );
        } catch (error) {
            console.warn('Unable to initialize announcement listener.', error);
        }
    };

    const setAnnouncementButtonsBusy = (isBusy) => {
        if (adminAnnouncementSaveBtn) {
            adminAnnouncementSaveBtn.disabled = isBusy;
        }
        if (adminAnnouncementDeleteBtn) {
            adminAnnouncementDeleteBtn.disabled = isBusy;
        }
    };

    const saveGlobalAnnouncement = async (forcedText = null) => {
        if (!isCurrentUserAdmin() || !adminAnnouncementInput || !adminAnnouncementSaveBtn) return;

        const isDeleteOperation = typeof forcedText === 'string';
        const textValue = isDeleteOperation
            ? forcedText
            : String(adminAnnouncementInput.value || '').trim();

        setAnnouncementButtonsBusy(true);
        setAdminAnnouncementStatus(isDeleteOperation ? 'Deleting...' : 'Updating...');

        try {
            const db = await initializeFirestoreCompat();
            const payload = {
                text: textValue,
                updatedBy: currentAuthenticatedUser ? currentAuthenticatedUser.uid : '',
                updatedAt: firestoreFieldValue && typeof firestoreFieldValue.serverTimestamp === 'function'
                    ? firestoreFieldValue.serverTimestamp()
                    : new Date()
            };

            await db.collection('settings').doc('announcement').set(payload, { merge: true });
            if (adminAnnouncementInput && isDeleteOperation) {
                adminAnnouncementInput.value = '';
            }
            setAdminAnnouncementStatus(isDeleteOperation ? 'Announcement deleted.' : 'Announcement updated.');
        } catch (error) {
            console.warn('Unable to update announcement.', error);
            setAdminAnnouncementStatus(isDeleteOperation ? 'Delete failed. Try again.' : 'Update failed. Try again.', true);
        } finally {
            setAnnouncementButtonsBusy(false);
        }
    };

    const deleteGlobalAnnouncement = async () => {
        await saveGlobalAnnouncement('');
    };

    const renderPrivateChatMessages = (messages = []) => {
        if (!privateChatMessages) return;

        privateChatMessages.innerHTML = '';

        if (!messages.length) {
            const emptyEl = document.createElement('div');
            emptyEl.className = 'private-chat-empty';
            emptyEl.textContent = isCurrentUserAdmin()
                ? (activePrivateChatUserId ? 'No messages yet in this chat.' : 'Select a user from inbox to view chat.')
                : 'No messages yet. Start your conversation with Admin.';
            privateChatMessages.appendChild(emptyEl);
            return;
        }

        const mySenderId = isCurrentUserAdmin()
            ? ADMIN_CHANNEL_ID
            : (currentAuthenticatedUser ? currentAuthenticatedUser.uid : '');

        messages.forEach((messageEntry) => {
            const bubble = document.createElement('div');
            const isMine = messageEntry.senderId === mySenderId;
            bubble.className = `private-chat-bubble${isMine ? ' mine' : ''}`;

            const textEl = document.createElement('div');
            textEl.textContent = messageEntry.text || '';

            const metaEl = document.createElement('div');
            metaEl.className = 'private-chat-meta';
            metaEl.textContent = formatPrivateMessageTime(messageEntry.timestamp);

            bubble.appendChild(textEl);
            bubble.appendChild(metaEl);
            privateChatMessages.appendChild(bubble);
        });

        privateChatMessages.scrollTop = privateChatMessages.scrollHeight;
    };

    const flushPrivateChatStreams = () => {
        const orderedMessages = [...privateStreamA].sort((first, second) => {
            return getPrivateMessageTimestampMs(first.timestamp) - getPrivateMessageTimestampMs(second.timestamp);
        });

        renderPrivateChatMessages(orderedMessages);
    };

    const mapPrivateMessageDocs = (snapshot) => {
        return snapshot.docs.map((doc) => {
            const data = doc.data() || {};
            return {
                id: doc.id,
                senderId: String(data.senderId || ''),
                receiverId: String(data.receiverId || ''),
                text: String(data.text || '').trim(),
                timestamp: data.timestamp || null,
                senderName: String(data.senderName || ''),
                senderEmail: String(data.senderEmail || ''),
                senderPhoto: String(data.senderPhoto || '')
            };
        }).filter((item) => item.text);
    };

    const startPrivateConversationListener = async (targetUserId = '') => {
        if (!currentAuthenticatedUser || !currentAuthenticatedUser.uid) return;

        clearPrivateConversationListeners();
        setPrivateChatStatus('');

        const isAdmin = isCurrentUserAdmin();
        const chatUserId = isAdmin ? String(targetUserId || '').trim() : currentAuthenticatedUser.uid;

        if (!chatUserId) {
            renderPrivateChatMessages([]);
            return;
        }

        activePrivateChatUserId = chatUserId;

        try {
            const db = await initializeFirestoreCompat();

            const messagesQuery = db
                .collection('chats')
                .doc(chatUserId)
                .collection('messages')
                .orderBy('timestamp', 'asc');

            const unsubscribe = messagesQuery.onSnapshot((snapshot) => {
                privateStreamA = mapPrivateMessageDocs(snapshot).filter((entry) => {
                    const userToAdmin = entry.senderId === chatUserId && entry.receiverId === ADMIN_CHANNEL_ID;
                    const adminToUser = entry.senderId === ADMIN_CHANNEL_ID && entry.receiverId === chatUserId;
                    return userToAdmin || adminToUser;
                });
                flushPrivateChatStreams();
            }, (error) => {
                console.warn('Unable to load private chat stream.', error);
                setPrivateChatStatus('Unable to load chat. Please refresh.', true);
            });

            privateChatUnsubscribes = [unsubscribe];
        } catch (error) {
            console.warn('Unable to start private chat listener.', error);
            setPrivateChatStatus('Unable to load chat right now.', true);
        }
    };

    const renderAdminInboxUsers = (users = []) => {
        if (!adminInboxList) return;
        adminInboxList.innerHTML = '';

        if (!users.length) {
            const emptyNode = document.createElement('p');
            emptyNode.className = 'private-chat-empty';
            emptyNode.textContent = 'Inbox is empty.';
            adminInboxList.appendChild(emptyNode);
            return;
        }

        users.forEach((entry) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `private-chat-user-btn${entry.uid === activePrivateChatUserId ? ' active' : ''}`;

            const avatar = document.createElement('img');
            avatar.src = entry.photoURL || createCommentAvatarFallback(entry.name || 'S');
            avatar.alt = `${entry.name || 'Student'} avatar`;
            avatar.style.width = '28px';
            avatar.style.height = '28px';
            avatar.style.borderRadius = '999px';
            avatar.style.objectFit = 'cover';
            avatar.style.border = '1px solid rgba(148, 163, 184, 0.42)';
            avatar.style.flexShrink = '0';

            const metaWrap = document.createElement('div');
            metaWrap.style.minWidth = '0';
            metaWrap.style.flex = '1';

            const name = document.createElement('span');
            name.className = 'private-chat-user-name';
            name.textContent = entry.name || 'Student';

            const snippet = document.createElement('span');
            snippet.className = 'private-chat-user-snippet';
            snippet.textContent = entry.preview || 'Tap to open chat';

            metaWrap.appendChild(name);
            metaWrap.appendChild(snippet);
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.gap = '0.5rem';
            button.appendChild(avatar);
            button.appendChild(metaWrap);
            if (entry.hasUnreadForAdmin) {
                const rowDot = document.createElement('span');
                rowDot.className = 'notification-dot notification-dot-inline';
                rowDot.setAttribute('aria-hidden', 'true');
                button.appendChild(rowDot);
            }

            button.addEventListener('click', async () => {
                activePrivateChatUserId = entry.uid;
                if (privateChatTitle) {
                    privateChatTitle.textContent = `Inbox · ${entry.name || 'Student'}`;
                }
                await clearUnreadForAdmin(entry.uid);
                startPrivateConversationListener(entry.uid);
                renderAdminInboxUsers(users);
            });

            adminInboxList.appendChild(button);
        });
    };

    const startAdminInboxListener = async () => {
        if (!currentAuthenticatedUser || !currentAuthenticatedUser.uid || !isCurrentUserAdmin()) return;

        if (adminInboxUnsubscribe) {
            adminInboxUnsubscribe();
            adminInboxUnsubscribe = null;
        }

        try {
            const db = await initializeFirestoreCompat();
            adminInboxUnsubscribe = db
                .collection('inbox')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    const latestByUser = new Map();
                    let hasAnyUnreadForAdmin = false;

                    snapshot.docs.forEach((doc) => {
                        const data = doc.data() || {};
                        const chatUserId = String(doc.id || '').trim();
                        if (!chatUserId || latestByUser.has(chatUserId)) return;

                        const hasUnreadForAdmin = Boolean(data.hasUnreadForAdmin);
                        if (hasUnreadForAdmin) {
                            hasAnyUnreadForAdmin = true;
                        }

                        latestByUser.set(chatUserId, {
                            uid: chatUserId,
                            name: String(data.displayName || data.email || 'Student'),
                            photoURL: String(data.photoURL || ''),
                            preview: String(data.lastMessage || '').trim().slice(0, 52),
                            hasUnreadForAdmin
                        });
                    });

                    setSidebarButtonUnreadDot(adminInboxBtn, hasAnyUnreadForAdmin);
                    renderAdminInboxUsers([...latestByUser.values()]);
                }, (error) => {
                    console.warn('Unable to load admin inbox.', error);
                    setSidebarButtonUnreadDot(adminInboxBtn, false);
                });
        } catch (error) {
            console.warn('Unable to initialize admin inbox listener.', error);
            setSidebarButtonUnreadDot(adminInboxBtn, false);
        }
    };

    const sendPrivateMessage = async () => {
        if (isPrivateMessageSending || !currentAuthenticatedUser || !currentAuthenticatedUser.uid || !privateChatInput || !privateChatSendBtn) return;

        const messageText = String(privateChatInput.value || '').trim();
        if (!messageText) return;

        const adminMode = isCurrentUserAdmin();
        const chatUserId = adminMode ? String(activePrivateChatUserId || '').trim() : currentAuthenticatedUser.uid;
        const receiverId = adminMode ? chatUserId : ADMIN_CHANNEL_ID;

        if (!chatUserId || !receiverId) {
            setPrivateChatStatus('Select a user from inbox first.', true);
            return;
        }

        isPrivateMessageSending = true;
        privateChatSendBtn.disabled = true;
        setPrivateChatStatus('');

        try {
            const db = await initializeFirestoreCompat();
            await db.collection('chats').doc(chatUserId).collection('messages').add({
                senderId: adminMode ? ADMIN_CHANNEL_ID : currentAuthenticatedUser.uid,
                receiverId,
                text: messageText,
                senderName: adminMode
                    ? ADMIN_DISPLAY_NAME
                    : String(currentAuthenticatedUser.displayName || getFirstName(currentAuthenticatedUser) || 'Student'),
                senderEmail: String(currentAuthenticatedUser.email || ''),
                senderPhoto: adminMode ? '' : String(currentAuthenticatedUser.photoURL || ''),
                timestamp: firestoreFieldValue && typeof firestoreFieldValue.serverTimestamp === 'function'
                    ? firestoreFieldValue.serverTimestamp()
                    : new Date()
            });

            const inboxPayload = {
                lastMessage: messageText,
                timestamp: firestoreFieldValue && typeof firestoreFieldValue.serverTimestamp === 'function'
                    ? firestoreFieldValue.serverTimestamp()
                    : new Date()
            };

            if (!adminMode) {
                inboxPayload.displayName = String(currentAuthenticatedUser.displayName || getFirstName(currentAuthenticatedUser) || 'Student');
                inboxPayload.email = String(currentAuthenticatedUser.email || '');
                inboxPayload.photoURL = String(currentAuthenticatedUser.photoURL || '');
                inboxPayload.hasUnreadForAdmin = true;
                inboxPayload.hasUnreadForUser = false;
            } else {
                inboxPayload.hasUnreadForUser = true;
                inboxPayload.hasUnreadForAdmin = false;
            }

            await db.collection('inbox').doc(chatUserId).set(inboxPayload, { merge: true });

            privateChatInput.value = '';
        } catch (error) {
            console.warn('Unable to send private message.', error);
            setPrivateChatStatus('Message failed to send.', true);
        } finally {
            isPrivateMessageSending = false;
            privateChatSendBtn.disabled = false;
        }
    };

    const openPrivateChatModal = async (openInbox = false) => {
        if (!privateChatModal) return;
        if (!currentAuthenticatedUser || !currentAuthenticatedUser.uid) {
            await requestGoogleSignIn();
            return;
        }

        setPrivateChatStatus('');
        const adminMode = isCurrentUserAdmin();
        privateChatModal.classList.remove('hidden');

        if (adminInboxPanel) {
            adminInboxPanel.classList.toggle('hidden', !adminMode);
        }

        if (privateChatTitle) {
            privateChatTitle.textContent = adminMode ? 'Inbox 📩' : 'Message Admin';
        }

        if (adminMode) {
            await startAdminInboxListener();
            if (openInbox && activePrivateChatUserId) {
                await clearUnreadForAdmin(activePrivateChatUserId);
                await startPrivateConversationListener(activePrivateChatUserId);
            } else {
                renderPrivateChatMessages([]);
            }
        } else {
            activePrivateChatUserId = currentAuthenticatedUser.uid;
            await clearUnreadForUser(currentAuthenticatedUser.uid);
            await startPrivateConversationListener(currentAuthenticatedUser.uid);
        }
    };

    const syncAllProgressForUser = async (uid) => {
        if (!uid) return;

        try {
            const db = await initializeFirestoreCompat();
            const payload = {
                completedQuestionIds: Array.from(completedQuestionIds),
                resetByAdmin: false
            };

            if (firestoreFieldValue && typeof firestoreFieldValue.serverTimestamp === 'function') {
                payload.updatedAt = firestoreFieldValue.serverTimestamp();
            } else {
                payload.updatedAt = new Date();
            }

            await db.collection('user_progress').doc(uid).set(payload, { merge: true });
        } catch (error) {
            console.warn('Unable to sync full progress set to Firestore.', error);
        }
    };

    const loadProgressFromFirestore = async (uid) => {
        if (!uid) return;

        try {
            const db = await initializeFirestoreCompat();
            const docSnapshot = await db.collection('user_progress').doc(uid).get();
            const data = docSnapshot.exists ? docSnapshot.data() : {};
            const remoteIds = Array.isArray(data.completedQuestionIds) ? data.completedQuestionIds : [];
            const resetByAdmin = Boolean(data.resetByAdmin);

            const mergedSet = resetByAdmin
                ? new Set(remoteIds)
                : new Set([...completedQuestionIds, ...remoteIds]);
            completedQuestionIds.clear();
            mergedSet.forEach((id) => completedQuestionIds.add(id));
            saveStorageSet(STORAGE_KEYS.completed, completedQuestionIds);

            queueMicrotask(() => {
                applyStoredCardStates();
            });

            const needsRemoteMerge = !resetByAdmin && mergedSet.size !== remoteIds.length;
            if (needsRemoteMerge) {
                await syncAllProgressForUser(uid);
            }
        } catch (error) {
            console.warn('Unable to load progress from Firestore.', error);
        }
    };

    const loadLeaderboard = async () => {
        try {
            const db = await initializeFirestoreCompat();
            const leaderboardSnapshot = await db
                .collection('users_data')
                .orderBy('total_points', 'desc')
                .limit(10)
                .get();

            const topUsers = leaderboardSnapshot.docs.map((doc, index) => {
                const data = doc.data() || {};
                return {
                    rank: index + 1,
                    uid: doc.id,
                    displayName: data.displayName || 'User',
                    photoURL: data.photoURL || '',
                    total_points: Number(data.total_points || 0)
                };
            });

            renderLeaderboard(topUsers);
            return topUsers;
        } catch (error) {
            console.warn('Unable to load leaderboard data.', error);
            renderLeaderboard([]);
            return [];
        }
    };

    const syncSingleProgressChange = async (questionId, isDone) => {
        if (!currentAuthenticatedUser || !currentAuthenticatedUser.uid || !questionId) return;

        try {
            const db = await initializeFirestoreCompat();
            const payload = {};

            if (firestoreFieldValue) {
                payload.completedQuestionIds = isDone
                    ? firestoreFieldValue.arrayUnion(questionId)
                    : firestoreFieldValue.arrayRemove(questionId);
                payload.updatedAt = firestoreFieldValue.serverTimestamp();
            } else {
                payload.completedQuestionIds = Array.from(completedQuestionIds);
                payload.updatedAt = new Date();
            }

            payload.resetByAdmin = false;

            await db.collection('user_progress').doc(currentAuthenticatedUser.uid).set(payload, { merge: true });

            const usersDataRef = db.collection('users_data').doc(currentAuthenticatedUser.uid);

            await db.runTransaction(async (transaction) => {
                const usersDataSnapshot = await transaction.get(usersDataRef);
                const usersData = usersDataSnapshot.exists ? (usersDataSnapshot.data() || {}) : {};
                const currentPoints = Math.max(0, Number(usersData.total_points || 0));
                const nextPoints = isDone
                    ? currentPoints + 10
                    : Math.max(0, currentPoints - 10);

                const leaderboardPayload = {
                    photoURL: currentAuthenticatedUser.photoURL || '',
                    total_points: nextPoints,
                    updatedAt: firestoreFieldValue && typeof firestoreFieldValue.serverTimestamp === 'function'
                        ? firestoreFieldValue.serverTimestamp()
                        : new Date()
                };

                transaction.set(usersDataRef, leaderboardPayload, { merge: true });
            });

            await loadLeaderboard();
        } catch (error) {
            console.warn('Unable to sync progress change to Firestore.', error);
        }
    };

    const initializeFirebaseAuth = async () => {
        if (firebaseAuthInstance) return firebaseAuthInstance;
        if (firebaseAuthInitPromise) return firebaseAuthInitPromise;

        firebaseAuthInitPromise = (async () => {
            const [appModule, authModule] = await Promise.all([
                import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js'),
                import('https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js')
            ]);

            const app = appModule.initializeApp(firebaseConfig);
            const auth = authModule.getAuth(app);
            const provider = new authModule.GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });

            authModule.onAuthStateChanged(auth, (user) => {
                currentAuthenticatedUser = user || null;
                updateAuthUi(user);
                updateLoginIncentive(Boolean(currentAuthenticatedUser));
                setCommentsComposerVisibility(Boolean(currentAuthenticatedUser));
                renderComments(latestCommentsCache);
                setAuthStatus('');
                toggleAdminUtilityPanels(isCurrentUserAdmin());

                if (isCurrentUserAdmin()) {
                    if (adminAnnouncementInput && document.activeElement !== adminAnnouncementInput) {
                        adminAnnouncementInput.value = latestAnnouncementText;
                    }
                    startAdminInboxListener();
                    stopUserInboxUnreadListener();
                } else if (adminInboxUnsubscribe) {
                    adminInboxUnsubscribe();
                    adminInboxUnsubscribe = null;
                    setSidebarButtonUnreadDot(adminInboxBtn, false);
                }

                if (isCurrentUserAdmin()) {
                    ensureAdminNotificationPermission();
                }

                if (currentAuthenticatedUser && currentAuthenticatedUser.uid) {
                    queueMicrotask(() => {
                        loadProgressFromFirestore(currentAuthenticatedUser.uid);
                        startBookmarksRealtimeListener(currentAuthenticatedUser.uid);
                        ensureUserProfileSetup(currentAuthenticatedUser);

                        if (!isCurrentUserAdmin()) {
                            startUserInboxUnreadListener(currentAuthenticatedUser.uid);
                        }
                    });
                } else {
                    queueMicrotask(() => {
                        applyStoredCardStates();
                        savedQuestionIds.clear();
                        applyBookmarkedCardStates();
                        renderBookmarkedPane();
                    });
                    stopBookmarksRealtimeListener();
                    pendingProfileSetupUid = '';
                    isNewProfileDocument = false;
                    closeProfileSetupModal();
                    closePrivateChatModal();
                    stopUserInboxUnreadListener();
                    setSidebarButtonUnreadDot(adminInboxBtn, false);
                }

                queueMicrotask(() => {
                    loadLeaderboard();
                });
            });

            firebaseAuthInstance = {
                auth,
                provider,
                signInWithPopup: authModule.signInWithPopup,
                signOut: authModule.signOut
            };

            return firebaseAuthInstance;
        })();

        return firebaseAuthInitPromise;
    };

    const requestGoogleSignIn = async () => {
        if (isSignInInProgress) return;

        isSignInInProgress = true;
        if (googleSignInBtn) {
            googleSignInBtn.disabled = true;
        }
        if (commentsLoginRequired) {
            commentsLoginRequired.classList.add('is-busy');
        }
        setAuthStatus('');

        try {
            const { auth, provider, signInWithPopup } = await initializeFirebaseAuth();
            await signInWithPopup(auth, provider);
        } catch (error) {
            const errorCode = error && typeof error === 'object' ? error.code : '';
            if (errorCode === 'auth/popup-closed-by-user' || errorCode === 'auth/cancelled-popup-request') {
                setAuthStatus('Sign-in cancelled.');
            } else {
                setAuthStatus('Unable to sign in. Please try again.', true);
            }
        } finally {
            if (googleSignInBtn) {
                googleSignInBtn.disabled = false;
            }
            if (commentsLoginRequired) {
                commentsLoginRequired.classList.remove('is-busy');
            }
            isSignInInProgress = false;
        }
    };

    const initOptInGoogleAuth = () => {
        if (!googleSignInBtn || !logoutBtn || !authUserState) return;

        updateAuthUi(null);
        updateLoginIncentive(false);
        setAuthStatus('');
        toggleAdminUtilityPanels(false);
        renderGlobalAnnouncement(latestAnnouncementText);

        initializeFirestoreCompat().catch((error) => {
            console.warn('Firestore initialization failed.', error);
        });

        loadLeaderboard();
        startAnnouncementRealtimeListener();

        initializeFirebaseAuth().catch(() => {
            setAuthStatus('Sign-in is unavailable right now. Please try again later.', true);
        });

        googleSignInBtn.addEventListener('click', () => {
            requestGoogleSignIn();
        });

        if (commentsLoginRequired) {
            commentsLoginRequired.addEventListener('click', () => {
                requestGoogleSignIn();
            });

            commentsLoginRequired.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    requestGoogleSignIn();
                }
            });
        }

        logoutBtn.addEventListener('click', async () => {
            setAuthStatus('');

            try {
                const { auth, signOut } = await initializeFirebaseAuth();
                await signOut(auth);
            } catch (error) {
                setAuthStatus('Unable to log out right now. Please try again.', true);
            }
        });

        if (adminAnnouncementSaveBtn) {
            adminAnnouncementSaveBtn.addEventListener('click', () => {
                saveGlobalAnnouncement();
            });
        }

        if (adminAnnouncementDeleteBtn) {
            adminAnnouncementDeleteBtn.addEventListener('click', () => {
                deleteGlobalAnnouncement();
            });
        }

        if (messageAdminBtn) {
            messageAdminBtn.addEventListener('click', () => {
                openPrivateChatModal(false);
            });
        }

        if (adminInboxBtn) {
            adminInboxBtn.addEventListener('click', () => {
                openPrivateChatModal(true);
            });
        }

        if (privateChatCloseBtn) {
            privateChatCloseBtn.addEventListener('click', () => {
                closePrivateChatModal();
            });
        }

        if (privateChatBackdrop) {
            privateChatBackdrop.addEventListener('click', () => {
                closePrivateChatModal();
            });
        }

        if (privateChatSendBtn) {
            privateChatSendBtn.addEventListener('click', () => {
                sendPrivateMessage();
            });
        }

        if (privateChatInput) {
            privateChatInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    sendPrivateMessage();
                }
            });
        }

        if (profileSetupSaveBtn) {
            profileSetupSaveBtn.addEventListener('click', () => {
                saveLeaderboardNickname();
            });
        }

        if (profileSetupNicknameInput) {
            profileSetupNicknameInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    saveLeaderboardNickname();
                }
            });
        }
    };

    const setFlashcardFabVisibility = (shouldShow) => {
        if (!flashcardFabBtn) return;
        flashcardFabBtn.classList.toggle('is-visible', Boolean(shouldShow));
    };

    const initExamCountdown = () => {
        if (!examCountdown || !examCountdownGrid || !examCountdownMessage || !examDays || !examHours || !examMinutes || !examSeconds) {
            return;
        }

        const targetTimestamp = new Date('May 20, 2026 00:00:00').getTime();
        if (!Number.isFinite(targetTimestamp)) {
            return;
        }

        const dayMs = 24 * 60 * 60 * 1000;
        const hourMs = 60 * 60 * 1000;
        const minuteMs = 60 * 1000;

        let countdownIntervalId = null;
        let lastDays = null;
        let lastHours = null;
        let lastMinutes = null;
        let lastSeconds = null;

        const updateSegment = (element, value, shouldPad = true) => {
            const nextText = shouldPad ? String(value).padStart(2, '0') : String(value);
            if (element.textContent !== nextText) {
                element.textContent = nextText;
            }
        };

        const completeCountdown = () => {
            updateSegment(examDays, 0, false);
            updateSegment(examHours, 0);
            updateSegment(examMinutes, 0);
            updateSegment(examSeconds, 0);

            examCountdownGrid.classList.add('hidden');
            examCountdownMessage.textContent = 'Best of Luck for your Exams! 🚀';
            examCountdownMessage.classList.remove('hidden');

            if (countdownIntervalId) {
                window.clearInterval(countdownIntervalId);
                countdownIntervalId = null;
            }
        };

        const tickCountdown = () => {
            const now = Date.now();
            const distance = targetTimestamp - now;

            if (distance <= 0) {
                completeCountdown();
                return;
            }

            examCountdownGrid.classList.remove('hidden');
            examCountdownMessage.classList.add('hidden');

            const daysLeft = Math.floor(distance / dayMs);
            const hoursLeft = Math.floor((distance % dayMs) / hourMs);
            const minutesLeft = Math.floor((distance % hourMs) / minuteMs);
            const secondsLeft = Math.floor((distance % minuteMs) / 1000);

            if (daysLeft !== lastDays) {
                updateSegment(examDays, daysLeft, false);
                lastDays = daysLeft;
            }
            if (hoursLeft !== lastHours) {
                updateSegment(examHours, hoursLeft);
                lastHours = hoursLeft;
            }
            if (minutesLeft !== lastMinutes) {
                updateSegment(examMinutes, minutesLeft);
                lastMinutes = minutesLeft;
            }
            if (secondsLeft !== lastSeconds) {
                updateSegment(examSeconds, secondsLeft);
                lastSeconds = secondsLeft;
            }
        };

        tickCountdown();
        countdownIntervalId = window.setInterval(tickCountdown, 1000);
    };

    const applyFlashcardMode = (enabled) => {
        isFlashcardMode = Boolean(enabled);
        body.classList.toggle('flashcard-mode', isFlashcardMode);

        if (flashcardFabBtn) {
            flashcardFabBtn.classList.toggle('active', isFlashcardMode);
            flashcardFabBtn.setAttribute('aria-pressed', String(isFlashcardMode));
            flashcardFabBtn.setAttribute('title', isFlashcardMode ? 'Flashcard Mode: On' : 'Flashcard Mode: Off');
        }

        if (isFlashcardMode) {
            document.querySelectorAll('.question-card').forEach(card => {
                card.classList.remove('revealed');
            });
        }
    };

    const initFlashcardMode = () => {
        let savedMode = '0';
        try {
            savedMode = localStorage.getItem(flashcardStorageKey) || '0';
        } catch (error) {
            /* no-op */
        }

        applyFlashcardMode(savedMode === '1');

        if (flashcardFabBtn) {
            flashcardFabBtn.addEventListener('click', () => {
                const enabled = !isFlashcardMode;
                applyFlashcardMode(enabled);
                try {
                    localStorage.setItem(flashcardStorageKey, enabled ? '1' : '0');
                } catch (error) {
                    /* no-op */
                }
            });
        }
    };

    applyTheme(getInitialTheme());
    initExamCountdown();
    initFlashcardMode();
    initOptInGoogleAuth();
    initCommentsSection();
    setFlashcardFabVisibility(false);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const nextTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(nextTheme);
            persistTheme(nextTheme);
        });
    }

    // 3. Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    let runSearchFilter = () => {};
    let runFlashcardSync = () => {};

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs and panes
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => {
                p.classList.remove('active');
                p.style.display = 'none';
            });

            // Add active class to clicked tab
            btn.classList.add('active');

            // Show corresponding content
            const targetId = btn.getAttribute('data-target');
            if (targetId) {
                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.add('active');
                    targetPane.style.display = 'block';
                    // Reset animation sequence to ensure it replays
                    targetPane.style.animation = 'none';
                    targetPane.offsetHeight;
                    targetPane.style.animation = '';
                }
            }

            runSearchFilter();
            runFlashcardSync();
        });
    });

    const initSearch = () => {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) {
            return () => {};
        }

        const applySearch = () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const activePane = document.querySelector('.tab-pane.active');
            const questionCards = document.querySelectorAll('.question-card');

            const getDirectWrapper = (element) => {
                const parent = element.parentElement;
                if (!parent) return null;
                if (parent.classList.contains('tab-pane') || parent.classList.contains('questions-feed')) {
                    return null;
                }
                return parent;
            };

            const showCardAndWrapper = (card) => {
                card.classList.remove('hidden', 'hidden-card');
                card.style.display = 'block';

                const wrapper = getDirectWrapper(card);
                if (wrapper) {
                    wrapper.style.display = 'block';
                }
            };

            const hideCardAndWrapper = (card) => {
                card.classList.add('hidden');
                card.classList.remove('hidden-card');
                card.style.display = 'none';

                const wrapper = getDirectWrapper(card);
                if (wrapper) {
                    wrapper.style.display = 'none';
                }
            };

            questionCards.forEach(card => {
                if (!activePane || !activePane.contains(card)) {
                    showCardAndWrapper(card);
                    return;
                }

                if (!searchTerm) {
                    showCardAndWrapper(card);
                    return;
                }

                const textContent = card.innerText.toLowerCase();
                const shouldHide = !textContent.includes(searchTerm);
                if (shouldHide) {
                    hideCardAndWrapper(card);
                    return;
                }

                showCardAndWrapper(card);
            });
        };

        searchInput.addEventListener('keyup', applySearch);
        searchInput.addEventListener('search', applySearch);

        return applySearch;
    };

    const initFlashcardInteractions = () => {
        document.addEventListener('click', (event) => {
            if (!isFlashcardMode) return;

            const questionCard = event.target.closest('.question-card');
            if (!questionCard) return;

            if (event.target.closest('.done-toggle, .done-checkbox, button, input, label, a')) {
                return;
            }

            questionCard.classList.toggle('revealed');
        });

        return () => {
            if (!isFlashcardMode) return;
            document.querySelectorAll('.question-card').forEach(card => card.classList.remove('revealed'));
        };
    };

    const handleProgress = () => {
        document.addEventListener('change', (event) => {
            const doneCheckbox = event.target.closest('.done-checkbox');
            if (!doneCheckbox) return;

            const questionCard = doneCheckbox.closest('.question-card');
            if (!questionCard) return;

            const questionId = questionCard.getAttribute('data-question-id');
            if (!questionId) return;

            const isDone = doneCheckbox.checked;
            if (isDone) {
                completedQuestionIds.add(questionId);
            } else {
                completedQuestionIds.delete(questionId);
            }

            updateProgressUI(questionCard, isDone);
            saveStorageSet(STORAGE_KEYS.completed, completedQuestionIds);
            syncSingleProgressChange(questionId, isDone);
        });
    };

    const handleBookmarkInteractions = () => {
        document.addEventListener('click', (event) => {
            const bookmarkBtn = event.target.closest('.bookmark-btn');
            if (!bookmarkBtn) return;

            event.preventDefault();
            event.stopPropagation();

            const questionCard = bookmarkBtn.closest('.question-card');
            if (!questionCard) return;

            const questionId = questionCard.getAttribute('data-question-id');
            if (!questionId) return;

            toggleBookmark(questionId);
        });
    };

    runSearchFilter = initSearch();
    runFlashcardSync = initFlashcardInteractions();
    handleProgress();
    handleBookmarkInteractions();

    // 5. Subject Dashboard → Chapters → Content Flow

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
    const chapterHeaderBanner = document.querySelector('.chapter-header-banner');
    const questionsFeed = document.getElementById('questions-feed');
    const contentUnavailable = document.getElementById('content-unavailable');
    const contentUnavailableText = contentUnavailable ? contentUnavailable.querySelector('p') : null;
    const welcomeMainHeading = document.getElementById('welcomeMainHeading');
    const welcomeIntroText = document.getElementById('welcomeIntroText');
    const welcomeCtaText = document.getElementById('welcomeCtaText');
    const dailyWisdomQuote = document.getElementById('dailyWisdomQuote');
    const dailyWisdomSource = document.getElementById('dailyWisdomSource');
    const tabNavigation = document.querySelector('.tab-navigation');
    const bannerTitle = document.querySelector('.chapter-header-banner h2');
    const bannerBadge = document.querySelector('.chapter-header-banner .badge');
    const bannerSubtitle = document.querySelector('.chapter-header-banner p');
    const contentAreaView = document.querySelector('.content-area');
    const navStateKey = '__notescraftNav';
    const knownRouteSlugs = new Set(['computer-science', 'english', 'physics', 'islamiyat', 'model-papers']);
    let activeSubject = null;
    let activeChapter = null;
    let activeIslamiyatBaabId = '';

    const WELCOME_CONTENT = {
        heading: 'NotesCraft: Fast Revision Companion',
        intro: 'Interactive chapter-wise short notes for ICS & FSc. Master your board exams with precision notes designed for efficiency.',
        cta: 'Select a subject from the sidebar to start your revision.'
    };

    const DAILY_WISDOM_URDU = [
        { text: 'اے میرے رب! میرے علم میں اضافہ فرما۔', reference: 'القرآن — سورۃ طٰہٰ 20:114' },
        { text: 'کیا جاننے والے اور نہ جاننے والے برابر ہو سکتے ہیں؟', reference: 'القرآن — سورۃ الزمر 39:9' },
        { text: 'اگر تم نہیں جانتے تو اہلِ ذکر سے پوچھ لو۔', reference: 'القرآن — سورۃ النحل 16:43' },
        { text: 'اور کہہ دو: عمل کرو، اللہ تمہارے عمل کو دیکھے گا۔', reference: 'القرآن — سورۃ التوبہ 9:105' },
        { text: 'اللہ سے ڈرو، اور اللہ تمہیں علم عطا فرماتا ہے۔', reference: 'القرآن — سورۃ البقرہ 2:282' },
        { text: 'نیکی اور تقویٰ میں ایک دوسرے کی مدد کرو۔', reference: 'القرآن — سورۃ المائدہ 5:2' },
        { text: 'اللہ صبر کرنے والوں کے ساتھ ہے۔', reference: 'القرآن — سورۃ البقرہ 2:153' },
        { text: 'بے شک مشکل کے ساتھ آسانی ہے۔', reference: 'القرآن — سورۃ الشرح 94:6' },
        { text: 'اللہ کسی جان پر اس کی طاقت سے بڑھ کر بوجھ نہیں ڈالتا۔', reference: 'القرآن — سورۃ البقرہ 2:286' },
        { text: 'جو اللہ پر بھروسا کرے تو وہ اس کے لیے کافی ہے۔', reference: 'القرآن — سورۃ الطلاق 65:3' },
        { text: 'اور لوگوں سے بھلی بات کہو۔', reference: 'القرآن — سورۃ البقرہ 2:83' },
        { text: 'پس تم میرا ذکر کرو، میں تمہیں یاد رکھوں گا۔', reference: 'القرآن — سورۃ البقرہ 2:152' },
        { text: 'بے شک اللہ انصاف اور احسان کا حکم دیتا ہے۔', reference: 'القرآن — سورۃ النحل 16:90' },
        { text: 'بے شک اللہ احسان کرنے والوں سے محبت کرتا ہے۔', reference: 'القرآن — سورۃ البقرہ 2:195' },
        { text: 'اور کہو: اے میرے رب! مجھ پر رحم فرما، اور تو سب رحم کرنے والوں سے بہتر ہے۔', reference: 'القرآن — سورۃ المؤمنون 23:118' },
        { text: 'اعمال کا دارومدار نیتوں پر ہے۔', reference: 'صحیح بخاری و صحیح مسلم' },
        { text: 'تم میں بہترین وہ ہے جو قرآن سیکھے اور سکھائے۔', reference: 'صحیح بخاری' },
        { text: 'مسلمان وہ ہے جس کی زبان اور ہاتھ سے مسلمان محفوظ رہیں۔', reference: 'صحیح بخاری و صحیح مسلم' },
        { text: 'جو اللہ اور آخرت پر ایمان رکھتا ہے وہ بھلی بات کہے یا خاموش رہے۔', reference: 'صحیح بخاری و صحیح مسلم' },
        { text: 'دین آسان ہے۔', reference: 'صحیح بخاری' },
        { text: 'طاقتور مومن اللہ کے نزدیک کمزور مومن سے بہتر اور زیادہ محبوب ہے۔', reference: 'صحیح مسلم' },
        { text: 'پاکیزگی ایمان کا نصف ہے۔', reference: 'صحیح مسلم' },
        { text: 'اللہ تمہاری صورتوں اور مالوں کو نہیں دیکھتا، بلکہ تمہارے دلوں اور اعمال کو دیکھتا ہے۔', reference: 'صحیح مسلم' },
        { text: 'جو شخص علم کی تلاش میں راستہ اختیار کرتا ہے، اللہ اس کے لیے جنت کا راستہ آسان کر دیتا ہے۔', reference: 'صحیح مسلم' }
    ];
    let selectedDailyWisdom = null;

    const STORAGE_KEYS = {
        completed: 'notescraft_completed'
    };

    const readStorageSet = (key) => {
        try {
            const parsed = JSON.parse(localStorage.getItem(key) || '[]');
            return new Set(Array.isArray(parsed) ? parsed : []);
        } catch (error) {
            return new Set();
        }
    };

    const saveStorageSet = (key, valueSet) => {
        try {
            localStorage.setItem(key, JSON.stringify(Array.from(valueSet)));
        } catch (error) {
            /* no-op */
        }
    };

    const getCurrentAuthUser = () => {
        if (firebaseAuthInstance && firebaseAuthInstance.auth && firebaseAuthInstance.auth.currentUser) {
            return firebaseAuthInstance.auth.currentUser;
        }
        return currentAuthenticatedUser;
    };

    const applyBookmarkedCardStates = () => {
        document.querySelectorAll('.question-card').forEach((card) => {
            const questionId = card.getAttribute('data-question-id');
            if (!questionId) return;

            const isBookmarked = savedQuestionIds.has(questionId);
            card.classList.toggle('bookmarked', isBookmarked);

            const bookmarkBtn = card.querySelector('.bookmark-btn');
            if (!bookmarkBtn) return;

            bookmarkBtn.classList.toggle('is-active', isBookmarked);
            bookmarkBtn.setAttribute('aria-pressed', String(isBookmarked));
            bookmarkBtn.setAttribute('title', isBookmarked ? 'Remove bookmark' : 'Save question');

            const icon = bookmarkBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fas', isBookmarked);
                icon.classList.toggle('far', !isBookmarked);
            }
        });
    };

    const renderBookmarkedPane = () => {
        const paneBookmarked = document.getElementById('tab-bookmarked');
        if (!paneBookmarked) return;

        if (!currentChapterQuestionList.length || !currentChapterSubjectName || !currentChapterName) {
            paneBookmarked.innerHTML = '<div class="chapter-empty-state">Open a chapter to view saved questions.</div>';
            return;
        }

        const bookmarkedQuestions = currentChapterQuestionList.filter((entry) => {
            const questionId = buildQuestionId(entry, {
                subjectName: currentChapterSubjectName,
                chapterName: currentChapterName,
                categoryKey: normalizeCategoryKey(entry.category || entry.categoryKey || entry.type)
            });
            return savedQuestionIds.has(questionId);
        });

        if (!bookmarkedQuestions.length) {
            paneBookmarked.innerHTML = '<div class="chapter-empty-state">No saved questions in this chapter yet.</div>';
            return;
        }

        paneBookmarked.innerHTML = bookmarkedQuestions
            .map((entry) => createQuestionCardHtml(entry, {
                subjectName: currentChapterSubjectName,
                chapterName: currentChapterName,
                categoryKey: normalizeCategoryKey(entry.category || entry.categoryKey || entry.type)
            }))
            .join('');

        applyStoredCardStates();
        applyBookmarkedCardStates();
        runSearchFilter();
        runFlashcardSync();
        if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
            window.MathJax.typesetPromise().then(() => window.MathJax.typesetPromise());
        }
    };

    const stopBookmarksRealtimeListener = () => {
        if (bookmarksUnsubscribe) {
            bookmarksUnsubscribe();
            bookmarksUnsubscribe = null;
        }
        bookmarksListenerUid = '';
    };

    const startBookmarksRealtimeListener = async (uid) => {
        if (!uid) {
            stopBookmarksRealtimeListener();
            savedQuestionIds.clear();
            applyBookmarkedCardStates();
            renderBookmarkedPane();
            return;
        }

        if (bookmarksUnsubscribe && bookmarksListenerUid === uid) {
            return;
        }

        stopBookmarksRealtimeListener();
        bookmarksListenerUid = uid;

        try {
            const db = await initializeFirestoreCompat();
            bookmarksUnsubscribe = db.collection('users').doc(uid).onSnapshot((docSnapshot) => {
                const data = docSnapshot.exists ? (docSnapshot.data() || {}) : {};
                const remoteSavedIds = Array.isArray(data.savedQuestions) ? data.savedQuestions : [];

                savedQuestionIds = new Set(remoteSavedIds);
                applyBookmarkedCardStates();
                renderBookmarkedPane();
            }, (error) => {
                console.warn('Unable to subscribe saved questions.', error);
            });
        } catch (error) {
            console.warn('Unable to initialize saved questions listener.', error);
        }
    };

    const toggleBookmark = async (questionId) => {
        if (!questionId) return;

        const auth = firebaseAuthInstance && firebaseAuthInstance.auth ? firebaseAuthInstance.auth : null;
        if (!auth || !auth.currentUser) {
            alert('Please Sign in with Google to save questions.');
            return;
        }

        const uid = auth.currentUser.uid;
        const wasBookmarked = savedQuestionIds.has(questionId);

        if (wasBookmarked) {
            savedQuestionIds.delete(questionId);
        } else {
            savedQuestionIds.add(questionId);
        }
        applyBookmarkedCardStates();
        renderBookmarkedPane();

        try {
            const db = await initializeFirestoreCompat();
            const userRef = db.collection('users').doc(uid);

            if (firestoreFieldValue) {
                await userRef.set({
                    savedQuestions: wasBookmarked
                        ? firestoreFieldValue.arrayRemove(questionId)
                        : firestoreFieldValue.arrayUnion(questionId),
                    savedUpdatedAt: typeof firestoreFieldValue.serverTimestamp === 'function'
                        ? firestoreFieldValue.serverTimestamp()
                        : new Date()
                }, { merge: true });
            } else {
                await userRef.set({
                    savedQuestions: Array.from(savedQuestionIds),
                    savedUpdatedAt: new Date()
                }, { merge: true });
            }
        } catch (error) {
            console.warn('Unable to update saved question in Firestore.', error);
            if (wasBookmarked) {
                savedQuestionIds.add(questionId);
            } else {
                savedQuestionIds.delete(questionId);
            }
            applyBookmarkedCardStates();
            renderBookmarkedPane();
        }
    };

    completedQuestionIds = readStorageSet(STORAGE_KEYS.completed);

    const buildQuestionId = (entry, meta = {}) => {
        const source = [
            String(meta.subjectName || activeSubject || ''),
            String(meta.chapterName || activeChapter || ''),
            String(meta.categoryKey || ''),
            String(entry.question || ''),
            String(entry.answer || '')
        ].join('|');

        let hash = 0;
        for (let index = 0; index < source.length; index += 1) {
            hash = ((hash << 5) - hash) + source.charCodeAt(index);
            hash |= 0;
        }

        return `q-${Math.abs(hash).toString(36)}`;
    };

    const updateProgressUI = (questionCard, isDone) => {
        if (!questionCard) return;
        questionCard.classList.toggle('is-done', isDone);
    };

    const applyStoredCardStates = () => {
        const cards = document.querySelectorAll('.question-card');
        cards.forEach(card => {
            let questionId = card.getAttribute('data-question-id');

            if (!questionId) {
                const questionText = (card.querySelector('.question-title') ? card.querySelector('.question-title').innerText : '').trim();
                const answerText = (card.querySelector('.answer-text') ? card.querySelector('.answer-text').innerText : '').trim();
                const source = [String(activeSubject || ''), String(activeChapter || ''), questionText, answerText].join('|');

                let hash = 0;
                for (let index = 0; index < source.length; index += 1) {
                    hash = ((hash << 5) - hash) + source.charCodeAt(index);
                    hash |= 0;
                }

                questionId = `q-${Math.abs(hash).toString(36)}`;
                card.setAttribute('data-question-id', questionId);
            }

            if (!questionId) return;

            let doneCheckbox = card.querySelector('.done-checkbox');
            if (!doneCheckbox) {
                let metaActions = card.querySelector('.card-meta-actions');
                if (!metaActions) {
                    metaActions = document.createElement('div');
                    metaActions.className = 'card-meta-actions';
                    card.appendChild(metaActions);
                }

                const doneLabel = document.createElement('label');
                doneLabel.className = 'done-toggle';
                doneLabel.innerHTML = '<input class="done-checkbox" type="checkbox"><span>Mark as Done</span>';
                metaActions.appendChild(doneLabel);
                doneCheckbox = doneLabel.querySelector('.done-checkbox');
            }

            const isDone = completedQuestionIds.has(questionId);

            updateProgressUI(card, isDone);

            if (doneCheckbox) {
                doneCheckbox.checked = isDone;
            }
        });
    };

    queueMicrotask(() => {
        applyStoredCardStates();
        applyBookmarkedCardStates();
    });

    const siteData = (window.siteData && typeof window.siteData === 'object') ? window.siteData : {};

    const redirectedBootPathname = typeof window.__notescraftBootPathname === 'string'
        ? window.__notescraftBootPathname
        : '';

    const getSubjectChapterData = (subjectName) => {
        return siteData[subjectName] && typeof siteData[subjectName] === 'object' ? siteData[subjectName] : {};
    };

    const getIslamiyatHierarchy = () => {
        const islamiyatNode = getSubjectChapterData('Islamiyat');
        if (!islamiyatNode || typeof islamiyatNode !== 'object') return [];
        return Array.isArray(islamiyatNode.islamiat_data) ? islamiyatNode.islamiat_data : [];
    };

    const getIslamiyatChapterById = (chapterId) => {
        return getIslamiyatHierarchy().find((chapter) => String(chapter.id) === String(chapterId)) || null;
    };

    const getIslamiyatTopicByIds = (chapterId, topicId) => {
        const chapter = getIslamiyatChapterById(chapterId);
        if (!chapter || !Array.isArray(chapter.topics)) return null;
        return chapter.topics.find((topic) => !topic.is_header && String(topic.id) === String(topicId)) || null;
    };



    const getNodeKeys = (subjectName, node) => {
        const keys = Object.keys(node || {});
        if (subjectName === 'Islamiyat') return keys;

        const allNumeric = keys.every(key => /^\d+$/.test(key));
        if (allNumeric) {
            return keys.sort((a, b) => Number(a) - Number(b));
        }

        return keys.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    };

    const encodeChapterPath = (pathSegments) => pathSegments.map(segment => String(segment)).join('||');
    const decodeChapterPath = (chapterKey) => String(chapterKey || '').split('||').filter(Boolean);

    const SUBJECT_CHAPTER_TITLES = {
        'computer science': {
            '1': 'INTRODUCTION TO SOFTWARE DEVELOPMENT',
            '2': 'PYTHON PROGRAMMING',
            '3': 'ALGORITHMS AND PROBLEM SOLVING',
            '4': 'COMPUTATIONAL STRUCTURES',
            '5': 'DATA ANALYTICS',
            '6': 'EMERGING TECHNOLOGIES',
            '7': 'LEGAL AND ETHICAL ASPECTS OF COMPUTING SYSTEM',
            '8': 'ONLINE RESEARCH AND DIGITAL LITERACY',
            '9': 'ENTREPRENEURSHIP IN DIGITAL AGE'
        },
        'english': {
            '1': 'Khatam-un-Nabiyeen Hazrat Muhammad ﷺ',
            '2': 'Responsibility of the Youth in Nation-Building',
            '3': 'A Bird Came Down the Walk (Poem)',
            '5': 'Impact of Global Warming on Pakistan',
            '6': 'The Echoing Green (Poem)',
            '8': 'Clean Water',
            '10': 'The Punishment of Shahpesh, the Persian, on Khipil, the Builder',
            '11': 'Those Winter Sundays',
            '13': "Ruba'iyat (Poem)",
            '14': 'The End of Beginning'
        },
        'physics': {
            '1': 'MEASUREMENTS',
            '2': 'FORCE AND MOTION',
            '3': 'CIRCULAR AND ROTATIONAL MOTION',
            '4': 'WORK, ENERGY AND POWER',
            '5': 'SOLID AND FLUID DYNAMICS',
            '6': 'HEAT AND THERMODYNAMICS',
            '7': 'WAVE AND VIBRATIONS',
            '8': 'PHYSICAL OPTICS AND GRAVITATIONAL WAVES',
            '9': 'ELECTROSTATICS AND CURRENT ELECTRICITY',
            '10': 'ELECTROMAGNETISM',
            '11': 'SPECIAL THEORY OF RELATIVITY',
            '12': 'NUCLEAR AND PARTICLE PHYSICS'
        }
    };

    const getMappedChapterTitle = (subjectName, chapterId) => {
        const normalizedSubject = String(subjectName || '').toLowerCase();
        const subjectMap = SUBJECT_CHAPTER_TITLES[normalizedSubject];
        if (!subjectMap) return '';
        return subjectMap[String(chapterId)] || '';
    };

    const getChapterDisplayParts = (subjectName, pathSegments) => {
        if (!pathSegments.length) {
            return {
                label: 'Untitled',
                chapterName: '',
                headerTitle: 'Untitled'
            };
        }

        if (subjectName === 'Islamiyat') {
            const islamiyatHierarchy = getIslamiyatHierarchy();
            if (islamiyatHierarchy.length) {
                const [chapterId, topicId] = pathSegments;
                const chapter = getIslamiyatChapterById(chapterId);
                if (!chapter) {
                    const label = 'اسلامیات';
                    return {
                        label,
                        chapterName: '',
                        headerTitle: label
                    };
                }

                if (!topicId) {
                    return {
                        label: chapter.title,
                        chapterName: '',
                        headerTitle: chapter.title
                    };
                }

                const topic = getIslamiyatTopicByIds(chapterId, topicId);
                const topicTitle = topic ? topic.title : String(topicId || '').trim();
                const label = `${chapter.title} - ${topicTitle}`;
                return {
                    label,
                    chapterName: '',
                    headerTitle: `${chapter.title} — ${topicTitle}`
                };
            }

            const label = pathSegments.join(' - ');
            return {
                label,
                chapterName: '',
                headerTitle: label
            };
        }



        if (pathSegments.length === 1 && /^\d+$/.test(pathSegments[0])) {
            const chapterId = pathSegments[0];
            const label = `Chapter ${chapterId}`;
            const chapterName = getMappedChapterTitle(subjectName, chapterId);

            return {
                label,
                chapterName,
                headerTitle: chapterName ? `${label}: ${chapterName}` : `${label}: ${subjectName}`
            };
        }

        const label = pathSegments.join(' - ');
        return {
            label,
            chapterName: '',
            headerTitle: `${label}: ${subjectName}`
        };
    };

    const formatChapterLabelFromPath = (subjectName, pathSegments) => {
        if (subjectName === 'Islamiyat' && getIslamiyatHierarchy().length) {
            // Keep route slugs ASCII-safe for nested Islamiyat IDs.
            return pathSegments.map((segment) => String(segment)).join('-');
        }

        return getChapterDisplayParts(subjectName, pathSegments).label;
    };

    const getChapterEntries = (subjectName) => {


        if (subjectName === 'Islamiyat' && getIslamiyatHierarchy().length) {
            const entries = [];
            getIslamiyatHierarchy().forEach((chapter) => {
                if (!Array.isArray(chapter.topics)) return;
                chapter.topics.forEach((topic) => {
                    if (topic.is_header || !topic.id) return;
                    const path = [String(chapter.id), String(topic.id)];
                    entries.push({
                        key: encodeChapterPath(path),
                        path,
                        label: `${chapter.title} - ${topic.title}`,
                        chapterName: '',
                        headerTitle: `${chapter.title} — ${topic.title}`
                    });
                });
            });
            return entries;
        }

        const chapterData = getSubjectChapterData(subjectName);
        const entries = [];

        const walk = (node, currentPath = []) => {
            if (Array.isArray(node)) {
                if (currentPath.length) {
                    const chapterDisplay = getChapterDisplayParts(subjectName, currentPath);
                    entries.push({
                        key: encodeChapterPath(currentPath),
                        path: currentPath,
                        label: chapterDisplay.label,
                        chapterName: chapterDisplay.chapterName,
                        headerTitle: chapterDisplay.headerTitle
                    });
                }
                return;
            }

            if (!node || typeof node !== 'object') {
                return;
            }

            const keys = getNodeKeys(subjectName, node);
            keys.forEach(key => walk(node[key], [...currentPath, key]));
        };

        walk(chapterData);
        return entries;
    };

    const getChapterQuestions = (subjectName, chapterKey) => {
        const pathSegments = decodeChapterPath(chapterKey);
        if (!pathSegments.length) {
            return [];
        }

        if (subjectName === 'Islamiyat' && getIslamiyatHierarchy().length) {
            return [];
        }



        let node = getSubjectChapterData(subjectName);
        for (const segment of pathSegments) {
            if (!node || typeof node !== 'object' || !(segment in node)) {
                return [];
            }
            node = node[segment];
        }

        return Array.isArray(node) ? node : [];
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

    const openModelPaperSubject = (subjectName) => {
        alert(`${subjectName} Model Paper 2026 content coming soon!`);
    };

    const clearRenderedQuestionContent = () => {
        const paneMost = document.getElementById('tab-most-important');
        const paneImportant = document.getElementById('tab-important');
        const paneConceptual = document.getElementById('tab-conceptual');
        const paneBookmarked = document.getElementById('tab-bookmarked');

        if (paneMost) paneMost.innerHTML = '';
        if (paneImportant) paneImportant.innerHTML = '';
        if (paneConceptual) paneConceptual.innerHTML = '';
        if (paneBookmarked) paneBookmarked.innerHTML = '';

        if (questionsFeed) {
            questionsFeed.querySelectorAll('.question-card').forEach((card) => card.remove());
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
        const label = mode === 'subjects'
            ? 'Back to Subjects'
            : mode === 'model-papers'
                ? 'Back to Main Menu'
                : 'Back to Chapters';
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

    const normalizeCategoryKey = (rawCategory) => {
        const category = String(rawCategory || '').toLowerCase().trim();
        if (category === '1' || category.includes('most')) return 'most';
        if (category === '2' || (category.includes('important') && !category.includes('most'))) return 'important';
        if (category === '3' || category.includes('conceptual') || category.includes('concept')) return 'conceptual';
        return 'most';
    };

    const createQuestionCardHtml = (entry, meta = {}) => {
        const escapeHtml = (value) => String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

        const applyStarMagic = (rawValue) => {
            const normalizedLineBreaks = String(rawValue || '').replace(/\\n/g, '\n');
            const escaped = escapeHtml(normalizedLineBreaks);
            return escaped
                .replace(/\*([^*]+)\*/g, '<strong class="highlight">$1</strong>')
                .replace(/\n/g, '<br>');
        };
        const ensureDisplayMathDelimiters = (rawFormulaValue) => {
            const formulaText = String(rawFormulaValue || '').trim();
            if (!formulaText) return '';

            const hasDelimiter = /(\$\$[\s\S]*\$\$)|(\\\([\s\S]*\\\))|(\\\[[\s\S]*\\\])/.test(formulaText);
            if (hasDelimiter) {
                return formulaText;
            }

            return `$$${formulaText}$$`;
        };

        const question = applyStarMagic(entry.question);
        const answer = applyStarMagic(entry.answer);

        const isUrdu = meta.subjectName === 'Islamiyat' || meta.subjectName === 'Tarjama-tul-Quran';
        let rawBadgeTitle = entry.badgeTitle || entry.badge_title || (isUrdu ? 'کلیدی معلومات/یاد رکھنے والی بات:' : 'MARKS BOOSTER');
        // Translate common hardcoded english headers to Urdu for Urdu subjects
        if (isUrdu && ['MARKS BOOSTER', 'ENERGY FLOW', 'QUICK NOTE'].includes(rawBadgeTitle.toUpperCase())) {
            rawBadgeTitle = 'کلیدی معلومات/یاد رکھنے والی بات:';
        }
        
        if (isUrdu && rawBadgeTitle && !rawBadgeTitle.endsWith(':')) {
            rawBadgeTitle += ':';
        }

        const rawBadgeText = entry.badgeText || entry.badge_text || entry.marks_booster || entry.marksBooster || '';
        const isFormulaBadge = String(rawBadgeTitle).toLowerCase().includes('formula');
        const badgeTitle = applyStarMagic(rawBadgeTitle);
        const badgeText = applyStarMagic(isFormulaBadge ? ensureDisplayMathDelimiters(rawBadgeText) : rawBadgeText);
        const questionId = buildQuestionId(entry, meta);
        const isDone = completedQuestionIds.has(questionId);
        const isBookmarked = savedQuestionIds.has(questionId);

        const qLabelText = isUrdu ? 'سوال:' : 'Q:';
        const aLabelText = isUrdu ? 'جواب:' : 'Definition: ';

        return `
    <article class="question-card${isDone ? ' is-done' : ''}${isBookmarked ? ' bookmarked' : ''}${isUrdu ? ' urdu-text' : ''}" data-question-id="${questionId}">
    <div class="q-header">
        <span class="q-label">${qLabelText}</span>
        <h3 class="question-title">${question}</h3>
    </div>
    <div class="a-body">
        <p class="answer-text"><span class="a-label">${aLabelText}</span>${answer}</p>
    </div>
    <div class="card-footer">
        <span class="extra-badge">${badgeTitle}</span>
        <p class="extra-text">${badgeText}</p>
    </div>
    <div class="card-meta-actions">
        <button class="bookmark-btn${isBookmarked ? ' is-active' : ''}" type="button" data-question-id="${questionId}" aria-label="Save question" aria-pressed="${isBookmarked ? 'true' : 'false'}" title="${isBookmarked ? 'Remove bookmark' : 'Save question'}">
            <i class="${isBookmarked ? 'fas' : 'far'} fa-bookmark"></i>
        </button>
        <label class="done-toggle">
            <input class="done-checkbox" type="checkbox" ${isDone ? 'checked' : ''}>
            <span>Mark as Done</span>
        </label>
    </div>
</article>
        `;
    };

    const renderQuestionsByCategory = (questionList, subjectName, chapterName) => {
        const paneMost = document.getElementById('tab-most-important');
        const paneImportant = document.getElementById('tab-important');
        const paneConceptual = document.getElementById('tab-conceptual');
        const paneBookmarked = document.getElementById('tab-bookmarked');
        if (!paneMost || !paneImportant || !paneConceptual || !paneBookmarked) return;

        currentChapterQuestionList = Array.isArray(questionList) ? [...questionList] : [];
        currentChapterSubjectName = subjectName;
        currentChapterName = chapterName;

        const grouped = {
            most: [],
            important: [],
            conceptual: []
        };

        questionList.forEach(entry => {
            const key = normalizeCategoryKey(entry.category || entry.categoryKey || entry.type);
            grouped[key].push(entry);
        });

        const emptyHtml = '<div class="chapter-empty-state">No questions in this category yet.</div>';
        const mostHtml = grouped.most.length
            ? grouped.most.map((entry) => createQuestionCardHtml(entry, { subjectName, chapterName, categoryKey: 'most' })).join('')
            : emptyHtml;
        const importantHtml = grouped.important.length
            ? grouped.important.map((entry) => createQuestionCardHtml(entry, { subjectName, chapterName, categoryKey: 'important' })).join('')
            : emptyHtml;
        const conceptualHtml = grouped.conceptual.length
            ? grouped.conceptual.map((entry) => createQuestionCardHtml(entry, { subjectName, chapterName, categoryKey: 'conceptual' })).join('')
            : emptyHtml;
        const bookmarkedQuestions = questionList.filter((entry) => {
            const questionId = buildQuestionId(entry, {
                subjectName,
                chapterName,
                categoryKey: normalizeCategoryKey(entry.category || entry.categoryKey || entry.type)
            });
            return savedQuestionIds.has(questionId);
        });
        const bookmarkedHtml = bookmarkedQuestions.length
            ? bookmarkedQuestions.map((entry) => createQuestionCardHtml(entry, {
                subjectName,
                chapterName,
                categoryKey: normalizeCategoryKey(entry.category || entry.categoryKey || entry.type)
            })).join('')
            : '<div class="chapter-empty-state">No saved questions in this chapter yet.</div>';

        paneMost.innerHTML = '';
        paneImportant.innerHTML = '';
        paneConceptual.innerHTML = '';
        paneBookmarked.innerHTML = '';

        window.requestAnimationFrame(() => {
            paneMost.innerHTML = mostHtml;
            paneImportant.innerHTML = importantHtml;
            paneConceptual.innerHTML = conceptualHtml;
            paneBookmarked.innerHTML = bookmarkedHtml;

            window.requestAnimationFrame(() => {
                applyStoredCardStates();
                applyBookmarkedCardStates();
                runSearchFilter();
                runFlashcardSync();

                if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
                    window.MathJax.typesetPromise().then(() => window.MathJax.typesetPromise());
                }
            });
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

        if (state.view === 'model-papers') {
            return buildNavState('model-papers');
        }

        if (state.view === 'chapters' && state.subject) {
            return buildNavState('chapters', state.subject);
        }

        if (state.view === 'content' && state.subject && state.chapter) {
            return buildNavState('content', state.subject, state.chapter);
        }

        return buildNavState('dashboard');
    };

    const slugifyRouteSegment = (value) => String(value || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    const getSubjectSlug = (subjectName) => slugifyRouteSegment(subjectName);

    const getChapterSlug = (subjectName, chapterKey) => {
        const pathSegments = decodeChapterPath(chapterKey);
        const chapterLabel = formatChapterLabelFromPath(subjectName, pathSegments);
        return slugifyRouteSegment(chapterLabel);
    };

    const getRoutePathFromState = (state) => {
        const safeState = normalizeNavState(state);

        if (safeState.view === 'model-papers') {
            return '/model-papers';
        }

        if (safeState.view === 'chapters' && safeState.subject) {
            return `/${getSubjectSlug(safeState.subject)}`;
        }

        if (safeState.view === 'content' && safeState.subject && safeState.chapter) {
            return `/${getSubjectSlug(safeState.subject)}/${getChapterSlug(safeState.subject, safeState.chapter)}`;
        }

        return '/';
    };

    const getSubjectBySlug = (subjectSlug) => {
        const normalizedSlug = slugifyRouteSegment(subjectSlug);
        return Object.keys(siteData).find((subjectName) => getSubjectSlug(subjectName) === normalizedSlug) || null;
    };

    const getChapterKeyBySlug = (subjectName, chapterSlug) => {
        const normalizedSlug = slugifyRouteSegment(chapterSlug);
        const chapterEntry = getChapterEntries(subjectName).find((entry) => {
            return getChapterSlug(subjectName, entry.key) === normalizedSlug;
        });
        return chapterEntry ? chapterEntry.key : null;
    };

    const getStateFromPathname = (pathname) => {
        const rawSegments = String(pathname || '/')
            .split('/')
            .map((segment) => segment.trim())
            .filter(Boolean)
            .map((segment) => {
                try {
                    return decodeURIComponent(segment);
                } catch {
                    return segment;
                }
            });

        if (!rawSegments.length) {
            return buildNavState('dashboard');
        }

        const firstSegment = slugifyRouteSegment(rawSegments[0]);

        if (firstSegment === 'model-papers') {
            return buildNavState('model-papers');
        }

        const subjectName = getSubjectBySlug(firstSegment);
        if (!subjectName) {
            return buildNavState('dashboard');
        }

        if (rawSegments.length === 1) {
            return buildNavState('chapters', subjectName);
        }

        const chapterKey = getChapterKeyBySlug(subjectName, rawSegments[1]);
        if (chapterKey) {
            return buildNavState('content', subjectName, chapterKey);
        }

        return buildNavState('chapters', subjectName);
    };

    const getBasePrefixFromPathname = (pathname) => {
        const segments = String(pathname || '/')
            .split('/')
            .map((segment) => segment.trim())
            .filter(Boolean);

        if (!segments.length) {
            return '';
        }

        const firstSegment = slugifyRouteSegment(segments[0]);
        return knownRouteSlugs.has(firstSegment) ? '' : `/${segments[0]}`;
    };

    const appBasePrefix = getBasePrefixFromPathname(window.location.pathname);

    const withBasePrefix = (path) => {
        if (!appBasePrefix) return path;
        return `${appBasePrefix}${path === '/' ? '' : path}`;
    };

    const withoutBasePrefix = (pathname) => {
        const path = String(pathname || '/');
        if (!appBasePrefix) return path;
        if (path === appBasePrefix) return '/';
        if (path.startsWith(`${appBasePrefix}/`)) {
            return path.slice(appBasePrefix.length);
        }
        return path;
    };

    const renderDailyWisdom = () => {
        if (!dailyWisdomQuote || !dailyWisdomSource || !DAILY_WISDOM_URDU.length) return;

        if (!selectedDailyWisdom) {
            selectedDailyWisdom = DAILY_WISDOM_URDU[Math.floor(Math.random() * DAILY_WISDOM_URDU.length)];
        }

        dailyWisdomQuote.textContent = selectedDailyWisdom.text;
        dailyWisdomSource.textContent = selectedDailyWisdom.reference;
        dailyWisdomQuote.setAttribute('lang', 'ur');
        dailyWisdomQuote.setAttribute('dir', 'rtl');
        dailyWisdomSource.setAttribute('lang', 'ur');
        dailyWisdomSource.setAttribute('dir', 'rtl');
    };

    const renderWelcomeSection = () => {
        if (welcomeMainHeading) {
            welcomeMainHeading.textContent = WELCOME_CONTENT.heading;
        }
        if (welcomeIntroText) {
            welcomeIntroText.textContent = WELCOME_CONTENT.intro;
        }
        if (welcomeCtaText) {
            welcomeCtaText.textContent = WELCOME_CONTENT.cta;
        }

        renderDailyWisdom();
    };

    const showModelPapersMenu = () => {
        activeSubject = null;
        activeChapter = null;
        clearRenderedQuestionContent();
        setFlashcardFabVisibility(false);
        setCommentsSectionVisibility(false);

        hideElement(subjectDashboardView);
        showElement(chapterSelectionView);
        hideElement(chapterHeaderBanner);
        hideElement(tabNavigation);
        hideElement(questionsFeed);
        hideElement(contentUnavailable);
        setBackButtonState('model-papers');
        resetDropdownActiveState();
        setExpandedSidebarSubject('', false);

        if (chapterSelectionTitle) {
            chapterSelectionTitle.innerText = 'Board Model Papers (Solved)';
        }

        if (!chapterList) return;

        chapterList.classList.add('model-papers-grid');
        chapterList.innerHTML = '';

        const modelPaperSubjects = [
            { key: 'Computer Science', icon: '💻' },
            { key: 'English', icon: '📘' },
            { key: 'Physics', icon: '🧪' }
        ];

        modelPaperSubjects.forEach((entry) => {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'chapter-card model-paper-card';

            const title = document.createElement('span');
            title.className = 'model-paper-card-title';
            title.textContent = `${entry.icon} ${entry.key}`;

            const subtitle = document.createElement('span');
            subtitle.className = 'model-paper-card-subtitle';
            subtitle.textContent = 'Model Paper 2026';

            card.appendChild(title);
            card.appendChild(subtitle);
            card.addEventListener('click', () => {
                openModelPaperSubject(entry.key);
            });
            chapterList.appendChild(card);
        });
    };

    window.openModelPapers = function openModelPapers(navigationMode = 'push') {
        const targetState = buildNavState('model-papers');

        if (navigationMode === 'replace') {
            const safeState = normalizeNavState(targetState);
            history.replaceState(safeState, '', getRoutePathFromState(safeState));
            renderNavState(safeState, 'none');
            return;
        }

        navigateToState(targetState, 'forward');
        closeSidebarAfterNavigation();
    };

    const showSubjectDashboard = () => {
        activeSubject = null;
        activeChapter = null;
        activeIslamiyatBaabId = '';
        clearRenderedQuestionContent();
        renderWelcomeSection();
        setFlashcardFabVisibility(false);
        setCommentsSectionVisibility(false);
        showElement(subjectDashboardView);
        hideElement(chapterSelectionView);
        hideElement(chapterHeaderBanner);
        hideElement(tabNavigation);
        hideElement(questionsFeed);
        hideElement(contentUnavailable);
        setBackButtonState('none');
        resetDropdownActiveState();
        setExpandedSidebarSubject('', false);
        if (chapterList) {
            chapterList.classList.remove('model-papers-grid');
        }
    };

    const showChapterSelection = (subjectName, islamiyatBaabId = '') => {
        activeSubject = subjectName;
        activeChapter = null;
        activeIslamiyatBaabId = subjectName === 'Islamiyat' ? String(islamiyatBaabId || '') : '';
        clearRenderedQuestionContent();
        setFlashcardFabVisibility(false);
        setCommentsSectionVisibility(false);
        showElement(chapterSelectionView);
        hideElement(subjectDashboardView);
        hideElement(chapterHeaderBanner);
        hideElement(tabNavigation);
        hideElement(questionsFeed);
        hideElement(contentUnavailable);
        setBackButtonState('subjects');
        setExpandedSidebarSubject(subjectName, true);

        if (!chapterList) return;

        chapterList.classList.remove('model-papers-grid');

        if (subjectName === 'Islamiyat' && getIslamiyatHierarchy().length) {
            const islamiyatHierarchy = getIslamiyatHierarchy();

            if (islamiyatBaabId) {
                const selectedBaab = getIslamiyatChapterById(islamiyatBaabId);

                if (chapterSelectionTitle) {
                    chapterSelectionTitle.innerText = selectedBaab
                        ? selectedBaab.title
                        : 'اسلامیات: موضوعات';
                }

                if (!selectedBaab || !Array.isArray(selectedBaab.topics)) {
                    chapterList.innerHTML = '<div class="chapter-empty-state">Content Coming Soon</div>';
                    return;
                }

                const topicList = selectedBaab.topics.filter((topic) => !topic.is_header && topic.id);
                if (!topicList.length) {
                    chapterList.innerHTML = '<div class="chapter-empty-state">Content Coming Soon</div>';
                    return;
                }

                chapterList.innerHTML = '';
                topicList.forEach((topic) => {
                    const topicCard = document.createElement('button');
                    topicCard.className = 'chapter-card';
                    topicCard.type = 'button';
                    topicCard.setAttribute('data-subject', subjectName);
                    topicCard.setAttribute('data-chapter', encodeChapterPath([String(selectedBaab.id), String(topic.id)]));
                    topicCard.setAttribute('aria-label', `اسلامیات ${selectedBaab.title} ${topic.title}`.replace(/\s+/g, ' ').trim());
                    topicCard.textContent = topic.title;
                    chapterList.appendChild(topicCard);
                });

                chapterList.querySelectorAll('.chapter-card').forEach((topicCard) => {
                    topicCard.addEventListener('click', () => {
                        const subject = topicCard.getAttribute('data-subject');
                        const chapter = topicCard.getAttribute('data-chapter');
                        if (subject && chapter) {
                            navigateToState(buildNavState('content', subject, chapter), 'forward');
                        }
                    });
                });

                return;
            }

            if (chapterSelectionTitle) {
                chapterSelectionTitle.innerText = 'اسلامیات: ابواب';
            }

            chapterList.innerHTML = '';
            islamiyatHierarchy.forEach((baab) => {
                const baabCard = document.createElement('button');
                baabCard.className = 'chapter-card';
                baabCard.type = 'button';
                baabCard.setAttribute('data-subject', subjectName);
                baabCard.setAttribute('data-islamiyat-baab', String(baab.id));
                baabCard.setAttribute('aria-label', `اسلامیات ${baab.title}`.replace(/\s+/g, ' ').trim());
                baabCard.textContent = baab.title;
                chapterList.appendChild(baabCard);
            });

            chapterList.querySelectorAll('.chapter-card[data-islamiyat-baab]').forEach((baabCard) => {
                baabCard.addEventListener('click', () => {
                    const baabId = baabCard.getAttribute('data-islamiyat-baab');
                    if (baabId) {
                        showChapterSelection('Islamiyat', baabId);
                    }
                });
            });

            return;
        }

        if (chapterSelectionTitle) {
            chapterSelectionTitle.innerText = `${subjectName} Chapters`;
        }

        const chapters = getChapterEntries(subjectName);

        if (chapters.length === 0) {
            chapterList.innerHTML = '<div class="chapter-empty-state">Content Coming Soon</div>';
            return;
        }

        chapterList.innerHTML = '';
        chapters.forEach(chapter => {
            const chapterCard = document.createElement('button');
            chapterCard.className = 'chapter-card';
            chapterCard.type = 'button';
            chapterCard.setAttribute('data-subject', subjectName);
            chapterCard.setAttribute('data-chapter', chapter.key);
            chapterCard.setAttribute('aria-label', `${subjectName} ${chapter.label}`.replace(/\s+/g, ' ').trim());

            if (chapter.chapterName) {
                chapterCard.classList.add('has-chapter-name');
                if (chapter.chapterName.length > 40) {
                    chapterCard.classList.add('is-long-title');
                }

                const chapterMain = document.createElement('span');
                chapterMain.className = 'chapter-card-main';
                chapterMain.textContent = chapter.label;

                const chapterName = document.createElement('span');
                chapterName.className = 'chapter-card-name';
                chapterName.textContent = chapter.chapterName;

                chapterCard.appendChild(chapterMain);
                chapterCard.appendChild(chapterName);
            } else {
                chapterCard.textContent = chapter.label;
            }

            chapterList.appendChild(chapterCard);
        });

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
        activeChapter = chapterName;
        activeIslamiyatBaabId = '';

        const authUser = getCurrentAuthUser();
        if (authUser && authUser.uid) {
            startBookmarksRealtimeListener(authUser.uid);
        }

        hideElement(subjectDashboardView);
        hideElement(chapterSelectionView);
        showElement(chapterHeaderBanner);
        setBackButtonState('chapters');
        setExpandedSidebarSubject(subjectName, true);

        if (bannerBadge) {
            bannerBadge.innerText = subjectName;
        }
        if (bannerTitle) {
            const chapterDisplay = getChapterDisplayParts(subjectName, decodeChapterPath(chapterName));
            bannerTitle.innerText = chapterDisplay.headerTitle;
        }
        if (bannerSubtitle) {
            bannerSubtitle.innerText = 'Focused revision view for board preparation.';
        }

        const chapterQuestions = getChapterQuestions(subjectName, chapterName);
        const hasChapterContent = chapterQuestions.length > 0;

        if (hasChapterContent) {
            renderQuestionsByCategory(chapterQuestions, subjectName, chapterName);
            setFlashcardFabVisibility(true);
            setCommentsSectionVisibility(true);

            showElement(tabNavigation);
            showElement(questionsFeed);
            hideElement(contentUnavailable);

            const firstTabBtn = document.querySelector('.tab-btn[data-target="tab-most-important"]');
            const firstTabPane = document.getElementById('tab-most-important');
            tabButtons.forEach(button => button.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            if (firstTabBtn) firstTabBtn.classList.add('active');
            if (firstTabPane) firstTabPane.classList.add('active');
            runSearchFilter();
            runFlashcardSync();
        } else {
            clearRenderedQuestionContent();
            setFlashcardFabVisibility(false);
            setCommentsSectionVisibility(false);
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

        if (safeState.view === 'model-papers') {
            showModelPapersMenu();
        } else if (safeState.view === 'chapters' && safeState.subject) {
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
        const routePath = withBasePrefix(getRoutePathFromState(safeState));
        history.pushState(safeState, '', routePath);
        renderNavState(safeState, direction);
    };

    if (sidebarHomeLink) {
        sidebarHomeLink.setAttribute('href', withBasePrefix('/'));
        sidebarHomeLink.addEventListener('click', (event) => {
            event.preventDefault();
            navigateToState(buildNavState('dashboard'), 'back');
            closeSidebarAfterNavigation();
        });
    }

    const sidebarModelPapersLink = document.querySelector('.sidebar-modelpapers-link');
    if (sidebarModelPapersLink) {
        sidebarModelPapersLink.setAttribute('href', withBasePrefix('/model-papers'));
        sidebarModelPapersLink.removeAttribute('onclick');
        sidebarModelPapersLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.openModelPapers();
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
        const subjectName = link.getAttribute('data-subject') || link.innerText.trim();
        if (subjectName) {
            link.setAttribute('href', withBasePrefix(`/${getSubjectSlug(subjectName)}`));
        }

        link.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedSubjectName = link.getAttribute('data-subject') || link.innerText.trim();

            const sidebarItem = link.closest('.sidebar .nav-item.has-dropdown');
            if (sidebarItem) {
                const isExpanded = sidebarItem.classList.contains('expanded');
                sidebarDropdownItems.forEach(item => item.classList.remove('expanded'));

                if (isExpanded) {
                    return;
                }

                sidebarItem.classList.add('expanded');
            }

            navigateToState(buildNavState('chapters', selectedSubjectName), 'forward');
            closeSidebarAfterNavigation();
        });
    });

    const renderSidebarDropdownsFromData = () => {
        sidebarDropdownItems.forEach(item => {
            const subjectLink = item.querySelector('.subject-link');
            const dropdownMenu = item.querySelector('.dropdown-menu');
            if (!subjectLink || !dropdownMenu) return;

            const subjectName = subjectLink.getAttribute('data-subject');
            if (!subjectName) return;

            dropdownMenu.classList.toggle('islamiyat-menu', subjectName === 'Islamiyat');

            if (subjectName === 'Islamiyat' && getIslamiyatHierarchy().length) {
                dropdownMenu.innerHTML = '';

                getIslamiyatHierarchy().forEach((chapter) => {
                    const section = document.createElement('div');
                    section.className = 'baab-section';

                    const sectionToggle = document.createElement('button');
                    sectionToggle.type = 'button';
                    sectionToggle.className = 'baab-header';
                    sectionToggle.setAttribute('aria-expanded', 'false');

                    const arrow = document.createElement('span');
                    arrow.className = 'baab-arrow';
                    arrow.textContent = '▸';

                    const titleText = document.createElement('span');
                    titleText.className = 'baab-title';
                    titleText.textContent = chapter.title;

                    sectionToggle.appendChild(arrow);
                    sectionToggle.appendChild(titleText);

                    const submenu = document.createElement('div');
                    submenu.className = 'topics-panel hidden';

                    (Array.isArray(chapter.topics) ? chapter.topics : []).forEach((topic) => {
                        if (topic.is_header) {
                            const header = document.createElement('div');
                            header.className = 'dropdown-topic-header';
                            header.textContent = String(topic.title || '').replace(/\*\*/g, '');
                            submenu.appendChild(header);
                            return;
                        }

                        if (!topic.id) return;

                        const chapterKey = encodeChapterPath([String(chapter.id), String(topic.id)]);
                        const link = document.createElement('a');
                        link.href = withBasePrefix(`/${getSubjectSlug(subjectName)}/${getChapterSlug(subjectName, chapterKey)}`);
                        link.className = 'dropdown-link topic-link';
                        link.setAttribute('data-chapter-key', chapterKey);
                        link.setAttribute('aria-label', `اسلامیات ${chapter.title} ${topic.title}`.replace(/\s+/g, ' ').trim());
                        link.textContent = topic.title;
                        submenu.appendChild(link);
                    });

                    section.appendChild(sectionToggle);
                    section.appendChild(submenu);
                    dropdownMenu.appendChild(section);
                });

                return;
            }

            const chapterEntries = getChapterEntries(subjectName);
            dropdownMenu.innerHTML = '';

            if (!chapterEntries.length) {
                return;
            }

            chapterEntries.forEach(chapter => {
                const link = document.createElement('a');
                link.href = withBasePrefix(`/${getSubjectSlug(subjectName)}/${getChapterSlug(subjectName, chapter.key)}`);
                link.className = 'dropdown-link';
                link.setAttribute('data-chapter-key', chapter.key);
                link.setAttribute('aria-label', `${subjectName} ${chapter.label}`.replace(/\s+/g, ' ').trim());
                link.textContent = chapter.label;
                dropdownMenu.appendChild(link);
            });
        });
    };

    renderSidebarDropdownsFromData();

    if (sidebar) {
        sidebar.addEventListener('click', (event) => {
            const sectionToggle = event.target.closest('.baab-header');
            if (sectionToggle) {
                event.preventDefault();
                const section = sectionToggle.closest('.baab-section');
                const panel = section ? section.querySelector('.topics-panel') : null;
                if (panel) {
                    const isHidden = panel.classList.contains('hidden');
                    panel.classList.toggle('hidden', !isHidden);
                    sectionToggle.classList.toggle('active-baab', isHidden);
                    sectionToggle.setAttribute('aria-expanded', String(isHidden));
                }
                return;
            }

            const chapterLink = event.target.closest('.chapter-link, .dropdown-link[data-chapter-key]');
            if (!chapterLink) return;

            event.preventDefault();
            resetDropdownActiveState();
            chapterLink.classList.add('active-dropdown');

            const parentDropdownItem = chapterLink.closest('.has-dropdown');
            if (parentDropdownItem) {
                sidebarDropdownItems.forEach(item => item.classList.toggle('expanded', item === parentDropdownItem));
            }

            const parentSubjectLink = parentDropdownItem ? parentDropdownItem.querySelector('.subject-link') : null;
            const subjectName = parentSubjectLink ? parentSubjectLink.getAttribute('data-subject') : 'Computer Science';
            const chapterKey = chapterLink.getAttribute('data-chapter-key') || chapterLink.innerText.trim();

            navigateToState(buildNavState('content', subjectName || 'Computer Science', chapterKey), 'forward');
            closeSidebarAfterNavigation();
        });
    }

    if (persistentBackBtn) {
        persistentBackBtn.addEventListener('click', () => {
            const mode = persistentBackBtn.dataset.mode;

            if (mode === 'subjects' && activeSubject === 'Islamiyat' && activeIslamiyatBaabId) {
                // In Islamiyat nested view, step back from topics grid to baab grid first.
                showChapterSelection('Islamiyat');
                return;
            }

            if (mode === 'chapters' || mode === 'subjects') {
                history.back();
            } else if (mode === 'model-papers') {
                navigateToState(buildNavState('dashboard'), 'back');
            }
        });
    }

    window.openSubject = function openSubject(subjectName, navigationMode = 'push') {
        if (!subjectName) return;
        const targetState = buildNavState('chapters', subjectName);

        if (navigationMode === 'replace') {
            const safeState = normalizeNavState(targetState);
            history.replaceState(safeState, '', getRoutePathFromState(safeState));
            renderNavState(safeState, 'none');
            return;
        }

        navigateToState(targetState, 'forward');
    };

    window.openChapter = function openChapter(subjectName, chapterName, navigationMode = 'push') {
        if (!subjectName || !chapterName) return;
        const targetState = buildNavState('content', subjectName, chapterName);

        if (navigationMode === 'replace') {
            const safeState = normalizeNavState(targetState);
            history.replaceState(safeState, '', getRoutePathFromState(safeState));
            renderNavState(safeState, 'none');
            return;
        }

        navigateToState(targetState, 'forward');
    };

    window.addEventListener('popstate', (event) => {
        const stateFromHistory = event.state && event.state[navStateKey] === true
            ? event.state
            : getStateFromPathname(withoutBasePrefix(window.location.pathname));
        renderNavState(stateFromHistory, 'back');
    });

    const initialState = redirectedBootPathname
        ? getStateFromPathname(withoutBasePrefix(redirectedBootPathname))
        : (history.state && history.state[navStateKey] === true
            ? normalizeNavState(history.state)
            : getStateFromPathname(withoutBasePrefix(window.location.pathname)));

    history.replaceState(initialState, '', withBasePrefix(getRoutePathFromState(initialState)));

    if (redirectedBootPathname) {
        if (initialState.view === 'content' && initialState.subject && initialState.chapter) {
            window.openChapter(initialState.subject, initialState.chapter, 'replace');
        } else if (initialState.view === 'chapters' && initialState.subject) {
            window.openSubject(initialState.subject, 'replace');
        } else if (initialState.view === 'model-papers') {
            window.openModelPapers('replace');
        } else {
            renderNavState(initialState, 'none');
        }
    } else {
        renderNavState(initialState, 'none');
    }

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
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNotesCraftApp, { once: true });
} else {
    initializeNotesCraftApp();
}
