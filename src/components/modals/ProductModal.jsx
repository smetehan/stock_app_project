import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { firmInput, modalStyle } from "../../styles/globalStyle";
import { Button, TextField } from "@mui/material";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import useStockCalls from "../../hooks/useStockCalls";
import { useSelector } from "react-redux";

export default function ProductsModal({ open, setOpen, info, setInfo }) {
  const { postProduct, putProduct } = useStockCalls();
  const { categories, brands } = useSelector((state) => state.stock);
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  console.log(setInfo);
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    if (info.id) {
      putProduct(info);
    } else {
      postProduct(info);
    }
    setOpen(false);
    setInfo({});
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
            <FormControl>
              <InputLabel variant="outlined" id="category-select-label">
                Categories
              </InputLabel>
              <Select
                labelId="category-select-label"
                label="Category"
                name="category_id"
                value={info?.category_id || ""}
                onChange={handleChange}
                required
              >
                {categories?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {/* <TextField
              label="Categories"
              name="category"
              id="category"
              type="text"
              variant="outlined"
              required
              value={info?.category || ""}
              onChange={handleChange}
            /> */}
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

            <TextField
              margin="dense"
              label="Product Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              value={info?.name || ""}
              onChange={handleChange}
              required
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
