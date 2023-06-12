import React, { useEffect, useState } from 'react';
import { Space, notification, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { WarehouseResult } from '../../features/warehouse/warehouseSlice';
import { fetchAllWarehouses } from '../../api/warehouse';
import { Table, Box, Card, Typography, Button as MaterialButton, TableHead, TableRow, TableCell, Tooltip, TableSortLabel, TableBody, Divider, TablePagination } from '@mui/material';
import Head from 'next/head';
import { WarehouseToolbar } from '@/components/coffee-warehouse/warehouse-toolbar';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { DashboardLayout } from '@/components/dashboard-layout';

function Page() {
    const dispatch = useAppDispatch();
    let warehouses = useAppSelector(state => state.warehouse.warehouses.response);
    const loading = useAppSelector(state => state.warehouse.loading);
    const error = useAppSelector(state => state.warehouse.error);
    const [filteredWarehouses, setFilteredWarehouses] = useState<WarehouseResult[]>();

    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const onSearch = (event: any) => {

        let whs = warehouses?.filter(warehouse =>
            warehouse.Record.address?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            warehouse.Record.name?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            warehouse.Record.capacity?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            warehouse.Record.owner?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            warehouse.Record.size?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            warehouse.Record.warehouseNo?.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredWarehouses(whs);
        console.log(filteredWarehouses)
    }
    const handleLimitChange = (event: any) => {
        setRowsPerPage(event.target.value);

    };
    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
        console.log(newPage);
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchAllWarehouses());
        }

        const openNotification = () => {
            notification.open({
                message: 'Something went Wrong',
                description: error,
                placement: 'bottomRight'
            });
        };

        fetchData();

        if (error) {
            openNotification();
        }

        setFilteredWarehouses(warehouses);

    }, [warehouses.length, error])
    return (
        <div style={{ margin: '20px 20px' }}>
            <Head>
                <title>
                    Warehouses | Adey supply-chain
                </title>
            </Head>
            <Typography
                sx={{ m: 1 }}
                variant="h4"
            >
                Warehouses
            </Typography>

            <Card
                sx={{
                    p: 4
                }}
            >

                <div>
                    <WarehouseToolbar
                        onSearch={onSearch}
                    />
                </div>
                {loading ?
                    <Box sx={{ padding: 0 }}>
                        <Skeleton active paragraph />
                        <Divider sx={{ my: 2 }} />
                        <Skeleton active />
                        <Divider sx={{ my: 2 }} />
                        <Skeleton active />
                    </Box>
                    :
                    <Box>
                        <SimpleBar>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Tooltip
                                                enterDelay={300}
                                                title="Sort"
                                            >
                                                <TableSortLabel
                                                    active
                                                    direction="desc"
                                                >
                                                    Name
                                                </TableSortLabel>
                                            </Tooltip>

                                        </TableCell>
                                        <TableCell>
                                            <Tooltip
                                                enterDelay={300}
                                                title="Sort"
                                            >
                                                <TableSortLabel
                                                    active
                                                    direction="desc"
                                                >
                                                    Capacity
                                                </TableSortLabel>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            Address
                                        </TableCell>
                                        <TableCell>
                                            Owner
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip
                                                enterDelay={300}
                                                title="Sort"
                                            >
                                                <TableSortLabel
                                                    active
                                                    direction="desc"
                                                >
                                                    Size
                                                </TableSortLabel>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell sortDirection="desc">
                                            <Tooltip
                                                enterDelay={300}
                                                title="Sort"
                                            >
                                                <TableSortLabel
                                                    active
                                                    direction="desc"
                                                >
                                                    Warehouse No
                                                </TableSortLabel>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredWarehouses?.slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage).map((warehouse) => (
                                        <TableRow
                                            hover
                                            key={warehouse.Key}
                                        >
                                            <TableCell>
                                                {warehouse.Record.name}
                                            </TableCell>
                                            <TableCell>
                                                {warehouse.Record.capacity}
                                            </TableCell>
                                            <TableCell>
                                                {warehouse.Record.address}
                                            </TableCell>
                                            <TableCell>
                                                {warehouse.Record.owner}
                                            </TableCell>
                                            <TableCell>
                                                {warehouse.Record.size}
                                            </TableCell>
                                            <TableCell>
                                                {warehouse.Record.warehouseNo}
                                            </TableCell>
                                            <TableCell>
                                                <Space size='small'>
                                                    <MaterialButton
                                                        component='a'
                                                        href={"https://maps.google.com/maps?q=" + warehouse?.Record.latitude + "," + warehouse?.Record.longitude + "&hl=en&z=14&amp;output=embed"}
                                                        // onClick={() => ViewMap(warehouse.Key)}
                                                        target="_blank"
                                                    >
                                                        View On Map
                                                    </MaterialButton>
                                                </Space>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </SimpleBar>
                        <TablePagination
                            component="div"
                            count={warehouses.length}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleLimitChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                        />
                    </Box>

                }
            </Card>
        </div>
    );
}
Page.getLayout = (page: any) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Page;


