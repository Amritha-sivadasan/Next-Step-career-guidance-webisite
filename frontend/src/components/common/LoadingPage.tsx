import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoadingPage = () => {
  return (
    <div className="sweet-loading flex items-center justify-center min-h-screen">
      <ClipLoader
        color={"black"}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingPage;
