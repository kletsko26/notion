import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UserContextProvider } from "./UserContext";

import { Home } from "@pages/Home";
import { About } from "@pages/About";
import { Notes } from "@pages/Notes";
import { Note } from "@pages/Note";
import { AddNote } from "@pages/AddNote";
import { EditNote } from "@pages/EditNote";
import { Logout } from "@pages/Logout";
import { Login } from "@pages/Login";
import { Signup } from "@pages/Signup";
import { Page404 } from "@pages/Page404";
import { Dashboard } from "./Dashboard";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/about"
              element={
                <RequireAuth>
                  <About />
                </RequireAuth>
              }
            />
            <Route
              path="/notes"
              element={
                <RequireAuth>
                  <Notes />
                </RequireAuth>
              }
            />
            <Route
              path="/notes/:id"
              element={
                <RequireAuth>
                  <Note />
                </RequireAuth>
              }
            />
            <Route
              path="/notes/:id/edit"
              element={
                <RequireAuth>
                  <EditNote />
                </RequireAuth>
              }
            />
            <Route
              path="/addnote"
              element={
                <RequireAuth>
                  <AddNote />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
