import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";


export function ClaimInsurance() {
    const { id } = useParams();
    const time = Date.now();
    const [values, setValues] = useState({
        applyId: id,
        claimId: 0,
        status: time.toString()
    })

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values.applyId);
        debugger
        axios.post('https://localhost:44319/api/Claim', values)
            .then(res => {
                alert('Claim applied successfully..');
                Cookies.set("claimId", values.applyId);
                navigate('/vehicleclaimamount');
            })
            .catch(err => {
                if (err.response.status === 500) {
                    alert("Claim already exists");
                    console.log(err.response);
                }
                else {
                    alert(err.response.status);
                }
            }

            );
    }
    return (
        <form className="card container mt-5 p-5" onSubmit={handleSubmit}>

            <h3>Claim insurance</h3>

            <div className="mb-3">
                <label>Claim Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Claim Name"
                    required
                    onChange={e => setValues({ ...values, claimName: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label>Claim Reason</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Claim Reason"
                    required
                    onChange={e => setValues({ ...values, claimReason: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label>FIR Number</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="XX/YYYY"
                    required
                    onChange={e => setValues({ ...values, firNo: e.target.value })}
                />
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-success">
                    Claim
                </button>
            </div>

        </form>

    );
}