📚 30 Days JavaScript Challenge Website Documentation
Project Overview
This project is a modern, responsive, and interactive single-page application (SPA) designed to promote and document a 30-Day JavaScript coding challenge. It uses only Vanilla JavaScript, HTML5, and CSS3 to demonstrate high-level web development proficiency without relying on external frameworks or libraries.

📄 Project Documentation
The 30 Days JavaScript Challenge Website is a responsive single-page application and dashboard built exclusively with HTML5, CSS3, and Vanilla JavaScript, showcasing expert-level application design and dynamic functionality.

Here is the documentation for my project structured into concise, professional sentences, detailing the functionality across all pages, including the main site and the dashboard sections.

🖥️ Main Website (index.html)
The main site serves as the promotional entry point, featuring a Horizontal Sticky Navbar with ScrollSpy logic that dynamically highlights the current section link using color changes. The Hero Section utilizes a JavaScript-controlled image slider and a CSS parallax effect for visual depth, while the Team Section adds credibility with responsive creator cards. User conversion is driven by a highly interactive flow: visitors submit data through a validated Modal Sign-up Form, which triggers a 3-second success notification followed by a 7-second loading screen simulation before storing the user session in localStorage and redirecting them to the dashboard.

📊 Challenge Dashboard (dashboard.html)
The primary dashboard page acts as the user's hub, providing a personalized and application-like experience. The structure is based on a Vertical Sidebar Navigation on desktop, which cleanly collapses into a responsive hamburger menu on mobile, managed entirely by js/dashboard.js. The main content area features a welcome message personalized using data retrieved from localStorage, and the project cards are made easily accessible through Filtering and Search Logic, allowing users to dynamically filter projects by category or search term. The Logout button securely clears the user's session from localStorage before redirecting them back to the public homepage.

🧩 Auxiliary Dashboard Pages
To maintain navigation integrity and a professional app-like feel, the following placeholder pages utilize the same Vertical Sidebar Structure and Logout Functionality as the main dashboard, ensuring a seamless user experience across the entire protected area:

All Challenges (challenges.html): This page hosts the main dynamic grid displaying the 30 Project Cards, offering search and filter tools for exploration.

My Progress (progress.html): This section is designated for future implementation of charts and graphs that will track and visualize the participant's daily completion history.

Resources (resources.html): This area is reserved for a curated library of external links, documentation, and supplementary learning materials pertinent to the challenge projects.
