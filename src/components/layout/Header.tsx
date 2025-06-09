import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/shared/api/useAuthUser";
import { useLogout } from "@/shared/api/useLogout";
import { useUserData } from "@/shared/api/useUserData";
import { navLinks } from "@/shared/constants/navLinks";
import { ArrowRight, LogOut, Menu, Search, Settings, User, X } from "lucide-react";
import { useEffect } from "react";
import { Link, NavLink } from "react-router";
import { Image } from "../Image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { SearchResults } from "./Search";
import { useHeaderStore } from "./useHeaderStore";

export const Header = () => {
	const { isMenuOpen, isSearchOpen, searchQuery, debouncedQuery, toggleMenu, toggleSearch, setDebouncedQuery, setSearchQuery, setIsSearchOpen } =
		useHeaderStore();

	const { data: authUser, isFetched: isAuthFetched } = useAuthUser();
	const { data: user } = useUserData();
	const { logout, isPending } = useLogout();

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(searchQuery);
		}, 300);
		return () => clearTimeout(handler);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);

	return (
		<header className="bg-background h-22 sticky top-0 left-0 right-0 z-500 border-b border-border">
			<div className="container py-6">
				<div className="flex items-center justify-center sm:justify-between">
					<div className="relative">
						<div onMouseEnter={toggleMenu} className="flex items-center">
							<Link to="/" className="flex items-center text-primary text-3xl font-bold font-logo">
								Filmka
							</Link>
						</div>

						{isMenuOpen && (
							<nav onMouseLeave={toggleMenu} className="absolute top-0 rounded-b-lg bg-background w-50 flex flex-col">
								<div className="flex items-center">
									<Link to="/" className="flex items-center text-primary text-3xl font-bold font-logo">
										Filmka
									</Link>
								</div>
								<div className="p-1">
									{navLinks.map((link) => (
										<NavLink
											end
											key={link.name}
											to={link.path}
											className={({ isActive }) =>
												`text-xl py-2 px-2 hover:bg-accent rounded-md flex items-center gap-3  ${isActive ? "text-primary " : "text-foreground"}`
											}
										>
											{link.icon}
											{link.name}
										</NavLink>
									))}
								</div>
							</nav>
						)}
					</div>

					<div className="flex items-center gap-2">
						{!isSearchOpen && (
							<Button variant="ghost" size="icon" onClick={toggleSearch}>
								<Search className="w-5 h-5" />
							</Button>
						)}

						{isSearchOpen && (
							<div className="relative w-100">
								<div className="flex items-center gap-2">
									<Input
										placeholder="Фильмы, Сериалы, Персоны"
										className="h-10 bg-secondDark"
										autoFocus
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										onBlur={() => setTimeout(() => setIsSearchOpen(false), 100)}
									/>
									<Button variant="ghost" size="icon" onClick={toggleSearch}>
										<X />
									</Button>
								</div>
								<SearchResults query={debouncedQuery} />
							</div>
						)}

						{!isAuthFetched ? null : !authUser ? (
							<div className="mr-16 flex gap-2">
								<Link to="/login">
									<Button variant="ghost" size="lg">
										Войти
									</Button>
								</Link>
								<Link to="/register">
									<Button size="lg">Регистрация</Button>
								</Link>
							</div>
						) : !user ? (
							<Skeleton className="w-10 h-10" />
						) : (
							<div className="flex gap-2 items-center">
								<Link to={`/profile/${user.uid}`}>
									<Image
										className="w-10 h-10 rounded object-cover border border-border"
										fallback="/fallback-avatar.jpg"
										src={user.avatarUrl}
										alt="avatar"
									/>
								</Link>

								<DropdownMenu modal={false}>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon">
											<Menu />
										</Button>
									</DropdownMenuTrigger>

									<DropdownMenuContent className="w-60 mt-5 rounded-t-none border-t-0 z-1000 " align="end">
										<Link to={`/profile/${user.uid}`}>
											<DropdownMenuItem className=" " onSelect={(e) => e.preventDefault()}>
												<User />

												<div className=" flex flex-col ">
													<span className="text-xs font-extralight">
														Мой профиль <ArrowRight className="inline mb-0.5 size-3" />
													</span>
													{user.displayName}
												</div>
											</DropdownMenuItem>
										</Link>

										<DropdownMenuSeparator />

										<Link to={`/profile/${user.uid}/settings`}>
											<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
												<Settings /> Настройки
											</DropdownMenuItem>
										</Link>

										<DropdownMenuItem
											disabled={isPending}
											onSelect={(e) => {
												e.preventDefault();
												logout();
											}}
											className="text-rose-500"
										>
											<LogOut className="text-rose-500" /> Выход
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};
