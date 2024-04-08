import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
export function ClaimDelete() {
    const [values, setValues] = useState({
        claimName: "Deleted"
    })
    const navigate = useNavigate();

    useEffect(() => {
        const cookiesClaimID = parseInt(Cookies.get("claimID"));
        axios.get('https://localhost:44319/api/Claim/' + cookiesClaimID)
            .then(res => {
                setValues(res.data)
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const cookiesClaimID = parseInt(Cookies.get("claimID"));
        axios.delete('https://localhost:44319/api/Claim/' + cookiesClaimID)
            .then(res => {
                console.log(res.data);
                alert('Claim details deleted successfully..');
                navigate('/claims');
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <form className="card container mt-1 p-2 text-uppercase" onSubmit={handleSubmit}>
                <h3 className="text-center ">Delete Claim</h3>

                <div className="mb-3">
                    <label>Claim Reason</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={values.claimReason}
                        onChange={e => setValues({ ...values, claimReason: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label>FIR Number</label>
                    <input
                        type="text"
                        className="form-control"
                        maxLength={7}
                        required
                        value={values.firNo}
                        onChange={e => setValues({ ...values, firNo: e.target.value })}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-danger " onClick={handleSubmit}>
                        Delete claim
                    </button>
                </div>
            </form>
        </>
    );
}