import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { AiFillHome, AiFillProfile, AiOutlineTags, AiFillShop, AiFillShopping } from "react-icons/ai";
const NavBar = () => {
    const {state,dispatch} = useContext(UserContext)
    const renderList = ()=> {
        if(state) {
            return [
                <li><Link to="/profile">Profile <AiFillProfile /> </Link></li>,
                <li><Link to="/mySubGreddiits">My Sub Greddiits <AiFillShop /> </Link></li>,
                <li><Link to="/subGreddiitPage">Sub Greddiits Page < AiFillShopping /> </Link></li>,
                <li><Link to="/savedPost">Saved Post <AiOutlineTags /> </Link></li>,
                <li><Link to="/chatOption">Chat <AiOutlineTags /> </Link></li>,
                <li><Link to="/login" className="#d50000 red accent-4" onClick={() => {localStorage.clear() 
                dispatch({type:"CLEAR"})}} > 
                    Signout
                </Link></li>
            ]
        } else {
            return [
                <li><Link to="/login">Login</Link></li>
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white"> 
                <Link to={state ? "/" : "/login"} className="brand-logo left">Greddiit <AiFillHome /> </Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav >
    )
}

export default NavBar;