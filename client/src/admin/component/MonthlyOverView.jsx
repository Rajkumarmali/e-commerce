import React from 'react'
import { AccountCircle, TrendingUp, } from '@mui/icons-material';
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const salesData = [
    { states: '245k', title: 'Sales', color: "primary", icone: <TrendingUp sx={{ fontSize: '1.75rem' }} /> },
    { states: '12.5k', title: 'Customer', color: "success", icone: <AccountCircle sx={{ fontSize: '1.75rem' }} /> },
    { states: '1.5k', title: 'Products', color: "warning", icone: <SettingsCellIcon sx={{ fontSize: '1.75rem' }} /> },
    { states: '88k', title: 'Revenue', color: "info", icone: <AttachMoneyIcon sx={{ fontSize: '1.75rem' }} /> },
]

const renderStates = () => {
    return salesData.map((item, index) =>
        <Grid item sx={12} sm={3} key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} >
                <Avatar variant='rounded' sx={{ mr: 3, width: 44, height: 44, boxShadow: 3, backgroundColor: `${item.color}.main` }}>
                    {item.icone}
                </Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} className="text-left">
                    <Typography variant='caption'>{item.title}</Typography>
                    <Typography variant='h6'>{item.states}</Typography>
                </Box>
            </Box>
        </Grid>
    )
}

const MonthlyOverView = () => {
    return (
        <Card sx={{
            width: "87vh",
            textAlign: "left",
            bgcolor: '#242B2E',
            color: 'white'
        }} >
            <CardHeader title="Monthly Overview"
                action={
                    <IconButton size='small' sx={{ color: "white" }}>
                        <MoreVertIcon />
                    </IconButton>
                }
                subheader={
                    <Typography variant='body2'>
                        <Box component="span" sx={{ fontWeight: 650 }}>
                            Total 48.5% growth
                        </Box>
                    </Typography>
                }
                titleTypographyProps={{
                    sx: {
                        mb: 2.5,
                        lineHeight: '0.7rem !important',
                        letterSpacing: '.15px !important'
                    }
                }}
            />
            <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
                <Grid container
                    sx={{
                        justifyContent: "space-between"
                    }}>
                    {renderStates()}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default MonthlyOverView
