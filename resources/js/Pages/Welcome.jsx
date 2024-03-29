import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Welcome({ auth }) {

    const isAuth = (auth) => {
        if (auth) {
            return (
                <>
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">PerpusID</h1>
                        <p className="py-6">Website Mengelola buku pada Perpustakaan</p>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Selamat Datang</h1>
                        <p className="py-6">Silahkan Login/Register untuk langkah selanjutnya</p>
                        <Link className="btn mx-1 text-white" href={route('login')} >Login</Link>
                        <Link className="btn mx-1 text-white" href={route('register')} >Register</Link>
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <Head title="PerpusID" />
            {/* Start Container */}
            <div className="bg-slate-50 min-h-screen text-gray-800">
                <Navbar auth={auth.user} />
                <div className="hero min-h-screen bg-grey">
                    <div className="hero-content text-center">
                        {isAuth(auth.user)}
                    </div>
                </div>
            </div>
            {/* End Container */}

            {/* <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style> */}
        </>
    );
}
