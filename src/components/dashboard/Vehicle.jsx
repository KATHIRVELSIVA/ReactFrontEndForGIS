import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
export function Vehicle() {
    // const [values, setValues] = useState({
    //     status: true,
    //     userID: Cookies.get("UserID")
    // });

    // const navigate = useNavigate();
    // const id = Cookies.get('UserID');
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.post('https://localhost:44319/api/Vehicle', values)
    //         .then(res => {
    //             alert('car registered successfully..');
    //             navigate('/dashboard');
    //         })
    //         .catch(err => console.log(err));
    // }
    // return (
    //     <>

    //         <form className="card container mt-1 p-2 text-uppercase">
    //             <h3 className="text-center ">Register your vehicle</h3>

    //             <div className="mb-3">
    //                 <label>Vehicle Number</label>
    //                 <input
    //                     type="text"
    //                     className="form-control text-uppercase"
    //                     placeholder="AB XX CD XXXX"
    //                     aria-required
    //                     max={10}
    //                     onChange={e => setValues({ ...values, vehicleNo: e.target.value })}
    //                 />
    //             </div>

    //             <div className="mb-3">
    //                 <label>MFG Name</label>
    //                 <input
    //                     type="text"
    //                     className="form-control"
    //                     placeholder="MFG Name"
    //                     required
    //                     onChange={e => setValues({ ...values, vehicleName: e.target.value })}
    //                 />
    //             </div>

    //             <div className="mb-3">
    //                 <label>Vehicle Type</label>
    //                 <input
    //                     type="text"
    //                     className="form-control"
    //                     placeholder="Vehicle Type"
    //                     required
    //                     onChange={e => setValues({ ...values, vehicleType: e.target.value })}
    //                 />
    //             </div>

    //             <div className="mb-3">
    //                 <label>Location</label>
    //                 <input
    //                     type="text"
    //                     className="form-control"
    //                     placeholder="Location"
    //                     required
    //                     onChange={e => setValues({ ...values, location: e.target.value })}
    //                 />
    //             </div>
    //             <div className="mb-3">
    //                 <label>Year of Make</label>
    //                 <input
    //                     type="month"
    //                     className="form-control"
    //                     placeholder="Year of Make"
    //                     required
    //                     onChange={e => setValues({ ...values, yearOfMake: e.target.value })}
    //                 />
    //             </div>

    //             <div className="mb-3">
    //                 <label>IDV Value</label>
    //                 <input
    //                     type="text"
    //                     className="form-control"
    //                     placeholder="IDV value"
    //                     required
    //                     onChange={e => setValues({ ...values, idVvalue: e.target.value })}
    //                 />
    //             </div>


    //             <div className="d-grid">
    //                 <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
    //                     Submit
    //                 </button>
    //             </div>
    //         </form>
    //     </>
    // );



    const [values, setValues] = useState({
        status: false,
        userID: 1,
        vehicleNo: "",
        vehicleName: "",
        vehicleType: "",
        location: "",
        yearOfMake: "",
    });
    const navigate = useNavigate();
    const idVCalculator = () => {
        if (values.vehicleName === "Maruthi") {
            let yearOfMake = parseInt(values.yearOfMake);
            let priceOfMaruthi = 555000;
            if (yearOfMake >= 2020) {
                let idVvalue = priceOfMaruthi * 15 / 100;
                idVvalue = priceOfMaruthi - idVvalue;
                return idVvalue;
            }
            else if (yearOfMake >= 2018) {
                let idVvalue = priceOfMaruthi * 50 / 100;
                idVvalue = priceOfMaruthi - idVvalue;
                return idVvalue;
            }
            else {
                let idVvalue = priceOfMaruthi * 75 / 100;
                idVvalue = priceOfMaruthi - idVvalue;
                return idVvalue;
            }
        }
        else if (values.vehicleName === "Tata Punch") {
            let yearOfMake = parseInt(values.yearOfMake);
            let priceOfMaruthi = 692000;
            if (yearOfMake >= 2020) {
                let idVvalue = priceOfMaruthi * 15 / 100;
                idVvalue = priceOfMaruthi - idVvalue;
                return idVvalue;
            }
            else if (yearOfMake >= 2018) {
                let idVvalue = priceOfMaruthi * 50 / 100;
                idVvalue = priceOfMaruthi - idVvalue;
                return idVvalue;
            }
            else {
                let idVvalue = priceOfMaruthi * 75 / 100;
                idVvalue = priceOfMaruthi - idVvalue;
                return idVvalue;
            }
        }
        else if (values.vehicleName === "Kia Seltos") {
            let yearOfMake = parseInt(values.yearOfMake);
            let priceOfMaruthi = 1139000;
            if (yearOfMake >= 2020) {
                let idVvalue = priceOfMaruthi * 15 / 100;
                idVvalue = priceOfMaruthi - idVvalue;
                return idVvalue;
            }
            else if (yearOfMake >= 2018) {
                let idVvalue = priceOfMaruthi * 50 / 100;
                idVvalue = priceOfMaruthi - idVvalue;
                return idVvalue;
            }
            else {
                let idVvalue = priceOfMaruthi * 75 / 100;
                idVvalue = priceOfMaruthi - idVvalue;
                return idVvalue;
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let iDVvalue = idVCalculator();

        const post = {
            status: false,
            userID: 1,
            vehicleNo: values.vehicleNo,
            vehicleName: values.vehicleName,
            vehicleType: values.vehicleType,
            location: values.location,
            yearOfMake: values.yearOfMake,
            idVvalue: iDVvalue
        }
        console.log(post);

        axios.post('https://localhost:44319/api/Vehicle', post)
            .then(res => {
                alert('car registered successfully..');
                navigate('/dashboard');
            })
            .catch(err => console.log(err));

    }

    const d = new Date();
    let year = d.getFullYear();
    const count = [];
    for (let step = 2000; step <= year; step++) {
        count.push(step);
    }
    const yearOptions = count.map((timeString) => {
        return {
            value: timeString,
            label: timeString
        }
    }
    );
    // console.log(yearOptions);
    return (
        <>
            <div className='mainform'>
                <form className="card container text-uppercase" onSubmit={handleSubmit}>
                    <h3 className="text-center ">Register your vehicle</h3>

                    <div className="mb-3">
                        <label>Vehicle Number</label>
                        <input
                            type="text"
                            className="form-control text-uppercase"
                            placeholder="ABXXCDXXXX"
                            required
                            pattern='[a-zA-Z]{2}[0-9]{2}[a-zA-Z]{2}[0-9]{4}'
                            title="The Vehicle Number not match with the code of ABXXCDXXXX"
                            maxLength={10}
                            onChange={e => setValues({ ...values, vehicleNo: e.target.value.toUpperCase() })}
                        />
                    </div>


                    <div className="mb-3">
                        <label>MFG Name</label>
                        <select class="form-select" required onChange={e => setValues({ ...values, vehicleName: e.target.value })}>
                            <option value="">Choose One</option>
                            <option value="Maruthi">Maruthi</option>
                            <option value="Tata Punch">Tata Punch</option>
                            <option value="Kia Seltos">Kia Seltos</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label>Vehicle Type</label>
                        <select class="form-select" required onChange={e => setValues({ ...values, vehicleType: e.target.value })}>
                            <option value="">Choose One</option>
                            <option value="CNG">CNG</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                        </select>
                    </div>


                    <div className="mb-3">
                        <label>Location</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Location"
                            required
                            onChange={e => setValues({ ...values, location: e.target.value })}
                        />
                    </div>
                    <select className='form-select' required onChange={e => setValues({ ...values, yearOfMake: e.target.value })}>
                        <option value="">Choose One</option>
                        {
                            yearOptions.map((yearOptions) => (
                                <option value={yearOptions.value}>{yearOptions.label}</option>
                            ))
                        }
                    </select>

                    <div className="d-grid m-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );



}