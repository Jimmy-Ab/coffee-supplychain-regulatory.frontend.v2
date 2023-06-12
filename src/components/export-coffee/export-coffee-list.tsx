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
import { CoffeeIndResult, ExportCoffeeResult } from '@/features/export-coffee/exportCoffeeSlice';
import { ProducedCoffeeResult } from '@/features/supply/supplySlice';
import { GetAllExportCoffee, GetAllIndExportCoffee } from '@/api/export-coffee';
import NextLink from 'next/link';
import SimpleBar from 'simplebar-react';
import { GetAllProducedCoffee } from '@/api/supply';
import { ExportCoffeeToolbar } from './export-coffee-toolbar';
import dateFormat from 'dateformat';
import { GetAllGrowers } from '@/api/grower';

function ExportCoffeeList() {
    const dispatch = useAppDispatch();
    const exportCoffees = useAppSelector(state => state.exportCoffee.exportCoffee.response);
    const coffeeInds = useAppSelector(state => state.exportCoffee.coffeeInd.response);
    const supplyCoffees = useAppSelector(state => state.supply.producedCoffee.result);

    const loading = useAppSelector(state => state.exportCoffee.loading);

    const [filteredExportCoffees, setFilteredExportCoffees] = useState<ExportCoffeeResult[]>([]);
    const [filteredCoffeeInds, setFilteredCoffeeInds] = useState<CoffeeIndResult[]>([]);
    const [filteredSupplyCoffees, setFilteredSupplyCoffees] = useState<ProducedCoffeeResult[]>([]);


    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const handleLimitChange = (event: any) => {
        setRowsPerPage(event.target.value);

    };
    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const FilterDatas = () => {
        const filteredExportCoffees = exportCoffees.filter((value, index, self) =>
            self.findIndex(v => v.Record.batchNumber === value.Record.batchNumber) === index
        );
        setFilteredExportCoffees(filteredExportCoffees);

        const filteredSupply = supplyCoffees.filter((value, index, self) =>
            self.findIndex(v => v.Record.batchNumber === value.Record.batchNumber) === index
        );
        setFilteredSupplyCoffees(filteredSupply);

        const filteredInds = coffeeInds.filter((value, index, self) =>
            self.findIndex(v => v.Record.address === value.Record.address) === index
        );
        setFilteredCoffeeInds(filteredInds);
    }

    const onSearch = (event: any) => {

        let exps = exportCoffees?.filter(exp =>
            exp.Record.bagSize?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            exp.Record.batchNumber?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            exp.Record.coffeeType?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            exp.Record.owner?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            exp.Record.productionPlace?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            exp.Record.status?.toLowerCase().includes(event.target.value.toLowerCase())

        )
        setFilteredExportCoffees(exps);
    }


    useEffect(() => {
        const FetchData = async () => {
            await dispatch(GetAllExportCoffee());
            await dispatch(GetAllIndExportCoffee());
            await dispatch(GetAllProducedCoffee());
            dispatch(GetAllGrowers());
        }

        FetchData();
        FilterDatas()
    }, [exportCoffees.length])
    return (
        <Box>
            <Card
                sx={{
                    p: 4
                }}>
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                >
                    <ExportCoffeeToolbar
                        onSearch={onSearch}
                        filteredCoffeeInds={filteredCoffeeInds}
                        filteredSupplyCoffees={filteredSupplyCoffees}
                    />
                </Stack>
                <Box>
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
                                                Batch Number
                                            </TableCell>
                                            <TableCell>
                                                Quantity
                                            </TableCell>
                                            <TableCell>
                                                Coffee Type
                                            </TableCell>
                                            <TableCell>
                                                Bag Size
                                            </TableCell>
                                            <TableCell>
                                                Owner
                                            </TableCell>
                                            <TableCell>
                                                Production Date
                                            </TableCell>
                                            <TableCell>
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredExportCoffees?.
                                            slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage).
                                            map((exportCoffee) => (
                                                <TableRow
                                                    hover
                                                    key={exportCoffee.Key}
                                                >
                                                    <TableCell>
                                                        {exportCoffee.Record.batchNumber}
                                                    </TableCell>
                                                    <TableCell>
                                                        {exportCoffees.filter(ec => ec.Record.batchNumber === exportCoffee.Record.batchNumber).length || "NaN"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {exportCoffee.Record.coffeeType}
                                                    </TableCell>
                                                    <TableCell>
                                                        {exportCoffee.Record.bagSize}
                                                    </TableCell>

                                                    <TableCell>
                                                        {exportCoffee.Record.owner}
                                                    </TableCell>
                                                    <TableCell>
                                                        {exportCoffee.Record.productionDate.replaceAll('-', '/')}
                                                    </TableCell>

                                                    <TableCell>
                                                        <NextLink
                                                            href={`export-coffee/detail?batch_number=${exportCoffee.Record.batchNumber}`}
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
                            </SimpleBar>
                            <TablePagination
                                component="div"
                                count={filteredExportCoffees.length}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleLimitChange}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                            />
                        </Box>
                    }
                </Box>
            </Card>
        </Box>
    )
}

export default ExportCoffeeList;