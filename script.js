document.addEventListener('DOMContentLoaded', () => {
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

        let hasClosed = false;
        const closeOnce = () => {
            if (hasClosed) return;
            hasClosed = true;
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
    });

    updateSidebarToggleState();

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
    const body = document.body;
    const themeStorageKey = 'notescraft_theme';
    const flashcardStorageKey = 'notescraft_flashcard_mode';
    let isFlashcardMode = false;
    let completedQuestionIds = new Set();
    let currentAuthenticatedUser = null;

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

    const ADMIN_EMAIL = 'johnythewithcher@gmail.com';
    const ADMIN_DISPLAY_NAME = 'Admin 👑';

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
    const isAdminEmail = (emailValue) => normalizeEmail(emailValue) === ADMIN_EMAIL;
    const isCurrentUserAdmin = () => Boolean(currentAuthenticatedUser && isAdminEmail(currentAuthenticatedUser.email));

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

    const deleteCommentById = async (commentId) => {
        if (!commentId || !isCurrentUserAdmin()) return;

        try {
            const db = await initializeFirestoreCompat();
            await db.collection('comments').doc(commentId).delete();
        } catch (error) {
            console.warn('Unable to delete comment.', error);
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

        const canDeleteAnyComment = isCurrentUserAdmin();

        comments.forEach((entry) => {
            const commentIsAdmin = isAdminEmail(entry.userEmail);
            const displayName = commentIsAdmin ? ADMIN_DISPLAY_NAME : entry.userName;

            const item = document.createElement('article');
            item.className = 'comment-item';

            if (commentIsAdmin) {
                item.style.borderColor = 'rgba(245, 158, 11, 0.78)';
                item.style.boxShadow = '0 0 0 1px rgba(250, 204, 21, 0.34), 0 10px 22px rgba(15, 23, 42, 0.35)';
            }

            const avatar = document.createElement('img');
            avatar.className = 'comment-avatar';
            avatar.src = commentIsAdmin
                ? createCommentAvatarFallback(ADMIN_DISPLAY_NAME)
                : entry.userPhoto || createCommentAvatarFallback(displayName);
            avatar.alt = `${displayName} avatar`;

            const content = document.createElement('div');
            content.className = 'comment-content';

            const meta = document.createElement('div');
            meta.className = 'comment-meta';

            const userName = document.createElement('span');
            userName.className = 'comment-user-name';
            userName.textContent = displayName;
            if (commentIsAdmin) {
                userName.style.fontWeight = '800';
                userName.style.color = '#facc15';
                userName.style.letterSpacing = '0.01em';
            }

            const time = document.createElement('span');
            time.className = 'comment-time';
            time.textContent = formatCommentDate(entry.timestamp);

            if (canDeleteAnyComment && entry.id) {
                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.setAttribute('aria-label', 'Delete comment');
                deleteBtn.setAttribute('title', 'Delete comment');
                deleteBtn.textContent = '🗑';
                deleteBtn.style.border = '1px solid rgba(248, 113, 113, 0.45)';
                deleteBtn.style.background = 'rgba(127, 29, 29, 0.28)';
                deleteBtn.style.color = '#fecaca';
                deleteBtn.style.borderRadius = '8px';
                deleteBtn.style.padding = '0.12rem 0.38rem';
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.style.fontSize = '0.8rem';
                deleteBtn.style.lineHeight = '1.2';
                deleteBtn.addEventListener('click', () => {
                    deleteCommentById(entry.id);
                });
                meta.appendChild(deleteBtn);
            }

            const text = document.createElement('p');
            text.className = 'comment-text';
            text.textContent = entry.text;

            meta.appendChild(userName);
            meta.appendChild(time);
            content.appendChild(meta);
            content.appendChild(text);

            item.appendChild(avatar);
            item.appendChild(content);
            commentsList.appendChild(item);
        });
    };

    const startCommentsRealtimeListener = async () => {
        if (commentsUnsubscribe || !commentsList || !window.firebase || !window.firebase.firestore) return;

        try {
            const db = await initializeFirestoreCompat();
            const commentsQuery = db.collection('comments').orderBy('timestamp', 'desc').limit(100);

            commentsUnsubscribe = commentsQuery.onSnapshot(
                (snapshot) => {
                    const mapped = snapshot.docs.map((doc) => {
                        const data = doc.data() || {};
                        return {
                            id: doc.id,
                            text: String(data.text || '').trim(),
                            userName: String(data.userName || 'Student'),
                            userEmail: String(data.userEmail || data.email || ''),
                            userPhoto: String(data.userPhoto || ''),
                            timestamp: data.timestamp || null
                        };
                    }).filter(item => item.text);

                    latestCommentsCache = mapped;
                    renderComments(latestCommentsCache);
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
        if (!postCommentBtn || !commentInput || !currentAuthenticatedUser || !currentAuthenticatedUser.uid) return;

        const trimmedText = commentInput.value.trim();
        if (!trimmedText || isPostingComment) return;

        isPostingComment = true;
        postCommentBtn.disabled = true;

        try {
            const db = await initializeFirestoreCompat();
            await db.collection('comments').add({
                text: trimmedText,
                userName: String(currentAuthenticatedUser.displayName || 'Student'),
                userEmail: String(currentAuthenticatedUser.email || ''),
                userPhoto: String(currentAuthenticatedUser.photoURL || ''),
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

    const syncAllProgressForUser = async (uid) => {
        if (!uid) return;

        try {
            const db = await initializeFirestoreCompat();
            const payload = {
                completedQuestionIds: Array.from(completedQuestionIds)
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

            const mergedSet = new Set([...completedQuestionIds, ...remoteIds]);
            completedQuestionIds.clear();
            mergedSet.forEach((id) => completedQuestionIds.add(id));
            saveStorageSet(STORAGE_KEYS.completed, completedQuestionIds);

            queueMicrotask(() => {
                applyStoredCardStates();
            });

            const needsRemoteMerge = mergedSet.size !== remoteIds.length;
            if (needsRemoteMerge) {
                await syncAllProgressForUser(uid);
            }
        } catch (error) {
            console.warn('Unable to load progress from Firestore.', error);
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

            await db.collection('user_progress').doc(currentAuthenticatedUser.uid).set(payload, { merge: true });
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

                if (currentAuthenticatedUser && currentAuthenticatedUser.uid) {
                    queueMicrotask(() => {
                        loadProgressFromFirestore(currentAuthenticatedUser.uid);
                    });
                } else {
                    queueMicrotask(() => {
                        applyStoredCardStates();
                    });
                }
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

        initializeFirestoreCompat().catch((error) => {
            console.warn('Firestore initialization failed.', error);
        });

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
    };

    const setFlashcardFabVisibility = (shouldShow) => {
        if (!flashcardFabBtn) return;
        flashcardFabBtn.classList.toggle('is-visible', Boolean(shouldShow));
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

            questionCards.forEach(card => {
                if (!activePane || !activePane.contains(card)) {
                    card.classList.remove('hidden-card');
                    return;
                }

                if (!searchTerm) {
                    card.classList.remove('hidden-card');
                    return;
                }

                const textContent = card.innerText.toLowerCase();
                card.classList.toggle('hidden-card', !textContent.includes(searchTerm));
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

    runSearchFilter = initSearch();
    runFlashcardSync = initFlashcardInteractions();
    handleProgress();

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
    let activeSubject = null;
    let activeChapter = null;

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
    });

    const siteData = (window.siteData && typeof window.siteData === 'object') ? window.siteData : {};

    const getSubjectChapterData = (subjectName) => {
        return siteData[subjectName] && typeof siteData[subjectName] === 'object' ? siteData[subjectName] : {};
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

    const formatChapterLabelFromPath = (subjectName, pathSegments) => {
        if (!pathSegments.length) return 'Untitled';
        if (subjectName === 'Islamiyat') {
            return pathSegments.join(' - ');
        }

        if (pathSegments.length === 1 && /^\d+$/.test(pathSegments[0])) {
            return `Chapter ${pathSegments[0]}`;
        }

        return pathSegments.join(' - ');
    };

    const getChapterEntries = (subjectName) => {
        const chapterData = getSubjectChapterData(subjectName);
        const entries = [];

        const walk = (node, currentPath = []) => {
            if (Array.isArray(node)) {
                if (currentPath.length) {
                    entries.push({
                        key: encodeChapterPath(currentPath),
                        path: currentPath,
                        label: formatChapterLabelFromPath(subjectName, currentPath)
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

        const question = applyStarMagic(entry.question);
        const answer = applyStarMagic(entry.answer);
        const badgeTitle = applyStarMagic(entry.badgeTitle || entry.badge_title || 'MARKS BOOSTER');
        const badgeText = applyStarMagic(entry.badgeText || entry.badge_text || entry.marks_booster || entry.marksBooster || '');
        const questionId = buildQuestionId(entry, meta);
        const isDone = completedQuestionIds.has(questionId);

        return `
<article class="question-card${isDone ? ' is-done' : ''}" data-question-id="${questionId}">
    <div class="q-header">
        <span class="q-label">Q:</span>
        <h3 class="question-title">${question}</h3>
    </div>
    <div class="a-body">
        <p class="answer-text"><span class="a-label">Definition: </span>${answer}</p>
    </div>
    <div class="card-footer">
        <span class="extra-badge">${badgeTitle}</span>
        <p class="extra-text">${badgeText}</p>
    </div>
    <div class="card-meta-actions">
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
        if (!paneMost || !paneImportant || !paneConceptual) return;

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
        paneMost.innerHTML = grouped.most.length
            ? grouped.most.map((entry) => createQuestionCardHtml(entry, { subjectName, chapterName, categoryKey: 'most' })).join('')
            : emptyHtml;
        paneImportant.innerHTML = grouped.important.length
            ? grouped.important.map((entry) => createQuestionCardHtml(entry, { subjectName, chapterName, categoryKey: 'important' })).join('')
            : emptyHtml;
        paneConceptual.innerHTML = grouped.conceptual.length
            ? grouped.conceptual.map((entry) => createQuestionCardHtml(entry, { subjectName, chapterName, categoryKey: 'conceptual' })).join('')
            : emptyHtml;

        applyStoredCardStates();
        runSearchFilter();
        runFlashcardSync();

        if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
            window.MathJax.typesetPromise();
        }
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

    const showSubjectDashboard = () => {
        activeSubject = null;
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
    };

    const showChapterSelection = (subjectName) => {
        activeSubject = subjectName;
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

        if (chapterSelectionTitle) {
            chapterSelectionTitle.innerText = subjectName === 'Islamiyat'
                ? 'Islamiyat Baab & Topics'
                : `${subjectName} Chapters`;
        }

        const chapters = getChapterEntries(subjectName);
        if (!chapterList) return;

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
            chapterCard.textContent = chapter.label;
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
        hideElement(subjectDashboardView);
        hideElement(chapterSelectionView);
        showElement(chapterHeaderBanner);
        setBackButtonState('chapters');
        setExpandedSidebarSubject(subjectName, true);

        if (bannerBadge) {
            bannerBadge.innerText = subjectName;
        }
        if (bannerTitle) {
            bannerTitle.innerText = `${formatChapterLabelFromPath(subjectName, decodeChapterPath(chapterName))}: ${subjectName}`;
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

    const renderSidebarDropdownsFromData = () => {
        sidebarDropdownItems.forEach(item => {
            const subjectLink = item.querySelector('.subject-link');
            const dropdownMenu = item.querySelector('.dropdown-menu');
            if (!subjectLink || !dropdownMenu) return;

            const subjectName = subjectLink.getAttribute('data-subject');
            if (!subjectName) return;

            const chapterEntries = getChapterEntries(subjectName);
            dropdownMenu.innerHTML = '';

            if (!chapterEntries.length) {
                return;
            }

            chapterEntries.forEach(chapter => {
                const link = document.createElement('a');
                link.href = '#';
                link.className = 'dropdown-link';
                link.setAttribute('data-chapter-key', chapter.key);
                link.textContent = chapter.label;
                dropdownMenu.appendChild(link);
            });
        });
    };

    renderSidebarDropdownsFromData();

    if (sidebar) {
        sidebar.addEventListener('click', (event) => {
            const chapterLink = event.target.closest('.chapter-link, .dropdown-link');
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
