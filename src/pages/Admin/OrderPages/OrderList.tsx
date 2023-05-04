import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import {
  getOrderBySeller,
  getOrderBySellerWithLimit,
} from '../../../store/productSlices';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress';
import { Box, Typography } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 400,
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const pageLimitOptions = [
  { label: 10, value: 10 },
  { label: 25, value: 25 },
  { label: 50, value: 50 },
  { label: 100, value: 100 },
];

const statues = [
  { label: 'Not Started', value: 'Not Started' },
  { label: 'InProgress', value: 'InProgress' },
  { label: 'Ready', value: 'Ready' },
];

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { page } = useParams();
  const [open, setOpen] = useState(false);
  const [openOrderDetailModal, setOpenOrderDetailModal] = useState(false);
  const [vOrders, setVOrders] = useState<[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [limit, setLimit] = useState(10);
  const handleOpen = () => setOpen(true);
  const handleOpenFilter = () => setFilterOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseODetailModal = () => setOpenOrderDetailModal(false);
  const handleOpenODetailModal = () => setOpenOrderDetailModal(true);
  const handleCloseFilter = () => setFilterOpen(false);
  const [activePage, setActivePage] = useState<number>(1);

  const filterStatusHandle = (e: any) => {
    setFilter({ ...filter, isReady: e.target.value });
  };
  const filterDateHandle = (e: any) => {
    setFilter({ ...filter, date: { $gte: new Date(e.target.value) } });
  };

  const [selectedOrder, setSelectedOrder] = useState();
  //@ts-expect-error
  let { orders, isLoadingP } = useSelector((state) => state.product);
  const getOrders = () => {
    const intActivePAge = activePage - 1;
    dispatch(
      // @ts-expect-error
      getOrderBySellerWithLimit({
        skip: intActivePAge * limit,
        limit,
        query: filter,
      })
    );
  };
  useEffect(() => {
    page && setActivePage(parseInt(page));
    parseInt(page as string) === activePage
      ? getOrders()
      : setActivePage(parseInt(page as string));
  }, []);

  useEffect(() => {
    parseInt(page as string) <= 0 && navigate('/order-list/1');
    setActivePage(1);
  }, []);
  useEffect(() => {
    getOrders();
    navigate(`/order-list/${activePage}`);
  }, [activePage]);
  const pageLimitHandlechange = (e: any) => {
    setLimit(e.target.value);
  };

  useEffect(() => {
    getOrders();
    console.log(limit, 'limit active');
  }, [limit]);
  const handleupdateStatusOrder = (status: any) => {
    if (selectedOrder) {
      const index = orders.findIndex(
        // @ts-expect-error
        (item: any, index: number) => item._id === selectedOrder?._id
      );
      let copyOrders = [...orders];
      let copyV = orders[index];
      copyV = { ...copyV, isReady: status };

      orders = [...copyOrders];
      setOrders();
    }
  };
  const setOrders = () => {
    setVOrders(orders);
  };
  useEffect(() => {
    setOrders();
  }, [orders]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Order List" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="my-3 flex w-full items-center justify-start gap-3">
          <div className="flex items-center justify-start gap-1">
            <label className="block text-black dark:text-white">
              Select Limit:
            </label>
            <div className="relative z-20 bg-white dark:bg-form-input">
              <select
                onChange={pageLimitHandlechange}
                value={limit}
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent p-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              >
                {pageLimitOptions.map((item) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button
            onClick={() => {
              handleOpenFilter();
            }}
            className="flex items-center justify-center  rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
          >
            Filter
          </button>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Date
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Table
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Ago
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoadingP &&
                vOrders?.map((order: any) => {
                  let date = new Date(order.date);

                  let day = date.getDate(); // gün
                  let month = date.getMonth() + 1; // ay (0-11 arası olduğu için 1 ekliyoruz)
                  let year = date.getFullYear(); // yıl
                  let hour = date.getHours(); // saat
                  let minute = date.getMinutes(); // dakika
                  let second = date.getSeconds(); // saniye
                  const time =
                    day +
                    '.' +
                    month +
                    '.' +
                    year +
                    ' ' +
                    hour +
                    ':' +
                    minute +
                    ':' +
                    second;

                  return (
                    <tr onClick={() => setSelectedOrder(order)}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {time}
                        </h5>
                        <p className="text-sm">{order.totalPrice} TL</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {order.name}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {order.shippingAddress.table}
                        </p>
                        {/* <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                        Paid
                      </p> */}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {moment(order.date).fromNow()}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {order.isReady}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <button
                          onClick={() => {
                            handleOpenODetailModal();
                          }}
                          className="flex items-center justify-center  rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                        >
                          Change Status
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {vOrders.length == 0 && !isLoadingP && (
            <div className="flex h-[150px]  w-full items-center justify-center xl:p-5">
              <h2 className="text-center text-lg font-semibold text-black dark:text-white">
                No Order
              </h2>
            </div>
          )}
          {isLoadingP && (
            <div className="flex h-[150px] items-center justify-center xl:p-5">
              <CircularProgress color="info" size="sm" variant="plain" />
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={() => {
            activePage >= 2 && setActivePage(activePage - 1);
          }}
          disabled={activePage === 1}
          className="flex items-center justify-center rounded-lg  border border-stroke bg-gray p-2 hover:bg-opacity-50 disabled:bg-primary dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
        >
          Prev Page
        </button>
        <button
          disabled={orders.length < limit}
          onClick={() => {
            setActivePage(activePage + 1);
          }}
          className="flex items-center justify-center  rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
        >
          Next Page
        </button>
      </div>
      <div>
        {/* Order Detail Modal */}
        <Modal
          open={openOrderDetailModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="absolute left-2/4 top-2/4 h-3/4 w-2/4 translate-x-[-50%] translate-y-[-50%] rounded bg-meta-1 p-4 text-white">
            <h3 className="text-lg font-medium">Order Detail</h3>
            <hr className="my-2"></hr>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-normal">
                <span className="font-medium">Order Owner: </span> Ömer Faruk
                Yılmaz
              </span>
              <span className="text-sm font-normal">
                <span className="font-medium">Order Cost: </span> 255 TL
              </span>
              <span className="text-sm font-normal">
                <span className="font-medium">Order Table: </span> 26
              </span>
              <span className="text-sm font-normal">
                <span className="font-medium">Order Message: </span> Lorem,
                ipsum dolor sit amet consectetur adipisicing elit. Numquam quasi
                ratione provident
              </span>
              <hr className="my-2"></hr>
            </div>
            <div>
              <h2 className="text-lg font-medium ">Products</h2>
              <div className="max-h-[40vh] overflow-y-auto">
                <div className="border-gray-50 my-2 flex flex-col gap-1 rounded border p-2">
                  <span className="text-sm font-medium">
                    Product Name: <span>Türk Kahvesi</span>
                  </span>
                  <span className="text-sm font-medium">
                    Quantity: <span>2</span>
                  </span>
                </div>
                <div className="border-gray-50 flex flex-col gap-1 rounded border p-2">
                  <span className="text-sm font-medium">
                    Product Name: <span>Türk Kahvesi</span>
                  </span>
                  <span className="text-sm font-medium">
                    Quantity: <span>2</span>
                  </span>
                </div>
                <div className="border-gray-50 flex flex-col gap-1 rounded border p-2">
                  <span className="text-sm font-medium">
                    Product Name: <span>Türk Kahvesi</span>
                  </span>
                  <span className="text-sm font-medium">
                    Quantity: <span>2</span>
                  </span>
                </div>
                <div className="border-gray-50 flex flex-col gap-1 rounded border p-2">
                  <span className="text-sm font-medium">
                    Product Name: <span>Türk Kahvesi</span>
                  </span>
                  <span className="text-sm font-medium">
                    Quantity: <span>2</span>
                  </span>
                </div>
                <div className="border-gray-50 flex flex-col gap-1 rounded border p-2">
                  <span className="text-sm font-medium">
                    Product Name: <span>Türk Kahvesi</span>
                  </span>
                  <span className="text-sm font-medium">
                    Quantity: <span>2</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* Order Detail Modal End */}
      </div>
      <Modal
        open={filterOpen}
        onClose={handleCloseFilter}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Filter
          </Typography>
          <Typography
            id="modal-modal-description"
            className="d-flex flex-column justify-content-around w-100"
            sx={{ mt: 2 }}
          >
            <h5>Status Filter</h5>
            <select
              id="select-size"
              className="select"
              onChange={filterStatusHandle}
            >
              {statues.map((item) => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
            <input type="date" onChange={filterDateHandle}></input>
            <button onClick={() => getOrders()}>Search</button>
          </Typography>
        </Box>
      </Modal>
    </DefaultLayout>
  );
};

export default OrderList;
