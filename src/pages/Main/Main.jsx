import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'react-table/react-table.css';
import PersonalInfoForm from '../../components/PersonalInfoForm/PersonalInfoForm';
import { changePhoneNumber, setFilter } from '../../store/actions';
import ReactTable from 'react-table';
import './Main.css';

const columns = [{
  id: 'no',
  Header: 'No',
  accessor: 'no',
  width: 100
},{
  id: 'firstName',
  Header: 'First Name',
  accessor: 'firstName',
  width: 200
}, {
  id: 'lastName',
  Header: 'Last Name',
  accessor: 'lastName',
  width: 200
}, {
  id: 'birthDate',
  Header: 'BirthDate',
  accessor: 'birthDate',
  width: 300
}, {
  id: 'phoneNumber',
  Header: 'Phone Number',
  accessor: 'phoneNumber',
  width: 300
}];

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editData: null,
      phoneNumber: null,
      selectedValue: null
    };
  }

  static propTypes = {
    data: PropTypes.array,
    logData: PropTypes.array,
    filterOptions: PropTypes.array
  };

  onClickTableCell = (row) => {
    if (!row) return;
    this.setState({
      editData: row.original,
      phoneNumber: row.original.phoneNumber
    })
  };

  onClickCancel = () => {
    this.setState({
      editData: null
    });
  }

  onClickUpdate = () => {
    const { dispatch } = this.props;
    const { editData, phoneNumber } = this.state;
    dispatch(changePhoneNumber({...editData, phoneNumber: phoneNumber}));
    this.setState({
      editData: null
    });
  }

  onPhoneNumberChange = (event) => {
    this.setState({
      phoneNumber: event.target.value
    })
  }

  getOptions = () => {
    const { data } = this.props;
    return data.map((record, index) => ({ value: record.phoneNumber, label: record.phoneNumber }));
  }

  handleSelectChange = (value) => {
    const { dispatch } = this.props;
    this.setState({ selectedValue: value });
    dispatch(setFilter(value));
  }

  render() {
    const { data, logData, filterOptions } = this.props;
    let tempData = data;
    if (filterOptions && filterOptions.length > 0) {
      const filters = filterOptions.map(filter => filter.value);
      tempData = data.filter(record => filters.includes(record.phoneNumber));
    }
    const tableData = tempData.map((data, index) => ({
      no: index + 1,
      ...data
    }));
    const { editData, selectedValue } = this.state;

    return (
      <div style={{display: 'inline-block'}}>
        <PersonalInfoForm />
        <div style={{width: 1100}}>
          <Select
            name="form-field-name"
            options={this.getOptions()}
            multi
            value={selectedValue}
            onChange={this.handleSelectChange}
          />
          {editData &&
            <div className="editable-data">
              <h3>Please change the phone number</h3>
              <span className="non-editable-field">{`First Name: ${editData.firstName}`}</span>
              <span className="non-editable-field">{`Last Name: ${editData.lastName}`}</span>
              <span className="non-editable-field">{`BirthDate: ${editData.birthDate}`}</span>
              <span className="editable-field">{`Phone Number: `}</span>
              <input type='text' defaultValue={editData.phoneNumber} onChange={this.onPhoneNumberChange} />
              <div className="button-container">
                <button onClick={this.onClickUpdate}>Update</button>
                <button onClick={this.onClickCancel}>Cancel</button>
              </div>
            </div>
          }
          <ReactTable
            data={tableData}
            columns={columns}
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {
                  this.onClickTableCell(rowInfo);
                }
              }
            }}
          />
        </div>
        <div>
          <h3> Log Info </h3>
          <div>
            { logData.map((element, index) => (
              <div key={index}>{element}</div>
            )) }
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    data: state.personalInfos.datas,
    filterOptions: state.personalInfos.filterOption,
    logData: state.logInfos
  };
}

export default connect(mapStateToProps)(Main);