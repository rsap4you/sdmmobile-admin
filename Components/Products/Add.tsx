"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import ShowToast from "../Common/ShowToast";
import { apiPostForm } from "@/utils/endpoints/common";
import { API_PRODUCTS } from "@/utils/api/APIConstant";

const MAX_BYTES = 3 * 1024 * 1024; // backend limit for product images
const OK_TYPE = /^image\/(jpeg|png|webp)$/;

export default function Add({ onClose, onSaved }: any) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const preview = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!OK_TYPE.test(f.type)) return setError("Only JPG, PNG or WebP images are allowed.");
    if (f.size > MAX_BYTES) return setError("Image must be under 3 MB.");
    setFile(f);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Enter the product name.");
    if (price === "" || Number(price) < 0) return setError("Enter a valid price.");

    const fd = new FormData();
    fd.append("name", name.trim());
    fd.append("price", price);
    fd.append("category", category.trim());
    if (file) fd.append("image", file);

    setBusy(true);
    const res = await apiPostForm(API_PRODUCTS, fd);
    setBusy(false);
    if (res) {
      ShowToast("Product added", "success");
      onSaved();
    }
  };

  return (
    <Modal show onHide={onClose} centered>
      <form onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title>Add product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="row g-3 mb-3">
            <div className="col-6">
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                min={0}
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="col-6">
              <label className="form-label">Category</label>
              <input
                className="form-control"
                placeholder="e.g. Charger"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="form-label">Image (optional, max 3 MB)</label>
            <input type="file" className="form-control" accept="image/jpeg,image/png,image/webp" onChange={pick} />
          </div>
          {preview && (
            <div className="d-flex align-items-center gap-3 mt-2">
              <img src={preview} alt="" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} />
              <button type="button" className="btn btn-sm btn-light" onClick={() => setFile(null)}>
                Remove
              </button>
            </div>
          )}
          {error && <div className="alert alert-danger py-2 mt-3 mb-0">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-light" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={busy}>
            {busy ? "Saving..." : "Add product"}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
