import { Layout } from "@/components/layout/Layout";
import { Route } from "react-router";
import { GuestRoute, ProtectedRoute } from "./RouteGuards";
import { RouteType } from "./routes";

export const renderRoutes = (routes: RouteType[]) => {
	return routes.map((route) => {
		let routeElement = <route.element />;

		if (route.isPrivate) {
			routeElement = <ProtectedRoute>{routeElement}</ProtectedRoute>;
		} else if (route.hideWhenAuth) {
			routeElement = <GuestRoute>{routeElement}</GuestRoute>;
		}

		if (route.useLayout) {
			routeElement = <Layout>{routeElement}</Layout>;
		}
		return (
			<Route key={route.path} path={route.path} element={routeElement}>
				{route.children && renderRoutes(route.children)}
			</Route>
		);
	});
};
