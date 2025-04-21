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
    text: `"Our Design Philosophy Is Centered Around Creating Spaces That Inspire And Uplift. We Believe That Good Design Should Be Functional, Sustainable, And Beautiful, With A Deep Understanding Of Our Clients' Needs"`,
    icon: process1,
  },
  {
    number: '02',
    title: 'VISUALIZATION',
    text: `"Our Design Philosophy Is Centered Around Creating Spaces That Inspire And Uplift. We Believe That Good Design Should Be Functional, Sustainable, And Beautiful, With A Deep Understanding Of Our Clients' Needs"`,
    icon: process2,
  },
  {
    number: '03',
    title: 'EXECUTION',
    text: `"Our Design Philosophy Is Centered Around Creating Spaces That Inspire And Uplift. We Believe That Good Design Should Be Functional, Sustainable, And Beautiful, With A Deep Understanding Of Our Clients' Needs"`,
    icon: process3,
  },
  {
    number: '04',
    title: 'COMPLETION',
    text: `"Our Design Philosophy Is Centered Around Creating Spaces That Inspire And Uplift. We Believe That Good Design Should Be Functional, Sustainable, And Beautiful, With A Deep Understanding Of Our Clients' Needs"`,
    icon: process4,
  },
];

const Ourprocess = () => {
  return (
    <div className="our-process-section py-4 bg-white">
      <div className="container-fluid text-center">
        <h2 className="mb-5 fw-light fs-2">
          Our <span className="fw-bold">Process</span>
        </h2>
        <div className="row justify-content-center our_process_bg_color">
          {steps.map((step, index) => (
            <div className="col-12 col-md-6 col-lg-3 mb-5" key={index}>
              <div className="process-wrapper position-relative">
                <div className="icon-wrapper">
                  <img src={step.icon} alt={step.title} className="process-icon" />
                </div>
                <div className="process-card p-4 shadow-sm bg-white h-100">
                    <div className="step-inline d-flex align-items-start justify-content-start text-start">
                        <div className="step-circle flex-shrink-0 me-3">{step.number}</div>
                        <div>
                        <div className="step-title fw-bold text-uppercase mb-1">{step.title}</div>
                        <div className="step-text small text-muted text-justify">{step.text}</div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ourprocess;
