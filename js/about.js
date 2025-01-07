document.addEventListener("DOMContentLoaded", () => {
    // Section 1: Text Part Activation
    const buttons = document.querySelectorAll("button[data-part]"); // Select all buttons with data-part attribute
    const textParts = document.querySelectorAll(".text-part"); // Select all text-part elements
    let activePart = 2; // Default active part is Background (data-part="2")

    // Hide all text parts except the active one
    const hideAllTextParts = () => {
        textParts.forEach(textPart => {
            textPart.style.display = "none"; // Hide all text parts
            textPart.classList.remove("active"); // Remove active class
            textPart.style.opacity = "0"; // Reset opacity for transitions
            textPart.style.transform = "translateX(50px)"; // Reset transform for transitions
        });
    };

    const activateTextPart = (partNumber) => {
        if (partNumber === activePart) return; // Exit if the selected part is already active

        updateActiveButton(partNumber); // Update the active button's style

        const currentText = document.querySelector(`.text-part[data-part="${activePart}"]`); // Get the currently active text part
        if (currentText) {
            currentText.style.opacity = "0"; // Fade out the current text part quickly
            currentText.style.transition = "opacity 0.4s ease"; // Apply quick fade-out transition
            setTimeout(() => {
                currentText.style.display = "none"; // Hide after transition
                currentText.classList.remove("active"); // Remove active class
            }, 400); // Match the duration of the fade-out transition
        }

        const targetText = document.querySelector(`.text-part[data-part="${partNumber}"]`); // Get the target text part to activate
        if (targetText) {
            targetText.style.display = "block"; // Show the target text part
            targetText.style.opacity = "0"; // Start with opacity 0
            targetText.style.transform = "translateX(50px)"; // Start from the right
            requestAnimationFrame(() => {
                targetText.style.opacity = "1"; // Fade in the text part
                targetText.style.transform = "translateX(0)"; // Move to original position
                targetText.style.transition = "opacity 0.8s ease, transform 0.8s ease"; // Apply smooth transition
            });
            targetText.classList.add("active"); // Add active class
        }

        activePart = partNumber; // Update the active part number
    };

    const updateActiveButton = (partNumber) => {
        buttons.forEach((button) => {
            if (parseInt(button.getAttribute("data-part"), 10) === partNumber) {
                button.classList.add("active"); // Highlight the active button
            } else {
                button.classList.remove("active"); // Remove highlight from inactive buttons
            }
        });
    };

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const partNumber = parseInt(button.getAttribute("data-part"), 10); // Get the part number from button
            activateTextPart(partNumber); // Activate the corresponding text part
        });
    });

    hideAllTextParts(); // Hide all text parts initially

    // Activate the default text part (Background) on page load
    const defaultTextPart = document.querySelector(`.text-part[data-part="${activePart}"]`);
    if (defaultTextPart) {
        defaultTextPart.style.display = "block"; // Show the default text part
        defaultTextPart.style.opacity = "1"; // Ensure it is fully visible
        defaultTextPart.style.transform = "translateX(0)"; // Ensure it is in the correct position
        defaultTextPart.classList.add("active"); // Mark it as active
    }

    activateTextPart(activePart); // Ensure default activation

    // Section 2: Gallery Paragraph Activation
    const galleryButtons = document.querySelectorAll(".button2"); // Select all gallery buttons
    const paragraphs = document.querySelectorAll(".paragraph"); // Select all paragraph elements

    galleryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetClass = button.getAttribute("data-target"); // Get the target class from button

            paragraphs.forEach(paragraph => {
                if (paragraph.classList.contains(targetClass)) {
                    paragraph.classList.add("active"); // Activate matching paragraphs
                } else {
                    paragraph.classList.remove("active"); // Deactivate non-matching paragraphs
                }
            });
        });
    });
});









// active buttons //

document.addEventListener("DOMContentLoaded", () => {
    // Group 1: Filters
    const filterButtons = document.querySelectorAll("#filters .btn");
    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default link behavior

            // Remove 'active' class from all buttons in the group
            filterButtons.forEach(btn => btn.classList.remove("active"));

            // Add 'active' class to the clicked button
            button.classList.add("active");

            console.log("Active filter button:", button.textContent);
        });
    });

    // Group 2: Framework Circles
    const frameworkButtons = document.querySelectorAll("#framework .circle");
    const paragraphs = document.querySelectorAll(".paragraph");

    // Show BLUF content by default
    document.querySelector("#framework .circle[data-target='bluf']").classList.add("active");
    paragraphs.forEach(paragraph => {
        if (paragraph.classList.contains("bluf")) {
            paragraph.classList.add("active");
        } else {
            paragraph.classList.remove("active");
        }
    });

    frameworkButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove 'active' class from all framework buttons
            frameworkButtons.forEach(btn => btn.classList.remove("active"));

            // Add 'active' class to the clicked button
            button.classList.add("active");

            // Show the corresponding paragraph
            const targetClass = button.getAttribute("data-target");
            paragraphs.forEach(paragraph => {
                if (paragraph.classList.contains(targetClass)) {
                    paragraph.classList.add("active");
                } else {
                    paragraph.classList.remove("active");
                }
            });

            console.log("Active framework button:", button.textContent);
        });
    });
});


// expaiding gallery section //

$(document).ready(function () {
    const $grid = $('.grid');

    if (typeof Isotope !== 'undefined') {
        // Initialize Isotope and store the instance in a variable
        const isotopeInstance = $grid.isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            fitRows: {
                gutter: 20 // Space between items
            }
        });

        // Handle filtering
        $('#filters .btn').on('click', function (e) {
            e.preventDefault(); // Prevent default link behavior
            const filterValue = $(this).attr('data-filter');

            // Apply the new filter using the stored Isotope instance
            isotopeInstance.isotope({ filter: filterValue });

            // Update active class on buttons
            $('#filters .btn').removeClass('active');
            $(this).addClass('active');
        });

        // Fallback: Force layout recalculation after a short delay
        setTimeout(function () {
            isotopeInstance.isotope('layout');
        }, 500);
    } else {
        console.error('Isotope library not found.');
    }
});




// end of gallery visbility //

$(document).ready(function () {
    const $grid = $('.grid');

    if (typeof Isotope !== 'undefined') {
        // Initialize Isotope and store the instance
        const isotopeInstance = $grid.isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            fitRows: {
                gutter: 20 // Space between items
            }
        });

        // Handle filtering
        $('#filters .btn').on('click', function (e) {
            e.preventDefault(); // Prevent default link behavior
            const filterValue = $(this).attr('data-filter');

            // Apply the new filter using the stored Isotope instance
            isotopeInstance.isotope({ filter: filterValue });

            // Update active class on buttons
            $('#filters .btn').removeClass('active');
            $(this).addClass('active');

            // Recalculate layout after filtering
            isotopeInstance.isotope('layout');
        });
    } else {
        console.error('Isotope library not found.');
    }
});



// h2 movement //

document.addEventListener('scroll', () => {
    const h2Elements = document.querySelectorAll('h2'); // Select all h2 elements
    const viewportHeight = window.innerHeight; // Get the viewport height
    const midpoint = viewportHeight / 2; // Define the midpoint of the viewport

    h2Elements.forEach(h2 => {
        const h2Position = h2.getBoundingClientRect(); // Get position of h2 relative to the viewport

        if (h2Position.top > viewportHeight) {
            // If h2 is below the viewport
            h2.style.right = '50px';
        } else if (h2Position.top < midpoint) {
            // If h2 is at or above the midpoint
            h2.style.right = '0px';
        } else {
            // Smooth transition between viewport bottom and midpoint
            const distanceFromBottom = viewportHeight - h2Position.bottom;
            const maxDistance = viewportHeight - midpoint;
            const progress = Math.max(0, Math.min(1, distanceFromBottom / maxDistance)); // Clamp progress between 0 and 1
            const newRight = 50 - (progress * 50); // Interpolate between 50px and 0px
            h2.style.right = `${newRight}px`;
        }
    });
});



// Bold keywords //

document.addEventListener("DOMContentLoaded", () => {
    // Section 1: Text Part Activation
    const buttons = document.querySelectorAll("button[data-part]"); // Select all buttons with data-part attribute
    const textParts = document.querySelectorAll(".text-part"); // Select all text-part elements
    let activePart = 2; // Default active part is Background (data-part="2")

    // Keywords to highlight in text parts
    const keywords = ["Agile", "Google", "and technical dept", "websites", "Tableau", "Marketo", "passion", "data", "team", "California", "Customer-Centered", "analysis", "Huge", "Inc", "methodologies", "performance", "Stakeholders", " communication", "diverse", "passion", "high-performing", "measureable", "Tools",  "results", "streamline", "growth", "data-driven", "PMP", "Jira", "SEM", "Publicis", "Hult", "key metrics", "Groupe", "collaboration", "SEO", "measurable", "leadership", "Martech", "innovation", "cross-functional", "adaptability", "Master Business Administration", "photos", "management", "page", "visits", "Project", "Manager", "web", "cross functional", "dashboard", "Northern Trust", "CMS", "user", "engagement"];

    // Function to highlight keywords, percentages, numbers, and symbols in text parts
    const highlightContent = (textPart) => {
        const regexKeywords = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi"); // Match keywords case-insensitively
        const regexDynamicPercentages = /\\b(\\d+)%\\b/g; // Match any number followed by a % symbol
        const regexNumbers = /(?<!\d)(\d+)(?!%)/g; // Match any standalone number not part of a percentage
        const regexSymbols = /([%$#=+0])/g; // Match symbols %, $, #, =, +

        // Highlight keywords, percentages, numbers, and symbols
        textPart.innerHTML = textPart.innerHTML
            .replace(regexKeywords, '<strong>$1</strong>') // Highlight keywords
            .replace(regexDynamicPercentages, '<strong>$1%</strong>') // Highlight percentages including the % symbol
            .replace(regexNumbers, '<strong>$1</strong>') // Highlight standalone numbers
            .replace(regexSymbols, '<strong>$1</strong>'); // Highlight symbols
    };

    // Hide all text parts except the active one
    const hideAllTextParts = () => {
        textParts.forEach(textPart => {
            textPart.style.display = "none"; // Hide all text parts
            textPart.classList.remove("active"); // Remove active class
            textPart.style.opacity = "0"; // Reset opacity for transitions
            textPart.style.transform = "translateX(50px)"; // Reset transform for transitions
        });
    };

    const activateTextPart = (partNumber) => {
        if (partNumber === activePart) return; // Exit if the selected part is already active

        updateActiveButton(partNumber); // Update the active button's style

        const currentText = document.querySelector(`.text-part[data-part="${activePart}"]`); // Get the currently active text part
        if (currentText) {
            currentText.style.opacity = "0"; // Fade out the current text part quickly
            currentText.style.transition = "opacity 0.4s ease"; // Apply quick fade-out transition
            setTimeout(() => {
                currentText.style.display = "none"; // Hide after transition
                currentText.classList.remove("active"); // Remove active class
            }, 400); // Match the duration of the fade-out transition
        }

        const targetText = document.querySelector(`.text-part[data-part="${partNumber}"]`); // Get the target text part to activate
        if (targetText) {
            targetText.style.display = "block"; // Show the target text part
            targetText.style.opacity = "0"; // Start with opacity 0
            targetText.style.transform = "translateX(50px)"; // Start from the right
            requestAnimationFrame(() => {
                targetText.style.opacity = "1"; // Fade in the text part
                targetText.style.transform = "translateX(0)"; // Move to original position
                targetText.style.transition = "opacity 0.8s ease, transform 0.8s ease"; // Apply smooth transition
            });
            targetText.classList.add("active"); // Add active class
            highlightContent(targetText); // Highlight keywords, percentages, numbers, and symbols in the target text part
        }

        activePart = partNumber; // Update the active part number
    };

    const updateActiveButton = (partNumber) => {
        buttons.forEach((button) => {
            if (parseInt(button.getAttribute("data-part"), 10) === partNumber) {
                button.classList.add("active"); // Highlight the active button
            } else {
                button.classList.remove("active"); // Remove highlight from inactive buttons
            }
        });
    };

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const partNumber = parseInt(button.getAttribute("data-part"), 10); // Get the part number from button
            activateTextPart(partNumber); // Activate the corresponding text part
        });
    });

    hideAllTextParts(); // Hide all text parts initially

    // Activate the default text part (Background) on page load
    const defaultTextPart = document.querySelector(`.text-part[data-part="${activePart}"]`);
    if (defaultTextPart) {
        defaultTextPart.style.display = "block"; // Show the default text part
        defaultTextPart.style.opacity = "1"; // Ensure it is fully visible
        defaultTextPart.style.transform = "translateX(0)"; // Ensure it is in the correct position
        defaultTextPart.classList.add("active"); // Mark it as active
        highlightContent(defaultTextPart); // Highlight content in the default text part
    }

    activateTextPart(activePart); // Ensure default activation

    // Section 2: Gallery Paragraph Activation
    const galleryButtons = document.querySelectorAll(".button2"); // Select all gallery buttons
    const paragraphs = document.querySelectorAll(".paragraph"); // Select all paragraph elements

    galleryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetClass = button.getAttribute("data-target"); // Get the target class from button

            paragraphs.forEach(paragraph => {
                if (paragraph.classList.contains(targetClass)) {
                    paragraph.classList.add("active"); // Activate matching paragraphs
                } else {
                    paragraph.classList.remove("active"); // Deactivate non-matching paragraphs
                }
            });
        });
    });
});

// leyend animation removal and add //





// changing color of active paragrahp with buttons //

document.addEventListener("DOMContentLoaded", () => {
    const frameworkButtons = document.querySelectorAll("#framework .circle"); // Select all buttons
    const paragraphs = document.querySelectorAll(".paragraph"); // Select all paragraphs
  
    frameworkButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Remove 'active' class from all framework buttons and paragraphs
        frameworkButtons.forEach(btn => btn.classList.remove("active"));
        paragraphs.forEach(paragraph => paragraph.classList.remove("active"));
  
        // Add 'active' class to the clicked button
        button.classList.add("active");
  
        // Get the background color of the clicked circle
        const activeColor = window.getComputedStyle(button).backgroundColor;
  
        // Set the CSS variable for color
        document.documentElement.style.setProperty('--active-color', activeColor);
  
        // Get the target class from the button's data-target attribute
        const targetClass = button.getAttribute("data-target");
  
        // Activate the corresponding paragraph based on the target class
        paragraphs.forEach(paragraph => {
          if (paragraph.classList.contains(targetClass)) {
            paragraph.classList.add("active");
          }
        });
      });
    });
  });

