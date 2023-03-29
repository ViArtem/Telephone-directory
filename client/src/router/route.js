import Authorization from "../pages/Authorization";
import Home from "../pages/Home";
import Registration from "../pages/Registration";

const routes = [
  { path: "/", element: Home, exact: true },
  { path: "/auth", element: Authorization, exact: true },
  { path: "/regist", element: Registration, exact: true },
];
export { routes };
