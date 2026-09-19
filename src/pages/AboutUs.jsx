import { useEffect, useRef } from "react";
import "../styles/pages/AboutUs.scss";
import useScrollTo from "../hooks/useScrollTo";
const AboutUs = () => {
  // Setup title for page
  useEffect(() => {
    document.title = "About Us | KEANSBURG PARK";
  }, []);
  // Refs for each section
  const introRef = useRef(null);
  const disclaimerRef = useRef(null);
  const privacyPolicyRef = useRef(null);
  const bookingTermsRef = useRef(null);
  const refs = {
    "introduce-info": introRef,
    "disclamer-info": disclaimerRef,
    "privacy-policy": privacyPolicyRef,
    "booking-terms": bookingTermsRef,
  };

  useScrollTo(refs);
  return (
    <>
      <div className="AboutUs">
        <h1 ref={introRef} id="introduce-info">
          Introduction
        </h1>
        <p
          style={{
            fontSize: "15pt",
            padding: "50px 0px",
            textAlign: "justify",
            lineHeight: "1.6",
          }}
        >
          Welcome to Keansburg Amusement Park, your premier destination for
          thrilling adventures and unforgettable memories! Our homepage is your
          gateway to a world of vibrant colors, exhilarating rides, and
          captivating attractions, meticulously designed to spark joy and create
          lasting moments for guests of all ages. Step inside and explore the
          magic that awaits within our park’s gates, from heart-stopping roller
          coasters to family-friendly escapades. We believe in the power of
          shared experiences and have crafted every detail to ensure that each
          visit to Keansburg is brimming with excitement and wonder. Discover our
          digital landscape to uncover a wealth of information, including rides,
          shows, dining, and park amenities, all designed to make your planning
          seamless and enjoyable. We invite you to dive into our online world
          and experience the very essence of what makes Keansburg so special: the
          thrill, the excitement, and the genuine happiness.
        </p>
        <br />
        <h1 ref={disclaimerRef} id="disclamer-info">
          Disclamer
        </h1>
        <p
          style={{
            fontSize: "15pt",
            padding: "50px 0px",
            textAlign: "justify",
            lineHeight: "1.6",
          }}
        >
          While we strive to provide the most accurate and up-to-date
          information, please be advised that park hours, ride availability,
          show schedules, and pricing are subject to change without prior
          notice. We highly recommend that you verify all details pertinent to
          your visit directly on our site or by contacting our customer service
          team prior to your arrival. Furthermore, Keansburg Amusement Park is
          not responsible for personal belongings or any unforeseen accidents
          that may occur during your visit. It is imperative that all guests
          adhere to safety regulations and guidelines posted throughout the park
          to ensure a safe and enjoyable experience for everyone. We aim to
          create a magical experience, and we appreciate your understanding that
          some operational changes may be required from time to time.
        </p>
        <br />
        <h1 ref={privacyPolicyRef} id="privacy-policy">
          Privacy Policy
        </h1>
        <p
          style={{
            fontSize: "15pt",
            padding: "50px 0px",
            textAlign: "justify",
            lineHeight: "1.6",
          }}
        >
          At Keansburg Amusement Park, we are committed to protecting your
          privacy and ensuring the security of your personal information. When
          you visit our website or purchase tickets, we may collect certain
          data, such as your name, email address, and payment details, which are
          used solely for the purpose of processing your transactions and
          improving your overall experience with us. We assure you that your
          information is handled with the utmost confidentiality and will never
          be shared with third parties without your explicit consent, unless
          required by law. We utilize secure technology and industry-standard
          practices to safeguard your personal data against unauthorized access,
          loss, or misuse. By interacting with our services, you consent to the
          collection and use of your information as described in this policy. We
          are dedicated to maintaining a trustworthy and secure environment for
          all our guests, both online and within the park, and encourage you to
          contact us with any questions or concerns regarding your privacy. Your
          peace of mind is paramount to us, and we strive to maintain a
          transparent and secure relationship with every visitor to Keansburg.
        </p>
        <br />
        <h1 ref={bookingTermsRef} id="booking-terms">
          Ticket Booking Terms
        </h1>
        <p
          style={{
            fontSize: "15pt",
            padding: "50px 0px",
            textAlign: "justify",
            lineHeight: "1.6",
          }}
        >
          All ticket purchases for Keansburg Amusement Park are considered final
          and non-refundable. We encourage you to carefully review your chosen
          date and ticket type before completing your transaction. Any special
          promotions, discounts, or group rates are valid only during the
          stipulated promotional periods and while supplies last, and may be
          subject to specific terms and conditions. Furthermore, lost or damaged
          tickets cannot be replaced. Keansburg Amusement Park reserves the right
          to refuse admission or eject any individual who violates park policies
          or behaves in a manner deemed disruptive or harmful to others. Your
          booking constitutes acceptance of these terms and conditions, and we
          eagerly anticipate welcoming you to Keansburg for a day filled with
          unforgettable fun.
        </p>
      </div>
    </>
  );
};

export default AboutUs;
