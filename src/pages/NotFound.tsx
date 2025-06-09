import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const NotFound = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">404</h1>
				<p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
				<Button className="p-5 m-10">
					<Link to="/">Return to Home</Link>
				</Button>

				<img src="/fallback-backdrop.gif" alt="404" />
			</div>
		</div>
	);
};

export default NotFound;
