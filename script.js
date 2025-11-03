// Initialize EmailJS
(function() {
    // Initialize EmailJS with your Public Key
    emailjs.init("XJMjbJaSKciw8VHHo"); // You'll get this from EmailJS dashboard
})();

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Cursor Effect
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 80);
        });
        
        // Change cursor on hover
        const hoverElements = document.querySelectorAll('a, button, .project-card, .tab-btn, .filter-btn, .nav-link, .service-card, .testimonial-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-follower-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-follower-hover');
            });
        });

        // Hide cursor on touch devices
        if ('ontouchstart' in window) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        }
    }

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            
            // Animate links
            navLinksItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                    navLinksItems.forEach(link => {
                        link.style.animation = '';
                    });
                }
            });
        });
    }

    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Active Navigation Link
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    if (sections.length && navItems.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Close mobile menu if open
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // About Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length && tabContents.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                btn.classList.add('active');
                const targetContent = document.querySelector(`.tab-content[data-tab="${tabId}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // Skill Bars Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width') || bar.parentElement.previousElementSibling.querySelector('span:last-child').textContent.replace('%', '');
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
    }
    
    // Animate when skills section is in view
    const skillsSection = document.querySelector('.skills');
    if (skillsSection && skillBars.length) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateSkillBars();
                observer.unobserve(skillsSection);
            }
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }

    // Circle Progress Animation
    const circleProgresses = document.querySelectorAll('.circle-progress');
    
    if (circleProgresses.length) {
        function animateCircleProgress() {
            circleProgresses.forEach(circle => {
                const value = circle.getAttribute('data-value') || circle.querySelector('.circle-value').textContent.replace('%', '');
                const circles = circle.querySelectorAll('circle');
                if (circles.length < 2) return;
                
                const radius = circles[0].r.baseVal.value;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (value / 100) * circumference;
                
                circles[1].style.strokeDasharray = circumference;
                circles[1].style.strokeDashoffset = circumference;
                
                setTimeout(() => {
                    circles[1].style.strokeDashoffset = offset;
                }, 500);
            });
        }
        
        // Animate when skills section is in view
        if (skillsSection) {
            const circleObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateCircleProgress();
                    circleObserver.unobserve(skillsSection);
                }
            }, { threshold: 0.2 });
            
            circleObserver.observe(skillsSection);
        }
    }

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filter projects with animation
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }, index * 50);
                });
            });
        });
    }

    // Project Link Animation
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach((link, index) => {
        link.style.setProperty('--i', index);
    });

    // Animate Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const count = +stat.innerText.replace(',', '') || 0;
            const increment = target / 50;
            let current = count;
            
            if (current < target) {
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        current = target;
                    }
                    stat.innerText = Math.floor(current).toLocaleString();
                }, 30);
            } else {
                stat.innerText = target.toLocaleString();
            }
        });
    }
    
    // Start animation when stats section is in view
    const statsSection = document.querySelector('.github-stats');
    if (statsSection && statNumbers.length) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateStats();
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Contact Form Functionality
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Form validation
        function validateForm() {
            let isValid = true;
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Reset errors
            document.querySelectorAll('.error-message').forEach(error => {
                error.classList.remove('show');
            });

            // Name validation
            if (name === '') {
                document.getElementById('nameError').textContent = 'Name is required';
                document.getElementById('nameError').classList.add('show');
                isValid = false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                document.getElementById('emailError').textContent = 'Email is required';
                document.getElementById('emailError').classList.add('show');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                document.getElementById('emailError').classList.add('show');
                isValid = false;
            }

            // Subject validation
            if (subject === '') {
                document.getElementById('subjectError').textContent = 'Subject is required';
                document.getElementById('subjectError').classList.add('show');
                isValid = false;
            }

            // Message validation
            if (message === '') {
                document.getElementById('messageError').textContent = 'Message is required';
                document.getElementById('messageError').classList.add('show');
                isValid = false;
            } else if (message.length < 10) {
                document.getElementById('messageError').textContent = 'Message must be at least 10 characters long';
                document.getElementById('messageError').classList.add('show');
                isValid = false;
            }

            return isValid;
        }

        // Show message
        function showMessage(message, type) {
            const messageDiv = document.getElementById('formMessage');
            messageDiv.textContent = message;
            messageDiv.className = `form-message ${type} show`;
            
            setTimeout(() => {
                messageDiv.classList.remove('show');
            }, 5000);
        }

        // Send email using EmailJS
        async function sendEmail(formData) {
            try {
                const templateParams = {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: 'mrsandilenyathi@gmail.com',
                    reply_to: formData.email,
                    timestamp: new Date().toLocaleString()
                };

                // Send email using EmailJS
                const response = await emailjs.send(
                    'service_uutp776', // Replace with your Service ID
                    'template_4ki7f9g', // Replace with your Template ID
                    templateParams
                );

                if (response.status === 200) {
                    return { success: true, message: 'Email sent successfully!' };
                } else {
                    throw new Error('Failed to send email');
                }
            } catch (error) {
                console.error('EmailJS Error:', error);
                return { 
                    success: false, 
                    message: 'Failed to send email. Please try again or contact me directly at mrsandilenyathi@gmail.com' 
                };
            }
        }

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            try {
                // Get form data
                const formData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    subject: document.getElementById('subject').value.trim(),
                    message: document.getElementById('message').value.trim()
                };
                
                // Send email
                const result = await sendEmail(formData);
                
                if (result.success) {
                    showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.', 'success');
                    contactForm.reset();
                } else {
                    showMessage(result.message, 'error');
                }
                
            } catch (error) {
                console.error('Error sending message:', error);
                showMessage('Sorry, there was an unexpected error. Please email me directly at mrsandilenyathi@gmail.com', 'error');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });

        // Real-time validation
        const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error when user starts typing
                const errorElement = document.getElementById(this.id + 'Error');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            });
        });

        function validateField(field) {
            const value = field.value.trim();
            const errorElement = document.getElementById(field.id + 'Error');
            
            if (!errorElement) return;
            
            switch (field.id) {
                case 'name':
                    if (value === '') {
                        errorElement.textContent = 'Name is required';
                        errorElement.classList.add('show');
                    } else {
                        errorElement.classList.remove('show');
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (value === '') {
                        errorElement.textContent = 'Email is required';
                        errorElement.classList.add('show');
                    } else if (!emailRegex.test(value)) {
                        errorElement.textContent = 'Please enter a valid email address';
                        errorElement.classList.add('show');
                    } else {
                        errorElement.classList.remove('show');
                    }
                    break;
                    
                case 'subject':
                    if (value === '') {
                        errorElement.textContent = 'Subject is required';
                        errorElement.classList.add('show');
                    } else {
                        errorElement.classList.remove('show');
                    }
                    break;
                    
                case 'message':
                    if (value === '') {
                        errorElement.textContent = 'Message is required';
                        errorElement.classList.add('show');
                    } else if (value.length < 10) {
                        errorElement.textContent = 'Message must be at least 10 characters long';
                        errorElement.classList.add('show');
                    } else {
                        errorElement.classList.remove('show');
                    }
                    break;
            }
        }
    }

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            // Save theme preference
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
            
            // Change icon
            if (document.body.classList.contains('dark-theme')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-item, .project-card, .service-card, .testimonial-card, .about-img, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize elements with hidden state
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .service-card, .testimonial-card, .about-img, .timeline-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Skills Cloud Animation
    const cloudTags = document.querySelectorAll('.cloud-tag');
    cloudTags.forEach((tag, index) => {
        tag.style.setProperty('--i', index);
    });

    // Add CSS for navLinkFade animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .project-card {
            transition: opacity 0.3s ease, transform 0.3s ease !important;
        }
    `;
    document.head.appendChild(style);

    // Initialize first tab as active
    if (tabBtns.length > 0 && !document.querySelector('.tab-btn.active')) {
        tabBtns[0].click();
    }

    // Initialize first filter as active
    if (filterBtns.length > 0 && !document.querySelector('.filter-btn.active')) {
        filterBtns[0].click();
    }

    console.log('Portfolio initialized successfully!');
});