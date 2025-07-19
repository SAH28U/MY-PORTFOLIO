document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
    
    // Animate Skill Bars
    const skills = document.querySelectorAll('.skill');
    
    function animateSkills() {
        skills.forEach(skill => {
            const level = skill.getAttribute('data-level');
            const skillLevel = skill.querySelector('.skill-level');
            
            if (level && isElementInViewport(skill)) {
                skillLevel.style.width = `${level}%`;
                skill.removeAttribute('data-level');
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    window.addEventListener('scroll', animateSkills);
    animateSkills();
    
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Project Data
    const projects = [
        {
            title: "E-commerce Website",
            description: "Full-stack e-commerce site with Angular frontend and Node.js backend with MySQL.",
            tags: ["JavaScript", "HTML", "CSS", "JSON", "Angular", "Node.js"],
            category: "Web",
            demoUrl: "https://sah28u.github.io/NyathiClothingXpress/",
            codeUrl: "https://github.com/SAH28U/NyathiClothingXpress"
        },
        {
            title: "To-Do Notepad",
            description: "A lightweight, browser-based task manager built with HTML, CSS & JavaScript.",
            tags: ["JavaScript", "HTML", "CSS"],
            category: "Web",
            demoUrl: "https://sah28u.github.io/To-Do-NotePad/",
            codeUrl: "https://github.com/SAH28U/To-Do-NotePad"
        }
    ];
    
    function displayProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.category === filter);
        
        if (filteredProjects.length === 0) {
            projectsGrid.innerHTML = '<p class="no-projects">No projects found in this category.</p>';
            return;
        }
        
        filteredProjects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');
            projectItem.setAttribute('data-category', project.category);
            
            projectItem.innerHTML = `
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                        <a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i> Source Code
                        </a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectItem);
        });
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayProjects(button.getAttribute('data-filter'));
        });
    });
    
    displayProjects();
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    function toggleBackToTop() {
        backToTop.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Sticky header
    const header = document.querySelector('header');
    
    function updateHeaderShadow() {
        header.style.boxShadow = window.pageYOffset > 100 
            ? '0 2px 10px rgba(0, 0, 0, 0.1)' 
            : 'none';
    }
    
    window.addEventListener('scroll', updateHeaderShadow);
    updateHeaderShadow();
});
