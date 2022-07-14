import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Map from "../Map/Map";

function UploadFiles() {
  const [markers, setMarkers] = useState([]);
  const [picture, setPicture] = useState("");
  const [audio, setAudio] = useState("");
  const [picturePath, setPicturePath] = useState("");
  const [audioPath, setAudioPath] = useState("");
  const dispatch = useDispatch();

  const updatePicture = (event) => {
    setPicture(event.target.file);
    setPicturePath(event.target.value);
  };

  const updateAudio = (event) => {
    setAudio(event.target.file);
    setAudioPath(event.target.value);
  };

  const handleClickSubmitData = () => {
    const newPost = new FormData();
    newPost.append("lat", markers[0].lat);
    newPost.append("lng", markers[0].lng);
    newPost.append("picture", picture);
    newPost.append("audio", audio);

    dispatch({ type: "ADD_POST", payload: newPost });
  };

  return (
    <div>
      <Typography>Add Audio, Picture, and Location</Typography>

      <Map setMarkers={setMarkers} markers={markers} />
      <Button component="label" variant="outlined">
        Upload Picture
        <input name="picture" type="file" hidden onChange={updatePicture} />
      </Button>
      <Typography>{picturePath}</Typography>
      <Button component="label" variant="outlined">
        Upload Audio
        <input name="audio" type="file" hidden onChange={updateAudio} />
      </Button>
      <Typography>{audioPath}</Typography>

      <Button onClick={handleClickSubmitData}>Submit</Button>
    </div>
  );
}

export default UploadFiles;
