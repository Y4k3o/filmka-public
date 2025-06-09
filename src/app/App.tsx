import { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router";
import Loading from "../components/Loading";
import { renderRoutes } from "./router/renderRoutes";
import { routes } from "./router/routes";

export const App = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Loading />}>
				<Routes>{renderRoutes(routes)}</Routes>
			</Suspense>
		</BrowserRouter>
	);
};
