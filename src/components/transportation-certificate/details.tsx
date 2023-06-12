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
import { notification } from "antd"
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { TransportationResult } from "@/features/transportation/transportationSlice";
import { DashboardLayout } from "@/components/dashboard-layout";
import Router from 'next/router';
import {
    DeleteCertificateRequest,
    GetAllTransportationCertificate,
    GrantCertificateRequest,
    RevokeCertificateRequest
} from "@/api/transportation";

function CertificateDetail() {

    const dispatch = useAppDispatch();
    const certificates = useAppSelector(state => state.transportation.tranportation.response);
    const deleting = useAppSelector(state => state.transportation.deleting);
    const loading = useAppSelector(state => state.transportation.loading);
    const adding = useAppSelector(state => state.transportation.adding);
    const granting = useAppSelector(state => state.transportation.granting);
    const revoking = useAppSelector(state => state.transportation.revoking);
    const error = useAppSelector(state => state.transportation.error);
    const [selectedCertificate, setSelectedCertificate] = useState<TransportationResult>();
    const router = useRouter()
    const { id } = router.query

    const [values, setValues] = useState({
        address: '',
        endDate: '',
        givenBy: '',
        givenDate: '',
        givenFor: '',
        id: '',
        loadingTransportLicence: '',
        loadingTrucks: '',
        nationality: '',
        startDate: '',
        status: '',
        tinNumber: '',
        txId: ''
    })
    const [grantValues, setGrantValues] = useState({
        id: id,
        startDate: "",
        endDate: ""
    })

    const HandleGrantChange = (event: any) => {
        setGrantValues({
            ...grantValues,
            [event.target.name]: event.target.value
        })
    }
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const popOverId = open ? 'simple-popover' : undefined;

    const [grantAnchorEl, setGrantAnchorEl] = useState<HTMLButtonElement | null>(null);
    const grantOpen = Boolean(grantAnchorEl);
    const grantPopOverId = grantOpen ? 'simple-popover' : undefined;

    const [revokeAnchorEl, setRevokeAnchorEl] = useState<HTMLButtonElement | null>(null);
    const revokeOpen = Boolean(revokeAnchorEl);
    const revokePopOverId = revokeOpen ? 'simple-popover' : undefined;

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleGrantClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setGrantAnchorEl(event.currentTarget);
    };

    const handleRevokeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setRevokeAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setGrantAnchorEl(null);
        setRevokeAnchorEl(null);
    };


    const HandleDelete = async (id: string | undefined) => {
        handleClose();
        await dispatch(DeleteCertificateRequest(id));
        await dispatch(GetAllTransportationCertificate());
        Router
            .push('/transportation-certificate')
            .catch(console.error);
    }

    const HandleGrant = async (id: any) => {
        handleClose();
        await dispatch(GrantCertificateRequest(grantValues));
        await dispatch(GetAllTransportationCertificate());
        Router
            .push('/transportation-certificate')
            .catch(console.error);
    }

    const HandleRevoke = async (id: any) => {
        handleClose();
        await dispatch(RevokeCertificateRequest({
            id: id
        }));

        await dispatch(GetAllTransportationCertificate());
        Router
            .push('/transportation-certificate')
            .catch(console.error);
    }
    const openNotification = (message: string) => {
        notification.open({
            message: 'Success',
            description: message,
            placement: 'bottomRight'
        });
    };

    useEffect(() => {
        setSelectedCertificate(certificates.find(g => g.Record.id === id));

        setValues({
            address: selectedCertificate?.Record.address || '',
            endDate: selectedCertificate?.Record.endDate || '',
            givenBy: selectedCertificate?.Record.givenBy || '',
            givenDate: selectedCertificate?.Record.givenDate || '',
            givenFor: selectedCertificate?.Record.givenFor || '',
            id: selectedCertificate?.Record.id || '',
            loadingTransportLicence: selectedCertificate?.Record.loadingTransportLicence || '',
            loadingTrucks: selectedCertificate?.Record.loadingTrucks || '',
            nationality: selectedCertificate?.Record.nationality || '',
            startDate: selectedCertificate?.Record.startDate || '',
            status: selectedCertificate?.Record.status || '',
            tinNumber: selectedCertificate?.Record.tinNumber || '',
            txId: selectedCertificate?.Record.txId || ''
        })
    }, [selectedCertificate])
    return (
        <>
            <Card
                sx={{
                    p: 2
                }}
            >
                <form
                    autoComplete="off"
                    noValidate
                >
                    <CardHeader
                        subheader="This information cannot be edited"
                        title="Detail"
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
                                    label="Address"
                                    name="address"
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
                                    label="End Date"
                                    name="endDate"
                                    value={values.endDate}
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
                                    label="Given By"
                                    name="givenBy"
                                    value={values.givenBy}
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
                                    label="Given Date"
                                    name="givenDate"
                                    value={values.givenDate}
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
                                    label="Given For"
                                    name="givenFor"
                                    value={values.givenFor}
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
                                    label="Id"
                                    name="id"
                                    value={values.id}
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
                                    label="Loading Transport Licence"
                                    name="loadingTransportLicence"
                                    value={values.loadingTransportLicence}
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
                                    label="Loading Trucks"
                                    name="loadingTrucks"
                                    value={values.loadingTrucks}
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
                                    label="Nationality"
                                    name="nationality"
                                    value={values.nationality}
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
                                    label="Start Date"
                                    name="startDate"
                                    value={values.startDate}
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
                                    label="Status"
                                    name="status"
                                    value={values.status}
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
                                    label="Tin Number"
                                    name="tinNumber"
                                    value={values.tinNumber}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            pt: 2
                        }}
                    >
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                {granting ?
                                    <Stack
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <CircularProgress
                                            color="success"
                                        />
                                    </Stack>
                                    :
                                    <Button
                                        fullWidth
                                        color="secondary"
                                        variant="contained"
                                        disabled={
                                            granting ||
                                            revoking ||
                                            deleting ||
                                            loading ||
                                            values.status === "CERTIFIED"
                                        }
                                        onClick={handleGrantClick}
                                    >
                                        Grant
                                    </Button>
                                }
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                {revoking ?
                                    <Stack
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <CircularProgress
                                            color="primary"
                                        />
                                    </Stack>
                                    :
                                    <Button
                                        fullWidth
                                        color="primary"
                                        disabled={
                                            granting ||
                                            revoking ||
                                            deleting ||
                                            loading ||
                                            values.status === "REVOKED"
                                        }
                                        onClick={handleRevokeClick}

                                    >
                                        Revoke
                                    </Button>
                                }
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
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
                                        fullWidth
                                        color="error"
                                        variant="contained"
                                        disabled={granting || revoking || deleting || loading}
                                        onClick={handleDeleteClick}
                                    >
                                        Delete
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                    </Box>
                </form>
                <Box>
                    <Popover
                        sx={{ p: 2 }}
                        id={grantPopOverId}
                        open={grantOpen}
                        anchorEl={grantAnchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >

                        <Typography sx={{ p: 2 }}>Are you sure you want grant permission to the request?</Typography>
                        <TextField
                            sx={{ mt: 2 }}
                            size='small'
                            fullWidth
                            label="Start Date"
                            name="startDate"
                            type='date'
                            value={grantValues.startDate}
                            onChange={HandleGrantChange}
                        />
                        <TextField
                            sx={{ mt: 2 }}
                            size='small'
                            fullWidth
                            label="End Date"
                            name="endDate"
                            type='date'
                            value={grantValues.endDate}
                            onChange={HandleGrantChange}
                        />
                        <Button
                            color="primary"
                            fullWidth
                            variant="text"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="secondary"
                            fullWidth
                            variant="contained"
                            onClick={() => HandleGrant(values.id)}
                            disabled={
                                grantValues.endDate === '' ||
                                grantValues.startDate === ''
                            }
                        >
                            Grant
                        </Button>
                    </Popover>
                </Box>
                <Box>
                    <Popover
                        sx={{ p: 2 }}
                        id={revokePopOverId}
                        open={revokeOpen}
                        anchorEl={revokeAnchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >

                        <Typography sx={{ p: 2 }}>Are you sure you want revoke permission for this request?</Typography>
                        <Button
                            color="success"
                            fullWidth
                            variant="text"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            fullWidth
                            variant="contained"
                            onClick={() => HandleRevoke(values.id)}
                        >
                            Revoke
                        </Button>
                    </Popover>
                </Box>
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

                        <Typography sx={{ p: 2 }}>Are you sure you want delete the request?</Typography>
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
                            onClick={() => HandleDelete(values.id)}
                        >
                            Delete
                        </Button>
                    </Popover>
                </Box>
            </Card >
        </>
    );
}


export default CertificateDetail;