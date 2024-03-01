import Head from "next/head";

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Authama</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Authama is a platform revolutionizing your digital efforts with our state-of-the-art blockchain authentication solution. Seamlessly verify and secure the identities of goods and transactions using blockchain technology, ensuring unparalleled transparency, integrity, and trust." />
                <link rel="icon" type="image/svg+xml" href="/imgs/icon.png" />
                <link href="/lib/fontawesome-free/css/all.min.css" rel="stylesheet" />
                <link href="/lib/ionicons/css/ionicons.min.css" rel="stylesheet" />
                <link href="/lib/typicons.font/typicons.css" rel="stylesheet" />
                <link rel="stylesheet" href="/css/azia.css" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />
                <script src="/lib/jquery/jquery.min.js"></script>
                <script src="/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
                <script src="/lib/ionicons/ionicons.js"></script>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default App;
