import { Link } from '@inertiajs/react'
import React from 'react'

function TableBukuTersedia({ data }) {
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
                            <th>Action</th>
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
                                    <td>
                                        <Link as='button' type='button' href={route('editbuku')} data={{ id: value.id }} method='get'>Edit</Link> | <Link type='button' as='button' href={route('deletebuku')} data={{ id: value.id }} method='delete' >Delete</Link>
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

export default TableBukuTersedia
