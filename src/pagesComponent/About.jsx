import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFacebookF, FaInstagram, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import Navbar from '../layoutComponent/Navbar';
import Footer from '../layoutComponent/Footer';
import AboutPrincipal from './AboutPrincipal';
import Team from './Team';
import Gallery from './Gallery';
import banner from './images/banner.mp4';
import './About.css'; // Link to the custom CSS
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import loaderVideo from './images/loader.mp4';
import AOS from "aos";
import "aos/dist/aos.css";


const About = () => {

  const location = useLocation();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      AOS.init({
        duration: 1000, // Animation duration in milliseconds
        once: false, // Whether animation should only happen once
      });
    }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          // el.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            const yOffset = -100; // 👈 Adjust this value as needed (negative scrolls up)
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }, 100);          
        }, 100); // slight delay to ensure the component is mounted
      }
    }
  }, [location]);

    const [socialLinks, setSocialLinks] = useState({});

    useEffect(() => {
        const fetchSocialLinks = async () => {
            try {
            const response = await axios.get("/social-contact/get-socialcontacts");
            const links = response.data.responseData;
        
            // Transform the array into an object like { facebook: '...', instagram: '...' }
            const formattedLinks = {};
            links.forEach((item) => {
                if (!item.isDelete && item.isActive) {
                const name = item.name.toLowerCase().replace(/\s+/g, '');
                formattedLinks[name] = item.url;
                }
            });
        
            setSocialLinks(formattedLinks);
            } catch (err) {
            console.error("Error fetching social media links:", err);
            }
        };
        
        fetchSocialLinks();
    }, []);

    
      const handleVideoLoaded = () => {
        setLoading(false);  // Stop the loader when the video is loaded
      }; 

  return (
    <>

      <Helmet>
        <title>About VAD Architects | Design Philosophy & Story of Viraj Daspute</title>
        <meta name="description" content="Learn about VAD Architects – a visionary architecture and interior design firm in Nashik, led by Viraj Daspute. Discover our journey, values, and design philosophy." />
        <meta name="keywords" content="VAD Architects, luxury interior design, architectural design, high-end design, sophisticated interiors, elegant architecture, design philosophy, residential architecture, commercial interior design, Viraj Daspute, design process, testimonials." />
        <meta name="author" content="VAD Architects" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="About VAD Architects | Design Philosophy & Story of Viraj Daspute" />
        <meta property="og:description" content="Learn about VAD Architects – a visionary architecture and interior design firm in Nashik, led by Viraj Daspute. Discover our journey, values, and design philosophy." />
        <meta property="og:image" content={banner} />
        <meta property="og:url" content="https://staging.vadarchitects.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VAD Architects | Luxury Interior & Architectural Design" />
        <meta name="twitter:description" content="Learn about VAD Architects – a visionary architecture and interior design firm in Nashik, led by Viraj Daspute. Discover our journey, values, and design philosophy." />
        <meta name="twitter:image" content={banner} />
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta name="twitter:creator" content="@YourTwitterHandle" />
      </Helmet>

      <Navbar />

            {/* Show loader if video is still loading */}
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: '#fff', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <video autoPlay loop muted style={{ maxWidth: '100%', maxHeight: '100%' }}>
            <source src={loaderVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div className='container-fluid px-0'>
        <div className='row gx-0'>
          <div className='col-12'>
            <div className="career-banner-video-wrapper">
              <video
                className="career-banner-video"
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={handleVideoLoaded}
              >
                <source src={banner} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* --- ABOUT SECTION --- */}
      <div className="container my-4 my-md-5">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-5" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
            <p className="about-text text-justify me-5">
            At VAD Architects, we believe great design starts with understanding how people live and work. Our team brings together expertise in architecture, interiors, and landscaping to design spaces that are comfortable, efficient, and visually appealing. Whether it’s a residential project or a commercial building, we prioritize good planning, natural light, smart material use, and long-term value. Every project is handled with care, detail, and a focus on lasting quality.
            </p>
          </div>

          {/* Right Column */}
          <div className="col-md-7" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
            <h1 className="about-heading">
              ABOUT <span className="light">VAD Architects</span>
            </h1>

            <div className="row mt-4">
              <div className="col-6 mb-4">
                <h3 className="stat-title fw-bold">10 YEAR</h3>
                <h3 className="stat-subtitle">Experience</h3>
              </div>
              <div className="col-6 mb-4">
                <h3 className="stat-title">150,000</h3>
                <h3 className="stat-subtitle">SQFT</h3>
              </div>
              <div className="col-6 mb-4">
                <h3 className="stat-title">8 TEAM</h3>
                <h3 className="stat-subtitle">Members</h3>
              </div>
              <div className="col-6 mb-4">
                <h3 className="stat-title">50</h3>
                <h3 className="stat-subtitle">Projects</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AboutPrincipal/>

      <Team/>

      <Gallery/>

        <section className="social-media-section text-center">
            <h3 className="mb-3 fw-bold">Follow Us On</h3>
            <div className="d-flex justify-content-center gap-3">
            {socialLinks.facebook && (
            <a
                href={socialLinks.facebook}
                className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle gallery_social_logo_shadow"
                style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
            >
                <FaFacebookF style={{ height: "1.2rem", fill: "#444444" }} />
            </a>
            )}
            <a
                href={socialLinks.instagram}
                className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
            >
                <FaInstagram style={{ height: "1.2rem", fill: "#444444" }} />
            </a>
            {socialLinks.emailid && (
            <a
                href={`mailto:${socialLinks.emailid}`}
                className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
            >
                <FaEnvelope style={{ height: "1.2rem", fill: "#444444" }} />
            </a>
            )}
            {socialLinks.whatsappnumber && (
            <a
                href={`https://wa.me/${socialLinks.whatsappnumber.replace(/\D/g, "")}`}
                className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
            >
                <FaWhatsapp style={{ height: "1.2rem", fill: "#444444" }} />
            </a>
            )}
            <a href={socialLinks.linkedin} className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                style={{ width: "45px", height: "45px", backgroundColor: '#fff' }} target="_blank" rel="noopener noreferrer" >
                <FaLinkedin style={{ height: '1.2rem', fill: "#444444" }} />
            </a>
            </div>
        </section>
        <section className="gallery_last_bg_color_sec p-4">
            <div className="container-fluid"></div>
        </section>

      <Footer/>

    </>
  );
};

export default About;
