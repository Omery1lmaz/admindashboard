import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Admin/Profile/Profile';
import Tables from './pages/Tables';
import GuardedRoute from './services/authGuard';
import AddProduct from './pages/Admin/ProductPages/AddProduct';
import AddCategory from './pages/Admin/CategoryPages/AddCategory';
import AddWaiter from './pages/Admin/WaiterPages/AddWaiter';
import EditCategory from './pages/Admin/CategoryPages/EditCategory';
import EditProduct from './pages/Admin/ProductPages/EditProduct';
import EditWaiter from './pages/Admin/WaiterPages/EditWaiter';
import OrderList from './pages/Admin/OrderPages/OrderList';
import ProductList from './pages/Admin/ProductPages/ProductList';
import CategoryList from './pages/Admin/CategoryPages/CategoryList';
import WaiterList from './pages/Admin/WaiterPages/WaiterList';
import CategoryCostList from './pages/Admin/CostList/category/CategoryCostList';
import ProductCostList from './pages/Admin/CostList/product/ProductCostList';
import Buttons from './pages/UiElements/Buttons';
import { ToastContainer } from 'react-toastify';
import { socket } from './services/socketHelper';
import { successNotification } from './services/notificationHelper';
import { useSelector } from 'react-redux';
function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    // @ts-expect-error
    (state) => state.auth
  );

  useEffect(() => {
    socket.emit('joinRoom', user?._id);
    socket.on('siparisBildirimi', (order) =>
      successNotification('Yeni sipariş id: ' + order._id)
    );
  }, [socket]);

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Routes>
        <Route path="/" element={<GuardedRoute component={ECommerce} />} />
        <Route path="/buttons" element={<GuardedRoute component={Buttons} />} />

        <Route
          path="/add-product"
          element={<GuardedRoute component={AddProduct} />}
        />
        <Route
          path="/add-category"
          element={<GuardedRoute component={AddCategory} />}
        />
        <Route
          path="/add-waiter"
          element={<GuardedRoute component={AddWaiter} />}
        />
        <Route
          path="/edit-category/:id"
          element={<GuardedRoute component={EditCategory} />}
        />
        <Route
          path="/edit-category"
          element={<Navigate to={'/edit-category/6453bbc9a10aca4239b45a0e'} />}
        />

        <Route
          path="/edit-product"
          element={<GuardedRoute component={EditProduct} />}
        />
        <Route
          path="/edit-waiter/:id"
          element={<GuardedRoute component={EditWaiter} />}
        />
        <Route
          path="/edit-waiter"
          element={<Navigate to={'/edit-waiter/643613b2c03fd3c3ea464c88'} />}
        />
        <Route
          path="/category-cost-list"
          element={<GuardedRoute component={CategoryCostList} />}
        />
        <Route
          path="/product-cost-list"
          element={<GuardedRoute component={ProductCostList} />}
        />

        <Route
          path="/order-list/:id"
          element={<GuardedRoute component={OrderList} />}
        />
        <Route path="/order-list" element={<Navigate to={'/order-list/1'} />} />
        <Route
          path="/product-list/:id"
          element={<GuardedRoute component={ProductList} />}
        />
        <Route
          path="/category-list"
          element={<GuardedRoute component={CategoryList} />}
        />
        <Route
          path="/waiter-list"
          element={<GuardedRoute component={WaiterList} />}
        />

        <Route
          path="/product-list"
          element={<Navigate to={'/product-list/1'} />}
        />

        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<GuardedRoute component={Profile} />} />
        <Route path="/forms/form-elements" element={<FormElements />} />
        <Route path="/forms/form-layout" element={<FormLayout />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
