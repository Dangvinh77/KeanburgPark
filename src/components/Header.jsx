import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import "../styles/components/Header.scss";
import "../../node_modules/boxicons/css/boxicons.min.css";
import logo from "../assets/img/logo.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
const Header = () => {
  const [visitCount, setVisitCount] = useState(0);
  const isInitialMount = useRef(true); // Biến cờ để kiểm soát lần render đầu tiên
  const [isTopNavbarHidden, setIsTopNavbarHidden] = useState(false);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const location = useLocation(); // Get current location
  // Refs for ALL navigation items (including those with Link)
  const homeRef = useRef(null);
  const reviewRef = useRef(null);
  const contactUsRef = useRef(null);
  const ticketsRef = useRef(null);
  // Load visit count from localStorage and increment it
  useLayoutEffect(() => {
    if (isInitialMount.current) {
      // Chỉ chạy logic này ở lần render đầu tiên
      const storedVisitCount = localStorage.getItem("page_view");
      if (storedVisitCount) {
        const newCount = Number(storedVisitCount) + 1; // Tăng giá trị lên 1
        setVisitCount(newCount);
        localStorage.setItem("page_view", newCount);
      } else {
        setVisitCount(1); // Nếu không có giá trị, đặt thành 1
        localStorage.setItem("page_view", 1);
      }
      isInitialMount.current = false; // Đánh dấu đã render lần đầu
    }
  }, []);

  // Move scrollToTop outside useEffect
  const scrollToTop = useCallback(() => {
    const scrollDuration = 1000; // Thời gian scroll (ms)
    const scrollHeight = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / scrollDuration, 1);
      const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

      window.scrollTo(0, scrollHeight * (1 - easeInOutQuad(progress)));

      if (timeElapsed < scrollDuration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      // Remember measure height of top-Navbar again when edit Styles {100: 100px}
      if (window.scrollY > 90) {
        // Cuộn quá 100px thì ẩn
        setIsTopNavbarHidden(true);
        setIsNavbarFixed(true);
      } else {
        setIsTopNavbarHidden(false);
        setIsNavbarFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup khi component unmount để tránh memory leaks
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // --- Dropdown States and Refs ---
  const aboutUsRef = useRef(null);
  const galleryRef = useRef(null);
  const activityRef = useRef(null);

  const [isAboutUsDropdownOpen, setIsAboutUsDropdownOpen] = useState(false);
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);
  const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);

  // --- Close Dropdown Function ---
  const closeDropdowns = useCallback(() => {
    setIsAboutUsDropdownOpen(false);
    setIsGalleryDropdownOpen(false);
    setIsActivityDropdownOpen(false);
  }, []);

  // --- Toggle Dropdown Functions ---
  const toggleAboutUsDropdown = () => {
    setIsAboutUsDropdownOpen(!isAboutUsDropdownOpen);
    setIsGalleryDropdownOpen(false);
    setIsActivityDropdownOpen(false);
  };

  const toggleGalleryDropdown = () => {
    setIsGalleryDropdownOpen(!isGalleryDropdownOpen);
    setIsAboutUsDropdownOpen(false);
    setIsActivityDropdownOpen(false);
  };

  const toggleActivityDropdown = () => {
    setIsActivityDropdownOpen(!isActivityDropdownOpen);
    setIsAboutUsDropdownOpen(false);
    setIsGalleryDropdownOpen(false);
  };

  // --- Click Outside Handler ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        aboutUsRef.current &&
        !aboutUsRef.current.contains(event.target) &&
        galleryRef.current &&
        !galleryRef.current.contains(event.target) &&
        activityRef.current &&
        !activityRef.current.contains(event.target)
      ) {
        closeDropdowns();
      }
    };

    if (
      isAboutUsDropdownOpen ||
      isGalleryDropdownOpen ||
      isActivityDropdownOpen
    ) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    isAboutUsDropdownOpen,
    isGalleryDropdownOpen,
    isActivityDropdownOpen,
    closeDropdowns,
  ]);

  // --- Helper function to determine active state ---
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="Header">
        <div className="top-Navbar">
          <ul className="list-nav-item">
            <li>
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
            </li>
            <li>
              <i class="bx bxs-phone"></i>
              <span>
                <a href="tel:(732) 495-1400">(732) 495-1400</a>
              </span>
            </li>
            <li>
              <i class="bx bxs-envelope"></i>
              <span>
                <a href="mailto:info@keansburgamusementpark.com">
                  info@keansburgamusementpark.com
                </a>
              </span>
            </li>
          </ul>
          <ul className="list-nav-item">
            <li>
              <a
                href="https://www.facebook.com/KeansburgAmusementRunawayRapids"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="bx bxl-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@keansburgamusementpark"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="bx bxl-tiktok"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/keansburg_amusementpark"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="bx bxl-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@keansburgamusementparkruna6333"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="bx bxl-youtube"></i>
              </a>
            </li>
          </ul>
          <div className="visitor-count">
            <div className="TitleVisitor">
              <i class="bx bxs-user-account"></i>Visits
            </div>
            <div className="website-counter">{visitCount}</div>
          </div>
        </div>
        <div className={`Navbar ${isNavbarFixed ? "fixed" : ""}`}>
          <div className="Navbar-content">
            <div className="side-navbar">
              <Link
                to="/"
                ref={homeRef}
                className={isActive("/") ? "active" : ""}
              >
                <i className="bx bxs-home"></i>
              </Link>

              {/* About Us with Dropdown */}
              <Link
                className="dropdown-container"
                onMouseEnter={toggleAboutUsDropdown}
                onMouseLeave={toggleAboutUsDropdown}
              >
                <NavLink to="/aboutus">
                  {/* Use NavLink */}
                  About Us
                </NavLink>
                {isAboutUsDropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/aboutus/disclaimer">Disclaimer</Link>
                    <Link to="/aboutus/privacy-policy">Policy</Link>
                    <Link to="/aboutus/tickets-term">Booking Terms</Link>
                  </div>
                )}
              </Link>
              {/* Gallery with Dropdown */}
              <Link
                className="dropdown-container"
                onMouseEnter={toggleGalleryDropdown}
                onMouseLeave={toggleGalleryDropdown}
              >
                <NavLink to="/gallery">
                  {/* Use NavLink */}
                  Gallery
                </NavLink>
                {isGalleryDropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/gallery/website">Website Gallery</Link>
                    <Link to="/gallery/visitor">Visitor Gallery</Link>
                  </div>
                )}
              </Link>

              <Link
                className="dropdown-container"
                onMouseEnter={toggleActivityDropdown}
                onMouseLeave={toggleActivityDropdown}
              >
                <NavLink to="/activity">
                  {/* Use NavLink */}
                  Activity
                </NavLink>
                {isActivityDropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/activity/attractions">Attractions</Link>
                    <Link to="/activity/waterpark">Waterpark</Link>
                    <Link to="/activity/beach">Beach</Link>
                    <Link to="/activity/foodndrink">Food and Drinks</Link>
                    <Link to="/activity/fishingpier">Fishing Pier</Link>
                    <Link to="/activity/events">Events</Link>
                    <Link to="/activity/accessibility">Accessibility</Link>
                  </div>
                )}
              </Link>
            </div>
            <div className="logo-navbar">
              <Link to="/" className="logo">
                <img src={logo} alt="Keansburg Park" />
              </Link>
            </div>
            <div className="side-navbar">
              <Link
                to="/review"
                ref={reviewRef}
                className={isActive("/review") ? "active" : ""}
              >
                Review
              </Link>
              <Link
                to="/contactus"
                ref={contactUsRef}
                className={isActive("/contactus") ? "active" : ""}
              >
                Contact Us
              </Link>
              <Link
                to="/tickets"
                ref={ticketsRef}
                className={`buy-tickets ${
                  isActive("/tickets") ? "active" : "buy-tickets"
                }`}
              >
                <i className="bx bxs-purchase-tag"></i>Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`ScrolltoTop ${isTopNavbarHidden ? "" : "hidden"}`}
        onClick={scrollToTop}
      >
        <i class="bx bxs-chevrons-up"></i>
      </div>
    </>
  );
};

export default Header;
