import React, { useState, useEffect } from 'react';

const LeaveUpdateForm = () => {
    const pathArray = window.location.pathname.split('/');
const leaveRequestIdIndex = pathArray.indexOf('leave-request-update');
const leaveRequestId = pathArray[leaveRequestIdIndex + 1];
console.log(leaveRequestId);

  const [formData, setFormData] = useState({
    leaveType: '',
    leaveStartDate: '',
    leaveEndDate: '',
    visitingPlace: '',
    reasonForLeave: '',
    approvalStatus: '',
    remarks: '',
  });
console.log(localStorage.getItem('isAdmin'));
  useEffect(() => {
    
    const fetchLeaveRequestById = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://employee-3730.onrender.com/api/leave/${leaveRequestId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            
           
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setFormData({
            leaveType: data.leave.leaveType,
            leaveStartDate: data.leave.leaveStartDate,
            leaveEndDate: data.leave.leaveEndDate,
            visitingPlace: data.leave.visitingPlace,
            reasonForLeave: data.leave.reasonForLeave,
            approvalStatus: data.leave.approvalStatus,
            remarks: data.leave.remarks,
          });
        } else {
          console.error('Failed to fetch leave request data');
        }
      } catch (error) {
        console.error('Error during leave request data fetch:', error);
      }
    };

    fetchLeaveRequestById();
  }, [leaveRequestId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://employee-3730.onrender.com/api/leave/${leaveRequestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Leave request updated successfully');

      } else {
        console.error('Failed to update leave request');
      }
    } catch (error) {
      console.error('Error during leave request update:', error);
    }
  };

  return (
    <div className="leave-form">
      <h2>Leave Approval</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Leave Type:
          <input type="text" name="leaveType" value={formData.leaveType} onChange={handleChange} required />
        </label>
        <br />
        
        <br />
        <label>
          Visiting Place:
          <input type="text" name="visitingPlace" value={formData.visitingPlace} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Reason for Leave:
          <textarea name="reasonForLeave" value={formData.reasonForLeave} onChange={handleChange} required />
        </label>
        <br />
        <div style={{ display: 'flex', alignItems: 'center' }}>
  <label style={{ marginRight: '10px' }}>
    Approval Status:
  </label>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
      <input
        type="radio"
        name="approvalStatus"
        value="approved"
        checked={formData.approvalStatus === 'approved'}
        onChange={handleChange}
        required
      />
      <span style={{ marginLeft: '5px' }}>Approved</span>
    </label>

    <label style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="radio"
        name="approvalStatus"
        value="rejected"
        checked={formData.approvalStatus === 'rejected'}
        onChange={handleChange}
        required
      />
      <span style={{ marginLeft: '5px' }}>Rejected</span>
    </label>
  </div>
</div>

        <br />
        <label>
          Remarks:
          <textarea name="remarks" value={formData.remarks} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit Update</button>
      </form>
    </div>
  );
};

export default LeaveUpdateForm;
