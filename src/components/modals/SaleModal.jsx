import React from "react";
import { flexColumn, modalStyle } from "../../styles/globalStyle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import useStockCalls from "../../hooks/useStockCalls";
import { useSelector } from "react-redux";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

export default function PurchaseModal({ open, setOpen, info, setInfo }) {
  const { postSale, putSale } = useStockCalls();
  const { products, brands } = useSelector((state) => state.stock);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: Number(value) });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (info.id) {
      putSale(info);
    } else {
      postSale(info);
    }
    setOpen(false);
    setInfo({});
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setInfo({});
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={flexColumn} component={"form"} onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <InputLabel variant="outlined" id="brand-select">
              Brands
            </InputLabel>
            <Select
              labelId="brand-select"
              label="Brand"
              id="brand-select"
              name="brand_id"
              value={info?.brand_id || ""}
              onChange={handleChange}
              required
            >
              {brands?.map((brand) => {
                return (
                  <MenuItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel variant="outlined" id="product-select">
              Product
            </InputLabel>
            <Select
              labelId="product-select"
              label="Product"
              id="product-select"
              name="product_id"
              value={info?.product_id || ""}
              onChange={handleChange}
              required
            >
              {products?.map((product) => {
                return (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            label="Quantity"
            name="quantity"
            id="quantity"
            type="number"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={info?.quantity || ""}
            onChange={handleChange}
            required
          />

          <TextField
            margin="dense"
            label="Price"
            name="price"
            id="price"
            type="number"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={info?.price || ""}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="contained" size="large">
            {info?.id ? "Update Purchase" : "Add New Purchase"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
