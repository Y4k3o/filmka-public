import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDeleteAccount } from "@/shared/api/useDeleteAccount";
import { useState } from "react";

export const DeleteAccount = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const [password, setPassword] = useState("");
	const { mutate: deleteAccount, isPending } = useDeleteAccount();

	const handleDelete = () => {
		if (!password) return;
		deleteAccount({ password });
	};

	return (
		<div className="space-y-4 p-10 border border-border rounded-2xl bg-background">
			{showConfirmDelete ? (
				<div className="space-y-4 max-w-sm mx-auto">
					<p className="text-center">Введите пароль для подтверждения удаления аккаунта</p>
					<div className="space-y-2">
						<Label htmlFor="password">Пароль</Label>
						<Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
					</div>
					<div className="flex justify-center gap-2 mt-4">
						<Button variant="default" className="bg-red-500 hover:bg-rose-700 transition-colors" onClick={handleDelete} disabled={isPending}>
							{isPending ? "Удаление..." : "Удалить"}
						</Button>
						<Button variant="outline" onClick={() => setShowConfirmDelete(false)} disabled={isPending}>
							Отмена
						</Button>
					</div>
				</div>
			) : (
				<div className="space-y-2 text-center">
					<h3 className="mb-5">Удаление аккаунта</h3>
					<Button variant="default" className="bg-red-500 transition-colors hover:bg-rose-700" onClick={() => setShowConfirmDelete(true)}>
						Удалить аккаунт
					</Button>
				</div>
			)}
		</div>
	);
};
