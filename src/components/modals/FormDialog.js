import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FileUploader } from "react-drag-drop-files";
import { BASE_URL } from "utils";
import { useDispatch, useSelector } from "react-redux";

export default function FormDialog({
  open,
  setOpen,
  user,
  onSubmitUser,
  onEditUser,
}) {
  const {
    userData,
    userData: { email: adminEmail, phone: adminPhone },
  } = useSelector((state) => state.initReducer);

  const [image, setImage] = React.useState(null);
  const [imageBase64, setImageBase64] = React.useState(null);
  const [preview, setPreview] = React.useState(
    user?.avatar ? `${BASE_URL}${user?.avatar}?t=${new Date().getTime()}` : null
  );

  console.log(JSON.stringify(user) + "-------", BASE_URL + user?.avatar);
  // State for form values, initialized with user data if available
  const [firstName, setFirstName] = React.useState(user ? user.name : "");
  const [lastName, setLastName] = React.useState(user ? user.surname : "");
  const [email, setEmail] = React.useState(user ? user.email : "");
  const [phone, setPhone] = React.useState(user ? user.phone : "");
  const [groupId, setGroupId] = React.useState(user ? user.groupId : "");

  React.useEffect(() => {
    if (!user) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setGroupId("");
      setPreview("");
      setImageBase64(null);
      return;
    }
    setFirstName(user?.name || user?.firstName);
    setLastName(user?.surname || user?.lastName);
    setEmail(user?.email);
    setPhone(user?.phone);
    setGroupId(user?.groupId || user?.uniqueId);
    setPreview(BASE_URL + user?.avatar);
  }, [user]);

  const convertImageToBase64 = async (file) => {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageBase64(reader.result);
        resolve();
      };
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
    console.log({ user });
  };

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = {
      firstName,
      lastName,
      email,
      phone,
      uniqueId: groupId, //: adminEmail + "-" + adminPhone,
      status: user?.status,
      imageBase64,
      avatar: user?.avatar ? user?.avatar : undefined,
    };

    user ? onEditUser(updatedUser) : onSubmitUser(updatedUser); // Pass the updated user data to parent component
    handleClose();
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
            onSubmit: handleSubmit,
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} // Update state on change
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} // Update state on change
              fullWidth
            />
            <p />
            <TextField
              autoFocus
              required
              disabled={user}
              margin="dense"
              id="email"
              name="email"
              label="Διεύθυνση Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on change
              type="email"
              fullWidth
            />
            <p />
            <TextField
              autoFocus
              required
              margin="dense"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} // Update state on change
              label="Κινητό τηλέφωνο"
              type="phone"
              fullWidth
            />
            <p />
            <TextField
              autoFocus
              required
              margin="dense"
              id="groupId"
              name="groupId"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)} // Update state on change
              label="Group id"
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
