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


const About = () => {

  const location = useLocation();

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

  return (
    <>
      <Navbar />

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
              >
                <source src={banner} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* --- ABOUT SECTION --- */}
      <div className="container my-5">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6">
            <p className="about-text text-justify me-5">
              Lorem ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem ipsum has been the industry’s standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries, but also the leap into electronic typesetting, 
              remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
              containing Lorem Ipsum passages, and more recently with desktop publishing software 
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <h1 className="about-heading">
              ABOUT <span className="light">VAD Architects</span>
            </h1>

            <div className="row mt-4">
              <div className="col-6 mb-4">
                <h3 className="stat-title fw-bold">10 YEAR</h3>
                <h4 className="stat-subtitle">Experience</h4>
              </div>
              <div className="col-6 mb-4">
                <h3 className="stat-title">150,000</h3>
                <h4 className="stat-subtitle">SQFT</h4>
              </div>
              <div className="col-6 mb-4">
                <h3 className="stat-title">8 TEAM</h3>
                <h4 className="stat-subtitle">Members</h4>
              </div>
              <div className="col-6 mb-4">
                <h3 className="stat-title">50</h3>
                <h4 className="stat-subtitle">Projects</h4>
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
            {socialLinks.email && (
            <a
                href={`mailto:${socialLinks.email}`}
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
