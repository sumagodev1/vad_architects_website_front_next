import React from 'react';
import './Home.css'; 
import project1 from './images/home/ProjectFrame1.webp';
import project2 from './images/home/ProjectFrame2.webp';

const Project = () => {
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
                <div className="rounded-circle circle-btn-black">
                    <span style={{ fontSize: '1.2rem', color: 'white' }}>&rarr;</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
