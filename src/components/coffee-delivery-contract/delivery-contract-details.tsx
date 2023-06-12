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
import Router from 'next/router';
import { GetAllSupplyCoffeeShipment } from "@/api/supply";
import {
    ApproveDeliveryContract,
    SignDeliveryContract,
    TerminateDeliveryContract
} from "@/api/delivery-contract";

import { DeliveryContractResult } from "@/features/delivery-contract/deliveryContractSlice";

function DeliveryContractDetail() {

    const dispatch = useAppDispatch();
    const deliveryContracts = useAppSelector(state => state.deliveryContract.deliveryContract.response);
    const loading = useAppSelector(state => state.supply.loading);
    const approving = useAppSelector(state => state.deliveryContract.approving);
    const terminating = useAppSelector(state => state.deliveryContract.terminating);
    const deleting = useAppSelector(state => state.deliveryContract.deleting);
    const error = useAppSelector(state => state.deliveryContract.error);
    const [selectedDeliveryContract, setSelectedDeliveryContract] = useState<DeliveryContractResult>();
    const router = useRouter()
    const { id } = router.query

    const [values, setValues] = useState({
        BuyerRemark: '',
        buyer: '',
        buyerObligation: '',
        buyerRight: '',
        contractGoal: '',
        contractStatus: '',
        contractType: '',
        cta: '',
        deliveredQuantity: '',
        deliveryAddress: '',
        ectRemark: '',
        endDate: '',
        expectedQuantity: '',
        id: '',
        initiatedDate: '',
        pricePercentage: '',
        seller: '',
        sellerObligation: '',
        sellerRight: '',
        startDate: '',
        signedDate: '',
        txId: ''
    })
    
    const [approveAnchorEl, setApproveAnchorEl] = useState<HTMLButtonElement | null>(null);
    const approveOpen = Boolean(approveAnchorEl);
    const approvePopOverId = approveOpen ? 'simple-popover' : undefined;

    const [terminateAnchorEl, setTerminateAnchorEl] = useState<HTMLButtonElement | null>(null);
    const terminateOpen = Boolean(terminateAnchorEl);
    const terminatePopOverId = terminateOpen ? 'simple-popover' : undefined;

    const handleApproveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setApproveAnchorEl(event.currentTarget);
    };
    const handleTerminateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTerminateAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setApproveAnchorEl(null);
        setTerminateAnchorEl(null);

    };

    const HandleApprove = async () => {
        handleClose();
        await dispatch(ApproveDeliveryContract({id: id, ectRemark: values.ectRemark}));
        await dispatch(GetAllSupplyCoffeeShipment());

        Router
            .push('/coffee-delivery-contract')
            .catch(console.error);
    } 

    const HandleTerminate = async () => {
        handleClose();
        await dispatch(TerminateDeliveryContract({id: id, ectRemark: values.ectRemark}));
        await dispatch(GetAllSupplyCoffeeShipment());

        Router
            .push('/coffee-delivery-contract')
            .catch(console.error);
    }

    const openNotification = (status: string, message: string) => {
        notification.open({
            message: status,
            description: message,
            placement: 'bottomRight'
        });
    };

    useEffect(() => {
        setSelectedDeliveryContract(deliveryContracts.find(g => g.Record.id === id));

        setValues({
            BuyerRemark: selectedDeliveryContract?.Record.BuyerRemark || '',
            buyer: selectedDeliveryContract?.Record.buyer || '',
            buyerObligation: selectedDeliveryContract?.Record.buyerObligation || '',
            buyerRight: selectedDeliveryContract?.Record.buyerRight || '',
            contractGoal: selectedDeliveryContract?.Record.contractGoal || '',
            contractStatus: selectedDeliveryContract?.Record.contractStatus || '',
            contractType: selectedDeliveryContract?.Record.contractType || '',
            cta: selectedDeliveryContract?.Record.cta || '',
            deliveredQuantity: selectedDeliveryContract?.Record.deliveredQuantity || '',
            deliveryAddress: selectedDeliveryContract?.Record.deliveryAddress || '',
            ectRemark: selectedDeliveryContract?.Record.ectRemark || '',
            endDate: selectedDeliveryContract?.Record.endDate || '',
            expectedQuantity: selectedDeliveryContract?.Record.expectedQuantity || '',
            id: selectedDeliveryContract?.Record.id || '',
            initiatedDate: selectedDeliveryContract?.Record.initiatedDate || '',
            pricePercentage: selectedDeliveryContract?.Record.pricePercentage || '',
            seller: selectedDeliveryContract?.Record.seller || '',
            sellerObligation: selectedDeliveryContract?.Record.sellerObligation || '',
            sellerRight: selectedDeliveryContract?.Record.sellerRight || '',
            startDate: selectedDeliveryContract?.Record.startDate || '',
            signedDate: selectedDeliveryContract?.Record.signedDate || '',
            txId: selectedDeliveryContract?.Record.txId || ''
        })
        if (error) {
            openNotification('Error', error);
        }
    }, [selectedDeliveryContract, error])
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
                                    label="Buyer Remark"
                                    name="BuyerRemark"
                                    value={values.BuyerRemark}
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
                                    label="Buyer"
                                    name="buyer"
                                    value={values.buyer}
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
                                    label="Buyer Obligation"
                                    name="buyerObligation"
                                    value={values.buyerObligation}
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
                                    label="Buyer Right"
                                    name="buyerRight"
                                    value={values.buyerRight}
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
                                    label="Contract Goal"
                                    name="contractGoal"
                                    value={values.contractGoal}
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
                                    label="Contract Type "
                                    name="contractType"
                                    value={values.contractType}
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
                                    label="CTA"
                                    name="cta"
                                    value={values.cta}
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
                                    label="Delivered Quantity"
                                    name="deliveredQuantity"
                                    value={values.deliveredQuantity}
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
                                    label="Delivery Address"
                                    name="deliveryAddress"
                                    value={values.deliveryAddress}
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
                                    label="ECT Remark"
                                    name="ectRemark"
                                    value={values.ectRemark}
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
                                    label="Expected Quantity"
                                    name="expectedQuantity"
                                    value={values.expectedQuantity}
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
                                    label="Initiated Date"
                                    name="initiatedDate"
                                    value={values.initiatedDate}
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
                                    label="Price Percentage"
                                    name="pricePercentage"
                                    value={values.pricePercentage}
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
                                    label="Seller"
                                    name="seller"
                                    value={values.seller}
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
                                    label="Seller Obligation"
                                    name="sellerObligation"
                                    value={values.sellerObligation}
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
                                    label="Seller Right"
                                    name="sellerRight"
                                    value={values.sellerRight}
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
                                    label="Signed Date"
                                    name="signedDate"
                                    value={values.signedDate}
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
                                md={6}
                                xs={12}
                            >
                                {approving ?
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
                                            approving ||
                                            terminating ||
                                            deleting ||
                                            loading ||
                                            values.contractStatus === "APPROVED" ||
                                            values.contractStatus === "REQUESTED" ||
                                            values.contractStatus === "TERMINATED"

                                        }
                                        onClick={handleApproveClick}
                                    >
                                        Approve
                                    </Button>
                                }
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                {terminating ?
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
                                        color="error"
                                        variant="contained"
                                        disabled={
                                            approving ||
                                            terminating ||
                                            deleting ||
                                            loading ||
                                            values.contractStatus === "TERMINATED" ||
                                            values.contractStatus === "REQUESTED" ||
                                            values.contractStatus === "SIGNED"


                                        }
                                        onClick={handleTerminateClick}
                                    >
                                        Terminate
                                    </Button>
                                }
                            </Grid>

                        </Grid>
                    </Box>
                </form>
                <Box>
                    <Popover
                        sx={{ p: 3 }}
                        id={approvePopOverId}
                        open={approveOpen}
                        anchorEl={approveAnchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Box sx={{ m: 2 }} >
                            <Typography >
                                Are you sure you want Approve this Contract?
                            </Typography>
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
                                onClick={HandleApprove}
                            >
                                Yes, Approve
                            </Button>
                        </Box>
                    </Popover>
                </Box>
                <Box>
                    <Popover
                        sx={{ p: 3 }}
                        id={terminatePopOverId}
                        open={terminateOpen}
                        anchorEl={terminateAnchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Box sx={{ m: 2 }} >
                            <Typography >
                                Are you sure you want Terminate this Contract?
                            </Typography>
                            <Button
                                color="primary"
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
                                onClick={HandleTerminate}
                            >
                                Yes, Terminate
                            </Button>
                        </Box>
                    </Popover>
                </Box>
            </Card >
        </>
    );
}


export default DeliveryContractDetail;