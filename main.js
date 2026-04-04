/* =============================================
   main.js — Portfolio Nassi Hiba  (FIXED)
   ============================================= */

// ─── 1. Typed.js ───
var typed = new Typed(".text", {
    strings: ["Full Stack Developer", "AI Enthusiast", "AI Engineer"],
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 1200,
    loop: true
});

// ─── 2. EmailJS ───
(function () {
    emailjs.init("2t8-jXMwkgxHsBl9y");
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    emailjs.sendForm("service_wyh87tp", "template_yykqqy7", this)
        .then(function () {
            alert("✅ Message envoyé avec succès !");
            document.getElementById("contact-form").reset();
        }, function (error) {
            alert("❌ Erreur : " + JSON.stringify(error));
        });
});

// ─── 3. Déclarations globales (AVANT tout usage) ───
const sections  = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".navbar a");
const menuToggle = document.getElementById("menu-toggle");
const navbar     = document.querySelector(".navbar");
const overlay    = document.querySelector(".nav-overlay");
const header     = document.querySelector(".header");

// ─── 4. Hamburger menu ───
function openMenu() {
    navbar.classList.add("active");
    overlay.classList.add("show");
    menuToggle.classList.add("open");
    // NE PAS bloquer overflow ici — ça interfère avec scroll-snap
}

function closeMenu() {
    navbar.classList.remove("active");
    overlay.classList.remove("show");
    menuToggle.classList.remove("open");
}

menuToggle.addEventListener("click", () => {
    navbar.classList.contains("active") ? closeMenu() : openMenu();
});

overlay.addEventListener("click", closeMenu);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
});

// ─── 5. Clic sur un lien du menu ───
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");

        // Ferme le menu mobile
        closeMenu();

        // Met à jour le lien actif immédiatement
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        if (href && href.startsWith("#")) {
            e.preventDefault();

            const targetId = href.substring(1);
            const target   = document.getElementById(targetId);

            if (!target) return;

            // FIX PRINCIPAL : désactive temporairement scroll-snap
            // pour que scrollIntoView fonctionne correctement
            document.documentElement.style.scrollSnapType = "none";
            document.body.style.scrollSnapType            = "none";

            target.scrollIntoView({ behavior: "smooth", block: "start" });

            // Réactive le snap après la fin de l'animation (~800ms)
            setTimeout(() => {
                document.documentElement.style.scrollSnapType = "";
                document.body.style.scrollSnapType            = "";
            }, 900);
        }
    });
});

// ─── 6. Lien actif au scroll ───
function updateActiveLink() {
    const scrollY    = window.pageYOffset;
    const headerH    = header ? header.offsetHeight : 70;

    sections.forEach(section => {
        const top    = section.offsetTop - headerH - 10;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + section.getAttribute("id")
                );
            });
        }
    });
}

// Attache bien l'événement scroll (manquait dans l'ancienne version)
window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink(); // appel initial

// ─── 7. Scroll reveal (IntersectionObserver) ───
const revealTargets = document.querySelectorAll(
    ".about-img, .about-text, .services-list div, .project-card, .container1"
);

const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));