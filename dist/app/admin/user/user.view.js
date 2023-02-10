"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SecuredAPI_1 = __importDefault(require("../../utils/SecuredAPI"));
const react_1 = __importStar(require("react"));
const react_location_1 = require("@tanstack/react-location");
const material_1 = require("@mui/material");
const admin_context_1 = require("../admin.context");
function UserCard() {
    const navigate = (0, react_location_1.useNavigate)();
    const { params: { userId } } = (0, react_location_1.useMatch)();
    const { list: { loadUsers } } = (0, react_1.useContext)(admin_context_1.AdminContext);
    const [user, setUser] = (0, react_1.useState)(null);
    const [editData, setEditData] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [isLoadingEdit, setIsLoadingEdit] = (0, react_1.useState)(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = react_1.default.useState(false);
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = react_1.default.useState(false);
    const [newPassword, setNewPassword] = (0, react_1.useState)("");
    const adminContext = (0, react_1.useContext)(admin_context_1.AdminContext);
    const loadUser = async () => {
        setIsLoading(true);
        const response = await SecuredAPI_1.default.get("user/" + userId);
        if (response.status === 200) {
            setUser(response.data);
            setEditData(user);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };
    const edit = () => {
        setIsEditing(true);
        setEditData(user);
    };
    const cancelEdit = () => {
        setIsEditing(false);
        setEditData(user);
    };
    const submitEdit = async () => {
        setIsLoadingEdit(true);
        const response = await SecuredAPI_1.default.put("user/" + user.id, editData);
        setTimeout(() => {
            setIsLoadingEdit(false);
            if (response.status === 200) {
                setIsEditing(false);
                loadUsers();
                loadUser();
            }
        }, 1000);
    };
    const handleEditChange = (event) => {
        event.preventDefault();
        const id = event.target.id;
        const value = event.target.value;
        setEditData({ ...editData, [id]: value });
    };
    const handleRoleEditSelect = (event) => {
        event.preventDefault();
        const value = event.target.value;
        setEditData({ ...editData, role: value });
    };
    const handleEditSubmit = (event) => {
        event.preventDefault();
        submitEdit();
    };
    const deleteUser = () => {
        setIsDeleteDialogOpen(true);
    };
    const cancelDeleteUser = () => {
        setIsDeleteDialogOpen(false);
    };
    const submitDeleteUser = async () => {
        const response = await SecuredAPI_1.default.delete("user/" + user.id);
        loadUsers();
        navigate({ to: "/admin/user" });
    };
    const changePassword = () => {
        setIsPasswordDialogOpen(true);
        setNewPassword("");
    };
    const cancelPassword = () => {
        setIsPasswordDialogOpen(false);
        setNewPassword("");
    };
    const submitPassword = async () => {
        const response = await SecuredAPI_1.default.put("user/" + user.id, {
            password: newPassword,
        });
        loadUsers();
        setIsPasswordDialogOpen(false);
        setNewPassword("");
    };
    (0, react_1.useEffect)(() => {
        loadUser();
    }, []);
    if (isLoading)
        return (react_1.default.createElement(material_1.CircularProgress, null));
    else if (user !== null)
        return (react_1.default.createElement("div", { className: "UserCard" },
            react_1.default.createElement("div", { className: "Profile" },
                react_1.default.createElement("div", { className: "Photo" },
                    react_1.default.createElement("div", { className: "Initials" }, user.name.split(' ').map((a) => a[0]).join(''))),
                !isEditing && react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { className: "Details" },
                        react_1.default.createElement("div", { className: "Name" }, user.name),
                        react_1.default.createElement("div", { className: "Meta" },
                            react_1.default.createElement("div", { className: "MetaItem" },
                                react_1.default.createElement(material_1.Icon, null, "email"),
                                react_1.default.createElement("div", { className: "Label" }, user.email)),
                            react_1.default.createElement("div", { className: "MetaItem" },
                                react_1.default.createElement(material_1.Icon, null, "assignment_ind"),
                                react_1.default.createElement("div", { className: "Label" }, user.role)))),
                    react_1.default.createElement("div", { className: "Actions" },
                        react_1.default.createElement(material_1.Button, { onClick: () => { edit(); } },
                            react_1.default.createElement(material_1.Icon, null, "edit"),
                            react_1.default.createElement("div", { className: "Label" }, "Edit Info")),
                        react_1.default.createElement(material_1.Button, { onClick: () => { changePassword(); } },
                            react_1.default.createElement(material_1.Icon, null, "password"),
                            react_1.default.createElement("div", { className: "Label" }, "Change Password")),
                        react_1.default.createElement(material_1.Button, { color: "error", onClick: () => { deleteUser(); } },
                            react_1.default.createElement(material_1.Icon, null, "delete"),
                            react_1.default.createElement("div", { className: "Label" }, "Delete")))),
                isEditing && react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { className: "UserEdit" },
                        react_1.default.createElement("div", { className: "Details" },
                            react_1.default.createElement("form", { onSubmit: handleEditSubmit },
                                react_1.default.createElement(material_1.TextField, { id: "name", value: editData.name, onChange: handleEditChange, label: "Name", variant: "outlined", fullWidth: true }),
                                react_1.default.createElement(material_1.TextField, { id: "email", value: editData.email, onChange: handleEditChange, label: "Email Address", variant: "outlined", fullWidth: true }),
                                react_1.default.createElement(material_1.Select, { disabled: editData.id === adminContext?.user?.id, value: editData.role, onChange: handleRoleEditSelect, displayEmpty: true, variant: "outlined", labelId: "role-label", id: "role" },
                                    react_1.default.createElement(material_1.MenuItem, { value: "admin" }, "Admin"),
                                    react_1.default.createElement(material_1.MenuItem, { value: "editor" }, "Editor")),
                                react_1.default.createElement("div", { className: "FormActions" },
                                    !isLoadingEdit && react_1.default.createElement(react_1.default.Fragment, null,
                                        react_1.default.createElement(material_1.Button, { type: "button", onClick: () => { cancelEdit(); } }, "Cancel"),
                                        react_1.default.createElement(material_1.Button, { variant: "contained", type: "submit" }, "Save")),
                                    isLoadingEdit && react_1.default.createElement(material_1.CircularProgress, null))))))),
            react_1.default.createElement(material_1.Dialog, { open: isDeleteDialogOpen, onClose: cancelDeleteUser },
                react_1.default.createElement(material_1.DialogTitle, null, "Are you sure want to delete?"),
                react_1.default.createElement(material_1.DialogContent, null,
                    react_1.default.createElement(material_1.DialogContentText, null, "This action cannot be undone. Please proceed with caution.")),
                react_1.default.createElement(material_1.DialogActions, null,
                    react_1.default.createElement(material_1.Button, { onClick: cancelDeleteUser }, "No"),
                    react_1.default.createElement(material_1.Button, { onClick: submitDeleteUser, autoFocus: true }, "Yes"))),
            react_1.default.createElement(material_1.Dialog, { open: isPasswordDialogOpen, onClose: cancelPassword },
                react_1.default.createElement(material_1.DialogTitle, null, "Change Password"),
                react_1.default.createElement(material_1.DialogContent, null,
                    react_1.default.createElement(material_1.DialogContentText, null, "Please enter new password for this user."),
                    react_1.default.createElement(material_1.TextField, { autoFocus: true, margin: "normal", id: "password", type: "password", fullWidth: true, variant: "outlined", value: newPassword, onChange: (event) => { event.preventDefault(); setNewPassword(event.target.value); } })),
                react_1.default.createElement(material_1.DialogActions, null,
                    react_1.default.createElement(material_1.Button, { onClick: cancelPassword }, "Cancel"),
                    react_1.default.createElement(material_1.Button, { onClick: submitPassword, variant: "contained" }, "Submit")))));
    return (react_1.default.createElement("p", null, "Cannot load user data."));
}
exports.default = UserCard;
