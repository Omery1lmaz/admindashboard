import axios from 'axios';

const getPromotionsBySeller = async () => {
  const response = await axios.get(`http://localhost:4000/api/variations/`, {
    withCredentials: true,
  });
  return response.data;
};
const addPromotion = async ({ variation }: any) => {
  const response = await axios.post(
    `http://localhost:4000/api/variations/`,
    { variation },
    { withCredentials: true }
  );
  return response.data;
};

const getPromotionById = async (id: string) => {
  console.log('get promotion by id');
  const response = await axios.get(
    `http://localhost:4000/api/variations/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const updatePromotionById = async ({ variation, id }: any) => {
  const response = await axios.put(
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
  const response = await axios.delete(
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
