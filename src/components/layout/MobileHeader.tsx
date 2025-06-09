import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/shared/api/useAuthUser";
import { useLogout } from "@/shared/api/useLogout";
import { useUserData } from "@/shared/api/useUserData";
import { navLinks } from "@/shared/constants/navLinks";
import { ArrowRight, LogOut, Menu, Settings } from "lucide-react";
import { Link, NavLink } from "react-router";
import { Image } from "../Image";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Skeleton } from "../ui/skeleton";

export const MobileHeader = () => {
	const { data: authUser, isFetched: isAuthFetched } = useAuthUser();
	const { data: user } = useUserData();
	const { logout, isPending } = useLogout();

	return (
		<div className="fixed bg-background bottom-0 left-0 right-0 z-100 border-t border-border">
			<div className="container py-3">
				<div className="flex items-center justify-center">
					<div className="text-xl font-bold text-primary">Filmka</div>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="mt-0.5">
								<Menu />
							</Button>
						</SheetTrigger>

						<SheetContent side="right" className="w-[300px] flex items-center sm:w-[360px] z-1000">
							<SheetHeader className="sr-only">
								<SheetTitle className="sr-only">Меню профиля</SheetTitle>
							</SheetHeader>
							<nav className="flex flex-col rounded-lg p-1  mb-4 ">
								{navLinks.map((link) => (
									<NavLink
										key={link.name}
										to={link.path}
										className={({ isActive }) =>
											`py-3 px-2 rounded-md flex justify-center sm:justify-start items-center gap-3 ${isActive ? "text-primary" : "text-foreground"}`
										}
										end
									>
										{link.icon}
										{link.name}
									</NavLink>
								))}
							</nav>
							{!isAuthFetched || !authUser ? null : !user ? (
								<Skeleton className="w-20 h-20 border border-border" />
							) : (
								<Link className="" to={`/profile/${user.uid}`}>
									<Image
										className="w-20 h-20 rounded object-cover border border-border"
										fallback="/fallback-avatar.jpg"
										src={user.avatarUrl}
										alt="avatar"
									/>
								</Link>
							)}
							{!isAuthFetched ? null : !authUser ? (
								<div className="flex flex-col gap-3 mt-4">
									<Link to="/login">
										<Button className="w-full" size="lg">
											Войти
										</Button>
									</Link>
									<Link to="/register">
										<Button className="w-full" size="lg">
											Регистрация
										</Button>
									</Link>
								</div>
							) : !user ? null : (
								<div className="flex flex-col gap-3 mt-4">
									<Link to={`/profile/${user.uid}`}>
										<Button variant="ghost" className="w-full" size="lg">
											<div className=" flex flex-col ">
												<span className="text-xs font-extralight">
													Мой профиль <ArrowRight className="inline mb-0.5 size-3" />
												</span>
												{user.displayName}
											</div>
										</Button>
									</Link>

									<Link to={`/profile/${user.uid}/settings`}>
										<Button variant="ghost" className="w-full" size="lg">
											<Settings /> Настройки
										</Button>
									</Link>

									<Button onClick={() => logout()} disabled={isPending} variant="ghost" className="w-full text-rose-500">
										<LogOut className="text-rose-500" /> Выход
									</Button>
								</div>
							)}
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</div>
	);
};
