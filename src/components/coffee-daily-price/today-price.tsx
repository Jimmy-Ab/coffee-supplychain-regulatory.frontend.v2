import { Avatar, Card, Box, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Spin, Table, Tag, Space, Button } from 'antd';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import millify from "millify";
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { PriceResult } from '@/features/price/PriceSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { DeleteDailyPrice, FetchMonthlyPrice, FetchYearlyPrices, GetAllDailyPrice } from '@/api/price';
import SetCoffeePrice from './set-coffee-price';

function TodayPrice() {

    const columns: ColumnsType<PriceResult> = [
        {
            title: 'Coffee Type',
            dataIndex: 'coffeeType',
            key: 'coffeeType',
            render: (_, result) => (
                <>{result.Record.coffeeType}</>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, result) => (
                <>{millify(Number(result.Record.price))}{result.Record.currency} / {result.Record.measurmentUnit}</>
            ),
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
            render: (_, result) => (
                <Tag color="green">{result.Record.grade}</Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, result) => (
                <Space size="small">
                    <Button icon={<EditFilled />} onClick={() => HandleEdit(result.Key)} type="link" />
                    {toBeDeleted === result.Record.id ? <Spin size="small" /> : <Button icon={<DeleteFilled />} type="link" danger ghost onClick={() => HandleDelete(result.Record.id, result.Record.date)} />}

                </Space>
            ),
        },
    ];
    const dispatch = useAppDispatch();
    const coffeeDailyPrice = useAppSelector(state => state.coffeePrice.dailyCoffeePrice.result);
    const loadingDailyPrice = useAppSelector(state => state.coffeePrice.loadingDailyPrice);
    const [latest, setLattest] = useState<PriceResult>();
    const [priceToBeEdited, setPriceToBeEdited] = useState<any>();
    const [toBeDeleted, setToBeDeleted] = useState("");
    const [year, setYear] = useState(new Date().getFullYear().toString());

    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);


    const HandleEdit = (key: string) => {
        setPriceToBeEdited(coffeeDailyPrice?.find(pr => pr.Key === key));
        setEdit(true);
        setOpen(true);
    }
    const HandleDelete = async (id: string, date: string) => {
        let mon = new Date().getUTCMonth() + 1;
        setToBeDeleted(id);
        await dispatch(DeleteDailyPrice({ id: id, date: date }));
        coffeeDailyPrice.filter(pr => pr.Record.id !== id);
        dispatch(GetAllDailyPrice());
        dispatch(FetchMonthlyPrice({ month: mon.toString(), year: year }));
        dispatch(FetchYearlyPrices(year));
    }
    useEffect(() => {
        dispatch(GetAllDailyPrice());
        setLattest(coffeeDailyPrice[0]);
        console.log(latest)
    }, [coffeeDailyPrice.length]);

    return (
        <>
            <Card>
                <Grid style={{ marginBottom: 10 }} container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={8}>
                        <CardHeader title="Daily Price" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                p: 2
                            }}
                        >
                            <SetCoffeePrice
                                setPriceToBeEdited={setPriceToBeEdited}
                                priceToBeEdited={priceToBeEdited}
                                setOpen={setOpen}
                                open={open}
                                setEdit={setEdit}
                                edit={edit}
                                dispatch={dispatch}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <CardContent>
                    <Grid
                        container
                        // spacing={3}
                        sx={{ justifyContent: 'space-between' }}
                    >
                        <Grid item>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                LATEST PRICE
                            </Typography>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                {millify(Number(latest?.Record?.price))}
                                {/* $24k */}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Avatar
                                sx={{
                                    backgroundColor: 'success.main',
                                    height: 56,
                                    width: 56
                                }}
                            >
                                <AttachMoneyIcon />
                            </Avatar>
                        </Grid>
                    </Grid>
                </CardContent>

                <Table bordered={false} size={'small'} tableLayout="auto" loading={loadingDailyPrice} rowKey="Key" columns={columns} dataSource={coffeeDailyPrice} />
            </Card>
        </>
    );
}

export default TodayPrice;