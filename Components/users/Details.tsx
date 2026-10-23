"use client";
import React from "react";
import { Modal } from "react-bootstrap";
import { fmtDate } from "@/utils/constance";

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="d-flex py-1">
    <div className="text-muted" style={{ width: 120, flexShrink: 0 }}>
      {label}
    </div>
    <div style={{ wordBreak: "break-word" }}>{children || "-"}</div>
  </div>
);

export default function Details({ user, onClose }: any) {
  const a = user.address || {};
  const address = [a.line1, a.line2, a.landmark, a.city, a.pincode].filter(Boolean).join(", ");
  const wa = (user.phone || "").replace(/\D/g, "");

  return (
    <Modal show onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          {user.name}
          {user.createdAt && (
            <span className="text-muted fs-6 ms-2">Joined {fmtDate(user.createdAt)}</span>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <h6 className="mb-2">Contact</h6>
            <Row label="Name">{user.name}</Row>
            <Row label="Phone">
              {user.phone && <a href={`tel:${user.phone}`}>{user.phone}</a>}
            </Row>
            <Row label="WhatsApp">
              {wa && (
                <a href={`https://wa.me/${wa.length === 10 ? "91" + wa : wa}`} target="_blank" rel="noreferrer">
                  Open chat
                </a>
              )}
            </Row>
            <Row label="Email">
              {user.email && <a href={`mailto:${user.email}`}>{user.email}</a>}
            </Row>
          </div>

          <div className="col-md-6">
            <h6 className="mb-2">Address</h6>
            <Row label="Line 1">{a.line1}</Row>
            <Row label="Line 2">{a.line2}</Row>
            <Row label="Landmark">{a.landmark}</Row>
            <Row label="City">{a.city}</Row>
            <Row label="Pincode">{a.pincode}</Row>
            <Row label="Full">{address}</Row>
          </div>
        </div>

        {user.profileImage && (
          <>
            <hr />
            <h6 className="mb-2">Profile photo</h6>
            <a href={user.profileImage} target="_blank" rel="noreferrer">
              <img
                src={user.profileImage}
                alt="profile"
                style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 8 }}
              />
            </a>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-light" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}