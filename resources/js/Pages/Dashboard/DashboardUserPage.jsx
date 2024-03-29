import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

import TableLoanBook from '@/Components/UserDashboard/TableLoanBook';

export default function DashboardUserPage({ auth, book_tersedia, buku_dipesan }) {
    const submitPinjam = (id) => {
        const url = route('pinjambuku', id)
        axios.post(url)
            .then(() => {
                document.getElementById('modalDaftarBuku').close()
                window.location.reload(true)
            })
            .catch(err => console.log(err))
    }

    const TableBukuYangTersedia = (item) => {
        return (
            <>
                <div className="overflow-x-auto">
                    <table className="table text-slate-800">
                        {/* head */}
                        <thead className='text-slate-800 font-bold'>
                            <tr>
                                <th>No</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>ISBN</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                item.map((value, i) => (
                                    <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td>{value.title}</td>
                                        <td>{value.author}</td>
                                        <td>{value.isbn}</td>
                                        <td>
                                            <button type="submit" onClick={() => submitPinjam(value.id)}>Pinjam</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

    return (
        <>
            <AuthenticatedLayout
                user={auth}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                <Head title='Dashboard' />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/* Kode diluar Card */}
                        {/* Modal Start */}
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn bg-white text-gray-800 hover:bg-gray-800 hover:text-white" onClick={() => document.getElementById('modalDaftarBuku').showModal()}>Daftar Buku</button>
                        <dialog id="modalDaftarBuku" className="modal">
                            <div className="modal-box max-w-5xl bg-white text-gray-800">
                                <h3 className="font-bold text-lg">Daftar Buku yang Tersedia</h3>
                                {TableBukuYangTersedia(book_tersedia)}
                                <div className="modal-action">
                                    <button className="btn bg-white text-slate-800 hover:bg-slate-800 hover:text-white" onClick={() => document.getElementById('modalDaftarBuku').close()}>Close</button>
                                </div>
                            </div>
                        </dialog>
                        {/* Modal End */}

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
