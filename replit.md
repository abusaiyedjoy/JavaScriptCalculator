# Calculator Application

## Overview

This is a web-based calculator application featuring both normal and scientific calculation modes. The application is built using vanilla HTML, CSS, and JavaScript with a modern, responsive design. It includes advanced features like memory functions, calculation history, and expression evaluation.

## System Architecture

### Frontend Architecture
- **Pure Client-Side Application**: Built entirely with vanilla web technologies (HTML5, CSS3, JavaScript ES6+)
- **Component-Based Design**: Single Calculator class managing all functionality
- **Tab-Based Interface**: Dual-mode calculator with normal and scientific views
- **Responsive Layout**: Flexbox-based layout with mobile-first design principles

### Key Technologies
- HTML5 for semantic structure
- CSS3 with modern features (CSS Grid, Flexbox, CSS Variables)
- Vanilla JavaScript (ES6+ classes and modules)
- Font Awesome icons for UI enhancement
- Local Storage for data persistence

## Key Components

### 1. Calculator Class (`script.js`)
- **State Management**: Handles current input, previous input, operators, and mode switching
- **Memory Operations**: Implements MC, MR, M+, M- memory functions
- **History Management**: Maintains calculation history with local storage persistence
- **Expression Evaluation**: Supports complex mathematical expressions
- **Mode Switching**: Toggles between normal and scientific calculator modes

### 2. Display System
- **Main Display**: Shows current input/result
- **History Display**: Shows previous calculations
- **Expression Display**: Shows current mathematical expression
- **Memory Indicator**: Visual indicator when memory contains values

### 3. Button Grid System
- **Normal Mode**: Basic arithmetic operations, memory functions, and clearing operations
- **Scientific Mode**: Advanced functions (trigonometric, logarithmic, exponential)
- **Responsive Grid**: CSS Grid layout adapting to different screen sizes

### 4. Styling Architecture (`styles.css`)
- **CSS Custom Properties**: Consistent color scheme and spacing
- **Component-Based Styling**: Modular CSS with clear component boundaries
- **Dark Theme**: Modern dark UI with gradient backgrounds
- **Hover/Active States**: Interactive feedback for all buttons

## Data Flow

### 1. Input Processing
```
User Input → Event Listener → Calculator Method → State Update → Display Update
```

### 2. Calculation Flow
```
Input Accumulation → Operator Selection → Expression Building → Evaluation → Result Display → History Storage
```

### 3. Memory Operations
```
Memory Action → Memory State Update → Memory Indicator Update → Display Refresh
```

### 4. History Management
```
Calculation Complete → History Array Update → Local Storage Save → History Display Refresh
```

## External Dependencies

### 1. Font Awesome CDN
- **Purpose**: Provides icons for calculator buttons and UI elements
- **Integration**: Loaded via CDN link in HTML head
- **Fallback**: Application remains functional without icons

### 2. Local Storage API
- **Purpose**: Persists calculation history across browser sessions
- **Graceful Degradation**: Application works without local storage support

## Deployment Strategy

### Static Web Application
- **Hosting**: Can be deployed on any static web server
- **Requirements**: No server-side processing required
- **Compatibility**: Works on all modern browsers supporting ES6+
- **Performance**: Lightweight with minimal external dependencies

### Deployment Options
1. **GitHub Pages**: Direct deployment from repository
2. **Netlify/Vercel**: Automatic deployment with CI/CD
3. **Traditional Web Hosting**: Upload files to any web server
4. **CDN Distribution**: Can be served through content delivery networks

## Changelog

```
Changelog:
- June 27, 2025. Initial setup
- June 27, 2025. Fixed equals button functionality and removed history panel
- June 27, 2025. Enhanced UI with glassmorphism design, improved animations, and modern styling
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## Architecture Decisions

### 1. Vanilla JavaScript Choice
- **Problem**: Need for lightweight, fast calculator without framework overhead
- **Solution**: Pure JavaScript implementation with ES6+ classes
- **Rationale**: Eliminates build processes, reduces bundle size, improves performance
- **Trade-offs**: More manual DOM manipulation but better performance and simplicity

### 2. Local Storage for Persistence
- **Problem**: Users want to retain calculation history between sessions
- **Solution**: Browser's Local Storage API for client-side persistence
- **Rationale**: No server infrastructure needed, immediate data access
- **Trade-offs**: Limited to single device/browser but sufficient for calculator use case

### 3. Tab-Based Mode Switching
- **Problem**: Need to support both basic and scientific calculator functions
- **Solution**: Tab interface switching between normal and scientific modes
- **Rationale**: Keeps interface clean while providing advanced functionality
- **Trade-offs**: Slightly more complex state management but much better UX

### 4. CSS Grid for Button Layout
- **Problem**: Need flexible, responsive button arrangement
- **Solution**: CSS Grid for button layout with responsive breakpoints
- **Rationale**: Modern, flexible layout system with excellent browser support
- **Trade-offs**: Requires modern browser support but provides superior layout control