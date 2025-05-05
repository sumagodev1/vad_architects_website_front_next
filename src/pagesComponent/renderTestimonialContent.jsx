const renderTestimonialContent = (testimonial) => (
    <div className="testimonial-content ms-md-5">
      <div className="client-info">
        <img src={testimonial.img || 'https://via.placeholder.com/80'} alt={testimonial.name} />
        <div className="name-rating-container ms-md-3">
          <div className="name-and-rating mb-3">
            <div className="name-and-dash">
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
  );
  