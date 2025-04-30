import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import Swal from 'sweetalert2';
import Navbar from '../layoutComponent/Navbar';
import Footer from '../layoutComponent/Footer';
import banner from './images/banner.mp4';
import contactpage from './images/contactpage.webp';
import './Contact.css';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// import loaderVideo from './images/loader.mp4';
import { FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaFacebookF, FaInstagram, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {

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

    const captchaRef = useRef(null);
    const [recaptchaResponse, setRecaptchaResponse] = useState(null);
    const [socialLinks, setSocialLinks] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    
    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        subject:'',
        recaptcha: ''
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };
    
        // Name validation
        if (!formData.name) {
          newErrors.name = 'Please enter your name';
          valid = false;
        } else {
          newErrors.name = '';
        }
    
        // Phone validation
        if (!validatePhone(formData.phone)) {
          newErrors.phone = "Mobile number must start with 9, 8, 7, or 6";
          valid = false;
        } else {
          newErrors.phone = "";
        }
    
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
          newErrors.email = 'Please enter your email';
          valid = false;
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
          valid = false;
        } else {
          newErrors.email = '';
        }

        if (!formData.subject) {
            newErrors.subject = 'Please enter a subject';
            valid = false;
          } else {
            newErrors.subject = '';
        }
    
        // Message validation
        if (!formData.message) {
          newErrors.message = 'Please enter a message';
          valid = false;
        } else {
          newErrors.message = '';
        }
    
        // ReCAPTCHA validation
        if (!recaptchaResponse) {
          newErrors.recaptcha = 'Please complete the ReCAPTCHA';
          valid = false;
        } else {
          newErrors.recaptcha = '';
        }
    
        setErrors(newErrors);
        return valid;
    };

    const validatePhone = (phone) => {
        // const phoneRegex = /^\+91[6789]\d{9}$/;  
        const phoneRegex = /^[6789]\d{9}$/; // Only allow numbers that start with +91 followed by 9, 8, 7, or 6
        return phoneRegex.test(phone);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Allow only alphabets and spaces in Name field
        if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;

        // Allow only numbers in Phone field
        // if (name === "phone" && !/^\d*$/.test(value)) return;

        // Allow only valid email characters
        if (name === "email" && !/^[a-zA-Z0-9@.]*$/.test(value)) return;

        // Word limit for message field
        if (name === "message") {
          const words = value.trim().split(/\s+/);
          if (words.length > 300) return; // Restrict input if over 300 words
        }

      if (name === "phone") {
        let sanitizedValue = value.replace(/[^0-9+]/g, ""); // Only allow numbers and '+'
    
        if (sanitizedValue.includes("+") && sanitizedValue.indexOf("+") !== 0) {
          return; // Prevent '+' anywhere except the start
        }
    
        setFormData((prevState) => ({
          ...prevState,
          [name]: sanitizedValue
        }));
    
        // Validate phone dynamically and remove error if correct
        if (validatePhone(sanitizedValue)) {
          setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
        }
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value
        }));
      }
      };
    
      const handleRecaptchaChange = (value) => {
        setRecaptchaResponse(value);  // Store CAPTCHA response
        setErrors((prevState) => ({
          ...prevState,
          recaptcha: '' // Reset ReCAPTCHA error when user solves it
        }));
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setLoading(true); // Start loader
            
            try {
                const response = await axios.post("/carousal-form/addcarousalform", {
                    name: formData.name,
                    mobile: formData.phone,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message
                });
    
                console.log('Form submitted', response.data);
    
                Swal.fire({
                    title: 'Success!',
                    text: 'Thank you! We will contact you soon.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                      confirmButton: 'custom-ok-button'
                  }
                });
    
                // Reset form after submission
                setFormData({ name: '', phone: '', email: '', subject: '' , message: '' });
                setErrors({});
                captchaRef.current.reset(); 
            } catch (error) {
                console.error('Failed to submit form:', error);
    
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to submit data. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                      confirmButton: 'custom-ok-button'
                  }
                });
            } finally {
                setLoading(false); // Stop loader
            }
        }
    };


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

    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

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

    // const handleVideoLoaded = () => {
    //   setLoading(false);  // Stop the loader when the video is loaded
    // }; 
      

  return (
    <>

      <Helmet>
        <title>Contact VAD Architects | Get in Touch for Design Inquiries</title>
        <meta name="description" content="Contact VAD Architects for luxury interior and architectural design inquiries, collaborations, or consultations. Find our office address, phone, email, or use our contact form." />
        <meta name="keywords" content="Contact VAD Architects, design inquiry, get in touch, architectural consultation, interior design consultation, office address, phone number, email address, contact form, design studio contact, collaboration, find us." />
        <meta name="author" content="VAD Architects" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Contact VAD Architects | Get in Touch for Design Inquiries" />
        <meta property="og:description" content="Contact VAD Architects for luxury interior and architectural design inquiries, collaborations, or consultations. Find our office address, phone, email, or use our contact form." />
        <meta property="og:image" content={banner} />
        <meta property="og:url" content="https://staging.vadarchitects.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VAD Architects | Luxury Interior & Architectural Design" />
        <meta name="twitter:description" content="Contact VAD Architects for luxury interior and architectural design inquiries, collaborations, or consultations. Find our office address, phone, email, or use our contact form." />
        <meta name="twitter:image" content={banner} />
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta name="twitter:creator" content="@YourTwitterHandle" />
      </Helmet>

      <Navbar />

      <div className="container-fluid px-0">
        <div className="row gx-0">
          <div className="col-12">
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

      <div className="contact-section py-1 px-3">
        <div className="container">

          <div className="row justify-content-center text-center mb-4">
            <div className="col-md-8 mt-5">
              <h2>
                Let’s Build <strong className="fw-bold">Your Vision Together.</strong>
              </h2>
              <p className="text-muted small">
                We’re Excited To Discuss Your Architectural Project. Please Reach Out To Us Using The Information Below, Or Fill Out The Contact Form.
              </p>
              <hr className="w-75 mx-auto" />
            </div>
          </div>

          {/* Image on Top */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-9 col-lg-9 text-center">
              <img
                src={contactpage}
                alt="VAD Architects Logo"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>

            {/* Contact Info Grid */}
            <div className="row justify-content-center contact-grid text-start mb-5">
                <div className="col-12 col-md-9">
                    <div className="row">
                    {/* Left Column */}
                    <div className="col-lg-8 col-md-12">
                        <div className="contact-item d-flex align-items-center mb-3">
                        <FaEnvelope className="contact-icon" />
                        <span className="contact-label">Email</span>
                        <span className="contact-detail">{socialLinks.emailid && (
                            <a href={`mailto:${socialLinks.emailid}`} className="text-white mb-0" style={{ wordBreak: "break-word", maxWidth: "100%", textDecoration: "none" }}>
                                {socialLinks.emailid}
                            </a>
                        )}</span>
                        </div>
                        <div className="contact-item d-flex align-items-start mb-3">
                        <FaMapMarkerAlt className="contact-icon mt-1" />
                        <span className="contact-label">Address</span>
                        <span className="contact-detail text-white text-justify me-md-4">
                            602, Ganesh Gunjan Apartment, Lawate Nagar Lane No. 2,
                            Near City Centre Mall, Untwadi, Nashik 422007.
                        </span>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-lg-4 col-md-12">
                        <div className="contact-item d-flex align-items-center mb-3">
                        <FaPhoneAlt className="contact-icon" />
                        <span className="contact-label">Mobile no.</span>
                        <span className="contact-detail"><a href={`tel:${contacts[0]?.phone2 || "213-814-2277"}`} className="text-white text-decoration-none">
                          {contacts[0]?.phone1 || "213-814-2277"}</a></span>
                        </div>
                        <div className="contact-item d-flex align-items-center mb-3">
                        <FaClock className="contact-icon" />
                        <span className="contact-label">Timing</span>
                        <span className="contact-detail text-white">10 am to 7 pm</span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

        </div>
      </div>

        <div className='container-fluid black-color-div' id="contact-form">

        </div>

        {/* Contact Form Section */}
        <div className="container contact-position" id="contactus">
            <div className="row justify-content-center mb-4 mt-4">
                <div className="col-md-9 col-lg-9">
                    <div className="card p-5 shadow-lg border-0 rounded-4">
                    <div className="text-center mb-4">
                        <h2 className="mb-1">Let's Collaborate. <strong>Your Vision, Our Expertise.</strong></h2>
                        <p className="">Connect. Create. Build.</p>
                    </div>
                    <form onSubmit={handleSubmit} id="contactus">
                        <div className="mb-3">
                        <input type="text" className="form-control" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}
                          onKeyPress={(e) => {
                            if (!/^[a-zA-Z\s]+$/.test(e.key)) e.preventDefault();}} />
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                        </div>
                        <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <input type="email" name="email" className="form-control" placeholder="Email ID"
                            value={formData.email}
                            onChange={handleChange}
                            onKeyPress={(e) => {
                                if (!/^[a-zA-Z0-9@.]*$/.test(e.key)) e.preventDefault();
                            }} />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>
                        <div className="col-md-6">
                            <input type="tel" className="form-control" name="phone" placeholder="Mobile Number" value={formData.phone}
                            onChange={handleChange}
                            minLength="10" 
                            maxLength="10" />
                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                        </div>
                        </div>
                        <div className="mb-3">
                        <input type="text" className="form-control" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
                            {errors.subject && <small className="text-danger">{errors.subject}</small>}
                        </div>
                        <div className="mb-4">
                        <textarea className="form-control" name="message" style={{ height: '100px' }} placeholder="Message" value={formData.message} onChange={handleChange}></textarea>
                            <div className="text-end">
                                <small>{formData.message.trim().split(/\s+/).filter(Boolean).length}/300</small>
                            </div>
                            {errors.message && <small className="text-danger">{errors.message}</small>}
                        </div>
                        <div className="d-flex align-items-center justify-content-between flex-column flex-md-row">
                            <div className="mb-3">
                                <ReCAPTCHA
                                    ref={captchaRef}
                                    sitekey = "6LfozQwrAAAAAGyjLxJuYpeyhzEiAY3feUcZTm6X"
                                    onChange={handleRecaptchaChange}  
                                />
                                {errors.recaptcha && <small className="text-danger">{errors.recaptcha}</small>}
                            </div>
                        </div>
                        <div className="text-end">
                        {/* <button type="submit" className="btn btn-dark px-4 w-35">Submit</button> */}
                            <button type="submit" className="btn btn-dark px-4 w-100 custom-width-desktop" disabled={loading}>
                              {loading ? (
                                  <span>
                                      <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                                      Submitting...
                                  </span>
                              ) : (
                                  <>
                                      Submit
                                  </>
                              )}
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center mb-4'>
                <div className='col-lg-9 col-md-9'>
                    <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.4242248293112!2d73.75620867427644!3d19.990702322623132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb782d8a8eff%3A0xc6fb9acb65e236e!2sVAD%20Architects!5e0!3m2!1sen!2sin!4v1744829124446!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>

        <section className="social-media-section text-center">
            <h3 className="mb-3 fw-bold">Follow Us On</h3>
            <div className="d-flex justify-content-center gap-3">
            <a
                href={socialLinks.facebook}
                className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle gallery_social_logo_shadow"
                style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
            >
                <FaFacebookF style={{ height: "1.2rem", fill: "#444444" }} />
            </a>
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

export default Contact;
