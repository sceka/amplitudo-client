import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import { Provider } from "react-redux";
import store from "./store";
import RequireAuth from "./components/common/RequireAuth/RequireAuth";
import "./styles/variables.scss";
import HomePage from "./components/pages/HomePage/HomePage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import CreatePasswordPage from "./components/pages/CreatePasswordPage/CreatePasswordPage";

const loggedInRoutes = createBrowserRouter([
	// Public Routes
	{
		path: "/login",
		element: <LoginPage />
	},
	{
		path: "/register",
		element: <RegisterPage />
	},
	{
		path: "/create-password",
		element: <CreatePasswordPage />
	},
	// Private Routes
	{
		element: <RequireAuth />,
		children: [
			{
				path: "/",
				element: <HomePage />
			}
		]
	}
]);

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={loggedInRoutes} />
		</Provider>
	);
}

export default App;
