import React, { useEffect, useState } from "react";
import "../styles/pages/ContactUs.scss";

// Import placeholder images
import adPlaceholder1 from "../assets/img/contact/ad-placeholder-1.jpg";
import adPlaceholder2 from "../assets/img/contact/ad-placeholder-2.jpg";
import adPlaceholder3 from "../assets/img/contact/ad-placeholder-3.jpg";

const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact Us | KEANSBURG PARK";
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setMessageError("");
    setSubmissionMessage("");

    let hasError = false;

    if (!name.trim()) {
      setNameError("Please enter your name.");
      hasError = true;
    }
    if (!email.trim()) {
      setEmailError("Please enter your email.");
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!message.trim()) {
      setMessageError("Please enter your message.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    console.log("Submitted Contact Form:", { name, email, message });
    setSubmissionMessage(
      "Thank you for contacting us! We'll get back to you soon."
    );

    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => {
      setSubmissionMessage("");
    }, 5000);
  };

  return (
    <div className="ContactUs">
      <div className="contact-container">
        {/* Section 1: Contact Details + Image 1 */}
        <div className="contact-section-group">
          <div className="contact-details">
            <div className="contact-section">
              <div className="redBlock">
                <h2>Contact Information</h2>
              </div>
              <div className="contact-info">
                <i className="bx bxs-map"></i>
                <span>
                  <a
                    href="https://maps.app.goo.gl/gfwmqXtQHXSbtnGq5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    275 Beachway Ave, Keansburg, NJ 07734
                  </a>
                </span>
              </div>
              <div className="contact-info">
                <i className="bx bxs-phone"></i>
                <span>
                  <a href="tel:(732) 495-1400">(732) 495-1400</a>
                </span>
              </div>
              <div className="contact-info">
                <i className="bx bxs-envelope"></i>
                <span>
                  <a href="mailto:info@keansburgamusementpark.com">
                    info@keansburgamusementpark.com
                  </a>
                </span>
              </div>
            </div>

            <div className="contact-section">
              <div className="redBlock">
                <h2>Follow Us</h2>
              </div>
              <div className="social-media-links">
                <a
                  href="https://www.facebook.com/KeansburgAmusementRunawayRapids"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <i className="bx bxl-facebook"></i>
                </a>
                <a
                  href="https://www.tiktok.com/@keansburgamusementpark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <i className="bx bxl-tiktok"></i>
                </a>
                <a
                  href="https://www.instagram.com/keansburg_amusementpark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <i className="bx bxl-instagram"></i>
                </a>
                <a
                  href="https://www.youtube.com/@keansburgamusementparkruna6333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <i className="bx bxl-youtube"></i>
                </a>
              </div>
            </div>
          </div>
          {/* Image associated with Contact Details */}
          <div className="ad-section">
            <img
              src={adPlaceholder1}
              alt="Olde Heidelberg staff at Keansburg Amusement Park"
              className="ad-image"
            />
          </div>
        </div>

        {/* Section 2: Image 2 + Form  */}
        <div className="contact-section-group">
          {/* Image associated with Form */}
          <div className="ad-section">
            <img
              src={adPlaceholder2}
              alt="Keansburg park attractions"
              className="ad-image"
            />
          </div>
          <div className="contact-form-section">
            <div className="redBlock">
              <h2>Send Us a Message !</h2>
            </div>
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                />
                {nameError && <p className="error-message">{nameError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                />
                {emailError && <p className="error-message">{emailError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  name="message"
                />
                {messageError && (
                  <p className="error-message">{messageError}</p>
                )}
              </div>

              <button type="submit">Send Message</button>
              {submissionMessage && (
                <p className="success-message">{submissionMessage}</p>
              )}
            </form>
          </div>
        </div>

        {/* Section 3: Map + Image 3 */}
        <div className="contact-section-group">
          <div className="map-section">
            <div className="redBlock">
              <h2>Find Us</h2>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.9015870946305!2d-74.1346442!3d40.4553151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24ecd58443ccd%3A0x2137997ca2385d5!2sKeansburg%20Amusement%20Park!5e0!3m2!1sen!2s!4v1739073981853!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Keansburg Amusement Park Map"
            ></iframe>
            <p>
              <i class="bx bxs-map"></i>
              <span>
                <a
                  href="https://maps.app.goo.gl/gfwmqXtQHXSbtnGq5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  275 Beachway Ave, Keansburg, NJ 07734
                </a>
              </span>
            </p>
          </div>

          {/* Image associated with Map */}
          <div className="ad-section">
            <img
              src={adPlaceholder3}
              alt="Keansburg park grounds"
              className="ad-image"
            />
            {/* Slogan Container */}
            <div className="slogan-container">
              <p className="slogan-text">Your Adventure Awaits!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
