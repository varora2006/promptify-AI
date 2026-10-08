/* =====================================================
   PROMPTIFY AI — MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const sections = document.querySelectorAll("section[id]");

    const updateActiveNav = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 160;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =================================================
       SCROLL REVEAL ANIMATION
    ================================================= */

    const revealElements = document.querySelectorAll(
        ".feature-card, .step, .example-box, .about-content, .about-visual"
    );

    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform = "translateY(35px)";

        element.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

    });

    const revealOnScroll = () => {

        const windowHeight = window.innerHeight;

        revealElements.forEach(element => {

            const elementTop =
                element.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {

                element.style.opacity = "1";

                element.style.transform = "translateY(0)";

            }

        });

    };

    window.addEventListener("scroll", revealOnScroll);

    revealOnScroll();


    /* =================================================
       AI TYPING EFFECT
    ================================================= */

    const inputText =
        document.querySelector(".input-preview p");

    if (inputText) {

        const originalText =
            inputText.textContent.trim();

        inputText.textContent = "";

        let index = 0;

        const typeText = () => {

            if (index < originalText.length) {

                inputText.textContent +=
                    originalText.charAt(index);

                index++;

                setTimeout(typeText, 55);

            }

        };

        setTimeout(typeText, 1200);

    }


    /* =================================================
       AI CARD HOVER EFFECT
    ================================================= */

    const aiCard =
        document.querySelector(".ai-card");

    if (aiCard) {

        aiCard.addEventListener("mousemove", (event) => {

            const rect =
                aiCard.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            aiCard.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        aiCard.addEventListener("mouseleave", () => {

            aiCard.style.transform = "";

        });

    }


    /* =================================================
       FEATURE CARD TILT
    ================================================= */

    const featureCards =
        document.querySelectorAll(".feature-card");

    featureCards.forEach(card => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 5;

            const rotateX =
                ((y / rect.height) - 0.5) * -5;

            card.style.transform =
                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =================================================
       BUTTON RIPPLE EFFECT
    ================================================= */

    const buttons =
        document.querySelectorAll(
            ".primary-btn, .secondary-btn, .login-btn"
        );

    buttons.forEach(button => {

        button.addEventListener("click", function (event) {

            const ripple =
                document.createElement("span");

            const rect =
                this.getBoundingClientRect();

            const size =
                Math.max(rect.width, rect.height);

            ripple.style.width = `${size}px`;

            ripple.style.height = `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            ripple.style.position = "absolute";

            ripple.style.borderRadius = "50%";

            ripple.style.background =
                "rgba(255,255,255,0.25)";

            ripple.style.transform = "scale(0)";

            ripple.style.pointerEvents = "none";

            ripple.style.animation =
                "buttonRipple 0.6s ease-out";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });


    /* =================================================
       ADD RIPPLE ANIMATION
    ================================================= */

    const rippleStyle =
        document.createElement("style");

    rippleStyle.innerHTML = `

        @keyframes buttonRipple {

            0% {
                transform: scale(0);
                opacity: 1;
            }

            100% {
                transform: scale(2.5);
                opacity: 0;
            }

        }

    `;

    document.head.appendChild(rippleStyle);


    /* =================================================
       COUNTER ANIMATION
    ================================================= */

    const stats =
        document.querySelectorAll(".stat strong");

    const animateCounter = (element) => {

        const text =
            element.textContent.trim();

        const numberMatch =
            text.match(/\d+/);

        if (!numberMatch) return;

        const number =
            parseInt(numberMatch[0]);

        const suffix =
            text.replace(numberMatch[0], "");

        let current = 0;

        const duration = 1200;

        const steps = 35;

        const increment =
            number / steps;

        let step = 0;

        const counter =
            setInterval(() => {

                current += increment;

                step++;

                if (step >= steps) {

                    current = number;

                    clearInterval(counter);

                }

                element.textContent =
                    Math.floor(current) + suffix;

            }, duration / steps);

    };


    let counterStarted = false;

    const startCounters = () => {

        if (counterStarted) return;

        const heroStats =
            document.querySelector(".hero-stats");

        if (!heroStats) return;

        const position =
            heroStats.getBoundingClientRect().top;

        if (position < window.innerHeight - 80) {

            counterStarted = true;

            stats.forEach(stat => {
                animateCounter(stat);
            });

        }

    };

    window.addEventListener("scroll", startCounters);

    startCounters();


    /* =================================================
       EXAMPLE BOX HOVER
    ================================================= */

    const outputItems =
        document.querySelectorAll(".output-item");

    outputItems.forEach((item, index) => {

        item.addEventListener("mouseenter", () => {

            item.style.transition =
                "0.35s ease";

            item.style.transform =
                "translateX(10px) scale(1.02)";

        });

        item.addEventListener("mouseleave", () => {

            item.style.transform = "";

        });

    });


    /* =================================================
       FLOATING PARTICLES
    ================================================= */

    const hero =
        document.querySelector(".hero");

    if (hero) {

        for (let i = 0; i < 18; i++) {

            const particle =
                document.createElement("span");

            particle.classList.add(
                "ai-particle"
            );

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            particle.style.animationDelay =
                `${Math.random() * 5}s`;

            particle.style.animationDuration =
                `${4 + Math.random() * 5}s`;

            hero.appendChild(particle);

        }

        const particleStyle =
            document.createElement("style");

        particleStyle.innerHTML = `

            .ai-particle {

                position: absolute;

                width: 5px;

                height: 5px;

                border-radius: 50%;

                background: #9b7cff;

                opacity: 0.25;

                pointer-events: none;

                animation:
                    particleFloat
                    6s ease-in-out infinite;

            }

            @keyframes particleFloat {

                0%, 100% {

                    transform:
                        translate3d(0,0,0)
                        scale(1);

                    opacity: 0.15;

                }

                50% {

                    transform:
                        translate3d(
                            20px,
                            -35px,
                            0
                        )
                        scale(1.5);

                    opacity: 0.55;

                }

            }

        `;

        document.head.appendChild(particleStyle);

    }


    /* =================================================
       CURRENT YEAR
    ================================================= */

    const copyright =
        document.querySelector(".copyright");

    if (copyright) {

        const year =
            new Date().getFullYear();

        copyright.innerHTML =
            copyright.innerHTML.replace(
                "2025",
                year
            );

    }


    /* =================================================
       CONSOLE MESSAGE
    ================================================= */

    console.log(
        "%c✨ Promptify AI Loaded Successfully!",
        "color:#7657ff;font-size:18px;font-weight:bold;"
    );

    console.log(
        "%cSimple Ideas. Powerful Results.",
        "color:#9b7cff;font-size:14px;"
    );

});