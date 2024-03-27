import { useState, useEffect } from "react";
import axios from "axios";

export function UserList() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('https://localhost:44319/api/User')
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err));
    }, [])
    return (
        <>
            <div className="container p-3">
                <h2>List of Users</h2>
                <table className="table table-hover p-3">
                    <thead>
                        <tr className='text-uppercase justify-content-center'>
                            <th>UserName</th>
                            <th>Email ID</th>
                            <th>Phone Number</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data
                                .map((d) => (
                                    <tr className='text-uppercase' key={d.userId}>
                                        <td>{d.userName}</td>
                                        <td>{d.emailID}</td>
                                        <td>{d.phoneNo}</td>
                                      
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}