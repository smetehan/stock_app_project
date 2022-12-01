// import axios from "axios";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FirmCard from "../components/FirmCard";
import FirmModal from "../components/modals/FirmModal";
import useStockCalls from "../hooks/useStockCalls";
// import { useDispatch, useSelector } from "react-redux";

const Firms = () => {
  const { getFirms } = useStockCalls();
  const { firms } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  useEffect(() => {
    getFirms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" color="error" mb={4}>
          FIRMS
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          NEW FIRM
        </Button>
      </Box>
      <Box>
        <FirmModal
          open={open}
          setOpen={setOpen}
          info={info}
          setInfo={setInfo}
        />
        {firms?.length > 0 && (
          <Grid container justifyContent="center" gap={3}>
            {firms?.map((firm) => (
              <Grid item key={firm.id}>
                <FirmCard firm={firm} setOpen={setOpen} setInfo={setInfo} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Firms;
