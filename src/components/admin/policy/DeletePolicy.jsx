import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
export function DeletePolicy() {
    const [values, setValues] = useState({
        policyStatus: false
    })
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
        debugger
        axios.put('https://localhost:44319/api/Policy/' + id, values)
            .then(res => {
                console.log(res.data);
                alert('Policy deleted successfully..');
                navigate('/admindashboard');
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <form className="card container mt-1 p-2 text-uppercase" onSubmit={handleSubmit}>
                <h3 className="text-center ">Delete Policy</h3>

                <div className="mb-3">
                    <label>Policy Name</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        disabled
                        value={values.policyName}
                    // onChange={e => setValues({ ...values, policyName: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label>Policy Description</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        disabled
                        value={values.policyDescription}
                    // onChange={e => setValues({ ...values, policyDescription: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label>Policy Price</label>
                    <input
                        type="number"
                        className="form-control"
                        maxLength={5}
                        required
                        disabled
                        value={values.policyPrice}
                    // onChange={e => setValues({ ...values, policyPrice: e.target.value })}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-danger" onClick={e => setValues({ ...values, policyStatus: false })}>
                        Delete
                    </button>
                </div>
            </form>
        </>
    );
}