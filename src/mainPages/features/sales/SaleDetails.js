import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

export default function SaleDetails() {

  const navigate = useNavigate();
  const location = useLocation();
  const [sale, setSale] = useState(location.state?.sale || {});

  const [searchTerm, setSearchTerm] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);

  const [saleItems, setSaleItems] = useState([])
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/get-sale-list/')
      .then((response) => {
        setSales(response.data)
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error Fetching Sales')
      })
  }, [])

  const handleChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    setDropdown(true);
    const filtered = sales.filter((sale) =>
      (`${sale.bill_no} ${sale.customer?.customer_name} ${sale.sale_date} `.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredSales(filtered);
  };

  const handleDisplaySales = (sale) => {
    setSale(sale);
    setDropdown(false);
    setSearchTerm('');
  }

  return (
    <div className='container'>

      {/* Search */}
      <input className='form-control border rounded px-2 my-3 ' type='text' placeholder='Search Bill' style={{ width: '300px' }}
        value={searchTerm} onChange={handleChange} />

      {dropdown && searchTerm.length > 0 && (
        <div className='dropdown-menu show' style={{maxHeight:'35%', overflowY:'auto'}}>
          <table className='table table-hover' style={{width:'300px'}}>
            <thead>
              <tr>
                <th>Bill no</th>
                <th>Customer</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loader message='Fetching sales' />
              ) :
                (
                sales.length>0?(
                  filteredSales.length>0?(
                    filteredSales.map((sale, index)=>(
                      <tr onClick={()=>handleDisplaySales(sale)}>
                        <td>{sale.bill_no}</td>
                        <td>{sale.customer?.customer_name}</td>
                      </tr>
                    ))
                  ):(
                    <tr><td colSpan='2'>Matches not found</td></tr>
                  )
                ):(
                  <tr><td colSpan='2'>Sales not found</td></tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Invoice and Customer */}
      <div className='row bg-light mt-1 mb-0 mx-0 p-2 border rounded shadow d-flex'>
        <div className='col'>
          <label className='form-label'>Bill no</label>
          <span className='form-control border rounded-pill px-2'>{sale.bill_no || ''}</span>
        </div>
        <div className='col'>
          <label className='form-label'>Sale date</label>
          <span className='form-control border rounded-pill px-2'>{sale.sale_date || ''}</span>
        </div>
        <div className='col'>
          <label className='form-label'>Customer name</label>
          <span className='form-control border rounded-pill px-2'>{sale.customer?.customer_name || ''}</span>
        </div>
        <div className='col'>
          <label className='form-label'>Customer number</label>
          <span className='form-control border rounded-pill px-2'>{sale.customer?.mph || ''}</span>
        </div>
      </div>

      {/* Products */}
      <div className='bg-white border rounded shadow p-3 mt-1'>
        <table className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Product name</th>
              <th className='text-end'>Unit price</th>
              <th className='text-end'>Quantity</th>
              <th className='text-end'>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {sale.sale_products?.length > 0 ? (
              sale.sale_products.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.product.item_name||''}</td>
                  <td className='text-end'>{item.unit_price||''}</td>
                  <td className='text-end'>{item.quantity||''}</td>
                  <td className='text-end'>{item.total_price||''}</td>
                </tr>
              ))
            ) : (
              <tr className='text-center'>
                <td colSpan='5'>Products not found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='row bg-light mt-1 mb-0 mx-0 p-2 border rounded shadow d-flex'>
        <div className='col'>
          <label className='form-label'>Cash</label>
          <span className='form-control border rounded-pill px-2'>{sale.payment?.cash || ''}</span>
        </div>
        <div className='col'>
          <label className='form-label'>Account</label>
          <span className='form-control border rounded-pill px-2'>{sale.payment?.account || ''}</span>
        </div>
        <div className='col'>
          <label className='form-label'>Credit</label>
          <span className='form-control border rounded-pill px-2'>{sale.payment?.credit || ''}</span>
        </div>
        <div className='col'>
          <label className='form-label'>Discount</label>
          <span className='form-control border rounded-pill px-2'>{sale.discount || ''}</span>
        </div>
        <div className='col'>
          <label className='form-label'>Total amount</label>
          <span className='form-control border rounded-pill px-2'>{sale.total_amount || ''}</span>
        </div>
        <div className='col'>
          <label className='form-label'>Balance</label>
          <span className='form-control border rounded-pill px-2'>{sale.balance || ''}</span>
        </div>
      </div>

    </div>
  )
}

