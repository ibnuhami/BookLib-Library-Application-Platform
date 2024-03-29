import { Link } from '@inertiajs/react'
import React from 'react'

const Paginator = ({ data }) => {
    const current = data.meta.current_page
    const next = data.links.next
    const prev = data.links.prev
    return (
        <>
            <div className="join mt-4 flex flex-center justify-center">
                {prev && <Link href={prev} as='button' className="join-item btn btn-outline text-slate-800 hover:bg-slate-800 hover:text-white">«</Link>}
                <Link className="join-item btn btn-outline text-slate-800 hover:bg-slate-800 hover:text-white">Page {current}</Link>
                {next && <Link href={next} as='button' className="join-item btn btn-outline text-slate-800 hover:bg-slate-800 hover:text-white">»</Link>}
            </div>
        </>
    )
}

export default Paginator
