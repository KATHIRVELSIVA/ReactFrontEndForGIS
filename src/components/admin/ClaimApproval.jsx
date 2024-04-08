import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
export function ClaimApproval() {
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
            <>
                <h1>Claims Applied</h1>
                {appointment
                    .map(e => (
                        <>
                            {
                                apply
                                    .filter((item => item.applyId === e.applyId))
                                    .map(data => (
                                        <card className="card container" id="card" key={e.claimID}>
                                            <span key={data.userID}>
                                                {data.userID}
                                            </span>
                                            <span>{e.claimReason}</span>
                                            <span>{e.firNo}</span>
                                            <span>
                                                <Link to={`/vehicleclaimamount`} onClick={Cookies.set('claimID', e.claimID)} className="btn btn-primary m-1">Approve</Link>
                                                <Link to={`/claimdelete`} onClick={Cookies.set('claimID', e.claimID)} className="btn btn-danger m-1">Reject</Link>
                                            </span>
                                        </card>
                                    ))

                            }

                        </>


                    ))}





            </>
        </>
    );
}