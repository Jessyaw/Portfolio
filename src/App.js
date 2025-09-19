import React from 'react';
import './App.css';
import './css/Journal.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Journal from "./container/Journal";
import NavHeader from './component/NavHeader';
import Details from './container/Details';
import Dashboard from './container/Dashboard';
import Login from './container/Login';
import Test from './container/Test';
import JournalsList from './container/JournalsList';
import Resume from './container/Resume';
import Dictionary from './container/Dictionary';
import TaskManager from './container/TaskManager';
import ProjectList from './container/ProjectList';
import Settings from './container/Settings';
import CalenderView from './container/CalenderView';
import TaskManagerClone from './container/TaskManagerClone';
import TicketBooking from './container/TicketBooking';
import CRM from './container/CRM';
import FigmaDesigns from './container/FigmaDesigns';
import FigmaEmbed from './component/FigmaEmbed';
import CanvaDesigns from './container/CanvaDesigns';
import ProjectDetails from './container/ProjectDetails';
import { HelmetProvider, Helmet } from 'react-helmet-async';
const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Portfolio</title>
        <link ref='canonical' href='https://jessyangel07.github.io/journal/'></link>
      </Helmet>
      <Router>
        <Routes>
          <Route path='/' Component={Login} />
          <Route path='/journal' Component={Journal} />
          <Route path='/details' Component={Details} />
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/test' Component={Test} />
          <Route path='/journalsList' Component={JournalsList} />
          <Route path='/resume' Component={Resume} />
          <Route path='/dictionary' Component={Dictionary} />
          <Route path='/taskManager' Component={TaskManager} />
          <Route path='/projectList' Component={ProjectList} />
          <Route path='/settings' Component={Settings} />
          <Route path='/calender' Component={CalenderView} />
          <Route path='/tmClone' Component={TaskManagerClone} />
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
