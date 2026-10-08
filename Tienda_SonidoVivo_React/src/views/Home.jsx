import Header from '../components/Header'
import Footer from '../components/Footer'

import {itemsFooter} from '../data/footer'

function Home() {
    return (
        <>
            <Header/>
            <Footer
                itemsFooter={itemsFooter}
            />
        </>
    )
}

export default Home