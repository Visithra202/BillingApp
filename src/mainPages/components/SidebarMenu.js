import React, { useState } from 'react'
import { Link } from "react-router-dom";

export default function SidebarMenu() {
    const [openMenu, setOpenMenu] = useState("");

    const handleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? "" : menu);
    };

    return (
        <>
            <ul className='list-unstyled ps-2 fs-6'>
                {/* Dashboard */}
                <li className='list-item'>
                    <Link to='dashboard' className='text-decoration-none text-light'>
                        <span><i className="bi bi-speedometer me-3"></i> Dashboard</span>
                    </Link>
                </li>

                {/* Sales */}
                <li className='list-item mt-3'>
                    <a href='#sales' className='text-decoration-none text-light d-flex justify-content-between align-items-end' onClick={() => handleMenu('sales')}>
                        <span><i className="bi bi-graph-up-arrow me-3"></i> Sales</span>
                        <i className={`bi ${openMenu === "sales" ? "bi-chevron-up" : "bi-chevron-down"}`} style={{ fontSize: '12px' }}></i>
                    </a>

                    <div id='sales' className={`collapse ${openMenu === "sales" ? "show" : ""}`}>
                        <SalesMenu />
                    </div>
                </li>

                {/* Purchase */}
                <li className='list-item mt-3'>
                    <a href='#purchase' className='text-decoration-none text-light d-flex justify-content-between align-items-end' onClick={() => handleMenu('purchase')}>
                        <span><i className="bi bi-bag-fill me-3"></i> Purchase</span>
                        <i className={`bi ${openMenu === "purchase" ? "bi-chevron-up" : "bi-chevron-down"}`} style={{ fontSize: '12px' }}></i>
                    </a>

                    <div id='purchase' className={`collapse ${openMenu === "purchase" ? "show" : ""}`}>
                        <PurchaseMenu />
                    </div>
                </li>

                {/* Stocks */}
                <li className='list-item mt-3'>
                    <a href='#stocks' className='text-decoration-none text-light d-flex justify-content-between align-items-end' onClick={() => handleMenu('stocks')}>
                        <span><i className="bi bi-cart-fill me-3"></i> Stocks</span>
                        <i className={`bi ${openMenu === "stocks" ? "bi-chevron-up" : "bi-chevron-down"}`} style={{ fontSize: '12px' }}></i>
                    </a>

                    <div id='stocks' className={`collapse ${openMenu === "stocks" ? "show" : ""}`}>
                        <StocksMenu />
                    </div>
                </li>

                {/* Master Data */}
                <li className='list-item mt-3'>
                    <a href='#masterData' className='text-decoration-none text-light d-flex justify-content-between align-items-end' onClick={() => handleMenu('masterData')}>
                        <span><i className="bi bi-database-fill-gear me-3"></i> Master data</span>
                        <i className={`bi ${openMenu === "masterData" ? "bi-chevron-up" : "bi-chevron-down"}`} style={{ fontSize: '12px' }}></i>
                    </a>

                    <div id='masterData' className={`collapse ${openMenu === "masterData" ? "show" : ""}`}>
                        <MasterDataMenu />
                    </div>
                </li>

                {/* Customers */}
                <li className='list-item mt-3'>
                    <a href='#customer_seller' className='text-decoration-none text-light d-flex justify-content-between align-items-end' onClick={() => handleMenu('customer_seller')}>
                        <span><i className="bi bi-people-fill me-3"></i> Customers & Sellers</span>
                        <i className={`bi ${openMenu === "customer_seller" ? "bi-chevron-up" : "bi-chevron-down"}`} style={{ fontSize: '12px' }}></i>
                    </a>

                    <div id='customer_seller' className={`collapse ${openMenu === "customer_seller" ? "show" : ""}`}>
                        <CustomerSellerMenu />
                    </div>

                </li>

                {/* Loan */}
                <li className='list-item mt-3'>
                    <a href='#loan' className='text-decoration-none text-light d-flex justify-content-between align-items-end' onClick={() => handleMenu('loan')}>
                        <span><i className="bi bi-bank2 me-3"></i> Loan</span>
                        <i className={`bi ${openMenu === "loan" ? "bi-chevron-up" : "bi-chevron-down"}`} style={{ fontSize: '12px' }}></i>
                    </a>

                    <div id='loan' className={`collapse ${openMenu === "loan" ? "show" : ""}`}>
                        <LoanMenu />
                    </div>
                </li>

            </ul>
        </>
    )
}


function LoanMenu() {
    return (
        <ul className='menu-icon list-unstyled ps-4 ms-2'>
            <li className='pt-1'>
                <Link to='createLoan' className='text-decoration-none text-light'>
                    <span><i className="bi bi-bag-fill me-2"></i>Create loan</span>
                </Link>
            </li>
            <li className='pt-1'>
                <Link to='loanList' className='text-decoration-none text-light'>
                    <span><i className="bi bi-list-check me-2"></i>Loan list</span>
                </Link>

            </li>
            <li className='pt-1'>
                <Link to='loanDetails' className='text-decoration-none text-light'>
                    <span><i className="bi bi-ticket-detailed me-2"></i>Loan details</span>
                </Link>
            </li>
            <li className='pt-1'>
                <Link to='loanCollection' className='text-decoration-none text-light'>
                    <span><i className="bi bi-collection me-2"></i>Loan collection</span>
                </Link>
            </li>
        </ul>
    )
}

function SalesMenu() {
    return (
        <ul className='menu-icon list-unstyled ps-4 ms-2'>
            <li className='pt-1'>
                <Link to='addSale' className='text-decoration-none text-light'>
                    <span><i className="bi bi-bag-fill me-2"></i>Add sale</span>
                </Link>
            </li>
            <li className='pt-1'>
                <Link to='saleList' className='text-decoration-none text-light'>
                    <span><i className="bi bi-list-check me-2"></i>Sales list</span>
                </Link>

            </li>
            <li className='pt-1'>
                <Link to='saleDetails' className='text-decoration-none text-light'>
                    <span><i className="bi bi-ticket-detailed me-2"></i>Sales details</span>
                </Link>
            </li>
        </ul>
    )
}

function PurchaseMenu() {
    return (
        <ul className='menu-icon list-unstyled ps-4 ms-2'>
            <li className='pt-1'>
                <Link to='addPurchase' className='text-decoration-none text-light'>
                    <span><i className="bi bi-bag-plus me-2"></i>Add purchase</span>
                </Link>
            </li>
            <li className='pt-1'>
                <Link to='purchaseList' className='text-decoration-none text-light'>
                    <span><i className="bi bi-list-check me-2"></i>Purchase list</span>
                </Link>

            </li>
            <li className='pt-1'>
                <Link to='purchaseDetails' className='text-decoration-none text-light'>
                    <span><i className="bi bi-ticket-detailed me-2"></i>Purchase details</span>
                </Link>
            </li>
        </ul>
    )
}


function StocksMenu() {
    return (
        <ul className='menu-icon list-unstyled ps-4 ms-2'>
            <li className='pt-1'>
                <Link to='addItem' className='text-decoration-none text-light'>
                    <span><i className="bi bi-bag-plus me-2"></i>Add Item</span>
                </Link>
            </li>
            <li className='pt-1'>
                <Link to='stockList' className='text-decoration-none text-light'>
                    <span><i className="bi bi-list-check me-2"></i>Stock list</span>
                </Link>
            </li>
        </ul>
    )
}

function MasterDataMenu() {
    return (
        <ul className='menu-icon list-unstyled ps-4 ms-2'>
            <li className='pt-1'>
                <Link to='categories' className='text-decoration-none text-light'>
                    <span><i className="bi bi-bookmark-plus me-2"></i>Categories</span>
                </Link>
            </li>
            <li className='pt-1'>
                <Link to='brands' className='text-decoration-none text-light'>
                    <span><i className="bi bi-substack me-2"></i>Brands</span>
                </Link>
            </li>
            <li className='pt-1'>
                <Link to='users' className='text-decoration-none text-light'>
                    <span><i className="bi bi-person-square me-2"></i>Users</span>
                </Link>
            </li>
        </ul>
    )
}

function CustomerSellerMenu() {
    return (
        <ul className='menu-icon list-unstyled ps-4 ms-2'>
            <li className='pt-1'>
                <Link to='customerData' className='text-decoration-none text-light'>
                    <span><i className="bi bi-bookmark-plus me-2"></i>Customer data</span>
                </Link>
            </li>
            <li className='pt-1'>
                <Link to='sellerData' className='text-decoration-none text-light'>
                    <span><i className="bi bi-substack me-2"></i>Seller data</span>
                </Link>
            </li>
        </ul>
    )
}