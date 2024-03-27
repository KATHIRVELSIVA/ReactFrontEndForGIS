import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export function SignUp() {


    const [values, setValues] = useState({})
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);
        axios.post('https://localhost:44319/api/User', values)
            .then(res => {
                alert('User registered successfully..');
                navigate('/home');
            })
            .catch(err => {
                if (err.response.status === 500) {
                    alert("Email Id already exists");
                }
                else {
                    alert(err.response.status);
                }
            }

            );
    }
    return (
        <form className="card container mt-5 p-5" onSubmit={handleSubmit}>

            <h3>Sign Up</h3>

            <div className="mb-3">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="UserName"
                    required
                    onChange={e => setValues({ ...values, userName: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    required
                    onChange={e => setValues({ ...values, emailID: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label>Phone</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter phone number"
                    maxLength={10}
                    minLength={10}
                    required
                    onChange={e => setValues({ ...values, phoneNo: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label>Bank Account Number</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter bank account number"
                    required
                    onChange={e => setValues({ ...values, bankAccNo: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label>Aadhar Number</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="XXXX XXXX XXXX"
                    maxLength={12}
                    minLength={12}
                    required
                    onChange={e => setValues({ ...values, aadharNo: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    maxLength={14}
                    minLength={8}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required
                    onChange={e => setValues({ ...values, password: e.target.value })}

                />
            </div>
            {/* 
            <div className="mb-3">
                <label>Confirm Password</label>
                <input
                    type="password"
                    id="confirm_password"
                    className="form-control"
                    placeholder="Enter password"
                    maxLength={14}
                    minLength={8}
                    required
                />
            </div> */}

            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </div>
            <p className="forgot-password text-right">
                Already registered <a href="/home">sign in?</a>
            </p>
        </form>

    );
}