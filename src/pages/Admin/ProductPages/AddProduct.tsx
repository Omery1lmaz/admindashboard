import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import Multiselect from 'multiselect-react-dropdown';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getCatsBySeller } from '../../../store/productSlices';
import { getPromotionsBySeller } from '../../../store/promotionSlices';
const AddProduct = () => {
  const dispatch = useDispatch();
  // @ts-expect-error
  const { sellerCategories, isLoadingP } = useSelector(
    // @ts-ignore-
    (state) => state.product
  );
  const { promotions } = useSelector(
    // @ts-ignore-
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
  const handleaddclick = (e: any) => {
    // @ts-expect-error
    setinputList([...inputList, [{ name: '', value: '' }]]);
    e.preventDefault();
  };
  const [inputListVariation, setinputListVariation] = useState([]);

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
    // name == 'price'
    //   ? // @ts-expect-error
    //     (list[index].products[indexInside][name] = parseInt(value))
    //   : // @ts-expect-error
    //     (list[index].products[indexInside][name] = value);
    // // @ts-expect-error
    // console.log(list[index].products[indexInside][name]);
    // list.variations[index][name] = value;
    setinputListVariation(list);
  };

  const handleVariationNameChange = (e: any, index: number) => {
    const { name, value } = e.target;
    console.log(value, 'value');
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
    console.log(name, value);
    const list = [...inputList];
    // @ts-expect-error
    list[index] = value;
    setinputList(list);
  };

  const handleRemoveInside = (e: any, index: any, indexInside: any) => {
    const list = [...inputListVariation];
    const t = list[index];
    console.log('list index', list);
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
    console.log(list, 'list');
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
  const handleremove = (e: any, index: any) => {
    e.preventDefault();
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const formData = new FormData();
  useEffect(() => {
    console.log(inputList);
  }, [inputListVariation, inputList]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Product" />
      <Formik
        initialValues={{
          Name: '',
          Description: '',
          Price: 1,
          Category: '',
          Promotions: '',
        }}
        validationSchema={validate}
        onSubmit={(values, { resetForm }) => {
          const { Name, Description, Price, Category, Promotions } = values;
          formData.append('Name', Name);
          formData.append('Description', Description);
          formData.append('Category', JSON.stringify(Category));
          const ids = inputList.map((group: any) =>
            group.map((item: any) => item._id)
          );
          const flattenedIds = [].concat(...ids);
          formData.append('Promotions', JSON.stringify(flattenedIds));
          // @ts-expect-error
          formData.append('Price', Price);
          formData.append('variations', JSON.stringify(inputListVariation));
          // @ts-expect-error
          formData.append('Image', image);
          for (var key of formData.entries()) {
            console.log(JSON.stringify(key[0]) + ', ' + JSON.stringify(key[1]));
          }
          const product = {
            Name,
            Description,
            Price,
            Category,
            Promotions,
            variations: inputListVariation,
            formData,
          };
          // @ts-expect-error
          dispatch(addProduct({ product, formData }));
          // @ts-expect-error
          resetForm({ values: '' });
          setinputListVariation([]);
        }}
      >
        {(formik) => (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Product Form
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
                          <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                              Add Promotion {i + 1}
                            </label>
                            <Multiselect
                              key={i}
                              // id="Promotions"
                              // name="Promotions"
                              className="dark:bg-form-input"
                              options={
                                Array.isArray(promotions) &&
                                promotions.length >= 1
                                  ? promotions.map((promotion) => {
                                      return {
                                        name: promotion.variation.name,
                                        _id: promotion._id,
                                      };
                                    })
                                  : []
                              } // Options to display in the dropdown
                              selectedValues={
                                formik.values.Promotions
                                  ? formik.values.Promotions
                                  : []
                              }
                              placeholder="Select Promotion"
                              // Preselected value to persist in dropdown
                              onSelect={(selectedList, selectedItem) => {
                                handleinputchange(
                                  {
                                    name: selectedItem.name,
                                    value: selectedList,
                                  },
                                  i
                                );
                                // formik.values.Promotions = selectedList;
                                // console.log(
                                //   formik.values.Promotions,
                                //   'promotions'
                                // );
                              }}
                              // Function will trigger on select event
                              onRemove={(selectedList, selectedItem) => {
                                formik.values.Promotions = selectedList;
                              }} // Function will trigger on remove event
                              displayValue="name" // Property name to display in the dropdown options
                            />
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
                              placeholder="Enter First Name"
                              onChange={(e) => handleVariationNameChange(e, i)}
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
                              placeholder="Enter  Name"
                              onChange={(e) => handleVariationNameChange(e, i)}
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
                    <label htmlFor="Image">Image</label>
                    <input
                      id="Image"
                      name="Image"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      className="form-control validate"
                      required
                      // @ts-expect-error
                      onChange={(e) => setImage(e.target.files[0])}
                    />
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
                        console.log(formik.values.Category);
                      }} // Function will trigger on select event
                      onRemove={(selectedList, selectedItem) => {
                        formik.values.Category = selectedList;
                        console.log(formik.values.Category);
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
                  Add Product
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </DefaultLayout>
  );
};

export default AddProduct;
