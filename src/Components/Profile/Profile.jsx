import React from 'react'

export default function Profile({ userData }) {
  return (
    <>
      <div>
        <div className="contanier">
          <h4>
            Name:{userData.first_name}
            {userData.last_name}
          </h4>
          <h4>Age: {userData.age}</h4>
          <h4>Email: {userData.email}</h4>
        </div>
      </div>
    </>
  );
}
