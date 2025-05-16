import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function Logo() {
  const logoRef = useRef(null);

  useEffect(() => {
    const logoText = logoRef.current;
    if (logoText) {
      logoText.innerHTML = logoText.textContent
        .split('')
        .map((char) => `<span class="letter">${char === ' ' ? ' ' : char}</span>`)
        .join('');

      const letters = logoText.querySelectorAll('.letter');
      gsap.fromTo(
        letters,
        {
          opacity: 0,
          x: () => Math.random() * 100 - 50,
          y: () => Math.random() * 100 - 50,
          rotation: () => Math.random() * 30 - 15,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1.5,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
      gsap.to(logoText, {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <h1 ref={logoRef} className="logo-text text-4xl sm:text-5xl md:text-6xl font-bold">
      BoheniX
    </h1>
  );
}

export default Logo;