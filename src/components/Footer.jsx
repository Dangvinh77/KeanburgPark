import "../styles/components/Footer.scss";
import logo from "../assets/img/logo.svg";
import React, { useState } from "react";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null); // 'success' | 'error' | null

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Email validation (same regex as before)
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      setSubmissionResult("error");
      setTimeout(() => setSubmissionResult(null), 5000); // Clear error after 5s
      return;
    }

    setIsSubmitting(true);

    // Simulate subscription (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionResult("success");
      setEmail(""); // Clear the input on success

      setTimeout(() => setSubmissionResult(null), 8000); // Clear message after 8s
    }, 2000); // Simulate a 2-second delay
  };
  return (
    <>
      <div className="Footer">
        <div className="top-Footer">
          <div className="logo-Footer">
            <a href="/">
              <img src={logo} alt="Keansburg Park" />
            </a>
          </div>
          <div className="email-form">
            <div className="form">
              <div className="Title-form">
                <h2>Contact us here</h2>
                <p className="description">Subscribe for Updates weekly</p>
              </div>
              <div className="Content-form">
                <form onSubmit={handleSubmit} className="subscrbe-form">
                  <input
                    type="text" // Use type="email" for better validation
                    placeholder="Enter your email here "
                    value={email}
                    onChange={handleEmailChange}
                    name="email" // Add name attribute
                  />
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Subcribing." : "Subscribe"}
                    <i class="bx bx-mail-send"></i>
                  </button>
                </form>
                {submissionResult === "success" && (
                  <p className="success-message">Successfully!</p>
                )}
                {submissionResult === "error" && (
                  <p className="error-message">Please enter a valid email</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mid-Footer">
          <div className="list-Footer">
            <div className="title-list">About Us</div>
            <div className="line-list"></div>
            <div className="content-list">
              <ul>
                <li>
                  <a href="/aboutus">Introduce</a>
                </li>
                <li>
                  <a href="/aboutus/disclaimer">Disclaimer</a>
                </li>
                <li>
                  <a href="/aboutus/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/aboutus/tickets-term">Tickets Term</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="list-Footer">
            <div className="title-list">Gallery</div>
            <div className="line-list"></div>
            <div className="content-list">
              <ul>
                <li>
                  <a href="/gallery">General Gallery</a>
                </li>
                <li>
                  <a href="/gallery/website">Website Gallery</a>
                </li>
                <li>
                  <a href="/gallery/visitor">Visitor Gallery</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="list-Footer">
            <div className="title-list">Activity</div>
            <div className="line-list"></div>
            <div className="content-list">
              <ul>
                <li>
                  <a href="/activity/attractions">Attractions</a>
                </li>
                <li>
                  <a href="/activity/waterpark">Waterpark</a>
                </li>
                <li>
                  <a href="/activity/beachr">Beach</a>
                </li>
                <li>
                  <a href="/activity/foodndrink">Food and Drink</a>
                </li>
                <li>
                  <a href="/activity/fishingpier">Fishing Pier</a>
                </li>
                <li>
                  <a href="/activity/events">Events</a>
                </li>
                <li>
                  <a href="/activity/accessibility">Accessibility</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="list-Footer">
            <div className="title-list">Others</div>
            <div className="line-list"></div>
            <div className="content-list">
              <ul>
                <li>
                  <a href="/review">Review</a>
                </li>
                <li>
                  <a href="//tickets">Buy Tickets</a>
                </li>
                <li>
                  <a href="/">Homepage</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="list-Footer">
            <div className="title-list">Contact</div>
            <div className="line-list"></div>
            <div className="content-list">
              <ul>
                <li>
                  <div className="icon-contact">
                    <i class="bx bxs-phone"></i>
                  </div>
                  <div>(732) 495-1400</div>
                </li>
                <li>
                  <div className="icon-contact">
                    <i class="bx bxs-envelope"></i>
                  </div>
                  <div>info@keansburgamusementpark.com</div>
                </li>
                <li>
                  <div className="icon-contact">
                    <i class="bx bxs-map"></i>
                  </div>
                  <div>275 Beachway Ave, Keansburg, NJ 07734</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bot-Footer">
          <div className="webcopyright">
            &copy; Copyright 2025 KEANSBURG PARK. All Rights Reserved
          </div>
          <div className="devcopyright">Developed by Group 1</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
