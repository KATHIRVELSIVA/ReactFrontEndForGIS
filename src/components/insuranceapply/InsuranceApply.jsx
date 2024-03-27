import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function InsuranceApply() {
    const { id } = useParams();
    const [data, setData] = useState([])
    const [policy, setPolicy] = useState([])
    const [cars, setCars] = useState({
        userID: Cookies.get("UserID"),
        status: Cookies.get("vehicleID"),
        vehicleId: id
    })
    const [values, setValues] = useState({
        userID: Cookies.get("UserID"),
        status: "Applied",
        applyId: 0,
        policyID: 0,
        addOnPolicyID: 0,
        vehicleId: id
    })

    const navigate = useNavigate();
    const [Vehicle, setVehicle] = useState({
        userID: Cookies.get("UserID"),
        status: true
    })
    useEffect(() => {
        axios.get('https://localhost:44319/api/Policy')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
        axios.get('https://localhost:44319/api/AddOnPolicy')
            .then(res => setPolicy(res.data))
            .catch(err => console.log(err));
        axios.get('https://localhost:44319/api/Vehicle/' + id)
            .then(res => setCars(res.data))
            .catch(err => console.log(err));
        console.log(cars)
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);
        axios.post('https://localhost:44319/api/InsuranceApply', values)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    alert("Already vehicle is registered for insurance");
                }
                console.log(err)
            });
        // debugger
        axios.put('https://localhost:44319/api/Vehicle/' + id, {
            "vehicleId": id,
            "vehicleNo": cars.vehicleNo,
            "vehicleName": cars.vehicleName,
            "vehicleType": cars.vehicleType,
            "location": cars.location,
            "yearOfMake": cars.yearOfMake,
            "idVvalue": cars.idVvalue,
            "status": false,
            "userID": Cookies.get('UserID')
        })
            .then(res => {
                console.log(res);

            })
            .catch(err => console.log(err));
        // debugger
        navigate('/dashboard');
        // window.location.reload('');
    }
    return (
        <>

            <form className="card container mt-1 p-2 text-uppercase" onSubmit={handleSubmit}>
                <h3 className="text-center ">Apply for insurance</h3>

                <div className="mb-3">
                    <label>Policy</label>
                    <select className="form-control" required value={values.policyID} onChange={e => setValues({ ...values, policyID: e.target.value })}>
                        {
                            data.map((d) => (
                                <option value={d.policyID}>{d.policyName} - {d.policyPrice}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label>Add On Policy</label>
                    <select className="form-control" required value={values.addOnPolicyID} onChange={e => setValues({ ...values, addOnPolicyID: e.target.value })}>
                        {
                            policy.map((d) => (
                                <option value={d.addOnPolicyID}>{d.addOnPolicyName} - {d.addOnPrice}</option>
                            ))
                        }
                    </select>
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