// import axios from "axios";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BrandCard from "../components/BrandCard";
import BrandModal from "../components/modals/BrandModal";
import useStockCalls from "../hooks/useStockCalls";
// import { useDispatch, useSelector } from "react-redux";

const Brands = () => {
  const { getBrands } = useStockCalls();
  const { brands } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    getBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ gap: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" color="error" mb={4}>
          BRANDS
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          NEW BRAND
        </Button>
      </Box>

      <Box>
        {" "}
        <BrandModal
          open={open}
          setOpen={setOpen}
          info={info}
          setInfo={setInfo}
        />
        {brands?.length > 0 && (
          <Grid container justifyContent="center" gap={3}>
            {brands?.map((brand) => (
              <Grid item key={brand.id}>
                <BrandCard brand={brand} setOpen={setOpen} setInfo={setInfo} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Brands;
