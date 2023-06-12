import { Avatar, Box, Button, Card, CardContent, CircularProgress, Divider, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Stack, SvgIcon, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Tag } from 'antd';
import NextLink from 'next/link';
import dateFormat from 'dateformat';
import { ContractDeliveryResult } from '@/features/contract-delivery/contractDeliverySlice';
import React, { useState } from 'react';
import { getInitials } from '@/utils/get-initials';
import { DeliveryContractResult } from '@/features/delivery-contract/deliveryContractSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { ApproveContractDelivery, DeleteContractDelivery, GetAllContractDelivery, PayContractDelivery } from '@/api/contract-delivery';
import { Delete } from '@mui/icons-material';

interface Props {
    contractDelivery: ContractDeliveryResult,
    deliveryContracts: DeliveryContractResult[]
}

export const ContractDeliveryCard:
    React.FC<Props> = ({
        contractDelivery,
        deliveryContracts
    }) => {
        return (
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start"

                        secondaryAction={
                            <Typography
                                component="span"
                                variant="h6"
                                color="text.primary"
                            >
                                {contractDelivery.Record.coffeePrice}
                            </Typography>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                {getInitials(deliveryContracts?.find(d => d.Record.id === contractDelivery?.Record.contractId)?.Record.buyer)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={deliveryContracts?.find(d => d.Record.id === contractDelivery.Record.contractId)?.Record.buyer}
                            secondary={
                                <>
                                    <React.Fragment>
                                        {"Coffee Type - "}
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {contractDelivery.Record.coffeeType}
                                        </Typography>
                                    </React.Fragment>
                                    <br />
                                    <React.Fragment>
                                        {"Quantity - "}
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {contractDelivery.Record.quantity}
                                        </Typography>
                                    </React.Fragment>
                                </>
                            }
                        />
                    </ListItem>
                </List>
                <Box sx={{ flexGrow: 1 }} />
                <Divider />
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{ p: 2 }}
                >
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                    >
                        <SvgIcon
                            color="action"
                            fontSize="small"
                        >
                            <AccessTimeIcon />
                        </SvgIcon>
                        <Typography
                            color="text.secondary"
                            display="inline"
                            variant="body2"
                        >
                            Delivery Date - {contractDelivery.Record.deliveryDate}
                        </Typography>
                    </Stack>
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                pt: 2
                            }}
                        >
                            <Tag
                                color={(contractDelivery.Record.status === 'REQUESTED' && '#FFB020')
                                    || (contractDelivery.Record.status === 'PAID' && '#14B8A6')
                                    || (contractDelivery.Record.status === 'APPROVED' && 'success')
                                    || '#D14343'}
                            >
                                {contractDelivery.Record.status.toUpperCase()}
                            </Tag>
                        </Box>
                    </Stack>
                </Stack>
            </Card>
        );
    };