import { Fragment, useEffect, useState } from "react";
import HeaderAdmin from "../../components/header-admin";
import { isAuth } from "@/lib/axios";
import { getToken } from "@/utils/configToken";

export default function Proucts() {
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        let token = getToken();
        async function checkAuth() {
            const res = await isAuth(token);
            setAuthenticated(res);
        }
        checkAuth();
    }, []);
    return (
        <Fragment>
            {!authenticated ? null :
                <>
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
                                        <button className="btn btn-indigo btn-with-icon mb-4" data-toggle="modal" data-target="#products-modal">
                                            <i className="typcn typcn-document-text" /> Add Product
                                        </button>
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

                    {/* product modal  */}
                    <div id="products-modal" className="modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Products Form</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label className="col-form-label">Product Name:</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label className="col-form-label">Description:</label>
                                                    <textarea className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Stock Keeping Unit:</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Batch Code:</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-indigo">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </Fragment>
    )
}