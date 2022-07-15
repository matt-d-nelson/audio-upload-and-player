import { Typography } from "@material-ui/core";
import PostList from "../PostList/PostList";
import UploadFiles from "../UploadFiles/UploadFiles";

function App() {
  return (
    <div>
      <header>
        <Typography variant="h1">React 🍎</Typography>
        <UploadFiles />
        <br />
        <PostList />
      </header>
    </div>
  );
}

export default App;
