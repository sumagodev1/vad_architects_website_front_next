import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
import './About.css';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Import plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";


const GalleryDetails = () => {
  const { gallery_category } = useParams();
  const id = localStorage.getItem('objid');
  const [categoryData, setCategoryData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`/galleryImages/galleryImages/${id}`);
        console.log("galleryImages", response.data);
  
        // Ensure that isActive is strictly false and isDelete is also false
        if (response.data.isActive !== false || response.data.isDelete) {
          console.log("Data does not meet the required condition, not setting categoryData");
          return; // Exit the function early
        }
  
        setCategoryData(response.data);
        console.log("categoryData", response.data);
  
        let galleryData = response.data;
  
        if (typeof galleryData.gallery_images === "string") {
          galleryData.gallery_images = JSON.parse(galleryData.gallery_images);
        }
  
        if (response.data.result) {
          const selectedBlog = response.data.responseData.find(
            (gallery) =>
              gallery.gallery_category.toLowerCase().replace(/\s+/g, "-") === gallery_category
          );
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };
  
    fetchProjectDetails();
  }, [gallery_category]);
  
  

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const [isActive, setIsActive] = useState(true);

  return (
    <>
      <Navbar />


      {!isActive || !categoryData ? (
        <div className="container py-5 text-center">
          <h2 className="fw-bold">Images Not Found</h2>
          <p className="">The requested category images is either deactivated or does not exist.</p>

        </div>
      ) : (
      <section className="container py-5">
        <h2 className="text-center mb-4">{categoryData.gallery_category}</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {categoryData.gallery_images.map((img, i) => (
            <div
            className="gallery-item position-relative"
            onClick={() => { setIndex(i); setOpen(true); }}
            style={{ cursor: "pointer" }}
            >
            <img
                src={`${axios.defaults.baseURL}${img}`}
                className="card-img-top gallery_img img-fluid"
                alt={img.gallery_category}
                style={{
                objectFit: 'cover',
                height: '50vh',
                width: '100%',
                borderRadius: '10px',
                }}
            />
            {/* <div className="overlay">
                <div className="overlay-text">{categoryData.gallery_category}</div>
            </div> */}
            </div>
          ))}
        </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={categoryData.gallery_images.map(img => ({
          src: `${axios.defaults.baseURL}${img}`,
          width: 1600,  // Add width and height for proper zooming
          height: 1200,
        }))}
        plugins={[Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
        zoom={{
          maxZoomPixelRatio: 5,   // Increase zoom limit
          zoomInMultiplier: 2,    // Control zoom speed
          doubleTapDelay: 300,    // Allow double-tap to zoom
          doubleClickDelay: 300,  // Allow double-click to zoom
          doubleTapMaxDelay: 500,
        }}
        captions={{ showToggle: true }}
      />

      </section>

       )}


      <Footer />
    </>
  );
};

export default GalleryDetails;