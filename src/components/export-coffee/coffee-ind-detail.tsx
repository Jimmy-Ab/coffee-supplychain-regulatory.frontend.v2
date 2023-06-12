import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Grid,
    Popover,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Router from 'next/router';
import { CoffeeIndResult } from "@/features/export-coffee/exportCoffeeSlice";
import { DeleteCoffeeInd, GetAllIndExportCoffee } from "@/api/export-coffee";

function CoffeeIndDetail() {

    const dispatch = useAppDispatch();
    const coffeeInds = useAppSelector(state => state.exportCoffee.coffeeInd.response);
    const deleting = useAppSelector(state => state.exportCoffee.deleting);
    const loading = useAppSelector(state => state.exportCoffee.loading);
    const [selectedCoffeeInd, setSelectedCoffeeInd] = useState<CoffeeIndResult>();
    const router = useRouter()
    const { id } = router.query

    const [values, setValues] = useState({
        address: '',
        hasAirConditioner: false,
        hasColorSorter: false,
        hasDensmetricSeparator: false,
        hasPneumaticAspirate: false,
        hasPreCleaner: false,
        hasScreanGrading: false,
        id: '',
        latitude: '',
        longitude: '',
        machineSpec: '',
        name: '',
        owner: '',
        size: '',
        warehouseSize: ''
    });

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const HandleDelete = async (id: string | undefined) => {
        handleClose();
        await dispatch(DeleteCoffeeInd(id));
        await dispatch(GetAllIndExportCoffee());

        Router
            .push('/export-coffee')
            .catch(console.error);
    }
    const open = Boolean(anchorEl);
    const popOverId = open ? 'simple-popover' : undefined;


    useEffect(() => {
        setSelectedCoffeeInd(coffeeInds.find(g => g.Record.id === id));
        setValues({
            address: selectedCoffeeInd?.Record.address || '',
            hasAirConditioner: selectedCoffeeInd?.Record.hasAirConditioner || false,
            hasColorSorter: selectedCoffeeInd?.Record.hasColorSorter || false,
            hasDensmetricSeparator: selectedCoffeeInd?.Record.hasDensmetricSeparator || false,
            hasPneumaticAspirate: selectedCoffeeInd?.Record.hasPneumaticAspirate || false,
            hasPreCleaner: selectedCoffeeInd?.Record.hasPreCleaner || false,
            hasScreanGrading: selectedCoffeeInd?.Record.hasScreanGrading || false,
            id: selectedCoffeeInd?.Record.id || '',
            latitude: selectedCoffeeInd?.Record.latitude || '',
            longitude: selectedCoffeeInd?.Record.longitude || '',
            machineSpec: selectedCoffeeInd?.Record.machineSpec || '',
            name: selectedCoffeeInd?.Record.name || '',
            owner: selectedCoffeeInd?.Record.owner || '',
            size: selectedCoffeeInd?.Record.size || '',
            warehouseSize: selectedCoffeeInd?.Record.warehouseSize || ''

        })
    })
    return (
        <>
            <Card
                sx={{
                    p: 2
                }}
            >
                <CardHeader
                    subheader="This information cannot be edited"
                    title="Details"
                />
                <Divider />
                <CardContent>

                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='small'
                                label="Name"
                                value={values.name}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='small'
                                label="Address"
                                value={values.address}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='small'
                                label="Owner"
                                value={values.owner}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='small'
                                label="Has Air Conditioner?"
                                value={values.hasAirConditioner ? "Yes" : "No"}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                size='small'
                                fullWidth
                                label="Has Color Sorter?"
                                value={values.hasColorSorter ? "Yes" : "No"}
                            />
                        </Grid>

                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                size='small'
                                fullWidth
                                label="Has Densmetric Separator?"
                                value={values.hasDensmetricSeparator ? "Yes" : "No"}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                size='small'
                                fullWidth
                                label="Has Pneumatic Aspirate?"
                                value={values.hasPneumaticAspirate ? "Yes" : "No"}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                size='small'
                                fullWidth
                                label="Has Pre Cleaner?"
                                value={values.hasPreCleaner ? "Yes" : "No"}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                size='small'
                                fullWidth
                                label="Has Screen Grading"
                                value={values.hasScreanGrading ? "Yes" : "No"}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='small'
                                label="Id"
                                value={values.id}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='small'
                                label="Latitude"
                                value={values.latitude}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='small'
                                label="Longitude"
                                value={values.longitude}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='small'
                                label="Machine Specification"
                                value={values.machineSpec}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='small'
                                label="Size"
                                value={values.size}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='small'
                                label="Warehouse Size"
                                value={values.warehouseSize}
                            />
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            mt: 4
                        }}
                    >
                        {deleting ?
                            <Stack
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <CircularProgress
                                    color="error"
                                />
                            </Stack>
                            :
                            <Button
                                color="error"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                onClick={handleClick}
                            >
                                Delete Industry
                            </Button>


                        }
                        <Box>
                            <Popover
                                sx={{ p: 2 }}
                                id={popOverId}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <Typography sx={{ p: 2 }}>Are you sure you want delete this coffee Industry?</Typography>
                                <Button
                                    color="success"
                                    fullWidth
                                    variant="text"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="error"
                                    fullWidth
                                    variant="contained"
                                    onClick={() => HandleDelete(id?.toString())}
                                >
                                    Yes, Delete
                                </Button>
                            </Popover>

                        </Box>
                    </Box>
                </CardContent>
            </Card >
        </>
    );
}


export default CoffeeIndDetail;