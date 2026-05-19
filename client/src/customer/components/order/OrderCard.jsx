import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from "react-router-dom";

const OrderCard = () => {
    const navigate = useNavigate();


    return (
        <div onClick={() => navigate(`/account/order/${5}`)}>
            <Grid
                container
                alignItems="center"
                spacing={2}
                justifyContent="space-between"
                className="shadow-md p-4 bg-white hover:shadow-2xl border"
            >
                <Grid item xs={6}>
                    <div className="flex items-center text-left">
                        <img
                            className="w-[5rem] h-[5rem] object-cover"
                            src="https://images-eu.ssl-images-amazon.com/images/I/61u5oAftaeL._AC_UL900_SR900,600_.jpg"
                            alt=""
                        />
                        <div className="ml-4">
                            <p className="font-semibold">Lymio Cargo for Men</p>
                            <p className="text-xs opacity-60">Size: M</p>
                            <p className="text-xs opacity-60">Color: Black</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2} style={{ marginLeft: "150px" }}>
                    <p >₹799</p>
                </Grid>

                <Grid item xs={2} style={{ marginLeft: "150px" }}>

                    {
                        true && <div>
                            <p>
                                <AdjustIcon sx={{ width: '15px', height: '15px' }} className="text-green-600 mr-2 text-sm" />
                                <span>Delivered On March 03</span>
                            </p>
                            <p className="text-xs">
                                <span>Your Item has been Delivered</span>
                            </p>
                        </div>

                    }
                    {
                        false &&
                        <p>
                            <span>Expected Delivery on March 03</span>
                        </p>
                    }

                </Grid>

            </Grid>
        </div>
    );
};

export default OrderCard;