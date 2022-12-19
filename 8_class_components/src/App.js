// Since App.js is added as a module, we can import packages here using import statement
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar.js";
import MemberList from "./components/MemberList.js";
import MemberDetails from "./components/MemberDetails";
import Error from "./components/Error.js";
import AboutUs from "./components/AboutUs.js";
import AboutUsChildSection from "./components/AboutUsChildSection.js";

const AppLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
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
				element: <MemberList />,
			},
			{
				path: "/member/:username",
				element: <MemberDetails />,
			},
			{
				path: "/about-us",
				element: <AboutUs />,
				children: [
					{
						index: true,
						element: <AboutUsChildSection />,
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
