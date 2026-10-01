// DoBu Martial Arts - Core Interactive Functionality
// BTEC Unit 13: Website Design & Development

// Theme Manager: Auto-detects system theme & supports manual toggle
(function initTheme() {
    const savedTheme = localStorage.getItem('dobu_theme');
    const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            // Auto: Detect system theme
            document.documentElement.removeAttribute('data-theme');
            if (prefersDarkQuery.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            }
        }
        updateThemeToggleIcons();
    }

    // Apply immediately to prevent flash
    applyTheme(savedTheme || 'auto');

    // Automatically respond to system theme changes in real time
    prefersDarkQuery.addEventListener('change', (e) => {
        const currentSaved = localStorage.getItem('dobu_theme');
        if (!currentSaved || currentSaved === 'auto') {
            applyTheme('auto');
        }
    });

    window.toggleTheme = function() {
        const currentSaved = localStorage.getItem('dobu_theme');
        const systemIsDark = prefersDarkQuery.matches;
        const currentEffective = document.documentElement.getAttribute('data-theme') || (systemIsDark ? 'dark' : 'light');
        const nextTheme = currentEffective === 'dark' ? 'light' : 'dark';
        
        localStorage.setItem('dobu_theme', nextTheme);
        applyTheme(nextTheme);
        showNotification(`Theme changed to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode (Auto-system sync supported)`);
    };

    window.resetThemeToAuto = function() {
        localStorage.removeItem('dobu_theme');
        applyTheme('auto');
        showNotification('Theme set to automatic system detection');
    };
})();

function updateThemeToggleIcons() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
        btn.innerHTML = isDark ? '☀️' : '🌙';
        btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
}

// Initialize default storage data if not present
(function initStorage() {
    if (!localStorage.getItem('dobu_users')) {
        const defaultUsers = [
            {
                name: 'Alex Johnson',
                email: 'member@dobu.com',
                password: 'password123',
                plan: 'Elite (Unlimited)',
                joined: '2026-01-10',
                memberId: 'DB-8921'
            }
        ];
        localStorage.setItem('dobu_users', JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem('dobu_bookings')) {
        const defaultBookings = [
            {
                id: 'BK-101',
                title: 'Jiu-jitsu (Adults)',
                instructor: 'Mauricio Gomez',
                day: 'Monday',
                time: '06:00 - 07:30',
                date: 'Upcoming'
            },
            {
                id: 'BK-102',
                title: 'Muay Thai Fundamentals',
                instructor: 'Morris Davis',
                day: 'Wednesday',
                time: '17:30 - 19:00',
                date: 'Upcoming'
            }
        ];
        localStorage.setItem('dobu_bookings', JSON.stringify(defaultBookings));
    }

    if (!localStorage.getItem('dobu_forum_posts')) {
        const defaultPosts = [
            {
                author: 'Mauricio Gomez (Head Coach)',
                title: 'Welcome New Members - Spring Mat Etiquette & Safety',
                category: 'Announcements',
                time: '2 days ago',
                content: 'Welcome to all newcomers! Please remember to keep fingernails trimmed, wear clean rashguards or gis, and tap early during sparring.'
            },
            {
                author: 'Sarah Nova',
                title: 'Karate Kata Grading Preparation Session this Saturday',
                category: 'Grading',
                time: 'Yesterday',
                content: 'We will be holding extra kata review sessions this Saturday at 14:30. Open to all yellow belts and above.'
            },
            {
                author: 'Alex Johnson',
                title: 'Muay Thai Shin Guards & Glove Recommendations?',
                category: 'Equipment',
                time: '3 hours ago',
                content: 'Looking for durable 14oz or 16oz gloves for general pad work and sparring. What brands do our coaches recommend?'
            }
        ];
        localStorage.setItem('dobu_forum_posts', JSON.stringify(defaultPosts));
    }
})();

// Helper to get currently logged in user
function getCurrentUser() {
    try {
        const user = localStorage.getItem('dobu_current_user');
        return user ? JSON.parse(user) : null;
    } catch (e) {
        return null;
    }
}

// Helper to set logged in user
function setCurrentUser(user) {
    if (user) {
        localStorage.setItem('dobu_current_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('dobu_current_user');
    }
    updateNavAuth();
}

// Update Header Navigation to reflect logged-in state across all pages
function updateNavAuth() {
    const navBtn = document.querySelector('.nav-btn');
    if (!navBtn) return;

    const user = getCurrentUser();
    if (user) {
        const firstName = user.name ? user.name.split(' ')[0] : 'Account';
        navBtn.textContent = `MY ACCOUNT (${firstName})`;
        navBtn.setAttribute('title', `Logged in as ${user.email}`);
    } else {
        navBtn.textContent = 'LOGIN';
        navBtn.removeAttribute('title');
    }
}

// Show a clean, modern toast notification
function showNotification(message, type = 'success') {
    let container = document.getElementById('dobu-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'dobu-toast-container';
        container.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 380px;
        `;
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgColor = type === 'error' ? '#d90429' : (type === 'info' ? '#1d3557' : '#000000');
    toast.style.cssText = `
        background: ${bgColor};
        color: #ffffff;
        padding: 14px 18px;
        border: 2px solid #000;
        border-radius: 6px;
        box-shadow: 4px 4px 0px rgba(0,0,0,0.8);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 14px;
        font-weight: 700;
        line-height: 1.4;
        transition: opacity 0.3s ease, transform 0.3s ease;
        opacity: 0;
        transform: translateY(10px);
    `;
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// BOOKING HELPER: Adds a booking for current user
function bookSession(sessionData) {
    const user = getCurrentUser();
    let bookings = [];
    try {
        bookings = JSON.parse(localStorage.getItem('dobu_bookings') || '[]');
    } catch (e) {
        bookings = [];
    }

    const newBooking = {
        id: 'BK-' + Math.floor(100 + Math.random() * 900),
        title: sessionData.title,
        instructor: sessionData.instructor || 'Staff Coach',
        day: sessionData.day || 'This Week',
        time: sessionData.time || 'Scheduled Time',
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        userEmail: user ? user.email : 'guest@dobu.com'
    };

    bookings.unshift(newBooking);
    localStorage.setItem('dobu_bookings', JSON.stringify(bookings));

    if (user) {
        showNotification(`Confirmed! "${newBooking.title}" booked for ${newBooking.day} (${newBooking.time}). Added to your account.`);
    } else {
        showNotification(`Guest reservation recorded for "${newBooking.title}" (${newBooking.day}, ${newBooking.time}). Sign in to view anytime.`);
    }
}

// Cancel Booking helper
function cancelBooking(bookingId, callback) {
    try {
        let bookings = JSON.parse(localStorage.getItem('dobu_bookings') || '[]');
        bookings = bookings.filter(b => b.id !== bookingId);
        localStorage.setItem('dobu_bookings', JSON.stringify(bookings));
        showNotification('Booking cancelled successfully.', 'info');
        if (typeof callback === 'function') callback();
    } catch (e) {
        console.error(e);
    }
}

// Global modal helper for popups (Forums, Booking, Details)
function openModal(title, contentHtml) {
    let modal = document.getElementById('dobu-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'dobu-modal';
        modal.className = 'dobu-modal-overlay';
        modal.innerHTML = `
            <div class="dobu-modal-window">
                <div class="dobu-modal-header">
                    <h3 id="dobu-modal-title"></h3>
                    <button class="dobu-modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="dobu-modal-body" id="dobu-modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.dobu-modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    document.getElementById('dobu-modal-title').textContent = title;
    document.getElementById('dobu-modal-body').innerHTML = contentHtml;
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('dobu-modal');
    if (modal) modal.classList.remove('active');
}

// Open Forum Modal
function openForumModal() {
    let posts = [];
    try {
        posts = JSON.parse(localStorage.getItem('dobu_forum_posts') || '[]');
    } catch (e) {
        posts = [];
    }

    const postsHtml = posts.map(p => `
        <div class="forum-card">
            <div class="forum-card-header">
                <strong>${escapeHtml(p.title)}</strong>
                <span class="forum-badge">${escapeHtml(p.category)}</span>
            </div>
            <p class="forum-body">${escapeHtml(p.content)}</p>
            <div class="forum-meta">
                <span>Posted by: <em>${escapeHtml(p.author)}</em></span> &bull; <span>${escapeHtml(p.time)}</span>
            </div>
        </div>
    `).join('');

    const contentHtml = `
        <p class="forum-intro">Welcome to the DoBu Martial Arts community board. Connect with teammates, coaches, and training partners.</p>
        <div class="forum-posts-list">${postsHtml}</div>
        <hr class="modal-hr">
        <form id="new-forum-post-form" class="forum-post-form">
            <h4>Start a Discussion</h4>
            <div class="input-group">
                <label for="post-title">TOPIC TITLE</label>
                <input type="text" id="post-title" placeholder="e.g. Sparring tips, Gi fit questions..." required>
            </div>
            <div class="input-group">
                <label for="post-category">CATEGORY</label>
                <select id="post-category">
                    <option value="General Discussion">General Discussion</option>
                    <option value="Technique & Training">Technique & Training</option>
                    <option value="Equipment & Gear">Equipment & Gear</option>
                    <option value="Nutrition & Recovery">Nutrition & Recovery</option>
                </select>
            </div>
            <div class="input-group">
                <label for="post-content">MESSAGE</label>
                <textarea id="post-content" rows="3" placeholder="Write your message to the gym community..." required style="width:100%; padding:10px; border:2px solid #000; border-radius:4px; font-family:inherit; box-sizing:border-box;"></textarea>
            </div>
            <button type="submit" class="sign-in-btn" style="margin-top:5px;">POST TO FORUM</button>
        </form>
    `;

    openModal('DOBU MEMBER COMMUNITY & FORUMS', contentHtml);

    const postForm = document.getElementById('new-forum-post-form');
    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = getCurrentUser();
            const author = user ? user.name : 'Gym Member';
            const title = document.getElementById('post-title').value.trim();
            const category = document.getElementById('post-category').value;
            const text = document.getElementById('post-content').value.trim();

            if (!title || !text) return;

            const newPost = {
                author: author,
                title: title,
                category: category,
                time: 'Just now',
                content: text
            };

            posts.unshift(newPost);
            localStorage.setItem('dobu_forum_posts', JSON.stringify(posts));
            showNotification('Your discussion topic has been published!');
            closeModal();
        });
    }
}

// Open Private Tuition Booking Modal
function openPrivateTuitionModal(coachName = 'Mauricio Gomez') {
    const coaches = [
        'Mauricio Gomez (Head Coach - Judo, BJJ, Karate, Muay Thai)',
        'Sarah Nova (5th Dan Karate)',
        'Guy Victory (2nd Dan BJJ, 1st Dan Judo)',
        'Morris Davis (Muay Thai & 3rd Dan Karate)',
        'Traci Santiago (Strength & Conditioning)',
        'Harpreet Kaur (Physiotherapy & Mobility)'
    ];

    const coachOptions = coaches.map(c => `
        <option value="${escapeHtml(c)}" ${c.includes(coachName) ? 'selected' : ''}>${escapeHtml(c)}</option>
    `).join('');

    const contentHtml = `
        <p>Book 1-on-1 private tuition with our accredited black belts and sports scientists. Fee is <strong>£15.00 / hour</strong>.</p>
        <form id="private-tuition-form">
            <div class="input-group">
                <label for="coach-select">SELECT INSTRUCTOR</label>
                <select id="coach-select" style="width:100%; padding:10px; border:2px solid #000; border-radius:4px; font-family:inherit; font-weight:bold;">
                    ${coachOptions}
                </select>
            </div>
            <div class="input-group">
                <label for="tuition-day">PREFERRED DAY</label>
                <select id="tuition-day" style="width:100%; padding:10px; border:2px solid #000; border-radius:4px; font-family:inherit; font-weight:bold;">
                    <option value="Monday">Monday (08:00 - 12:00 Slots Available)</option>
                    <option value="Tuesday">Tuesday (08:00 - 12:00 Slots Available)</option>
                    <option value="Wednesday">Wednesday (08:00 - 12:00 Slots Available)</option>
                    <option value="Thursday">Thursday (08:00 - 12:00 Slots Available)</option>
                    <option value="Friday">Friday (08:00 - 12:00 Slots Available)</option>
                    <option value="Saturday">Saturday (08:00 - 10:00 Slots Available)</option>
                    <option value="Sunday">Sunday (08:00 - 10:00 Slots Available)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="tuition-time">TIME SLOT (1 HOUR)</label>
                <select id="tuition-time" style="width:100%; padding:10px; border:2px solid #000; border-radius:4px; font-family:inherit; font-weight:bold;">
                    <option value="08:00 - 09:00">08:00 - 09:00</option>
                    <option value="09:00 - 10:00">09:00 - 10:00</option>
                    <option value="10:30 - 11:30">10:30 - 11:30</option>
                    <option value="11:30 - 12:30">11:30 - 12:30</option>
                    <option value="19:00 - 20:00">19:00 - 20:00 (Evening)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="tuition-goal">TRAINING FOCUS / GOAL</label>
                <input type="text" id="tuition-goal" placeholder="e.g. Belt grading, guard passing, boxing footwork..." required>
            </div>
            <button type="submit" class="sign-in-btn">CONFIRM PRIVATE BOOKING (£15.00)</button>
        </form>
    `;

    openModal('BOOK PRIVATE MARTIAL ARTS TUITION', contentHtml);

    const form = document.getElementById('private-tuition-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const coachVal = document.getElementById('coach-select').value.split('(')[0].trim();
            const dayVal = document.getElementById('tuition-day').value;
            const timeVal = document.getElementById('tuition-time').value;

            bookSession({
                title: `Private Tuition (${coachVal})`,
                instructor: coachVal,
                day: dayVal,
                time: timeVal
            });
            closeModal();
        });
    }
}

// Open Free Trial Pass Modal
function openTrialPassModal() {
    const contentHtml = `
        <p>Claim your complimentary 1-Day Trial Pass to experience our martial arts dojo, fitness suite, sauna, and steam room.</p>
        <form id="trial-pass-form">
            <div class="input-group">
                <label for="trial-name">YOUR FULL NAME</label>
                <input type="text" id="trial-name" placeholder="John Doe" required>
            </div>
            <div class="input-group">
                <label for="trial-email">EMAIL ADDRESS</label>
                <input type="email" id="trial-email" placeholder="your@email.com" required>
            </div>
            <div class="input-group">
                <label for="trial-interest">CLASS OF INTEREST</label>
                <select id="trial-interest" style="width:100%; padding:10px; border:2px solid #000; border-radius:4px; font-weight:bold;">
                    <option value="Brazilian Jiu-Jitsu">Brazilian Jiu-Jitsu</option>
                    <option value="Muay Thai Kickboxing">Muay Thai Kickboxing</option>
                    <option value="Karate">Karate</option>
                    <option value="Judo">Judo</option>
                    <option value="Gym & Fitness Suite">Gym & Fitness Suite</option>
                </select>
            </div>
            <button type="submit" class="sign-in-btn">CLAIM FREE PASS</button>
        </form>
    `;

    openModal('CLAIM 1-DAY FREE TRIAL PASS', contentHtml);

    const form = document.getElementById('trial-pass-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('trial-name').value;
            const interest = document.getElementById('trial-interest').value;
            showNotification(`Free Pass generated for ${name}! Please present your email at the front desk.`);
            closeModal();
        });
    }
}

// Utility: escape HTML
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', () => {
    updateNavAuth();

    // Setup responsive mobile navigation toggle across all pages
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader && !mainHeader.querySelector('.mobile-menu-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'mobile-menu-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
        toggleBtn.innerHTML = '<span></span><span></span><span></span>';
        
        const nav = mainHeader.querySelector('nav');
        if (nav) {
            mainHeader.appendChild(toggleBtn);
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nav.classList.toggle('mobile-open');
                toggleBtn.classList.toggle('active');
            });

            // Close mobile menu on link click
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('mobile-open');
                    toggleBtn.classList.remove('active');
                });
            });

            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (!mainHeader.contains(e.target)) {
                    nav.classList.remove('mobile-open');
                    toggleBtn.classList.remove('active');
                }
            });
        }
    }

    // Setup Dark Mode toggle button in header
    if (mainHeader && !mainHeader.querySelector('.theme-toggle-btn')) {
        const themeBtn = document.createElement('button');
        themeBtn.type = 'button';
        themeBtn.className = 'theme-toggle-btn';
        themeBtn.setAttribute('aria-label', 'Toggle Dark / Light Mode');
        themeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.toggleTheme();
        });
        const mobileToggle = mainHeader.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mainHeader.insertBefore(themeBtn, mobileToggle);
        } else {
            mainHeader.appendChild(themeBtn);
        }
        updateThemeToggleIcons();
    }

    // Hook up any member forum buttons
    document.querySelectorAll('.btn-forums, .action-btn').forEach(btn => {
        if (btn.textContent.includes('FORUM')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openForumModal();
            });
        }
    });

    // Hook up trial pass buttons
    document.querySelectorAll('.btn-trial, [data-action="trial"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openTrialPassModal();
        });
    });

    // Hook up private tuition buttons
    document.querySelectorAll('.btn-private-tuition, [data-action="private-tuition"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const coach = btn.getAttribute('data-coach') || 'Mauricio Gomez';
            openPrivateTuitionModal(coach);
        });
    });

    // Initialize interactive calculator on pricing page
    initPricingCalculator();
});

// Interactive Pricing Calculator
function initPricingCalculator() {
    const memSelect = document.getElementById('calc-membership');
    const tuitionInput = document.getElementById('calc-private-tuition');
    const ptInput = document.getElementById('calc-personal-training');
    const passesInput = document.getElementById('calc-fitness-passes');
    const sdCheckbox = document.getElementById('calc-self-defence');

    if (!memSelect || !tuitionInput) return;

    function recalculate() {
        const memPrice = parseFloat(memSelect.value) || 0;
        const tuitionHours = parseInt(tuitionInput.value) || 0;
        const ptHours = ptInput ? (parseInt(ptInput.value) || 0) : 0;
        const passCount = passesInput ? (parseInt(passesInput.value) || 0) : 0;
        const sdCourse = (sdCheckbox && sdCheckbox.checked) ? 180 : 0;

        const tuitionCost = tuitionHours * 15;
        const ptCost = ptHours * 35;
        const passesCost = passCount * 6;
        const total = memPrice + tuitionCost + ptCost + passesCost + sdCourse;

        const privVal = document.getElementById('calc-private-val');
        const ptVal = document.getElementById('calc-pt-val');
        const passesVal = document.getElementById('calc-passes-val');
        const totalDisp = document.getElementById('calc-total-display');
        const breakdown = document.getElementById('calc-breakdown-text');

        if (privVal) privVal.textContent = `${tuitionHours} hrs/mo`;
        if (ptVal) ptVal.textContent = `${ptHours} hrs/mo`;
        if (passesVal) passesVal.textContent = `${passCount} visits`;
        if (totalDisp) totalDisp.textContent = `£${total.toFixed(2)}`;

        let parts = [];
        if (memPrice > 0) {
            const planName = memSelect.options[memSelect.selectedIndex].text.split('(')[0].trim();
            parts.push(`${planName} (£${memPrice})`);
        }
        if (tuitionHours > 0) parts.push(`${tuitionHours}h Tuition (£${tuitionCost})`);
        if (ptHours > 0) parts.push(`${ptHours}h PT (£${ptCost})`);
        if (passCount > 0) parts.push(`${passCount} Passes (£${passesCost})`);
        if (sdCourse > 0) parts.push(`Self-Defence (£180)`);

        if (breakdown) {
            breakdown.textContent = parts.length ? parts.join(' + ') : 'Pay-As-You-Go / No selections';
        }

        const joinBtn = document.getElementById('calc-join-btn');
        if (joinBtn) {
            const selectedText = memSelect.options[memSelect.selectedIndex].text.split('(')[0].trim();
            joinBtn.href = `account.html?action=signup&plan=${encodeURIComponent(selectedText)}`;
        }
    }

    memSelect.addEventListener('change', recalculate);
    tuitionInput.addEventListener('input', recalculate);
    if (ptInput) ptInput.addEventListener('input', recalculate);
    if (passesInput) passesInput.addEventListener('input', recalculate);
    if (sdCheckbox) sdCheckbox.addEventListener('change', recalculate);

    recalculate();
}
