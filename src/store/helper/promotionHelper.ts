import axios from 'axios';

const getPromotionsBySeller = async () => {
  const response = await axios.get(`http://localhost:4000/api/variations/`, {
    withCredentials: true,
  });
  return response.data;
};

const promotionHelper = { getPromotionsBySeller };
export default promotionHelper;
