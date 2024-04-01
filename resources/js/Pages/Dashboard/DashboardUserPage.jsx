import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

import TableLoanBook from '@/Components/UserDashboard/TableLoanBook';

export default function DashboardUserPage({ auth, buku_dipesan }) {

    return (
        <>
            <AuthenticatedLayout
                user={auth}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                <Head title='Dashboard' />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Link href={route('daftarbukupage')} method='get' as='button' type='button' className='btn bg-white text-slate-800 hover:bg-slate-800 hover:text-white'>Daftar Buku</Link>
                        {/* Kode diluar Card */}
                        <div className="bg-white mt-4 overflow-hidden shadow-sm sm:rounded-lg">
                            {/* Kode di dalam Card */}
                            <div className="p-6 text-gray-900">
                                <TableLoanBook data={buku_dipesan} />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
