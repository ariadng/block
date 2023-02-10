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
function UserCreate() {
    const navigate = (0, react_location_1.useNavigate)();
    const { list: { loadUsers } } = (0, react_1.useContext)(admin_context_1.AdminContext);
    const [editData, setEditData] = (0, react_1.useState)({
        name: "",
        email: "",
        password: "",
        role: "editor"
    });
    const [isLoadingEdit, setIsLoadingEdit] = (0, react_1.useState)(false);
    const submitEdit = async () => {
        setIsLoadingEdit(true);
        const response = await SecuredAPI_1.default.post("user/", editData);
        setTimeout(() => {
            setIsLoadingEdit(false);
            if (response.status === 200) {
                loadUsers();
                navigate({ to: "/admin/user/" + response.data.id });
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
    const goToList = () => {
        navigate({ to: "/admin/user" });
    };
    return (react_1.default.createElement("div", { className: "UserCard" },
        react_1.default.createElement("div", { className: "Profile" },
            react_1.default.createElement("div", { className: "UserEdit" },
                react_1.default.createElement("div", { className: "Details Create" },
                    react_1.default.createElement("h4", null, "Add New User"),
                    react_1.default.createElement("form", { onSubmit: handleEditSubmit },
                        react_1.default.createElement(material_1.TextField, { id: "name", value: editData.name, onChange: handleEditChange, label: "Name", variant: "outlined", fullWidth: true }),
                        react_1.default.createElement(material_1.TextField, { id: "email", value: editData.email, onChange: handleEditChange, label: "Email Address", variant: "outlined", fullWidth: true }),
                        react_1.default.createElement(material_1.Select, { value: editData.role, onChange: handleRoleEditSelect, displayEmpty: true, variant: "outlined", labelId: "role-label", id: "role" },
                            react_1.default.createElement(material_1.MenuItem, { value: "admin" }, "Admin"),
                            react_1.default.createElement(material_1.MenuItem, { value: "editor" }, "Editor")),
                        react_1.default.createElement("div", { className: "FormActions" },
                            !isLoadingEdit && react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement(material_1.Button, { type: "button", onClick: () => { goToList(); } }, "Cancel"),
                                react_1.default.createElement(material_1.Button, { variant: "contained", type: "submit" }, "Save")),
                            isLoadingEdit && react_1.default.createElement(material_1.CircularProgress, null))))))));
}
exports.default = UserCreate;
