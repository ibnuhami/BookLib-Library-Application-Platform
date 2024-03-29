import React from 'react'
import axios from 'axios'

function TableLoanBook({ data }) {
    const submitKonfirmasiPengembalian = (id) => {
        const url = route('kembalibuku', id)
        axios.post(url)
            .then(response => {
                window.location.reload(true)
                console.log(response)
            })
            .catch(err => console.log("error ", err))
    }

    return (
        <>
            <h1 className="font-bold text-center text-xl">List buku yang Dipinjam</h1>
            <hr />
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
                                            <button type="submit" onClick={() => submitKonfirmasiPengembalian(value.id)}>Kembalikan</button>
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

export default TableLoanBook
