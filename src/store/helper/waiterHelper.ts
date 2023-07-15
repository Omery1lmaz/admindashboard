import axios from "axios";

// GET WAITER HELPER
const getWaiter = async (id: any) => {
  const { data } = await axios.get(`https://startup-service.onrender.com/api/waiters/${id}`, {
    withCredentials: true,
  });
  return data;
};

// GET WAITERS HELPER
const getWaitersHelper = async () => {
  const { data } = await axios.get("https://startup-service.onrender.com/api/waiters/", {
    withCredentials: true,
  });
  return data;
};


// GET WAITERS BY SELLER HELPER
const getWaitersBySellerIdHelper = async (id: any) => {
  const { data } = await axios.get(`https://startup-service.onrender.com/api/waiters/seller/${id}`, {
    withCredentials: true,
  });
  return data;
};

// ADD WAITER HELPER
const addWaiterHelper = async (waiter: any) => {
  console.log(waiter);
  const { data } = await axios.post(
    `https://startup-service.onrender.com/api/waiters/`,
    { waiter },
    {
      withCredentials: true,
    }
  );
  return data;
};

// UPDATE WAITER HELPER
const updateWaiterHelper = async (waiter: any) => {
  console.log(waiter);
  const { data } = await axios.post(
    `https://startup-service.onrender.com/api/waiters/${waiter._id}`,
    { waiter },
    {
      withCredentials: true,
    }
  );
  return data;
};

// DELETE WAITER HELPER
const deleteWaiterHelper = async (id: any) => {
  console.log(id);
  const { data } = await axios.delete(
    `https://startup-service.onrender.com/api/waiters/${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

const waiterService = {
  getWaitersHelper,
  deleteWaiterHelper,
  addWaiterHelper,
  getWaiter,
  updateWaiterHelper,
  getWaitersBySellerIdHelper
};
export default waiterService;
