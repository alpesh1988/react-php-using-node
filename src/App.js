import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
// import BootstrapTable from 'react-bootstrap-table-next';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';
import _ from 'lodash';
import { Button } from 'reactstrap';

class App extends Component {

  constructor( props ) {
    super(props);

    this.state = {
      products: [],
      columns: [],
      rowIndexToBeEdited: null,
      editedRowData: {},
      addedRowData: {
        name: '',
        description: '',
        price: ''
      }
    }
    this.deleteRow = this.deleteRow.bind(this);
    this.editRow = this.editRow.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDescriptionAdd = this.onChangeDescriptionAdd.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNameAdd = this.onChangeNameAdd.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangePriceAdd = this.onChangePriceAdd.bind(this);
  }

  componentDidMount() {
    this.fetchProductsData();
  }

  fetchProductsData() {
    axios.get('http://localhost:4000/fetchproducts')
    .then(response => {
      console.log('response: ', response )
      this.setState({
        products: response.data
      });
    });
  }

  deleteRow(id) {
    console.log(' delete :', id );
    var data = {
      id: parseInt(id,  10)
    };
    axios.delete('http://localhost:4000/deleteproduct', {
      headers: {'Content-Type': 'application/json'},
      params: data
    })
    .then(response => {
      console.log('delete response: ', response );
      this.fetchProductsData();
    });
  }

  editRow(product, index ) {
    console.log(' edit index :', index );
    let editedRowData = _.clone( product );
    this.setState({
      rowIndexToBeEdited: index,
      editedRowData: editedRowData
    })
  }

  onChangeDescription(e) {
    let editedRowData = this.state.editedRowData;
    editedRowData.description = e.target.value;
    this.setState({
      editedRowData: editedRowData
    })
  }

  onChangeDescriptionAdd(e) {
    let addedRowData = this.state.addedRowData;
    addedRowData.description = e.target.value;
    this.setState({
      addedRowData: addedRowData
    })
  }

  onChangeName(e) {
    let editedRowData = this.state.editedRowData;
    editedRowData.name = e.target.value;
    this.setState({
      editedRowData: editedRowData
    })
  }

  onChangeNameAdd(e) {
    let addedRowData = this.state.addedRowData;
    addedRowData.name = e.target.value;
    this.setState({
      addedRowData: addedRowData
    })
  }

  onChangePrice(e) {
    let editedRowData = this.state.editedRowData;
    editedRowData.price = e.target.value;
    this.setState({
      editedRowData: editedRowData
    })
  }

  onChangePriceAdd(e) {
    let addedRowData = this.state.addedRowData;
    addedRowData.price = e.target.value;
    this.setState({
      addedRowData: addedRowData
    })
  }

  addRow( addedRowData ) {
    console.log(' addRow :', addedRowData )
    axios.post('http://localhost:4000/addproduct', {
      data: addedRowData
    })
    .then(response => {
      console.log('response after add: ', response );
      this.fetchProductsData();
      this.setState({
        addedRowData: {
          name: '',
          description: '',
          price: ''
        }
      })
    });
  }

  saveRow( editedRowData ) {
    console.log(' saveRow :', editedRowData )
    axios.post('http://localhost:4000/editproduct', {
      data: editedRowData
    })
    .then(response => {
      console.log('response after save: ', response );
      this.fetchProductsData();
      this.setState({
        rowIndexToBeEdited: null,
        editedRowData: {}
      })
    });
  }

  cancelRow() {
    console.log(' cancelRow :' );
    this.setState({
      rowIndexToBeEdited: null,
      editedRowData: {}
    })
  }

  renderTableHeader() {
    var productsRowsLength = this.state.products && this.state.products.length;
    var headerJSX = <thead className="thead-dark">
                      <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>description</th>
                        <th>price</th>
                        <th>actions</th>
                      </tr>
                    </thead>; 
    var finalJSX = productsRowsLength > 0 ? headerJSX : '';
    return (
      finalJSX
    )
  }

  renderTable() {
    let { rowIndexToBeEdited, addedRowData } = this.state;
    let rows = this.state.products.map((product, index) => {
        if ( index !== rowIndexToBeEdited ) {
          return (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <Button color="info" size="sm" onClick={() => this.editRow(product, index)} disabled={rowIndexToBeEdited !== null}>edit</Button>
                <Button color="danger" size="sm" onClick={() => this.deleteRow(product.id)} disabled={rowIndexToBeEdited !== null}>delete</Button>
              </td>
            </tr>
          )
        } else {
          let {editedRowData} = this.state;
          return (
            <tr key={index}>
              <td>{editedRowData.id}</td>
              <td><input type="text" value={editedRowData.name} onChange={this.onChangeName} /></td>
              <td><input type="text" value={editedRowData.description} onChange={this.onChangeDescription} /></td>
              <td><input type="text" value={editedRowData.price} onChange={this.onChangePrice} /></td>
              <td>
                <Button color="secondary" size="sm" onClick={() => this.saveRow(editedRowData)}>save</Button>
                <Button color="link" size="sm" onClick={() => this.cancelRow(index)}>cancel</Button>
              </td>
            </tr>
          )
        }
      }),
      totalProducts = this.state.products && this.state.products.length;
    return (
      <div>
        <p>Total Products: {totalProducts}</p>
        <table className="table table-striped table-bordered">
          { this.renderTableHeader() }
          <tbody>
            <tr>
              <td><input type="text" className="form-control" placeholder="Auto incremented value" disabled /></td>
              <td><input type="text" className="form-control" placeholder="Enter name" value={addedRowData.name} onChange={this.onChangeNameAdd} /></td>
              <td><input type="text" className="form-control" placeholder="Enter Description" value={addedRowData.description} onChange={this.onChangeDescriptionAdd} /></td>
              <td><input type="text" className="form-control" placeholder="Enter Price" value={addedRowData.price} onChange={this.onChangePriceAdd} /></td>
              <td><Button color="primary" size="sm" disabled={ _.isEmpty(addedRowData.name) || _.isEmpty(addedRowData.description) || _.isEmpty(addedRowData.price) } onClick={() => this.addRow(addedRowData)}>Add</Button></td>
            </tr>
            { rows }
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div className="container" style={{ marginTop: 50 }}>
      <h3 className="text-center">React app using PHP, Mysql</h3>
        {this.renderTable()}
      </div>
    );
  }
}

export default App;