import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import "../App.css";


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://employee-3730.onrender.com/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const nonAdminEmployees = data;
          setEmployees(nonAdminEmployees);
        } else {
          console.error('Failed to fetch employees');
        }
      } catch (error) {
        console.error('Error during employee fetch:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleUpdate = (employeeId) => {
    window.location=`/employeeupdate/${employeeId}`;

    console.log(`Update employee with ID ${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(`https://employee-3730.onrender.com/api/users/${employeeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== employeeId));
      } else {
        console.error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error during employee deletion:', error);
    }
  };


  return (
    <div className="home-container">
      <h2>Employees List</h2>
      <table className="leave-table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Work</th>
            <th>Organization</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.isAdmin === true ? 'Admin' : 'User'}</td>
              <td>{employee.organization}</td>
              <td>
                <button onClick={() => handleUpdate(employee._id)}><FilePresentIcon /></button>
              </td>
              <td>
                <button onClick={() => handleDelete(employee._id)}><DeleteIcon /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
