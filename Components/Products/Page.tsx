"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, IconButton, Switch, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { GridColDef } from "@mui/x-data-grid";
import Breadcrumb from "../Layouts/Breadcrumb";
import DataTable from "../DataTable/DataTable";
import SearchData from "../DataTable/SearchData";
import ShowToast from "../Common/ShowToast";
import Add from "./Add";
import { apiGet, apiPatch, apiDelete } from "@/utils/endpoints/common";
import { API_PRODUCTS } from "@/utils/api/APIConstant";
import { fmtDate, inr } from "@/utils/constance";

const breadcrumbData = [
  { name: "Home", link: "/dashboard" },
  { name: "Products", link: "#" },
];

const Products = () => {
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);

  // The backend returns all products; search is done here in the browser
  const { data, isPending, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiGet(API_PRODUCTS),
  });
  const all: any[] = Array.isArray(data) ? data : [];
  const text = q.trim().toLowerCase();
  const rows = text
    ? all.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(text))
    : all;

  const toggleStock = async (row: any, inStock: boolean) => {
    const res = await apiPatch(`${API_PRODUCTS}/${row._id}`, { inStock });
    if (res) {
      ShowToast(`${row.name}: ${inStock ? "in stock" : "out of stock"}`, "success");
      refetch();
    }
  };

  const remove = async (row: any) => {
    if (!window.confirm(`Delete "${row.name}"? This cannot be undone.`)) return;
    const res = await apiDelete(`${API_PRODUCTS}/${row._id}`);
    if (res) {
      ShowToast("Product deleted", "success");
      refetch();
    }
  };

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 90,
      sortable: false,
      renderCell: (p) =>
        p.value ? (
          <img src={p.value} alt={p.row.name} style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }} />
        ) : (
          <span style={{ color: "#aaa" }}>-</span>
        ),
    },
    { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
    { field: "category", headerName: "Category", minWidth: 140, flex: 0.6 },
    { field: "price", headerName: "Price", width: 110, valueFormatter: (v: number) => inr(v) },
    {
      field: "inStock",
      headerName: "In stock",
      width: 110,
      sortable: false,
      renderCell: (p) => (
        <Switch checked={!!p.value} onChange={(e) => toggleStock(p.row, e.target.checked)} />
      ),
    },
    { field: "createdAt", headerName: "Added", width: 170, valueFormatter: (v: string) => fmtDate(v) },
    {
      field: "actions",
      headerName: "Actions",
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (p) => (
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => remove(p.row)}>
            <DeleteIcon />
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
            Products
          </Typography>
          <SearchData handleSearch={setQ} handleAdd={setAdding} isAdd addLabel="Add product" />
        </Box>
        <DataTable isLoading={isPending} rowData={rows} columns={columns} />
      </Box>

      {adding && (
        <Add
          onClose={() => setAdding(false)}
          onSaved={() => {
            setAdding(false);
            refetch();
          }}
        />
      )}
    </>
  );
};

export default Products;
