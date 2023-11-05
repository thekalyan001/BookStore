import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages
import {Home, Login, Register, Reset, Admin} from "./pages"
//components
import {Header} from "./Components/index"
import AdminOnlyRoute from "Components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "Components/product/productDetails/ProductDetails";
import CourseList from "pages/Enrolled/Enrolled";
import NotFound from "pages/notFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/admin/*"
            element={
              // only acessible to admin 
               <AdminOnlyRoute> 
                <Admin />
              </AdminOnlyRoute>
            }
          />

          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/course-list" element={<CourseList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
