import { JSX, lazy, LazyExoticComponent } from "react";

export type RouteType = {
	path: string;
	element: LazyExoticComponent<() => JSX.Element>;
	isPrivate?: boolean;
	hideWhenAuth?: boolean;
	useLayout?: boolean;
	children?: RouteType[];
};

const Home = lazy(() => import("../../pages/home-page/HomePage.tsx"));
const MediaLayout = lazy(() => import("../../pages/media-page/MediaLayout.tsx"));
const Media = lazy(() => import("../../pages/media-page/MediaPage.tsx"));
const MediaCastList = lazy(() => import("../../pages/media-page/MediaAllCast.tsx"));
const Person = lazy(() => import("../../pages/person-page/PersonPage.tsx"));
const Catalog = lazy(() => import("../../pages/catalog-page/CatalogPage.tsx"));

const Login = lazy(() => import("../../pages/auth-page/LoginForm.tsx"));
const Register = lazy(() => import("../../pages/auth-page/RegisterForm.tsx"));
const Profile = lazy(() => import("../../pages/profile-page/ProfilePage.tsx"));
const Settings = lazy(() => import("../../pages/settings-page/SettingsPage.tsx"));

const NotFound = lazy(() => import("../../pages/NotFound.tsx"));

export const routes: RouteType[] = [
	{
		path: "/",
		element: Home,
		useLayout: true,
	},
	{
		path: "/movie/:id",
		element: MediaLayout,
		useLayout: true,
		children: [
			{
				path: "/movie/:id",
				element: Media,
			},
			{
				path: "/movie/:id/cast",
				element: MediaCastList,
			},
		],
	},
	{
		path: "/series/:id",
		element: MediaLayout,
		useLayout: true,
		children: [
			{
				path: "/series/:id",
				element: Media,
			},
			{
				path: "/series/:id/cast",
				element: MediaCastList,
			},
		],
	},
	{
		path: "/person/:id",
		element: Person,
		useLayout: true,
	},
	{
		path: "/catalog/movie",
		element: Catalog,
		useLayout: true,
	},
	{
		path: "/catalog/series",
		element: Catalog,
		useLayout: true,
	},
	{
		path: "/login",
		element: Login,
		useLayout: true,
		hideWhenAuth: true,
	},
	{
		path: "/register",
		element: Register,
		useLayout: true,
		hideWhenAuth: true,
	},
	{
		path: "/profile/:uid",
		element: Profile,
		useLayout: true,
		isPrivate: false,
	},
	{
		path: "/profile/:id/settings",
		element: Settings,
		useLayout: true,
		isPrivate: true,
	},
	{
		path: "*",
		element: NotFound,
		useLayout: false,
	},
];
