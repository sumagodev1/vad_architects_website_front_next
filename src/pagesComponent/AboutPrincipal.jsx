import React from 'react';
import './Home.css';
import principal from './images/home/principal.png';
import { FaArrowRight } from 'react-icons/fa';

const AboutPrincipal = () => {
  return (
    <div className="container" id="AboutPrincipal">
      <div className="row align-items-center">
        {/* Image */}
        <div className="col-md-4 text-center mb-4 mb-md-0">
          <img
            src={principal}
            alt="Viraj Deshpande"
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Center Bio */}
        <div className="col-md-5 px-md-3">
          <h1>
            <strong>Principal</strong> Architect
          </h1>
          <p className="mb-2 text-justify">
            Viraj Deshpande Is A Visionary Architect With Over 15 Years Of Experience In Designing Sustainable And
            Innovative Buildings. He Founded VAD In 2010, With A Mission To Create Spaces That Inspire And Uplift
            Communities.
          </p>
          <p className="text-justify">
            Viraj Deshpande Is A Visionary Architect With Over 15 Years Of Experience In Designing Sustainable And
            Innovative Buildings. He Founded VAD In 2010, With A Mission To Create Spaces That Inspire And Uplift
            Communities.
          </p>
        </div>

        {/* Timeline */}
        <div className="col-md-3">
          <div className="timeline" style={{marginLeft:'5rem'}}>
            <div className="timeline-item">
              <div className="timeline-year">2008</div>
              <div className="timeline-dot first-dot"></div>
              <div className="timeline-desc">
                <strong>COMPLETED MASTERS</strong>
                <br />
                <small className="">Pune university</small>
              </div>
            </div>

            <div className="timeline-item position-relative">
              <div className="timeline-year">2010</div>
              <div className="timeline-dot middale-dot"></div>
              <div className="timeline-desc d-flex justify-content-between align-items-center">
                <div>
                  <strong>FOUNDED OWN FIRM</strong>
                  <br />
                  <small className="">VAD Architects</small>
                </div>
                {/* <div className="timeline-arrow">
                  <FaArrowRight />
                </div> */}
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-year">2015–25</div>
              <div className="timeline-dot last-dot"></div>
              <div className="timeline-desc">
                <strong>COMPLETED PROJECTS</strong>
                <br />
                <small className="">30+</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPrincipal;
