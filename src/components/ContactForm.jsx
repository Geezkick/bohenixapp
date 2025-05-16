import { useState } from 'react';

function ContactForm({ handleButtonClick }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-form">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Your Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Your Email"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="Your Message"
        rows="4"
        required
      ></textarea>
      <button
        className="mt-1 px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-full hover:from-orange-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] contact-button"
        onClick={(e) =>
          handleButtonClick(e, () => {
            alert(`Thank you, ${formData.name || 'User'}! Your message has been sent.`);
            setFormData({ name: '', email: '', message: '' });
          })
        }
      >
        Send Message
      </button>
    </div>
  );
}

export default ContactForm;