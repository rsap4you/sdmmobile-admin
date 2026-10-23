"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Box, Chip, IconButton, MenuItem, Select, Tooltip, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import type { GridColDef } from "@mui/x-data-grid";
import Breadcrumb from "../Layouts/Breadcrumb";
import DataTable from "../DataTable/DataTable";
import SearchData from "../DataTable/SearchData";
import ShowToast from "../Common/ShowToast";
import Details from "./Details";
import { apiGet, apiPatch, apiDelete } from "@/utils/endpoints/common";
import { API_REPAIRS } from "@/utils/api/APIConstant";
import { STATUSES, STATUS_COLOR, fmtDate, inr } from "@/utils/constance";

const breadcrumbData = [
  { name: "Home", link: "/dashboard" },
  { name: "Repairs", link: "#" },
];

const Repairs = () => {
  const params = useSearchParams();
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(params.get("status") || "");
  const [selected, setSelected] = useState<any>(null);

  // debounce the search box
  useEffect(() => {
    const t = setTimeout(() => setSearch(q.trim()), 400);
    return () => clearTimeout(t);
  }, [q]);

  const { data, isPending, refetch } = useQuery({
    queryKey: ["repairs", search, status],
    queryFn: () => apiGet(API_REPAIRS, { q: search || undefined, status: status || undefined }),
  });
  const rows = Array.isArray(data) ? data : [];

  const changeStatus = async (row: any, value: string) => {
    const res = await apiPatch(`${API_REPAIRS}/${row._id}`, { status: value });
    if (res) {
      ShowToast(`${row.ticket} → ${value}`, "success");
      refetch();
    }
  };

  const remove = async (row: any) => {
    if (!window.confirm(`Delete repair ${row.ticket}? This cannot be undone.`)) return;
    const res = await apiDelete(`${API_REPAIRS}/${row._id}`);
    if (res) {
      ShowToast("Repair deleted", "success");
      refetch();
    }
  };

  const columns: GridColDef[] = [
    {
      field: "ticket",
      headerName: "Ticket",
      width: 120,
      renderCell: (p) => <b>{p.value}</b>,
    },
    {
      field: "name",
      headerName: "Customer",
      minWidth: 180,
      flex: 1,
      renderCell: (p) => (
        <div style={{ lineHeight: 1.3 }}>
          {p.row.name}
          <div style={{ fontSize: 12, color: "#777" }}>{p.row.phone}</div>
        </div>
      ),
    },
    {
      field: "device",
      headerName: "Device",
      minWidth: 170,
      flex: 1,
      valueGetter: (_v, row: any) => `${row.brand || ""} ${row.model || ""}`.trim(),
    },
    { field: "issue", headerName: "Issue", minWidth: 170, flex: 1 },
    {
      field: "pickup",
      headerName: "Handover",
      width: 130,
      renderCell: (p) => (
        <div style={{ lineHeight: 1.3 }}>
          {p.value === "walkin" ? "Walk-in" : "Pickup"}
          {p.row.address?.pincode && (
            <div style={{ fontSize: 12, color: "#777" }}>{p.row.address.pincode}</div>
          )}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 190,
      sortable: false,
      renderCell: (p) => (
        <Select
          size="small"
          value={p.value}
          onChange={(e) => changeStatus(p.row, e.target.value as string)}
          sx={{ fontSize: 13, minWidth: 160 }}
        >
          {STATUSES.map((s) => (
            <MenuItem key={s} value={s}>
              <Chip size="small" label={s} color={STATUS_COLOR[s]} />
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "estimate",
      headerName: "Estimate",
      width: 110,
      valueFormatter: (v: number) => inr(v),
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 170,
      valueFormatter: (v: string) => fmtDate(v),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: (p) => (
        <>
          <Tooltip title="View / edit">
            <IconButton color="primary" onClick={() => setSelected(p.row)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => remove(p.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb data={breadcrumbData} />
      <Box sx={{ width: "100%", marginBottom: "20px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={2}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Repairs
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            <select
              className="form-select"
              style={{ width: 190 }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <SearchData handleSearch={setQ} />
          </Box>
        </Box>
        <p className="text-muted small mb-2">
          Search by ticket, name, phone, email, model, IMEI or pincode. Shows the latest 200.
        </p>

        <DataTable isLoading={isPending} rowData={rows} columns={columns} />
      </Box>

      {selected && (
        <Details
          repair={selected}
          onClose={() => setSelected(null)}
          onSaved={() => {
            setSelected(null);
            refetch();
          }}
        />
      )}
    </>
  );
};

export default Repairs;
