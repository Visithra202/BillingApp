import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Loader from '../../components/Loader';
import UseClickOutside from '../../hooks/UseClickOutside';

export default function LoanDetails() {

  const location = useLocation();
  const [loan, setLoan] = useState(location.state?.loan || {});

  const [searchTerm, setSearchTerm] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [loanList, setLoanList] = useState([]);
  const [filteredLoan, setFilteredLoan] = useState([]);

  const [loanJournal, setLoanJournal] = useState([]);
  const [loading, setLoading] = useState(true);

  const dropdownRef = UseClickOutside(() => setDropdown(false));

  useEffect(() => {
    axios.get('http://localhost:8000/get-loan-list/')
      .then((response) => {
        setLoanList(response.data)
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error Fetching Loan')
      })
  }, [])

  useEffect(()=>{
    if(loan?.loan_accno)
      getJournals(loan.loan_accno)
  },[loan])

  const handleChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    setDropdown(true);
    const filtered = loanList.filter((loanData) =>
      (`${loanData.loan_accno} ${loanData.customer?.customer_name} ${loan.loan_date} `.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredLoan(filtered);
  };

  const handleDisplayLoan = (loanData) => {
    setLoan(loanData);
    setFilteredLoan(false);
    setSearchTerm('');    
  }

  const getJournals = (accno) =>{
    axios.get(`http://localhost:8000/get-loan-journal/${accno}/`)
    .then((response) => {
      setLoanJournal(response.data)
    })
    .catch((error) => {
      console.error('Error Fetching Loan Journal')
    })

  }

  return (
    <div className='container'  style={{ height: 'calc(100vh - 280px)' }}>

      {/* Search */}
      <div className='row mt-2 mb-1 mx-0'>
        <input className='form-control border rounded px-2 ' type='text' placeholder='Search loan' style={{ width: '300px' }}
          value={searchTerm} onChange={handleChange} />

        {dropdown && searchTerm.length > 0 && (
          <div ref={dropdownRef} className='dropdown-menu show mt-5' style={{ maxHeight: '500px', overflowY: 'auto', width: '300px' }}>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>Account no</th>
                  <th>Customer</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Loader message='Fetching loan' />
                ) :
                  (
                    loanList.length > 0 ? (
                      filteredLoan.length > 0 ? (
                        filteredLoan.map((loan_data, index) => (
                          <tr onClick={() => handleDisplayLoan(loan_data)}>
                            <td>{loan_data.loan_accno}</td>
                            <td>{loan_data.customer?.customer_name}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan='2'>Matches not found</td></tr>
                      )
                    ) : (
                      <tr><td colSpan='2'>Loan not found</td></tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        )}
      </div>


      <div className='row bg-light mx-0 pt-2 border rounded shadow d-flex'>
        <div className='row'>
          <div className='col d-flex flex-column'>
            <span className='form-label'>Account no</span>
            <span className='loan-control'>{loan.loan_accno || ''}</span>
          </div>
          <div className='col d-flex flex-column'>
            <span className='form-label'>Customer name</span>
            <span className='loan-control'>{loan.customer?.customer_name || ''}</span>
          </div>
          <div className='col d-flex flex-column'>
            <span className='form-label'>Customer no</span>
            <span className='loan-control'>{loan.customer?.mph || ''}</span>
          </div>
          <div className='col d-flex flex-column'>
            <span className='form-label'>Loan date</span>
            <span className='loan-control'>{loan.loan_date || ''}</span>
          </div>
          <div className='col d-flex flex-column'>
            <span className='form-label'>Next payment date</span>
            <span className='loan-control'>{loan.next_pay_date}</span>
          </div>
          <div className='col d-flex flex-column'>
            <span className='form-label'>Payment amount</span>
            <span className='loan-control'>{loan.payment_amount}</span>
          </div>
        </div>

        <div className='row col-10'>
          <div className='col d-flex flex-column'>
            <span className='form-label'>Loan amount</span>
            <span className='loan-control'>{loan.loan_amount}</span>
          </div>
          <div className='col d-flex flex-column'>
            <span className='form-label'>Interest</span>
            <span className='loan-control'>{loan.interest}</span>
          </div>
          <div className='col d-flex flex-column'>
            <span className='form-label'>Emi amount</span>
            <span className='loan-control'>{loan.emi_amount}</span>
          </div>
          <div className='col d-flex flex-column'>
            <span className='form-label'>Payment frequency</span>
            <span className='loan-control'>{loan.payment_freq}</span>
          </div>
          <div className='col d-flex flex-column'>
            <span className='form-label'>Term</span>
            <span className='loan-control'>{loan.term}</span>
          </div>
        </div>

      </div>

      {/* Loan History */}
      <div className='row mt-3' style={{height:'100%'}}>
        <h6>Transaction history</h6>
        <div className='scroll-bar px-3 ' style={{minHeight:'90%', maxHeight:'90%', overflowY:'auto'}}>
          <table className='table shadow'>
            <thead style={{position:'sticky', top:'0', zIndex:'1', backgroundColor:'white'}}>
              <tr>
                <th>Date</th>
                <th>Action</th>
                <th>Description</th>
                <th className='text-end'>Old data</th>
                <th className='text-end'>New data </th>
                <th className='text-end'>Credit</th>
                <th className='text-end'>Debit</th>
                <th className='text-end'>Balance amount</th>
              </tr>
            </thead>
            <tbody>
              {loanJournal.length>0?
                loanJournal.map((journal,index)=>(
                  <tr key={journal.journal_id}>
                    <td>{journal.journal_date}</td>
                    <td>{journal.action_type}</td>
                    <td>{journal.description}</td>
                    <td className='text-end'>{journal.old_data}</td>
                    <td className='text-end'>{journal.new_data}</td>
                    <td className='text-end'>{journal.credit>0?journal.credit:'-'}</td>
                    <td className='text-end'>{journal.debit>0?journal.debit:'-'}</td>
                    <td className='text-end'>{journal.balance_amount}</td>
                  </tr>
                ))
              :
                <tr className='text-center'><td colSpan='8'>No Journal found</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>


    </div>
  )
}

