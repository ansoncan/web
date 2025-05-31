import React from 'react';

const UserDetails: React.FC = () => {
  const authKey = localStorage.getItem('authKey');

  return (
    <div className="c
    ontainer mt-5">
      <h1>User Details</h1>
      {authKey ? (
        <p>Successfully logged in.</p>
      ) : (
        <p>No user is currently logged in.</p>
      )}
    </div>
  );
};

export default UserDetails;