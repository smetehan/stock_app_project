import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { firmInput, modalStyle } from "../../styles/globalStyle";
import { Button, TextField } from "@mui/material";
import useStockCalls from "../../hooks/useStockCalls";

export default function FirmModal({ open, setOpen, info, setInfo }) {
  const { postFirm, putFirm } = useStockCalls();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.id) {
      putFirm(info);
    } else {
      postFirm(info);
    }

    setOpen(false);
    setInfo({});
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setInfo({});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
          <Box sx={firmInput}>
            <TextField
              label="Firm Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              required
              value={info?.name || ""}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              name="address"
              id="address"
              type="text"
              variant="outlined"
              required
              value={info?.address || ""}
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              name="phone"
              id="phone"
              type="tel"
              variant="outlined"
              required
              value={info?.phone || ""}
              onChange={handleChange}
            />
            <TextField
              label="Image Url"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              required
              value={info?.image || ""}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" size="large">
              Submit Firm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
