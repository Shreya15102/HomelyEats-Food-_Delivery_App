import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function SignUp() {
    const [credentials, setcredentials] = useState({ name: "", password: "", email: "", geolocation: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, password: credentials.password, email: credentials.email, location: credentials.geolocation })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            alert("You are successfully signed up!");
            navigate("/login");
        }
        if (!json.success) {
            alert("Enter Valid Credentials");
            navigate("/createuser");
        }
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
            <div>
                <Navbar />
            </div>

            <div className="container" >
                <form className='w-50 m-auto mt-2 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-2">
                        <label htmlFor="username" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
                        <small id="emailHelp" class="form-text text-muted">Name should be atleast 3 characters long.</small>
                    </div>
                    <div className="m-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} />

                    </div>
                    <div className="m-2">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
                        <small id="emailHelp" class="form-text text-muted">Password should contain atleast 5 characters.</small>
                    </div>
                    <div className="m-2">
                        <label htmlFor="location" className="form-label">Address</label>
                        <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange} />
                    </div>

                    <button type="submit" className=" m-2 btn btn-success">Register</button>
                    <Link to="/login" className="m-2 btn btn-danger">Already a user</Link>
                </form>
            </div>
        </div>
    )
}
