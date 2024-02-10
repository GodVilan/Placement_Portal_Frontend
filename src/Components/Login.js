import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Login.css';

function Login() {
  const [uid, setuid] = useState('');
  const [password, setpassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navi = useNavigate();

  async function npage(e) {
    e.preventDefault();
    try {
      const response = await fetch('https://placement-portal-backend-api.onrender.com', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
          uid,
          password,
        }),
      });
      if(response.ok) {
        const data = await response.json();
        if(data === 'exist') {
          if(isAdmin) {
            if(uid === 'CollegeTPO' && password === 'College@TPO') {
              navi('/AdminPage');
            } else {
              setErrorMessage('Invalid Credentials');
            }
          } else {
            if(uid !== 'CollegeTPO') {
              navi(`/Profile/${uid}`, {state : { uid : uid}});
            } else {
              setErrorMessage('Invalid Credentials');
            }
          }
        } else {
          setErrorMessage('Invalid Credentials');
        }
      }  
    }
    catch(error) {
      console.log(error);
    }
  }

  const switchForm = () => {
    setuid('');
    setpassword('');
    setIsAdmin(!isAdmin);
    setErrorMessage('');
  }

  

  return (
    <div className='login-container'>
      <div className="login-header">
        <h1><strong>Welcome To College Placement Management Portal</strong></h1>
      </div>
      <div className="login-card">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className={`logincard-body ${isAdmin ? 'd-none' : ''}`}>
          <h3 className="logincard-title"><strong>Student Login</strong></h3>
          <form onSubmit={npage}>
            <div className="form-group">
              <label htmlFor="uid">User ID</label>
              <input type="text" className="form-control" id="uid" value={uid} onChange={(e) => setuid(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password</label>
              <input type="password" className="form-control" id="pwd" value={password} onChange={(e) => setpassword(e.target.value)} />
            </div><br/>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <button onClick={switchForm} className="btn btn-secondary">Switch to Admin Login</button>
        </div>
        <div className={`logincard-body ${isAdmin ? '' : 'd-none'}`}>
          <h3 className="loginard-title"><strong>Admin Login</strong></h3>
          <form onSubmit={npage}>
            <div className="form-group">
              <label htmlFor="uid">User ID</label>
              <input type="text" className="form-control" id="id" value={uid} onChange={(e) => setuid(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password</label>
              <input type="password" className="form-control" id="pawd" value={password} onChange={(e) => setpassword(e.target.value)} />
            </div><br/>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <button onClick={switchForm} className="btn btn-secondary">Switch to Student Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;


