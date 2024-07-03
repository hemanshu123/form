import React from 'react';

const Dashboard = () => {
  // Sample static table data
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active', role: 'Admin', imageUrl: 'https://example.com/avatar1.jpg' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'Inactive', role: 'User', imageUrl: 'https://example.com/avatar2.jpg' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', status: 'Active', role: 'Editor', imageUrl: 'https://example.com/avatar3.jpg' },
    // Add more sample data as needed
  ];

  return (
    <div className="container">
      <h2 className="mt-4">User Management</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <div className="d-flex align-items-center">
                  <img src={user.imageUrl} alt="Avatar" className="avatar mr-2" />
                  {user.name}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-primary btn-sm">Edit</button>{' '}
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
