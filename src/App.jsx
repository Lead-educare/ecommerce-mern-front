import HomePage from "./pages/HomePage";
import ShopPage from './pages/ShopPage'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/admin/RegisterPage";
import FullscreenLoader from "./components/admin/MasterLayout/Fullscreen-Loader";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import PrivateRoute from "./components/routes/PrivateRoute";
import ProfilePage from "./pages/admin/ProfilePage";
import {getToken} from "./helper/SessionHelper";
import AdminRoute from "./components/routes/AdminRoute";
import CategoryPage from "./pages/admin/CategoryPage";
import CategoryList from "./pages/admin/CategoryList";
import CreateUpdateProductPage from "./pages/admin/CreateUpdateProductPage";
import ProductList from "./pages/admin/ProductList";
import CategoryPageFront from "./pages/CategoryPage";
import OrderPage from "./pages/admin/OrderPage";
import OrderList from "./pages/admin/OrderList";
import SendOTPPage from "./pages/AccountRecover/Send-OTP-Page";
import VerifyOTPPage from "./pages/AccountRecover/Verify-OTP-Page";
import CreatePasswordPage from "./pages/AccountRecover/Create-Password-Page";
import Page404 from "./pages/Page-404";

function App() {


  return (
    <BrowserRouter>
        <Routes>
            <Route  path='/' element={<HomePage />}/>
            <Route  path='/shop' element={<ShopPage />}/>
            <Route  path='/product/:slug' element={<ProductDetailPage />}/>
            <Route  path='/category/:slug' element={<CategoryPageFront />}/>
            <Route  path='/cart' element={<CartPage />}/>
            <Route path='/registration' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/SendOTP' element={<SendOTPPage />} />
            <Route path='/VerifyOTP' element={<VerifyOTPPage />} />
            <Route path='/CreatePassword' element={<CreatePasswordPage />} />
            {
                /**
                 * Private Routes
                 */
            }
            <Route element={<PrivateRoute />}>
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/order' element={<OrderPage />} />
            </Route>

            <Route element={<AdminRoute />}>
                <Route path='/createUpdateCategory' element={<CategoryPage />} />
                <Route path='/categoryList' element={<CategoryList />} />
                <Route path='/createUpdateProduct' element={<CreateUpdateProductPage />} />
                <Route path='/productList' element={<ProductList />} />
                <Route path='/order' element={<OrderPage />} />
                <Route path='/orderList' element={<OrderList />} />
            </Route>
            <Route  path='*' element={<Page404 />}/>

        </Routes>
        <FullscreenLoader />
    </BrowserRouter>
  )
}

export default App
