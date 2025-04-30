import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './About.css';

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await axios.get("galleryDetails/get-galleryDetails");
        const activeData = response.data.responseData.filter(item => item.isActive);
        setGalleryData(activeData);
      } catch (err) {
        console.error("Error fetching gallery data:", err);
        setError("Failed to load gallery data.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  if (loading) {
    return <div className="container py-5 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container py-5 text-center text-danger">{error}</div>;
  }

  return (
    <div className="container py-4 py-md-5">
      <div className="text-center mb-4">
        <h1><strong>VISUAL</strong> <span className="light">CORNER</span></h1>
        <p>A Journey Through Imagery And Expression</p>
      </div>

      <div className="row g-4">
        {galleryData.map(item => (
          <div className="col-12 col-sm-6 col-md-4" key={item.id} data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
            <Link
              to={`/gallery/${item.gallery_category.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-decoration-none"
              onClick={() => localStorage.setItem('objid', item.id)}
            >
              <div className="gallery-item position-relative">
                <img
                  src={`${item.img}`} // Make sure `img` is the right field from API
                  alt={item.gallery_category}
                  className="img-fluid w-100"
                />
                <div className="overlay">
                  <div className="overlay-text">{item.gallery_category}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
