import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css'; // Keep your existing styles

const ClientInsights = () => {
  const sliderRef = useRef(null);
  const [testimonialData, setTestimonialData] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("testimonials/get-testimonials");
        if (response.data.result) {
          const activeTestimonials = response.data.responseData.filter(
            (testimonial) => testimonial.isActive
          );
          setTestimonialData(activeTestimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
        },
      },
    ],
  };

  const goToNext = () => sliderRef.current?.slickNext();
  const goToPrevious = () => sliderRef.current?.slickPrev();

  return (
    <div className='container'>
    <div className='row'>
    <div className="client-insights-container">
      <div className="client-insights-header mb-5">
        <h1 className='fw-100 client-title'><strong className='fw-bold'>Client</strong> Insights</h1>
        <h5 className='client-subtitle fw-300'>Hear What They Say!</h5>
      </div>
      <div className="client-insights-slider-wrapper container">
        <Slider ref={sliderRef} {...settings} className="client-insights-slider">
          {testimonialData.map((testimonial, index) => (
            <div key={index} className="client-testimonial">
              <div className="testimonial-content ms-md-5">
                <div className="client-info">
                  <img src={testimonial.img || 'https://via.placeholder.com/80'} alt={testimonial.name} />
                  <div className="name-rating-container ms-md-3">
                    <div className="name-and-rating mb-3">
                      <div className="name-and-dash">
                        {/* <span className="dash"><strong>-</strong></span> */}
                        <span className="dash"></span>
                        <h3 className="client-name"><strong>{testimonial.name}</strong></h3>
                      </div>
                      <div className="rating">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`star ${i < (testimonial.star || 0) ? '' : 'inactive-star'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="testimonial-text text-justify">
                      {testimonial.review.length > 180
                        ? `${testimonial.review.substring(0, 180)}... `
                        : testimonial.review}
                      {testimonial.review.length > 180 && (
                        <button className="read-more-btn" onClick={() => setSelectedTestimonial(testimonial)}>
                          Read More
                        </button>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <button className="slider-button slider-prev" onClick={goToNext}>
            {/* <i className="fa fa-chevron-left"></i> */}
          <span className='arrow-desktop' style={{ fontSize: '1.2rem', color: 'white', marginTop:'-2px', fontWeight:'300' }}>&larr;</span>
          <span className="arrow-mobile">&lt;</span>
        </button>
        <button className="slider-button slider-next" onClick={goToPrevious}>
             {/* <i className="fa fa-chevron-right"></i> */}
          <span className='arrow-desktop' style={{ fontSize: '1.2rem', color: 'white', marginTop:'-2px', fontWeight:'300' }}>&rarr;</span>
          <span className="arrow-mobile">&gt;</span>
        </button>
      </div>

      {/* Modal */}
      {selectedTestimonial && (
        <div className="testimonial-modal-overlay" onClick={() => setSelectedTestimonial(null)}>
          <div className="testimonial-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedTestimonial(null)}>
              &times;
            </button>
            <div className="modal-header">
              <img
                src={selectedTestimonial.img || 'https://via.placeholder.com/80'}
                alt={selectedTestimonial.name}
                className="modal-img"
              />
              <div>
                <h2>{selectedTestimonial.name}</h2>
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < (selectedTestimonial.star || 0) ? '' : 'inactive-star'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-body">
              <p>{selectedTestimonial.review}</p>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default ClientInsights;
