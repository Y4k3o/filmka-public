import { MediaType } from "@/shared/types/media";
import { Outlet, useLocation, useParams } from "react-router";

const MediaLayout = () => {
	const { id } = useParams<{ id: string }>();
	const location = useLocation();
	const mediaType: MediaType = location.pathname.includes("/series") ? "series" : "movie";

	return <Outlet context={{ id: Number(id), mediaType }} />;
};

export default MediaLayout;
