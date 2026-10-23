import React from 'react'
import Link from 'next/link'
interface BreadcrumbProps {
    data: { name: string, link: string }[]; 
}
const Breadcrumb = ({ data }: BreadcrumbProps) => {
    return (
        <div className="page-header">
            <div className="page-block">
                <div className="row align-items-center">
                    <div className="col-md-12">
                        <ul className="breadcrumb">
                            {data?.map((value: any, index: number) => (
                                <li className={`breadcrumb-item ${index === data.length - 1 ? 'active' : ''}`} key={index}>
                                    <Link href={value.link}>{value.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb