# DoBu Martial Arts Website

A multi-page, athletic, responsive web application designed and built for **DoBu Martial Arts** (Mecca Street, Amman, Jordan) as part of Pearson BTEC Higher National Certificate in Computing (Unit 13: Website Design & Development).

## 🥋 Live Website
- **Live URL:** [https://dgamermohammad09.github.io/dobu-martial-arts/](https://dgamermohammad09.github.io/dobu-martial-arts/)
- **Hosting Platform:** GitHub Pages (Free Static Cloud Hosting with HTTPS / TLS 1.3 & Global CDN)

---

## 📌 Features & Pages
1. **Home (`index.html`):** Overview of DoBu Martial Arts dojo, training philosophy, disciplines overview, facilities (2,500 sq ft tatami dojo, sauna, steam room), and vocational details on Mecca Street, Amman.
2. **Timetable (`timetable.html`):** Complete 7-day class schedule matrix (06:00 to 21:00) with dynamic category filtering and session booking engine.
3. **Instructors (`instructors.html`):** Detailed coaching credentials for all 6 instructors (Mauricio Gomez, Sarah Nova, Guy Victory, Morris Davis, Traci Santiago, Harpreet Kaur) with 1-on-1 private tuition modal booking (£15/hr).
4. **Pricing (`pricing.html`):** Transparent membership tiers, specialist courses, collapsible FAQ, and real-time interactive training cost calculator.
5. **Account & Portal (`account.html`):** Member login and sign-up with client-side session management (`localStorage`), active plan switcher, and class reservation dashboard.

---

## 🎨 UI & Design Implementation
- **Design Language:** Neo-Brutalist athletic aesthetic with solid 3px borders, crisp typography, and responsive grid layouts.
- **Login Form Template Inspiration:** Adapted and customized from [FreeFrontend Neo-Brutalism Login Page](https://freefrontend.com/css-login-forms/#2025-08-25-neo-brutalism-login-page-using-css-l) with bespoke warm cream / sukari (`#eed9b3`) offset shadow and strict dark mode style isolation.
- **Dark Mode Support:** Automatic system OS theme detection (`prefers-color-scheme: dark`) with manual header toggle (☀️/🌙).
- **Mobile Responsive:** Fluid drawer navigation (`☰`) for tablets and mobile viewports (&le; 850px).

---

## 🛠️ Technology Stack
- **HTML5:** Semantic landmark architecture (`header`, `nav`, `main`, `section`, `article`, `footer`).
- **CSS3:** Custom properties (CSS variables), Flexbox, CSS Grid, media queries.
- **JavaScript (Vanilla ES6+):** Dynamic DOM manipulation, pricing calculator math, timetable filtering, modal dialogs, and `localStorage` persistence.
- **Hosting & Deployment:** GitHub Pages automated deployment via Git.
