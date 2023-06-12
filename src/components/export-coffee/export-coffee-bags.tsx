import Head from 'next/head';
import {
    Box,
    Card,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useRouter } from 'next/router'
import { useAppSelector } from '@/app/store';
import { useEffect, useState } from 'react';
import { ProducedCoffeeResult,  } from '@/features/supply/supplySlice';
import { } from 'antd';
import { ExportCoffeeResult } from '@/features/export-coffee/exportCoffeeSlice';

function EXportCoffeeBags() {

    const exportCoffees = useAppSelector(state => state.exportCoffee.exportCoffee.response);

    const router = useRouter()
    const { batch_number } = router.query
    const [selectedExportCoffee, setSelectedExportCoffee] = useState<ExportCoffeeResult[]>([]);
    const [bagCount, setBagCount] = useState(0);
    const [page, setPage] = useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        setSelectedExportCoffee(exportCoffees.filter(g => g.Record.batchNumber === batch_number));
        setBagCount(selectedExportCoffee?.length || 0);
    })
    return (
        <>
            <Card
                sx={{
                    p: 4
                }}>
                <Typography
                    variant="h6"
                >
                    Bags({bagCount})
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Bag Id
                            </TableCell>
                            <TableCell>
                                Bag Size
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedExportCoffee?.slice((page - 1) * 10, (page - 1) * 10 + 10).map((ec) => (
                            <TableRow
                                key={ec.Key}
                            >
                                <TableCell>
                                    {ec.Record.bagId}
                                </TableCell>
                                <TableCell>
                                    {ec.Record.bagSize}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Pagination
                        count={Math.ceil(bagCount / 10)}
                        size="small"
                        page={page}
                        onChange={handleChange}
                        color="primary"
                    />
                </Box>
            </Card>
        </>
    )
}

export default EXportCoffeeBags;