import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './features/Dashboard'
import AddItem from './features/stocks/AddItem'
import Categories from './features/master_data/Categories'
import Brands from './features/master_data/Brands'
import StockList from './features/stocks/StockList'
import EditItem from './features/stocks/EditItem'
import CustomerData from './features/customers/CustomerData'
import AddSale from './features/sales/AddSale'
import SaleList from './features/sales/SaleList'
import CreateLoan from './features/loan/CreateLoan'
import LoanList from './features/loan/LoanList'
import AddPurchase from './features/purchase/AddPurchase'
import PurchaseList from './features/purchase/PurchaseList'
import SellerData from './features/sellers/SellerData'
// import Login from './components/Login'
import Users from './features/master_data/Users'
import SaleDetails from './features/sales/SaleDetails'
import LoanDetails from './features/loan/LoanDetails'
import PrintSale from './features/sales/PrintSale'

export default function AppRoutes() {
  return (
    <div>
      <Routes>

        {/* login
        <Route path='/login' element={<Login/>}></Route> */}
        
        {/* dashboard  */}
        <Route path='/dashboard' element={<Dashboard />}></Route>

        {/* sale */}
        <Route path='/addSale' element={<AddSale />}></Route>
        <Route path='/saleList' element={<SaleList />}></Route>
        <Route path='/saleDetails' element={<SaleDetails/>}></Route>
        <Route path='/printSale' element={<PrintSale/>}></Route>


        {/* purchase */}
        <Route path='/addPurchase' element={<AddPurchase />}></Route>
        <Route path='/purchaseList' element={<PurchaseList />}></Route>


        {/* Item */}
        <Route path='/addItem' element={<AddItem />}></Route>
        <Route path='/editItem' element={<EditItem />}></Route>
        <Route path='/stockList' element={<StockList />}></Route>

        {/* master data */}
        <Route path='/categories' element={<Categories />}></Route>
        <Route path='/brands' element={<Brands />}></Route>
        <Route path='/users' element={<Users />}></Route>

        {/*customer */}
        <Route path='/customerData' element={<CustomerData />}></Route>

        {/* seller */}
        <Route path='/sellerData' element={<SellerData />}></Route>


        {/* loan */}
        <Route path='/createLoan' element={<CreateLoan />}></Route>
        <Route path='/loanList' element={<LoanList />}></Route>
        <Route path='/loanDetails' element={<LoanDetails />}></Route>


      </Routes>
    </div>
  )
}
