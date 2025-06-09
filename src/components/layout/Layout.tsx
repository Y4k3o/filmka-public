import { useMobile } from "@/shared/hooks/useMobile";
import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileHeader } from "./MobileHeader";
import { MobileSearch } from "./MobileSearch";

export const Layout = ({ children }: { children: ReactNode }) => {
	const isMobile = useMobile();
	return (
		<div className="min-h-screen flex flex-col relative">
			{isMobile ? <MobileSearch /> : <Header />}
			<main className="min-h-screen">{children}</main>
			<Footer />
			{isMobile && <MobileHeader />}
		</div>
	);
};
