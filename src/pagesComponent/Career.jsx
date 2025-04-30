import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import Swal from 'sweetalert2';
import { FaFacebookF, FaInstagram, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import Navbar from '../layoutComponent/Navbar';
import Footer from '../layoutComponent/Footer';
import { FaUpload } from 'react-icons/fa';
import './Career.css';
import careerpage from './images/careerpage.webp'
import banner from './images/banner.mp4';
import precision from './images/home/precision.png'
import globle from './images/home/globle.png'
import work from './images/home/work.png'
import careers from './images/home/careers.png'
import { Helmet } from 'react-helmet-async';
// import loaderVideo from './images/loader.mp4';
import AOS from "aos";
import "aos/dist/aos.css";


const Career = () => {

      useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in milliseconds
          once: false, // Whether animation should only happen once
        });
      }, []);

    const captchaRef = useRef(null);
    const [recaptchaResponse, setRecaptchaResponse] = useState(null);
    const [socialLinks, setSocialLinks] = useState({});
    const [errors, setErrors] = useState({});
    const [selectedFileName, setSelectedFileName] = useState('Upload CV');

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //       setSelectedFileName(file.name);
    //       // Update formData with the selected file
    //       setFormData((prev) => ({
    //         ...prev,
    //         cv: file,  // Assign file here
    //       }));
    //     } else {
    //       setSelectedFileName('Upload CV');
    //       setFormData((prev) => ({
    //         ...prev,
    //         cv: null,  // Set cv to null if no file is selected
    //       }));
    //     }
    //   };      

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          // Validate file type (must be PDF)
          if (file.type !== 'application/pdf') {
            setErrors((prev) => ({
              ...prev,
              cv: 'Please upload a valid PDF file.',
            }));
            setSelectedFileName('Upload CV');
            setFormData((prev) => ({
              ...prev,
              cv: null,
            }));
            return;
          }
    
          // Validate file size (must be less than 1MB)
          if (file.size > 1 * 1024 * 1024) {
            setErrors((prev) => ({
              ...prev,
              cv: 'File size should be less than 1MB',
            }));
            setSelectedFileName('Upload CV');
            setFormData((prev) => ({
              ...prev,
              cv: null,
            }));
            return;
          }
    
          // If valid file
          setSelectedFileName(file.name);
          setErrors((prev) => ({
            ...prev,
            cv: undefined,
          }));
          setFormData((prev) => ({
            ...prev,
            cv: file,
          }));
    
        } else {
          setSelectedFileName('Upload CV');
          setFormData((prev) => ({
            ...prev,
            cv: null,
          }));
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

    const handleRecaptchaChange = (value) => {
        setRecaptchaResponse(value);  // Store CAPTCHA response
    };

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        cv: null,
        message: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
    
            // Allow only alphabets and spaces in Name field
            if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;
    
            // Allow only numbers in mobile field
            // if (name === "mobile" && !/^\d*$/.test(value)) return;
            if (name === "mobile" && !/^[\d+]*$/.test(value)) return;
        
            // Allow only valid email characters
            if (name === "email" && !/^[a-zA-Z0-9@.]*$/.test(value)) return;
    
        if (type === 'file') {
            const file = files[0];
        
            if (file) {
              // Validate file type (PDF)
              if (file.type !== 'application/pdf') {
                setErrors((prev) => ({
                  ...prev,
                  cv: 'Please upload a valid PDF file',
                }));
                return;
              }
        
              // Validate file size (< 1MB)
              if (file.size > 1 * 1024 * 1024) { // 1MB
                setErrors((prev) => ({
                  ...prev,
                  cv: 'File size should be less than 1MB',
                }));
                return;
              }
        
              // If file is valid, clear the error
              setErrors((prev) => ({
                ...prev,
                cv: undefined,
              }));
            }
        }
      
        setFormData((prev) => ({
          ...prev,
          [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value
        }));
      
    };

    // const validatePhone = (phone) => {
    //     const phoneRegex = /^\+?[0-9]*$/; // Allows only numbers and '+'
      
    //     if (!phoneRegex.test(phone)) return false; // Only numbers and '+' are allowed
      
    //     if (phone.startsWith("+91")) {
    //       // Indian number validation: after '+91', check if the number starts with 9, 8, 7, or 6
    //       const indianNumber = phone.slice(3); // Remove '+91'
    //       if (/^[6789]\d{9}$/.test(indianNumber)) return true;  // Number should start with 6, 7, 8, or 9 and be 10 digits long
    //       return false; // If it doesn't match, return false
    //     } 
    //     // else if (phone.startsWith("+1")) {
    //     //   // US number validation
    //     //   const usNumber = phone.slice(2); // Remove '+1'
    //     //   if (/^\d{10}$/.test(usNumber)) return true;  // US number must be exactly 10 digits
    //     // }
      
    //     return false;  // If the phone doesn't start with '+91' or '+1'
    // };

    const validatePhone = (phone) => {
        // const phoneRegex = /^\+91[6789]\d{9}$/;  
        const phoneRegex = /^[6789]\d{9}$/;  // Only allow numbers that start with +91 followed by 9, 8, 7, or 6
        return phoneRegex.test(phone);
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Enter a valid email';
        }
    
        if (!formData.mobile.trim()) {
          newErrors.mobile = 'Mobile number is required';
        } else if (!validatePhone(formData.mobile)) {
          newErrors.mobile = 'Mobile number must start with 9, 8, 7, or 6 and must be 10 digits';
        }
    
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.cv) newErrors.cv = 'Upload CV file is required';
        if (!recaptchaResponse) newErrors.recaptcha = 'Please complete the CAPTCHA';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (validateForm()) {
        setLoading(true); // Start loader
        try {
          const formDataToSend = new FormData();
          formDataToSend.append('name', formData.name);
          formDataToSend.append('email', formData.email);
          formDataToSend.append('phone', formData.mobile);
          formDataToSend.append('subject', formData.subject);
          
          if (formData.cv) {
            formDataToSend.append('cv', formData.cv); 
          }
          console.log('vc',formDataToSend);
    
          const response = await axios.post("uploadcv/create-uploadcv", formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data', 
            },
          });
    
          console.log('Form submitted', response.data);
          // alert('Form submitted successfully!');
            // SweetAlert2 success message
            Swal.fire({
              title: 'Success!',
              text: 'Thank you! We will contact you soon.',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'custom-ok-button'
            }
          });
  
          setFormData({ name: '', email: '', mobile: '', subject: '', cv: null, message: '' });
          setSelectedFileName('Upload CV');
          setErrors({});
          captchaRef.current.reset(); 
        } catch (error) {
          // let newErrors = {};
    
            console.error('Failed to submit form:', error);
            // alert("Failed to submit data. Please try again later.");
  
              // SweetAlert2 error message
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
      

  return (
    <>

      <Helmet>
        <title>Careers at VAD Architects | Join Our Design Team</title>
        <meta name="description" content="Explore career opportunities at VAD Architects. Learn about our work environment, values, and apply to join our innovative luxury design team." />
        <meta name="keywords" content="Architectural jobs, interior design careers, design employment, VAD Architects careers, job opportunities, design studio jobs, work culture, architecture recruitment, interior design recruitment, design vacancies, apply for job." />
        <meta name="author" content="VAD Architects" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Careers at VAD Architects | Join Our Design Team" />
        <meta property="og:description" content="Explore career opportunities at VAD Architects. Learn about our work environment, values, and apply to join our innovative luxury design team." />
        <meta property="og:image" content={banner} />
        <meta property="og:url" content="https://staging.vadarchitects.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VAD Architects | Luxury Interior & Architectural Design" />
        <meta name="twitter:description" content="Explore career opportunities at VAD Architects. Learn about our work environment, values, and apply to join our innovative luxury design team." />
        <meta name="twitter:image" content={banner} />
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta name="twitter:creator" content="@YourTwitterHandle" />
      </Helmet>

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

        <div className="career-wrapper">
            {/* Hero + Form Section */}
            <div className="hero-section container-fluid text-white">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Left Content */}
                        <div className="col-md-7 text-md-center text-center mb-4 mb-md-0">
                            <h2 className="fw-bold">Innovate. Collaborate. Create. Join</h2>
                            <h4 className="fw-100">Our Architectural Family.</h4>
                        </div>

                        {/* Right Image */}
                        <div className="col-md-5 text-center">
                            <img
                            src={careerpage}
                            alt="Office"
                            className="img-fluid rounded hero-image"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-section container-fluid mb-2">
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-10 col-sm-12 p-4 form-box shadow bg-white rounded mb-5">
                        <h1 className="text-center mb-3 fw-100">Join Our <strong className='fw-bold'>Architectural Family.</strong></h1>
                        <p className="text-center fw-200 career-subpara">Discover your potential with us. Explore our career page.</p>
                        <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" name="name" className="form-control placeholder" placeholder="Name" value={formData.name} onChange={handleChange} />
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                            <input type="email" name="email" className="form-control placeholder" placeholder="Email ID" value={formData.email} onChange={handleChange} />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>
                            <div className="col-md-6">
                            <input type="text" name="mobile" className="form-control placeholder" placeholder="Mobile No" value={formData.mobile} onChange={handleChange} minLength="10" maxLength="10" />
                            {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
                            </div>
                        </div>
                        <div className="mb-3">
                            <input type="text" name="subject" className="form-control placeholder" placeholder="Subject" value={formData.subject} onChange={handleChange} />
                            {errors.subject && <small className="text-danger">{errors.subject}</small>}
                        </div>
                        <div className="mb-4 position-relative upload-field">
                            <label htmlFor="cv-upload" className="form-control custom-file-label">
                            <span className="file-name-text" title={selectedFileName}>{selectedFileName}</span>
                            <FaUpload className="upload-icon" />
                            </label>
                            <input type="file" id="cv-upload" accept=".pdf" name="cv" className="d-none" onChange={handleFileChange} />
                            <span className="text-danger" style={{ fontSize: '13px' }}>(Document size should be less than 1MB and PDF only)</span>
                            {errors.cv && <small className="text-danger d-block">{errors.cv}</small>}
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
                            {/* <button type="submit" className="btn btn-dark px-5">Submit</button> */}
                            <button type="submit" className="btn btn-dark px-5 w-100 custom-width-desktop" disabled={loading}>
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

                    <section className="core-values-section text-white px-md-5">
                        <div className="container p-md-5">
                            <div className="row g-4">
                            {/* Precision with Agility */}
                            <div className="col-md-6 d-flex align-items-start pe-5 mb-md-4" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
                                <img src={precision} alt="Logo" className='fs-2 me-2 img-fluid core-values-section-img core-values-section-img4' />
                                <div>
                                <h4 className="fw-bold mb-3 career-title">PRECISION WITH AGILITY</h4>
                                <p className='core-values-section-para'>
                                At VAD Architects, we believe good design goes beyond looks—it solves problems, improves lives, and shapes better spaces. Every project we take on is guided by this purpose-driven approach.
                                </p>
                                </div>
                            </div>

                            {/* A Global Perspective */}
                            <div className="col-md-6 d-flex align-items-start pe-5 mb-md-4" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
                                <img src={globle} alt="Logo" className='fs-2 me-2 img-fluid core-values-section-img core-values-section-img4' />
                                <div>
                                <h4 className="fw-bold mb-3 career-title">A GLOBAL PERSPECTIVE</h4>
                                <p className='core-values-section-para'>
                                From master planning and architectural design to interiors and landscaping, our integrated services ensure each project flows seamlessly from concept to completion. We bring depth, clarity, and consistency to every detail.
                                </p>
                                </div>
                            </div>

                            {/* Work That Matters */}
                            <div className="col-md-6 d-flex align-items-start pe-5" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
                                <img src={work} alt="Logo" className='fs-2 me-2 img-fluid core-values-section-img core-values-section-img4' />
                                <div>
                                <h4 className="fw-bold mb-3 career-title">WORK THAT MATTERS</h4>
                                <p className='core-values-section-para'>
                                We’re a studio where learning happens every day—on real projects, through open collaboration, and by exploring new ideas. Here, you grow by doing, guided by experienced mentors and inspired by meaningful work.
                                </p>
                                </div>
                            </div>

                            {/* Career Growth & Learning */}
                            <div className="col-md-6 d-flex align-items-start pe-5" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
                                <img src={careers} alt="Logo" className='fs-2 me-2 img-fluid core-values-section-img core-values-section-img5' />
                                <div>
                                <h4 className="fw-bold mb-3 career-title">CAREER GROWTH & LEARNING</h4>
                                <p className='core-values-section-para'>
                                We take pride in our ability to listen, understand, and design spaces that truly reflect the client’s needs. Our process is thoughtful, responsive, and always rooted in delivering the best outcomes—both visually and functionally.
                                </p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </section>
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

      <Footer />

    </>
  );
};

export default Career;
