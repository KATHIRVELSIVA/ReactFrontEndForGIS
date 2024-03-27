import './App.css';
import { Policy } from './components/policy/Policy';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddOnPolicy } from './components/addonpolicy/AddOnPolicy';
import { Home } from './components/home/Home';
import { SignUp } from './components/home/SignUp';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { Dashboard } from './components/dashboard/dashboard';
import { Vehicle } from './components/dashboard/Vehicle';
import { VehicleUpdate } from './components/Vehicle/VehicleUpdate';
import { VehicleDelete } from './components/Vehicle/VehicleDelete';
import PdfUploader from './components/pdfuploader/PdfUploader';
import PdfDownloader from './components/pdfuploader/PdfDownloader';
import { InsuranceApply } from './components/insuranceapply/InsuranceApply';
import { ViewInsurance } from './components/insuranceapply/ViewInsurance';
import { Admin } from './components/admin/Admin';
import { UserList } from './components/admin/UserList';
import { VehicleList } from './components/admin/VehicleList';
import { AddPolicy } from './components/admin/policy/Addpolicy';
import { PolicyUpdate } from './components/admin/policy/UpdatePolicy';
import { DeletePolicy } from './components/admin/policy/DeletePolicy';
import { AddaddOnPolicy } from './components/admin/addonpolicy/AddAddOnPolicy';
import { AddOnUpdate } from './components/admin/addonpolicy/AddOnUpdate';
import { AddOnDelete } from './components/admin/addonpolicy/AddOnDelete';
import { ClaimInsurance } from './components/insuranceapply/ClaimInsurance';
import { ClaimAmount } from './components/insuranceapply/ClaimAmount';

function App() {

  const logOutFromDashBoard = (event) => {
    Cookies.remove("email");
    Cookies.remove("password");
    Cookies.remove("UserID");
    Cookies.remove("vehicleId");
    Cookies.remove("UserData");
    Cookies.remove("UserName");
    Cookies.remove("admin")
    window.location.reload();
  };
  const cookieCheck = Cookies.get("email");
  const adminCheck = Cookies.get("admin");
  if (adminCheck) {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="home">GIS</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Services
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="userlist">User List</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="vehiclelist">Vehicle List</a>
                </div>
              </li>
              <li>
                <span className='navbar-text'>
                  <button type="button" className="btn btn-sm btn-outline-danger mr-3 float-right" onClick={logOutFromDashBoard}>Logout</button>
                </span>
              </li>
            </ul>


          </div>
        </nav>
        <BrowserRouter>
          <Routes>
            <Route path='/policy' element={<Policy />}></Route>
            <Route path='/add-on-policy' element={<AddOnPolicy />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/admindashboard' element={<Admin />}></Route>
            <Route path='/userlist' element={<UserList />}></Route>
            <Route path='/vehiclelist' element={<VehicleList />}></Route>
            <Route path='/vehicleupdate/:id' element={<VehicleUpdate />}></Route>
            <Route path='/vehicledelete/:id' element={<VehicleDelete />}></Route>
            <Route path='/addpolicy' element={<AddPolicy />}></Route>
            <Route path='/add-add-onpolicy' element={<AddaddOnPolicy />}></Route>
            <Route path='/policyupdate/:id' element={<PolicyUpdate />}></Route>
            <Route path='/add-add-onpolicyupdate/:id' element={<AddOnUpdate />}></Route>
            <Route path='/policydelete/:id' element={<DeletePolicy />}></Route>
            <Route path='/add-add-onpolicydelete/:id' element={<AddOnDelete />}></Route>

          </Routes>
        </BrowserRouter>
      </>
    );
  }
  else if (cookieCheck) {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/dashboard">
              <i class="bi bi-person-circle h1"></i>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="dashboard">Dashboard</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Services
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="policy">Policy</a>
                  <a className="dropdown-item" href="add-on-policy">Add On Policy</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="about">About</a>
                </div>
              </li>
            </ul>
            <span className='navbar-text'>
              <button type="button" className="btn btn-sm btn-outline-danger mr-3 float-right" onClick={logOutFromDashBoard}>Logout</button>
            </span>

          </div>
        </nav>


        <BrowserRouter>
          <Routes>
            <Route path='/policy' element={<Policy />}></Route>
            <Route path='/add-on-policy' element={<AddOnPolicy />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/sign-up' element={<SignUp />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/addVehicle' element={<Vehicle />}></Route>
            <Route path='/vehicleupdate/:id' element={<VehicleUpdate />}></Route>
            <Route path='/vehicledelete/:id' element={<VehicleDelete />}></Route>
            <Route path='/pdfUpload' element={<PdfUploader />}></Route>
            <Route path='/pdfDownload' element={<PdfDownloader />}></Route>
            <Route path='/applypolicy/:id' element={<InsuranceApply />}></Route>
            <Route path='/viewpolicy/:id' element={<ViewInsurance />}></Route>
            <Route path='/vehicleclaim/:id' element={<ClaimInsurance />}></Route>
            <Route path='/vehicleclaimamount' element={<ClaimAmount />}></Route>
          </Routes>
        </BrowserRouter>
        {/* <marquee direction="right"><Car /></marquee> */}
      </>
    );
  }
  else {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="home">GIS</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="home">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="sign-up">SignUp</a>
              </li>

            </ul>
          </div>
        </nav>
        <BrowserRouter>
          <Routes>
            <Route path='/policy' element={<Policy />}></Route>
            <Route path='/add-on-policy' element={<AddOnPolicy />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/sign-up' element={<SignUp />}></Route>
            {/* <Route path='/checkhome' element={<CheckHome />}></Route> */}

          </Routes>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
