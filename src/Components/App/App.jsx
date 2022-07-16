import { Typography } from "@material-ui/core";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import PostList from "../PostList/PostList";
import UploadFiles from "../UploadFiles/UploadFiles";

function App() {
  return (
    <div>
      <HashRouter>
        <Typography variant="h1">React 🍎</Typography>
        <Link to="/uploadfiles">Create Post</Link>
        <br />
        <Link to="/postlist">Explore Posts</Link>
        <Route path="/uploadfiles">
          <UploadFiles />
        </Route>
        <Route path="/postlist">
          <PostList />
        </Route>
      </HashRouter>
    </div>
  );
}

export default App;
