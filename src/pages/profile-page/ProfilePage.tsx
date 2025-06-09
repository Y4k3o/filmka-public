import { useAuthUser } from "@/shared/api/useAuthUser";
import { useEffect } from "react";
import { useParams } from "react-router";
import { ProfileContent } from "./ProfileContent";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileSidePanel } from "./ProfileSidePanel";
import { useProfileStore } from "./useProfileStore";
import { usePublicUserProfile } from "./usePublicUserProfile";

const ProfilePage = () => {
	const { uid } = useParams();
	const { data: currentUser } = useAuthUser();
	const { data: user, isPending } = usePublicUserProfile(uid);
	const { setIsOwner } = useProfileStore();

	useEffect(() => {
		setIsOwner(currentUser?.uid === uid);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uid, currentUser?.uid]);

	if (!user && !isPending) return <div className="text-center text-4xl p-50">Пользователь не найден</div>;

	return (
		<div className="container min-h-scree mb-5">
			<ProfileHeader user={user} />
			<div className="mt-5 relative flex gap-5 justify-between">
				<ProfileSidePanel />
				<ProfileContent uid={uid} />
			</div>
		</div>
	);
};
export default ProfilePage;
