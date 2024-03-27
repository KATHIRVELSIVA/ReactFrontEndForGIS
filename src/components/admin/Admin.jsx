import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export function Admin() {

    const [policy, setPolicy] = useState([]);
    const [addonpolicy, setAddonpolicy] = useState([]);
    useEffect(() => {
        axios.get('https://localhost:44319/api/Policy')
            .then(res => {
                setPolicy(res.data)
            })
            .catch(err => console.log(err));
        axios.get('https://localhost:44319/api/AddOnPolicy')
            .then(res => {
                setAddonpolicy(res.data)
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <h1>
                Welcome Admin....
            </h1>


            <div className="container">
                <h1>List of Policies</h1>
                <Link to="/addpolicy" className="btn btn-lg btn-success">Add Policy+</Link>
                <table className="table table-hover p-3">
                    <thead>
                        <tr className='text-uppercase justify-content-center'>
                            <th>Policy Name</th>
                            <th>Policy Description</th>
                            <th>Vehicle Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            policy
                                .filter((d) => d.policyStatus == true)
                                .map((d) => (
                                    <tr className='text-uppercase' key={d.policyID}>
                                        <td>{d.policyName}</td>
                                        <td>{d.policyDescription}</td>
                                        <td>{d.policyPrice}</td>
                                        <td>
                                            <td className="d-flex justify-content-center">
                                                <Link to={`/policyupdate/${d.policyID}`} className="btn btn-primary m-1">Edit</Link>
                                                <Link to={`/policydelete/${d.policyID}`} className="btn btn-danger m-1">Delete</Link>
                                            </td>
                                        </td>
                                    </tr>

                                ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="container">
                <h1>List of Add On Policies</h1>
                <Link to="/add-add-onpolicy" className="btn btn-lg btn-success">Add Add On Policy+</Link>
                <table className="table table-hover p-3">
                    <thead>
                        <tr className='text-uppercase justify-content-center'>
                            <th>Add On Policy Name</th>
                            <th>Add On Policy Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            addonpolicy
                                .filter((d) => d.addOnStatus == true && d.addOnPolicyName !== "None")
                                .map((d) => (
                                    <tr className='text-uppercase' key={d.addOnPolicyID}>
                                        <td>{d.addOnPolicyName}</td>
                                        <td>{d.addOnPolicyDescription}</td>
                                        <td>{d.addOnPrice}</td>
                                        <td>
                                            <td className="d-flex justify-content-center">
                                                <Link to={`/add-add-onpolicyupdate/${d.addOnPolicyID}`} className="btn btn-primary m-1">Edit</Link>
                                                <Link to={`/add-add-onpolicydelete/${d.addOnPolicyID}`} className="btn btn-danger m-1">Delete</Link>
                                            </td>
                                        </td>
                                    </tr>

                                ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}