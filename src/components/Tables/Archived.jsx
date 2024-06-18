import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import FormPopUp from "../Modals/FormPopUp.jsx";
import * as userService from "../../services/UserService.jsx";
import * as expenseService from "../../services/ExpenseService.jsx";
import { useState, useEffect, useContext } from "react";
import ConfirmArchiveModal from "../Modals/ConfirmArchiveModal.jsx";
import ShowReceipt from "../Modals/ShowReceipt.jsx";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import MyContext from "../../FireBase/MyContext.jsx";

const Archived = () => {
    const [showModal, setShowModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [modalObj, setModalObj] = useState({});

    //Obj array filled via backend
    const [requests, setRequests] = useState([]);
    const [showReceipt, setShowReceipt] = useState(false);
    const { cookies, setCookies } = useContext(MyContext);
    const navigate = useNavigate();

    // get users to see if admin -> Probably a better way to do this
    useEffect(() => {
        requestDataFromApi();
    }, []);


    const [users, setUsers] = useState();

    function requestDataFromApi() {
            userService.getUserByUsername(cookies.name).then((res) => {
                setUsers(res.data);
                setRequests(res.data.userExpenses);
            });
    }

    //Finds the obj tied to the view button clicked then stores it for later
    const retrieveModalObj = (id) => {
        const updateRequest = requests.map((req) => {
            if (req.id === id) {
                // setModalId(req.id);
                setModalObj(req);
                return req;
            }
        });
    };

    //Handles the modal for the view form
    const modalHandle = (status, id) => {
        retrieveModalObj(id);
        switch (status) {
            case "View":
                setShowModal(true);
                break;
            case "Archive":
                setShowArchiveModal(true);
                break;
            case "Reciept":
                setShowReceipt(true);
                break;
        }
    };

    function updateReq() {
        modalObj.id = null;
        modalObj.ceo = false;
        modalObj.doo = false;
        modalObj.requesterSupervisor = false;
        modalObj.receipt = "";
        modalObj.reason = "";
        modalObj.purchaser = "";
        modalObj.dateDelivered = "";
        expenseService.createExpense(modalObj).then((data)=>{
            navigate("/home")
        });
        
    }

    return (
        <div>
        <h2>Archived Requests</h2>
            {/* <NavbarC admin={admin} user={users} setAdmin={setAdmin} /> */}
            {/*Creates a React Bootstrap Table that alternates from black to dark gray
      with a hover effect*/}
            <Table striped bordered hover size="lg">
                <thead>
                    <tr>
                        <th style={{padding: '15px'}}>ID</th>
                        <th style={{padding: '15px'}}>Expense</th>
                        {/* <th>Program</th> */}
                        <th style={{padding: '15px'}}>Item</th>
                        <th style={{padding: '15px'}}>Date Created</th>
                        <th style={{padding: '15px'}}>Date Needed</th>
                        <th style={{padding: '15px'}}>View</th>
                        {/* <th>Status</th> */}
                        <th style={{padding: '15px'}}>Receipt</th>
                        <th style={{padding: '15px'}}>Duplicate Request</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Outputs table rows for each obj display information */}
                    {requests.map((requestInfo) => (
                        requestInfo.archive ? <tr key={requestInfo.id}>
                            <td>{requestInfo.id}</td>
                            <td>${requestInfo.total}</td>
                            {/* <td>{requestInfo.program}</td> */}
                            <td>{requestInfo.items}</td>
                            <td>{requestInfo.dateOfExpense.substring(0, 10)}</td>
                            <td>{requestInfo.dateNeeded}</td>
                            <td>
                                <ButtonGroup className="mb-2 " size="sm">
                                    <Button
                                        id={"View-" + requestInfo.id}
                                        type="button"
                                        variant={cookies.theme == "light" ? "outline-primary" : "outline-info"}
                                        onClick={() => modalHandle("View", requestInfo.id)}
                                    >
                                        View
                                    </Button>
                                </ButtonGroup>
                            </td>
                            <td
                                id={`file ${requestInfo.id}`}
                                className={
                                    requestInfo.receipt == "" ? "" : "d-flex align-items-center"
                                }
                            >
                                {requestInfo.CEO && requestInfo.DOO && requestInfo.requesterSupervisor ? (requestInfo.receipt == "" ? (
                                    <Form.Control
                                        disabled
                                        // onChange={(e) => handleFileSelect(e, requestInfo.id)}
                                        accept=".pdf, .png, .jpeg, .jpg"
                                        id={`file-${requestInfo.id}`}
                                        as="input"
                                        type="file"
                                    ></Form.Control>
                                ) : (
                                    <>
                                        <Button
                                            onClick={() => modalHandle("Reciept", requestInfo.id)}
                                            className="d-inline-block me-2"
                                            variant="outline-info"
                                        >
                                            View Receipt
                                        </Button>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Name | Date"
                                        >
                                            <Form.Control
                                                className="d-inline-block"
                                                value={
                                                    requestInfo.purchaser +
                                                    " | " +
                                                    requestInfo.dateDelivered
                                                }
                                            />
                                        </FloatingLabel>
                                    </>
                                )) : (requestInfo.reason != "" ? "Denied" : "Pending")}
                            </td>
                            <td>
                                <ButtonGroup className="mb-2 " size="sm">
                                    <Button
                                        id={"Cancel-" + requestInfo.id}
                                        type="button"
                                        variant="outline-danger"
                                        onClick={() => modalHandle("Archive", requestInfo.id)}
                                    >
                                        Duplicate
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                            : ""))}
                </tbody>
            </Table>

            {showModal ? (
                <FormPopUp
                    show={showModal}
                    close={() => setShowModal(false)}
                    data={modalObj}
                />
            ) : (
                ""
            )}

            {showArchiveModal ? (
                <ConfirmArchiveModal
                    show={showArchiveModal}
                    close={() => {
                        setShowArchiveModal(false);
                    }}
                    data={modalObj}
                    updateUI={updateReq}
                />
            ) : (
                ""
            )}

            {showReceipt ? (
                <ShowReceipt
                    show={showReceipt}
                    close={() => setShowReceipt(false)}
                    data={modalObj}
                />
            ) : (
                ""
            )}
        </div>
    );
};

export default Archived;