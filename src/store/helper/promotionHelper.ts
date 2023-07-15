import axios from 'axios';

const getPromotionsBySeller = async () => {
  const response = await axios.get(`https://startup-service.onrender.com/api/variations/`, {
    withCredentials: true,
  });
  return response.data;
};
const addPromotion = async ({ variation }: any) => {
  const response = await axios.post(
    `https://startup-service.onrender.com/api/variations/`,
    { variation },
    { withCredentials: true }
  );
  return response.data;
};

const getPromotionById = async (id: string) => {
  console.log('get promotion by id');
  const response = await axios.get(
    `https://startup-service.onrender.com/api/variations/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const updatePromotionById = async ({ variation, id }: any) => {
  const response = await axios.put(
    `https://startup-service.onrender.com/api/variations/${id}`,
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
  const response = await axios.delete(
    `https://startup-service.onrender.com/api/variations/${id}`,
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
