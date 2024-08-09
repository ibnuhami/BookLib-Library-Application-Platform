import React from 'react'

function ConfirmationReturned({ data }) {
    const submitKonfirmasi = (id) => {
        const url = route('konfirmasipengembalian', id)
        axios.post(url)
            .then(res => {
                window.location.reload(true)
            })
            .catch(err => {
                console.log('Error : ', err)
            })
    }

    // Code yang akan tampil di website
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
                                    <td>{value.peminjam}</td>
                                    <td>
                                        <button type='submit' onClick={() => submitKonfirmasi(value.id)}>
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

export default ConfirmationReturned
