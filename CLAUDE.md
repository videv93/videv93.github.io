# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Vi Tran's personal portfolio website - a modern, responsive single-page application showcasing expertise in AI/ML, blockchain development, and full-stack engineering. The site is hosted on GitHub Pages and features a clean, professional design with interactive elements.

## Architecture

- **Static site**: Vanilla HTML, CSS, and JavaScript (no build tools or frameworks)
- **Single-page application**: All content in `index.html` with smooth scrolling navigation
- **Modern CSS**: Uses CSS custom properties (design tokens) with OKLCH color space for better color science
- **Progressive enhancement**: JavaScript adds interactivity but site functions without it
- **Mobile-first responsive design**: Uses clamp() functions for fluid typography and spacing

## Key Files

- `index.html` - Main HTML structure with semantic sections (hero, about, skills, projects, contact)
- `styles.css` - Modern CSS with design system using custom properties, responsive design patterns
- `script.js` - Interactive features: mobile navigation, smooth scrolling, intersection observer animations, typing effects
- `README.md` - Project documentation and feature overview
- `CNAME` - GitHub Pages custom domain configuration

## Development Workflow

Since this is a static site with no build process:

1. **Direct editing**: Make changes directly to HTML, CSS, and JavaScript files
2. **Testing**: Open `index.html` in browser or use a simple HTTP server
3. **Deployment**: Push to GitHub main branch (auto-deploys via GitHub Pages)

## Design System

The CSS uses a comprehensive design token system:
- **Colors**: OKLCH color space for better perceptual uniformity
- **Typography**: Fluid type scale using clamp() for responsive sizing
- **Spacing**: Consistent spacing scale with fluid values
- **Modern CSS features**: Custom properties, logical properties, modern selectors

## JavaScript Features

- Mobile-responsive navigation with accessibility features
- Intersection Observer API for scroll-triggered animations
- Smooth scrolling navigation
- Dynamic typing animation for hero subtitle
- Scroll-based navbar styling
- Project card hover interactions
- Statistics counter animations

## Content Management

All content is hardcoded in `index.html`:
- **Projects**: Featured projects with GitHub links and tech stacks
- **Skills**: Organized by categories (AI/ML, Blockchain, Full-stack, DevOps)
- **Social links**: GitHub, Twitter, personal website
- **Statistics**: Repository count, experience years, followers

## Hosting

- **Platform**: GitHub Pages
- **Domain**: Custom domain configured via CNAME file
- **SSL**: Automatically provided by GitHub Pages
- **CDN**: Font Awesome loaded from CDN