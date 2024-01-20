import React, { useState, useEffect } from 'react';
import "../App.css";

const EmployeeUpdateForm = () => {
    const pathArray = window.location.pathname.split('/');
    const employeeId = pathArray[pathArray.indexOf('employeeupdate') + 1];

    console.log(employeeId);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        isAdmin: false,
    });

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await fetch(`https://employee-3730.onrender.com/api/users/${employeeId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        name: data.name,
                        email: data.email,
                        organization: data.organization,
                        isAdmin: data.isAdmin,
                    });
                } else {
                    console.error('Failed to fetch employee details');
                }
            } catch (error) {
                console.error('Error during employee details fetch:', error);
            }
        };

        fetchEmployeeDetails();
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'isAdmin' ? e.target.checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://employee-3730.onrender.com/api/users/${employeeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                window.location.href = "/employee";
            } else {
                console.error('Failed to update employee');
            }
        } catch (error) {
            console.error('Error during employee update:', error);
        }
    };

    return (
        <div className="leave-form">
            <h2>Update Employee</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Organization:
                    <input type="text" name="organization" value={formData.organization} onChange={handleChange} />
                </label>
                <br />

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>
                        Admin:
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                            <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} style={{ marginLeft: '5px' }}
                            />
                        </label>


                    </div>
                </div>

                <br />
                <button type="submit">Update Employee</button>
            </form>
        </div>

    );
};

export default EmployeeUpdateForm;
