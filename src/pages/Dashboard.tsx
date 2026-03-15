import { Button } from "@/components/ui/button";
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
      <div className="flex gap-4">
        <Button className="bg-violet-600">
          <button onClick={handleUpgrade}>Upgrade</button>
        </Button>

        <Button className="bg-violet-600">
          <button onClick={handleFirstSync}>First Sync</button>
        </Button>
      </div>
    </>
  );
}
