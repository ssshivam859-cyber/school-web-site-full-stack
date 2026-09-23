const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const year = document.getElementById("year");

    // =========================
    // CURRENT YEAR
    // =========================

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // =========================
    // MOBILE MENU
    // =========================

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("active");

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.classList.toggle(
                    "fa-bars",
                    !isOpen
                );

                icon.classList.toggle(
                    "fa-xmark",
                    isOpen
                );
            }

        });


        // Close menu after clicking a link

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                document.body.classList.remove(
                    "menu-open"
                );

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );
                }

            });

        });

    }


    // =========================
    // ACTIVE NAVIGATION
    // =========================

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const links =
        document.querySelectorAll(
            ".nav-links a"
        );


    function updateActiveLink() {

        let currentId = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {
                currentId = section.id;
            }

        });


        links.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentId}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();

// =========================
// CONTACT FORM
// =========================

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const formData = {
            studentName: contactForm.elements.studentName.value.trim(),
            phone: contactForm.elements.phone.value.trim(),
            email: contactForm.elements.email.value.trim(),
            class: contactForm.querySelector('[name="class"]').value,
            message: contactForm.elements.message.value.trim()
        };

        try {

            const response = await fetch(
                "http://localhost:5000/api/enquiries",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok && data.success) {

                alert("Thank you! Your enquiry has been submitted successfully.");

                contactForm.reset();

            } else {

                alert(data.message || "Something went wrong!");

            }

        } catch (error) {

            console.error("Error:", error);

            alert("Cannot connect to the server. Make sure the backend is running.");

        }

    });

}