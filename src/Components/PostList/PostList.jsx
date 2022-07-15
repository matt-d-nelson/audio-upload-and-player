import { Button, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch({ type: "GET_POSTS" });
  }, []);

  const getPosts = () => {
    dispatch({ type: "GET_POSTS" });
  };

  return (
    <div>
      <Typography>Post List</Typography>
      <p>{JSON.stringify(posts)}</p>
      <Button onClick={getPosts}>test</Button>
    </div>
  );
}

export default PostList;
