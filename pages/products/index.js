import { Fragment } from "react";
import HeaderAdmin from "../../components/header-admin";

export default function Proucts() {
    return (
        <Fragment>
            <HeaderAdmin />
            <div className="az-content az-content-dashboard">
                <div className="container">
                    <div className="az-content-body">
                        <h2 className="az-dashboard-title mb-4">List of Products.</h2>
                        <div className="row">
                            <div className="col-lg-2 mb-3">
                                <label className="mg-b-10">Month</label>
                                <select className="form-control select2-no-search">
                                    <option label="All" />
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                            <div className="col-lg-2 mb-3">
                                <label className="mg-b-10">Years</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-lg-12 mt-4">
                                <button className="btn btn-indigo btn-with-icon mb-4"><i className="typcn typcn-document-text" /> Add Product</button>
                                <div className="table-responsive mt-1">
                                    <table className="table table-hover mg-b-0">
                                        <thead>
                                            <tr>
                                                <th>Num</th>
                                                <th>ID Transaction</th>
                                                <th>Product Name</th>
                                                <th>Description</th>
                                                <th>Stock Keeping Unit</th>
                                                <th>Batch Code</th>
                                                <th>Option</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>WASKLAKSAS13</td>
                                                <td>Tiger Nixon</td>
                                                <td>System Architect</td>
                                                <td>0</td>
                                                <td>
                                                    <span className="badge badge-pill badge-dark">XX0X0</span>
                                                </td>
                                                <td>
                                                    <button data-toggle="dropdown" className="btn btn-indigo btn-sm">Option <i className="icon ion-ios-arrow-down tx-11 mg-l-3" /></button>
                                                    <div className="dropdown-menu">
                                                        <a href="#" className="dropdown-item">Update</a>
                                                        <a href="#" className="dropdown-item">Delete</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}