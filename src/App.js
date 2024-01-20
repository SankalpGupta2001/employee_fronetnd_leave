import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './screens/Signup';
import Login from './screens/Login';
import Home from './screens/Home';
import PendingLeaves from './screens/PendingPage';
import LeaveForm from './screens/LeaveForm';
import NavBar from './screens/Navbar';
import Employee from './screens/Employee';
import EmployeeAddForm from './screens/EmployeeForm';
import AdminLeaveRequests from './screens/LeaveRequest';
import LeaveUpdateForm from './screens/LeaveRequestForm';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/pending" element={<PendingLeaves />} />
        <Route exact path="/leaveform" element={<LeaveForm />} />
        <Route exact path="/employee" element={< Employee/>} />
        <Route exact path="/employeeupdate/:id" element={< EmployeeAddForm/>} />
        <Route exact path="/leave-request" element={<AdminLeaveRequests />} />
        <Route exact path="/leave-request-update/:id" element={<LeaveUpdateForm />} />





        

      </Routes>
    </Router>
  );
}

export default App;
