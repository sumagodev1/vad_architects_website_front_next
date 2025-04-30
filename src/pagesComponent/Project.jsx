import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Project = () => {
  const navigate = useNavigate();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProjectsAndCategories = async () => {
      try {
        const [projectRes, categoryRes] = await Promise.all([
          axios.get("projectDetails/get-projectDetails"),
          axios.get("category/get-category"),
        ]);

        const allProjects = projectRes.data.responseData || [];
        const featured = allProjects.filter(project => project.is_feature_project);

        setFeaturedProjects(featured);
        setCategories(categoryRes.data.responseData || []);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchProjectsAndCategories();
  }, []);

  const handleArrowClick = (project) => {
    const category = categories.find(cat => cat.id === project.project_category_id);
    const categoryTitle = category?.title || "unknown";

    navigate(`/projectdetails/${categoryTitle}/${project.project_name.toLowerCase().replace(/\s+/g, "-")}`, {
      state: {
        project_location: project.project_location,
        project_year_of_completion: project.project_year_of_completion,
        project_name: project.project_name,
        id: project.id,
      },
    });
  };

  const handleViewAllClick = () => {
    if (categories.length > 0) {
      navigate(`/project/${categories[0].title}`);
    }
  };

  return (
    <div className="project-section container" id="projects">
      <h1 className="project-title mb-4 mt-1 ms-md-3 set-home-page-projects-row light" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">Our Featured <strong>Projects</strong></h1>
      <div className="row g-0 set-home-page-projects-row">
        {/* .slice(0, 2) */}
        {featuredProjects.map((project, idx) => (
          <div className="col-12 col-md-6 mb-4 set-home-page-projects" key={project.id} data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
            <div className="project-card">
              <img
                src={project.img}
                alt={project.project_name}
                className="project-image projectpage_img"
              />
              <div className="project-details">
                <p className="project-location mt-3">{project.project_location}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 className="project-name" style={{ margin: 0, color: '#666' }}>
                    <strong data-bs-toggle="tooltip" data-bs-placement="top" title={project.project_name}>{project.project_name.length > 15
                    ? project.project_name.slice(0, 15) + "..."
                    : project.project_name}
                    </strong>
                  </h2>
                  <div
                    className="rounded-circle"
                    style={{
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#1D1D1D80',
                      cursor: 'pointer',
                      marginLeft: '10px'
                    }}
                    onClick={() => handleArrowClick(project)}
                  >
                    <span className='circle-arrow-set' style={{ fontSize: '1.3rem', color: 'white' }}>&rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="col-12">
          <div className='me-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
            <h3 className="project-name" style={{ margin: 0 }}><strong>View All</strong></h3>
            <div
              className="rounded-circle circle-btn-black"
              onClick={handleViewAllClick}
              style={{ cursor: categories.length > 0 ? 'pointer' : 'not-allowed' }}
            >
              <span className='circle-arrow-set' style={{ fontSize: '1.2rem', color: 'white' }}>&rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
