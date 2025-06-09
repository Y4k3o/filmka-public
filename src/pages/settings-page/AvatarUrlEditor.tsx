import { Image } from "@/components/Image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserData } from "@/shared/api/useUserData";
import { useState } from "react";
import { toast } from "sonner";
import { useAvatarUrl } from "./useAvatarUrl";

export const AvatarUrlEditor = () => {
	const { data: userData, isPending: isUserPending } = useUserData();
	const { mutate, isPending } = useAvatarUrl();
	const [url, setUrl] = useState(userData?.avatarUrl || "");

	if (!userData || isUserPending) return <Skeleton />;
	const uid = userData.uid;

	const isValidImageUrl = (url: string) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(url);

	const handleSave = () => {
		if (!isValidImageUrl(url)) {
			toast.error("Неверный формат изображения, укажите url картинки");
			return;
		}
		mutate({ url, uid });
	};

	return (
		<Card>
			<CardContent>
				<h2 className="text-lg font-semibold mb-5 text-center">Изменить аватар</h2>
				<div className="flex gap-2 items-center space-y-2 flex-col">
					<Image className="w-40 h-40 rounded object-cover border border-border" src={userData?.avatarUrl} fallback="/fallback-avatar.jpg" />
					<Input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Вставьте ссылку на изображение" />
					<Button className="w-[150px]" onClick={handleSave} disabled={isPending || !url || !uid}>
						{isPending ? "Сохранение..." : "Сохранить"}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
