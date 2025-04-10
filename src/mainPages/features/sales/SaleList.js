import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

export default function SaleList() {
    const [saleList, setSaleList] = useState([]);
    // const [reload, setReload] = useState(true)
    const navigate = useNavigate();

    const [saleItems, setSaleItems] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/get-sale-list/')
            .then((response) => {
                setSaleList(response.data)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error Fetching Sales')
            })
        
        axios.get('http://localhost:8000/get-sale-items-list/')
            .then(response => {
                setSaleItems(response.data)
            })
            .catch(error => {
                console.error('Error Fetching SaleItems ' + error)
            })
        axios.get('http://localhost:8000/get-stock-list/')
            .then(response => setItems(response.data))
            .catch(error => {
                console.error('Error Fetching Items ' + error)
            })
    }, [])

    const handlePrint = (sale, string) => {
        const customer = sale.customer

        const sale_products = saleItems
            .filter(saleItem => saleItem.sale === sale.bill_no)
            .map(saleItem => {
                const item = items.find(it => (it.item_id === saleItem.product))
                return {
                    item_name: item.item_name,
                    ...saleItem,

                };
            });

        if (string === 'print') {
            navigate('/printSale', {
                state: {
                    sale,
                    customer,
                    sale_products,
                    from: '/saleList',
                }
            });
            return;
        }
        else if (string === 'details') {
            navigate('/saleDetails', {
                state: {
                    sale,
                    customer,
                    sale_products,
                }
            });
            return;
        }

    };




    return (
        <div className='container-fluid'>

            <div className='border border-secondary bg-white rounded-5 shadow  my-2 scroll-bar'
                style={{ minHeight: '565px', maxHeight: '565px', overflowY: 'auto' }}>
                <table className='itmlst table table-hover'>
                    <thead className=' rounded-top-5' style={{ position: 'sticky', top: '0', zIndex: '1' }}>
                        <tr>
                            <th>Bill No</th>
                            <th>Sale date</th>
                            <th>Customer</th>
                            <th>Products</th>
                            <th>Payment type</th>
                            <th className='text-end'>Total amount</th>
                            <th className='text-end'>Discount</th>
                            <th className='text-end'>Balance</th>
                            {/* <th className='text-center'>Action</th> */}
                            <th>Print</th>
                        </tr>
                    </thead>

                    <tbody className='px-4 py-1'>
                        {
                            loading ? (
                                <tr><td colSpan='9'><Loader message='Fetching Sale Items' /></td></tr>
                            ) : (
                                saleList.length > 0 ? (
                                    saleList.map((sale, index) => (
                                        <tr key={index}>
                                            <td className='text-primary' onClick={() => handlePrint(sale, 'details')}>{sale.bill_no}</td>
                                            <td>{sale.sale_date}</td>
                                            <td>
                                                {sale.customer?.customer_name || ""}
                                            </td>
                                            <td>
                                                {(() => {
                                                    let prods = '';
                                                    saleItems.forEach(saleItem => {
                                                        if (saleItem.sale === sale.bill_no) {
                                                            const item = items.find(it => it.item_id === saleItem.product);
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
                                                    const payment = sale.payment;
                                                    if (!payment) return '-';
                                                    if (payment.cash > 0) ans += 'Cash';
                                                    if (payment.account > 0) ans += (ans ? ' & Account' : 'Account');
                                                    if (payment.credit > 0) ans += (ans ? ' & Credit' : 'Credit');
                                                    return ans || '-';
                                                })()}
                                            </td>
                                            <td className='text-end'>{sale.total_amount}</td>
                                            <td className='text-end'>{sale.discount}</td>
                                            <td className='text-end'>{sale.balance}</td>
                                            {/* <td className='text-center'>
                                                <i className="bi bi-pencil-square text-primary mx-1" style={{ cursor: 'pointer' }}
                                                    onClick={() => navigate('/editItem', { state: { sale } })}></i>
                                                <i className="bi bi-trash-fill text-danger mx-1" style={{ cursor: 'pointer' }} onClick={() => handleDelete(sale)}></i>
                                            </td> */}
                                            <td className="text-center">
                                                <i
                                                    className="bi bi-printer-fill"
                                                    onClick={() => handlePrint(sale, 'print')}
                                                ></i>
                                            </td>
                                        </tr>
                                    ))

                                ) : (
                                    <tr className='text-center'><td colSpan='9'>No Sale Found</td></tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
