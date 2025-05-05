import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import Navbar from '../layoutComponent/Navbar';
import Footer from '../layoutComponent/Footer';
import Principal from './Principal';
import Project from './Project';
import ClientInsights from './ClientInsights';
import Ourprocess from './Ourprocess';
import axios from 'axios';
import './Home.css';
import newlogo from './images/newlogo.png'
import post1 from './images/home/POST1.webp'
import card1 from './images/home/Frame1.webp'
import card2 from './images/home/Frame2.webp'
import card3 from './images/home/Frame3.webp'
import WelcomeInquiries from './images/home/WelcomeInquiries.webp'
import loaderVideo from './images/loader.mp4';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [desktopVideo, setDesktopVideo] = useState(null);
  const [mobileVideo, setMobileVideo] = useState(null);
  const [homeSlider, setHomeslider] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Whether animation should only happen once
    });
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/contact#contactus');
  };

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          const yOffset = -100; // adjust this for headers or spacing
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);


  useEffect(() => {

    const MIN_LOADER_TIME = 4000; // 3 seconds
    const start = Date.now();

    const fetchSlider = async () => {
      try {
        const response = await axios.get("/homeslider/get-homeslider");
        const data = response.data.responseData;

        console.log("Fetched slider data successfully:", data);

        const desktopSlides = data.filter((slide) => slide.view === "Desktop");
        const mobileSlides = data.filter((slide) => slide.view === "Mobile");

        if (desktopSlides.length) {
          setDesktopVideo(desktopSlides[0].img); // Adjust `videoUrl` as needed
        }

        if (mobileSlides.length) {
          setMobileVideo(mobileSlides[0].img); // Adjust `videoUrl` as needed
        }

        setHomeslider([...desktopSlides, ...mobileSlides]);
        // setLoading(false); 
              // Ensure minimum loader time of 3 seconds
        // const elapsed = Date.now() - start;
        // const remaining = MIN_LOADER_TIME - elapsed;

        // if (remaining > 0) {
        //     setTimeout(() => setLoading(false), remaining);
        // } else {
        //     setLoading(false);
        // }
        setLoading(false);
      } catch (err) {
        console.error("There was an error fetching the data!", err);
        setHomeslider([]);
        setError("Failed to load home slider.");
        setLoading(false);
      }
    };

    // const fetchSocialLinks = async () => {
    //   try {
    //     const response = await axios.get("/social-contact/get-socialcontacts");
    //     setSocialLinks(response.data.responseData[0] || {});
    //   } catch (err) {
    //     console.error("Error fetching social media links:", err);
    //   }
    // };

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
      

    fetchSlider();
    fetchSocialLinks();
  }, []);

  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setLoading(false);
  };  


  if (loading) {
    return (
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
    );
  }

  return (
    <>

      <Helmet>
        <title>VAD Architects | Luxury Interior & Architectural Design</title>
        <meta name="description" content="Discover VAD Architects, leaders in luxury interior and architectural design. Explore our projects, design philosophy, and contact us for sophisticated, elegant spaces." />
        <meta name="keywords" content="VAD Architects, luxury interior design, architectural design, high-end design, sophisticated interiors, elegant architecture, design philosophy, residential architecture, commercial interior design, Viraj Daspute, design process, testimonials." />
        <meta name="author" content="VAD Architects" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="VAD Architects | Luxury Interior & Architectural Design" />
        <meta property="og:description" content="Discover VAD Architects, leaders in luxury interior and architectural design. Explore our projects, design philosophy, and contact us for sophisticated, elegant spaces." />
        <meta property="og:image" content={desktopVideo} />
        <meta property="og:url" content="https://staging.vadarchitects.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VAD Architects | Luxury Interior & Architectural Design" />
        <meta name="twitter:description" content="Discover VAD Architects, leaders in luxury interior and architectural design. Explore our projects, design philosophy, and contact us for sophisticated, elegant spaces." />
        <meta name="twitter:image" content={desktopVideo} />
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta name="twitter:creator" content="@YourTwitterHandle" />

        {desktopVideo && (
          <link rel="preload" as="video" href={desktopVideo} type="video/mp4" />
        )}
      </Helmet>

        <Navbar />

        <div className="w-100">
            {error && <div className="text-center text-danger my-4">{error}</div>}

            {/* Desktop Video */}
            {desktopVideo && (
            <div className="d-none d-md-block career-banner-video-wrapper">
                <video className="w-100 career-banner-video" autoPlay loop muted playsInline onLoadedData={handleVideoLoaded} preload="auto" poster={newlogo}>
                <source src={desktopVideo} type="video/mp4" />
                {/* <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" /> */}
                Your browser does not support the video tag.
                </video>
            </div>
            )}

            {/* Mobile Video */}
            {mobileVideo && (
            <div className="d-block d-md-none">
                <video className="w-100" autoPlay loop muted playsInline onLoadedData={handleVideoLoaded}>
                <source src={mobileVideo} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            </div>
            )}
        </div>

        <div className="container my-5 discover_container">
            <div className="row align-items-center section-bg-color">
                {/* Left Text */}
                <div className="col-md-6 mb-4 mb-md-0 p-4" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
                    <h1 className="fw-bold" style={{fontSize:'3.2rem'}}>Discover</h1>
                      {/* display-6 */}
                    <h2 className="fw-100" style={{fontSize:'3.2rem'}}>Our Firm</h2>
                    <p className="text-justify" style={{fontSize:'18px', fontWeight:'200'}}>
                        Viraj Daspute is a visionary architect with over 15 years of experience in designing sustainable and innovative buildings. He founded V.A.D Architects Studio in 2010, with a mission to create spaces that inspire and uplift communities.
                    </p>

                    {/* Right Arrow Circle Button */}
                    <div className="d-flex justify-content-end mt-4">
                        {/* <button
                        className="btn btn-outline-secondary rounded-circle"
                        style={{
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid #aaa',
                            backgroundColor: '#eee',
                        }}
                        >
                        <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
                        </button> */}
                        <div
                            className="rounded-circle"
                            onClick={() => navigate('/about')}
                            style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                // border: '1px solid #1D1D1D80',
                                backgroundColor: '#1D1D1D80',
                                cursor: 'pointer' // optional, if you want it to feel clickable
                            }}
                            >
                            <span style={{ fontSize: '1.2rem', color: 'white', fontWeight:'300', marginTop:'-4px' }}>&rarr;</span>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="col-md-6 text-center pe-lg-0" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
                <img
                    src={post1}
                    alt="Discover Our Firm"
                    className="img-fluid rounded"
                />
                </div>
            </div>
        </div>

        {/* Service Cards */}
        <div className="container my-5" id="services">
            <div className="row g-4">
                {/* Card 1 */}
                <div className="col-md-4 text-center p-3 card_section_bg_color" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
                <h4 className="mb-2 fw-200">INTERIOR DESIGN</h4>
                <img src={card1} alt="Interior Design" className="img-fluid my-3 mb-3" />
                <p className="small mb-3">
                    Interior design enhances interior spaces to improve functionality, aesthetics, and safety. It involves selecting materials, finishes, and furnishings.
                </p>
                </div>

                {/* Card 2 */}
                <div className="col-md-4 text-center bg-dark text-white p-3" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
                <h4 className="mb-2 fw-200">ARCHITECTURE</h4>
                <img src={card2} alt="Architecture" className="img-fluid my-3 mb-3" />
                <p className="small mb-3">
                    Architecture combines art and science to design functional, safe, and aesthetically pleasing buildings. It involves planning, designing, and constructing physical environments.
                </p>
                </div>

                {/* Card 3 */}
                <div className="col-md-4 text-center p-3 card_section_bg_color" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
                <h4 className="mb-2 fw-200">LANDSCAPE</h4>
                <img src={card3} alt="Landscape" className="img-fluid my-3 mb-3" />
                <p className="small mb-3">
                    Landscape architecture designs outdoor spaces to be beautiful, functional, and sustainable. It involves planning and managing natural and built environments.
                </p>
                </div>
            </div>
        </div>

        <Principal/>

        <Project/>

        <ClientInsights/>

        <Ourprocess/>

        {/* Contact Section */}
        <div className="container my-5 welcome-homepage-last">
            <div className="row align-items-center">
                {/* Left Side - Images */}
                <div className="col-md-6 position-relative text-center mb-4 mb-md-0" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
                <img src={WelcomeInquiries} alt="Main Interior" className="img-fluid rounded" />
                </div>

                {/* Right Side - Text */}
                <div className="col-md-6 p-5" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
                <h1 className="fw-light welcome-home-below" style={{fontSize:'3.5rem'}}>We Welcome</h1>
                <h1 className="fw-light welcome-home-below" style={{fontSize:'3.5rem'}}><span className="fw-bold">Your Inquiries.</span></h1>
                <p className="mt-3 mb-0" style={{fontSize:'1.2rem'}}>Please Contact Us To Discuss Your Architectural Needs.</p>
                <p className="fst-italic small text-secondary">"Start Your Dream House Journey."</p>

                <hr className="my-3" style={{ width: '70%', borderTop: '1px solid #000' }} />

                {/* Contact Button */}
                <div className="mt-3 d-flex align-items-center gap-2 me-3">
                    <h5 className="project-name" style={{ margin: 0 }}><strong>CONTACT NOW</strong></h5>
                    <div className="rounded-circle circle-btn-black-contact-now" onClick={handleClick}>
                        <span className='arrow-under-circle'>&rarr;</span>
                    </div>
                </div>
                </div>
            </div>
        </div>

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

            {socialLinks.instagram && (
            <a
                href={socialLinks.instagram}
                className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
            >
                <FaInstagram style={{ height: "1.2rem", fill: "#444444" }} />
            </a>
            )}

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

            {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                style={{ width: "45px", height: "45px", backgroundColor: '#fff' }} target="_blank" rel="noopener noreferrer" >
                <FaLinkedin style={{ height: '1.2rem', fill: "#444444" }} />
            </a>
            )}
            </div>
        </section>
        <section className="gallery_last_bg_color_sec p-4">
            <div className="container-fluid"></div>
        </section>

        <Footer socialLinks={socialLinks} />

    </>
  );
};

export default Home;
