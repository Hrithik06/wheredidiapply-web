export default function Dashboard() {
  const handleUpgrade = () => {
    window.location.href = "http://localhost:4000/api/auth/google/upgrade";
  };
  return (
    <>
      {" "}
      <div>
        <button onClick={handleUpgrade}>Upgrade</button>
      </div>
    </>
  );
}
