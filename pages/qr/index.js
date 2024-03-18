import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { findProduct } from "@/lib/axios";

export default function Home() {
    const [result, setResult] = useState("search to check your product legit.")
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    async function checkLegit() {
        const { data } = router.query;
        console.log(data)
        setLoading(true)
        const res = await findProduct(data)
        if (res.status == false) {
            setResult("No Data Found !")
            setLoading(false)
        } else {
            setResult(res)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (router.query.data != undefined) {
            checkLegit()
        }
    }, [router.query])

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
                            <Link href="/" className="btn btn-indigo">Check Authencity</Link>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container pt-xl-0 pb-xl-5 pl-xl-5 pr-xl-5 pt-0 pb-4 pl-4 pr-4'>
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
                                        <br />
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