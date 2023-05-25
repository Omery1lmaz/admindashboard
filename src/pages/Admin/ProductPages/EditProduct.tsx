import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import Multiselect from 'multiselect-react-dropdown';
import { Formik } from 'formik';

import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import {
  addProduct,
  getCatsBySeller,
  getProductsById,
  updateProductsImage,
  updateProduct,
} from '../../../store/productSlices';
import { getPromotionsBySeller } from '../../../store/promotionSlices';
import { useNavigate, useParams } from 'react-router-dom';
import { Select } from '@mui/material';
import { infoNotification } from '../../../services/notificationHelper';
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

const AddProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputListVariation, setinputListVariation] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // @ts-expect-error
  const { isSuccessP, isErrorP, isLoadingP, sellerCategories, product } =
    useSelector(
      // @ts-ignore-
      (state) => state.product
    );
  useEffect(() => {
    // @ts-expect-error
    dispatch(getProductsById(id));
  }, []);

  const { promotions } = useSelector(
    // @ts-expect-error
    (state) => state.promotion
  );
  const [inputList, setinputList] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    // @ts-expect-error
    dispatch(getCatsBySeller());
    // @ts-expect-error
    dispatch(getPromotionsBySeller());
  }, []);
  useEffect(() => {
    if (
      product.name &&
      inputList.length == 0 &&
      product.variations.length !== 0
    ) {
      setinputListVariation(product.variations);
    }
    if (
      product.name &&
      inputList.length == 0 &&
      product.promotions.length !== 0
    ) {
      setinputList(
        product.promotions.map((t) => {
          return {
            _id: t._id,
            name: t.variation.name,
          };
        })
      );
    }
  }, [product]);
  const handleUpdateImage = () => {
    if (image) {
      formData.append('Image', image);
      // @ts-expect-error
      dispatch(updateProductsImage({ id, formData }));
      handleClose();
    }
  };

  const handleaddclick = (e: any) => {
    if (promotions.length > 0) {
      setinputList([
        // @ts-expect-error
        ...inputList,
        // @ts-expect-error
        {
          _id: promotions[0]._id,
          name: promotions[0].variation.name,
        },
      ]);
    } else {
      infoNotification(
        'Ürüne promotion eklemek için lütfen ilk başta promotion ekleyiniz'
      );
    }
    e.preventDefault();
  };

  const handleinputchangeVariation = (
    e: any,
    index: number,
    indexInside: number
  ) => {
    const { name, value } = e.target;
    const list = [...inputListVariation];
    if (name == 'price') {
      // @ts-expect-error
      list[index].products[indexInside][name] = parseInt(value);
    } else if (name == 'isSelected') {
      // @ts-expect-error
      list[index].products[indexInside][name] = e.target.checked;
    } else {
      // @ts-expect-error
      list[index].products[indexInside][name] = value;
    }
    setinputListVariation(list);
  };

  const handleVariationNameChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const list = [...inputListVariation];
    name == 'isRequired'
      ? // @ts-expect-error
        (list[index][name] = e.target.checked)
      : // @ts-expect-error
        (list[index][name] = value);
    // list[index][name] = value;
    setinputListVariation(list);
  };
  const handleremoveVariation = (index: any) => {
    const list = [...inputListVariation];
    list.splice(index, 1);
    setinputListVariation(list);
  };
  const handleinputchange = ({ name, value }: any, index: any) => {
    const list = [...inputList];
    // @ts-expect-error
    list[index] = value;
    setinputList(list);
  };

  const handleRemoveInside = (e: any, index: any, indexInside: any) => {
    const list = [...inputListVariation];
    const t = list[index];
    // @ts-expect-error
    t.products.splice(indexInside, 1);
    list[index] = t;
    setinputListVariation(list);
    e.preventDefault();
  };

  const handleaddclickVariationList = (e: any) => {
    setinputListVariation([
      // @ts-expect-error
      ...inputListVariation,
      // @ts-expect-error
      {
        name: '',
        isRequired: false,
        products: [{ name: '', price: 0, isSelected: false }],
      },
    ]);
    e.preventDefault();
  };
  const handleaddclickVariation = (e: any, i: number) => {
    const list = [...inputListVariation];
    // @ts-expect-error
    const t = [...list[i].products, { name: '', price: 0, isSelected: false }];
    // @ts-expect-error
    list[i] = {
      name: list[i].name,
      products: t,
      isRequired: list[i].isRequired,
    };
    setinputListVariation(list);
    e.preventDefault();
  };

  const [image, setImage] = useState();
  const validate = Yup.object({
    Name: Yup.string().required('Name is required'),
    Description: Yup.string().required('Description is required'),
    // @ts-expect-error
    Price: Yup.number('Ürün fiyatı harf içermemelidir')
      .min(1, 'Fiyat 1 ya da daha yüksek olmalıdır')
      .positive()
      .integer()
      .required('Price is required'),
    Category: Yup.array().required('Category Required'),
    inputListVariation: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().min(3, 'En az 3 karakter içermelidir.'),
        products: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().min(3, 'En az 3 karakter içermelidir.'),
            price: Yup.number().min(
              0,
              '0 veya daha büyük bir değer olmalıdır.'
            ),
          })
        ),
      })
    ),
  });
  useEffect(() => {
    inputList && console.log(inputList);
  }, [inputList]);

  const handleremove = (e: any, index: any) => {
    console.log('Handle remove', index);
    e.preventDefault();
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const formData = new FormData();

  const selectOnChangeHandler = (e: any, i: number) => {
    console.log(i, 'index');
    const t = [...inputList];
    t[i] = JSON.parse(e?.target.value);
    setinputList(t);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Product" />
      {isLoadingP || !product.name || !product.categories ? (
        <div>Bekleyiniz...</div>
      ) : (
        <Formik
          initialValues={{
            Name: product.name,
            Brand: product.brand,
            Description: product.description,
            Price: product.defaultPrice,
            Category:
              Array.isArray(product.categories) &&
              product.categories.length >= 1
                ? product.categories
                : '',
            Promotions: [],
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            const { Name, Description, Price, Category, Promotions } = values;
            formData.append('Name', Name);
            formData.append('Description', Description);
            formData.append('Category', JSON.stringify(Category));
            formData.append(
              'Promotions',
              JSON.stringify(inputList.map((t: any) => t._id))
            );
            // @ts-expect-error
            formData.append('Price', Price);
            formData.append('variations', JSON.stringify(inputListVariation));
            // @ts-expect-error
            formData.append('Image', image);

            const product = {
              Name,
              Description,
              Price,
              Category: values.Category.map((v) => v._id),
              variations: inputListVariation,
              promotions: inputList.map((t: any) => t._id),
            };
            console.log(id, 'id');
            // @ts-expect-error
            dispatch(updateProduct({ product, productId: id }));
            navigate('/product-list/1');
            resetForm({ values: '' });
            setinputListVariation([]);
          }}
        >
          {(formik) => (
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Edit Product Form
                </h3>
              </div>
              <form onSubmit={formik.handleSubmit}>
                {
                  <span>
                    {formik.errors.Category ||
                      formik.errors.Description ||
                      formik.errors.Name ||
                      formik.errors.Price ||
                      formik.errors.Promotions}
                  </span>
                }
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="col-sm-12">
                      {inputList.map((x: any, i: any) => {
                        return (
                          <div className="row mb-3" key={i}>
                            <div className="z-9999 mb-4.5">
                              <label className="mb-2.5 block text-black dark:text-white">
                                Add Promotion {i + 1}
                              </label>
                              <select
                                onChange={(e: any) =>
                                  selectOnChangeHandler(e, i)
                                }
                              >
                                {Array.isArray(promotions) &&
                                promotions.length >= 1
                                  ? promotions.map((promotion) => {
                                      return (
                                        <option
                                          selected={promotion._id === x._id}
                                          value={JSON.stringify({
                                            // @ts-expect-error
                                            name: promotion.variation.name,
                                            _id: promotion._id,
                                          })}
                                        >
                                          {promotion.variation.name}
                                        </option>
                                      );
                                    })
                                  : []}
                              </select>
                              <button
                                className="btn btn-danger mx-1"
                                onClick={(e: any) => {
                                  handleremove(e, i);
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      <button
                        className="btn btn-success"
                        onClick={handleaddclick}
                      >
                        Add More Promotion
                      </button>
                    </div>
                    <div className="col-sm-12">
                      {inputListVariation.map((x, i) => {
                        return (
                          <div className="row mb-3">
                            <div className="w-full xl:w-1/2">
                              <label className="mb-2.5 block text-black dark:text-white">
                                Variation name
                              </label>
                              <input
                                type="text"
                                name={`name`}
                                defaultValue={x['name']}
                                placeholder="Enter First Name"
                                onChange={(e) =>
                                  handleVariationNameChange(e, i)
                                }
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              />
                            </div>
                            <div className="w-full xl:w-1/2">
                              <label className="mb-2.5 block text-black dark:text-white">
                                Is Required ?
                              </label>
                              <input
                                type="checkbox"
                                name="isRequired"
                                defaultValue={x['isRequired']}
                                placeholder="Enter  Name"
                                onChange={(e) =>
                                  handleVariationNameChange(e, i)
                                }
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              />
                            </div>

                            {
                              // @ts-expect-error
                              x.products.map((y: any, u: number) => {
                                return (
                                  <>
                                    <div className="w-full xl:w-1/2">
                                      <label className="mb-2.5 block text-black dark:text-white">
                                        Product Name
                                      </label>
                                      <input
                                        type="text"
                                        name="name"
                                        defaultValue={y['name']}
                                        placeholder="Enter Name"
                                        onChange={(e) =>
                                          handleinputchangeVariation(e, i, u)
                                        }
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                      />
                                    </div>
                                    <div className="w-full xl:w-1/2">
                                      <label className="mb-2.5 block text-black dark:text-white">
                                        Product Price
                                      </label>
                                      <input
                                        type="text"
                                        name="price"
                                        defaultValue={y['price']}
                                        placeholder="Enter Price"
                                        onChange={(e) =>
                                          handleinputchangeVariation(e, i, u)
                                        }
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                      />
                                    </div>
                                    <div className="row mb-3">
                                      <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                          Is Selected ?
                                        </label>
                                        <input
                                          type="checkbox"
                                          name="isSelected"
                                          onChange={(e) =>
                                            handleinputchangeVariation(e, i, u)
                                          }
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group col-md-2 mt-4">
                                      <button
                                        className="btn btn-danger mx-1"
                                        onClick={(e) =>
                                          handleRemoveInside(e, i, u)
                                        }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </>
                                );
                              })
                            }
                            <div className="form-group col-md-2 mt-4">
                              <button
                                className="btn btn-danger mx-1"
                                onClick={(e) => handleaddclickVariation(e, i)}
                              >
                                Add Variation
                              </button>
                            </div>
                            <div className="form-group col-md-2 mt-4">
                              <button
                                className="btn btn-danger mx-1"
                                onClick={() => handleremoveVariation(i)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      <button
                        className="btn btn-success"
                        onClick={handleaddclickVariationList}
                      >
                        Add More
                      </button>
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="Name"
                        name="Name"
                        required
                        value={formik.values.Name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your first name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="form-group col-xs-12 col-sm-6 mb-3">
                      <button type="button" onClick={handleOpen}>
                        Update Product's Image
                      </button>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Price
                      </label>
                      <input
                        type="number"
                        name="Price"
                        value={formik.values.Price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your last name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Category
                      </label>
                      <Multiselect
                        id="Category"
                        name="Category"
                        options={
                          Array.isArray(sellerCategories) &&
                          sellerCategories.length >= 1
                            ? sellerCategories.map((cat) => {
                                return {
                                  name: cat.name,
                                  _id: cat._id,
                                };
                              })
                            : []
                        } // Options to display in the dropdown
                        selectedValues={
                          formik.values.Category ? formik.values.Category : []
                        }
                        placeholder="Select Category"
                        // Preselected value to persist in dropdown
                        onSelect={(selectedList, selectedItem) => {
                          formik.values.Category = selectedList;
                        }} // Function will trigger on select event
                        onRemove={(selectedList, selectedItem) => {
                          formik.values.Category = selectedList;
                        }} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                      />{' '}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Description
                    </label>
                    <textarea
                      id="Description"
                      name="Description"
                      required
                      value={formik.values.Description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      rows={6}
                      placeholder="Type the product's description"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                  >
                    Edit Product
                  </button>
                </div>
              </form>
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
                    {/* <h2 className="text-lg font-medium">Filter</h2> */}
                    Filter
                  </Typography>
                  <div className="d-flex flex-column justify-content-around w-100">
                    <>
                      <div className="d-flex justify-content-around w-100">
                        <input
                          id="Image"
                          name="Image"
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          required
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                        />
                      </div>
                    </>
                    <button
                      onClick={handleUpdateImage}
                      className="flex items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                    >
                      Update Product's Image
                    </button>
                  </div>
                </Box>
              </Modal>
            </div>
          )}
        </Formik>
      )}
    </DefaultLayout>
  );
};

export default AddProduct;
