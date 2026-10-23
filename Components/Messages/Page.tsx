"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import type { GridColDef } from "@mui/x-data-grid";
import Breadcrumb from "../Layouts/Breadcrumb";
import DataTable from "../DataTable/DataTable";
import SearchData from "../DataTable/SearchData";
import ShowToast from "../Common/ShowToast";
import { apiGet, apiDelete } from "@/utils/endpoints/common";
import { API_MESSAGES } from "@/utils/api/APIConstant";
import { fmtDate } from "@/utils/constance";

const breadcrumbData = [
  { name: "Home", link: "/dashboard" },
  { name: "Messages", link: "#" },
];

const Messages = () => {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<any>(null);

  const { data, isPending, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: () => apiGet(API_MESSAGES),
  });
  const all: any[] = Array.isArray(data) ? data : [];
  const text = q.trim().toLowerCase();
  const rows = text
    ? all.filter((m) => `${m.name} ${m.email} ${m.phone} ${m.message}`.toLowerCase().includes(text))
    : all;

  const remove = async (row: any) => {
    if (!window.confirm(`Delete the message from ${row.name}?`)) return;
    const res = await apiDelete(`${API_MESSAGES}/${row._id}`);
    if (res) {
      ShowToast("Message deleted", "success");
      setSelected(null);
      refetch();
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.6 },
    {
      field: "contact",
      headerName: "Contact",
      minWidth: 200,
      flex: 0.8,
      valueGetter: (_v, row: any) => [row.email, row.phone].filter(Boolean).join(" · "),
    },
    { field: "message", headerName: "Message", minWidth: 260, flex: 1.4 },
    { field: "createdAt", headerName: "Received", width: 170, valueFormatter: (v: string) => fmtDate(v) },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: (p) => (
        <>
          <Tooltip title="Read">
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

  const phone = (selected?.phone || "").replace(/\D/g, "");

  return (
    <>
      <Breadcrumb data={breadcrumbData} />
      <Box sx={{ width: "100%", marginBottom: "20px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={2}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Contact messages
          </Typography>
          <SearchData handleSearch={setQ} />
        </Box>
        <DataTable isLoading={isPending} rowData={rows} columns={columns} />
      </Box>

      {selected && (
        <Modal show onHide={() => setSelected(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selected.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted small">{fmtDate(selected.createdAt)}</p>
            <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{selected.message}</p>
            <div className="d-flex flex-wrap gap-2">
              {selected.email && (
                <a className="btn btn-sm btn-outline-primary" href={`mailto:${selected.email}`}>
                  Email {selected.email}
                </a>
              )}
              {phone && (
                <>
                  <a className="btn btn-sm btn-outline-primary" href={`tel:${phone}`}>
                    Call {selected.phone}
                  </a>
                  <a
                    className="btn btn-sm btn-outline-success"
                    href={`https://wa.me/${phone.length === 10 ? "91" + phone : phone}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={() => remove(selected)}>
              Delete
            </button>
            <button className="btn btn-light" onClick={() => setSelected(null)}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Messages;
