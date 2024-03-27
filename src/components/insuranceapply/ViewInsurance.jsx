import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { data } from "jquery";
import { useNavigate } from "react-router-dom";
export function ViewInsurance() {
    const navigate = useNavigate();


    const [data, setData] = useState([]);
    const [insurance, setInsurance] = useState([]);
    const [policy, setPolicy] = useState([]);
    const [addonpolicy, setAddOnPolicy] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        var UserID = Cookies.get("UserID");
        axios.get('https://localhost:44319/api/Vehicle/' + id)
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err));
        axios.get('https://localhost:44319/api/AddOnPolicy')
            .then(res => {
                setAddOnPolicy(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err));
        axios.get('https://localhost:44319/api/InsuranceApply')
            .then(res => {
                setInsurance(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err));
        axios.get('https://localhost:44319/api/Policy')
            .then(res => {
                setPolicy(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <h1>View insurance</h1>

            <div className="container">
                <div className="card container-fluid">
                    <div className="card-header">
                        Your insurance details for your car
                    </div>
                    <div className="card-body">
                        <div className="text-uppercase">{data.vehicleNo}</div>
                        <div className="text-uppercase">{data.vehicleName}</div>
                    </div>
                    <div className="card-footer">
                        {/* {
                            insurance
                                .filter((ins) => ins.vehicleId == data.vehicleID)
                                .map(ins => (
                                    <div key={ins.addOnPolicyID}>
                                        
                                        {
                                            policy
                                                .filter((item) => item.addOnPolicyID == ins.addOnPolicyID)
                                                .map(d => (
                                                    <div key={d.addOnPolicyID === ins.addOnPolicyID}>
                                                        {d.addOnPolicyName} - {d.addOnPrice}
                                                        {
                                                            addonpolicy
                                                                .filter((item) => item.policyID == ins.policyID)
                                                                .map(d => (
                                                                    <div key={d.addOnPolicyID === ins.addOnPolicyID}>
                                                                        {d.policyName} - {d.policyPrice}

                                                                    </div>
                                                                ))
                                                        }
                                                    </div>
                                                ))
                                        }
                                    </div>
                                )

                                )
                        } */}

                        {
                            insurance
                                .filter((item) => item.vehicleID == data.vehicleId)
                                .map(item => (
                                    <div key={item.applyId}>
                                        {
                                            policy
                                                .filter((pol) => pol.policyID === item.policyID)
                                                .map(pol => (
                                                    <div key={pol.policyID} onLoad={Cookies.set("policyID", pol.policyID)}>
                                                        {/* {Cookies.set("applyId", pol.policyID)} */}
                                                        {pol.policyName} - {pol.policyPrice}
                                                    </div>
                                                ))
                                        }
                                        {
                                            addonpolicy
                                                .filter((pol) => pol.addOnPolicyID === item.addOnPolicyID)
                                                .map(addpol => (
                                                    <div key={addpol.addOnPolicyID} onLoad={Cookies.set("addOnPolicyID", addpol.addOnPolicyID)}>
                                                        {/* {Cookies.set("addOnPolicyID", addpol.addOnPolicyID)} */}
                                                        {addpol.addOnPolicyName} - {addpol.addOnPrice}
                                                    </div>
                                                ))
                                        }
                                        <Link to={`/vehicleclaim/${item.applyId}`} className="btn btn-warning m-1">Claim</Link>

                                    </div>
                                ))
                        }
                    </div>

                </div>
            </div >
        </>
    )
}