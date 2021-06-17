import '../styles/index.scss'
import { AnimatePresence } from 'framer-motion'
import { Provider } from '../context/appContext'

function MyApp({ Component, pageProps }) {
    return (
        <Provider>
            <AnimatePresence>
                <Component {...pageProps} />
            </AnimatePresence>
        </Provider>
    )
}

export default MyApp
