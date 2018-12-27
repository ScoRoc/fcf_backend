import React from 'react';

const SuccessfulNewManager = props => {
  const { clearManagerData, email, firstName, lastName, password } = props;
  return (
    <div className='successful-new-manager'>
      <h3>Successfully added manager:</h3>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Email: {email}</p>
      <p>Password: {password}</p>
      <button onClick={clearManagerData}>Clear New Manager Info</button>
    </div>
  )
}

export default SuccessfulNewManager;
