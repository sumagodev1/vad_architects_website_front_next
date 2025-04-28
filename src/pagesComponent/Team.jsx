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

  return (
    <>

    <div className="team-section container py-5 team-section-top-mobile">
      <h2 className="text-center mb-5" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="800">
        <strong>Meet</strong> our <strong>Creative</strong> Team
      </h2>
      <div className="row justify-content-center">
        {teamMembers.map((member, idx) => (
          <div className="col-md-4 mb-4" key={idx} data-aos="fade-up" data-aos-duration="2000" data-aos-delay="800">
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

    </>
  );
};

export default Team;
