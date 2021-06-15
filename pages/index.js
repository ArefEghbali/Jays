import Head from 'next/head'
import Image from 'next/image'

import Topbar from '../Components/Topbar/Topbar'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Jays. | Best Sneakers for everyone</title>
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <link rel='icon' href='/favicon.ico' />
                <link rel='preconnect' href='https://fonts.gstatic.com' />
                <link
                    href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap'
                    rel='stylesheet'
                />
            </Head>
            <Topbar />
        </div>
    )
}