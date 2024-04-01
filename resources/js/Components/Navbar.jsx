import React from 'react'
import { Link } from '@inertiajs/react'

function Navbar({ auth }) {
    console.log(auth)
    const isAuth = (user) => {
        const CheckAdmin = (userCheck) => {
            if (userCheck) {
                return (
                    <>
                        <li><Link href={route('adminDashboard')} >Dashboard</Link></li>
                        <li><Link href={route('pageimportbuku')} method='get' as='button' >Import Book</Link></li>
                    </>
                )
            } else {
                return (
                    <li><Link href={route('userDashboard')} >Dashboard</Link></li>
                )
            }
        }
        if (user) {
            return (
                <>
                    <div className="flex-none mx-5">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <details>
                                    <summary>
                                        Menu
                                    </summary>
                                    <ul className="p-1 bg-white rounded-t-none">
                                        {CheckAdmin(user.isAdmin)}
                                        <li><Link href={route('daftarbukupage')} method='get' as='button' >Daftar Buku</Link></li>
                                        <li><Link href={route('logout')} method='post' as='button' >Sign Out</Link></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </>
            )
        } else {
            return ""
        }
    }
    return (
        <>
            <div className="navbar bg-white text-gray-800">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl text-gray-800" href="/">Perpustakaan SMKN 21 Jakarta</Link>
                </div>
                {isAuth(auth)}
            </div>
        </>
    )
}

export default Navbar
