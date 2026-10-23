"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { GridColDef } from "@mui/x-data-grid";
import Breadcrumb from "../Layouts/Breadcrumb";
import DataTable from "../DataTable/DataTable";
import SearchData from "../DataTable/SearchData";
import Details from "./Details";
import { apiGet } from "@/utils/endpoints/common";
import { API_USERS } from "@/utils/api/APIConstant";
import { fmtDate } from "@/utils/constance";

const breadcrumbData = [
  { name: "Home", link: "/dashboard" },
  { name: "Users", link: "#" },
];

const Users = () => {
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);

  // debounce the search box
  useEffect(() => {
    const t = setTimeout(() => setSearch(q.trim()), 400);
    return () => clearTimeout(t);
  }, [q]);

  const { data, isPending } = useQuery({
    queryKey: ["users", search],
    queryFn: () => apiGet(API_USERS, { q: search || undefined }),
  });

  const rows = Array.isArray(data?.users) ? data.users : [];
  const total = typeof data?.total === "number" ? data.total : 0;

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
      renderCell: (p) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar src={p.row.profileImage || undefined} sx={{ width: 32, height: 32 }}>
            {(p.row.name || "?").charAt(0).toUpperCase()}
          </Avatar>
          <b>{p.row.name}</b>
        </Box>
      ),
    },
    { field: "email", headerName: "Email", minWidth: 220, flex: 1 },
    { field: "phone", headerName: "Phone", width: 140 },
    {
      field: "address",
      headerName: "Address",
      minWidth: 260,
      flex: 1.5,
      valueGetter: (_v, row: any) => {
        const a = row.address || {};
        return [a.line1, a.line2, a.landmark, a.city, a.pincode].filter(Boolean).join(", ");
      },
    },
    {
      field: "createdAt",
      headerName: "Joined",
      width: 170,
      valueFormatter: (v: string) => (v ? fmtDate(v) : "-"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (p) => (
        <Tooltip title="View details">
          <IconButton color="primary" onClick={() => setSelected(p.row)}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb data={breadcrumbData} />
      <Box sx={{ width: "100%", marginBottom: "20px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={2}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Users <span className="text-muted fs-6">(Total: {total})</span>
          </Typography>
          <SearchData handleSearch={setQ} />
        </Box>
        <p className="text-muted small mb-2">
          Search by name, email, phone or pincode. Shows the latest 200.
        </p>

        <DataTable isLoading={isPending} rowData={rows} columns={columns} />
      </Box>

      {selected && <Details user={selected} onClose={() => setSelected(null)} />}
    </>
  );
};

export default Users;