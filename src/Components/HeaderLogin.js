import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assests/BookStore.jpg'; // Import logo from assets


const HeaderLogin = () => {

    return (
        <div className="FirstDiv mx-[94.5px] px-5">
            {/* SecondDiv with flex to space out children */}
            <div className="SecondDiv flex justify-between items-center">
                {/* InnerFirst: logo and navigation */}
                <div className="InnerFirst flex justify-between items-center space-x-5">
                    <div>
                        <Link to="/"><img src={logo} alt="Logo" width="80px" height="80px"/></Link>
                    </div>
                    <h1>BookStore</h1>

                </div>

                {/* InnerSecond: Search bar and Sign-in button */}
                <div className="InnerSecond flex items-center space-x-10">
                    <div>
                        <ul className="flex space-x-4 ">
                            <li className='hover:text-blue-600'><Link to="/allbooks">All Books</Link></li>
                            <li className='hover:text-blue-600'><Link to="/about">About Us</Link></li>
                            <li className='hover:text-blue-600'><Link to="/contact">Contact us</Link></li>
                            <li className='hover:text-blue-600'><Link to="/cart">Cart</Link></li>
                        </ul>
                    </div>
                    <div>
                        {/* Sign-up button */}
                        <Link to="/profile">
                            <button className="bg-white-500 text-blue px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                                Profile
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderLogin;
