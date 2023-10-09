import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const Header = ({tabs, activeTab, setActiveTab}) => {

    const chooseTab = (item) => {
        setActiveTab(item);
    }
    
    return (
        <AppBar position="absolute">
            <Toolbar>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                CalcApp
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {tabs.map((item) => (
                <Button key={item} sx={{ color: '#fff', textDecoration: activeTab === item ? 'underline' : 'none' }} onClick={() => {chooseTab(item)}}>
                    {item}
                </Button>
                ))}
            </Box>

            </Toolbar>
        </AppBar>
    )
}

export default Header