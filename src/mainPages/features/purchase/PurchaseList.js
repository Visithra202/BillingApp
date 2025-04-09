import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

export default function PurchaseList() {
  const [purchaseList, setPurchaseList] = useState([]);
  const [reload, setReload] = useState(true)
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);
  const [purchasePayments, setPurchasePayments] = useState([]);
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/get-purchase-list/')
      .then((response) => {
        setPurchaseList(response.data)
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error Fetching Purchase')
      })
    axios.get('http://localhost:8000/get-purchase-payment-list/')
      .then((response) => {
        setPurchasePayments(response.data)
      })
      .catch((error) => {
        console.error('Error Fetching Payments')
      })

    axios.get('http://localhost:8000/get-seller-list/')
      .then((response) => {
        setSellers(response.data)
      })
      .catch((error) => {
        console.error('Error Fetching Sellers')
      })
    axios.get('http://localhost:8000/get-purchase-items-list/')
      .then(response => setPurchaseItems(response.data))
      .catch(error => {
        console.error('Error Fetching PurchaseItems ' + error)
      })
    axios.get('http://localhost:8000/get-stock-list/')
      .then(response => setItems(response.data))
      .catch(error => {
        console.error('Error Fetching Items ' + error)
      })
  }, [reload])

  // const handleDelete = (purchase) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete this Purchase?");
  //   if (confirmDelete) {
  //     axios.delete(`http://localhost:8000/delete-purchase/${purchase.purchase_id}/`)
  //       .then((response) =>
  //         setReload((prev) => !prev)
  //       ).catch((error) => {
  //         alert('Error Deleting Purchase')
  //       });
  //   }
  // }

  return (
    <div className='container-fluid'>
      <div className='border border-secondary bg-white rounded-5 shadow  my-2 scroll-bar'
        style={{ minHeight: '565px', maxHeight: '565px', overflowY: 'auto' }}>
        <table className='itmlst table table-hover'>
          <thead className=' rounded-top-5' style={{ position: 'sticky', top: '0', zIndex: '1', }}>
            <tr>
              <th>Purchase id</th>
              <th>Purchase date</th>
              <th>Seller</th>
              <th>Products</th>
              <th>Payment type</th>
              <th className='text-end'>Total amount</th>
              <th className='text-end'>Discount</th>
              <th className='text-end'>Balance</th>
              {/* <th className='text-center'>Action</th> */}
            </tr>
          </thead>

          <tbody className='px-4 py-1'>
            {
              loading ? (
                <tr><td colSpan='9'><Loader message='Fetching Purchase Items' /></td></tr>
              ) : (
                purchaseList.length > 0 ? (
                  purchaseList.map((purchase, index) => (
                    <tr key={index}>
                      <td>{purchase.purchase_id}</td>
                      <td>{purchase.purchase_date}</td>
                      <td>
                        {sellers.find((sell) => sell.seller_id === purchase.seller)?.seller_name || "-"}
                      </td>
                      <td>
                        {(() => {
                          let prods = '';
                          purchaseItems.forEach(purchaseItem => {
                            if (purchase.purchase_id === purchaseItem.purchase) {
                              const item = items.find(it => it.item_id === purchaseItem.product);
                              if (item) {
                                prods += (prods ? ', ' : '') + item.item_name;
                              }
                            }
                          });
                          return prods || '-';
                        })()}
                      </td>
                      <td>
                        {(() => {
                          let ans = '';
                          const payment = purchase.purchase_payment;
                          if (!payment) return '-';
                          if (payment.cash > 0) ans += 'Cash';
                          if (payment.account > 0) ans += (ans ? ' & Account' : 'Account');
                          if (payment.credit > 0) ans += (ans ? ' & Credit' : 'Credit');
                          return ans || '-';
                        })()}
                      </td>
                      <td className='text-end'>{purchase.total_amount}</td>
                      <td className='text-end'>{purchase.discount}</td>
                      <td className='text-end'>{purchase.balance}</td>
                      {/* <td className='text-center'>
                                                <i className="bi bi-pencil-square text-primary mx-1" style={{ cursor: 'pointer' }}
                                                    onClick={() => navigate('/editItem', { state: { purchase } })}></i>
                                                <i className="bi bi-trash-fill text-danger mx-1" style={{ cursor: 'pointer' }} onClick={() => handleDelete(purchase)}></i>
                                            </td> */}
                    </tr>
                  ))

                ) : (
                  <tr className='text-center'><td colSpan='9'>No purchase Found</td></tr>
                )
              )
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}
