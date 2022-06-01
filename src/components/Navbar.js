import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"

export const Navbar = () => {
    const location = useLocation();

    useEffect(() => {
        let scroll;

        if (location.pathname === '/') {
            scroll = sessionStorage.getItem('scrollPositionMain');
            
        } else if (location.pathname === '/favorite') {
            scroll = sessionStorage.getItem('scrollPositionFav');
        }

        setTimeout(() => {
            window.scrollTo({top: scroll, behavior: 'smooth'});
        }, 1);

    });

    

    return (
        <nav>
            <div className="nav-container">
                <Link to='/' className={location.pathname === '/' ? 'nav-link-selected' : ''}>Все котики</Link>
                <Link to='/favorites' className={location.pathname === '/favorites' ? 'nav-link-selected' : ''}>Любимые котики</Link>
            </div>
        </nav>
    )
}