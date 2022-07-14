import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import Map from "../Map/Map";

function UploadFiles() {
  const [markers, setMarkers] = useState([]);
  const [picture, setPicture] = useState("");
  const [audio, setAudio] = useState("");
  const [picturePath, setPicturePath] = useState("");
  const [audioPath, setAudioPath] = useState("");

  const updatePicture = (event) => {
    setPicture(event.target.file);
    setPicturePath(event.target.value);
  };

  const updateAudio = (event) => {
    setAudio(event.target.file);
    setAudioPath(event.target.value);
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

      <Button>Submit</Button>
    </div>
  );
}

export default UploadFiles;
