import { Link } from "react-router-dom"

export const Navbar = () => {

    return (
        <nav>
            <Link to='/'>Все котики</Link>
            <Link to='/favorites'>Любимые котики</Link>
        </nav>
    )
}