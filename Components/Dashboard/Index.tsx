"use client";
import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Chip } from "@mui/material";
import { MdBuild, MdToday, MdOutlineShoppingBag, MdPendingActions } from "react-icons/md";
import Breadcrumb from "../Layouts/Breadcrumb";
import { apiGet } from "@/utils/endpoints/common";
import { API_DASHBOARD, API_REPAIRS } from "@/utils/api/APIConstant";
import { STATUSES, STATUS_COLOR, fmtDate } from "@/utils/constance";

const breadcrumbData = [
  { name: "Home", link: "/dashboard" },
  { name: "Dashboard", link: "/dashboard" },
];

const StatCard = ({ title, value, Icon, tone }: any) => (
  <div className="col-md-6 col-xxl-3">
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0">
            <div className={`avtar avtar-s bg-light-${tone}`}>
              <Icon size={22} />
            </div>
          </div>
          <div className="flex-grow-1 ms-3">
            <h6 className="mb-0">{title}</h6>
          </div>
        </div>
        <h3 className="mt-3 mb-0">{value ?? "-"}</h3>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { data } = useQuery({ queryKey: ["dashboard"], queryFn: () => apiGet(API_DASHBOARD) });
  const { data: repairs } = useQuery({
    queryKey: ["dashboard-latest"],
    queryFn: () => apiGet(API_REPAIRS),
  });

  const by: Record<string, number> = data?.byStatus || {};
  const total = Object.values(by).reduce((a: number, b: any) => a + Number(b || 0), 0);
  const open = total - Number(by["delivered"] || 0);
  const latest = (Array.isArray(repairs) ? repairs : []).slice(0, 5);

  return (
    <>
      <Breadcrumb data={breadcrumbData} />

      <div className="row">
        <StatCard title="Repairs today" value={data?.today} Icon={MdToday} tone="primary" />
        <StatCard title="Open repairs" value={data ? open : undefined} Icon={MdPendingActions} tone="warning" />
        <StatCard title="Total repairs" value={data ? total : undefined} Icon={MdBuild} tone="success" />
        <StatCard title="Products" value={data?.products} Icon={MdOutlineShoppingBag} tone="info" />
      </div>

      <div className="row">
        <div className="col-12">
          <h5 className="mb-3">Repairs by status</h5>
        </div>
        {STATUSES.map((s) => (
          <div className="col-6 col-md-4 col-xxl" key={s}>
            <Link href={`/repairs?status=${encodeURIComponent(s)}`} className="text-decoration-none">
              <div className="card">
                <div className="card-body">
                  <p className="text-muted mb-1 text-capitalize">{s}</p>
                  <h3 className="mb-0">{by[s] ?? 0}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Latest repairs</h5>
          <Link href="/repairs">View all</Link>
        </div>
        <div className="card-body table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Customer</th>
                <th>Device</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {latest.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No repairs yet
                  </td>
                </tr>
              )}
              {latest.map((r: any) => (
                <tr key={r._id}>
                  <td className="fw-bold">{r.ticket}</td>
                  <td>
                    {r.name}
                    <div className="small text-muted">{r.phone}</div>
                  </td>
                  <td>
                    {r.brand} {r.model}
                  </td>
                  <td>
                    <Chip size="small" label={r.status} color={STATUS_COLOR[r.status] || "default"} />
                  </td>
                  <td>{fmtDate(r.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
