import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from '../layoutComponent/Navbar';
import Footer from '../layoutComponent/Footer';
import project1 from './images/projects/project1.webp';
import { useNavigate } from "react-router-dom";


const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0px 40px;

@media (min-width: 768px) and (max-width: 1196px) {
    gap: 0px 20px;
  }
`;

const ProjectCard = styled.div`
  position: relative;
  width: 48%;
  margin-top: ${(props) => (props.offset ? '75px' : '0')};

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    display: block;
  }
`;

const CardInfo = styled.div`
  position: absolute;
  bottom: 4rem;
  left: -20px;
  background: white;
  padding: 16px 20px 36px 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  
  max-width: 80%;
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    left: 0;
    max-width: 100%;
    bottom: 2rem;
  }

`;

const Location = styled.p`
  margin: 0;
  font-size: 24px;
  color: #000;
`;

const Title = styled.h1`
  margin: 4px 0;
  font-weight: bold;
  color: #6c757d;
`;

const TitleUnderline = styled.div`
  width: 90%;
  height: 1px;
  background-color: #ccc;
  margin: 8px 0 12px 0;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 20px;
  color: #000;
`;

const ArrowIcon = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #1d1d1d80;
  color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #444;
  }
`;

const ProjectsPage = () => {

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

    const navigate = useNavigate();

    const { categoryTitle } = useParams();
    const [projectsData, setProjectsData] = useState([]);
    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        const fetchCategoryId = async () => {
          try {
            const categoryRes = await axios.get("category/get-category");
            const categories = categoryRes.data.responseData || [];
    
            const matchedCategory = categories.find(
              (cat) => cat.title.toLowerCase() === decodeURIComponent(categoryTitle).toLowerCase()
            );
    
            if (matchedCategory) {
              setCategoryId(matchedCategory.id);
            }
          } catch (error) {
            console.error("Error fetching category list:", error);
          }
        };
    
        fetchCategoryId();
    }, [categoryTitle]);
    
    useEffect(() => {
        if (categoryId) {
          const fetchProjectsData = async () => {
            try {
              const response = await axios.get(
                `projectDetails/get-projectDetails?project_category_id=${categoryId}`
              );
              const filteredProjects = response.data.responseData.filter(
                (project) =>
                  project.project_category_id === categoryId && project.isActive === true
              );
              setProjectsData(filteredProjects);
            } catch (error) {
              console.error("Error fetching project data:", error);
            }
          };
    
          fetchProjectsData();
        }
    }, [categoryId]);

//   const projects = [
//     {
//       project_location: 'Pune, Maharashtra',
//       project_name: 'The Blue House',
//       img: project1,
//     },
//     {
//       project_location: 'Pune, Maharashtra',
//       project_name: 'The Blue House',
//       img: project1,
//     },
//     {
//       project_location: 'Pune, Maharashtra',
//       project_name: 'The Blue House',
//       img: project1,
//     },
//     {
//       project_location: 'Pune, Maharashtra',
//       project_name: 'The Blue House',
//       img: project1,
//     },
//   ];

useEffect(() => {
  setTimeout(() => {
    if (window.bootstrap) {
      const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new window.bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }, 100); // delay tooltip init
}, [projectsData]);


  return (
    <>

    <Navbar/>

    <div className="container py-5">
      <div className="text-center mb-5">
      {/* <h2 className="mb-4 text-center">{decodeURIComponent(categoryTitle)}</h2> */}
        <h1 className="light">
          Our <span className="text-dark fw-bold">Latest Vision</span> Realized
        </h1>
        {/* <h2>Realized</h2> */}
        <p className="text-secondary small">
          Explore Our Most Recent Project,
          A Testament To Innovative Design And
          Meticulous Execution.
        </p>
      </div>

      <Grid>
        {projectsData.length > 0 ? (
            projectsData.map((project, index) => (
          <ProjectCard key={index} offset={index % 2 !== 0}>
            <img className="projectpage_img" src={project.img} alt={project.title} />
            <CardInfo>
              <Location>{project.project_location}</Location>
              {/* <Title>{project.project_name}</Title> */}
              <Title
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={project.project_name}
              >
                {project.project_name.length > 15
                  ? project.project_name.slice(0, 15) + "..."
                  : project.project_name}
              </Title>
              <TitleUnderline />
              <Subtitle>{project.project_info}</Subtitle>
              {/* <ArrowIcon>→</ArrowIcon> */}
              {/* <ArrowIcon onClick={() => navigate(`/projectdetails/${project.id}`)}>→</ArrowIcon> */}
              {/* <ArrowIcon onClick={() => navigate(`/projectdetails/${categoryTitle}/${project.id}`)}>→</ArrowIcon> */}
              <ArrowIcon
                onClick={() =>
                    navigate(`/projectdetails/${categoryTitle}/${project.project_name.toLowerCase().replace(/\s+/g, "-")}`, {
                    state: {
                        project_location: project.project_location,
                        project_year_of_completion: project.project_year_of_completion,
                        project_name: project.project_name,
                        id: project.id,
                    },
                    })
                }
                >
                →
            </ArrowIcon>
            </CardInfo>
          </ProjectCard>
        ))
        ) : (
            <div className="conatiner">
                <div className="row">
                    <div className="col-12">
                        <h4>No projects found for this category.</h4>
                    </div>
                </div>
            </div>
        )}
      </Grid>
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

export default ProjectsPage;
