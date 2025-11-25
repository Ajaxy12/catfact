# Cat & Dog Facts Project

A modern, responsive web application that displays random cat and dog facts with matching images. Built with vanilla JavaScript, CSS Flexbox, and free public APIs. Toggle between cats and dogs with a single click!

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [How the App Works](#how-the-app-works)
  - [Data Flow](#data-flow)
  - [Image Fetching Strategy](#image-fetching-strategy)
  - [Keyword Extraction](#keyword-extraction)
- [Responsive Design](#responsive-design)
  - [Desktop/Tablet Layout](#desktoptablet-layout)
  - [Mobile Portrait Layout](#mobile-portrait-layout)
  - [Mobile Landscape Layout](#mobile-landscape-layout)
- [APIs Used](#apis-used)
  - [Meow Facts API](#1-meow-facts-api-cat-facts)
  - [Image APIs](#2-image-apis)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)
- [Recent Updates & Features](#recent-updates--features)
- [To-Do List](#to-do-list)
- [File Modification History](#file-modification-history)
- [Credits](#credits)

---

## Overview

Cat & Dog Facts is a single-page web application that fetches random cat and dog facts from free APIs and displays them alongside relevant animal images. Users can toggle between cat and dog facts using a purple toggle button. The app features a dark, futuristic theme inspired by game UI design, with a responsive layout that adapts to different screen sizes and orientations.

---

## Features

- ✅ **Free APIs** - No API keys or authentication required
- ✅ **Cat & Dog Facts** - Toggle between cat and dog facts with a single button
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile devices
- ✅ **Landscape Mode** - Special three-column layout for mobile landscape
- ✅ **Keyword-Based Images** - Images are selected based on fact keywords
- ✅ **Multiple Fallbacks** - Ensures images always load with local backup
- ✅ **Dark Theme** - Modern futuristic UI with gold/orange accents and purple toggle button
- ✅ **Smooth Animations** - Loading states and hover effects
- ✅ **Error Handling** - Graceful error messages and fallbacks

---

## Project Structure

```
CATFACT/
├── img/                    # Local fallback images
│   ├── 9f6f45d0-d962-4bcf-900a-305f94991f8b.jpg
│   ├── 34b891b8-99ec-4a76-8d95-4d1d897f9447.jpg
│   ├── 5097f27e-b4f5-40cc-ab1a-7622579977db.jpg
│   └── b8e21773-f979-4598-b496-03503e7bbd31.jpg
├── history/                # Project history and logs (gitignored)
├── app.css                 # Main stylesheet with responsive design
├── app.js                  # JavaScript functionality
├── index.html              # Main HTML structure
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

---

## How the App Works

### Data Flow

1. **Page Load**: Application initializes and immediately fetches a cat fact (default)
2. **Animal Selection**: User can toggle between cat and dog facts using the toggle button
3. **Fact Fetching**: Calls appropriate API (Meow Facts for cats, Dog API for dogs) to get a random fact
4. **Keyword Extraction**: Extracts relevant keywords from the fact text
5. **Image Fetching**: Uses keywords and animal type to fetch a relevant image
6. **Display**: Shows both fact and image to the user
7. **User Interaction**: Clicking the button repeats the process for the selected animal type

### Image Fetching Strategy

The app uses a multi-tier fallback system to ensure images always load:

**For Cats:**
1. **Primary**: Cataas direct image URL (`https://cataas.com/cat`)
2. **Secondary**: Picsum Photos with keyword-based seed
3. **Tertiary**: Cataas GIF endpoint
4. **Final Fallback**: Local images from `img/` folder

**For Dogs:**
1. **Primary**: Dog CEO API (returns JSON with image URL)
2. **Secondary**: RandomDog API (returns JSON with image URL)
3. **Tertiary**: Picsum Photos with keyword-based seed
4. **Final Fallback**: Local images from `img/` folder

**Code Location**: `app.js` lines 208-341

### Keyword Extraction

The app extracts meaningful keywords from animal facts (both cats and dogs) by:
- Converting text to lowercase
- Removing common words (the, a, an, and, etc.)
- Filtering words shorter than 3 characters
- Selecting the top 3 relevant keywords
- Generating a numeric seed from keywords for consistent image selection

**Code Location**: `app.js` lines 49-75

---

## Responsive Design

The application uses CSS Flexbox and media queries to create a responsive layout that adapts to different screen sizes and orientations.

### Desktop/Tablet Layout

- **Container**: Fixed height (90vh), max-width 800px, min-width 500px
- **Layout**: Vertical stack (header → image → fact → button)
- **Image Box**: 30vh + 50px height
- **Fact Box**: 25vh height
- **Button**: Full width, centered

**Code Location**: `app.css` lines 20-234

### Mobile Portrait Layout

- **Container**: 95vh height, full width
- **Layout**: Vertical stack (same as desktop, but optimized for smaller screens)
- **Image Box**: 25vh + 50px height
- **Fact Box**: 20vh height
- **Reduced Font Sizes**: Smaller text for better mobile readability

**Code Location**: `app.css` lines 341-386

### Mobile Landscape Layout

**Special Three-Column Layout** - This is the key responsive solution:

- **Container**: 95vh height, full width
- **Layout**: Horizontal three-column flexbox
  - **Column 1**: Image container (33.33% width)
  - **Column 2**: Fact text container (33.33% width)
  - **Column 3**: Button (60px fixed width, emoji only)
- **Button Behavior**: Shows only emoji (🐾) in landscape mode
- **JavaScript Detection**: Dynamically shows/hides button text based on orientation

**Code Location**: 
- CSS: `app.css` lines 240-339
- JavaScript: `app.js` lines 184-221

**Media Query**: `@media (orientation: landscape) and (max-height: 500px)`

**Key CSS Properties**:
```css
main {
    display: flex;
    flex-direction: row;  /* Horizontal layout */
    gap: 10px;
    align-items: stretch;
}

.image-container, .fact-container {
    flex: 1;              /* Equal width columns */
    width: 33.33%;
    height: 100%;
}

.btn {
    flex: 0 0 60px;       /* Fixed width */
    width: 60px;
}
```

---

## APIs Used

### 1. Fact APIs

#### Meow Facts API (Cat Facts)
- **API URL**: `https://meowfacts.herokuapp.com/`
- **Response Format**: `{ "data": ["fact text"] }`
- **Features**: 
  - ✅ Free to use
  - ✅ No API key required
  - ✅ No authentication needed
  - ✅ HTTPS enabled
  - Returns random cat facts in JSON format

**Code Location**: `app.js` line 38, 362-397

#### Dog API (Dog Facts)
- **API URL**: `https://dogapi.dog/api/v2/facts?limit=1`
- **Response Format**: `{ "data": [{ "attributes": { "body": "fact text" } }] }`
- **Features**: 
  - ✅ Free to use
  - ✅ No API key required
  - ✅ No authentication needed
  - ✅ HTTPS enabled
  - Returns random dog facts in JSON format
  - Source: [public-api-lists on GitHub](https://github.com/public-api-lists/public-api-lists)

**Code Location**: `app.js` line 39, 399-446

### 2. Image APIs

#### Cat Images
- **Cataas** (Primary): `https://cataas.com/cat` - Direct image URL
- **Picsum Photos** (Secondary): `https://picsum.photos/seed/{seed}/600/400` - Uses keyword-based seed
- **Cataas GIF** (Tertiary): `https://cataas.com/cat/gif` - GIF fallback

#### Dog Images
- **Dog CEO API** (Primary): `https://dog.ceo/api/breeds/image/random` - Returns JSON with image URL
- **RandomDog API** (Secondary): `https://random.dog/woof.json` - Returns JSON with image URL
- **Picsum Photos** (Tertiary): `https://picsum.photos/seed/{seed}/600/400` - Fallback

#### Local Fallback
- **Location**: `img/` folder
- **4 images available** for offline support

**Code Location**: `app.js` lines 208-341

---

## Getting Started

1. **Clone or Download** the project
2. **Open** `index.html` in a web browser
3. **Wait** for the initial fact and image to load
4. **Click** the "Get New Fact & Image 🐾" button to fetch new content
5. **Toggle** between cat and dog facts using the purple toggle button
6. **Rotate** your mobile device to see the landscape layout

**No installation or build process required** - it's a pure client-side application!

---

## File Structure

| File | Purpose | Key Sections |
|------|---------|--------------|
| `index.html` | Main HTML structure | Lines 1-55: Complete markup with toggle button |
| `app.css` | Styling and responsive design | Lines 1-234: Base styles<br>Lines 64-91: Toggle button styles<br>Lines 240-339: Landscape layout<br>Lines 341-444: Portrait layout |
| `app.js` | Application logic | Lines 1-38: Constants and API URLs<br>Lines 49-75: Keyword extraction<br>Lines 208-341: Image fetching (cats & dogs)<br>Lines 362-446: Fact fetching (cats & dogs)<br>Lines 524-548: Toggle functionality<br>Lines 550-582: Orientation handling |

---

## Recent Updates & Features

### Latest Version Features

1. **Complete CSS Rebuild** (Latest)
   - Dark futuristic theme with gold/orange accents
   - Proper Flexbox implementation throughout
   - Removed all `!important` flags for cleaner code
   - Orange glow effect on background

2. **Mobile Landscape Three-Column Layout**
   - Horizontal flexbox layout for landscape orientation
   - Image, fact, and button displayed side-by-side
   - Button shows only emoji in landscape mode
   - JavaScript-based orientation detection

3. **Fixed Heights for Stability**
   - All containers have fixed heights to prevent layout shifts
   - Main container: 90vh (95vh on mobile)
   - Image container: 30vh + 50px (25vh + 50px on mobile)
   - Fact container: 25vh (20vh on mobile)
   - Button: 50px height (45px on mobile)

4. **Keyword-Based Image Selection**
   - Extracts keywords from cat facts
   - Uses keywords to influence image selection
   - Generates seed from keywords for consistency

5. **Multiple Image Fallbacks**
   - Primary: Cataas direct URLs
   - Secondary: Picsum Photos with seed
   - Tertiary: Cataas GIF
   - Final: Local images from `img/` folder

6. **Custom Scrollbars**
   - Styled scrollbars matching the theme
   - Gold color with orange hover effect

7. **Button Visibility Fix**
   - Fixed button overflow issue by setting `margin-top: 0px` for `.btn` class
   - Added `max-width: calc(100% - 40px)` to prevent horizontal overflow
   - Added `box-sizing: border-box` for proper width calculations
   - Button now always stays within container bounds
   - **Location**: `app.css` line 214

8. **Dog Facts Integration** (Latest)
   - Added Dog API integration for dog facts
   - Implemented toggle button to switch between cat and dog facts
   - Added Dog CEO API and RandomDog API for dog images
   - Updated image fetching to handle both cats and dogs
   - Purple toggle button with gradient styling
   - Dynamic header that updates based on selected animal
   - **Location**: `app.js` lines 39, 399-446, 524-548
   - **Location**: `app.css` lines 64-91
   - **Location**: `index.html` lines 15-19

---

## To-Do List

### Current Tasks
- [ ] Add loading skeleton screens for better UX
- [ ] Implement image caching for faster subsequent loads
- [ ] Add share functionality for facts
- [ ] Create dark/light theme toggle
- [ ] Add fact history/favorites feature

### Future Enhancements
- [ ] Add multiple language support
- [ ] Implement fact categories/filtering
- [ ] Add social media sharing
- [ ] Create PWA (Progressive Web App) version
- [ ] Add keyboard shortcuts

### Known Issues
- None currently

### Recent Fixes
- **Button Overflow Issue** (Fixed)
  - **Problem**: Button was going outside container bounds
  - **Solution**: Set `margin-top: 0px` and added `max-width` constraint
  - **File**: `app.css` line 214
  - **Status**: ✅ Resolved

---

## File Modification History

### Modified Files

#### `app.css`
- **Total Lines**: 444
- **Major Sections**:
  - Lines 1-18: Reset and base styles
  - Lines 20-36: Container styles
  - Lines 38-62: Header styles
  - **Lines 64-91**: Toggle button styles (purple gradient) ⭐
  - Lines 93-102: Main flexbox container
  - Lines 104-137: Image container (with scrollbar styling)
  - Lines 149-158: Fact container (with scrollbar styling)
  - Lines 191-228: Main button styles
  - **Lines 240-339**: Mobile landscape three-column layout ⭐
  - Lines 341-444: Mobile portrait layout

**Recent Changes**:
- Complete rebuild with dark theme
- Added landscape three-column layout
- Removed all `!important` flags
- Added custom scrollbars
- Fixed heights for all containers
- **Button visibility fix**: Changed `margin-top: 10px` to `margin-top: 0px` (line 214)
- Added `max-width: calc(100% - 40px)` to button to prevent overflow (line 223)
- Added `box-sizing: border-box` for proper width calculations (line 224)
- **Added toggle button styling**: Purple gradient button (lines 64-91)

#### `app.js`
- **Total Lines**: 634
- **Major Sections**:
  - Lines 1-38: Constants, API URLs, and DOM elements
  - **Lines 49-75**: Keyword extraction function
  - Lines 77-95: Seed generation from keywords
  - Lines 97-107: Local fallback images array
  - **Lines 208-341**: Image fetching with fallbacks (cats & dogs) ⭐
  - **Lines 362-397**: Cat fact fetching
  - **Lines 399-446**: Dog fact fetching ⭐
  - Lines 474-501: Main content fetching function (supports both animals)
  - **Lines 524-548**: Toggle between cat and dog functionality ⭐
  - **Lines 550-582**: Orientation detection and button text handling
  - Lines 614-642: Application initialization

**Recent Changes**:
- Added keyword extraction from facts
- Implemented multi-tier image fallback system
- Added orientation detection for button text
- Added local image fallback support
- **Added Dog API integration**: Dog facts from dogapi.dog
- **Added toggle functionality**: Switch between cat and dog facts
- **Updated image fetching**: Supports both cat and dog images
- **Added Dog CEO API and RandomDog API**: For dog images

#### `index.html`
- **Total Lines**: 55
- **Structure**:
  - Lines 1-8: HTML head with meta tags
  - Lines 10-19: Header section with toggle button ⭐
  - Lines 21-39: Main content (image and fact containers)
  - Lines 41-43: Footer with author name
  - **Line 15-19**: Toggle button for switching between cat and dog facts ⭐

**Recent Changes**:
- Split button content into `.btn-text` and `.btn-emoji` spans
- Added proper semantic HTML structure
- **Added toggle button**: Purple button to switch between cat and dog facts
- **Added dynamic headers**: Headers update based on selected animal type
- Updated title to "Cat & Dog Facts"

#### `.gitignore`
- **Total Lines**: 44
- **Purpose**: Excludes node_modules, logs, IDE files, and history folder

---

## Credits

**Project**: Cat & Dog Facts  
**Created**: 2025  
**Last Updated**: 2025-01-25  
**Version**: 2.0.0

---

## License

This project is open source and available for educational purposes.

---

*For questions or issues, please refer to the code comments or file structure documentation above.*
