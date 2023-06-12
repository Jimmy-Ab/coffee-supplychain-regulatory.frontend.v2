import { GetAllIndExportCoffee, RegisterInd } from "@/api/export-coffee";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    Box,
    Button,
    Card,
    CardHeader,
    CircularProgress,
    FormControlLabel,
    Grid,
    Switch,
    TextField
} from "@mui/material";
import { Modal, Space } from "antd";
import { useState } from "react";


export const RequestInd = () => {

    const dispatch = useAppDispatch();
    const adding = useAppSelector(state => state.exportCoffee.adding);
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        name: '',
        machineSpec: '',
        owner: 'OrgexporterMSP',
        address: '',
        size: '',
        warehouseSize: '',
        hasAirConditioner: true,
        hasPreCleaner: true,
        hasPneumaticAspirate: false,
        hasDensmetricSeparator: true,
        hasScreanGrading: true,
        hasColorSorter: true,
        latitude: '',
        longitude: ''
    })

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async () => {
        await dispatch(RegisterInd(values));
        dispatch(GetAllIndExportCoffee());
        setValues({
            name: '',
            machineSpec: '',
            owner: '',
            address: '',
            size: '',
            warehouseSize: '',
            hasAirConditioner: true,
            hasPreCleaner: true,
            hasPneumaticAspirate: true,
            hasDensmetricSeparator: true,
            hasScreanGrading: true,
            hasColorSorter: true,
            latitude: '',
            longitude: ''
        })
        setOpen(false);
    }
    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                color="primary"
                variant="contained"
            >
                Register Ind
            </Button>

            <Modal
                title="Register Industry"
                style={{ top: 70, left: 130 }}
                open={open}
                onCancel={() => setOpen(false)}
                width={900}
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
                                label="Name"
                                name="name"
                                required
                                value={values.name}
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
                                label="Machine Specification"
                                name="machineSpec"
                                required
                                value={values.machineSpec}
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
                                label="Owner"
                                name="owner"
                                required
                                value={values.owner}
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
                                label="Address"
                                name="address"
                                required
                                value={values.address}
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
                                label="Size"
                                name="size"
                                required
                                value={values.size}
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
                                label="Warehouse Size"
                                name="warehouseSize"
                                required
                                value={values.warehouseSize}
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
                                label="Latitude"
                                name="latitude"
                                required
                                value={values.latitude}
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
                                label="Longitude"
                                name="longitude"
                                required
                                value={values.longitude}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid
                            item
                            md={12}
                            sm={12}
                            xs={12}
                        >
                            <Card>
                                <CardHeader
                                    subheader="if the values are true turn on the field."
                                // title="Register Washed Coffee"
                                />
                                <Grid
                                    container
                                    spacing={1}
                                >
                                    <Grid
                                        item
                                        sm={4}
                                        xs={12}
                                    >
                                        <FormControlLabel
                                            labelPlacement="start"
                                            control={
                                                <Switch
                                                    checked={!!values.hasAirConditioner}
                                                    onChange={(event) =>
                                                        setValues({
                                                            ...values,
                                                            'hasAirConditioner': event.target.checked
                                                        })
                                                    }
                                                />
                                            }
                                            label="Has Air Conditioner"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        sm={4}
                                        xs={12}
                                    >
                                        <FormControlLabel
                                            labelPlacement="start"
                                            control={
                                                <Switch
                                                    checked={!!values.hasPreCleaner}
                                                    onChange={(event) =>
                                                        setValues({
                                                            ...values,
                                                            'hasPreCleaner': event.target.checked
                                                        })
                                                    }
                                                />
                                            }
                                            label="Has Pre Cleaner"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        sm={4}
                                        xs={12}
                                    >
                                        <FormControlLabel
                                            labelPlacement="start"
                                            control={
                                                <Switch
                                                    checked={!!values.hasPneumaticAspirate}
                                                    onChange={(event) =>
                                                        setValues({
                                                            ...values,
                                                            'hasPneumaticAspirate': event.target.checked
                                                        })
                                                    }
                                                />
                                            }
                                            label="Has Pneumatic Aspirate"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        sm={4}
                                        xs={12}
                                    >
                                        <FormControlLabel
                                            labelPlacement="start"
                                            control={
                                                <Switch
                                                    checked={!!values.hasDensmetricSeparator}
                                                    onChange={(event) =>
                                                        setValues({
                                                            ...values,
                                                            'hasDensmetricSeparator': event.target.checked
                                                        })
                                                    }
                                                />
                                            }
                                            label="Has Densmetric Separator"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        sm={4}
                                        xs={12}
                                    >
                                        <FormControlLabel
                                            labelPlacement="start"
                                            control={
                                                <Switch
                                                    checked={!!values.hasScreanGrading}
                                                    onChange={(event) =>
                                                        setValues({
                                                            ...values,
                                                            'hasScreanGrading': event.target.checked
                                                        })
                                                    }
                                                />
                                            }
                                            label="Has Screen Grading"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        sm={4}
                                        xs={12}
                                    >
                                        <FormControlLabel
                                            labelPlacement="start"
                                            control={
                                                <Switch
                                                    checked={!!values.hasColorSorter}
                                                    onChange={(event) =>
                                                        setValues({
                                                            ...values,
                                                            'hasColorSorter': event.target.checked
                                                        })
                                                    }
                                                />
                                            }
                                            label="Has Color Sorter"
                                        />
                                    </Grid>
                                </Grid>

                            </Card>
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
                                        values.name === "" ||
                                        values.machineSpec === "" ||
                                        values.owner === "" ||
                                        values.address === "" ||
                                        values.size === "" ||
                                        values.warehouseSize === "" ||
                                        values.latitude === "" ||
                                        values.longitude === ""
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

