import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'

const ImportPage = (props) => {

    const { post, file, setData } = useForm({
        'file': null,
    })

    const [isAlert, setIsAlert] = useState(false)

    useEffect(() => {
        const data = Object.values(props.errors)
        if (data.length > 0) {
            setIsAlert(true)
            setInterval(() => {
                setIsAlert(false)
            }, 3000)
        }
    }, [props.errors])

    const submit = (e) => {
        e.preventDefault()
        post(route('importbuku'), file, {
            forceFormData: true,
        })
    }

    const alertError = (datas) => {
        const data = Object.values(datas)
        if (isAlert) {
            return (
                <div role="alert" className="alert alert-error text-white mx-auto w-5/6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg>
                    <div className="flex flex-col">
                        {data.map((value, i) => (
                            <span key={i}>{value}</span>
                        ))}
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Import Buku</h2>}
        >

            <div className="py-12 text-slate-800">
                {alertError(props.errors)}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white mt-4 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} method="post" encType='multipart/form-data'>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full max-w-sm bg-white"
                                    onChange={(e) => setData('file', e.target.files[0])}
                                />
                                <button className='btn bg-slate-800 ml-4 text-white hover:bg-white hover:text-slate-800'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default ImportPage
