import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import "../App.css";


const AdminLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch(`https://employee-3730.onrender.com/api/leaves-employees`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
           
          },
        });

        if ( response.ok) {
          const data = await response.json();
          const filteredData = data.leaves.filter((request) => request.approvalStatus === 'pending');

          setLeaveRequests(filteredData);
        } else {
          console.error('Failed to fetch leave requests');
        }
      } catch (error) {
        console.error('Error during leave requests fetch:', error);
      }
    };

    fetchLeaveRequests(); 
  }, []); 

  const handleUpdate = (leaveRequestId) => {
    window.location = `/leave-request-update/${leaveRequestId}`;
  };
  
  const handleDelete = async (leaveRequestId) => {
    try {
      const response = await fetch(`https://employee-3730.onrender.com/api/leave/${leaveRequestId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {
        setLeaveRequests((prevRequests) => prevRequests.filter((request) => request._id !== leaveRequestId));
      } else {
        console.error('Failed to delete leave request');
      }
    } catch (error) {
      console.error('Error during leave request deletion:', error);
    }
  };
  

  return (
    <div className="home-container">
      <h2>Leave Approval</h2>
      <table className="leave-table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Employee Id</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Visiting Place</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request, index) => (
            
               
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{request.employeeId}</td>
        
              <td>{request.leaveType}</td>
              <td>{new Date(request.leaveStartDate).toLocaleDateString()}</td>
              <td>{new Date(request.leaveEndDate).toLocaleDateString()}</td>
              <td>{request.visitingPlace}</td>
              <td>
      <button onClick={() => handleUpdate(request._id)}><FilePresentIcon /></button>
    </td>
    <td>
      <button onClick={() => handleDelete(request._id)}><DeleteIcon /></button>
    </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLeaveRequests;
