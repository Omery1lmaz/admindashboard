import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
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

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

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
      <Routes>
        <Route path="/" element={<GuardedRoute component={ECommerce} />} />
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
          path="/edit-category"
          element={<GuardedRoute component={EditCategory} />}
        />
        <Route
          path="/edit-product"
          element={<GuardedRoute component={EditProduct} />}
        />
        <Route
          path="/edit-waiter"
          element={<GuardedRoute component={EditWaiter} />}
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
          path="/product-list"
          element={<Navigate to={'/product-list/1'} />}
        />

        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forms/form-elements" element={<FormElements />} />
        <Route path="/forms/form-layout" element={<FormLayout />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/ui/alerts" element={<Alerts />} />
        <Route path="/ui/buttons" element={<Buttons />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
