// built-in imports
import { useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
// external module
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

// components
import Login from "./components/Login.js";
import Navbar from "./components/Navbar.js";
import MemberList from "./components/MemberList.js";
import Error from "./components/Error.js";
import Loading from "./components/Loading.js";
import ProtectedRoute from "./components/ProtectedRoute.js";

// class components
import AboutUsChildSection from "./components/class_components/AboutUsChildSection.js";

// contexts
import ThemeContext from "./contexts/ThemeContext.js";
import store from "./store/store.js";

const AboutUs = lazy(() => import("./components/class_components/AboutUs.js"));
const MemberDetails = lazy(() => import("./components/MemberDetails.js"));

const AppLayout = () => {
	const [theme, setTheme] = useState("light");

	return (
		<Provider store={store}>
			<ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
				<div className="content" data-theme={theme}>
					<Navbar />
					<Outlet />
				</div>
			</ThemeContext.Provider>
		</Provider>
	);
};

const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: (
					<ProtectedRoute>
						<MemberList />
					</ProtectedRoute>
				),
			},
			{
				path: "/login",
				element: (
					<Provider store={store}>
						<Login />
					</Provider>
				),
			},
			{
				path: "/member/:username",
				element: (
					<Suspense fallback={<Loading />}>
						<MemberDetails />
					</Suspense>
				),
			},
			{
				path: "/about-us",
				element: (
					<Suspense fallback={<Loading />}>
						<AboutUs team_name="Web Pirates" />
					</Suspense>
				),
				children: [
					{
						index: true,
						element: (
							<AboutUsChildSection
								team_members="10"
								mentor="Akshay Saini"
								course_name="Namaste React"
								duration="3"
							/>
						),
					},
				],
			},
		],
	},
]);

// define the root in the DOM to render react elements
const react_root = ReactDOM.createRoot(document.getElementById("root"));
// push react elements into the root
react_root.render(<RouterProvider router={appRouter} />);
