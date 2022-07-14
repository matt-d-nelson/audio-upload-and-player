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
  const [open, setOpen] = useState(false);
  const [markers, setMarkers] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Add Picture and Audio</Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Typography>Add Audio and Picture</Typography>
        </DialogTitle>
        <DialogContent>
          <Map setMarker={setMarkers} markers={markers} />
          <Button component="label">
            Upload Picture
            <input name="picture" type="file" hidden />
          </Button>
          <Button component="label">
            Upload Audio
            <input name="audio" type="file" hidden />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UploadFiles;
