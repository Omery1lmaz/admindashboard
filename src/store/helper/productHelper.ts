import axios from 'axios';

const getCategoriesHelper = async () => {
  const response = await axios.get(
    'https://startup-service.onrender.com/api/categories/categories'
  );

  return response.data;
};
const getOrderBySeller = async () => {
  const response = await axios.get(
    'https://startup-service.onrender.com/api/orders/order/seller',
    { withCredentials: true }
  );
  const arrayfororders = [...response.data];
  arrayfororders.sort((a: any, b: any) => {
    // @ts-expect-error
    return new Date(b.date) - new Date(a.date);
  });
  return arrayfororders;
};

const getAdminDashboardInf = async ({ query }: any) => {
  const res = await axios.post(
    'https://startup-service.onrender.com/api/admin/adminDashboard',
    { query: query },
    {
      withCredentials: true,
    }
  );
  return res.data;
};

const UpdateOrderStatus = async ({ id, status }: any) => {
  const response = await axios.put(
    `https://startup-service.onrender.com/api/orders/order/${id}`,
    { status },
    { withCredentials: true }
  );
  return response.data;
};
const getOrderById = async ({ id }: any) => {
  return axios.get(`https://startup-service.onrender.com/api/orders/order/${id}`, {
    withCredentials: true,
  });
};

const deleteOrder = async ({ id }: any) => {
  return axios.delete(`https://startup-service.onrender.com/api/orders/order/${id}`, {
    withCredentials: true,
  });
};

const createOrder = async ({
  isTakeAway,
  totalPrice,
  orderMessage,
  products,
  name,
  user,
  seller,
  shippingAddress,
  productsQnty,
  tip,
}: any) => {
  const response: any = axios.post(
    'https://startup-service.onrender.com/api/orders/order',
    {
      isTakeAway,
      totalPrice,
      name,
      products,
      user,
      seller,
      shippingAddress,
      productsQnty,
      orderMessage,
      tip,
    },
    { withCredentials: true }
  );

  return response.data;
};

const createTip = async ({ tip, id, seller }: any) => {
  const response: any = axios.post(
    `https://startup-service.onrender.com/api/orders/order/tip/${id}`,
    {
      tip,
      seller,
    },
    { withCredentials: true }
  );
  return response.data;
};

const deleteCategoryById = async ({ id }: any) => {
  const response: any = await axios.delete(
    `https://startup-service.onrender.com/api/categories/${id}`,
    { withCredentials: true }
  );

  return response.data;
};

const getProduct = async ({ id }: any) => {
  const response: any = await axios.get(
    `https://startup-service.onrender.com/api/products/${id}`
  );

  return response.data;
};

const getCategoryByIdHelper = async ({ id }: any) => {
  const response: any = await axios.get(
    `https://startup-service.onrender.com/api/categories/${id}`,
    { withCredentials: true }
  );

  return response.data;
};
const updateProductsImage = async ({ id, formData }: any) => {
  const response: any = await axios.post(
    `https://startup-service.onrender.com/api/products/image/${id}`,
    formData,
    { withCredentials: true }
  );

  return response.data;
};

// const getCategoriesBySellerHelper = async ({ id, user }: any) => {
const getCategoriesBySellerHelper = async () => {
  const response: any = await axios.get(
    `https://startup-service.onrender.com/api/categories/categories/seller`,
    { withCredentials: true }
  );
  return response.data;
};

const getCategoriesBySellerIdHelper = async (id: any) => {
  const response = await axios.get(
    `https://startup-service.onrender.com/api/categories/categories/${id}`
  );
  return response.data;
};

const getPromotionsBySeller = async () => {
  const response: any = await axios.get(
    `https://startup-service.onrender.com/api/promotions/`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const addCategoriesHelper = async (category: any) => {
  const response: any = await axios.post(
    'https://startup-service.onrender.com/api/categories/add-categories',
    category,
    { withCredentials: true }
  );
  return response.data;
};

// @Post
// @Update Product
// @Private
const updateCategory = async ({ category, id }: any) => {
  const response: any = await axios.put(
    `https://startup-service.onrender.com/api/categories/categories/${id}`,
    category,
    { withCredentials: true }
  );
  return response.data;
};

const addProduct = async ({ product, formData }: any) => {
  const response: any = await axios.post(
    'https://startup-service.onrender.com/api/products/',
    formData,
    { withCredentials: true }
  );
  return response.data;
};

// @Post
// @Update Product
// @Private
const updateProduct = async ({ product, productId }: any) => {
  const response: any = await axios.post(
    `https://startup-service.onrender.com/api/products/${productId}`,
    product,
    { withCredentials: true }
  );
  return response.data;
};

const updateProductP = async ({ product, productId }: any) => {
  const response: any = await axios.post(
    `https://startup-service.onrender.com/api/products/p/${productId}`,
    { product },
    { withCredentials: true }
  );
  return response.data;
};

// Get Product By Id

const getProductsByIdHelper = async (id: any) => {
  const response: any = await axios.get(
    `https://startup-service.onrender.com/api/products/${id}`
  );
  return response.data;
};

// Get Seller's Products

const getProductsBySeller = async (id: any) => {
  const response: any = await axios.get(
    `https://startup-service.onrender.com/api/products/seller/${id}`
  );
  return response.data;
};

const getProductsBySellerWithLimit = async ({ skip, limit }: any) => {
  const response: any = await axios.get(
    `https://startup-service.onrender.com/api/products/seller/limit/${limit}/${skip}`,
    { withCredentials: true }
  );
  return response.data;
};

const getOrderBySellerWithLimit = async ({ skip, limit, query }: any) => {
  const response: any = await axios.put(
    `https://startup-service.onrender.com/api/orders/order/seller/limit/${limit}/${skip}`,
    { query },
    { withCredentials: true }
  );
  return response.data;
};

const getCatsHelper = async () => {
  const response = await axios.get(
    `https://startup-service.onrender.com/api/categories/categories/seller`,
    { withCredentials: true }
  );
  return response.data;
};
const deleteProductById = async ({ id, user }: any) => {
  const response = await axios.delete(
    `https://startup-service.onrender.com/api/products/${id}`,
    { withCredentials: true }
  );

  return response.data;
};

const productService = {
  getCatsHelper,
  getCategoriesHelper,
  addCategoriesHelper,
  getOrderById,
  addProduct,
  getProductsBySeller,
  getProductsByIdHelper,
  updateProduct,
  getCategoryByIdHelper,
  updateCategory,
  getCategoriesBySellerHelper,
  deleteCategoryById,
  deleteProductById,
  getOrderBySeller,
  getProduct,
  createOrder,
  updateProductsImage,
  deleteOrder,
  UpdateOrderStatus,
  getProductsBySellerWithLimit,
  getCategoriesBySellerIdHelper,
  getOrderBySellerWithLimit,
  getAdminDashboardInf,
  getPromotionsBySeller,
  createTip,
  updateProductP,
};
export default productService;
