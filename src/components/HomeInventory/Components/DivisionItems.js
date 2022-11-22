import { Form } from "react-bootstrap";
import { createRef, Component } from "react";
import * as React from "react";
import "./components.css";
import { Table, Button } from "@material-ui/core";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default class DivisionItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      AddItemFormShown: false,
      AddItemButtonShown: true,
    };
    this.formData = createRef();
  }

  add = (event) => {
    event.preventDefault();
    const newProduct = {
      product_name: this.formData.current.product_name.value,
      qty: Number(this.formData.current.qty.value),
    };

    this.state.products.push(newProduct);
    this.setState({
      products: this.state.products,
      AddItemFormShown: false,
      AddItemButtonShown: true,
    });
  };

  increQty = (event) => {
    const indexOfArray = event.target.value;
    this.state.products[indexOfArray].qty =
      this.state.products[indexOfArray].qty + 1;
    this.setState({ products: this.state.products });
  };

  decreQty = (event) => {
    const indexOfArray = event.target.value;
    this.state.products[indexOfArray].qty =
      this.state.products[indexOfArray].qty - 1;
    this.setState({ products: this.state.products });
  };

  showTableOfItems = () => {
    return (
      <TableContainer component={Paper} style={{ width: "100%" }}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.products.map((item, index) => {
              return this.showItems(item, index);
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  showItems = (item, index) => {
    return (
      <>
        <tr key={index}>
          <td style={{ textAlign: "center", width: "40%" }}>
            {item.product_name}
          </td>
          <td style={{ width: "60%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Button
                style={{ marginTop: "12px" }}
                className={"quantity-button"}
                onClick={(event) => this.decreQty(event)}
                value={index}
              >
                -
              </Button>
              <p className={"quantity-output-label"}>{item.qty}</p>
              <Button
                style={{ marginTop: "12px" }}
                className={"quantity-button"}
                onClick={(event) => this.increQty(event)}
                value={index}
              >
                +
              </Button>
            </div>
          </td>
        </tr>
      </>
    );
  };

  showForm = () => {
    return (
      <>
        <div style={{display:"flex", justifyContent:'center'}}>
        <Form
          className={"division-items-form"}
          onSubmit={this.add}
          ref={this.formData}
        >
          <Form.Group
            controlId="formBasicProductName"
            className={"division-item-group"}
          >
            <Form.Label>Item Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Item Name"
              name="product_name"
              required
            />
          </Form.Group>
          <Form.Group
            controlId="formBasicQty"
            className={"division-item-group"}
          >
            <Form.Label className={"division-item-label"}>Quantity:</Form.Label>
            <Form.Control
              type="number"
              placeholder="How many?"
              name="qty"
              required
            />
          </Form.Group>

          <Button variant="primary" className={"submitBtn"} type="submit">
            Add to Inventory
          </Button>
        </Form>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className={"division-items"}>
        {this.state.products.length == 0 && this.state.AddItemButtonShown && (
          <tr style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: "69%", height: "94%", opacity:"80%" }}
                src={"/interior_livingroom.png"}
                loading="lazy"
              />
              <p className={"emptyListLabel"} style={{ color: "grey" }}>
                Empty room!
              </p>
            </div>
          </tr>
        )}

        {this.state.products.length == 0 &&
          !this.state.AddItemButtonShown &&
          this.showForm()}

        {this.state.products.length != 0 && this.state.AddItemButtonShown && (
          <>
            <div>{this.showTableOfItems()}</div>
          </>
        )}

        {this.state.products.length != 0 && !this.state.AddItemButtonShown && (
          <>
            <div>{this.showTableOfItems()}</div>
            <div>{this.showForm()}</div>
          </>
        )}

        {this.state.AddItemButtonShown && (
          <div className={"addItemBtnSection"}>
            <Button
              className={"addItemBtn"}
              style={{ backgroundColor: "#A2A3BB" }}
              onClick={() =>
                this.setState({
                  AddItemFormShown: true,
                  AddItemButtonShown: false,
                })
              }
            >
              Add item
            </Button>
          </div>
        )}
      </div>
    );
  }
}
