// ===== HAMBURGER MENU =====
function toggleMenu() {
    const menu = document.querySelector(".menu");
    const hamburger = document.querySelector(".hamburger");
    menu.classList.toggle("active");
    hamburger.classList.toggle("active");
    }

    document.addEventListener("DOMContentLoaded", () => {

    // ===== HELPER: set initial hidden state =====
    function hide(el, type = "fade") {
        if (!el) return;
        el.style.transition = "none";
        el.style.opacity = "0";
        if (type === "up")   el.style.transform = "translateY(30px)";
        if (type === "left") el.style.transform = "translateX(-40px)";
        if (type === "right") el.style.transform = "translateX(40px)";
        if (type === "scale") el.style.transform = "scale(0.8)";
    }

    function show(el, delay = 0) {
        if (!el) return;
        setTimeout(() => {
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0) translateX(0) scale(1)";
        }, delay);
    }

    function hideInstant(el, type = "fade") {
        if (!el) return;
        el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        el.style.opacity = "0";
        if (type === "up")    el.style.transform = "translateY(30px)";
        if (type === "left")  el.style.transform = "translateX(-40px)";
        if (type === "right") el.style.transform = "translateX(40px)";
        if (type === "scale") el.style.transform = "scale(0.8)";
    }

    // ===== HEADER ANIMATION (auto on load) =====
    const headerH1 = document.querySelector(".header-h1");
    const headerP  = document.querySelector(".header-p");
    const headerBtn = document.querySelector(".header-btn");

    hide(headerH1, "up");
    hide(headerP, "up");
    hide(headerBtn, "up");

    setTimeout(() => show(headerH1), 200);
    setTimeout(() => show(headerP),  450);
    setTimeout(() => show(headerBtn), 700);

    // ===== SCROLL ANIMATION SETUP =====
    // Perkenalan
    const perkenalanH2 = document.querySelector(".perkenalan-h2");
    const perkenalanP  = document.querySelector(".perkenalan-p");
    hide(perkenalanH2, "left");
    hide(perkenalanP, "up");

    // Education
    const educationH2 = document.querySelector(".education-h2");
    const timelineLine = document.querySelector(".timeline-line");
    const circles = document.querySelectorAll(".education-circle-1, .education-circle-2, .education-circle-3");
    const timelineItems = document.querySelectorAll(".timeline-item");

    hide(educationH2, "left");
    timelineLine.style.transition = "none";
    timelineLine.style.width = "0%";
    circles.forEach(c => hide(c, "scale"));
    timelineItems.forEach(item => {
        const text = item.querySelector(".education-1, .education-2, .education-3");
        if (text) hide(text, "up");
    });

    // Skills
    const skillsH2 = document.querySelector(".skills-h2");
    const skillCards = document.querySelectorAll(".skills-1");
    hide(skillsH2, "left");
    skillCards.forEach(card => hide(card, "up"));

    // Contact
    const contactH2   = document.querySelector(".contact-h2");
    const contactLeft  = document.querySelector(".contact-1");
    const contactRight = document.querySelector(".contact-2");
    hide(contactH2, "left");
    hide(contactLeft, "left");
    hide(contactRight, "right");

    // ===== TRACK VISIBILITY =====
    const visibility = {
        perkenalan: false,
        education: false,
        skills: false,
        contact: false,
    };

    function isInView(el, threshold = 0.2) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const wh = window.innerHeight;
        return rect.top < wh * (1 - threshold) && rect.bottom > wh * threshold;
    }

    // ===== SECTION ANIMATIONS =====
    function animatePerkenalan(inView) {
        if (inView && !visibility.perkenalan) {
        visibility.perkenalan = true;
        show(perkenalanH2, 0);
        show(perkenalanP, 200);
        } else if (!inView && visibility.perkenalan) {
        visibility.perkenalan = false;
        hideInstant(perkenalanH2, "left");
        hideInstant(perkenalanP, "up");
        }
    }

    function animateEducation(inView) {
        if (inView && !visibility.education) {
        visibility.education = true;
        show(educationH2, 0);
        setTimeout(() => {
            timelineLine.style.transition = "width 1.5s ease";
            timelineLine.style.width = "100%";
        }, 200);
        circles.forEach((c, i) => show(c, 400 + i * 500));
        timelineItems.forEach((item, i) => {
            const text = item.querySelector(".education-1, .education-2, .education-3");
            if (text) show(text, 550 + i * 500);
        });
        } else if (!inView && visibility.education) {
        visibility.education = false;
        hideInstant(educationH2, "left");
        timelineLine.style.transition = "width 0.5s ease";
        timelineLine.style.width = "0%";
        circles.forEach(c => hideInstant(c, "scale"));
        timelineItems.forEach(item => {
            const text = item.querySelector(".education-1, .education-2, .education-3");
            if (text) hideInstant(text, "up");
        });
        }
    }

    function animateSkills(inView) {
        if (inView && !visibility.skills) {
        visibility.skills = true;
        show(skillsH2, 0);
        skillCards.forEach((card, i) => show(card, 150 + i * 150));
        } else if (!inView && visibility.skills) {
        visibility.skills = false;
        hideInstant(skillsH2, "left");
        skillCards.forEach(card => hideInstant(card, "up"));
        }
    }

    function animateContact(inView) {
        if (inView && !visibility.contact) {
        visibility.contact = true;
        show(contactH2, 0);
        show(contactLeft, 200);
        show(contactRight, 350);
        } else if (!inView && visibility.contact) {
        visibility.contact = false;
        hideInstant(contactH2, "left");
        hideInstant(contactLeft, "left");
        hideInstant(contactRight, "right");
        }
    }

    // ===== SCROLL LISTENER =====
    function checkScroll() {
        animatePerkenalan(isInView(document.querySelector("#perkenalan")));
        animateEducation(isInView(document.querySelector("#education")));
        animateSkills(isInView(document.querySelector("#skills")));
        animateContact(isInView(document.querySelector("#contact")));
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();
}); 