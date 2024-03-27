import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddPolicy() {
    const [values, setValues] = useState({
        "policyStatus": true,
        "policyID": 0
    });
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);
        axios.post('https://localhost:44319/api/Policy', values)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
        navigate('/admindashboard')
        window.location.reload('');
    }
    return (
        <>

            <form className="card container mt-1 p-2 text-uppercase" onSubmit={handleSubmit}>
                <h3 className="text-center ">Add Policy</h3>

                <div className="mb-3">
                    <label>Policy Name</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={e => setValues({ ...values, policyName: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Policy Description</label>
                    <input
                        type="text"
                        className="form-control"
                        required
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
    )
} 