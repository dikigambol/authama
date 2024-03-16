import { Fragment, useEffect, useState } from "react";
import HeaderAdmin from "../../components/header-admin";
import { getToken } from "@/utils/configToken";
import { isAuth } from "@/lib/axios";

export default function Home() {
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
                                <div className="az-dashboard-one-title">
                                    <div>
                                        <h2 className="az-dashboard-title">Hi, Welcome Back !</h2>
                                        <p className="az-dashboard-text">The following is a list of your products in a certain period.</p>
                                    </div>
                                </div>
                                <div className="row row-sm mg-b-20">
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
                                </div>
                                <div className="row row-sm mg-b-20">
                                    <div className="col-lg-8 mg-t-20 mg-lg-t-0">
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="card card-dashboard-two">
                                                    <div className="card-header pb-3">
                                                        <h6>
                                                            0
                                                            <i className="icon ion-md-trending-up" />
                                                        </h6>
                                                        <p>Products Total</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </Fragment>
    )
}