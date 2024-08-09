import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Welcome({ auth }) {
    const isAuth = (user) => {
        const AdminChecker = user ? user.isAdmin : null
        const Direct = AdminChecker == 1 ? 'admin.dashboard' : 'book.page'
        const ButtonText = AdminChecker == 1 ? 'Go To Dashboard' : 'Let`s Go Reserved'

        return (
            <>
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-bold mb-5">{user === null ? 'Perpustakaan Digital Indonesia' : `Welcome Back ${user.name}`}</h1>
                    {user == undefined ? <p className="mb-6">#GoLiterasi #GoIndonesiaMaju</p> : ''}
                    <Link className="btn btn-wide mx-1 text-white" href={user === null ? route('login') : route(Direct)} >{user === null ? 'Please to SignUp' : ButtonText}</Link>
                </div>
            </>
        )
    }

    return (
        <>
            <Head title="PerpusID" />

            <div className="bg-slate-50 min-h-screen text-gray-800">
                <Navbar auth={auth.user} />
                <div className="hero min-h-screen bg-grey">
                    <div className="hero-content text-center">
                        {isAuth(auth.user)}
                    </div>
                </div>
            </div>
        </>
    );
}
