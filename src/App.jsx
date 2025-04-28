import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pagesComponent/Home";
import About from './pagesComponent/About';
import ProjectsPage from './pagesComponent/ProjectsPage';
import ProjectDetails from './pagesComponent/ProjectDetails';
import Career from './pagesComponent/career';
import Contact from './pagesComponent/Contact';
import Gallery from './pagesComponent/Gallery';
import GalleryDetails from './pagesComponent/GalleryDetails';
import './App.css'

function App() {

    axios.defaults.baseURL = `http://localhost:8000/`;

    // axios.defaults.baseURL = `https://staging-api.vadarchitects.com/`;

  return (
    <>

      <HelmetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/projectspage" element={<ProjectsPage />} /> */}
            <Route path="/project/:categoryTitle" element={<ProjectsPage />} />
            {/* <Route path="/projectdetails" element={<ProjectDetails />} /> */}
            {/* <Route path="/projectdetails/:projectId" element={<ProjectDetails />} /> */}
            <Route path="/projectdetails/:category/:projectId" element={<ProjectDetails />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:id" element={<GalleryDetails />} />
          </Routes>
        </Router>
      </HelmetProvider>
      
    </>
  )
}

export default App
