import { http } from "../services/http";

export default function Dashboard() {
  const handleUpgrade = () => {
    window.location.href = "http://localhost:4000/api/auth/google/upgrade";
  };
  const handleFirstSync = () => {
    http.get("/applications/first-sync");
  };
  return (
    <>
      <div>
        <button onClick={handleUpgrade}>Upgrade</button>
        <button onClick={handleFirstSync}>First Sync</button>
      </div>
    </>
  );
}
