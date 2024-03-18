import { login } from "@/lib/axios";
import { getToken, setToken } from "@/utils/configToken";
import { Fragment, useEffect, useState } from "react";
import Swal from 'sweetalert2';

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [isAuth, setIsAuth] = useState(true)

    async function Login(e) {
        e.preventDefault()
        setLoading(true)
        const res = await login(email, password);
        if (res) {
            setLoading(false);
            if (res.token) {
                setToken("jwt", res.token)
                window.location.replace("/dashboard")
            } else {
                Swal.fire({
                    position: "top-end",
                    title: '<p style="font-size: 20px; color: #c24f4f; margin-bottom: 0px; margin-top: 1px">' +
                        "<i class='typcn typcn-info-large'></i>" + res.message + '</p>',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: 'small-popup-class',
                    },
                    width: '300px',
                    heightAuto: false,
                });
            }
        }
    }

    useEffect(() => {
        let token = getToken()
        if (token == null) {
            setIsAuth(false)
        } else {
            window.location.replace("/dashboard")
        }
    }, [])

    return (
        <Fragment>
            {isAuth ? null :
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
                                    <form className="mt-xl-2 pb-xl-5 mb-xl-5" onSubmit={Login}>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control" placeholder="Enter your email" required
                                                onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control" placeholder="Enter your password" required
                                                onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <button href="/dashboard" className="btn btn-az-primary btn-block mt-4" disabled={loading}>
                                            {loading ? "Loading.." : "Sign In"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-3"></div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}