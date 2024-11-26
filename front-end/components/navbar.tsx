import Link from 'next/link';
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
                       <Link href='/' >home</Link>
                        </li>
                    <li>
                        <Link href='/register'>
                        regiester
                        </Link>
                    </li>
                    <li>
                        <Link href='/login'> 
                        login </Link>
                    </li>
                    <li>some other thing</li>
                    <li>some other thing</li>
                    <li>some other thing</li>

                </ul>
            </nav>
    )
    
}

export default NavBar;