import "./App.css";
import { Home } from "./components/Home";
import { Department } from "./components/Department";
import { Employee } from "./components/Employee";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3 card p-2 shadow border">
          React JS Frontend
        </h3>

        <nav className="navbar navbar-expand-sm bg-primary navbar-dark my-3 shadow rounded">
          <ul className="navbar-nav">
            <li className="nav-item m-1">
              <NavLink
                className="btn btn-dark btn-outline-success shadow"
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink
                className="btn btn-dark btn-outline-success shadow"
                to="/department"
              >
                Department
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink
                className="btn btn-dark btn-outline-success shadow"
                to="/employee"
              >
                Employee
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/department" component={Department} />
          <Route path="/employee" component={Employee} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
