// ============================================
// CAT & DOG FACTS APPLICATION - JAVASCRIPT FILE
// ============================================
//
// GOAL:
// Create a fun, educational web application that displays random cat and dog facts
// with matching images to help people learn about animals while enjoying
// beautiful pictures.
//
// SOLUTION PROVIDED:
// This application solves the problem of finding interesting animal facts and
// matching images by:
// 1. Fetching random facts from free APIs (Meow Facts for cats, Dog API for dogs)
// 2. Allowing users to toggle between cat and dog facts
// 3. Extracting keywords from facts to find relevant images
// 4. Loading images from multiple sources with fallback options
// 5. Providing a responsive design that works on all devices
// 6. Handling errors gracefully so the app always works
//
// TECHNOLOGIES USED:
// - Free APIs (no API key needed):
//   * Meow Facts API (https://meowfacts.herokuapp.com/) for cat facts
//   * Dog API (https://dogapi.dog) for dog facts
//   * Cataas for cat images
//   * Dog CEO API (https://dog.ceo) for dog images
//   * RandomDog API for dog images
//   * Picsum Photos for fallback images
// - JavaScript for functionality
// - HTML/CSS for display
//
// ============================================

// ============================================
// WHAT IS A CONSTANT? (const)
// ============================================
// A constant is a variable that never changes
// We use 'const' to store values that stay the same
// Example: const myName = "John"; (myName will always be "John")
// ============================================

// Store the API URLs (web addresses) where we get facts from
// These URLs never change, so we use 'const'
const CAT_FACT_API_URL = 'https://meowfacts.herokuapp.com/';
const DOG_FACT_API_URL = 'https://dogapi.dog/api/v2/facts?limit=1';

// ============================================
// WHAT IS A FUNCTION?
// ============================================
// A function is a block of code that does a specific job
// You can "call" (use) a function whenever you need it
// Example: function sayHello() { console.log("Hello!"); }
// Then you call it: sayHello(); (this prints "Hello!")
// ============================================

// ============================================
// FUNCTION: Extract Keywords from Text
// ============================================
// Purpose: Take a cat fact sentence and find important words
// Example: "Cats sleep 12 hours per day" → "sleep, hours, day"
// 
// How it works:
// 1. Remove common words like "the", "a", "is"
// 2. Remove punctuation (., !, ?, etc.)
// 3. Keep only words longer than 3 letters
// 4. Return the 3 most important words
// ============================================

function extractKeywords(factText) {
    // STEP 1: Create a list of words we want to ignore
    // These are common words that don't help us find images
    // Example: "the", "a", "is", "are", etc.
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who', 'when', 'where', 'why', 'how', 'cat', 'cats', 'cat\'s', 'cats\'', 'about'];
    
    // STEP 2: Process the text to find important words
    const words = factText.toLowerCase()  // Make all letters lowercase: "CAT" → "cat"
        .replace(/[^\w\s]/g, ' ')         // Remove punctuation: "cat!" → "cat "
        .split(/\s+/)                      // Split into separate words: "cat sleeps" → ["cat", "sleeps"]
        .filter(word => word.length > 3 && !commonWords.includes(word))  // Keep only long words that aren't common
        .slice(0, 3);                      // Take only the first 3 words
    
    // STEP 3: Return the keywords, or "cat" if no keywords found
    // The ? : is called a "ternary operator" - it's like a mini if/else
    // If words.length > 0 (we found words), return them joined with commas
    // Otherwise, return "cat" as default
    return words.length > 0 ? words.join(',') : 'cat';
}

// ============================================
// FUNCTION: Generate Number from Keywords
// ============================================
// Purpose: Convert text keywords into a number
// Why? We use this number to get different images based on keywords
// Example: "sleep, hours" → 12345 (a number)
// 
// How it works:
// 1. Look at each letter in the keywords
// 2. Convert each letter to a number (A=65, B=66, etc.)
// 3. Mix all numbers together to create one big number
// 4. Return that number
// ============================================

function generateSeedFromKeywords(keywords) {
    // Start with 0
    let hash = 0;
    
    // STEP 1: Loop through each character in the keywords
    // A "for loop" repeats code for each item
    // Example: for (let i = 0; i < 3; i++) means "do this 3 times"
    for (let i = 0; i < keywords.length; i++) {
        // Get the number code for this character
        // Every letter has a number: 'a' = 97, 'b' = 98, etc.
        const char = keywords.charCodeAt(i);
        
        // STEP 2: Mix this character's number into our hash
        // This is a math formula that combines numbers
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Make sure it's a normal number (not too big)
    }
    
    // STEP 3: Return the final number (always positive)
    // Math.abs() makes sure the number is positive (no negative numbers)
    return Math.abs(hash);
}

// ============================================
// WHAT IS AN ARRAY?
// ============================================
// An array is a list of items stored together
// Example: const fruits = ["apple", "banana", "orange"];
// You can access items by number: fruits[0] = "apple"
// Arrays start counting from 0 (not 1!)
// ============================================

// ============================================
// BACKUP IMAGES (Fallback Images)
// ============================================
// These are images stored on our computer/server
// We use them if the internet images don't work
// Think of it like a backup plan!
// ============================================

// Create an array (list) of image file paths
// These are the paths to images in our "img" folder
const LOCAL_FALLBACK_IMAGES = [
    'img/9f6f45d0-d962-4bcf-900a-305f94991f8b.jpg',  // Image 1
    'img/34b891b8-99ec-4a76-8d95-4d1d897f9447.jpg',  // Image 2
    'img/5097f27e-b4f5-40cc-ab1a-7622579977db.jpg',  // Image 3
    'img/b8e21773-f979-4598-b496-03503e7bbd31.jpg'   // Image 4
];

// ============================================
// FUNCTION: Get Random Image from List
// ============================================
// Purpose: Pick one random image from our backup list
// How it works:
// 1. Generate a random number (0, 1, 2, or 3)
// 2. Use that number to pick an image from the array
// 3. Return the image path
// ============================================

function getRandomLocalImage() {
    // STEP 1: Generate a random number between 0 and 3
    // Math.random() gives a number between 0 and 1 (like 0.7)
    // Multiply by array length (4) to get 0-4 (like 2.8)
    // Math.floor() rounds down (2.8 → 2)
    const randomIndex = Math.floor(Math.random() * LOCAL_FALLBACK_IMAGES.length);
    
    // STEP 2: Use that number to get an image from the array
    // If randomIndex = 2, we get LOCAL_FALLBACK_IMAGES[2] (the 3rd image)
    return LOCAL_FALLBACK_IMAGES[randomIndex];
}

// ============================================
// WHAT IS THE DOM?
// ============================================
// DOM = Document Object Model
// It's how JavaScript talks to HTML elements on the page
// 
// document.getElementById('id-name') finds an HTML element
// Example: <div id="myDiv">Hello</div>
// Then: const myDiv = document.getElementById('myDiv');
// Now we can change it: myDiv.textContent = "Goodbye";
// ============================================

// ============================================
// GET HTML ELEMENTS FROM THE PAGE
// ============================================
// We need to "grab" HTML elements so we can change them with JavaScript
// Each element has an ID in the HTML file
// We store them in variables so we can use them later
// ============================================

// Get elements related to the fact (text)
const loadingEl = document.getElementById('loading');           // The "Loading..." message
const factDisplayEl = document.getElementById('fact-display');  // The box that shows the fact
const factTextEl = document.getElementById('fact-text');         // The text inside the fact box
const errorEl = document.getElementById('error');                // The error message box
const newFactBtn = document.getElementById('new-fact-btn');      // The button to get new facts

// Get elements related to the image
const imageLoadingEl = document.getElementById('image-loading'); // The "Loading image..." message
const catImageEl = document.getElementById('cat-image');       // The <img> tag that shows the animal
const imageErrorEl = document.getElementById('image-error');     // The error message for images

// Get elements for animal toggle
const toggleAnimalBtn = document.getElementById('toggle-animal'); // Button to switch between cat/dog
const toggleText = document.getElementById('toggle-text');         // Text inside toggle button
const headerTitle = document.getElementById('header-title');        // Main title (🐱 Cat Facts)
const headerSubtitle = document.getElementById('header-subtitle'); // Subtitle text

// Track current animal type (cat or dog)
let currentAnimalType = 'cat'; // Start with cats

// ============================================
// HOW TO REQUEST IMAGES FROM THE INTERNET
// ============================================
// Step 1: We create an image URL (web address of the image)
// Step 2: We set the <img> tag's src attribute to that URL
// Step 3: The browser automatically downloads and displays the image
// Step 4: If one image fails, we try the next one (fallback system)
// ============================================

// ============================================
// FUNCTION: Fetch Animal Image (Cat or Dog)
// ============================================
// Purpose: Get an image based on animal type and keywords
// Works for both cats and dogs
// ============================================

function fetchAnimalImage(keywords, animalType = 'cat') {
    // Show loading message, hide image and any errors
    imageLoadingEl.style.display = 'block';
    catImageEl.style.display = 'none';
    imageErrorEl.style.display = 'none';
    
    console.log('Searching for cat image with keywords:', keywords);
    
    // Generate a number from keywords (for variety in images)
    const seed = generateSeedFromKeywords(keywords);
    
    // STEP 1: Create a list of image URLs to try
    // We try multiple sources in case one doesn't work
    // Different sources for cats vs dogs
    let attempt = 0;
    let imageSources = [];
    
    if (animalType === 'dog') {
        // Dog image sources
        imageSources = [
            `https://dog.ceo/api/breeds/image/random`, // Source 1: Random dog image from Dog CEO API
            `https://random.dog/woof.json`, // Source 2: Random dog from RandomDog API
            `https://picsum.photos/seed/${seed}/600/400` // Source 3: Random photo (based on keywords)
        ];
    } else {
        // Cat image sources
        imageSources = [
            `https://cataas.com/cat?t=${Date.now()}`, // Source 1: Random cat image
            `https://picsum.photos/seed/${seed}/600/400`, // Source 2: Random photo (based on keywords)
            `https://cataas.com/cat/gif?t=${Date.now()}` // Source 3: Cat GIF as backup
        ];
    }
    
    // Function to try loading an image
    const tryLoadImage = () => {
        // If we tried all online sources and they all failed, use local images
        if (attempt >= imageSources.length) {
            console.log('All online sources failed, using local fallback image');
            const localImage = getRandomLocalImage();
            
            // STEP 2: Set the image source - browser will load it automatically
            catImageEl.onload = () => {
                // Image loaded successfully! Show it and hide loading
                imageLoadingEl.style.display = 'none';
                catImageEl.style.display = 'block';
                imageErrorEl.style.display = 'none';
            };
            
            catImageEl.onerror = () => {
                // Even local image failed - show error message
                console.error('Local fallback image also failed');
                imageLoadingEl.style.display = 'none';
                imageErrorEl.style.display = 'block';
                catImageEl.style.display = 'none';
            };
            
            // Set the image source - this triggers the browser to load the image
            catImageEl.src = localImage;
            return;
        }
        
        // Get the current image URL to try
        let imageUrl = imageSources[attempt];
        console.log(`Attempting to load image from source ${attempt + 1}:`, imageUrl);
        
        // STEP 2: Handle different API types
        // Some APIs return JSON, others return direct images
        if (animalType === 'dog' && attempt === 0) {
            // Dog CEO API returns JSON with image URL
            fetch('https://dog.ceo/api/breeds/image/random')
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        catImageEl.src = data.message; // Set image URL from JSON response
                    } else {
                        attempt++;
                        tryLoadImage();
                    }
                })
                .catch(() => {
                    attempt++;
                    tryLoadImage();
                });
        } else if (animalType === 'dog' && attempt === 1) {
            // RandomDog API also returns JSON
            fetch('https://random.dog/woof.json')
                .then(response => response.json())
                .then(data => {
                    if (data.url) {
                        catImageEl.src = data.url; // Set image URL from JSON response
                    } else {
                        attempt++;
                        tryLoadImage();
                    }
                })
                .catch(() => {
                    attempt++;
                    tryLoadImage();
                });
        } else {
            // For other sources (cats or fallback), use direct image URL
            catImageEl.src = imageUrl;
        }
        
        // STEP 3: When image loads successfully
        catImageEl.onload = () => {
            // Success! Hide loading, show image
            imageLoadingEl.style.display = 'none';
            catImageEl.style.display = 'block';
            imageErrorEl.style.display = 'none';
        };
        
        // STEP 4: If image fails to load, try the next source
        catImageEl.onerror = () => {
            console.log(`Source ${attempt + 1} failed, trying next...`);
            attempt++; // Move to next image source
            tryLoadImage(); // Try again with next image
        };
    };
    
    // Start trying to load images
    tryLoadImage();
}

// ============================================
// HOW TO GET CAT FACTS FROM API (JSON RESPONSE)
// ============================================
// Step 1: We send a request to the API using fetch()
// Step 2: The API sends back a JSON response that looks like this:
//         {
//           "data": ["Cats have 32 muscles in each ear."]
//         }
// Step 3: We convert the JSON response to JavaScript object using .json()
// Step 4: We get the fact text from data.data[0] (first item in the array)
// ============================================

// ============================================
// FUNCTION: Fetch Cat Fact from API
// ============================================
// Purpose: Get a random cat fact from Meow Facts API
// JSON Response format: { "data": ["Fact text here"] }
// ============================================

async function fetchCatFact() {
    try {
        // Show loading message to user
        loadingEl.style.display = 'block';
        factDisplayEl.style.display = 'none';
        errorEl.style.display = 'none';
        
        // STEP 1: Send request to API
        const response = await fetch(CAT_FACT_API_URL);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // STEP 2: Convert JSON response to JavaScript object
        const data = await response.json();
        // Example: data = { "data": ["Cats sleep 12-16 hours per day."] }
        
        // STEP 3: Get the fact text from the JSON response
        const factText = data.data[0];
        
        // STEP 4: Display the fact on the webpage
        factTextEl.textContent = factText;
        loadingEl.style.display = 'none';
        factDisplayEl.style.display = 'block';
        
        return factText;
        
    } catch (error) {
        console.error('Error fetching cat fact:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
        return null;
    }
}

// ============================================
// FUNCTION: Fetch Dog Fact from API
// ============================================
// Purpose: Get a random dog fact from Dog API
// JSON Response format: { "data": [{ "attributes": { "body": "Fact text here" } }] }
// ============================================

async function fetchDogFact() {
    try {
        // Show loading message to user
        loadingEl.style.display = 'block';
        factDisplayEl.style.display = 'none';
        errorEl.style.display = 'none';
        
        // STEP 1: Send request to Dog API
        const response = await fetch(DOG_FACT_API_URL);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // STEP 2: Convert JSON response to JavaScript object
        const data = await response.json();
        // Example: data = { "data": [{ "attributes": { "body": "Dogs have amazing sense of smell." } }] }
        
        // STEP 3: Get the fact text from the JSON response
        // Dog API structure: data.data[0].attributes.body
        const factText = data.data[0]?.attributes?.body || null;
        
        if (!factText) {
            throw new Error('No fact found in response');
        }
        
        // STEP 4: Display the fact on the webpage
        factTextEl.textContent = factText;
        loadingEl.style.display = 'none';
        factDisplayEl.style.display = 'block';
        
        return factText;
        
    } catch (error) {
        console.error('Error fetching dog fact:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
        return null;
    }
}

// ============================================
// WHAT IS ASYNC/AWAIT?
// ============================================
// async = "asynchronous" = code that takes time (like waiting for internet)
// await = "wait for this to finish before continuing"
// 
// Example:
// async function getData() {
//   const data = await fetch('url');  // Wait for internet request
//   console.log(data);                 // Then do this
// }
// ============================================

// ============================================
// FUNCTION: Get New Fact AND Image Together
// ============================================
// Purpose: This is the main function that gets everything
// It's like the "boss" function that tells other functions what to do
// 
// How it works:
// 1. First, get a cat fact from the API
// 2. Extract keywords from that fact
// 3. Use those keywords to get a matching image
// 4. If getting the fact fails, just use "cat" as keyword
// ============================================

async function fetchNewContent() {
    // STEP 1: Get a fact from the internet (cat or dog based on currentAnimalType)
    let factText;
    if (currentAnimalType === 'dog') {
        factText = await fetchDogFact();
    } else {
        factText = await fetchCatFact();
    }
    
    // STEP 2: Check if we got a fact successfully
    if (factText) {
        // STEP 3: Extract important words from the fact
        const keywords = extractKeywords(factText);
        console.log('Extracted keywords:', keywords);
        
        // STEP 4: Get an image using those keywords and animal type
        fetchAnimalImage(keywords, currentAnimalType);
    } else {
        // STEP 5: If getting the fact failed, use default keyword
        const defaultKeyword = currentAnimalType === 'dog' ? 'dog' : 'cat';
        fetchAnimalImage(defaultKeyword, currentAnimalType);
    }
}

// ============================================
// FUNCTION: Toggle Between Cat and Dog
// ============================================
// Purpose: Switch between showing cat facts or dog facts
// 
// How it works:
// 1. Change currentAnimalType variable
// 2. Update header text and button text
// 3. Fetch new content for the selected animal
// ============================================

function toggleAnimal() {
    // STEP 1: Switch the animal type
    if (currentAnimalType === 'cat') {
        currentAnimalType = 'dog';
        // Update header for dogs
        headerTitle.textContent = '🐶 Dog Facts';
        headerSubtitle.textContent = 'Discover amazing facts about dogs!';
        toggleText.textContent = 'Switch to 🐱 Cat Facts';
    } else {
        currentAnimalType = 'cat';
        // Update header for cats
        headerTitle.textContent = '🐱 Cat Facts';
        headerSubtitle.textContent = 'Discover amazing facts about cats!';
        toggleText.textContent = 'Switch to 🐶 Dog Facts';
    }
    
    // STEP 2: Get new fact and image for the selected animal
    fetchNewContent();
}

// ============================================
// FUNCTION: Handle Screen Orientation
// ============================================
// Purpose: Change button appearance based on screen orientation
// ============================================

function handleOrientation() {
    // STEP 1: Check if screen is in landscape mode AND small (mobile)
    // window.matchMedia checks screen orientation
    // window.innerHeight < 500 means screen height is less than 500 pixels (small screen)
    const isLandscape = window.matchMedia('(orientation: landscape)').matches && window.innerHeight < 500;
    
    // STEP 2: If landscape mode (phone sideways)
    if (isLandscape) {
        // Find the text and emoji parts of the button
        // querySelector finds elements inside the button
        const btnText = newFactBtn.querySelector('.btn-text');   // The text part
        const btnEmoji = newFactBtn.querySelector('.btn-emoji'); // The emoji part
        
        // Hide the text, show only the emoji
        if (btnText) btnText.style.display = 'none';   // Hide text
        if (btnEmoji) btnEmoji.style.display = 'block'; // Show emoji
    } else {
        // STEP 3: If portrait mode (phone upright) or desktop
        // Find the text and emoji parts again
        const btnText = newFactBtn.querySelector('.btn-text');
        const btnEmoji = newFactBtn.querySelector('.btn-emoji');
        
        // Show both text and emoji
        if (btnText) btnText.style.display = 'inline';  // Show text
        if (btnEmoji) btnEmoji.style.display = 'inline'; // Show emoji
    }
}

// ============================================
// WHAT IS AN EVENT LISTENER?
// ============================================
// An event listener "listens" for something to happen
// Then it runs code when that thing happens
// 
// Examples:
// - 'click' = user clicks something
// - 'resize' = window size changes
// - 'DOMContentLoaded' = page finished loading
// 
// Syntax: element.addEventListener('event', function);
// ============================================

// ============================================
// START THE APPLICATION
// ============================================
// This code runs when the webpage finishes loading
// It sets up everything the app needs to work
// 
// What happens:
// 1. Wait for page to load
// 2. Check screen orientation
// 3. Listen for orientation changes
// 4. Get first fact and image
// 5. Make button clickable
// ============================================

// Wait for the HTML page to finish loading
// DOMContentLoaded = "all HTML is loaded and ready"
document.addEventListener('DOMContentLoaded', function() {
    // Print message to console (for debugging)
    console.log('CatFact application loaded');
    
    // STEP 1: Check how the screen is oriented right now
    // This sets the button appearance correctly from the start
    handleOrientation();
    
    // STEP 2: Listen for when user rotates their phone/tablet
    // 'resize' = window size changed
    // 'orientationchange' = device rotated
    // When either happens, run handleOrientation() again
    window.addEventListener('resize', handleOrientation);
    window.addEventListener('orientationchange', handleOrientation);
    
    // STEP 3: Get the first cat fact and image when page loads
    // This shows something immediately instead of a blank page
    fetchNewContent();
    
    // STEP 4: Make the button work
    // When user clicks the button, get new fact and image
    newFactBtn.addEventListener('click', fetchNewContent);
    
    // STEP 5: Make the toggle button work
    // When user clicks toggle, switch between cat and dog
    if (toggleAnimalBtn) {
        toggleAnimalBtn.addEventListener('click', toggleAnimal);
    }
});

