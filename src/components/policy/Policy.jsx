import axios from "axios";
import { useEffect, useState } from "react";
export function Policy() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://localhost:44319/api/Policy')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);
    return (
        <>
            <h1>Policy Page</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Policy Name</th>
                        <th>Policy Description</th>
                        <th>Policy Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d, i) => (
                            <tr key={i}>
                                <td>{d.policyName}</td>
                                <td>{d.policyDescription}</td>
                                <td>{d.policyPrice}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}