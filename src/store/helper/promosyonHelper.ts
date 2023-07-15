import axios from 'axios';

const getPromosyonsBySeller = async () => {
  const response = await axios.get(
    `https://startup-service.onrender.com/api/promotion/seller`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
const addPromotion = async ({ promotion }: any) => {
  const response = await axios.post(
    `https://startup-service.onrender.com/api/promotion/`,
    { promotion },
    { withCredentials: true }
  );
  return response.data;
};

const getPromotionById = async (id: string) => {
  const response = await axios.get(
    `https://startup-service.onrender.com/api/promotion/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const updatePromotionById = async ({ promotion, id }: any) => {
  const response = await axios.post(
    `https://startup-service.onrender.com/api/promotion/${id}`,
    {
      promotion,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const deletePromotionById = async (id: any) => {
  const response = await axios.delete(
    `https://startup-service.onrender.com/api/promotion/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const promosyonHelper = {
  addPromotion,
  getPromosyonsBySeller,
  getPromotionById,
  updatePromotionById,
  deletePromotionById,
};
export default promosyonHelper;
