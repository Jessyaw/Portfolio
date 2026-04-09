import './App.css';
import './css/Journal.css'
import './css/Custom.css'
import './css/MiniCRM.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logout from './container/Logout';
import JournalsList from './container/JournalsList';
import TaskManager from './container/TaskManager';
import Settings from './container/Settings';
import TicketBooking from './container/TicketBooking';
import CRM from './container/CRM';
import FigmaDesigns from './container/FigmaDesigns';
import FigmaEmbed from './component/FigmaEmbed';
import CanvaDesigns from './container/CanvaDesigns';
import ProjectDetails from './container/ProjectDetails';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Portfolio from './container/Portfolio';
import LibraryManagementSystem from './container/LibraryManagementSystem';
import CRMDashboard from './container/CRMDashboard';
import Leads from './container/Leads';
import './css/Library.css';
import SignUp from './container/SignUp';
import SignIn from './container/SignIn';
import Verify from './container/Verify';
import EmailSent from './container/EmailSent';
import CRMContact from './container/CRMContact';
import Deals from './container/Deals';
import Tasks from './container/Tasks';
import CRMReports from './container/CRMReports';
import AddUser from './container/AddUser';
import AddLeadSources from './container/AddLeadSources';
import AddDealStages from './container/AddDealStages';
import CRMCalendar from './container/CRMCalendar';


const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Jessy Angel</title>
        <link rel='canonical' href='https://jessyaw.github.io/Portfolio/'></link>
      </Helmet>
      <Router basename="/Portfolio">
        <Routes>
          <Route path='/' element={<Portfolio />} />
          <Route path='/libraryManagementSystem' element={<LibraryManagementSystem />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/email-sent' element={<EmailSent />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/journalsList' element={<JournalsList />} />
          <Route path='/taskManager' element={<TaskManager />} />
          <Route path='/settings' element={<Settings />} />

          <Route path='/ticketBooking' element={<TicketBooking />} />
          <Route path='/figmaDesigns' element={<FigmaDesigns />} />
          <Route path='/figmaEmbed' element={<FigmaEmbed />} />
          <Route path='/canvaDesigns' element={<CanvaDesigns />} />
          <Route path='/projectDetails' element={<ProjectDetails />} />
          {/* CRM */}
          <Route path='/crm' element={<CRM />}>
            <Route index element={<CRMDashboard />} />
            <Route path='calendar' element={<CRMCalendar />} />
            <Route path='leads' element={<Leads />} />
            <Route path='contact' element={<CRMContact />} />
            <Route path='deals' element={<Deals />} />
            <Route path='tasks' element={<Tasks />} />
            <Route path='crm-reports' element={<CRMReports />} />
            <Route path='add-user' element={<AddUser />} />
            <Route path='add-leadsources' element={<AddLeadSources />} />
            <Route path='add-dealstages' element={<AddDealStages />} />
          </Route>
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>

    </HelmetProvider>
  );
};

export default App;
