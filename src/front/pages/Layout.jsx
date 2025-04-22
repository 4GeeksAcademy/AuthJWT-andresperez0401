import { Outlet } from "react-router-dom"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const Layout = () => {
    const location = useLocation()
    
    return (
        <ScrollToTop>
            
            <main className="container mt-4">
                <Outlet />
            </main>
      
        </ScrollToTop>
    )
}