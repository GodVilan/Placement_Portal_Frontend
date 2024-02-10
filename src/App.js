// import React, { useState } from 'react';
import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Profile from './Components/Profile';
import Login from './Components/Login';
import AdminPage from './Components/AdminPage';
import AddSkills from './Components/AddSkills';
import AddCertifications from './Components/AddCertifications';
import Jobs from './Components/Jobs';
import Leaderboard from './Components/Leaderboard';
import './App.css';
import Achievements from './Components/Achievements';
import AddCompanies from './Components/AddCompanies';
import ViewCompanies from './Components/ViewCompanies';
import UploadResume from './Components/UploadResume';
import ProblemSolving from './Components/ProblemSolving';
import ProblemSet from './Components/ProblemSet';
import Problem from './Components/Problem';

function App() {
  // const [uid, setUid] = useState(null);
  return (
    <div className='App'>
      <Routes>
        <Route path = '/' element = {<Login/>}></Route>
        <Route path = '/Profile/:uid' element = {<Profile/>}></Route>
        <Route path = '/AdminPage' element = {<AdminPage/>}></Route>
        <Route path = '/AddSkills/:uid' element={<AddSkills/>}></Route>
        <Route path = '/Achievements/:uid' element={<Achievements/>}></Route>
        <Route path = '/AddCertifications/:uid' element={<AddCertifications/>}></Route>
        <Route path = '/Jobs/:uid' element={<Jobs/>}></Route>
        <Route path = '/ProblemSolving/:uid' element={<ProblemSolving/>}></Route>
        <Route path = '/:uid/problems/:problemSetId' element={<ProblemSet/>}></Route>
        <Route path = '/:uid/problems/:problemSetId/:problemId' element={<Problem/>}></Route>
        <Route path = '/Leaderboard/:uid' element={<Leaderboard/>}></Route>
        <Route path = '/AddCompanies' element = {<AddCompanies/>}></Route>
        <Route path = '/ViewCompanies' element = {<ViewCompanies/>}></Route>
        <Route path = '/UploadResume/:uid' element = {<UploadResume/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
