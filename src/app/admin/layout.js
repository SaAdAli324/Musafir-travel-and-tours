import "./admin-globals.css";

export const metadata = {
  title: "Admin Dashboard - Musafir",
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", position: "relative", zIndex: 1000 }}>
      {/* Simple Admin Header */}
      <header style={{ background: "#0f172a", color: "white", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "bold" }}>Musafir Admin Panel</h1>
        <a href="/" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>← Back to Main Site</a>
      </header>
      <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        {children}
      </main>
    </div>
  );
}
