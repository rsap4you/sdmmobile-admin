"use client";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ShowToast from "../Common/ShowToast";
import { apiPatch } from "@/utils/endpoints/common";
import { API_REPAIRS } from "@/utils/api/APIConstant";
import { STATUSES, fmtDate } from "@/utils/constance";

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="d-flex py-1">
    <div className="text-muted" style={{ width: 120, flexShrink: 0 }}>
      {label}
    </div>
    <div style={{ wordBreak: "break-word" }}>{children || "-"}</div>
  </div>
);

export default function Details({ repair, onClose, onSaved }: any) {
  const [status, setStatus] = useState<string>(repair.status);
  const [estimate, setEstimate] = useState<string>(repair.estimate ? String(repair.estimate) : "");
  const [adminNote, setAdminNote] = useState<string>(repair.adminNote || "");
  const [busy, setBusy] = useState(false);

  const a = repair.address || {};
  const address = [a.line1, a.line2, a.landmark, a.city, a.pincode].filter(Boolean).join(", ");
  const wa = (repair.whatsapp || repair.phone || "").replace(/\D/g, "");
  const images: string[] = repair.images || [];

  const save = async () => {
    setBusy(true);
    const res = await apiPatch(`${API_REPAIRS}/${repair._id}`, {
      status,
      estimate: estimate === "" ? 0 : Number(estimate),
      adminNote,
    });
    setBusy(false);
    if (res) {
      ShowToast("Repair updated", "success");
      onSaved();
    }
  };

  return (
    <Modal show onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          {repair.ticket}
          <span className="text-muted fs-6 ms-2">{fmtDate(repair.createdAt)}</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <h6 className="mb-2">Customer</h6>
            <Row label="Name">{repair.name}</Row>
            <Row label="Phone">
              <a href={`tel:${repair.phone}`}>{repair.phone}</a>
            </Row>
            <Row label="WhatsApp">
              {wa && (
                <a href={`https://wa.me/${wa.length === 10 ? "91" + wa : wa}`} target="_blank" rel="noreferrer">
                  Open chat
                </a>
              )}
            </Row>
            <Row label="Email">
              {repair.email && <a href={`mailto:${repair.email}`}>{repair.email}</a>}
            </Row>
          </div>

          <div className="col-md-6">
            <h6 className="mb-2">Device</h6>
            <Row label="Brand">{repair.brand}</Row>
            <Row label="Company">{repair.company}</Row>
            <Row label="Model">{repair.model}</Row>
            <Row label="IMEI">{repair.imei}</Row>
            <Row label="Issue">{repair.issue}</Row>
            <Row label="Notes">{repair.notes}</Row>
          </div>
        </div>

        <hr />
        <h6 className="mb-2">Handover</h6>
        <Row label="Method">{repair.pickup === "walkin" ? "Customer brings it to the shop" : "Pickup from address"}</Row>
        {repair.pickup !== "walkin" && (
          <>
            <Row label="Address">{address}</Row>
            <Row label="GPS">
              {repair.mapUrl && (
                <a href={repair.mapUrl} target="_blank" rel="noreferrer">
                  Open in Google Maps
                  {repair.location?.accuracy ? ` (±${repair.location.accuracy} m)` : ""}
                </a>
              )}
            </Row>
          </>
        )}

        {images.length > 0 && (
          <>
            <hr />
            <h6 className="mb-2">Photos ({images.length})</h6>
            <div className="d-flex flex-wrap gap-2">
              {images.map((src) => (
                <a key={src} href={src} target="_blank" rel="noreferrer">
                  <img
                    src={src}
                    alt="phone"
                    style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 8 }}
                  />
                </a>
              ))}
            </div>
          </>
        )}

        <hr />
        <h6 className="mb-3">Update</h6>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Estimate (₹)</label>
            <input
              type="number"
              min={0}
              className="form-control"
              value={estimate}
              onChange={(e) => setEstimate(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Admin note (private, not shown to customer)</label>
            <textarea
              rows={3}
              className="form-control"
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-light" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={save} disabled={busy}>
          {busy ? "Saving..." : "Save changes"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
