import "./App.css";
import BooksPage from "./page/BooksPage";
import UserFormPage from "./page/UserFormPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/books">
            <BooksPage />
          </Route>
          <Route path="/user-details">
            <UserFormPage />
          </Route>
          <Route path="/">
            <Redirect to={"/books"} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
