import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Logo from './components/Logo.jsx';
import ServiceSection from './components/ServiceSection.jsx';
import ContactForm from './components/ContactForm.jsx';
import SocialIcons from './components/SocialIcons.jsx';
import './styles/App.css';

function App() {
  const [activeService, setActiveService] = useState(null);
  const subtitleRef = useRef(null);
  const founderRef = useRef(null);
  const launchRef = useRef(null);
  const missionRef = useRef(null);
  const buttonSound = useRef(null);

  useEffect(() => {
    // Initialize audio
    buttonSound.current = new Audio('/assets/button-click.mp3');
    buttonSound.current.preload = 'auto';

    // Initialize particles.js
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 1000 } },
          color: { value: ['#f97316', '#a855f7', '#ffffff', '#ffedd5'] },
          shape: { type: ['circle', 'triangle', 'star'], polygon: { nb_sides: 6 } },
          opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1, opacity_min: 0.2 } },
          size: { value: 4, random: true, anim: { enable: true, speed: 2, size_min: 1 } },
          line_linked: {
            enable: true,
            distance: 120,
            color: '#a855f7',
            opacity: 0.3,
            width: 1.5,
          },
          move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'bounce',
            bounce: true,
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'repulse' },
            resize: true,
          },
          modes: {
            grab: { distance: 200, line_linked: { opacity: 0.7 } },
            repulse: { distance: 150, duration: 0.4 },
          },
        },
        retina_detect: true,
      });
    }

    const splitText = (element) => {
      if (!element) return '';
      return element.textContent
        .split('')
        .map((char) => `<span class="letter">${char === ' ' ? ' ' : char}</span>`)
        .join('');
    };

    const elements = [
      { ref: subtitleRef, className: 'subtitle-text' },
      { ref: founderRef, className: 'founder-text' },
      { ref: launchRef, className: 'launch-text' },
      { ref: missionRef, className: 'mission-section' },
    ];

    elements.forEach(({ ref, className }) => {
      if (ref.current) {
        ref.current.innerHTML = splitText(ref.current);
      }
    });

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    elements.forEach(({ ref, className }) => {
      if (ref.current) {
        const letters = ref.current.querySelectorAll('.letter');
        const animationProps =
          className === 'launch-text'
            ? { opacity: 0, scale: 0.5, duration: 1.2, stagger: 0.07, ease: 'elastic.out(1, 0.4)' }
            : className === 'mission-section'
            ? { opacity: 0, y: 20, duration: 1, stagger: 0.05, ease: 'power2.out' }
            : { opacity: 0, x: className === 'subtitle-text' ? -30 : 30, duration: 1, stagger: 0.05, ease: 'power2.out' };

        tl.fromTo(letters, animationProps, { ...animationProps, opacity: 1, x: 0, y: 0, scale: 1 }, '-=1');
      }
    });

    return () => {
      tl.kill();
      if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
      }
    };
  }, []);

  const handleButtonClick = (e, callback) => {
    if (buttonSound.current) {
      buttonSound.current.currentTime = 0;
      buttonSound.current.play().catch((err) => console.error('Audio playback failed:', err));
    }

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    e.currentTarget.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
    if (callback) callback();
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center overflow-auto">
      <div id="particles-js"></div>
      <div className="grid-bg"></div>
      <div className="content flex flex-col items-center text-center">
        <Logo />
        <p ref={subtitleRef} className="text-white text-base sm:text-lg md:text-xl mt-1 font-roboto subtitle-text">
          Innovative Solutions for a Digital Future
        </p>
        <p ref={founderRef} className="text-orange-400 text-sm sm:text-base md:text-lg mt-0.5 font-roboto founder-text">
          Founded by Brian Nyarienya
        </p>
        <p ref={launchRef} className="text-purple-400 text-lg sm:text-xl md:text-2xl mt-0.5 pulse-animation font-roboto launch-text">
          Launching Soon!
        </p>
        <button
          className="mt-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full hover:from-purple-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_20px_rgba(249,115,22,0.8)] interactive-button"
          onClick={(e) => handleButtonClick(e, () => alert('Get ready for BoheniX Solutions!'))}
        >
          Join the Future
        </button>
        <SocialIcons />
        <ServiceSection activeService={activeService} setActiveService={setActiveService} handleButtonClick={handleButtonClick} />
        <div ref={missionRef} className="mission-section text-white text-base sm:text-lg font-roboto">
          Empowering Africa with Innovative Smart Technology Solutions
        </div>
        <ContactForm handleButtonClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;