import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import white_logo from './images/white_logo.png';
import { FaChevronDown } from 'react-icons/fa';


const Navbar = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("category/get-category");
        setCategories(response.data.responseData || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, []);  

  const [showMobileProjects, setShowMobileProjects] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark py-3 sticky-top">
      <div className="container">

        {/* Logo on the left (mobile) or center (desktop) */}
        <a className="navbar-brand d-md-none" href="#">
          <img src={white_logo} alt="V.A.D. Architects" style={{ height: '50px' }} />
        </a>

        {/* Hamburger toggle button for mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links - collapsible on mobile */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarContent">
          <div className="row w-100 justify-content-between text-center align-items-center">

            {/* Left Spacing */}
            <div className="col-md-0 col-lg-1 d-none d-md-flex" />

            {/* Left Links */}
            <div className="col-md-2 col-lg-2">
            <Link className="nav-link text-white" to="/">
              <span className={`nav-item-custom ${isActive("/") ? "active" : ""}`}>HOME</span>
            </Link>
            </div>
            <div className="col-md-3 col-lg-2">
            <Link className="nav-link text-white" to="/about">
              <span className={`nav-item-custom ${isActive("/about") ? "active" : ""}`}>ABOUT US</span>
            </Link>
            </div>

            {/* Logo in center (desktop only) */}
            <div className="col-md-2 col-lg-2 d-none d-md-flex justify-content-center">
              <Link className="navbar-brand" to="/">
                <img src={white_logo} alt="V.A.D. Architects" style={{ height: '90px' }} />
              </Link>
            </div>

            {/* Right Links */}
            <div className={`col-md-2 col-lg-2 ${!isMobile ? 'dropdown' : ''}`}>
              <span
                className={`text-white nav-item-custom ${isActive("/project") ? "active" : ""}`} 
                onClick={() => {
                  if (isMobile) {
                    setShowMobileProjects(!showMobileProjects);
                  }
                }}
                {...(!isMobile ? {
                  id: "projectDropdown",
                  role: "button",
                  'data-bs-toggle': "dropdown",
                  'aria-expanded': "false"
                } : {})}
                style={{ cursor: "pointer" }}
              >
                PROJECTS <FaChevronDown style={{ color: 'white', fontSize: '0.8rem', marginLeft: '5px' }} />
              </span>

              {/* Desktop Dropdown */}
              {!isMobile && (
                <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="projectDropdown">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link className="dropdown-item custom-dropdown-item" to={`/project/${encodeURIComponent(category.title)}`}>
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {/* Mobile Expand */}
              {isMobile && showMobileProjects && (
                <ul className="list-unstyled mt-2 ps-3">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link className="text-white d-block py-1 custom-mobile-dropdown-item" to={`/project/${encodeURIComponent(category.title)}`}>
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-md-3 col-lg-2">
              <Link className="nav-link text-white" to="/contact">
                <span className={`nav-item-custom ${isActive("/contact") ? "active" : ""}`}>CONTACT US</span>
              </Link>
            </div>

            {/* Right Spacing */}
            <div className="col-md-0 col-lg-1 d-none d-md-flex" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
