import { GetAllExportCoffee, GetAllIndExportCoffee, RegisterInd, RequestCoffeeExport } from "@/api/export-coffee";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { CoffeeIndResult } from "@/features/export-coffee/exportCoffeeSlice";
import { ProducedCoffeeResult } from "@/features/supply/supplySlice";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField
} from "@mui/material";
import { Modal, Space } from "antd";
import { useEffect, useState } from "react";

interface Props {
    filteredCoffeeInds: CoffeeIndResult[],
    filteredSupplyCoffees: ProducedCoffeeResult[],
}

export const ProduceExportCoffee:
    React.FC<Props> = ({
        filteredCoffeeInds,
        filteredSupplyCoffees
    }) => {
        const dispatch = useAppDispatch();
        const adding = useAppSelector(state => state.exportCoffee.adding);
        const loading1 = useAppSelector(state => state.exportCoffee.loading);
        const loading2 = useAppSelector(state => state.supply.loading);

        const [open, setOpen] = useState(false);
        const [values, setValues] = useState({
            quantity: '',
            bagSize: '',
            supplyCoffeeBatchNumber: '',
            unit: '',
            productionPlace: '',
            owner: "OrgexporterMSP"
        })

        const handleChange = (event: any) => {
            setValues({
                ...values,
                [event.target.name]: event.target.value
            })
        }

        const handleSubmit = async () => {
            await dispatch(RequestCoffeeExport(values));
            dispatch(GetAllExportCoffee());
            setValues({
                quantity: '',
                bagSize: '',
                supplyCoffeeBatchNumber: '',
                unit: '',
                productionPlace: '',
                owner: "OrgexporterMSP"
            })
            setOpen(false);
        }

        useEffect(() => {

        }, [filteredCoffeeInds.length, filteredSupplyCoffees.length])
        return (
            <div>
                <Button
                    onClick={() => setOpen(true)}
                    color="primary"
                    variant="contained"
                    disabled={loading1 || loading2}
                >
                    Produce Export Coffee
                </Button>

                <Modal
                    title="Produce Export Coffee"
                    style={{ top: 70, left: 130 }}
                    open={open}
                    onCancel={() => setOpen(false)}
                    width={800}
                    footer={[]}
                >
                    <form
                        autoComplete="on"
                    >
                        <Grid
                            container
                            columnSpacing={3}
                            p={2}
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
                                    label="Quantity"
                                    name="quantity"
                                    required
                                    value={values.quantity}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Bag Size"
                                    name="bagSize"
                                    required
                                    value={values.bagSize}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText={filteredSupplyCoffees.length === 0 ? "There is no existing produced coffee supply. please inform the supplier to produce coffee supplies first!" : null}
                                    size='medium'
                                    margin="normal"
                                    label="Supply Coffee Batch Number"
                                    name="supplyCoffeeBatchNumber"
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.supplyCoffeeBatchNumber}
                                    onChange={handleChange}
                                >
                                    <option
                                        value=""
                                    >
                                    </option>
                                    {filteredSupplyCoffees.map((supply) => (
                                        <option
                                            key={supply.Key}
                                            value={supply.Record.batchNumber}
                                        >
                                            {supply.Record.batchNumber}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Unit"
                                    name="unit"
                                    required
                                    value={values.unit}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText={filteredCoffeeInds.length === 0 ? "There is no existing coffee Industry. please request a coffee regulatory to add Coffee Industry first!" : null}
                                    size='medium'
                                    margin="normal"
                                    label="Production Place"
                                    name="productionPlace"
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.productionPlace}
                                    onChange={handleChange}
                                >
                                    <option
                                        value=""
                                    >
                                    </option>
                                    {filteredCoffeeInds.map((ind) => (
                                        <option
                                            key={ind.Key}
                                            value={ind.Record.id}
                                        >
                                            {ind.Record.address} - {ind.Record.name}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Owner"
                                    name="owner"
                                    required
                                    value={values.owner}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                paddingY: 3
                            }}
                        >
                            <Space>
                                <Button
                                    color='error'
                                    disabled={adding}
                                    onClick={() => setOpen(false)
                                    }
                                >
                                    Cancel
                                </Button>
                                {adding ?
                                    <CircularProgress
                                        size={15}
                                    />
                                    :
                                    <Button
                                        color="primary"
                                        disabled={
                                            adding ||
                                            values.quantity === "" ||
                                            values.bagSize === "" ||
                                            values.owner === "" ||
                                            values.supplyCoffeeBatchNumber === "" ||
                                            values.unit === "" ||
                                            values.productionPlace === ""

                                        }
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                }
                            </Space>
                        </Box>
                    </form >
                </Modal >
            </div >
        );
    }

