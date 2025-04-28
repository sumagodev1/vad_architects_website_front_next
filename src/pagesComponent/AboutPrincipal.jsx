import React from 'react';
import './Home.css';
import principal from './images/home/image.webp';
import { FaArrowRight } from 'react-icons/fa';

const AboutPrincipal = () => {
  return (
    <div className="container" id="AboutPrincipal">
      <div className="row align-items-center">
        {/* Image */}
        <div className="col-md-3 text-center mb-4 mb-md-0" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="800">
          <img
            src={principal}
            alt="Viraj Daspute"
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Center Bio */}
        <div className="col-md-5 px-md-3" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="800">
          <h1>
            <strong>Principal</strong> Architect
          </h1>
          <p className="mb-2 text-justify">
            Viraj Daspute Is A Visionary Architect With Over 15 Years Of Experience In Designing Sustainable And
            Innovative Buildings. He Founded VAD In 2010, With A Mission To Create Spaces That Inspire And Uplift
            Communities.
          </p>
          <p className="text-justify">
            Viraj Daspute Is A Visionary Architect With Over 15 Years Of Experience In Designing Sustainable And
            Innovative Buildings. He Founded VAD In 2010, With A Mission To Create Spaces That Inspire And Uplift
            Communities.
          </p>
        </div>

        {/* Timeline */}
        <div className="col-md-4" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="800">
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
              <div className="timeline-year timeline-year-2010">2010</div>
              <div className="timeline-dot middale-dot"></div>
              <div className="timeline-desc d-flex justify-content-between align-items-center timeline-desc-2010">
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
              <div className="timeline-year timeline-year-2015-25">2015–25</div>
              <div className="timeline-dot last-dot"></div>
              <div className="timeline-desc timeline-desc-2015-25">
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
