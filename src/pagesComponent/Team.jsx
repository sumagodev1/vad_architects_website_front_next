import React, { useEffect, useState } from 'react';
import axios from 'axios';
import team1 from './images/about/Team1.webp';
import team2 from './images/about/Team2.webp';
import team3 from './images/about/Team3.webp';
import './About.css';

const teamMembers = [
  {
    name: 'Snehal Mutalik',
    designation: 'Interior designer',
    img: team1,
  },
  {
    name: 'Hitesh Shinde',
    designation: 'Architect',
    img: team2,
  },
  {
    name: 'Nilesh Sonawane',
    designation: 'SENIOR Architect',
    img: team3,
  },
];

const Team = () => {

  const [teamMembers, setTeamMembers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('/team/get-teammembers');
        if (response.data.responseData && Array.isArray(response.data.responseData)) {
          const filteredMembers = response.data.responseData
            .filter((member) => member.isActive === true)
            .sort((a, b) => a.position_no - b.position_no);

          setTeamMembers(filteredMembers);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 3, teamMembers.length));
  };

  const handleShowLess = () => {
    setVisibleCount(6);
  };

  return (
    <>

    <div className="team-section container py-5 team-section-top-mobile">
      <h2 className="text-center mb-5 fw-100 meet-team-title" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
        <strong className='fw-bold'>Meet</strong> our <strong className='fw-bold'>Creative</strong> Team
      </h2>
      <div className="row justify-content-center">
        {/* {teamMembers.map((member, idx) => ( */}
        {teamMembers.slice(0, visibleCount).map((member, idx) => (
          <div className="col-md-4 mb-4" key={idx} data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
            <div className="card team-card shadow-lg text-center">
              <img src={member.img} className="card-img-top" alt={member.name} />
              <div className="card-body">
                <h5 className="card-title fw-bold">{member.name}</h5>
                <p className="card-text">{member.designation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className='container-fluid about-gray-color-div'>

    </div>

          {/* Show More / Less Buttons */}
          {teamMembers.length > 6 && (
      <div className="text-center mt-4">
        {visibleCount < teamMembers.length ? (
          <button className="btn btn-primary team-more-btn" onClick={handleShowMore}>
            Show More Team
          </button>
        ) : (
          <button className="btn btn-secondary team-more-btn" onClick={handleShowLess}>
            Show Less Team
          </button>
        )}
      </div>
    )}

    </>
  );
};

export default Team;
