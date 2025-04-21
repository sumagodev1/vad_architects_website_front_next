import React from 'react';
import team1 from './images/about/Team1.webp';
import team2 from './images/about/Team2.webp';
import team3 from './images/about/Team3.webp';
import './About.css';

const teamMembers = [
  {
    name: 'Snehal Mutalik',
    role: 'Interior designer',
    img: team1,
  },
  {
    name: 'Hitesh Shinde',
    role: 'Architect',
    img: team2,
  },
  {
    name: 'Nilesh Sonawane',
    role: 'SENIOR Architect',
    img: team3,
  },
];

const Team = () => {
  return (
    <>

    <div className="team-section container py-5">
      <h2 className="text-center mb-5">
        <strong>Meet</strong> our <strong>Creative</strong> Team
      </h2>
      <div className="row justify-content-center">
        {teamMembers.map((member, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            <div className="card team-card shadow-lg text-center">
              <img src={member.img} className="card-img-top" alt={member.name} />
              <div className="card-body">
                <h5 className="card-title fw-bold">{member.name}</h5>
                <p className="card-text">{member.role}</p>
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
