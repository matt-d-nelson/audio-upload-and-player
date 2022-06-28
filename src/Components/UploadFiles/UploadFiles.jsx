import { Button, Dialog, DialogTitle, Typography } from "@material-ui/core";
import { useState } from "react";

function UploadFiles() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Add Picture and Audio</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography>Add Audio and Picture</Typography>
        </DialogTitle>
      </Dialog>
    </div>
  );
}

export default UploadFiles;
