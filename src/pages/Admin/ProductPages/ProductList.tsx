import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import {
  deleteProductById,
  getOrderBySeller,
  getOrderBySellerWithLimit,
  getProductsBySellerLimit,
} from '../../../store/productSlices';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress';
import { Box, Button, Typography } from '@mui/material';

import ProductOne from '../../../images/product/product-01.png';
import ProductTwo from '../../../images/product/product-02.png';
import ProductThree from '../../../images/product/product-03.png';
import ProductFour from '../../../images/product/product-04.png';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

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

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deal, setDeal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [deleteProductId, setDeleteProductId] = useState();
  const [limit, setLimit] = useState(10);
  const { page } = useParams();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // @ts-expect-error
  const { user } = useSelector((state) => state.auth);
  // @ts-expect-error
  const { isLoadingP, sellerProducts } = useSelector((state) => state.product);
  const deleteProduct = (id: any) => {
    // @ts-expect-error
    dispatch(deleteProductById({ id, user }));
  };
  const getProducts = () => {
    const intActivePAge = activePage - 1;
    dispatch(
      // @ts-expect-error
      getProductsBySellerLimit({
        id: user._id,
        skip: intActivePAge * limit,
        limit,
      })
    );
  };
  useEffect(() => {
    getProducts();
  }, [limit]);

  useEffect(() => {
    page && setActivePage(parseInt(page));
    parseInt(page as string) == activePage
      ? getProducts()
      : setActivePage(parseInt(page as string));
  }, []);

  useEffect(() => {
    parseInt(page as string) <= 0 && navigate('/product-list/1');
    setActivePage(1);
  }, []);
  useEffect(() => {
    getProducts();
    navigate(`/product-list/${activePage}`);
  }, [activePage]);
  const pageLimitHandlechange = (e: any) => {
    setLimit(e.target.value);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product List" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
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
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Product Name</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Categories</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Variations</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Price</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {!isLoadingP &&
          sellerProducts?.map((product: any, key: number) => {
            console.log(product.variations.length == 0);
            return (
              <div
                key={key}
                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              >
                <div className="col-span-3 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-12.5 w-15 rounded-md">
                      <img src={product.image} alt="Product" />
                    </div>
                    <p className="max-w-[250px] truncate text-sm text-black dark:text-white sm:max-w-[100px]">
                      {product.name}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 hidden max-w-[100px] items-center sm:flex">
                  <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent p-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                    {product.categories.map((item: any) => {
                      return (
                        <option key={item._id} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-span-1 flex items-center">
                  <div className="col-span-2 hidden max-w-[100px] items-center sm:flex">
                    {product.variations.length == 0 ? (
                      <p className="text-sm text-black dark:text-white">
                        No Variation
                      </p>
                    ) : (
                      <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent p-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                        {product.variations.map((item: any) => {
                          return (
                            <option key={item._id} value={item._id}>
                              {item.size + ' ' + item.price}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  </div>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-meta-3">
                    {product.defaultPrice} TL
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <div className="flex items-center justify-center gap-2">
                    <PencilSquareIcon
                      className="cursor-pointer hover:scale-110"
                      width={16}
                    />
                    <TrashIcon
                      className="cursor-pointer hover:scale-110"
                      width={16}
                      onClick={(e: any) => {
                        setDeleteProductId(product._id);
                        handleOpen();
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        {sellerProducts?.length == 0 && !isLoadingP && (
          <div className="flex h-[150px]  w-full items-center justify-center xl:p-5">
            <h2 className="text-center text-lg font-semibold text-black dark:text-white">
              No Product
            </h2>
          </div>
        )}
        {isLoadingP && (
          <div className="flex h-[150px] items-center justify-center xl:p-5">
            <CircularProgress color="info" size="sm" variant="plain" />
          </div>
        )}

        <div className="my-2 flex justify-end gap-2">
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
            disabled={sellerProducts?.length < limit}
            onClick={() => {
              setActivePage(activePage + 1);
            }}
            className="flex items-center justify-center  rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
          >
            Next Page
          </button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are u sure to delete product
          </Typography>
          <Typography
            id="modal-modal-description"
            className="d-flex"
            sx={{ mt: 2 }}
          >
            <button
              className="w-50"
              onClick={() => {
                deleteProduct(deleteProductId);
                handleClose();
              }}
            >
              Yes
            </button>
            <button
              className="ml-2 w-50"
              onClick={() => {
                handleClose();
              }}
            >
              No
            </button>
          </Typography>
        </Box>
      </Modal>
    </DefaultLayout>
  );
};

export default ProductList;
