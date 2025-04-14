import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function LoanList() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/get-loan-list/')
      .then((response) => {
        setLoans(response.data)
      }).catch((error) => {
        console.error('Error Getching Loans ' + error.response.data)
      })
  }, [])

  return (
    <div className='container-fluid'>

      <div className='border border-secondary bg-white rounded-5 shadow  my-2 scroll-bar'
        style={{ minHeight: '565px', maxHeight: '565px', overflowY: 'auto' }}>
        <table className='itmlst table table-hover'>
          <thead className=' rounded-top-5' style={{ position: 'sticky', top: '0', zIndex: '1', }}>
            <tr>
              <th>Loan Account No</th>
              <th>Loan date</th>
              <th>Customer number</th>
              <th className='text-end'>Payment amount</th>
              <th className='text-end'>Loan amount</th>
              <th className='text-end'>EMI</th>
              <th>Term</th>
              <th>Payment frequency</th>
              <th>Next date</th>
            </tr>
          </thead>

          <tbody className='px-4 py-1'>
            {loans.length > 0 ? (
              loans.map((loan, index) => (
                <tr key={index}>
                  <td>{loan.loan_accno}</td>
                  <td>{loan.loan_date}</td>
                  <td>
                    {loan.customer?.customer_name || ""}
                  </td>
                  <td className='text-end'>{loan.payment_amount}</td>
                  <td className='text-end'>{loan.loan_amount}</td>
                  <td className='text-end'>{loan.emi_amount}</td>
                  <td>{loan.term}</td>
                  <td>{loan.payment_freq}</td>
                  <td>{loan.next_pay_date}</td>
                </tr>
              ))

            ) : (
              <tr className='text-center'><td colSpan='9'>Loan not Found</td></tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}
