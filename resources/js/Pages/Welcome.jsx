import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Welcome(props) {
    const user = props.auth.user
    console.log(user)

    const isAuth = (user) => {
        const AuthChecker = user ? true : false
        const UserType = user?.type || 'guest'
        const Direct = AuthChecker == true && UserType == 'admin' ? 'admin.dashboard' : 'book.page'
        const ButtonText = AuthChecker == true && UserType == 'admin' ? 'Go To Dashboard' : 'Let`s Go Reserved'

        return (
            <>
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-bold mb-5">{AuthChecker === false ? 'Platform Perpustakaan Digital' : `Welcome Back ${user.name}`}</h1>
                    {AuthChecker == false ? <p className="mb-6">#GoLiterasi #GoIndonesiaMaju</p> : ''}
                    <Link className="btn btn-wide mx-1 text-white" href={AuthChecker === false ? route('login') : route(Direct)} >{AuthChecker === false ? 'Please to SignUp' : ButtonText}</Link>
                </div>
            </>
        )
    }

    return (
        <>
            <Head title="Homepage" />

            <div className="bg-slate-50 min-h-screen text-gray-800">
                <Navbar auth={user} />
                <div className="hero min-h-screen bg-grey">
                    <div className="hero-content text-center">
                        {isAuth(user)}
                    </div>
                </div>
            </div>
        </>
    );
}
