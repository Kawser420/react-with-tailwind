import React, { useState } from 'react';
import Link from '../Link/Link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

const NavBar = () => {
    const [open, setOpen] = useState(false);

    const routes = [
        { id: 1, name: 'Home', path: './home' },
        { id: 2, name: 'Product', path: './product' },
        { id: 3, name: 'Order', path: './order' },
        { id: 4, name: 'About', path: './about' },
        { id: 5, name: 'Login', path: './login' }
    ]

    return (
        <nav className='bg-gray-200 w-full'>
            <div onClick={() => setOpen(!open)} className="h-6 w-6 md:hidden">
                {
                    open ? <XMarkIcon /> : <Bars3Icon />
                }
            </div>
            <ul className={`bg-purple-100 md:flex w-full justify-center absolute md:static duration-300 ease-in ${open ? 'top-6' : 'top-[-120px]'}`}>
                {
                    routes.map(route => <Link
                        key={route.id}
                        route={route}
                    ></Link>)
                }
            </ul>
        </nav>
    );
};

export default NavBar;