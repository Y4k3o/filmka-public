import { Image } from "@/components/Image";
import { Button } from "@/components/ui/button";

import { UserData } from "@/shared/types/user";
import { Link } from "react-router";
import { useProfileStore } from "./useProfileStore";

type Props = {
	user: UserData | undefined;
};

export const ProfileHeader = ({ user }: Props) => {
	const { isOwner } = useProfileStore();
	return (
		<div className="flex justify-between p-5 items-center border border-border rounded-xl mt-5 bg-background shadow-sm">
			<div className="flex items-center gap-5">
				<Image className="w-20 h-20 rounded object-cover border border-border" fallback="/fallback-avatar.jpg" src={user?.avatarUrl} alt="avatar" />
				<div className="space-y-1">
					<div className="text-xl font-semibold">{user?.displayName}</div>
					{user?.about && <div className="text-sm text-muted-foreground">{user.about}</div>}
				</div>
			</div>
			{isOwner && (
				<Link to="settings">
					<Button variant="outline" className="h-10 rounded-xl">
						Настройки
					</Button>
				</Link>
			)}
		</div>
	);
};
