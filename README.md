# CatFact Project

A modern, responsive web application that displays random cat facts with matching images. Built with vanilla JavaScript, CSS Flexbox, and free public APIs.

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

CatFact is a single-page web application that fetches random cat facts from a free API and displays them alongside relevant cat images. The app features a dark, futuristic theme inspired by game UI design, with a responsive layout that adapts to different screen sizes and orientations.

---

## Features

- ✅ **Free APIs** - No API keys or authentication required
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile devices
- ✅ **Landscape Mode** - Special three-column layout for mobile landscape
- ✅ **Keyword-Based Images** - Images are selected based on fact keywords
- ✅ **Multiple Fallbacks** - Ensures images always load with local backup
- ✅ **Dark Theme** - Modern futuristic UI with gold/orange accents
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

1. **Page Load**: Application initializes and immediately fetches a cat fact
2. **Fact Fetching**: Calls Meow Facts API to get a random cat fact
3. **Keyword Extraction**: Extracts relevant keywords from the fact text
4. **Image Fetching**: Uses keywords to fetch a relevant cat image
5. **Display**: Shows both fact and image to the user
6. **User Interaction**: Clicking the button repeats the process

### Image Fetching Strategy

The app uses a multi-tier fallback system to ensure images always load:

1. **Primary**: Cataas direct image URL (`https://cataas.com/cat`)
2. **Secondary**: Picsum Photos with keyword-based seed
3. **Tertiary**: Cataas GIF endpoint
4. **Final Fallback**: Local images from `img/` folder

**Code Location**: `app.js` lines 47-100

### Keyword Extraction

The app extracts meaningful keywords from cat facts by:
- Converting text to lowercase
- Removing common words (the, a, an, and, etc.)
- Filtering words shorter than 3 characters
- Selecting the top 3 relevant keywords
- Generating a numeric seed from keywords for consistent image selection

**Code Location**: `app.js` lines 8-22

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

### 1. Meow Facts API (Cat Facts)

- **API URL**: `https://meowfacts.herokuapp.com/`
- **Endpoint**: `https://meowfacts.herokuapp.com/`
- **Response Format**: `{ "data": ["fact text"] }`
- **Features**: 
  - ✅ Free to use
  - ✅ No API key required
  - ✅ No authentication needed
  - ✅ HTTPS enabled
  - Returns random cat facts in JSON format

**Code Location**: `app.js` line 6, 103-134

### 2. Image APIs

#### Cataas (Primary)
- **URL**: `https://cataas.com/cat`
- **Type**: Direct image URL
- **No API call needed** - just set as image src

#### Picsum Photos (Secondary)
- **URL**: `https://picsum.photos/seed/{seed}/600/400`
- **Uses keyword-based seed** for variety

#### Local Fallback
- **Location**: `img/` folder
- **4 images available** for offline support

**Code Location**: `app.js` lines 36-45, 47-100

---

## Getting Started

1. **Clone or Download** the project
2. **Open** `index.html` in a web browser
3. **Wait** for the initial fact and image to load
4. **Click** the "Get New Fact & Image 🐾" button to fetch new content
5. **Rotate** your mobile device to see the landscape layout

**No installation or build process required** - it's a pure client-side application!

---

## File Structure

| File | Purpose | Key Sections |
|------|---------|--------------|
| `index.html` | Main HTML structure | Lines 1-46: Complete markup |
| `app.css` | Styling and responsive design | Lines 1-234: Base styles<br>Lines 240-339: Landscape layout<br>Lines 341-386: Portrait layout |
| `app.js` | Application logic | Lines 1-22: Keyword extraction<br>Lines 47-100: Image fetching<br>Lines 103-134: Fact fetching<br>Lines 184-221: Orientation handling |

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

7. **Button Visibility Fix** (Latest)
   - Fixed button overflow issue by setting `margin-top: 0px` for `.btn` class
   - Added `max-width: calc(100% - 40px)` to prevent horizontal overflow
   - Added `box-sizing: border-box` for proper width calculations
   - Button now always stays within container bounds
   - **Location**: `app.css` line 214

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
- **Total Lines**: 392
- **Major Sections**:
  - Lines 1-18: Reset and base styles
  - Lines 20-36: Container styles
  - Lines 38-52: Header styles
  - Lines 75-83: Main flexbox container
  - Lines 85-100: Image container (with scrollbar styling)
  - Lines 130-141: Fact container (with scrollbar styling)
  - Lines 201-238: Button styles
  - **Lines 240-339**: Mobile landscape three-column layout ⭐
  - Lines 341-392: Mobile portrait layout

**Recent Changes**:
- Complete rebuild with dark theme
- Added landscape three-column layout
- Removed all `!important` flags
- Added custom scrollbars
- Fixed heights for all containers
- **Button visibility fix**: Changed `margin-top: 10px` to `margin-top: 0px` (line 214)
- Added `max-width: calc(100% - 40px)` to button to prevent overflow (line 223)
- Added `box-sizing: border-box` for proper width calculations (line 224)

#### `app.js`
- **Total Lines**: 221
- **Major Sections**:
  - Lines 1-6: API URLs and constants
  - **Lines 8-22**: Keyword extraction function
  - Lines 24-33: Seed generation from keywords
  - Lines 36-45: Local fallback images array
  - **Lines 47-100**: Image fetching with fallbacks
  - **Lines 103-134**: Cat fact fetching
  - Lines 167-182: Main content fetching function
  - **Lines 184-221**: Orientation detection and button text handling ⭐

**Recent Changes**:
- Added keyword extraction from facts
- Implemented multi-tier image fallback system
- Added orientation detection for button text
- Added local image fallback support

#### `index.html`
- **Total Lines**: 46
- **Structure**:
  - Lines 1-8: HTML head with meta tags
  - Lines 10-14: Header section
  - Lines 16-36: Main content (image and fact containers)
  - **Line 35**: Button with separate text and emoji spans ⭐

**Recent Changes**:
- Split button content into `.btn-text` and `.btn-emoji` spans
- Added proper semantic HTML structure

#### `.gitignore`
- **Total Lines**: 44
- **Purpose**: Excludes node_modules, logs, IDE files, and history folder

---

## Credits

**Project**: CatFact  
**Created**: 2025  
**Last Updated**: 2025-11-25  
**Version**: 1.0.0

---

## License

This project is open source and available for educational purposes.

---

*For questions or issues, please refer to the code comments or file structure documentation above.*
