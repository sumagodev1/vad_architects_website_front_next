import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import footer_logo from '../pagesComponent/images/home/footer.png';
import { FaFacebookF, FaInstagram, FaLinkedin, FaEnvelope, FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt  } from 'react-icons/fa';

const Footer = () => {

    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const [socialLinks, setSocialLinks] = useState({});

    useEffect(() => {
        // Fetch Contact Info
        axios
          .get("/header-contact/getheaderContacts")
          .then((response) => {
            if (response.data.result) {
              setContacts(response.data.responseData || []);
            } else {
              setError(response.data.message);
            }
          })
          .catch(() => setError("Failed to fetch contact info"));
    }, []);

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

    const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    // pt-5 pb-3
    <footer style={{ backgroundColor: '#1D1D1D', color: '#fff' }} className="p-5">
      <div className="container mt-md-5 mb-md-5">
        <div className="row gy-4 text-center text-md-start">
            <div className="col-md-0 col-lg-1 col-sm-0">
                
            </div>
          {/* Logo Section */}
          <div className="col-lg-3 col-md-4  col-sm-12">
            <img
              src={footer_logo}
              alt="V.A.D. Architects Logo"
              style={{ maxWidth: '15rem', marginBottom: '1rem' }}
            />
          </div>

          {/* Company Links */}
          <div className="col-md-2 col-lg-2 col-sm-3">
            <h6 className="fw-bold mb-4">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/about" className="text-white text-decoration-none">Who We Are</Link></li>
              <li className="mb-2"><Link to="/#projects" className="text-white text-decoration-none">Our Work</Link></li>
            </ul>
          </div>

          {/* More Links */}
          <div className="col-md-2 col-lg-2 col-sm-3">
            <h6 className="fw-bold mb-4">More</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/#services" className="text-white text-decoration-none">Services</Link></li>
              <li className="mb-2"><Link to="/career" className="text-white text-decoration-none">Career</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-white text-decoration-none">Reach Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-4 col-sm-6">
            <h6 className="fw-bold mb-4">Contact us</h6>
            <div className="small mb-2 d-flex">
                <FaMapMarkerAlt className="me-2" style={{ fontSize: '2rem', marginTop:'-0.2rem' }} />
                <span className="text-justify">
                    602, Ganesh Gunjan Apartment, Lawate Nagar Lane No. 2, Near City Centre Mall, Untwadi, Nashik 422007
                </span>
                </div>
                <div className="small d-flex align-items-center">
                <FaPhoneAlt className="me-2" style={{ fontSize: '1rem' }} />
                {/* <span>{contacts[0]?.phone1 || "+919984736470"}</span> */}
                <a href={`tel:${contacts[0]?.phone2 || "213-814-2277"}`} className="text-white text-decoration-none">
                    {contacts[0]?.phone1 || "213-814-2277"}
                </a>
            </div>
          </div>
          <div className="col-md-0 col-lg-1 col-sm-0">
                
          </div>
        </div>

        <div className="row">
            <div className="col-md-0 col-lg-1 col-sm-0">
                
            </div>
            <div className="col-lg-10 col-md-12 col-sm-12">
                <hr className="my-4" style={{ borderColor: '#555' }} />

                {/* Bottom Row */}
                {/* <div className="d-md-flex justify-content-between align-items-center text-center text-md-start"> */}
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center text-center text-lg-start gap-3">
                      {/* Copyright - Shows first on lg and below Follow Us on small screens */}
                    <div className="order-2 order-lg-1 text-white">
                        © {currentYear} Copyright. Designed and Developed by <a href="https://sumagoinfotech.com/home" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-underline">Sumago Infotech</a>
                    </div>

                    {/* Social Icons Section */}
                    {/* <div className="d-flex flex-row align-items-center justify-content-center gap-2 gap-md-3 mt-3 mt-md-0 mb-md-0 mb-5 order-1 order-md-2"> */}
                    {/* <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-2 gap-md-3 mt-3 mt-md-0 mb-md-0 mb-5 order-1 order-md-2 text-white text-center text-md-start"> */}
                    <div className="order-1 order-lg-2 d-flex flex-column flex-md-column flex-lg-row align-items-center gap-2 text-white">
                        <span className="mb-1 mb-md-0">Follow us on:</span>
                        <div className="d-flex flex-row gap-2">
                            {socialLinks.facebook && (
                                <a href={socialLinks.facebook} className="d-flex align-items-center justify-content-center rounded-circle" style={iconStyle}>
                                    <FaFacebookF />
                                </a>
                            )}
                            {socialLinks.instagram && (
                                <a href={socialLinks.instagram} className="d-flex align-items-center justify-content-center rounded-circle" style={iconStyle}>
                                    <FaInstagram />
                                </a>
                            )}
                            {socialLinks.linkedin && (
                                <a href={socialLinks.linkedin} className="d-flex align-items-center justify-content-center rounded-circle" style={iconStyle}>
                                    <FaLinkedin />
                                </a>
                            )}
                            {socialLinks.email && (
                                <a href={`mailto:${socialLinks.email}`} className="d-flex align-items-center justify-content-center rounded-circle" style={iconStyle}>
                                    <FaEnvelope />
                                </a>
                            )}
                            {socialLinks.whatsappnumber && (
                                <a href={`https://wa.me/${socialLinks.whatsappnumber.replace(/\D/g, '')}`} className="d-flex align-items-center justify-content-center rounded-circle" style={iconStyle}>
                                    <FaWhatsapp />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Copyright Section */}
                    {/* <div className="text-white mb-2">
                        © {currentYear} Copyright. Designed and Developed by <a href="https://sumagoinfotech.com" className="text-white text-decoration-underline">Sumago Infotech</a>
                    </div> */}
                </div>
            </div>
            <div className="col-md-1">
                
            </div>
        </div>
      </div>
    </footer>
  );
};

const iconStyle = {
  width: '38px',
  height: '38px',
  backgroundColor: '#fff',
  color: '#444',
  fontSize: '1rem',
  boxShadow: '0 0 4px rgba(0,0,0,0.2)',
  textDecoration: 'none',
};

export default Footer;
