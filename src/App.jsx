import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Homepage from "./Pages/Homepage";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout";
import Login from "./Pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          {/* Default  */}
          <Route path="/product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<p>List of cities</p>} />
            {/* prvi route pravimo kao default kada otvorimo app  */}
            <Route path="cities" element={<p>List of cities</p>} />
            <Route path="countries" element={<p>Coutries</p>} />
            <Route path="form" element={<p>Form</p>} />
            {/* 3 child routes  */}
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
