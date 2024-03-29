import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

const EditPage = (props) => {
    console.log(props)
    const data = props.data
    const { data: dataEdit, setData, post, reset, processing } = useForm({
        id: data.id,
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        peminjam: data.peminjam
    })

    const submit = (event, id) => {
        event.preventDefault()
        post(route('updatebuku', id), {
            onSuccess: () => {
                reset()
            }
        })
    }

    return (
        <AuthenticatedLayout
            user={data}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Data</h2>}
        >
            <div className="bg-white mt-4 overflow-hidden shadow-sm sm:rounded-lg">
                {/* Kode di dalam Card */}
                <div className="p-6 text-gray-900">
                    <form method='post' onSubmit={event => submit(event, dataEdit.id)}>
                        <input type="hidden" name="peminjam" value={dataEdit.peminjam} />

                        <label className="input input-bordered flex items-center gap-2 bg-white my-3">
                            Title Buku
                            <input type="text" className="grow" placeholder="Judul Buku" value={dataEdit.title} onChange={e => setData('title', e.target.value)} name='title' />
                        </label>

                        <label className="input input-bordered flex items-center gap-2 bg-white my-3">
                            Author
                            <input type="text" className="grow" placeholder="Author Buku" value={dataEdit.author} onChange={e => setData('author', e.target.value)} name='author' />
                        </label>

                        <label className="input input-bordered flex items-center gap-2 bg-white my-3">
                            ISBN
                            <input type="text" className="grow" placeholder="ISBN buku" value={dataEdit.isbn} onChange={e => setData('isbn', e.target.value)} name='isbn' />
                        </label>

                        <button type="submit" className="btn bg-gray-800 text-white my-4 mx-1 hover:text-gray-800 hover:bg-white" disabled={processing}>Submit</button>
                    </form>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default EditPage
