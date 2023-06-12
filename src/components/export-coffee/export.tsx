import { Tab, Tabs, Card, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CoffeeIndList from "./coffee-ind-list";
import ExportCoffeeList from "./export-coffee-list";
import { TabContext, TabList, TabPanel } from '@mui/lab';

export const ExportCoffee = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Export Coffee" value="1" />
                        <Tab label="Coffee Industry" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <ExportCoffeeList />
                </TabPanel>
                <TabPanel value="2">
                    <CoffeeIndList />
                </TabPanel>
            </TabContext>
        </Box>
    );
}