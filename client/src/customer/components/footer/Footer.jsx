import { Button, Grid, Typography, Link, Divider } from "@mui/material";
import React from "react";

function Footer() {
    // Common button style
    const footerButtonStyle = {
        color: "#ccc",
        textTransform: "none",
        display: "block",
        justifyContent: "flex-start",
        px: 0,
        mb: 1,
        "&:hover": { color: "white", backgroundColor: "transparent" },
    };

    return (
        <div>
            <Grid
                container
                spacing={30}
                sx={{
                    bgcolor: "#111",
                    color: "white",
                    py: { xs: 5, sm: 6, md: 8 },
                    px: { xs: 3, md: 8 },
                }}
            >
                <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { xs: "center", md: "left" } }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">Company</Typography>
                    {["About", "Blog", "Press", "Jobs", "Partners"].map((item) => (
                        <Button key={item} sx={footerButtonStyle}>{item}</Button>
                    ))}
                </Grid>
                <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { xs: "center", md: "left" } }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">Solution</Typography>
                    {["Marketing", "Analytics", "Commerce", "Insights", "Support"].map((item) => (
                        <Button key={item} sx={footerButtonStyle}>{item}</Button>
                    ))}
                </Grid>
                <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { xs: "center", md: "left" } }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">Documentation</Typography>
                    {["Guides", "API Status"].map((item) => (
                        <Button key={item} sx={footerButtonStyle}>{item}</Button>
                    ))}
                </Grid>
                <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { xs: "center", md: "left" } }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">Legal</Typography>
                    {["Claim", "Privacy", "Terms"].map((item) => (
                        <Button key={item} sx={footerButtonStyle}>{item}</Button>
                    ))}
                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ bgcolor: "#111", color: "#aaa", py: 4, px: 3 }}>
                <Grid item xs={12} md={10} sx={{ textAlign: "center" }}>
                    <Typography variant="body2" component="p" gutterBottom>
                        &copy; 2026 My Company. All rights reserved.
                    </Typography>
                    <Typography variant="body2" component="p" gutterBottom>
                        Made with by Me
                    </Typography>
                    <Typography variant="body2" component="p">
                        Icon made by{" "}
                        <Link color="inherit" underline="always" href="https://www.freepik.com">
                            Freepik
                        </Link>{" "}
                        from{" "}
                        <Link color="inherit" underline="always" href="https://www.flaticon.com">
                            www.flaticon.com
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default Footer;