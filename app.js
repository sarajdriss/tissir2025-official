/*==========================================================
 TISSIR 2025
 app.js
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*======================================================
      LOADER
    ======================================================*/

    const loader = document.getElementById("loader");

    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
            }, 600);
        });
    }

    /*======================================================
      SMOOTH SCROLL
    ======================================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });


    /*======================================================
      STICKY HEADER
    ======================================================*/

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 80) {

            header.style.background = "rgba(255,255,255,.98)";
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

        } else {

            header.style.background = "rgba(255,255,255,.92)";
            header.style.boxShadow = "none";

        }

    });


    /*======================================================
      BACK TO TOP
    ======================================================*/

    const topBtn = document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                topBtn.style.display = "flex";

            } else {

                topBtn.style.display = "none";

            }

        });

        topBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    /*======================================================
      COUNTERS
    ======================================================*/

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let current = 0;

            const speed = target / 120;

            const update = () => {

                current += speed;

                if (current < target) {

                    counter.textContent = Math.floor(current);

                    requestAnimationFrame(update);

                } else {

                    counter.textContent = target;

                }

            };

            update();

            counterObserver.unobserve(counter);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => counterObserver.observe(counter));


    /*======================================================
      SCROLL REVEAL
    ======================================================*/

    const revealElements = document.querySelectorAll(

        ".card, .quality-box, .stat, .step, .about-image, .about-text"

    );

    revealElements.forEach(el => {

        el.style.opacity = "0";

        el.style.transform = "translateY(40px)";

        el.style.transition = ".7s ease";

    });

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {

        threshold: .15

    });

    revealElements.forEach(el => revealObserver.observe(el));


    /*======================================================
      ACTIVE MENU
    ======================================================*/

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".navbar ul li a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if (pageYOffset >= top) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });


    /*======================================================
      CONTACT FORM
    ======================================================*/

    const form = document.querySelector("form");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const inputs = form.querySelectorAll("input, textarea");

            let valid = true;

            inputs.forEach(input => {

                if (input.value.trim() === "") {

                    input.style.border = "2px solid #d9534f";

                    valid = false;

                } else {

                    input.style.border = "1px solid #ddd";

                }

            });

            if (!valid) {

                alert("Veuillez remplir tous les champs.");

                return;

            }

            alert("Merci ! Votre message a été envoyé.");

            form.reset();

        });

    }


    /*======================================================
      PARALLAX HERO
    ======================================================*/

    const hero = document.querySelector(".hero");

    if (hero) {

        window.addEventListener("scroll", () => {

            hero.style.backgroundPositionY =

                window.pageYOffset * 0.45 + "px";

        });

    }


    /*======================================================
      SIMPLE TYPING EFFECT
    ======================================================*/

    const heroTitle = document.querySelector(".hero h1");

    if (heroTitle) {

        const text = heroTitle.innerHTML.replace(/<br>/g, "\n");

        heroTitle.innerHTML = "";

        let i = 0;

        function typing() {

            if (i < text.length) {

                if (text.charAt(i) === "\n") {

                    heroTitle.innerHTML += "<br>";

                } else {

                    heroTitle.innerHTML += text.charAt(i);

                }

                i++;

                setTimeout(typing, 35);

            }

        }

        typing();

    }

});

/*==========================================================
 END
==========================================================*/
