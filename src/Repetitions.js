
import React, { Component } from "react";
import axios from "axios"
import { withCookies } from 'react-cookie';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next'

class RepetitionsTable extends Component {
  constructor(props){
    super(props);
    this.baseUri = "http://localhost:8000/palabras";
    const cookies = this.props.cookies;
    this.filename = cookies.get('fileName');
    this.selected = cookies.get('repetition')
    this.state = {repetitions: []};
    this.columns = [{
      dataField: 'fragment',
      text: 'Key',
      headerStyle: (col, colIndex) => {
              return { width: '10%', textAlign: 'center' };
            }
    },{
      dataField: 'increments',
      text: 'Increments',
      headerStyle: (col, colIndex) => {
              return { width: '35%', textAlign: 'center' };
            },
      style: {textAlign: 'left'}
    }, {
      dataField: 'times',
      text: 'Times',
      headerStyle: (col, colIndex) => {
              return { width: '5%', textAlign: 'center' };
            },
      style: {textAlign: 'right'},
      sort: true
    }, {
      dataField: 'minimum',
      text: 'Min',
      headerStyle: (col, colIndex) => {
              return { width: '5%', textAlign: 'center' };
            },
      style: {textAlign: 'right'},
      sort: true
    }, {
      dataField: 'positions',
      text: 'Positions',
      headerStyle: (col, colIndex) => {
              return { width: '35%', textAlign: 'left' };
            },
      style: {textAlign: 'left'}
    } ];
  };

  handleError(msg, error){
    console.log(msg);
  };

  async getRepetitions() {
    try {
        const response = await axios.get(this.baseUri + '/repetitions/' + this.filename);
        return response.data;
   }
   catch (error) {this.handleError('Cannot get repetitions from ' + this.filename, error)}
};

focus = async () => {
  const cookies = this.props.cookies;
  this.filename = cookies.get('fileName');
  let repetitions = await this.getRepetitions();
  this.setState({repetitions: repetitions});
};

 onRowSelect = (row, isSelected, e) => {
  const cookies = this.props.cookies;
  this.repetition = cookies.set('repetition', row.fragment, { path: '/' });
};

   render() {

    const selectRowProp = {
      mode: 'radio',
      clickToSelect: true,
      onSelect: this.onRowSelect
    };

    return (
      <div className="RepetitionsTable" onClick={this.focus}>
        <p className="Table-header">Repetitions</p>
        <BootstrapTable
          keyField='fragment'
          data={this.state.repetitions}
          columns={this.columns}
          selectRow={selectRowProp}
        />
      </div>
    );
  }
};

export default withCookies(RepetitionsTable);