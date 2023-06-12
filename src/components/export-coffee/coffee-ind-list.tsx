import {
    Box,
    Button,
    Card,
    Divider,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { CoffeeIndToolbar } from './coffee-ind-toolbar';
import { CoffeeIndResult } from '@/features/export-coffee/exportCoffeeSlice';
import { GetAllIndExportCoffee } from '@/api/export-coffee';
import NextLink from 'next/link';
import SimpleBar from 'simplebar-react';

function CoffeeIndList() {
    const dispatch = useAppDispatch();
    const coffeeInds = useAppSelector(state => state.exportCoffee.coffeeInd.response);
    const loading = useAppSelector(state => state.exportCoffee.loading);

    const [filteredCoffeeInds, setFilteredCoffeeInds] = useState<CoffeeIndResult[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const handleLimitChange = (event: any) => {
        setRowsPerPage(event.target.value);

    };
    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const onSearch = (event: any) => {
        let inds = coffeeInds?.filter(ind =>
            ind.Record.address?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            ind.Record.machineSpec?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            ind.Record.name?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            ind.Record.owner?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            ind.Record.warehouseSize?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            ind.Record.size?.toLowerCase().includes(event.target.value.toLowerCase())

        )
        setFilteredCoffeeInds(inds);
    }

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(GetAllIndExportCoffee());
        }

        fetchData();

        setFilteredCoffeeInds(coffeeInds);
    }, [coffeeInds.length])
    return (
        <Card
            sx={{
                p: 4
            }}>
            <Stack
                alignItems="center"
                direction="row"
                spacing={1}
            >
                <CoffeeIndToolbar
                    onSearch={onSearch}
                />
            </Stack>
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
                        <Box>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Name
                                        </TableCell>
                                        <TableCell>
                                            Owner
                                        </TableCell>
                                        <TableCell>
                                            Address
                                        </TableCell>
                                        <TableCell>
                                            Size
                                        </TableCell>
                                        <TableCell>
                                            Machine Spec.
                                        </TableCell>
                                        <TableCell>
                                            Warehouse Size
                                        </TableCell>
                                        <TableCell>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredCoffeeInds?.
                                        slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage).
                                        map((ind) => (
                                            <TableRow
                                                hover
                                                key={ind.Key}
                                            >
                                                <TableCell>
                                                    {ind.Record.name}
                                                </TableCell>
                                                <TableCell>
                                                    {ind.Record.owner}
                                                </TableCell>
                                                <TableCell>
                                                    {ind.Record.address}
                                                    {/* {ind.Record.    longitude} , {ind.Record.latitude} */}
                                                </TableCell>
                                                <TableCell>
                                                    {ind.Record.size}
                                                </TableCell>
                                                <TableCell>
                                                    {ind.Record.machineSpec}
                                                </TableCell>
                                                <TableCell>
                                                    {ind.Record.warehouseSize}
                                                </TableCell>

                                                <TableCell>
                                                    <NextLink
                                                        href={`export-coffee/ind-detail?id=${ind.Record.id}`}
                                                        passHref
                                                        legacyBehavior
                                                    >
                                                        <Button
                                                            color="primary"
                                                        >
                                                            Details
                                                        </Button>
                                                    </NextLink>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </SimpleBar>
                    <TablePagination
                        component="div"
                        count={filteredCoffeeInds.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                    />
                </Box>

            }
        </Card>
    )
}

export default CoffeeIndList;