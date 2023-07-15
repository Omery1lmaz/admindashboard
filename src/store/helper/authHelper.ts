import axios from 'axios';
const axiosInstance = axios.create({
  withCredentials: true, // CSRF token'ını cookie'den almak için bu ayarı etkinleştirin
  xsrfCookieName: 'XSRF-TOKEN', // Sunucudan alınan token'ı cookie'den okumak için kullanılan isim
  xsrfHeaderName: 'X-XSRF-TOKEN', // CSRF token'ını istek başlığına eklemek için kullanılan isim
});

const login = async (user: any) => {
  console.log('user deneme', user);
  const response = await axiosInstance.post(
    'https://startup-service.onrender.com/api/admin/login',
    user,
    {
      withCredentials: true,
    }
  );
  console.log('response data ', response.data);
  return response.data;
};

const getInfoHelper = async () => {
  const response = await axiosInstance.get(
    'https://startup-service.onrender.com/api/users/info',
    {
      withCredentials: true,
    }
  );
  return response.data;
};
const getSellerInfoHelper = async (id: any) => {
  const response = await axiosInstance.get(
    `https://startup-service.onrender.com/api/users/info/${id}`
  );
  return response.data;
};

const updateUserProfileHelper = async (profile: any) => {
  const response = await axiosInstance.post(
    'https://startup-service.onrender.com/api/users/profile',
    { profile: profile },
    { withCredentials: true }
  );

  if (response.data) {
    console.log(response.data + 'data');
  }
  return response.data;
};

const updateUserImageHelper = async ({ formData }: any) => {
  const response = await axiosInstance.post(
    'https://startup-service.onrender.com/api/users/image',
    formData,
    { withCredentials: true }
  );

  if (response.data) {
    console.log(response.data + 'data');
  }
  return response.data;
};

const register = async (user: any) => {
  const response = await axiosInstance.post(
    'https://startup-service.onrender.com/api/users/register',
    user
  );

  if (response.data) {
    console.log(response.data + 'data');
  }
  return response.data;
};

const resetPasswordLink = async (email: any) => {
  console.log(email);
  const response = await axiosInstance.post(
    'https://startup-service.onrender.com/api/users/reset-password',
    { email }
  );

  if (response.data) {
    console.log(response.data + 'data');
  }
  return response.data;
};

const resetPasswordVerify = async ({ id, token, password }: any) => {
  console.log(token + id + password);
  const response = await axiosInstance.post(
    `https://startup-service.onrender.com/api/users/reset-password/${id}/${token}`,
    { password }
  );

  if (response.data) {
    console.log(response.data + 'data');
  }
  return response.data;
};

const VerifyUser = async ({ id, token }: any) => {
  console.log(token + id);
  const response = await axiosInstance.post(
    `https://startup-service.onrender.com/api/users/verify/${id}/${token}`
  );

  if (response.data) {
    console.log(response.data + 'data');
  }
  return response.data;
};

const updatePasswordHelper = async ({
  oldPassword,
  newPassword,
  newPasswordConfirm,
}: any) => {
  const response = await axiosInstance.post(
    'https://startup-service.onrender.com/api/users/update-password',
    {
      oldPassword,
      newPassword,
      newPasswordConfirm,
    },
    { withCredentials: true }
  );

  if (response.data) {
  }
  return response.data;
};

const GetUserDetails = async () => {
  const response = await axiosInstance.post(
    'https://startup-service.onrender.com/api/admin/details',
    {},
    { withCredentials: true }
  );

  if (response.data) {
  }
  return response.data;
};

const GetSellers = async () => {
  const response = await axiosInstance.get(
    'https://startup-service.onrender.com/api/users/sellers'
  );
  return response.data;
};

const authService = {
  login,
  GetUserDetails,
  register,
  resetPasswordLink,
  resetPasswordVerify,
  VerifyUser,
  GetSellers,
  getInfoHelper,
  updateUserProfileHelper,
  updateUserImageHelper,
  getSellerInfoHelper,
  updatePasswordHelper,
};
export default authService;
