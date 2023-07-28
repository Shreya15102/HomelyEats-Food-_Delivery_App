import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function Login() {
  const [credentials, setcredentials] = useState({ password: "", email: "" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password: credentials.password, email: credentials.email })
    });
    const json = await response.json()
    console.log(json);
    if (!json.success)
      alert("Enter Valid Credentials")
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      //console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <form className='w-50 m-auto mt-5 mborder bg-dark border-success rounded' onSubmit={handleSubmit}>

          <div className="m-2">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} />

          </div>
          <div className="m-2">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
          </div>


          <button type="submit" className="m-3 btn btn-success">Login</button>
          <Link to="/createuser" className="m-3 btn btn-danger">New user</Link>
        </form>
      </div></div>
  )
}
