import { Link } from "react-router-dom";

const nav = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/map", label: "Map" },
  { to: "/profile", label: "Profile" }
];

export function BottomNav() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-around", padding: 12, borderTop: "1px solid #ddd", marginTop: 16 }}>
      {nav.map((item) => (
        <Link key={item.to} to={item.to}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
