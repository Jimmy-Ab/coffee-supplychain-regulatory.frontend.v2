import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "@/components/dashboard-layout";
import Head from "next/head";
import ExportCoffeeDetail from "@/components/export-coffee/export-coffee-detail";
import CoffeeIndDetail from "@/components/export-coffee/coffee-ind-detail";

function Page() {

    return (
        <>
            <Head>
                <title>
                    Coffee Industry Detail | Adey Supply-Chain
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 3
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h5"
                    >
                        Coffee Industry Detail
                    </Typography>

                    <Box>
                        <CoffeeIndDetail />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

Page.getLayout = (page: any) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;