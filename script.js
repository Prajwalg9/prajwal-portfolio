
gsap.registerPlugin(ScrollTrigger);


// 2. Button Event Listeners
const btnHire = document.getElementById('btn-hire');
const btnContactNav = document.getElementById('btn-contact-nav');
const btnWhatsapp = document.getElementById('btn-whatsapp');

const emailAddress = "prajwalgg99@gmail.com";
const emailSubject = "Inquiry for Portfolio Services";
const whatsappNumber = "919325840474"; 

// Hire Me & Contact Buttons (Email)
const openEmail = () => {
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}`;
};

if(btnHire) btnHire.addEventListener('click', openEmail);
if(btnContactNav) btnContactNav.addEventListener('click', openEmail);

// WhatsApp Button
if(btnWhatsapp) {
    btnWhatsapp.addEventListener('click', () => {
        const url = `https://wa.me/${whatsappNumber}?text=Hi Prajwal, I saw your portfolio and would like to connect!`;
        window.open(url, '_blank');
    });
}

const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

if(menu) {
    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
    menu.classList.remove('is-active');
    menuLinks.classList.remove('active');
}));

const observerOptions = {
    threshold: 0.5
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // Optional: remove class to replay animation when scrolling back up
            // entry.target.classList.remove('active'); 
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-paragraph').forEach(p => {
    revealObserver.observe(p);
});

// Subtle parallax for the visual elements
window.addEventListener('scroll', () => {
    const visual = document.querySelector('.about-visual');
    if(visual) {
        const speed = 0.05;
        const rect = visual.getBoundingClientRect();
        if(rect.top < window.innerHeight && rect.bottom > 0) {
            const shift = (window.innerHeight - rect.top) * speed;
            visual.style.transform = `translateY(-${shift}px)`;
        }
    }
});

/* ---------------------------------------------------- */
/* 🚀 NEW SKILLS SECTION ANIMATION LOGIC 🚀             */
/* ---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Select the new skill cards
    const skillCards = document.querySelectorAll('.skill-category-card');

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Reveal the card itself
                entry.target.classList.remove('hidden-skill');
                entry.target.classList.add('show-skill');

                // 2. Animate the progress bars inside this specific card
                const bars = entry.target.querySelectorAll('.skill-fill');
                bars.forEach(bar => {
                    // Read the target percentage from inline style
                    const width = bar.style.getPropertyValue('--w');
                    bar.style.width = width; // Trigger CSS transition
                });

                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillCards.forEach(card => skillObserver.observe(card));
});




      



const contactForm = document.getElementById('contactForm');
const inputs = contactForm.querySelectorAll('input, textarea');
const submitBtn = contactForm.querySelector('.submit-btn');

const validateField = (field) => {
    const group = field.parentElement;
    if (!field.value.trim()) {
        group.classList.add('error');
        return false;
    } else {
        group.classList.remove('error');
        return true;
    }
};

inputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.value.trim()) input.parentElement.classList.remove('error');
    });
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isFormValid = true;
    inputs.forEach(input => {
        if (!validateField(input)) isFormValid = false;
    });

    if (!isFormValid) return;

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        date_time: new Date().toLocaleString() 
    };

    emailjs.send('service_prajwalG', 'template_w8gawbf', templateParams)
        .then(() => {
            submitBtn.innerHTML = 'Message Sent! ✅';
            submitBtn.style.backgroundColor = '#10b981';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 4000);
        })
        .catch((err) => {
            console.error('Email Error:', err);
            submitBtn.innerHTML = 'Error. Try Again ❌';
            submitBtn.style.backgroundColor = '#ef4444';
            submitBtn.disabled = false;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        });
});