import React, { useState } from 'react';

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    leaveType: '',
    leaveStartDate: '',
    leaveEndDate: '',
    visitingPlace: '',
    reasonForLeave: '',
  });

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

      const response = await fetch('https://employee-3730.onrender.com/api/leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          leaveType: '',
          leaveStartDate: '',
          leaveEndDate: '',
          visitingPlace: '',
          reasonForLeave: '',
        });

        console.log('Leave request submitted successfully');
      } else {
        console.error('Failed to submit leave request');
      }
    } catch (error) {
      console.error('Error during leave request submission:', error);
    }
  };

  return (
    <div className="leave-form">
      <h2>Leave Request Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Leave Type:
          <input type="text" name="leaveType" value={formData.leaveType} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Leave Start Date:
          <input type="date" name="leaveStartDate" value={formData.leaveStartDate} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Leave End Date:
          <input type="date" name="leaveEndDate" value={formData.leaveEndDate} onChange={handleChange} required />
        </label>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeaveForm;
