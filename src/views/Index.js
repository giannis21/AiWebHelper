import React, { useEffect, useRef } from "react";
import {
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Media,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addFile,
  addUser,
  removeUser,
  setFilesUploaded,
  updateUserStatus,
} from "../redux/initSlice";
import { BASE_URL } from "utils";
import { toast } from "react-toastify";
import Header from "components/Headers/Header.js";
import FormDialog from "components/modals/FormDialog";
import ConfirmationDialog from "components/modals/ConfirmationDialog";

const Tables = () => {
  const dispatch = useDispatch();
  const { userData = {}, filesUploaded: uploadedFiles = [] } = useSelector(
    (state) => state.initReducer || {} // Default to an empty object if state.initReducer is undefined
  );

  const fetchCalled = useRef(false);
  useEffect(() => {
    // Ensure the fetch happens only once
    if (userData?.email && uploadedFiles?.length == 0) {
      fetchCalled.current = true; // Set the ref to true to prevent further fetch calls
      console.log("Fetching files...");

      // Fetch business data when component mounts or email changes
      const getFiles = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}api/files?email=${encodeURIComponent(userData?.email)}`,
            {
              method: "GET",
            }
          );
          const data = await response.json();

          if (response.ok) {
            if (data.files) {
              dispatch(setFilesUploaded(data.files));
            } else {
              // If no business data exists, you can set default values
            }
          } else {
            toast.error(data.message || "Error fetching business data");
          }
        } catch (error) {
          toast.error("Error fetching business data");
          console.error("Error fetching business data:", error);
        }
      };

      getFiles();
    }
  }, [userData?.email, dispatch]);

  const fileInputRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] =
    React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);

  // State for uploaded files

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleSubmit(file); // Call handleSubmit directly with the file
    }
  };

  const handleSubmit = async (file) => {
    if (!file) {
      alert("Please select a PDF file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", file);
    formData.append("groupId", "123"); // Replace with actual groupId as needed

    try {
      const response = await fetch(
        BASE_URL + `upload-pdf?email=${userData?.email}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        toast.error("Error uploading PDF: " + errorMessage.message);
        return;
      }

      const result = await response.json();
      toast.success(result.message);

      // Add the uploaded file's name to the uploadedFiles state
      dispatch(addFile({ name: file.name, url: result.filePath }));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Failed to upload PDF");
    }
  };

  const handleRemoveUser = (uniqueId) => {
    dispatch(removeUser(uniqueId));
    setCurrentUser(null);
  };

  const toggleUserStatus = (uniqueId) => {
    dispatch(updateUserStatus(uniqueId));
  };

  const onAddUser = (user) => {
    dispatch(addUser(user));
  };

  console.log({ uploadedFiles });
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader
                className="border-0"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 className="mb-0">Προσθήκη αρχείων</h3>
                <div style={{ width: "14px" }} />
                <form className="text-right" xs="4" onSubmit={handleSubmit}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    ref={fileInputRef}
                  />
                </form>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Αρχεία</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedFiles.length > 0 ? (
                    uploadedFiles.map((fileName, index) => (
                      <tr key={index}>
                        <td>
                          <div
                            style={{ flexDirection: "row", display: "flex" }}
                          >
                            <Media>
                              <a
                                href={BASE_URL + fileName.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  alt="..."
                                  style={{ width: "40px", height: "40px" }}
                                  src={require("../assets/img/theme/pdf.png")}
                                />

                                <span className="mb-0 text-sm">
                                  {`  ${fileName?.name}`}
                                </span>
                              </a>
                            </Media>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="text-center">
                        Δεν υπάρχει κανένα αρχείο.
                      </td>
                    </tr>
                  )}
                  <FormDialog
                    user={currentUser}
                    setOpen={(val) => {
                      setCurrentUser(null);
                      setOpen(val);
                    }}
                    open={open}
                    onSubmitUser={onAddUser}
                  />
                  <ConfirmationDialog
                    onSubmit={() => handleRemoveUser(currentUser?.uniqueId)}
                    setOpenConfirmationModal={setOpenConfirmationModal}
                    openConfirmationModal={openConfirmationModal}
                  />
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
