import { useEffect, useRef } from 'react';

function ServiceSection({ activeService, setActiveService, handleButtonClick }) {
  const contentRefs = {
    'smart-roads': useRef(null),
    'tech-services': useRef(null),
    'product-sales': useRef(null),
  };

  useEffect(() => {
    Object.keys(contentRefs).forEach((service) => {
      const content = contentRefs[service].current;
      if (content) {
        const isActive = activeService === service;
        content.classList.toggle('active', isActive);
        if (isActive) {
          content.style.height = `${content.scrollHeight}px`;
        } else {
          content.style.height = '0px';
        }
      }
    });
  }, [activeService]);

  const handleServiceClick = (service) => {
    setActiveService(activeService === service ? null : service);
  };

  return (
    <>
      <div className="service-buttons">
        <button
          id="smart-roads"
          onClick={(e) => {
            handleButtonClick(e);
            handleServiceClick('smart-roads');
          }}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-full hover:from-orange-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] service-button"
        >
          Smart Roads
        </button>
        <button
          id="tech-services"
          onClick={(e) => {
            handleButtonClick(e);
            handleServiceClick('tech-services');
          }}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-full hover:from-orange-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] service-button"
        >
          Tech Services
        </button>
        <button
          id="product-sales"
          onClick={(e) => {
            handleButtonClick(e);
            handleServiceClick('product-sales');
          }}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-full hover:from-orange-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] service-button"
        >
          Product Sales
        </button>
      </div>
      <div
        ref={contentRefs['smart-roads']}
        className={`service-content ${activeService === 'smart-roads' ? 'active' : ''}`}
      >
        <p>
          BoheniX Solutions is revolutionizing transportation with Smart Road technology. Our advanced systems prevent accidents in real-time by detecting hazards and alerting drivers instantly.
        </p>
        <p className="mt-2">
          We collect comprehensive road data to optimize traffic flow, reduce congestion, and enhance urban planning. Our solutions also enable automated fining of traffic offenders, ensuring compliance and safety.
        </p>
        <p className="mt-2">
          With intelligent traffic control, we create safer, smarter cities, paving the way for a connected future.
        </p>
      </div>
      <div
        ref={contentRefs['tech-services']}
        className={`service-content ${activeService === 'tech-services' ? 'active' : ''}`}
      >
        <p>
          BoheniX Solutions offers cutting-edge IoT, software, and hardware services tailored to your needs. Our Internet of Things (IoT) solutions connect devices for seamless data exchange and automation.
        </p>
        <p className="mt-2">
          Our custom software development delivers robust, scalable applications to drive business efficiency. We also specialize in hardware integration, designing and implementing advanced systems for diverse industries.
        </p>
        <p className="mt-2">
          Partner with us to harness the power of technology for innovation and growth.
        </p>
      </div>
      <div
        ref={contentRefs['product-sales']}
        className={`service-content ${activeService === 'product-sales' ? 'active' : ''}`}
      >
        <p>
          BoheniX Solutions provides high-quality technology products and advanced machinery to empower businesses. Our product range includes state-of-the-art IoT devices, sensors, and automation tools.
        </p>
        <p className="mt-2">
          We offer robust machinery for industries such as transportation, manufacturing, and smart cities, designed for reliability and performance.
        </p>
        <p className="mt-2">
          Equip your operations with our innovative solutions to stay ahead in a digital world.
        </p>
      </div>
    </>
  );
}

export default ServiceSection;