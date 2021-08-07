import React, { Component } from "react";
import { variables } from "../Variables";

export class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      modalTitle: "",
      DepartmentName: "",
      DepartmentId: 0,

      DepartmentIdFilter: "",
      DepartmentNameFilter: "",
      departmentsWithoutFilter: [],
    };
  }

  filterFn() {
    var DepartmentIdFilter = this.state.DepartmentIdFilter;
    var DepartmentNameFilter = this.state.DepartmentNameFilter;

    var filteredData = this.state.departmentsWithoutFilter.filter(function (
      el
    ) {
      return (
        el.DepartmentId.toString()
          .toLowerCase()
          .includes(DepartmentIdFilter.toString().trim().toLowerCase()) &&
        el.DepartmentName.toString()
          .toLowerCase()
          .includes(DepartmentNameFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ departments: filteredData });
  }

  sortResult(prop, asc) {
    var sortedData = this.state.departmentsWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });
    this.setState({ departments: sortedData });
  }

  changeDepartmentIdFilter = (e) => {
    this.setState({ DepartmentIdFilter: e.target.value });
    //this.state.DepartmentIdFilter = e.target.value;
    this.filterFn();
  };

  changeDepartmentNameFilter = (e) => {
    this.setState({ DepartmentNameFilter: e.target.value });
    //this.state.DepartmentNameFilter = e.target.value;
    this.filterFn();
  };

  refreshList() {
    fetch(variables.API_URL + "department")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ departments: data, departmentsWithoutFilter: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeDepartmentName = (e) => {
    this.setState({ DepartmentName: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Department",
      DepartmentId: 0,
      DepartmentName: "",
    });
  }
  editClick(dep) {
    this.setState({
      modalTitle: "Edit Department",
      DepartmentId: dep.DepartmentId,
      DepartmentName: dep.DepartmentName,
    });
  }

  createClick() {
    fetch(variables.API_URL + "department", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentName: this.state.DepartmentName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  updateClick() {
    fetch(variables.API_URL + "department", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentId: this.state.DepartmentId,
        DepartmentName: this.state.DepartmentName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  deleteClick(id) {
    if (window.confirm("Are you sure")) {
      fetch(variables.API_URL + "department/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  render() {
    //state destruct
    const { departments, modalTitle, DepartmentName, DepartmentId } =
      this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Add Department
        </button>
        <table className="table table-striped shadow">
          <thead>
            <tr>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeDepartmentIdFilter}
                    placeholder="Filter"
                  />

                  <button
                    type="button"
                    className="btn btn-dark btn-outline-primary mx-1"
                    onClick={() => this.sortResult("DepartmentId", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-bar-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark btn-outline-warning mx-1"
                    onClick={() => this.sortResult("DepartmentId", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-bar-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
                      />
                    </svg>
                  </button>
                </div>
                DepartmentId
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeDepartmentNameFilter}
                    placeholder="Filter"
                  />

                  <button
                    type="button"
                    className="btn btn-dark btn-outline-primary mx-1"
                    onClick={() => this.sortResult("DepartmentName", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-bar-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark btn-outline-warning mx-1"
                    onClick={() => this.sortResult("DepartmentName", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-bar-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
                      />
                    </svg>
                  </button>
                </div>
                DepartmentName
              </th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dep) => (
              <tr key={dep.DepartmentId}>
                <td>{dep.DepartmentId}</td>
                <td>{dep.DepartmentName}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning mx-1 text-white shadow"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(dep)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mx-1 text-white shadow"
                    onClick={() => this.deleteClick(dep.DepartmentId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn btn-danger mr-1 text-white shadow"
                  data-bs-dismiss="modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                  </svg>
                </button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text bg-dark text-white">
                    DepartmentName
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={DepartmentName}
                    onChange={this.changeDepartmentName}
                  />
                </div>
                {DepartmentId === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}
                {DepartmentId !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
