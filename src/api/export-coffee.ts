import { axiosInstance } from "@/utils/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetAllExportCoffee = createAsyncThunk('ExportCoffee/GetAll', async () => {
    
    return (await axiosInstance())
        .get('/api/export-coffee/get-all')
        .then((response) => response.data)
});

export const RegisterInd = createAsyncThunk('ExportCoffee/RegisterInd', async (req: any) => {
    
    return (await axiosInstance())
        .post('/api/export-coffee/register-ind', req)
        .then((response) => response.data)
});

export const RequestCoffeeExport = createAsyncThunk('ExportCoffee/RequestExport', async (req: any) => {
    
    return (await axiosInstance())
        .post('/api/export-coffee/produce', req)
        .then((response) => response.data)
});

export const GetAllIndExportCoffee = createAsyncThunk('ExportCoffee/GetAllInd', async () => {
    
    return (await axiosInstance())
        .get('/api/export-coffee/get-all-ind/OrgexporterMSP')
        .then((response) => response.data)
});

export const DeleteCoffeeInd = createAsyncThunk('CoffeeInd/Delete', async (id: string | undefined) => {
    
    return (await axiosInstance())
        .delete(`/api/export-coffee/delete-ind/OrgexporterMSP/${id}`)
        .then((response) => response.data)
});