import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';

export default function CreateLoan() {
    const [loanFormData, setLoanFormData] = useState({});
    const [searchCustomer, setSearchCustomer] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!searchCustomer.customer_name||!searchCustomer.mph){
            alert('Please select a customer or add customer')
            return;
        }
        
        const loanData={
            ...loanFormData,
            customer:searchCustomer
        }

        try {
            await axios.post('http://localhost:8000/create-loan/', loanData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            alert('Loan Created successfully')
            handleReset();
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.non_field_errors);
            } else {
                alert("Something went wrong!");
            }
        }
    }

    const handleReset = () => {
        setLoanFormData('');
        setSearchCustomer('')
    }

    return (
        <div className='container'>
            <form className='bg-white my-2 mx-4  rounded-5 shadow' autoComplete='off' onSubmit={handleSubmit}>

                <h5 className='text-center rounded-top-5 p-2  text-light ' style={{ backgroundColor: 'rgba(61, 60, 60, 0.73)' }}>Create Loan</h5>

                <div className='p-3'>
                    {/* customer */}
                    <div className='border rounded px-4 py-3 mt-3 position-relative'>
                        <CustomerSelection searchCustomer={searchCustomer} setSearchCustomer={setSearchCustomer} />
                    </div>

                    {/* loan details */}
                    <div className='border rounded px-4 py-3 mt-4 position-relative'>
                        <LoanCreation loanFormData={loanFormData} setLoanFormData={setLoanFormData} />
                    </div>

                    {/* buttons */}
                    <div className='d-flex justify-content-center mt-3'>
                        <button type='submit' className="btn btn-success rounded-pill p-1 px-4 mx-2">Save</button>
                        <button type="button" className="btn btn-secondary rounded-pill p-1 px-4 mx-2" onClick={handleReset}>Reset</button>
                    </div>

                </div>

            </form>
        </div>
    )
}

function LoanCreation({ loanFormData, setLoanFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!["payment_frequency", "next_payment_date"].includes(name) && !/^\d*$/.test(value)) {
            return;
        }
        setLoanFormData({ ...loanFormData, [name]: value });
    };


    return (
        <>
            <h5 className="loan-title">Loan details</h5>
            <div className='row'>
                <div className="col">
                    <label className="form-label">Loan amount</label>
                    <input type="text" name="loan_amount" className="form-control"
                        value={loanFormData.loan_amount || ''} onChange={handleChange} required />
                </div>
                <div className="col">
                    <label className="form-label">Advance amount</label>
                    <input type="text" name="advance_amount" className="form-control"
                        value={loanFormData.advance_amount || ''} onChange={handleChange} required />
                </div>
                <div className="col">
                    <label className="form-label">Emi amount</label>
                    <input type="text" name="emi_amount" className="form-control"
                        value={loanFormData.emi_amount || ''} onChange={handleChange} required />
                </div>
            </div>

            <div className='row mt-2'>
                <div className="col">
                    <label className="form-label">Term</label>
                    <input type="text" name="term" className="form-control"
                        value={loanFormData.term || ''} onChange={handleChange} required />
                </div>
                <div className="col">
                    <label className="form-label">Payment frequency</label>
                    <select name="payment_frequency" className="form-control"
                        value={loanFormData.payment_frequency || ''} onChange={handleChange} required>
                        <option disabled value="">Select Frequency</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>
                <div className="col">
                    <label className="form-label">Total with interest</label>
                    <input type="text" name="total_with_interest" className="form-control"
                        value={loanFormData.total_with_interest || ''} onChange={handleChange} required />
                </div>
            </div>

            <div className='row mt-2'>
                <div className="col">
                    <label className="form-label">Due pending</label>
                    <input type="text" name="due_pending" className="form-control"
                        value={loanFormData.due_pending || ''} onChange={handleChange} required />
                </div>
                <div className="col">
                    <label className="form-label">Balance amount</label>
                    <input type="text" name="balance_amount" className="form-control"
                        value={loanFormData.balance_amount || ''} onChange={handleChange} required />
                </div>
                <div className="col">
                    <label className="form-label">Next payment date</label>
                    <input type="date" name="next_payment_date" className="form-control"
                        value={loanFormData.next_payment_date || ''} onChange={handleChange} required />
                </div>
            </div>
        </>
    );
}


function CustomerSelection({ searchCustomer, setSearchCustomer }) {
    const [customers, setCustomers] = useState([]);
    const [customerDropdown, setCustomerDropdown] = useState(false);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/get-customer-list/')
            .then((response) => {
                setCustomers(response.data);
                setLoading(false);
            }).catch((error) => {
                console.error('Error Getting Customers:', error);
                setLoading(false);
            });
    }, []);

    const handleCustomerChange = (e) => {
        const search = e.target.value.trim().toLowerCase(); // Ensure proper search formatting
        setSearchCustomer((prev) => ({ ...prev, customer_name: e.target.value })); 
        setCustomerDropdown(true);
    
        if (search === "") {
            setFilteredCustomers([]);
            return;
        }
    
        if (customers?.length > 0) {
            const filtered = customers.filter((cust) =>
                (`${cust.customer_name} ${cust.mph}`.toLowerCase().includes(search))
            );
    
            setFilteredCustomers(filtered);
        }
    
    };
    

    const handleCustomer = (customer) => {
        setSearchCustomer(customer);
        setCustomerDropdown(false);
    };

    return (
        <>
            <h5 className="loan-title">Customer details</h5>
            <div className='row '>
                <div className="col col-md-4">
                    <label className="form-label">Customer name</label>
                    <input type="text" name="customer_name" className="form-control"
                        value={searchCustomer.customer_name || ''} onChange={handleCustomerChange} required />
                </div>
                <div className="col col-md-4">
                    <label className="form-label">Mobile number</label>
                    <input type="text" name="mph" className="form-control"
                        value={searchCustomer.mph || ''} disabled />
                </div>
                <div className='col col-md-4 d-flex align-items-end' >
                    <button type='button' className="btn mx-1" style={{ backgroundColor: 'antiquewhite' }}
                        onClick={() => navigate('/customerData', { state: { from: '/createLoan' } })}>+ Add Customer</button>
                    {/* <button type="button" className="btn btn-secondary rounded-pill mx-1">Add payment</button> */}
                </div>
            </div>

            {customerDropdown && searchCustomer?.customer_name?.length > 0 && (
                <div className='dropdown-menu show mt-1' style={{ maxHeight:'200px', overflowY:'auto' }}>
                    <table className='table table-hover' style={{width:'285px'}}>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Mobile Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers?.length > 0 ? (
                                    loading ? (
                                        <tr><td colSpan='2' ><Loader size='sm' message='Fetching customers' /></td></tr>
                                    ) : (
                                        filteredCustomers.length > 0 ? (
                                            filteredCustomers.map((customer, index) => (
                                                <tr key={index} className='custom-hover' onClick={() => handleCustomer(customer)}>
                                                    <td>{customer?.customer_name}</td>
                                                    <td>{customer?.mph}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="text-center">Matches not found</td>
                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr><td colSpan="2" className="text-center">Customers not found</td></tr>
                                    // ( No Customers)
                                )
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
