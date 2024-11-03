import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';



const NavBar: React.FC = () => {
    const router = useRouter();

    const navigateTo = (path: string) => {
        router.push(path);
    }

    return (
        <nav>
                <ul className="nav_list">
                    <li>
                        <button onClick={() => navigateTo('/')}>Home</button>
                        </li>
                    <li onClick={() => navigateTo('/register')}>
                        <button onClick={() => navigateTo('/register')}>Register</button>
                    </li>
                    <li>
                        <button onClick={() => navigateTo('/login')}>Log in</button>
                    </li>
                    <li>some other thing</li>
                    <li>some other thing</li>
                    <li>some other thing</li>

                </ul>
            </nav>
    )
    
}

export default NavBar;