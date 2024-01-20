import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import "../App.css";
const Home = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const token = localStorage.getItem('token');
  console.log(token);


  useEffect(() => {

    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch('https://employee-3730.onrender.com/api/leaves', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log(response,"response");

        if (response.ok) {
          const data = await response.json();
          console.log(data,"data");
          const leaves = data.leaves.filter((request) => request.approvalStatus !== 'pending');
          setLeaveRequests(leaves);
        } else {
          console.error('Failed to fetch leave requests');
        }
      } catch (error) {
        console.error('Error during leave requests fetch:', error);
      }
    };

    fetchLeaveRequests();
  }, []); 

  const handleDelete = async (leaveId) => {
    try {
      const response = await fetch(`https://employee-3730.onrender.com/api/leave/${leaveId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        
        setLeaveRequests((prevRequests) => prevRequests.filter((request) => request._id !== leaveId));
      } else {
        console.error('Failed to delete leave request');
      }
    } catch (error) {
      console.error('Error during leave request deletion:', error);
    }
  };


  console.log(leaveRequests);

  return (
   
      <div className="home-container">
      <h2>Past Requests</h2>
      <table className="leave-table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>visitingPlace</th>
            <th>Reason</th>
            <th>Approval</th>
            <th>Remarks</th>
            <th>Action</th> 

          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{request.leaveType}</td>
              <td>{new Date(request.leaveStartDate).toLocaleDateString()}</td>
              <td>{new Date(request.leaveEndDate).toLocaleDateString()}</td>
              <td>{request.visitingPlace}</td>
              <td>{request.reasonForLeave}</td>
              <td>{request.approvalStatus}</td>
              <td>{request.remarks}</td>
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

export default Home;
