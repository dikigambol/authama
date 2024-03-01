import Link from "next/link";

export default function Home() {
    return (
        <div>
            <header>
                <div className="landing-sass-header-content bg-triangle">
                    <div id="particles-js"></div>
                    <div className="p-5">
                        <img src='/imgs/logo.png' className="img-logo"/>
                        <p className='text-center mt-3 text-indigo'>
                            Revolutionizing your digital efforts with our state-of-the-art. <br />Seamlessly verify and secure the identities of goods and transactions <br />using blockchain technology.
                        </p>
                        <div className="text-center mt-4 mb-4">
                            <Link href="/" className="btn btn-indigo">Check Authencity</Link>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container p-xl-5 p-4'>
                <h1 className="font-weight-bold">Check Authencity.</h1>
                <div className="input-group mb-3 mt-1">
                    <div className='mt-4 custom-card'>
                        <p className='text-center'>no data found.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}