import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import "./ProjectDetails.css"; 
import { FaEnvelope, FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import projectdetails1 from './images/projectdetails/projectdetails1.webp'
import space from './images/projectdetails/space.webp'
import ask from './images/projectdetails/ask.webp'
import result from './images/projectdetails/result.webp'
import Navbar from '../layoutComponent/Navbar';
import Footer from '../layoutComponent/Footer';

import testimonial from './images/projectdetails/testimonial.webp';

import logo from './images/projectdetails/logo.webp';

import { useParams, useLocation } from "react-router-dom";
import axios from "axios";


const ProjectDetails = () => {

    // const { projectId } = useParams();
    const { category, projectId } = useParams();
    const location = useLocation();
    const [project, setProject] = useState(null);

    const { project_location, project_year_of_completion, project_name } = location.state || {};

useEffect(() => {
  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`/projectDetailsWithImages/projects/${projectId}`);
      console.log("Full API Response:", response);
      const projectData = response.data;

      const formattedProject = {
        ...projectData,
        project_images: typeof projectData.project_images === "string"
          ? JSON.parse(projectData.project_images)
          : projectData.project_images,
      };

      // Only show if active
      if (!formattedProject.isDelete) {
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

    useEffect(() => {
        const galleryEl = scrollRef.current;
      
        const handleWheel = (e) => {
          if (galleryEl && galleryEl.contains(e.target)) {
            const maxScrollLeft = galleryEl.scrollWidth - galleryEl.clientWidth;
            const isScrollable = galleryEl.scrollWidth > galleryEl.clientWidth;
      
            // Only lock vertical scroll if we still have horizontal scroll space
            if (isScrollable && galleryEl.scrollLeft < maxScrollLeft) {
              e.preventDefault();
              galleryEl.scrollLeft += e.deltaY;
            }
          }
        };
      
        window.addEventListener("wheel", handleWheel, { passive: false });
      
        return () => {
          window.removeEventListener("wheel", handleWheel);
        };
      }, []);
      
      
  return (
    <>

    <Navbar/>

    <div className="container py-5">
      <div className="row mb-4">
        {/* Left side */}
        <div className="col-md-8 d-flex flex-column justify-content-center border-right-project-details">
          {/* <h1 className="">
            The <strong className="fw-bold">Blue</strong> House
          </h1> */}
          <h1>The <strong>{project_name?.split(" ")[0]}</strong> {project_name?.split(" ")[1]}</h1>
          <h4 className="">
            Explore Our Most Recent Project, A Testament
          </h4>
        </div>

        {/* Right side: Centered block with vertical line */}
        <div className="col-md-4 d-flex justify-content-center align-items-center">
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
        <div className="col-12">
          <img
            src={projectdetails1}
            alt="Modern Kitchen"
            className="img-fluid rounded shadow-sm"
          />
        </div>
      </div>

      <div className="row align-items-center">
        <div className="col-md-8 mb-4 mb-md-0">
          <img
            // src={space}
            // src={project?.before_img}
            src={`${axios.defaults.baseURL}${project?.before_img}`}
            alt="Excavation Site"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-4">
          <h2 className="h3 light">
            The <strong className="fw-bold">Space</strong>
          </h2>
          <p className="">
            {project?.before_description}
          </p>
        </div>
      </div>
    </div>

    <div className="container mb-5">
        <div className="row align-items-center">
            <div className="col-md-4">
                <h2 className="h3 light">
                    What <strong className="fw-bold">they ask</strong>
                </h2>
                <p className="">
                    {project?.planning_description}
                </p>
            </div>

            <div className="col-md-8 mb-4 mb-md-0">
                <img
                    // src={ask}
                    src={`${axios.defaults.baseURL}${project?.planning_img}`}
                    alt="Excavation Site"
                    className="img-fluid rounded shadow-sm"
                />
            </div>
        </div>
    </div>

    <div className="container">
        <div className="row align-items-center">
            <div className="col-md-8 mb-4 mb-md-0">
                <img
                    src={`${axios.defaults.baseURL}${project?.after_img}`}
                    alt="Excavation Site"
                    className="img-fluid rounded shadow-sm"
                />
            </div>

            <div className="col-md-4">
                <h2 className="h3 light">
                    The <strong className="fw-bold">Result</strong>
                </h2>
                <p className="">
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
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            paddingBottom: '1rem',
          }}
        >
          {/* Check if project.project_images exists and is an array */}
          {project?.project_images && Array.isArray(project.project_images) &&
            project.project_images.map((img, index) => (
              <motion.img
                key={index}
                src={`${axios.defaults.baseURL}${img}`} // Prepend base URL to the image path
                alt={`Gallery ${index + 1}`}
                className="img-fluid rounded shadow-sm me-3"
                style={{
                  width: "400px",
                  height: "auto",
                  display: "inline-block",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                viewport={{ once: true }}
              />
            ))
          }
        </div>
      </div>

      {project?.client_img && project?.client_review ? (
      <section className="testimonial-section container my-5 shadow rounded bg-white">
        <div className="row align-items-center">
            {/* Left Side - Image & Logo */}
            <div className="col-lg-2 col-md-2 p-0 mb-4 mb-md-0 d-flex flex-column align-items-center text-white rounded">
            <img src={logo} alt="Logo" className="img-fluid" />
            </div>
            <div className="col-lg-4 col-md-4 mb-4 mb-md-0 p-0 d-flex flex-column align-items-center text-white rounded">
            <img src={`${axios.defaults.baseURL}${project?.client_img}`} alt="Logo" className="img-fluid" />
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
              {project?.client_review}
            </p>
            <strong>- {project?.client_name}</strong>
            </div>
        </div>
      </section>
      ) : (
        <></> // Or you could show a placeholder here if you want
      )}


        <section className="social-media-section text-center">
            <h4 className="mb-3 fw-bold">Follow Us On</h4>
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

export default ProjectDetails;
