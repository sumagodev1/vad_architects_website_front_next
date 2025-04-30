import React from 'react';
import './Home.css';
import process1 from './images/home/Process1.webp'
import process2 from './images/home/Process2.webp'
import process3 from './images/home/Process3.webp'
import process4 from './images/home/Process4.webp'

const steps = [
  {
    number: '01',
    title: 'CONSULTATION',
    text: `Understanding your vision to craft tailored design solutions that inspire.`,
    icon: process1,
  },
  {
    number: '02',
    title: 'VISUALIZATION',
    text: `Transforming concepts into vivid 3D models and immersive design previews.`,
    icon: process2,
  },
  {
    number: '03',
    title: 'EXECUTION',
    text: `Coordinating construction with precision, quality, and design integrity.`,
    icon: process3,
  },
  {
    number: '04',
    title: 'COMPLETION',
    text: `Delivering finished spaces that reflect your lifestyle, needs, and dreams.`,
    icon: process4,
  },
];

const Ourprocess = () => {
  return (
    <div className="our-process-section py-4 bg-white">
      <div className="text-center" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
        <h1 className="mb-4 fw-100 client-title">
          Our <span className="fw-bold">Process</span>
        </h1>
      </div>
      <div className="container-fluid text-center our_process_bg_color">
      <div className="container text-center">
        <div className="row justify-content-center">
          {steps.map((step, index) => (
            <div className="col-12 col-md-6 col-lg-3 mb-md-5" key={index} data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
              <div className="process-wrapper position-relative">
                <div className="icon-wrapper">
                  <img src={step.icon} alt={step.title} className="process-icon" />
                </div>
                <div className="process-card p-4 shadow-sm bg-white h-100">
                    <div className="step-inline d-flex align-items-start justify-content-start text-start">
                        <div className="step-circle flex-shrink-0 me-1">{step.number}</div>
                        <div>
                        <div className="step-title fw-bold text-uppercase mb-3">{step.title}</div>
                        <div className="step-text small text-justify">{step.text}</div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Ourprocess;
