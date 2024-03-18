import { findProduct } from "@/lib/axios";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [trx, setTrx] = useState("")
    const [result, setResult] = useState("search to check your product legit.")
    const [loading, setLoading] = useState(false)

    async function submitTrx(e) {
        e.preventDefault()
        setLoading(true)
        const res = await findProduct(trx)
        if (res.status == false) {
            setResult("No Data Found !")
            setLoading(false)
        } else {
            setResult(res)
            setLoading(false)
        }
    }

    return (
        <div>
            <header>
                <div className="landing-sass-header-content bg-triangle">
                    <div id="particles-js"></div>
                    <div className="p-5">
                        <img src='/imgs/logo.png' className="img-logo" />
                        <p className='text-center mt-3 text-indigo'>
                            Revolutionizing your digital efforts with our state-of-the-art. <br />Seamlessly verify and secure the identities of goods and transactions <br />using blockchain technology.
                        </p>
                        <div className="text-center mt-4 mb-4">
                            <Link href="#check-authencity" className="btn btn-indigo me-3">Check Authencity</Link>
                            <Link href="/login" className="btn btn-outline-indigo">Sign In</Link>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container p-xl-5 p-4' id="check-authencity">
                <h1 className="font-weight-bold">Check Authencity.</h1>

                <form onSubmit={submitTrx}>
                    <div className="input-group mb-3 mt-4">
                        <input type="text" className="form-control" placeholder="Type Transaction Id..."
                            onChange={(e) => setTrx(e.target.value)}
                            disabled={loading}
                            required />
                        <div className="input-group-append">
                            <button className="btn btn-indigo" type="submit" disabled={loading}>{loading ? "Searching.." : "Check"}</button>
                        </div>
                    </div>
                </form>
                {
                    loading ?
                        <div className="loader mt-5"></div>
                        :
                        <div className='mt-4 custom-card'>
                            <p className='text-center'>
                                {typeof result === 'object' ?
                                    <div>
                                        <h3>Your Product Legit &#x1F389;</h3>
                                        detail of your product below
                                        <br/>
                                        &darr;
                                        <div className="table-responsive mt-4 text-left">
                                            <table className="table table-hover mg-b-0">
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>SKU</th>
                                                        <th>Description</th>
                                                        <th>Batch Code</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{result.products_name}</td>
                                                        <td>{result.sku}</td>
                                                        <td>{result.description}</td>
                                                        <td>
                                                            <span className="badge badge-pill badge-dark">{result.batch_code}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    : result}
                            </p>
                        </div>
                }
            </div>
        </div>
    )
}