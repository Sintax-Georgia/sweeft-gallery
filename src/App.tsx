import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./components/Home";
import History from "./components/History";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/home" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
