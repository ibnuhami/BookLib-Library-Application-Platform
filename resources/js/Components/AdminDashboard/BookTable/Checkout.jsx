import React from 'react'
import { router } from '@inertiajs/react'

function Checkout(props) {
    const data = props.data

    const submitPembatalan = (id) => {
        console.log("Data : ", id)
        const url = route('pembatalanpinjam', id)
        router.delete(url)
    }

    const submitKonfirmasi = (id) => {
        const url = route('konfirmasipinjam', id)
        router.post(url)
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className='text-gray-800'>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Peminjam</th>
                            <th rowSpan="2" className='text-center'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data.map((value, i) => (
                                <tr key={i + 3294823}>
                                    <th> {i + 1} </th>
                                    <td>{value.title}</td>
                                    <td>{value.author}</td>
                                    <td>{value.isbn}</td>
                                    <td>{value.peminjam}</td>
                                    <td className='text-center'>
                                        <button type='submit' className='btn btn-sm mx-1 btn-error text-white' onClick={() => submitPembatalan(value.id)}>
                                            Cancel
                                        </button>
                                        <button type='submit' className='btn btn-sm mx-1 btn-primary text-white' onClick={() => submitKonfirmasi(value.id)}>
                                            Confirm
                                        </button>
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

export default Checkout
