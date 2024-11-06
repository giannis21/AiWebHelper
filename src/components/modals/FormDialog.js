import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FileUploader } from "react-drag-drop-files";

export default function FormDialog({ open, setOpen, user, onSubmitUser }) {
  const [image, setImage] = React.useState(null);
  const [imageBase64, setImageBase64] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const convertImageToBase64 = async (file) => {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageBase64(reader.result);
        resolve();
      }; // base64 encoded string
      reader.onerror = (error) => reject(error);
    });
  };
  const handleImageChange = (file) => {
    if (file) {
      console.log({ file });

      setImage(file);
      convertImageToBase64(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    setImageBase64(null);
    setPreview(null);
    setOpen(false);
  };

  return (
    <div style={{ margin: "20px" }}>
      <React.Fragment>
        <Dialog
          style={{ padding: "20px" }}
          open={open}
          disableScrollLock={true}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(formJson);
              onSubmitUser({
                ...formJson,
                image: imageBase64 ? imageBase64 : undefined,
              });
              handleClose();
            },
          }}
        >
          <DialogTitle>Στοιχεία χρήστη</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Εδώ μπορείς να επεξεργαστείς τα στοιχεία του χρήστη!
            </DialogContentText>
            <p />
            <TextField
              autoFocus
              required
              margin="dense"
              id="firstName"
              name="firstName"
              label="Όνομα"
              type="text"
              value={user ? user.firstName : undefined}
              fullWidth
            />
            <p />
            <TextField
              autoFocus
              required
              margin="dense"
              id="lastName"
              name="lastName"
              label="Επώνυμο"
              type="text"
              value={user ? user.lastName : undefined}
              fullWidth
            />
            <p />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Διεύθυνση Email"
              value={user ? user.email : undefined}
              type="email"
              fullWidth
            />

            <p />

            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              value={user ? user.phone : undefined}
              name="phone"
              label="Κινητό τηλέφωνο"
              type="phone"
              fullWidth
            />

            <p />
            <TextField
              autoFocus
              required
              margin="dense"
              id="uniqueId"
              name="uniqueId"
              value={user ? user.uniqueId : undefined}
              label="Group id"
              type="uniqueId"
              fullWidth
            />
            <p />
            <FileUploader
              handleChange={handleImageChange}
              name="file"
              types={["JPG", "PNG", "GIF"]}
            >
              {preview ? (
                // Updated styles here
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    width: "445%", // Ensures the div takes up available width
                  }}
                >
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="preview-image"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain", // Ensures image fits without distortion
                    }}
                  />
                </div>
              ) : (
                <div
                  className="drag-drop-container"
                  style={{ textAlign: "center" }}
                >
                  <span>
                    Drag & drop your profile image here or click to select
                  </span>
                </div>
              )}
            </FileUploader>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ακυρωση</Button>
            <Button type="submit">Υποβολη</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
