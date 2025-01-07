document.addEventListener("DOMContentLoaded", () => {
    // Function to get the value of a specific parameter from the URL
    function getURLParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the values of 'name', 'type', and 'skills' from the URL
    const name = getURLParameter('name');
    const type = getURLParameter('type');
    const skills = getURLParameter('skills');

    // Find the element to display the message
    const messageElement = document.getElementById('welcome');

    // Display the message based on available parameters
    if (name) {
        // Check if both 'type' and 'skills' are present
        if (type && skills) {
            messageElement.innerHTML = `Hello, ${name}! You are a ${type} skilled in ${skills}. Welcome to my website!`;
        } else {
            // If only 'name' is provided
            messageElement.innerHTML = `Glad you're here, ${name}! Let’s dive in!`;
        }
    } else {
        // If 'name' is not present, show a generic message
        messageElement.innerHTML = "";
    }
});
