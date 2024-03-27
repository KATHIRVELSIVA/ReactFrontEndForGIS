import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export function ClaimAmount() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [claimAmount, setClaimAmount] = useState({
        id: 0,
        policyID: Cookies.get("policyID")
    });
    const date = Date.now();
    console.log(date);
    const [claim, setClaim] = useState({});
    const [values, setValues] = useState({
        id: 0,
        claimId: Cookies.get("claimId"),
        status: date.toString(),
        vehicleId: Cookies.get("vehicleId"),
        policyID: Cookies.get("policyID"),
        addOnPolicyID: Cookies.get("addOnPolicyID")
    })

    useEffect(() => {
        axios.get('https://localhost:44319/api/Claim/' + Cookies.get("claimId"))
            .then(res => {
                setClaim(res.data)
                console.log(res.data)
                Cookies.set("applyId", res.data.applyId)
                Cookies.set("vehicleID", res.data.vehicleID)
            })
            .catch(err => console.log(err));
        axios.get('https://localhost:44319/api/InsuranceApply/' + Cookies.get("applyId"))
            .then(res => {
                setData(res.data)
                console.log(res.data)
                Cookies.set("policyID", res.data.policyID)
                Cookies.set("addOnPolicyID", res.data.addOnPolicyID)
            })
            .catch(err => console.log(err));
    }, [])

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        debugger
        console.log(values);
        debugger
        axios.post('https://localhost:44319/api/ClaimAmount', values)
            .then(res => {
                alert('Applied for claim amount successfully..');
                Cookies.remove("claimId");
                Cookies.remove("addOnPolicyID");
                Cookies.remove("applyId");
                Cookies.remove("policyID");
                navigate('/dashboard');
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 500) {
                    alert("Already applied for claim...");
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
                <label>Claim Amount</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Claim Amount"
                    maxLength={6}
                    required
                    onChange={e => setValues({ ...values, claimAmount: e.target.value })}
                />
            </div>


            <div className="d-grid">
                <button type="submit" className="btn btn-success">
                    Register for Claim Amount
                </button>
            </div>

        </form>

    );
}