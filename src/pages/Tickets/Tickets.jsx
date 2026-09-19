import React, { useEffect, useState } from "react";
import "../../styles/pages/Tickets/Tickets.scss";
import SuccessMessage from "../../pages/Tickets/SuccessMessage"; // Import

// Import placeholder images (REPLACE WITH YOUR ACTUAL IMAGES)
import dailyTicketImage from "../../assets/img/tickets/daily-ticket.png";
import weeklyTicketImage from "../../assets/img/tickets/weekly-ticket.png";
import familyTicketImage from "../../assets/img/tickets/family-ticket.png";
import discountImage1 from "../../assets/img/tickets/discount-1.png";
import discountImage2 from "../../assets/img/tickets/discount-2.png";

const PRICES = {
  daily: { adult: 25, child: 15, base: 25 },
  weekly: { adult: 100, child: 60, base: 100 },
  family: {
    small: { adult: 20, child: 12, base: 40 },
    large: { adult: 18, child: 10, base: 54 },
  },
};

const Tickets = () => {
  useEffect(() => {
    document.title = "Tickets | KEANSBURG PARK";
  }, []);

  const [ticketType, setTicketType] = useState("daily");
  const [familySize, setFamilySize] = useState("small");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState(""); // Keep this for pre-submission messages
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cardError, setCardError] = useState("");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // Add this

  // Ticket image mapping and prices
  const ticketOptions = [
    {
      type: "daily",
      image: dailyTicketImage,
      alt: "Daily Ticket",
      label: "Daily Ticket",
      price: PRICES.daily.base,
    },
    {
      type: "weekly",
      image: weeklyTicketImage,
      alt: "Weekly Ticket",
      label: "Weekly Ticket",
      price: PRICES.weekly.base,
    },
    {
      type: "family",
      image: familyTicketImage,
      alt: "Family Ticket",
      label: "Family Ticket",
      price: PRICES.family[familySize].base,
    },
  ];

  // Discount data (replace with actual data)
  const discounts = [
    {
      title: "Weekday Special",
      description: "Unlimited rides for $19.95 on Mon-Thurs (1pm-8pm).",
      image: discountImage1,
      validity: "Mondays-Thursdays, 1pm-8pm",
      terms: "*Excludes Go Karts. No refunds or rainchecks.",
    },
    {
      title: "Waterpark + Amusement Park Combo",
      description: "3-hour Waterpark access + all-day amusement park rides!",
      image: discountImage2,
      validity: "Mondays-Fridays",
      terms: "*Excludes Go Karts. Other restrictions may apply.",
    },
  ];

  useEffect(() => {
    let basePrice = 0;

    if (ticketType === "daily") {
      basePrice = PRICES.daily.adult * quantity;
    } else if (ticketType === "weekly") {
      basePrice = PRICES.weekly.adult * quantity;
    } else if (ticketType === "family") {
      if (familySize === "small") {
        const numAdults = Math.min(quantity, 2);
        const numChildren = Math.max(0, quantity - 2);
        basePrice =
          numAdults * PRICES.family.small.adult +
          numChildren * PRICES.family.small.child;
      } else {
        const numAdults = Math.min(quantity, 3);
        const numChildren = Math.max(0, quantity - 3);
        basePrice =
          numAdults * PRICES.family.large.adult +
          numChildren * PRICES.family.large.child;
      }
    }

    setTotalPrice(basePrice);
  }, [ticketType, familySize, quantity]);

  const handleTicketTypeChange = (type) => {
    setTicketType(type);
    setQuantity(1);
    if (type === "family") {
      setFamilySize("small");
    }
  };

  const handleFamilySizeChange = (size) => {
    setFamilySize(size);
    if (ticketType === "family") {
      setQuantity(1);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method !== "creditCard") {
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
    }
  };

  const handleAddToCart = () => {
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setCardError("");
    setSubmissionMessage("");

    let hasError = false;

    if (!cardholderName.trim()) {
      setNameError("Please enter the cardholder name.");
      hasError = true;
    }
    if (!billingAddress.trim()) {
      setSubmissionMessage("Please enter your billing address.");
      hasError = true;
    }
    if (!phoneNumber.trim()) {
      setPhoneError("Please enter your phone number.");
      hasError = true;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      hasError = true;
    }
    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (paymentMethod === "creditCard") {
      if (!cardNumber.trim() || !expiryDate.trim() || !cvv.trim()) {
        setCardError("Please fill in all credit card details.");
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    // Simulate a successful payment.  In a real application, you would
    // send this data to a payment gateway (e.g., Stripe, PayPal).
    setIsPaymentSuccessful(true);

    console.log("Added to Cart:", {
      ticketType,
      familySize, // Keep familySize for the success message
      quantity,
      totalPrice,
      paymentMethod,
      cardholderName,
      billingAddress,
      phoneNumber,
      email,
      cardNumber,
      expiryDate,
      cvv,
    });

    // Reset form fields (optional - you might want to keep some fields)
    // setQuantity(1);
    setCardholderName("");
    setBillingAddress("");
    setPhoneNumber("");
    setEmail("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    // setSubmissionMessage(""); // Don't set this anymore
  };
  useEffect(() => {
    if (isPaymentSuccessful) {
      setTimeout(() => {
        setQuantity(1); // Reset quantity after success message is displayed
      }, 3000); // Adjust the timeout as needed
    }
  }, [isPaymentSuccessful]);
  // Conditional Rendering: Show SuccessMessage if payment is successful
  if (isPaymentSuccessful) {
    return (
      <SuccessMessage
        ticketType={ticketType}
        quantity={quantity} // Pass quantity
        familySize={familySize} // Pass familySize
        totalPrice={totalPrice}
        paymentMethod={
          paymentMethod === "creditCard" ? "Credit Card" : "Paypal"
        }
      />
    );
  }

  return (
    <div className="Tickets">
      <div className="ticket-container">
        <div className="ticket-selection">
          <h2>Choose Your Ticket</h2>

          <div className="ticket-type-selection">
            {ticketOptions.map((option) => (
              <button
                key={option.type}
                className={`ticket-button ${
                  ticketType === option.type ? "active" : ""
                }`}
                onClick={() => handleTicketTypeChange(option.type)}
              >
                <div className="ticket-image-container">
                  <img src={option.image} alt={option.alt} />
                  <span className="ticket-price">
                    ${PRICES[option.type].base}
                  </span>
                </div>
                {option.label}
              </button>
            ))}
          </div>

          {ticketType === "family" && (
            <div className="family-size-selection">
              <label>Family Size:</label>
              <select
                value={familySize}
                onChange={(e) => handleFamilySizeChange(e.target.value)}
              >
                <option value="small">Small (Up to 2 Adults + Children)</option>
                <option value="large">Large (3+ Adults/Children)</option>
              </select>
            </div>
          )}

          <div className="quantity-selection">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>

          <div className="price-display">
            <p>Total Price: ${totalPrice}</p>
          </div>

          <div className="discounts-section">
            <h2>Discounts & Specials</h2>
            <div className="discount-cards">
              {discounts.map((discount, index) => (
                <div className="discount-card" key={index}>
                  <img
                    src={discount.image}
                    alt={discount.title}
                    className="discount-image"
                  />
                  <div className="discount-info">
                    <h3>{discount.title}</h3>
                    <p>{discount.description}</p>
                    <p>
                      <strong>Validity:</strong> {discount.validity}
                    </p>
                    <p className="discount-terms">{discount.terms}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="payment-info">
          <h2>Payment Information</h2>
          <div className="payment-options">
            <h3>Payment Method:</h3>
            <button
              className={`payment-button ${
                paymentMethod === "creditCard" ? "active" : ""
              }`}
              onClick={() => handlePaymentMethodChange("creditCard")}
            >
              <i class="bx bxs-credit-card-alt"></i>
              Credit Card
            </button>
            <button
              className={`payment-button ${
                paymentMethod === "paypal" ? "active" : ""
              }`}
              onClick={() => handlePaymentMethodChange("paypal")}
            >
              <i class="bx bxl-paypal"></i>
              PayPal
            </button>
          </div>

          {paymentMethod === "creditCard" && (
            <div className="credit-card-form">
              <h3>Credit Card Details</h3>
              <div className="form-group">
                <label>Card Number:</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Expiry Date (MM/YY):</label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>CVV:</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
              {cardError && <p className="error-message">{cardError}</p>}
            </div>
          )}

          <div className="billing-info">
            <h3>Billing Information</h3>
            <div className="form-group">
              <label>Cardholder Name:</label>
              <input
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                required
              />
              {nameError && <p className="error-message">{nameError}</p>}
            </div>
            <div className="form-group">
              <label>Billing Address:</label>
              <input
                type="text"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              {phoneError && <p className="error-message">{phoneError}</p>}
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
          </div>

          {/* NO success message here */}
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          {submissionMessage && (
            <p className="error-message">{submissionMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
