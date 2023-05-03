import { useDispatch, useSelector } from 'react-redux';
import CardOne from '../../components/CardOne.tsx';
import {
  DashboardCategoriesTable,
  DashboardProductsTable,
} from '../../components/TableOne.tsx';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminDashBoardInf } from '../../store/productSlices.ts';
import { BanknotesIcon } from '@heroicons/react/24/outline';

interface IFilterQuery {
  date?: {
    $gte?: Date;
    $lte?: Date;
  };
}

const ECommerce = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-expect-error
  const { adminDashBoard, isLoadingP } = useSelector((state) => state.product);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<IFilterQuery>({});
  const handleOpenFilter = () => setFilterOpen(true);
  const handleCloseFilter = () => setFilterOpen(false);

  const filterDateHandle = (e: any) => {
    console.log(e.target.value);
    setFilter({ ...filter, date: { $gte: new Date(e.target.value) } });
  };
  const filterDateEndHandle = (e: any) => {
    setFilter({
      ...filter,
      date: { ...filter.date, $lte: new Date(e.target.value) },
    });
  };
  useEffect(() => {
    getData();
    console.log(adminDashBoard.products);
  }, []);
  useEffect(() => {
    console.log(adminDashBoard.products);
  }, [adminDashBoard]);
  let counter = 0;
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    counter++;
    if (adminDashBoard.products && counter == 0)
      for (let index = 0; index < 2; index++) {
        setProducts([...products, adminDashBoard.products[index]]);
      }
  }, [adminDashBoard]);

  const getData = () => {
    // @ts-expect-error
    dispatch(getAdminDashBoardInf({ query: filter }));
  };
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne
          title={'Total Cost'}
          price={`${adminDashBoard.totalOrder} TL`}
          icon={<BanknotesIcon></BanknotesIcon>}
        />
        <CardOne
          title={'Total Order'}
          price={`${adminDashBoard.totalOrder}`}
          icon={<BanknotesIcon></BanknotesIcon>}
        />
        <CardOne
          title={'Total Tip'}
          price={`${adminDashBoard.totalTipCost} TL`}
          icon={<BanknotesIcon></BanknotesIcon>}
        />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-6">
          {adminDashBoard.products && <DashboardProductsTable />}
        </div>
        <div className="col-span-12 xl:col-span-6">
          {adminDashBoard.products && <DashboardCategoriesTable />}
        </div>
        {/* <div className="col-span-12 xl:col-span-6">
          <TableOne />
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
