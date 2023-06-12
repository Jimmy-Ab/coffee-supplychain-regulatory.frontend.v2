import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "@/components/dashboard-layout";
import Head from "next/head";
import ExportCoffeeDetail from "@/components/export-coffee/export-coffee-detail";

function Page() {

    return (
        <>
            <Head>
                <title>
                    Export Coffee Detail | Adey Supply-Chain
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
                        Export Coffee Detail
                    </Typography>

                    <Box>
                        <ExportCoffeeDetail />
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