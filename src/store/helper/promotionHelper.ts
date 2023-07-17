import axios from 'axios';
import Cookies from 'js-cookie';
const defaultOptions = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create instance
let axiosInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(function (config) {
  const token = Cookies.get('token');
  console.log('token', token);
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  console.log(config.headers.Authorization);
  return config;
});
const getPromotionsBySeller = async () => {
  const response = await axiosInstance.get(`http://localhost:4000/api/variations/`, {
    withCredentials: true,
  });
  return response.data;
};
const addPromotion = async ({ variation }: any) => {
  const response = await axiosInstance.post(
    `http://localhost:4000/api/variations/`,
    { variation },
    { withCredentials: true }
  );
  return response.data;
};

const getPromotionById = async (id: string) => {
  console.log('get promotion by id');
  const response = await axiosInstance.get(
    `http://localhost:4000/api/variations/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const updatePromotionById = async ({ variation, id }: any) => {
  const response = await axiosInstance.put(
    `http://localhost:4000/api/variations/${id}`,
    {
      variation,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const deletePromotionById = async (id: any) => {
  const response = await axiosInstance.delete(
    `http://localhost:4000/api/variations/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const promotionHelper = {
  addPromotion,
  getPromotionsBySeller,
  getPromotionById,
  updatePromotionById,
  deletePromotionById,
};
export default promotionHelper;
