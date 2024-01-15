import WorkersItem from "../workers-item/workers-item";
import Loader from "../loader/loader";
import { Component } from "react";
import { getDifference, updateItem } from "../../utils/utils";

class WorkersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [],
      isAllSelected: false,
      isLoading: false,
      selectedWorkers: [],
      totalCompanies: [],
    };
    this.onStopeLoading = this.onStopeLoading.bind(this);
    this.onDeleteWorkers = this.onDeleteWorkers.bind(this);
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.onSetSelectWorkers = this.onSetSelectWorkers.bind(this);
    this.onDeleteFromSelectedWorkers =
      this.onDeleteFromSelectedWorkers.bind(this);
  }

  componentDidMount() {
    this.setState({ workers: this.props.workers });
    this.setState({ totalCompanies: this.props.totalCompanies });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedWorkers.length !== this.state.selectedWorkers.length
    ) {
      if (this.state.selectedWorkers.length === this.props.workers.length) {
        this.setState({ isAllSelected: true });
      }
    }
    if (prevProps.workers !== this.props.workers) {
      this.setState({ isAllSelected: false });
      this.setState({ selectedWorkers: [] });
      this.setState({ workers: this.props.workers });
    }
  }

  onSetSelectWorkers(worker) {
    this.setState({ selectedWorkers: [...this.state.selectedWorkers, worker] });
  }

  onDeleteFromSelectedWorkers(worker) {
    const selectedWokersUpdated = this.state.selectedWorkers.filter(
      (item) => item.id !== worker.id
    );
    this.setState({ selectedWorkers: selectedWokersUpdated });
  }

  onClickCheckbox() {
    if (!this.state.isAllSelected) {
      this.setState({ isAllSelected: true });
      this.setState({ selectedWorkers: this.props.workers });
    } else {
      this.setState({ isAllSelected: false });
      this.setState({ selectedWorkers: [] });
    }
  }

  onStopeLoading() {
    this.setState({ isLoading: false });
  }

  onDeleteWorkers() {
    this.setState({ isLoading: true });
    let newArrayOfCompanies = [];
    for (let company of this.state.totalCompanies) {
      let newPersonal = [];
      for (let worker of company.personal) {
        if (!this.state.selectedWorkers.includes(worker)) {
          newPersonal.push(worker);
        }
      }
      const newObject = Object.assign({}, company, { personal: newPersonal });
      newArrayOfCompanies.push(newObject);
    }
    let newWorkerArr = [];
    let newSelectedCompnaies = [];
    for (let company of this.props.selectedCompanies) {
      const diffWorkers = getDifference(
        company.personal,
        this.state.selectedWorkers
      );
      newWorkerArr = [...newWorkerArr, diffWorkers];
      const newObject = Object.assign({}, company, {
        personal: diffWorkers,
      });
      newSelectedCompnaies.push(newObject);
    }
    this.props.onSelectAllCompanies(newSelectedCompnaies);
    this.props.findWorkers(newWorkerArr);
    this.props.deleteData(newArrayOfCompanies, this.onStopeLoading);
    this.setState({ totalCompanies: newArrayOfCompanies });
  }

  render() {
    return (
      <div className="right-column">
        <table className="table-fill">
          <thead>
            <tr>
              <th className="text-center select-all">
                <label htmlFor="select-all" className="visually-hidden">
                  Выделить всё
                </label>
                <input
                  className="checkbox-input"
                  type="checkbox"
                  id="select-all"
                  name="select-all"
                  checked={this.state.isAllSelected}
                  onChange={() => this.onClickCheckbox()}
                />
              </th>
              <th className="text-center">Имя</th>
              <th className="text-center">Фамилия</th>
              <th className="text-center">Должность</th>
            </tr>
          </thead>
          <tbody className="table-hover">
            {this.state.workers.length > 0 &&
              this.state.workers.map((worker, index) => (
                <WorkersItem
                  worker={worker}
                  key={index}
                  isAll={this.state.isAllSelected}
                  selectedWorkers={this.state.selectedWorkers}
                  putInSelectedWorkers={this.onSetSelectWorkers}
                  deleteFromSelectedWorkers={this.onDeleteFromSelectedWorkers}
                  isLoading={this.state.isLoading}
                />
              ))}
          </tbody>
        </table>
        <div className="delete-wrapper">
          <button
            className="btn-delete"
            type="button"
            disabled={this.state.isLoading}
            onClick={() => this.onDeleteWorkers()}
          >
            Удалить выбранные данные
          </button>
          {this.state.isLoading && <Loader />}
        </div>
      </div>
    );
  }
}

export default WorkersTable;
