import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout'
import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

import TableBukuKonfirmasiPinjam from '@/Components/AdminDashboard/Table/TableBukuKonfirmasiPinjam';
import TableBukuKonfirmasiPengembalian from '@/Components/AdminDashboard/Table/TableBukuKonfirmasiPengembalian';
import TableBukuDipinjam from '@/Components/AdminDashboard/Table/TableBukuDipinjam';
import TableBukuTersedia from '@/Components/AdminDashboard/Table/TableBukuTersedia';
import Paginator from '@/Components/AdminDashboard/item/Paginator';

function DashboardAdminPage(props) {
    console.log(props)
    const [isAlert, setIsAlert] = useState(false)

    useEffect(() => {
        HandleAlert(props.flash.message)
    }, [])

    // Create Data Buku
    const { data, setData, post, processing, reset } = useForm({
        title: '',
        author: '',
        isbn: '',
        peminjam: '-',
    })

    const HandleAlert = (value) => {
        if (value) {
            setIsAlert(true)
            setTimeout(() => {
                setIsAlert(false)
            }, 2000)
        }
    }

    const submit = (e) => {
        e.preventDefault()
        post(route('storeBook'), {
            onSuccess: () => {
                reset()
                document.getElementById('create_modal').close()
            },
            // onError: (err) => {
            //     console.log('Error : ', err)
            // }
        })
    }

    // Codingan yang akan tampil di website
    return (
        <>
            <AuthenticatedLayout
                user={props.isAdmin}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                <Head title="Dashboard" />
                {isAlert && <div role="alert" className="alert alert-success text-white absolute w-96 translate-x-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{props.flash.message}</span>
                </div>}

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn bg-white text-gray-800 hover:bg-gray-800 hover:text-white" onClick={() => document.getElementById('create_modal').showModal()}>Create Data</button>
                        {/* Modal Start */}
                        <dialog id="create_modal" className="modal">
                            <div className="modal-box max-w-5xl bg-white text-gray-800">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-2 mt-1">✕</button>
                                </form>

                                <h3 className="font-bold text-xl mb-4 text-center">Create Data</h3>

                                {/* Start Form */}
                                <form method="post" onSubmit={submit} className="w-full">
                                    <input type="hidden" name="peminjam" value={data.peminjam} />
                                    {/* Form Create Data */}
                                    <label className="input input-bordered flex bg-white my-2 items-center gap-2">
                                        Title
                                        <input type="text" className="grow" placeholder="Book Title" onChange={e => setData('title', e.target.value)} value={data.title} />
                                    </label>

                                    <label className="input input-bordered flex bg-white my-2 items-center gap-2">
                                        Author
                                        <input type="text" className="grow" placeholder="Book Author" onChange={e => setData('author', e.target.value)} value={data.author} />
                                    </label>

                                    <label className="input input-bordered flex bg-white my-2 items-center gap-2">
                                        ISBN
                                        <input type="text" className="grow" placeholder="ISBN" onChange={e => setData('isbn', e.target.value)} value={data.isbn} />
                                    </label>
                                    <button className="btn bg-gray-800 text-white my-4 mx-1 hover:text-gray-800 hover:bg-white" type="submit" disabled={processing}>Submit</button>
                                </form>
                                {/* End Form */}

                            </div>
                        </dialog>
                        {/* Model End */}

                        {/* Table buku yang tersedia */}
                        <div className="bg-white mt-4 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                {/* List Book */}
                                <h2 className="text-center text-xl font-bold">Buku yang Tersedia</h2>
                                <TableBukuTersedia data={props.book_tersedia.data} />
                                <Paginator data={props.book_tersedia} />
                            </div>
                        </div>

                        <br />
                        <hr />

                        {/* Table buku yang terpinjam */}
                        <div className="bg-white mt-4 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                {/* List Book */}
                                <h2 className="text-center text-xl font-bold">Buku Terpinjam</h2>
                                <TableBukuDipinjam data={props.book_dipinjam} />
                            </div>
                        </div>

                        <br />
                        <hr />

                        {/* Table buku konfirmasi pinjam */}
                        <div className="bg-white mt-4 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                {/* List Book */}
                                <h2 className="text-center text-xl font-bold">Konfirmasi Peminjaman Buku</h2>
                                <TableBukuKonfirmasiPinjam data={props.book_k_pinjam} />
                            </div>
                        </div>

                        <br />
                        <hr />

                        {/* Table buku konfirmasi pengembalian */}
                        <div className="bg-white mt-4 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                {/* List Book */}
                                <h2 className="text-center text-xl font-bold">Konfirmasi Pengembalian Buku</h2>
                                <TableBukuKonfirmasiPengembalian data={props.book_k_pengembalian} />
                            </div>
                        </div>

                    </div>
                </div >
            </AuthenticatedLayout >
        </>
    )
}

export default DashboardAdminPage
