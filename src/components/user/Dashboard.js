import { Link } from "react-router-dom";
import { userInfo } from "../../utils/auth";
import Layout from "../Layout";
import OrderHistory from "../OrderHistory/OrderHistory";
import PurchaseHistory from "../PurchaseHistory/PurchaseHistory";

const Dashboard = () => {
  const { name, email, role } = userInfo();

  const UserLinks = () => (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">
        <h5>User Links</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <Link to="/cart" className="text-decoration-none text-dark">
            <i className="bi bi-cart4 me-2"></i>My Cart
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="#" className="text-decoration-none text-dark">
            <i className="bi bi-person-circle me-2"></i>Update Profile
          </Link>
        </li>
      </ul>
    </div>
  );

  const UserInfo = () => (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-success text-white">
        <h5>User Information</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Name: </strong>
          {name}
        </li>
        <li className="list-group-item">
          <strong>Email: </strong>
          {email}
        </li>
        <li className="list-group-item">
          <strong>Role: </strong>
          {role}
        </li>
      </ul>
    </div>
  );

  const OrderHistoryDiv = () => (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-warning text-white">
        <h5>Current Orders</h5>
      </div>
      <div className="card-body">
        <OrderHistory />
      </div>
    </div>
  );

  const PurchaseHistoryDiv = () => (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-info text-white">
        <h5>Purchase History</h5>
      </div>
      <div className="card-body">
        <PurchaseHistory />
      </div>
    </div>
  );

  return (
    <Layout title="Dashboard" className="container-fluid">
      <div className="row">
        <div className="col-lg-3 mb-4">
          <UserLinks />
        </div>
        <div className="col-lg-9">
          <UserInfo />
          <OrderHistoryDiv />
          <PurchaseHistoryDiv />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
