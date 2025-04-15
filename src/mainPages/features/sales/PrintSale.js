import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

export default function PrintSale() {
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef();
  const [content, setContent] = useState(true);

  const { sale } = location.state || '';

  const handlePrint = useReactToPrint({
    contentRef,
    onAfterPrint: () => {
      navigate(location.state?.from || '');
    },
  });



  useEffect(() => {
    if (!location.state?.sale) {
      navigate('/dashboard');
      return;
    }
    setContent(false)
    handlePrint();
  }, [])

  return (
    <div ref={contentRef} className='printContent p-5'>
      {content &&
        <>
          <div className='row'>
            <div className='col'>
              <div><img src='assets/bill_logo.png' className='mt-2' style={{ width: '20%' }} />
                <h3 >Tax Invoice</h3>
              </div>
            </div>

            <div className='col d-flex flex-column  align-items-end mt-3'>
              <h5 style={{ color: 'rgba(19, 117, 156, 0.88)' }}>Kavins Technologies</h5>
              <span><i class="bi bi-telephone-fill me-2"></i>+91 9876543210</span>
              <span><i class="bi bi-geo-alt-fill me-2"></i>Idaikal</span>
            </div>
          </div>
          <hr />

          <div className='row'>
            <div className='col '>
              <h6>Bill To : </h6>
              <div className='ps-2 d-flex flex-column'>
                <span><i class="bi bi-person-fill me-2"></i>{sale?.customer?.customer_name}</span>
                <span><i class="bi bi-telephone-fill me-2"></i>{sale?.customer.mph}</span>
                <span><i class="bi bi-geo-alt-fill me-2"></i>{sale?.customer.address}</span>
              </div>
            </div>
            <div className='col d-flex flex-column align-items-end'>
              <span className='fw-bold'>Invoice</span>
              <span>{sale.bill_no}</span>
              <span className='fw-bold'>Date</span>
              <span>{sale.sale_date}</span>
            </div>
          </div>
          <hr />

          <div className='row py-2'>
            <table className='table'>
              <thead className='text-start'>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th className='text-end'>Price</th>
                  <th className='text-end'>Quantity</th>
                  <th className='text-end'>Amount</th>
                </tr>
              </thead>
              <tbody>
                {sale.sale_products.length > 0 && sale.sale_products.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.product.item_name}</td>
                    <td className='text-end'>{item.unit_price}</td>
                    <td className='text-end'>{item.quantity}</td>
                    <td className='text-end'>{item.total_price}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
          <hr />

          <div className='row'>
            <div className='col-3'>
              <span className='fw-bold'>Payment</span>
              <div className='row ps-3'>
                <div className='col d-flex flex-column'>
                  <span>Cash </span>
                  <span>Account</span>
                  <span>Credit</span>
                </div>
                <div className='col d-flex flex-column text-end'>
                  <span>{sale?.payment?.cash}</span>
                  <span>{sale?.payment?.account}</span>
                  <span>{sale?.payment?.credit}</span>
                </div>
              </div>

            </div>
            <div className='col d-flex justify-content-end ' style={{ textWrap: 'nowrap' }}>
              <div className='row d-flex  align-items-end'>
                <div className='col d-flex flex-column'>
                  <span className='fw-bold'>SubTotal : </span>
                  <span className='fw-bold'>Discount : </span>
                  <span className='fw-bold'>Total : </span>
                </div>
                <div className='col d-flex flex-column align-items-end me-2 ms-3'>
                  <span>{sale?.total_amount}</span>
                  <span>{sale?.discount}</span>
                  <span>{sale?.total_amount}</span>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </>
      }

    </div>
  )
}
