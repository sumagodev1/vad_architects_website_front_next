import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import "./ProjectDetails.css"; 
import "./ProjectsPage.css"; 
import { FaEnvelope, FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import projectdetails1 from './images/projectdetails/projectdetails1.webp'
import space from './images/projectdetails/space.webp'
import ask from './images/projectdetails/ask.webp'
import result from './images/projectdetails/result.webp'
import Navbar from '../layoutComponent/Navbar';
import Footer from '../layoutComponent/Footer';
import { Helmet } from 'react-helmet-async';
import AOS from "aos";
import "aos/dist/aos.css";

import testimonial from './images/projectdetails/testimonial.webp';

import logo from './images/projectdetails/logo.webp';

import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";



const ProjectDetails = () => {

      useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in milliseconds
          once: false, // Whether animation should only happen once
        });
      }, []);

    const [openLightbox, setOpenLightbox] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    


    // const { projectId } = useParams();
    const { category, projectId, projectName } = useParams();
    
    const location = useLocation();
    const [project, setProject] = useState(null);
    const slides = project?.project_images?.map((img) => ({
      src: `${axios.defaults.baseURL}${img}`,
    })) || [];

    const stateId = location.state?.id;
    console.log("stateId",stateId);

    const { project_location, project_year_of_completion, project_name } = location.state || {};

useEffect(() => {
  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`/projectDetailsWithImages/projects/${stateId}`);
      console.log("Full API Response:", response);
      const projectData = response.data;

      const formattedProject = {
        ...projectData,
        project_images: typeof projectData.project_images === "string"
          ? JSON.parse(projectData.project_images)
          : projectData.project_images,
      };

      // Only show if active
      if (!formattedProject.isDelete && !formattedProject.isActive) {
        setProject(formattedProject);
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  if (projectId) {
    fetchProjectDetails();
  }
  
}, [projectId]);


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

    const scrollRef = useRef(null);

    // useEffect(() => {
    //     // const lenis = new Lenis({ smooth: true });
      
    //     const raf = (time) => {
    //     //   lenis.raf(time);
    //       requestAnimationFrame(raf);
    //     };
      
    //     requestAnimationFrame(raf);
      
    //     const galleryEl = scrollRef.current;
      
    //     const handleWheel = (e) => {
    //       if (galleryEl && galleryEl.contains(e.target)) {
    //         e.preventDefault();
    //         galleryEl.scrollLeft += e.deltaY;
    //       }
    //     };
      
    //     window.addEventListener("wheel", handleWheel, { passive: false });
      
    //     return () => {
    //     //   lenis.destroy();
    //       window.removeEventListener("wheel", handleWheel);
    //     };
    //   }, []);


    // Old scrolll
  //   useEffect(() => {
  //     const galleryEl = scrollRef.current;

  //     const handleWheel = (e) => {
  //         if (galleryEl && galleryEl.contains(e.target)) {
  //             const maxScrollLeft = galleryEl.scrollWidth - galleryEl.clientWidth;
  //             const isScrollable = galleryEl.scrollWidth > galleryEl.clientWidth;

  //             // If horizontal scroll space is available, handle the scrolling
  //             if (isScrollable) {
  //                 if (e.deltaY > 0) {
  //                     // Scroll Right
  //                     if (galleryEl.scrollLeft < maxScrollLeft) {
  //                         e.preventDefault();
  //                         galleryEl.scrollLeft += e.deltaY; // Scroll right
  //                     } else {
  //                         // At the end, allow vertical scrolling
  //                         e.preventDefault();
  //                         window.scrollBy(0, 100); // Scroll the page down
  //                     }
  //                 } else {
  //                     // Scroll Left
  //                     if (galleryEl.scrollLeft > 0) {
  //                         e.preventDefault();
  //                         galleryEl.scrollLeft += e.deltaY; // Scroll left
  //                     } else {
  //                         // At the beginning, allow vertical scrolling
  //                         e.preventDefault();
  //                         window.scrollBy(0, -100); // Scroll the page up
  //                     }
  //                 }
  //             }
  //         }
  //     };

  //     window.addEventListener("wheel", handleWheel, { passive: false });

  //     return () => {
  //         window.removeEventListener("wheel", handleWheel);
  //     };
  // }, []);

  useEffect(() => {
    const galleryEl = scrollRef.current;
  
    const handleWheel = (e) => {
      if (!galleryEl) return;
  
      const isInsideGallery = galleryEl.contains(e.target);
      if (!isInsideGallery) return; // If not inside the gallery, ignore
  
      const maxScrollLeft = galleryEl.scrollWidth - galleryEl.clientWidth;
      const isScrollable = galleryEl.scrollWidth > galleryEl.clientWidth;
  
      if (isScrollable) {
        const scrollAmount = e.deltaY; // You can also tweak it like e.deltaY * 1.5 for faster scroll
        const atStart = galleryEl.scrollLeft <= 0;
        const atEnd = galleryEl.scrollLeft >= maxScrollLeft;
  
        if ((scrollAmount < 0 && !atStart) || (scrollAmount > 0 && !atEnd)) {
          // If there's room to scroll in that direction, prevent page scroll
          e.preventDefault();
          galleryEl.scrollLeft += scrollAmount;
        }
        // If at start or end, don't prevent default, allow normal page scroll
      }
    };
  
    window.addEventListener("wheel", handleWheel, { passive: false });
  
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
  
      
      
  return (
    <>

      <Helmet>
        <title>Architecture & Interior Project by VAD Architects</title>
        <meta name="description" content="Explore out work – a bespoke  projects by VAD Architects in India, reflecting timeless design, elegance, and precision." />
        <meta name="keywords" content="VAD Architects project, maharashtra,india, architecture, luxury design Nashik, interior project India, modern architecture India, Viraj Daspute projects" />
        <meta name="author" content="VAD Architects" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Architecture & Interior Project by VAD Architects" />
        <meta property="og:description" content="Explore out work – a bespoke  projects by VAD Architects in India, reflecting timeless design, elegance, and precision." />
        {/* <meta property="og:image" content={desktopVideo} /> */}
        <meta property="og:url" content="https://staging.vadarchitects.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VAD Architects | Luxury Interior & Architectural Design" />
        <meta name="twitter:description" content="Explore out work – a bespoke  projects by VAD Architects in India, reflecting timeless design, elegance, and precision." />
        {/* <meta name="twitter:image" content={desktopVideo} /> */}
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta name="twitter:creator" content="@YourTwitterHandle" />
      </Helmet>

    <Navbar/>

    <div className="container py-5">
      <div className="row mb-4">
        {/* Left side */}
        <div className="col-md-8 d-flex flex-column justify-content-center border-right-project-details">
          {/* <h1 className="">
            The <strong className="fw-bold">Blue</strong> House
          </h1> */}
          {/* <h1>The <strong>{project_name?.split(" ")[0]}</strong> {project_name?.split(" ")[1]}</h1> */}
          <h1>
            <strong>{project_name?.split(" ").slice(0, 2).join(" ")}</strong> 
            {project_name?.split(" ").slice(2).join(" ")}
          </h1>
          <h4 className="">
            Explore Our Most Recent Project, A Testament
          </h4>
        </div>

        {/* Right side: Centered block with vertical line -- justify-content-start justify-content-md-center */}
        {/* <div className="col-md-4 d-flex justify-content-center align-items-center"> */}
        <div className="col-md-4 d-flex justify-content-start justify-content-md-center align-items-center">
          <div className="d-flex">
            {/* Vertical Line */}
            <div className="vertical-line me-4"></div>

            {/* Vertical Info Block */}
            <div>
              <p className="fw-bold text-uppercase mb-1">Category</p>
              <p className="mb-3">{category}</p>

              <p className="fw-bold text-uppercase mb-1">Year</p>
              <p className="mb-3">{project_year_of_completion}</p>

              <p className="fw-bold text-uppercase mb-1">Location</p>
              <p className="mb-0">{project_location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of content remains unchanged */}
      <div className="row mb-5">
        <div className="col-12" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
          <img
            src={`${axios.defaults.baseURL}${project?.hero_img}`}
            alt="Modern Kitchen"
            className="img-fluid rounded shadow-sm"
          />
        </div>
      </div>

      <div className="row align-items-center">
        <div className="col-md-8 order-2 order-md-1 mb-4 mb-md-0" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
          <img
            // src={space}
            // src={project?.before_img}
            src={`${axios.defaults.baseURL}${project?.before_img}`}
            alt="Excavation Site"
            className="img-fluid rounded projectdetails_beforeimg"
            // shadow-sm
          />
        </div>
        <div className="col-md-4 order-1 order-md-2" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
          <h2 className="h3 light">
            The <strong className="fw-bold">Space</strong>
          </h2>
          <p className="text-justify">
            {project?.before_description}
          </p>
        </div>
      </div>
    </div>

    <div className="container mb-5">
        <div className="row align-items-center">
            <div className="col-md-4" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
                <h2 className="h3 light">
                    What <strong className="fw-bold">they ask</strong>
                </h2>
                <p className="text-justify">
                    {project?.planning_description}
                </p>
            </div>

            <div className="col-md-8 mb-4 mb-md-0" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
                <img
                    // src={ask}
                    src={`${axios.defaults.baseURL}${project?.planning_img}`}
                    alt="Excavation Site"
                    className="img-fluid rounded projectdetails_askimg"
                    // shadow-sm
                />
            </div>
        </div>
    </div>

    <div className="container">
        <div className="row align-items-center">
            <div className="col-md-8 order-2 order-md-1 mb-4 mb-md-0" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
                <img
                    src={`${axios.defaults.baseURL}${project?.after_img}`}
                    alt="Excavation Site"
                    className="img-fluid rounded projectdetails_resultimg"
                    // shadow-sm
                />
            </div>

            <div className="col-md-4 order-1 order-md-2" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
                <h2 className="h3 light">
                    The <strong className="fw-bold">Result</strong>
                </h2>
                <p className="text-justify">
                  {project?.after_description}
                </p>
            </div>
        </div>
    </div>

      {/* Horizontal Scroll Gallery Section */}
      <div className="container-fluid py-5">
        <div
          ref={scrollRef}
          className="horizontal-gallery-wrapper"
          style={{
            whiteSpace: 'nowrap',
            paddingBottom: '1rem',
            display: 'flex',
            // scrollBehavior: 'smooth', 
          }}
        >
          {/* Check if project.project_images exists and is an array */}
          {project?.project_images && Array.isArray(project.project_images) &&
            project.project_images.map((img, index) => (
              <motion.div
                key={index}
                className="gallery-item gallery-item-horizontal-scroll"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                viewport={{ once: true }}
                style={{
                  minWidth: "651px", // Ensure each image has a fixed width
                  height: "411px", // Ensure a fixed height for consistency
                  display: "inline-block",
                  position: 'relative',
                }}
              >
              <img
                src={`${axios.defaults.baseURL}${img}`}
                alt={`Gallery ${index + 1}`}
                className="img-fluid rounded shadow-sm"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: "pointer", // Add pointer cursor so users know it's clickable
                }}
                onClick={() => {
                  setCurrentIndex(index);
                  setOpenLightbox(true);
                }}
              />
              </motion.div>
            ))
          }
        </div>
      </div>

      {openLightbox && (
        <Lightbox
          open={openLightbox}
          close={() => setOpenLightbox(false)}
          slides={slides}
          index={currentIndex}
          plugins={[Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
        />
      )}


      {project?.client_img && project?.client_review ? (
        <>
      <section className="testimonial-section container my-5 shadow rounded bg-white">
        <div className="row align-items-center">
            {/* Left Side - Image & Logo */}
            <div className="col-lg-2 col-md-2 p-0 mb-4 mb-md-0 d-none d-md-flex flex-column align-items-center text-white rounded">
            <img src={logo} alt="Logo" className="img-fluid projectdetails_testimonial_logoimg" />
            </div>
            <div className="col-lg-4 col-md-4 mb-4 mb-md-0 p-0 d-flex flex-column align-items-center text-white rounded">
            <img src={`${axios.defaults.baseURL}${project?.client_img}`} alt="Logo" className="img-fluid projectdetails_testimonialimg" />
            </div>

            {/* Right Side - Testimonial */}
            <div className="col-lg-6 col-md-6">
            <div className="d-flex align-items-center mb-2">
                {[...Array(Number(project?.star) || 0)].map((_, i) => (
                  <span key={`filled-${i}`} className="text-warning fs-5 me-1">★</span>
                ))}
                {[...Array(5 - (Number(project?.star) || 0))].map((_, i) => (
                  <span key={`empty-${i}`} className="text-muted fs-5 me-1">★</span>
                ))}
            </div>
            <p className="mb-2">
              {/* {project?.client_review} */}
              {project?.client_review.length > 190 ? (
              <>
                {project.client_review.slice(0, 190)}...
                <button 
                  type="button" 
                  className="btn btn-link p-0 ms-2 read-more-project-details" 
                  data-bs-toggle="modal" 
                  data-bs-target="#testimonialModal"
                  style={{ fontSize: '0.9rem', textDecoration:'none', color:'#000', fontWeight:'bold' }}
                >
                  Read more
                </button>
              </>
            ) : (
              project?.client_review
            )}
            </p>
            <strong>- {project?.client_name}</strong>
            <p className="ms-2"> {project?.client_designation}</p>
            </div>
        </div>
      </section>

      <div 
      className="modal fade" 
      id="testimonialModal" 
      tabIndex="-1" 
      aria-labelledby="testimonialModalLabel" 
      aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="testimonialModalLabel">Client Testimonial</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="text-center mb-3">
                <img src={`${axios.defaults.baseURL}${project?.client_img}`} alt="Client" className="img-fluid rounded-circle" style={{ width: '150px', height: '150px' }} />
                <h5 className="mt-2 fw-bold">{project?.client_name}</h5>
                <small className="">{project?.client_designation}</small>
              </div>
              <p>{project?.client_review}</p>
            </div>
          </div>
        </div>
      </div>
    </>
      
      ) : (
        <></> // Or you could show a placeholder here if you want
      )}


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

export default ProjectDetails;
