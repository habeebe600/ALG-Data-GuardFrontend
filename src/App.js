import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Header/Navbar';
import './App.css';

// AUTH
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import VerifyOtp from './pages/Auth/VerifyOtp';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import ChangePassword from './pages/Auth/ChangePassword';
import Settings from "./pages/Setting/Settings";

// KB
import KnowledgeBase from './pages/KnowledgeBase/KnowledgeBase';
import AdminKnowledgeBase from './pages/KnowledgeBase/AdminKnowledgeBase';
import ProtectedRoute from './components/ProtectedRoute';
import RequireRole from './components/RequireRole';
import KnowledgeBaseArticle from './pages/KnowledgeBase/KnowledgeBaseArticle';

// TICKETS
import MyTickets from './pages/Tickets/MyTickets';
import NewTicket from './pages/Tickets/NewTicket';
import TicketDetail from './pages/Tickets/TicketDetail';
import CreateStaff from './pages/Admin/CreateStaff';

import AdminPanel from './pages/Admin/AdminPanel';

// Import pages
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Partners from './pages/Partners/Partners';
import Footer from './components/layout/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import DesignAndDeployment from './pages/Services/Design-and-Deployment';
import BusinessStrategy from './pages/Services/Business-Strategy';
import NetworkAudit from './pages/Services/Network-Audit';
import HelpFindingIdealColocation from './pages/Services/Help-finding-Ideal-Colocation';
import SupportTraining from './pages/Services/Support-Training';
import TechnicalRecruiters from './pages/Services/Technical-Recruiters';
import CloudSolutionsPage from './pages/Services/CloudSolutionsPage';
import CybersecurityServices from './pages/Services/CybersecurityServices';
import ITManagedSupportServices from './pages/Services/ITManagedSupportServices';
import ManagedNetworkSolutions from './pages/Services/ManagedNetworkSolutions';
import StrategicITConsulting from './pages/Services/StrategicITConsulting';
import AIAutomationServices from './pages/Services/AIAutomationServices';
import DataCenterColocationServices from './pages/Services/DataCenterColocationServices';
import ConfigurationServicesDeployment from './pages/Services/ConfigurationServicesDeployment';
import CloudConsulting from './pages/Services/CloudConsultingPage';
import CybersecurityConsulting from './pages/Services/CybersecurityConsultingPage';
import InfrastructureConsulting from './pages/Services/InfrastructureConsultingPage';
import DigitalTransformation from './pages/Services/DigitalTransformationPage';
import ImplementationServices from './pages/Services/ImplementationServicesPage';
import ManagedServices from './pages/Services/ManagedServices';
import InfrastructureServices from './pages/Services/InfrastructureServices';
import ITConsultingProfessionalServices from './pages/Services/ITConsultingProfessionalServices';
import TalentServices from './pages/Services/TalentServices';


// BLOGS
import BlogsPage from './pages/Blogs/BlogsPage';
import BlogDetailsPage from './pages/Blogs/BlogDetailsPage';
import AdminCreateBlog from './pages/Blogs/AdminCreateBlog';
import AdminBlogManagement from './pages/Blogs/AdminBlogManagement';
import AdminEditBlog from './pages/Blogs/AdminEditBlog';
import MemberBlogDashboard from './pages/Blogs/MemberBlogDashboard';
import MemberCreateBlog from './pages/Blogs/MemberCreateBlog';
import MemberEditBlog from './pages/Blogs/MemberEditBlog';

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar />

        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<VerifyOtp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route path="/services" element={<Services />} />
            <Route path="/services/Design-and-Deployment" element={<DesignAndDeployment />} />
            <Route path="/services/Business-Strategy" element={<BusinessStrategy />} />
            <Route path="/services/Network-Audit" element={<NetworkAudit />} />
            <Route path="/services/Help-finding-Ideal-Colocation" element={<HelpFindingIdealColocation />} />
            <Route path="/services/Support-Training" element={<SupportTraining />} />
            <Route path="/services/Technical-Recruiters" element={<TechnicalRecruiters />} />
            <Route path="/services/Cloud-IT-Solutions" element={<CloudSolutionsPage />} />
            <Route path="/services/Cybersecurity-Services" element={<CybersecurityServices />} />
            <Route path="/services/IT-Managed-Support-Services" element={<ITManagedSupportServices />} />
            <Route path="/services/Managed-Network-Solutions" element={<ManagedNetworkSolutions />} />
            <Route path="/services/Strategic-IT-Consulting" element={<StrategicITConsulting />} />
            <Route path="/services/AI-Automation-Services" element={<AIAutomationServices />} />
            <Route path="/services/Data-Center-Colocation-Services" element={<DataCenterColocationServices />} />
            <Route path="/services/Configuration-Services-Deployment" element={<ConfigurationServicesDeployment />} />
            <Route path="/services/Cloud-Consulting" element={<CloudConsulting />} />
            <Route path="/services/Cybersecurity-Consulting" element={<CybersecurityConsulting />} />
            <Route path="/services/Infrastructure-Consulting" element={<InfrastructureConsulting />} />
            <Route path="/services/Digital-Transformation" element={<DigitalTransformation />} />
            <Route path="/services/Implementation-Services" element={<ImplementationServices />} />
            <Route path="/services/Managed-Services" element={<ManagedServices />} />
            <Route path="/services/Infrastructure-Services" element={<InfrastructureServices />} />
            <Route path="/services/IT-Consulting-Professional-Services" element={<ITConsultingProfessionalServices />} />
            <Route path="/services/Talent-Services" element={<TalentServices />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/About" element={<About />} />
            <Route path="/Partners" element={<Partners />} />


            {/* Admin Panel */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <RequireRole allow={['ADMIN']}>
                    <AdminPanel />
                  </RequireRole>
                </ProtectedRoute>
              }
            />

            {/* ADMIN BLOGS */}
            <Route
              path="/admin/blogs"
              element={
                <ProtectedRoute>
                  <RequireRole allow={['ADMIN']}>
                    <AdminBlogManagement />
                  </RequireRole>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/blogs/create"
              element={
                <ProtectedRoute>
                  <RequireRole allow={['ADMIN']}>
                    <AdminCreateBlog />
                  </RequireRole>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/blogs/edit/:id"
              element={
                <ProtectedRoute>
                  <RequireRole allow={['ADMIN']}>
                    <AdminEditBlog />
                  </RequireRole>
                </ProtectedRoute>
              }
            />
            {/* MEMBER BLOGS */}
            <Route
              path="/member/blogs"
              element={
                <ProtectedRoute>
                  <RequireRole allow={["MEMBER"]}>
                    <MemberBlogDashboard />
                  </RequireRole>
                </ProtectedRoute>
              }
            />
            <Route
              path="/member/blogs/create"
              element={
                <ProtectedRoute>
                  <RequireRole allow={["MEMBER"]}>
                    <MemberCreateBlog />
                  </RequireRole>
                </ProtectedRoute>
              }
            />
            <Route
              path="/member/blogs/edit/:id"
              element={
                <ProtectedRoute>
                  <RequireRole allow={["MEMBER"]}>
                    <MemberEditBlog />
                  </RequireRole>
                </ProtectedRoute>
              }
            />
              {/* PUBLIC BLOGS */}
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogs/:slug" element={<BlogDetailsPage />} />

            {/* Knowledge Base */}
            <Route
              path="/knowledge-base"
              element={
                <ProtectedRoute>
                  <KnowledgeBase />
                </ProtectedRoute>
              }
            />

            <Route
              path="/knowledge-base/:id"
              element={
                <ProtectedRoute>
                  <KnowledgeBaseArticle />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/knowledge-base"
              element={
                <ProtectedRoute>
                  <RequireRole allow={['ADMIN']}>
                    <AdminKnowledgeBase />
                  </RequireRole>
                </ProtectedRoute>
              }
            />

            {/* Support Ticket */}
            <Route
              path="/tickets"
              element={
                <ProtectedRoute>
                  <MyTickets />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tickets/new"
              element={
                <ProtectedRoute>
                  <NewTicket />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tickets/:id"
              element={
                <ProtectedRoute>
                  <TicketDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/create-staff"
              element={
                <ProtectedRoute>
                  <RequireRole allow={['ADMIN']}>
                    <CreateStaff />
                  </RequireRole>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;