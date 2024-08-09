import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Paginator from '@/Components/AdminDashboard/item/Paginator'
import { usePage, router } from '@inertiajs/react'

const DaftarBuku = () => {
    const { props } = usePage()

    const [Search, SetSearch] = useState('')
    const [bookTersedia, setBookTersedia] = useState(props.book_tersedia?.data || [])

    useEffect(() => {
        setBookTersedia(props.book_tersedia?.data || [])
    }, [props.book_tersedia?.data])

    const submit = async (id, e) => {
        e.preventDefault()
        const url = route('pinjambuku', id)
        router.post(url)
    }

    const TableBuku = (datas, searchInput) => {
        return (
            <>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="text-gray-800 font-medium">
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
                                    datas.filter(item => {
                                        return searchInput.toLowerCase() === '' ? item : item.title.toLowerCase().includes(searchInput)
                                    }).map((value, i) => (
                                        <tr key={i + 2348}>
                                            <th>{i + 1}</th>
                                            <td>{value.title}</td>
                                            <td>{value.author}</td>
                                            <td>{value.isbn}</td>
                                            <td>
                                                <button type="submit" onClick={(e) => submit(value.id, e)}>Pinjam</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Buku</h2>}
        >
            {props.flash.message && <div role="alert" className="alert alert-error text-white toast toast-top toast-center flex-row w-96">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{props.flash.message}</span>
            </div>}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <label className="input input-bordered flex items-center gap-2 bg-white p-8 w-3/5">
                        <input onChange={e => SetSearch(e.target.value)} type="text" className="grow text-slate-800" placeholder="Search Title" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>

                    <div className="bg-white mt-4 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-center text-xl font-bold">Buku yang Tersedia</h2>
                            <hr />
                            {TableBuku(bookTersedia, Search)}
                            {props.book_tersedia && props.book_tersedia.meta && <Paginator data={props.book_tersedia} />}
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default DaftarBuku
