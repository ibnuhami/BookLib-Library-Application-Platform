import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import Table from "@/Components/Table";

function Admin(props) {
    const [isAlert, setIsAlert] = useState(false);
    const [data, setData] = useState([])
    const flashMessage = props.flash.message;
    const user = props.auth.user;

    console.log(props)

    useEffect(() => {
        HandleAlert(flashMessage);
    }, []);

    const HandleAlert = (value) => {
        if (value) {
            setIsAlert(true);
            setTimeout(() => {
                setIsAlert(false);
            }, 2000);
        }
    };

    const getBookAvailable = async (e) => {
        e.preventDefault()
        const response = await axios.get(route('book.available'))
        setData(response)
    }

    const getBookCheckout = async (e) => {
        e.preventDefault()
        const response = await axios.get(route('book.checkout'))
        setData(response)
    }

    const getBookReserved = async (e) => {
        e.preventDefault()
        const response = await axios.get(route('book.reserved'))
        setData(response)
    }

    const getBookLost = async (e) => {
        e.preventDefault()
        const response = await axios.get(route('book.lost'))
        setData(response)
    }

    return (
        <>
            <AuthenticatedLayout
                user={user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard" />
                {isAlert && (
                    <div
                        role="alert"
                        className="alert alert-success text-white w-96 toast toast-center toast-top"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{flashMessage}</span>
                    </div>
                )}

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="grid grid-rows-2 h-32">
                            <div className="grid grid-cols-4 gap-4">
                                <button className="btn bg-slate-800 text-white" onClick={(event) => getBookAvailable(event)}>Book Available</button>
                                <button className="btn bg-slate-800 text-white" onClick={(event) => getBookCheckout(event)}>Book Checkout</button>
                                <button className="btn bg-slate-800 text-white" onClick={(event) => getBookReserved(event)}>Book Reserved</button>
                                <button className="btn bg-slate-800 text-white" onClick={(event) => getBookLost(event)}>Book Lost</button>
                            </div>

                            <div className="grid grid-cols-3">
                                <div className="card col-span-1">tes</div>
                                <div className="result col-span-2">
                                    <Table data={data} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}

export default Admin;
