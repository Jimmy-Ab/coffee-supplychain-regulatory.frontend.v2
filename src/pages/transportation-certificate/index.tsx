import TransportationCertificate from "@/components/transportation-certificate/transportation-certificate";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Box, Typography } from "@mui/material";
import Head from "next/head";

const Page = () => (
    <div style={{ margin: '20px 20px' }}>
        <Head>
            <title>
                Transportation | Adey supply-chain
            </title>
        </Head>
        <Typography
            sx={{ m: 1 }}
            variant="h4"
        >
            Coffee Transportation
        </Typography>
        <Box>
            <TransportationCertificate />
        </Box>
    </div>
)

Page.getLayout = (page: any) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Page;
