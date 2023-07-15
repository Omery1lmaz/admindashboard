import axios from 'axios';
const axiosInstance = axios.create({
  withCredentials: true, // CSRF token'ını cookie'den almak için bu ayarı etkinleştirin
  xsrfCookieName: 'XSRF-TOKEN', // Sunucudan alınan token'ı cookie'den okumak için kullanılan isim
  xsrfHeaderName: 'X-XSRF-TOKEN', // CSRF token'ını istek başlığına eklemek için kullanılan isim
});

const getPrinters = async () => {
  const response = await axiosInstance.get(
    'https://startup-service.onrender.com/api/printer',
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const addPrinter = async ({ printer }: any) => {
  console.log('user deneme', printer);
  const response = await axiosInstance.post(
    'https://startup-service.onrender.com/api/admin/printer',
    printer,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const getLocalPrinters = async () => {
  const response = await axiosInstance.get(
    'https://localhost:7237/api/Adision'
  );
  console.log('response data ', response.data);
  return response.data;
};

const updatePrinters = async ({ printers }: any) => {
  const response = await axiosInstance.post(
    'https://startup-service.onrender.com/api/printer/update',
    { printers },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const printerService = {
  addPrinter,
  getPrinters,
  getLocalPrinters,
  updatePrinters,
};
export default printerService;
