import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Paginator from '@/Components/AdminDashboard/item/Paginator'

const DaftarBuku = (props) => {

    const submit = (id) => {
        const url = route('pinjambuku', id)
        axios.post(url)
            .then(() => {
                window.location.reload(true)
            })
            .catch(err => console.log(err))
    }

    const TableBuku = (data) => {
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
                                    data.map((value, i) => (
                                        <tr key={i + 2348}>
                                            <th>{i + 1}</th>
                                            <td>{value.title}</td>
                                            <td>{value.author}</td>
                                            <td>{value.isbn}</td>
                                            <td>
                                                <button type="submit" onClick={() => submit(value.id)}>Pinjam</button>
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
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white mt-4 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-center text-xl font-bold">Buku yang Tersedia</h2>
                            <hr />
                            {TableBuku(props.book_tersedia.data)}
                            <Paginator data={props.book_tersedia} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default DaftarBuku

