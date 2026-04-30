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

// ─── 3. Hamburger menu animé ───
const menuToggle = document.getElementById("menu-toggle");
const navbar     = document.querySelector(".navbar");
const overlay    = document.querySelector(".nav-overlay");
const navLinks  = document.querySelectorAll(".navbar a");

function openMenu() {
    navbar.classList.add("active");
    overlay.classList.add("show");
    menuToggle.classList.add("open");
    document.body.style.overflow = "hidden"; // bloque le scroll
}

function closeMenu() {
    navbar.classList.remove("active");
    overlay.classList.remove("show");
    menuToggle.classList.remove("open");
    document.body.style.overflow = "";
}

// Clic sur le bouton hamburger
menuToggle.addEventListener("click", () => {
    if (navbar.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Clic sur l'overlay → ferme
overlay.addEventListener("click", closeMenu);

// Clic sur un lien → ferme + smooth scroll
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        closeMenu();
        // Supprime active de tous les liens
        navLinks.forEach(l => l.classList.remove("active"));
        // Ajoute active au lien cliqué
        link.classList.add("active");

        if (href && href.startsWith("#")) {
            e.preventDefault();
            const target = document.getElementById(href.substring(1));
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 300);
            }
        }
    });
});

// Touche Escape → ferme
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
});

// ─── 4. Lien actif au scroll ───

function updateActiveLink() {
    let scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - document.querySelector(".header").offsetHeight;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + section.getAttribute("id")) {
                    link.classList.add("active");
                }
            });
        }
    });
}

// ─── 5. Scroll reveal (IntersectionObserver) ───
const targets = document.querySelectorAll(
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

targets.forEach(el => revealObserver.observe(el));