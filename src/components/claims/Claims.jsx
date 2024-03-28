import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
export function Claims() {
    const [appointment, setAppointment] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apply, setApply] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            const response = await axios.get('https://localhost:44319/api/Claim');
            setAppointment(response.data);
            console.log(response.data);
            const apply = await axios.get('https://localhost:44319/api/InsuranceApply');
            setApply(apply.data);
            console.log(apply.data);
            setLoading(false);
        };

        fetchServices();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>Claims Applied</h1><br></br>
            <table className="table">
                <thead>
                    <tr>
                        <th scope='col'>User Name</th>
                        <th scope='col'>Claim Name</th>
                        <th scope='col'>Claim Reason</th>
                        <th scope='col'>FIR No</th>
                        <th scope='col'>Actions</th>

                        {/* <th scope='col'>Repair Status</th> */}
                    </tr>
                </thead>
                <tbody>

                    {appointment
                        .map(e => (
                            <tr key={e.claimID}>

                                {
                                    apply
                                        .filter((item => item.applyId === e.applyId))
                                        .map(data => (
                                            <tr>
                                                <td key={data.applyId}>
                                                    {data.user.userName}
                                                </td>
                                            </tr>
                                        ))

                                }
                                <td>{e.claimName}</td>
                                <td>{e.claimReason}</td>
                                <td>{e.firNo}</td>
                                <td><button type="button" class="btn btn-success">Approve</button><span>   <button type="button" class="btn btn-danger">Reject</button></span></td>

                            </tr>
                        ))}


                </tbody>
            </table>


        </>
    );
}