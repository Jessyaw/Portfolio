import './App.css';
import './css/Journal.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './container/Login';
import JournalsList from './container/JournalsList';
import TaskManager from './container/TaskManager';
import Settings from './container/Settings';
import CalenderView from './container/CalenderView';
import TicketBooking from './container/TicketBooking';
import CRM from './container/CRM';
import FigmaDesigns from './container/FigmaDesigns';
import FigmaEmbed from './component/FigmaEmbed';
import CanvaDesigns from './container/CanvaDesigns';
import ProjectDetails from './container/ProjectDetails';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Portfolio from './container/Portfolio';
import LibraryManagementSystem from './container/LibraryManagementSystem';
import './css/Library.css';
const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Portfolio</title>
        <link rel='canonical' href='https://jessyaw.github.io/Portfolio/'></link>
      </Helmet>
      <Router basename="/Portfolio">
        <Routes>
          <Route path='/' Component={Portfolio} />
          <Route path='/libraryManagementSystem' Component={LibraryManagementSystem} />
          <Route path='/login' Component={Login} />
          <Route path='/journalsList' Component={JournalsList} />
          <Route path='/taskManager' Component={TaskManager} />
          <Route path='/settings' Component={Settings} />
          <Route path='/calender' Component={CalenderView} />
          <Route path='/ticketBooking' Component={TicketBooking} />
          <Route path='/crm' Component={CRM} />
          <Route path='/figmaDesigns' Component={FigmaDesigns} />
          <Route path='/figmaEmbed' Component={FigmaEmbed} />
          <Route path='/canvaDesigns' Component={CanvaDesigns} />
          <Route path='/projectDetails' Component={ProjectDetails} />
        </Routes>
      </Router>

    </HelmetProvider>
  );
};

export default App;
