import { Fragment } from "react";
import Link from "next/link";

export default function Login() {
    return (
        <Fragment>
            <div className="container height-100vh">
                <div className="vertical-center">
                    <div className="row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-6 pl-xl-5 pr-xl-5 pl-md-2 pr-md-2 pr-4 pl-4 pt-sm-5 pb-sm-3">
                            <div className="pl-xl-3 pr-xl-3">
                                <img src="/imgs/logo.png" alt="logo authama" style={{ width: '240px' }} />
                                <p className="mt-3">
                                    Revolutionizing your digital efforts with our state-of-the-art. Seamlessly verify and secure the identities of goods and transactions
                                    using blockchain technology.
                                </p>
                                <form className="mt-xl-2 pb-xl-5 mb-xl-5">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" className="form-control" placeholder="Enter your email" />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder="Enter your password" />
                                    </div>
                                    <Link href="/dashboard" className="btn btn-az-primary btn-block mt-4">Sign In</Link>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3"></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}