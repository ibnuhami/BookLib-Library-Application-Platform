import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

import TableLoanBook from "@/Components/UserDashboard/TableLoanBook";
import Table from "@/Components/Table";

export default function User(props) {
    const auth = props.auth.user;
    const book_available = props.book_available;

    return (
        <>
            <AuthenticatedLayout
                user={auth}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Link
                            href={route("book.page")}
                            method="get"
                            as="button"
                            type="button"
                            className="btn bg-white text-slate-800 hover:bg-slate-800 hover:text-white"
                        >
                            Daftar Buku
                        </Link>
                        <div className="mt-4">
                            <Table data={book_available} />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
