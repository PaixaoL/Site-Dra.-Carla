document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MENU MOBILE
    ========================== */

    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("active");

            if (nav.classList.contains("active")) {
                menuToggle.innerHTML = "✕";
            } else {
                menuToggle.innerHTML = "☰";
            }
        });


        // Fecha o menu quando clicar em algum link
        const navLinks = nav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");
                menuToggle.innerHTML = "☰";

            });

        });

    }


    /* =========================
       FAQ
    ========================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            // Fecha todos os outros
            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                otherAnswer.style.maxHeight = null;

            });


            // Abre o selecionado
            if (!isActive) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });


    /* =========================
       FORMULÁRIO → WHATSAPP
    ========================== */

    const form = document.getElementById("contact-form");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const treatment =
                document.getElementById("treatment").value;

            const message =
                document.getElementById("message").value.trim();


            if (!name || !phone) {

                alert(
                    "Por favor, preencha seu nome e WhatsApp."
                );

                return;

            }


            /*
                IMPORTANTE:

                TROQUE O NÚMERO ABAIXO.

                Formato:
                Brasil = 55
                DDD = 11
                Número = 999999999

                Exemplo:
                5511999999999
            */

            const dentistWhatsApp = "5511965061125";


            let whatsappMessage =
                `Olá, Dra. Carla! Gostaria de agendar uma consulta.%0A%0A`;

            whatsappMessage +=
                `*Nome:* ${name}%0A`;

            whatsappMessage +=
                `*WhatsApp:* ${phone}%0A`;

            if (treatment) {

                whatsappMessage +=
                    `*Tratamento de interesse:* ${treatment}%0A`;

            }

            if (message) {

                whatsappMessage +=
                    `*Mensagem:* ${message}%0A`;

            }


            const whatsappURL =
                `https://wa.me/${dentistWhatsApp}?text=${whatsappMessage}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        });

    }


    /* =========================
       HEADER AO ROLAR
    ========================== */

    const header =
        document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 5px 25px rgba(35, 63, 64, 0.08)";

        } else {

            header.style.boxShadow = "none";

        }

    });


    /* =========================
       ANIMAÇÃO AO APARECER
    ========================== */

    const animatedElements =
        document.querySelectorAll(
            ".treatment-card, .differential, .testimonial, .contact-item"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    animatedElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(element);

    });


    /* =========================
       MÁSCARA DE TELEFONE
    ========================== */

    const phoneInput =
        document.getElementById("phone");


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            (event) => {

                let value =
                    event.target.value.replace(/\D/g, "");

                if (value.length > 11) {
                    value = value.substring(0, 11);
                }


                if (value.length <= 10) {

                    value =
                        value.replace(
                            /^(\d{2})(\d)/,
                            "($1) $2"
                        );

                    value =
                        value.replace(
                            /(\d{4})(\d)/,
                            "$1-$2"
                        );

                } else {

                    value =
                        value.replace(
                            /^(\d{2})(\d)/,
                            "($1) $2"
                        );

                    value =
                        value.replace(
                            /(\d{5})(\d)/,
                            "$1-$2"
                        );

                }


                event.target.value = value;

            }
        );

    }


    /* =========================
       ANO AUTOMÁTICO NO FOOTER
    ========================== */

    const footerTexts =
        document.querySelectorAll(".footer-bottom p");

    if (footerTexts.length > 0) {

        const currentYear =
            new Date().getFullYear();

        footerTexts[0].innerHTML =
            `© ${currentYear} Dra. Carla Ghetti Odontologia. Todos os direitos reservados.`;

    }

});
