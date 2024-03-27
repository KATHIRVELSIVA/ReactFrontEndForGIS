import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
export function VehicleUpdate() {
    const [values, setValues] = useState({
        userID: Cookies.get("UserID")
    })
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get('https://localhost:44319/api/Vehicle/' + id)
            .then(res => {
                setValues(res.data)
            })
            .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);
        axios.put('https://localhost:44319/api/Vehicle/' + id, values)
            .then(res => {
                console.log(res.data);
                alert('car details updated successfully..');
                navigate('/dashboard');
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <form className="card container mt-1 p-5 text-uppercase" onSubmit={handleSubmit} >
                <h3 className="text-center">Update your vehicle</h3>

                <div className="mb-3 " >
                    <label>Vehicle Number</label>
                    <input
                        required
                        type="text "
                        className="form-control text-uppercase"
                        placeholder="AB XX CD XXXX"

                        maxLength={10}
                        value={values.vehicleNo}
                        onChange={e => setValues({ ...values, vehicleNo: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>MFG Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="MFG Name"
                        required
                        value={values.vehicleName}
                        onChange={e => setValues({ ...values, vehicleName: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Vehicle Type</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Vehicle Type"
                        required
                        value={values.vehicleType}
                        onChange={e => setValues({ ...values, vehicleType: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Location</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Location"
                        required
                        value={values.location}
                        onChange={e => setValues({ ...values, location: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label>Year of Make</label>
                    <input
                        type="month"
                        className="form-control"
                        placeholder="Year of Make"
                        required
                        value={values.yearOfMake}
                        onChange={e => setValues({ ...values, yearOfMake: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>IDV Value</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="IDV value"
                        required
                        value={values.idVvalue}
                        onChange={e => setValues({ ...values, idVvalue: e.target.value })}
                    />
                </div>

                {/* <div className="mb-3">
                    <label>User ID</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="User ID"
                        value={id}
                        onChange={e => setValues({ ...values, userID: e.target.value })}
                    />
                </div> */}


                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
}