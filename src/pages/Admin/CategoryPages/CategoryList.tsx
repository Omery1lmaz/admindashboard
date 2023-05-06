import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import {
  deleteCategoryById,
  getCatsBySeller,
} from '../../../store/productSlices';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress';
import { Box, Typography } from '@mui/material';

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

const CategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { sellerCategories, isLoadingP } = useSelector(
    // @ts-expect-error
    (state) => state.product
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState();

  useEffect(() => {
    // @ts-expect-error
    dispatch(getCatsBySeller());
  }, []);

  const deleteCategory = () => {
    // @ts-expect-error
    dispatch(deleteCategoryById({ id: selectedCategoryId }));
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Category List" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="grid grid-cols-2 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-2 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Category Name</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {!isLoadingP &&
          sellerCategories?.map((category: any, key: number) => {
            return (
              <div
                key={key}
                className="grid grid-cols-2 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-2 md:px-6 2xl:px-7.5"
              >
                <div className="col-span-1 flex items-center">
                  <p className="max-w-[350px] truncate text-sm text-black dark:text-white sm:max-w-[100px]">
                    {category.name}
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <div className="flex items-center justify-center gap-2">
                    <PencilSquareIcon
                      className="cursor-pointer hover:scale-110"
                      width={16}
                    />
                    <TrashIcon
                      className="cursor-pointer hover:scale-110"
                      width={16}
                      onClick={() => {
                        setSelectedCategoryId(category._id);
                        handleOpen();
                      }}
                    />
                  </div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
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
                            deleteCategory();
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
                </div>
              </div>
            );
          })}
        {sellerCategories?.length == 0 && !isLoadingP && (
          <div className="flex h-[150px]  w-full items-center justify-center xl:p-5">
            <h2 className="text-center text-lg font-semibold text-black dark:text-white">
              No Category
            </h2>
          </div>
        )}
        {isLoadingP && (
          <div className="flex h-[150px] items-center justify-center xl:p-5">
            <CircularProgress color="info" size="sm" variant="plain" />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default CategoryList;
