import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export function Dashboard() {

    const [values, setValues] = useState({})
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [policy, setPolicy] = useState([]);
    const [insurance, setInsurance] = useState([]);
    useEffect(() => {
        Cookies.remove("vehicleID");
        var UserID = Cookies.get("UserID");
        axios.get('https://localhost:44319/api/Vehicle')
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err));

        //get the values from the policy list
        axios.get('https://localhost:44319/api/InsuranceApply')
            .then(res => {
                setInsurance(res.data);
            })

        axios.get('https://localhost:44319/api/Policy')
            .then(res => {
                setPolicy(res.data)
            })

    }, [])

    const cookieCheck = () => {
        var email = Cookies.get("email");
        var password = Cookies.get("password");
        setValues.email = email;
        setValues.password = password;
        axios.post('https://localhost:44319/api/GetKey', values)
            .then(res => res.data());
    }

    const logOutFromDashBoard = (event) => {
        Cookies.remove("email");
        Cookies.remove("password");
        Cookies.remove("UserID");
        Cookies.remove("vehicleId");
        navigate('/home');
        window.location.reload();
    };
    const handleDelete = (id) => {
        const confirm = window.confirm("Would you like to delete?");
        if (confirm) {

            axios.put('https://localhost:44319/api/Vehicle' + id, values)
                .then(res => {
                    window.location.reload('/dashboard');
                }).catch(err => console.log(err));
        }
    };

    return (
        <>
            <div className="container-fluid" onLoadStart={cookieCheck}>
                <div className="row">

                    <main className="container"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h5">Welcome to Dashboard <span className='h1 text-uppercase'>{Cookies.get('UserName')}</span></h1>
                        </div>

                        <h1>Insured vehicles</h1>
                        <div className="d-flex justify-content-end ">
                            <Link to="/addVehicle" className="btn btn-lg btn-success">Add Vehicle+</Link>
                        </div>

                        {
                            data ? data.filter((item) => item.userID == Cookies.get("UserID") && item.status === false)
                                .map(item => (
                                    <div key={item.id === Cookies.get('userID')}>
                                        <Card className='m-5 p-3'>
                                            <Card.Body>
                                                <Card.Title className='text-uppercase'>{item.vehicleNo}</Card.Title>
                                                <Card.Text>
                                                    <p>{item.vehicleName} </p>
                                                    <p>{item.vehicleType}</p>
                                                    <p>{item.location}</p>
                                                    {item.status === true
                                                        ?
                                                        <Link to={`/applypolicy/${item.vehicleId}`} onClick={Cookies.set('vehicleId', item.vehicleId)} className="btn btn-primary m-1">
                                                            Apply Now
                                                        </Link>
                                                        :
                                                        <Link to={`/viewpolicy/${item.vehicleId}`} onClick={Cookies.set('vehicleId', item.vehicleId)} className="btn btn-primary m-1">
                                                            Applied
                                                        </Link>
                                                    }
                                                    <Link to={`/vehicleupdate/${item.vehicleId}`} onClick={Cookies.set('vehicleId', item.vehicleId)} className="btn btn-warning m-1">Edit</Link>

                                                </Card.Text>

                                            </Card.Body>
                                        </Card>
                                    </div>
                                )) : 'Loading...'}
                        <div>
                            <h2>List of Vehicles</h2>
                            <table className="table table-striped">
                                <thead>
                                    <tr className='text-uppercase'>
                                        <th>Vehicle Number</th>
                                        <th>Vehicle Name</th>
                                        <th>Vehicle Type</th>
                                        <th>Location</th>
                                        <th>Year Of Make</th>
                                        <th>IDV value</th>
                                        <th>Policy</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        data
                                            .filter((item) => item.userID == Cookies.get("UserID"))
                                            .map((d, i) => (
                                                <tr className='text-uppercase' key={i === Cookies.get('userID')}>
                                                    <td>{d.vehicleNo}</td>
                                                    <td>{d.vehicleName}</td>
                                                    <td>{d.vehicleType}</td>
                                                    <td>{d.location}</td>
                                                    <td>{d.yearOfMake}</td>
                                                    <td>{d.idVvalue}</td>
                                                    {
                                                        d.status === false
                                                            ?
                                                            <td>
                                                                <Link to={`/viewpolicy/${d.vehicleId}`} onClick={Cookies.set('vehicleId', d.vehicleId)} className="btn btn-success m-1">Applied</Link>
                                                            </td>
                                                            :
                                                            <td>
                                                                <Link to={`/applypolicy/${d.vehicleId}`} onClick={Cookies.set('vehicleId', d.vehicleId)} className="btn btn-primary m-1">
                                                                    Apply Now
                                                                </Link>
                                                            </td>
                                                    }
                                                    <td>
                                                        <Link to={`/vehicleupdate/${d.vehicleId}`} onClick={Cookies.set('vehicleId', d.vehicleId)} className="btn btn-primary m-1">Edit</Link>
                                                        {/* <Link to={`/vehicledelete/${d.vehicleId}`} onClick={Cookies.set('vehicleId', d.vehicleId)} className="btn btn-danger m-1">Delete</Link> */}
                                                    </td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    </main>
                </div >
            </div >
        </>
    );
};