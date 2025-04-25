import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; 
import project1 from './images/home/ProjectFrame1.webp';
import project2 from './images/home/ProjectFrame2.webp';
import { useNavigate } from 'react-router-dom';

const Project = () => {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const res = await axios.get("category/get-category");
          if (res.data?.responseData) {
            setCategories(res.data.responseData);
          }
        } catch (err) {
          console.error("Failed to load categories:", err);
        }
      };
  
      fetchCategories();
    }, []);
  
    const handleClick = () => {
      if (categories.length > 0) {
        navigate(`/project/${categories[0].title}`);
      }
    };
  

  return (
    <div className="project-section container">
      <h2 className="project-title mb-5">Our Featured <strong>Projects</strong></h2>
      <div className="row g-0">
        <div className="col-12 col-md-6 mb-4">
          <div className="project-card">
            <img
              src={project1}
              alt="Blue House"
              className="project-image"
            />
            <div className="project-details">
              <p className="project-location">Pune, Maharashtra</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 className="project-name" style={{ margin: 0, color:'#666' }}><strong>The Blue House</strong></h3>
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
                        >
                        <span style={{ fontSize: '1.2rem', color: 'white' }}>&rarr;</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 mb-4">
          <div className="project-card">
            <img
              src={project2}
              alt="Shah Duplex"
              className="project-image"
            />
            <div className="project-details">
              <p className="project-location">Mumbai, Maharashtra</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 className="project-name" style={{ margin: 0, color:'#666' }}><strong>Shah Duplex</strong></h3>
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
                        >
                        <span style={{ fontSize: '1.2rem', color: 'white' }}>&rarr;</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="col-12">
            <div className='me-3' style={{ display: 'flex', alignItems: 'center', justifyContent:'end' }}>
                <h3 className="project-name" style={{ margin: 0 }}><strong>View All</strong></h3>
                <div className="rounded-circle circle-btn-black" onClick={handleClick} style={{ cursor: categories.length > 0 ? 'pointer' : 'not-allowed' }}>
                    <span style={{ fontSize: '1.2rem', color: 'white' }}>&rarr;</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
