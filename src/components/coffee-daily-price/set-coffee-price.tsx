import { PlusOutlined } from "@ant-design/icons";
import { Modal, Space } from "antd";
import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    TextField
} from '@mui/material';
import { UpdateCoffeeDailyPrice, SetCoffeeDailyPrice, GetAllDailyPrice, FetchMonthlyPrice, FetchYearlyPrices } from "@/api/price";
import { useAppSelector } from "@/app/store";
import { NewPrice } from "@/features/price/PriceSlice";

interface Props {
    setPriceToBeEdited: any
    priceToBeEdited: any
    setOpen: any
    open: boolean
    setEdit: any
    edit: boolean
    dispatch: any
}
const SetCoffeePrice: React.FC<Props> = ({ setPriceToBeEdited, priceToBeEdited, setOpen, open, setEdit, edit, dispatch }) => {

    // const dispatch = useAppDispatch();
    const settingPrice = useAppSelector(state => state.coffeePrice.settingPrice);
    const [year, setYear] = useState(new Date().getFullYear().toString());

    const [date, setDate] = useState("");
    const [coffeeType, setCoffeeType] = useState("");
    const [grade, setGrade] = useState("");
    const [price, setPrice] = useState("");
    const [currency, setCurrency] = useState("");
    const [measurmentUnit, setMeasurmentUnit] = useState("");

    const HandleSubmit = async () => {
        const newPrice: NewPrice = {
            id: priceToBeEdited?.Record.id,
            date: date,
            coffeeType: coffeeType,
            grade: grade,
            price: price,
            currency: currency,
            measurmentUnit: measurmentUnit

        }
        if (edit) {
            await dispatch(UpdateCoffeeDailyPrice(newPrice));
        }
        else {
            await dispatch(SetCoffeeDailyPrice(newPrice));
        }
        setOpen(false);
        setEdit(false);
        let mon = new Date().getUTCMonth() + 1;

        await dispatch(GetAllDailyPrice());
        dispatch(FetchMonthlyPrice({ month: mon.toString(), year: year }));
        dispatch(FetchYearlyPrices(year));
        ResetFields();
    }

    const onCancel = () => {
        setOpen(false);
        setEdit(false);
        ResetFields();
        setPriceToBeEdited(null);
    }
    const ResetFields = () => {
        setDate("");
        setCoffeeType("");
        setGrade("");
        setPrice("");
        setCurrency("");
        setMeasurmentUnit("");
    }

    useEffect(() => {
        if (edit) {
            setDate(priceToBeEdited.Record.date);
            setCoffeeType(priceToBeEdited.Record.coffeeType);
            setGrade(priceToBeEdited.Record.grade);
            setPrice(priceToBeEdited.Record.price);
            setCurrency(priceToBeEdited.Record.currency);
            setMeasurmentUnit(priceToBeEdited.Record.measurmentUnit);
        }
        else {
            ResetFields();
        }
    }, [priceToBeEdited, edit])

    return (
        <>
            <Button variant="contained" onClick={() => { setOpen(true) }}>Set Daily Price</Button>
            <Modal
                title={edit ? "Edit Daily Price" : "Set Coffee Daily Price"}
                // centered
                style={{ top: 70 }}

                open={open}
                onOk={() => setOpen(false)}
                onCancel={onCancel}
                width={700}
                footer={[

                ]}>
                <form
                    autoComplete="on"
                >
                    <Card>

                        <Divider />
                        <CardContent>
                            <Grid
                                container
                                spacing={2}
                            >
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        size='medium'
                                        margin="normal"
                                        type="date"
                                        label="Date"
                                        name="date"
                                        required

                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        size='medium'
                                        fullWidth
                                        margin="normal"
                                        label="Coffe Type"
                                        name="coffeeType"
                                        required

                                        value={coffeeType}
                                        onChange={(e) => setCoffeeType(e.target.value)}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        size='medium'
                                        fullWidth
                                        margin="normal"
                                        label="Coffee Grade"
                                        name="grade"
                                        required

                                        value={grade}
                                        onChange={(e) => setGrade(e.target.value)}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        size='medium'
                                        fullWidth
                                        type="number"
                                        margin="normal"
                                        label="Price"
                                        name="price"
                                        required

                                        value={price}
                                        onChange={(e) => setPrice(e.target.value.toString())}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        size='medium'
                                        fullWidth
                                        label="Currency"
                                        name="currency"
                                        required
                                        margin="normal"

                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        size='medium'
                                        fullWidth
                                        margin="normal"
                                        label="Measurment Unit"
                                        name="measurmentUnit"
                                        required

                                        value={measurmentUnit}
                                        onChange={(e) => setMeasurmentUnit(e.target.value)}
                                    >
                                    </TextField>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                paddingY: 3
                            }}
                        >
                            <Space>
                                <Button color="error" onClick={onCancel}>
                                    Close
                                </Button>
                                {settingPrice ? <CircularProgress /> :
                                    <Button
                                        color="primary"
                                        disabled={
                                            settingPrice ||
                                            date === "" ||
                                            coffeeType === "" ||
                                            grade === "" ||
                                            price === "" ||
                                            currency === "" ||
                                            measurmentUnit === ""}
                                        onClick={HandleSubmit}
                                    >
                                        Submit
                                    </Button>
                                }
                            </Space>
                        </Box>
                    </Card>
                </form>

            </Modal>
        </>
    );
}

export default SetCoffeePrice;