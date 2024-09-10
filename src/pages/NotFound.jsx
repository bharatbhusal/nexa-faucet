import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<FiAlertTriangle className="text-red-500 text-6xl mb-4" />
			<h1 className="text-4xl font-bold text-gray-800 mb-4">
				404 - Page Not Found
			</h1>
			<p className="text-lg text-gray-600 mb-6">
				Oops! The page you're looking for doesn't exist.
			</p>
			<Link
				to="/"
				className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
			>
				Go Back to Home
			</Link>
		</div>
	);
};

export default NotFound;
