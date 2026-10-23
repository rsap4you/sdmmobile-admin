"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

export default function DataTable({ isLoading, rowData, columns, height = 640 }: any) {
  return (
    <Paper elevation={3} sx={{ height, width: "100%" }}>
      <DataGrid
        rows={rowData || []}
        columns={columns}
        getRowId={(r: any) => r._id ?? r.id}
        loading={isLoading}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        sx={{
          "& .MuiDataGrid-columnHeader": { backgroundColor: "#e0e0e0", color: "#424242" },
          "& .MuiDataGrid-cell": { display: "flex", alignItems: "center" },
        }}
      />
    </Paper>
  );
}
