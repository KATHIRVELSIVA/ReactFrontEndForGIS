import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
export function PolicyUpdate() {
    const [values, setValues] = useState({})
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get('https://localhost:44319/api/Policy/' + id)
            .then(res => {
                setValues(res.data)
            })
            .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('https://localhost:44319/api/Policy/' + id, values)
            .then(res => {
                console.log(res.data);
                alert('Policy details updated successfully..');
                navigate('/admindashboard');
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <form className="card container mt-1 p-2 text-uppercase" onSubmit={handleSubmit}>
                <h3 className="text-center ">Update Policy</h3>

                <div className="mb-3">
                    <label>Policy Name</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={values.policyName}
                        onChange={e => setValues({ ...values, policyName: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label>Policy Description</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={values.policyDescription}
                        onChange={e => setValues({ ...values, policyDescription: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label>Policy Price</label>
                    <input
                        type="number"
                        className="form-control"
                        maxLength={5}
                        required
                        value={values.policyPrice}
                        onChange={e => setValues({ ...values, policyPrice: e.target.value })}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary " onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
}