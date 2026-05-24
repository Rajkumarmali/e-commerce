import React, { useState } from 'react'
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Dashboard from './component/Dashboard';
import CreateProductForm from './component/CreateProductForm';
import ProductTable from './component/ProductTable';
import OrdersTable from './component/OrdersTable';
import CustomerTable from './component/CustomerTable';

const menu = [
    { name: 'Dashboard', path: '/admin', icone: <DashboardOutlinedIcon /> },
    { name: 'Products', path: '/admin/products', icone: <ShoppingBagOutlinedIcon /> },
    { name: 'Customer', path: '/admin/customer', icone: <PeopleAltOutlinedIcon /> },
    { name: 'Orders', path: '/admin/orders', icone: <ReceiptLongOutlinedIcon /> },
    { name: 'AddProduct', path: '/admin/product/create', icone: <AddBoxOutlinedIcon /> }
]
const Admin = () => {

    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))
    const [sideBarVisible, setSideBarVisible] = useState(false);
    const navigate = useNavigate();

    const drawer = (
        <Box sx={{
            overflow: "auto ",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "space-between",
            height: "100%"
        }}
        >
            {/* {isLargeScreen && <Toolbar />} */}
            <List>
                {menu.map((item, index) =>
                    <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icone}
                            </ListItemIcon>
                            <ListItemText>
                                {item.name}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText>Account</ListItemText>
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    )



    return (
        <div>
            <div className='flex h-[100vh]'>
                <CssBaseline />
                <div className='w-[15%]  border border-r-gray-300 h-full'>
                    {drawer}
                </div>
                <div className='w-[85%]'>
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/product/create' element={<CreateProductForm />} />
                        <Route path='/products' element={<ProductTable />} />
                        <Route path='/orders' element={<OrdersTable />} />
                        <Route path='/customer' element={<CustomerTable />} />
                    </Routes>
                </div>

            </div>
        </div>
    )
}

export default Admin
