import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-2">
        Oops! The page you are looking for doesn't exist.
      </p>
      <Link to="/" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
