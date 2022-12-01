import { useEffect, useState } from "react";
import useStockCalls from "../hooks/useStockCalls";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import {
  arrowStyle,
  btnHoverStyle,
  flexCenter,
  TableCellStyle,
} from "../styles/globalStyle";
import useSortColumn from "../hooks/useSortColumn";
import { MultiSelectBox, MultiSelectBoxItem } from "@tremor/react";
import PurchaseModal from "../components/modals/PurchaseModal";

const Purchases = () => {
  const { deletePurchase, getPurchases, getProCatBrands } = useStockCalls();
  const { purchases, products, brands } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    getPurchases();
    getProCatBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnObj = {
    created: 1,
    quantity: 1,
    price: 1,
  };

  const { sortedData, handleSort, columns } = useSortColumn(
    purchases,
    columnObj
  );
  console.log(sortedData);
  //? Verilen item secilen brand'larin icerisinde varsa true dondurur
  //? VEYA hic brand secilmemisse true dondurur.aksinde false dondurur.
  //? bu fonksiyon filter() icerisinde yazilacagi icin false dondurmesi
  //? durumunda filter bir suzme yapmamis olur.
  const isBrandSelected = (item) =>
    selectedBrands.includes(item.brand) || selectedBrands.length === 0;

  const isProductSelected = (item) =>
    selectedProducts.includes(item.name) || selectedProducts.length === 0;

  //? products dizisinden secilmis brand'larin product name'lerini bir diziye saklar
  const filtredProducts = products
    ?.filter((item) => selectedBrands?.includes(item.brand))
    .map((item) => item.name);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={4}>
        Purchases
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        New Purchase
      </Button>
      <Box sx={flexCenter} mt={3}>
        <MultiSelectBox
          handleSelect={(item) => setSelectedBrands(item)}
          placeholder="Select Brand"
        >
          {brands?.map((item) => (
            <MultiSelectBoxItem
              key={item.name}
              value={item.name}
              text={item.name}
            />
          ))}
        </MultiSelectBox>
        <MultiSelectBox
          handleSelect={(item) => setSelectedProducts(item)}
          placeholder="Select Product"
        >
          {filtredProducts?.map((item) => (
            <MultiSelectBoxItem key={item} value={item} text={item} />
          ))}
        </MultiSelectBox>
      </Box>

      <PurchaseModal
        open={open}
        setOpen={setOpen}
        info={info}
        setInfo={setInfo}
      />

      {sortedData?.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }} elevation={10}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Box sx={arrowStyle} onClick={() => handleSort("created")}>
                    <div>Date</div>
                    {columns.created === 1 && <UpgradeIcon />}
                    {columns.created !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Firm Name</TableCell>
                <TableCell align="center">Brand Name</TableCell>
                <TableCell align="center">Product</TableCell>
                <TableCell align="center">
                  <Box sx={arrowStyle} onClick={() => handleSort("quantity")}>
                    <div>Quantity</div>
                    {columns.quantity === 1 && <UpgradeIcon />}
                    {columns.quantity !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={arrowStyle} onClick={() => handleSort("price")}>
                    <div>Price</div>
                    {columns.price === 1 && <UpgradeIcon />}
                    {columns.price !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">Amount</TableCell>

                <TableCell align="center">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                ?.filter((item) => isBrandSelected(item))
                .filter((item) => isProductSelected(item))
                .map((purchase, index) => (
                  <TableRow
                    key={purchase.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {purchase.createds}
                    </TableCell>
                    <TableCell align="center">
                      {purchase.category?.map((item) => item.name)}
                    </TableCell>
                    <TableCell align="center">{purchase.firm}</TableCell>
                    <TableCell align="center">{purchase.brand}</TableCell>
                    <TableCell align="center">{purchase.product}</TableCell>
                    <TableCell align="center">{purchase.quantity}</TableCell>
                    <TableCell align="center">{purchase.price}</TableCell>
                    <TableCell align="center">{purchase.price_total}</TableCell>
                    <TableCell sx={TableCellStyle}>
                      <TableCell onClick={() => deletePurchase(purchase.id)}>
                        <DeleteIcon sx={btnHoverStyle} />
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          setOpen(true);
                          setInfo(purchase);
                        }}
                      >
                        <EditIcon sx={btnHoverStyle} />
                      </TableCell>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Purchases;
