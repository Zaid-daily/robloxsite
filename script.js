/* =========================================
   PORTFOLIO WEBSITE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =========================================
       ELEMENTS
    ========================================= */

    const navbar = document.getElementById("navbar");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const year =
        document.getElementById("year");

    const heroVideo =
        document.querySelector(".hero-video");

    const hero =
        document.querySelector(".hero");


    /* =========================================
       CURRENT YEAR
    ========================================= */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================================
       HERO VIDEO
       Autoplay / muted / loop fallback
    ========================================= */

    if (heroVideo) {

        heroVideo.muted = true;

        heroVideo.loop = true;

        heroVideo.playsInline = true;

        const playVideo = () => {

            const playPromise = heroVideo.play();

            if (playPromise !== undefined) {

                playPromise.catch(() => {

                    /*
                        Some browsers may block autoplay
                        until the user interacts with the page.
                    */

                    console.log(
                        "Hero video autoplay was blocked by the browser."
                    );

                });

            }

        };

        playVideo();

        document.addEventListener(
            "click",
            playVideo,
            {
                once: true
            }
        );

    }


    /* =========================================
       NAVBAR SCROLL
    ========================================= */

    const handleNavbar = () => {

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };

    handleNavbar();

    window.addEventListener(
        "scroll",
        handleNavbar,
        {
            passive: true
        }
    );


    /* =========================================
       MOBILE MENU
    ========================================= */

    if (
        mobileMenuButton &&
        mobileMenu
    ) {

        mobileMenuButton.addEventListener(
            "click",
            () => {

                mobileMenu.classList.toggle("active");

            }
        );


        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }
            );

        });

    }


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetID
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );


    /* =========================================
       ANIMATED COUNTERS
    ========================================= */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }

                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.target
                        );

                    let current = 0;

                    const duration = 1300;

                    const startTime =
                        performance.now();


                    const updateCounter =
                        currentTime => {

                            const progress =
                                Math.min(
                                    (
                                        currentTime -
                                        startTime
                                    ) / duration,
                                    1
                                );


                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            current =
                                Math.floor(
                                    eased * target
                                );


                            counter.textContent =
                                current;


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    updateCounter
                                );

                            } else {

                                counter.textContent =
                                    target;

                            }

                        };


                    requestAnimationFrame(
                        updateCounter
                    );


                    counterObserver.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: 0.7
            }
        );


    counters.forEach(
        counter => {

            counterObserver.observe(
                counter
            );

        }
    );


    /* =========================================
       PORTFOLIO FILTERING
    ========================================= */

    const filterButtons =
        document.querySelectorAll(
            ".filter-button"
        );

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    filterButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    filterButtons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const filter =
                        button.dataset.filter;


                    projectCards.forEach(
                        card => {

                            const category =
                                card.dataset.category;


                            if (
                                filter === "all" ||
                                category === filter
                            ) {

                                card.style.display =
                                    "";

                                requestAnimationFrame(
                                    () => {

                                        card.style.opacity =
                                            "1";

                                        card.style.transform =
                                            "translateY(0)";

                                    }
                                );

                            } else {

                                card.style.opacity =
                                    "0";

                                card.style.transform =
                                    "translateY(10px)";

                                setTimeout(
                                    () => {

                                        card.style.display =
                                            "none";

                                    },
                                    250
                                );

                            }

                        }
                    );

                }
            );

        }
    );


    /* =========================================
       PROJECT MODAL
    ========================================= */

    const modal =
        document.getElementById(
            "projectModal"
        );

    const modalBackdrop =
        document.getElementById(
            "modalBackdrop"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );

    const modalImage =
        document.getElementById(
            "modalImage"
        );

    const modalCategory =
        document.getElementById(
            "modalCategory"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );

    const modalProcess =
        document.getElementById(
            "modalProcess"
        );

    const modalPoly =
        document.getElementById(
            "modalPoly"
        );

    const modalSoftware =
        document.getElementById(
            "modalSoftware"
        );

    const modalTime =
        document.getElementById(
            "modalTime"
        );


    const openModal = card => {

        if (!modal) {
            return;
        }


        modalImage.src =
            card.dataset.image;

        modalImage.alt =
            card.dataset.title;


        modalCategory.textContent =
            card.dataset.category;


        modalTitle.textContent =
            card.dataset.title;


        modalDescription.textContent =
            card.dataset.description;


        modalProcess.textContent =
            card.dataset.process;


        modalPoly.textContent =
            card.dataset.poly;


        modalSoftware.textContent =
            card.dataset.software;


        modalTime.textContent =
            card.dataset.time;


        modal.classList.add(
            "active"
        );


        document.body.classList.add(
            "modal-open"
        );

    };


    const closeModal = () => {

        if (!modal) {
            return;
        }

        modal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "modal-open"
        );

    };


    projectCards.forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    openModal(card);

                }
            );

        }
    );


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (modalBackdrop) {

        modalBackdrop.addEventListener(
            "click",
            closeModal
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeModal();

            }

        }
    );


    /* =========================================
       MODAL CONTACT BUTTON
    ========================================= */

    const modalContact =
        document.querySelector(
            ".modal-contact"
        );


    if (modalContact) {

        modalContact.addEventListener(
            "click",
            () => {

                closeModal();

            }
        );

    }


    /* =========================================
       HERO PARALLAX
    ========================================= */

    if (
        hero &&
        heroVideo &&
        window.matchMedia(
            "(prefers-reduced-motion: no-preference)"
        ).matches
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;

                if (
                    scroll <
                    window.innerHeight
                ) {

                    heroVideo.style.transform =
                        `scale(1.04) translateY(${scroll * 0.08}px)`;

                }

            },
            {
                passive: true
            }
        );

    }


    /* =========================================
       MAGNETIC BUTTON MICRO INTERACTION
    ========================================= */

    const magneticButtons =
        document.querySelectorAll(
            ".button"
        );


    magneticButtons.forEach(
        button => {

            button.addEventListener(
                "mousemove",
                event => {

                    if (
                        window.innerWidth < 800
                    ) {
                        return;
                    }


                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        `translate(${x * 0.04}px, ${y * 0.04}px)`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        }
    );


    /* =========================================
       IMAGE ERROR HANDLING
    ========================================= */

    document.querySelectorAll(
        "img"
    ).forEach(
        image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.background =
                        "linear-gradient(135deg, #11141b, #202431)";

                    image.style.objectFit =
                        "cover";

                }
            );

        }
    );


    /* =========================================
       FORM SUBMISSION
       Formspree AJAX submission
    ========================================= */

    const form =
        document.getElementById(
            "commissionForm"
        );

    const formMessage =
        document.getElementById(
            "formMessage"
        );


    if (form) {

        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const submitButton =
                    form.querySelector(
                        ".form-submit"
                    );


                const originalText =
                    submitButton.innerHTML;


                submitButton.disabled =
                    true;


                submitButton.innerHTML =
                    "Sending Request...";


                formMessage.textContent =
                    "";


                try {

                    const response =
                        await fetch(
                            form.action,
                            {
                                method: "POST",

                                body:
                                    new FormData(form),

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    if (
                        response.ok
                    ) {

                        formMessage.textContent =
                            "Your commission request has been sent.";

                        formMessage.style.color =
                            "#70e89a";

                        form.reset();

                    } else {

                        throw new Error(
                            "Form submission failed."
                        );

                    }

                } catch (error) {

                    formMessage.textContent =
                        "Something went wrong. Please try again or contact me directly.";

                    formMessage.style.color =
                        "#ff7777";

                }


                submitButton.disabled =
                    false;


                submitButton.innerHTML =
                    originalText;

            }
        );

    }

});