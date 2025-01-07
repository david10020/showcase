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
    const messageElement = document.getElementById('welcome-message');

    // Display the personalized message or default if parameters are missing
    if (name && type && skills) {
        messageElement.innerHTML = `Hello, ${name}! You are a ${type} skilled in ${skills}. Welcome to my website!`;
    } else {
        messageElement.innerHTML = "Hello! Welcome to my website.";
    }
});
