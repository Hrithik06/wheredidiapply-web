export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  return (
    <div>
      <button onClick={handleLogin}>Continue with Google</button>
    </div>
  );
}
