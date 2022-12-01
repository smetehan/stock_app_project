import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { btnHoverStyle } from "../styles/globalStyle";
import useStockCalls from "../hooks/useStockCalls";
export default function FirmCard({ firm, setOpen, setInfo }) {
  const { deleteFirm } = useStockCalls();
  return (
    <Card
      sx={{ maxWidth: 275, minWidth: 275, maxHeight: 540, minHeight: 540 }}
      elevation={10}
    >
      <CardContent
        sx={{
          maxWidth: 275,
          minWidth: 275,
          maxHeight: 180,
          minHeight: 180,
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {firm?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {firm?.address}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          maxWidth: 275,
          minWidth: 275,
          maxHeight: 180,
          minHeight: 180,
        }}
      >
        <CardMedia
          component="img"
          maxWidth="275"
          minWidth="275"
          minHeight="180"
          maxHeight="180"
          image={firm?.image}
          alt="green iguana"
        />
      </CardContent>

      <CardContent
        sx={{
          maxWidth: 275,
          minWidth: 275,
          maxHeight: 40,
          minHeight: 40,
        }}
      >
        <Typography gutterBottom variant="body2" color="text.secondary">
          Phone: {firm?.phone}
        </Typography>
      </CardContent>
      <CardContent
        sx={{ maxWidth: 275, minWidth: 275, maxHeight: 140, minHeight: 140 }}
      >
        {" "}
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <EditIcon
            sx={btnHoverStyle}
            onClick={() => {
              setOpen(true);
              setInfo(firm);
            }}
          />
          <DeleteOutlineIcon
            sx={btnHoverStyle}
            onClick={() => deleteFirm(firm?.id)}
          />
        </CardActions>
      </CardContent>
    </Card>
  );
}
