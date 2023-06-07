import axios from 'axios';

const getPromosyonsBySeller = async () => {
  const response = await axios.get(
    `http://localhost:4000/api/promotion/seller`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
const addPromotion = async ({ promotion }: any) => {
  const response = await axios.post(
    `http://localhost:4000/api/promotion/`,
    { promotion },
    { withCredentials: true }
  );
  return response.data;
};

const getPromotionById = async (id: string) => {
  const response = await axios.get(
    `http://localhost:4000/api/promotion/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const updatePromotionById = async ({ promotion, id }: any) => {
  const response = await axios.post(
    `http://localhost:4000/api/promotion/${id}`,
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
    `http://localhost:4000/api/promotion/${id}`,
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
