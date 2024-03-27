import axios from "axios";
import { useEffect, useState } from "react";
export function AddOnPolicy() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://localhost:44319/api/AddOnPolicy')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);
    return (
        <>
            <h1>Add On Policy Page</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Add On Policy Name</th>
                        <th>Add On Policy Description</th>
                        <th>Add On Policy Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data
                            .filter((item) => item.addOnPolicyName !== "None")
                            .map((d, i) => (
                                <tr key={i}>
                                    <td>{d.addOnPolicyName}</td>
                                    <td>{d.addOnPolicyDescription}</td>
                                    <td>{d.addOnPrice}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </>
    );
}