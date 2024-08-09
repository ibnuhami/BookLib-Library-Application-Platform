import React from 'react'

function Reserved({ data }) {
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
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </>
    )
}

export default Reserved
