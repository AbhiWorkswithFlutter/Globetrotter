let user = JSON.parse(localStorage.getItem("user")) || null;
let currentDestination = {}; // Store the current destination for the question

// Fetch a single random destination from the backend
async function fetchDestination() {
    try {
        const response = await fetch('https://globetrotter-urtb.onrender.com/api/games/getQuestion'); // Update with your correct URL
        const data = await response.json();
        console.log('API Response:', data[0]); // Log the response to check the structure

        if (!data || !data[0].name || !Array.isArray(data[0].clues)) {
            throw new Error('Invalid destination data received.');
        }

        // Set current destination
        currentDestination = data[0];
        console.log("Fetched Destination:", currentDestination);
    } catch (error) {
        console.error('Error fetching destination:', error);
        document.getElementById('content').innerHTML = 'Failed to load destination.';
    }
}

// Function to update UI based on user existence
function updateUI() {
    if (user) {
        document.getElementById("register").classList.add("hidden");
        document.getElementById("menu").classList.remove("hidden");
        document.getElementById("content").innerHTML = `
            <p>Welcome back, ${user.username}!</p>
            <p>Your highest score: ${user.highestScore}</p>
        `;
    }
}

// Register a new user
async function registerUser() {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a username");
        return;
    }

    try {
        const response = await fetch(`https://globetrotter-urtb.onrender.com/api/players/getUser?username=${username}`);
        // Update with your correct API
        console.log("response", response)
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const userData = await response.json();
        console.log('User profile:', userData);

        if (userData.length > 0) {
            alert("User Name already exists, please try with other user name.")
        } else {

            try {
                const response = await fetch('https://globetrotter-urtb.onrender.com/api/players/createUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "username": username,
                        "profileicon": "",
                        "highestscore": 0,
                        "games": [],
                        "friends": []
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to register user');
                }

                const userData = await response.json();
                console.log('User registered:', userData);

                user = userData; // Store user object from response
                localStorage.setItem("user", JSON.stringify(user)); // Cache in localStorage for session persistence

                updateUI();
            } catch (error) {
                console.error('Error registering user:', error);
                alert('Registration failed. Please try again.');
            }

        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Error fetching profile. Please try again.');
    }




}


// Show user profile
async function showProfile() {
    console.log("userqq", JSON.stringify(user))
    if (!user || !user[0].username) {
        alert("No user found! Please register.");
        return;
    }

    try {
        const response = await fetch(`https://globetrotter-urtb.onrender.com/api/players/getUser?username=${user[0].username}`);
        // Update with your correct API
        console.log("response", response)
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const userData = await response.json();
        console.log('User profile:', userData);

        document.getElementById("content").innerHTML = `
            <h2>Profile</h2>
            <p><strong>Username:</strong> ${userData[0].username}</p>
            <p><strong>Highest Score:</strong> ${userData[0].highestscore}</p>
            <button onclick="goBackToMenu()">Back to Menu</button>
        `;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Error fetching profile. Please try again.');
    }
}


// Go back to the main menu
function goBackToMenu() {
    document.getElementById("content").innerHTML = "";
    document.getElementById("menu").classList.remove("hidden");
}

// Start game (fetch new destination and display question)
async function startGame() {
    if (user.currentScore > 0) {
        user.currentScore = user.currentScore;
    } else {
        user.currentScore = 0;

    }
    // Reset current score
    await fetchDestination(); // Fetch the first destination

    console.log("Current Destination:", currentDestination);

    if (!currentDestination || !Array.isArray(currentDestination.clues)) {
        console.error('Clues are not available or not in the correct format');
        alert('Error: Clues not available.');
        return;
    }

    // Generate clues display
    let cluesHtml = currentDestination.clues.map(clue => `<p>${clue}</p>`).join("");

    // Generate options (one correct option and random incorrect options)
    let options = [currentDestination.name, "Paris", "New York", "Tokyo"]; // Add random incorrect options
    options = shuffle(options); // Shuffle options to randomize

    let optionsHtml = options.map(option =>
        `<button class="option" onclick="submitAnswer('${option}')">${option}</button>`
    ).join("");

    // Display the clues and options
    document.getElementById("content").innerHTML = `
        <h2>Game Start</h2>
        <p>Guess the destination:</p>
        ${cluesHtml}
        ${optionsHtml}
    `;
}

// Submit answer
async function submitAnswer(selectedAnswer) {
    if (!selectedAnswer) {
        alert("Please select an answer.");
        return;
    }

    // Check if funFacts exist
    let funFact = "No fun fact available.";
    if (Array.isArray(currentDestination.funFacts) && currentDestination.funFacts.length > 0) {
        funFact = currentDestination.funFacts[Math.floor(Math.random() * currentDestination.funFacts.length)];
    }

    alert(`Fun Fact: ${funFact}`);

    // Check answer and update score
    let isCorrect = selectedAnswer === currentDestination.name;
    if (isCorrect) {
        alert("Correct!");
        user.currentScore += 1;
    } else {
        alert("Wrong answer! Try again.");
    }

    // Store the updated score
    localStorage.setItem("user", JSON.stringify(user));

    // Ask if the user wants to continue with the next question
    let continueGame = confirm("Do you want to continue to the next question?");
    if (continueGame) {
        await startGame(); // Start a new question
    } else {
        endGame(); // End the game
    }
}

// End the game and compare scores
async function endGame() {
    alert(`Game Over! Your score: ${user.currentScore}`);
    console.log(user)
    console.log("hi", user.highestscore)

    // Update highest score if necessary
    if (user.currentScore > user[0].highestscore) {

        await fetch('https://globetrotter-urtb.onrender.com/api/players/updateHigestScore', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": user[0].username,
                "profileicon": "",
                "highestscore": user.currentScore,
                "games": [],
                "friends": []
            })
        });

        user.highestScore = user.currentScore;
        localStorage.setItem("user", JSON.stringify(user));
        alert("Congratulations! You've set a new highest score!");
    } else {
        alert("Better luck next time!");
    }
    user.currentScore = 0
    // Go back to menu
    goBackToMenu();
}

// Shuffle the options randomly
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Challenge a friend (Placeholder)
// Challenge a friend (Share feature)
function generateShareImage() {
    const canvas = document.getElementById('shareImageCanvas');

    if (!canvas) {
        console.error("Canvas element not found.");
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Failed to get 2D context for canvas.");
        return;
    }

    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = '#4CAF50'; // Green background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ensure user object exists
    if (!user || !user[0].username ) {
        console.error("User data is missing.");
        return;
    }

    // Draw text (username and score)
    ctx.fillStyle = '#fff'; // White text color
    ctx.font = '20px Arial';
    ctx.fillText(`Player: ${user[0].username}`, 10, 50);
    ctx.fillText(`Score: ${user[0].highestscore}`, 10, 100);
}

// Function to create the WhatsApp invite link
function createInviteLink() {
    if (!user || !user[0].username) {
        console.error("User data is missing for invite.");
        return;
    }
    const inviteLink = `https://globetrotter-urtb.onrender.com/?inviter=${encodeURIComponent(user[0].username)}&score=${user[0].currentScore}`;


    const inviteMessage = `Hey! Join me in playing this awesome game! My score is ${user[0].currentScore}. Play here: ${inviteLink}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(inviteMessage)}`;
    document.getElementById('whatsappInviteLink').href = whatsappLink;
}

// Function to open the challenge friend popup
function challengeFriend() {
    // Retrieve user from localStorage if missing
    if (!user) {
        user = JSON.parse(localStorage.getItem("user"));
    }
    console.log("uu",user)

    // Validate user object
    if (!user || !user[0].username) {
        console.error("User data is missing or invalid.");
        alert("Please log in before challenging a friend.");
        return;
    }

    generateShareImage();
    createInviteLink();

    const sharePopup = document.getElementById('sharePopup');
    if (sharePopup) {
        sharePopup.classList.remove('hidden');
    } else {
        console.error("Share popup not found.");
    }
}


// Function to close the share popup
function closeSharePopup() {
    const sharePopup = document.getElementById('sharePopup');
    if (sharePopup) {
        sharePopup.classList.add('hidden');
    } else {
        console.error("Share popup not found.");
    }
}


function logoutUser() {
    localStorage.removeItem("user"); // Remove user data from local storage
    user = null; // Reset user variable

    // Reset UI to show registration screen
    document.getElementById("register").classList.remove("hidden");
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("content").innerHTML = "<p>You have been logged out.</p>";

    alert("You have successfully logged out.");
}


// Initialize UI on page load
async function updateUI() {
    // Check if a user is stored in localStorage
    let storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("str", storedUser)

    if (storedUser) {
        try {
            // Fetch the latest user data from the backend
            const response = await fetch(`https://globetrotter-urtb.onrender.com/api/players/getUser?username=${storedUser.username}`);
            console.log("asd", storedUser.username)
            if (!response.ok) throw new Error("Failed to fetch user details");
            console.log("b", response)
            user = await response.json(); // Update user data with backend response
            console.log("user", user)
            localStorage.setItem("user", JSON.stringify(user)); // Update local storage

            // Update UI
            document.getElementById("register").classList.add("hidden");
            document.getElementById("menu").classList.remove("hidden");
            document.getElementById("content").innerHTML = `
                <p>Welcome back, ${user[0].username}!</p>
                <p>Your highest score: ${user[0].highestscore}</p>
                <button onclick="logoutUser()">Logout</button>
            `;
        } catch (error) {
            console.error("Error fetching user data:", error);
            localStorage.removeItem("user"); // Remove invalid user data
            user = null;
        }
    }
}


