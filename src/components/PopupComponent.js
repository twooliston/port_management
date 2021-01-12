import React from "react";

const POPUP_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 10,
  border: "1px solid",
};

const POPUP_TEXT_STYLES = {
  textAlign: "left",
};

const POPUP_BTN_STYLES = {
  fontSize: "15px",
  border: "1px solid",
  padding: "10px",
  marginTop: "30px",
};

export default function PopupComponent({ isOpen, children, onClose }) {
  if (!isOpen) return null;
  return (
    <div style={POPUP_STYLES}>
      <div style={POPUP_TEXT_STYLES}>{children}</div>
      <button style={POPUP_BTN_STYLES} onClick={onClose}>
        close
      </button>
    </div>
  );
}
