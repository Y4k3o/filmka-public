import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router";
import Loading from "../../components/Loading";
import { useAuthUser } from "../../shared/api/useAuthUser";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { data: user, isPending } = useAuthUser();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isPending) return <Loading />;
	if (!user) return <Navigate to="/login" replace />;
	return <>{children}</>;
};

export const GuestRoute = ({ children }: { children: React.ReactNode }) => {
	const { data: user, isPending } = useAuthUser();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isPending) return <Loading />;
	if (user) return <Navigate to="/" replace />;
	return <>{children}</>;
};
