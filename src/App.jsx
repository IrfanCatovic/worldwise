/* eslint-disable no-unused-vars */
//ovo je da mi ne bi prijavljivalo gresku nego samo upozorenje
import { lazy, Suspense } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

import CityList from "./components/CItyList";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import Homepage from "./Pages/Homepage";
// import PageNotFound from "./Pages/PageNotFound";
// import AppLayout from "./Pages/AppLayout";
// import Login from "./Pages/Login";

const Homepage = lazy(() => import("./Pages/Homepage"));
const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Login = lazy(() => import("./Pages/Login"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter
        //BrowserRouter je komponenta koja omotava celu aplikaciju i omogucava routing
        //sve sto je unutar nje ima pristup routing funkcionalnostima
        >
          <Suspense fallback={<SpinnerFullPage />}>

            <Routes>
              <Route index element={<Homepage />} />
              {/* Default  */}
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  //protected route je komponenta koja proverava da li je korisnik ulogovan
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >

                <Route index element={<Navigate replace to="cities" />} 
                //ako udjemo na /app da nas prebaci na /app/cities
                //index element znaci da je ovo deafault route za /app, parent route
                />

                {/* prvi route pravimo kao default kada otvorimo app  */}
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                {/*dynamic route za city */}
                <Route path="countries" element={<CountriesList />} />
                {/* dodali smo rutu za countries  */}

                <Route path="form" element={<Form />} />
                {/* 3 child routes  */}
              </Route>

              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
