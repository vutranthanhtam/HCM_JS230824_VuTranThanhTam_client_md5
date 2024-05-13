
import "./home.scss"
import Header from '../components/headers/Header'
import Footer from '../components/footers/Footer'
import { Outlet } from 'react-router-dom'


export default function Home() {
    return (
        <div>
            <div className='home_page'>
                <Header />
                <div className='home_page_body'>
                    <Outlet/>
                </div>
                <Footer />
            </div>
        </div>
    )
}
