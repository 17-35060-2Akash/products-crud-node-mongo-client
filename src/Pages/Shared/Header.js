import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../../assets/images/logo.png';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { FaCartPlus } from "react-icons/fa";

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error));
    }

    const menuItems = <>
        <li className='font-semibold'><Link to='/'>Shop</Link></li>
        <li className='font-semibold'><Link to='/addproducts'>Add Products</Link></li>
        <li className='font-semibold'><Link to='/manageproducts'>Manage Products</Link></li>

        {
            user?.email ?
                <li className='font-semibold'>
                    <button onClick={handleLogOut} className='btn btn-ghost'>Log Out</button>
                </li>
                :
                <li className='font-semibold'><Link to='/login'>Login</Link></li>
        }
    </>
    return (
        <div className="navbar bg-base-100 px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">

                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/'>
                    <img className='w-28' src={logo1} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                <Link to='/orders'>
                    <button className="btn text-xl bg-slate-400 border-0" title='Cart'><FaCartPlus></FaCartPlus></button>
                </Link>
            </div>
        </div>
    );
};

export default Header;