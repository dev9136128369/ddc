import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { UserProvider } from './context/UserContext';

import './App.css';




import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
// import Home from './components/Home.jsx'
const Home = lazy(() => import('./components/Home.jsx'));

import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Services from './components/Services.jsx';
import OurTeam from './components/OurTeam.jsx';
import Testimonials from './components/Testimonials.jsx';

import ScrollToTop from './components/ScrollToTop';

import LoginPage from './components/LoginPage/LoginPage.jsx';

const AppointmentList = lazy(() => import('./components/ManagementDashboard/AppointmentList.jsx'));


const BlogCard = lazy(() => import('./components/BlogCard/BlogCard.jsx'));
const BlogManagement = lazy(() => import('./components/BlogManagement/BlogManagement.jsx'));
const ManagementDashboard = lazy(() => import('./components/ManagementDashboard/ManagementDashboard.jsx'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute.jsx'));
const BlogDetail = lazy(() => import('./components/BlogDetail/BlogDetail.jsx'));


function App() {
  return (
    <UserProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<div className="page-loading">Loading...</div>}>
          <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/About" element={<About />} />
       <Route path="/Contact" element={<Contact />} />
       <Route path="/Services" element={<Services />} />
       <Route path="/OurTeam" element={<OurTeam />} />
       <Route path="/Testimonials" element={<Testimonials />} />
            <Route path="/LoginPage" element={<LoginPage />} />

            <Route element={<ProtectedRoute adminOnly={true} />}>
                  <Route path="/ManagementDashboard" element={<ManagementDashboard />} />
                </Route>

                {/* <Route path="/Product" element={<Product />} /> */}
                <Route path="/BlogCard" element={<BlogCard />} />
                <Route path="/BlogManagement" element={<BlogManagement />} />
                <Route path="/blog/:id" element={<BlogDetail />} />

                <Route path="/AppointmentList" element={<AppointmentList />} />
          </Routes>
        </Suspense>
      
        <Footer />
      </Router>
     </UserProvider>
  );
}

export default App;
