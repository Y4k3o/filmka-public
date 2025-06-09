import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { queryClient } from "../shared/api/queryClient";
import { App } from "./App";
import "./style.css";

createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<App />
		<Toaster
			position="bottom-right"
			theme="dark"
			toastOptions={{
				className: "rounded shadow-lg p-4 border border-border",
				classNames: {
					success: "bg-green-600 text-white",
					error: "bg-red-600 text-white",
					info: "bg-blue-600 text-white",
					warning: "bg-yellow-600 text-black",
				},
			}}
		/>
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
);
