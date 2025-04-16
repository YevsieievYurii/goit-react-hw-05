import { useLocation, useNavigate } from "react-router-dom";

function MovieDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(location.state?.from || "/movies");
  };

  return (
    <div>
      <button onClick={handleGoBack}>← Go back</button>

      {/* Тут основна інформація про фільм і Outlet */}
    </div>
  );
}
