export default function Modal({open, onClose,title, children}) {
    if (!open) return null;

    return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || "Modal"}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: "rgba(0,0,0,0.5)",
        padding: "1rem",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(520px, 100%)",
          background: "white",
          borderRadius: "12px",
          padding: "1rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
          {title ? <h2 style={{ margin: 0 }}>{title}</h2> : <span />}
          <button type="button" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div style={{ marginTop: "1rem" }}>{children}</div>
      </div>
    </div>
  );
}