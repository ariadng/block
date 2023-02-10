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
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
require("./login.style.scss");
const API_1 = __importDefault(require("../../utils/API"));
const react_location_1 = require("@tanstack/react-location");
const admin_context_1 = require("../admin.context");
const Auth_1 = __importDefault(require("../../utils/Auth"));
function LoginPage() {
    const navigate = (0, react_location_1.useNavigate)();
    const { setUser } = (0, react_1.useContext)(admin_context_1.AdminContext);
    const [formData, setFormData] = (0, react_1.useState)({ email: "", password: "" });
    const [formErrors, setFormErrors] = (0, react_1.useState)({});
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const handleInputChange = (event) => {
        event.preventDefault();
        const id = event.target.id;
        const value = event.target.value;
        setFormData({ ...formData, [id]: value });
        if (formErrors[id])
            setFormErrors({ ...formErrors, [id]: undefined });
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const response = await API_1.default.post("auth/login", formData);
        setTimeout(async () => {
            setIsLoading(false);
            // Errors
            if (response.status === 401) {
                setFormErrors(response.errors);
            }
            // Success
            else if (response.status === 200) {
                localStorage.setItem("accessToken", response.data.accessToken);
                const user = await Auth_1.default.getUser();
                setUser(user);
                navigate({ to: '/admin/page' });
            }
        }, 1000);
    };
    return (react_1.default.createElement("div", { className: "LoginPage" },
        react_1.default.createElement("div", { className: "LoginBox" },
            react_1.default.createElement("div", { className: "Text" },
                react_1.default.createElement("h2", null, "Dashboard"),
                react_1.default.createElement("p", null, "Please login to manage the website.")),
            react_1.default.createElement("form", { onSubmit: handleFormSubmit },
                react_1.default.createElement(material_1.TextField, { value: formData.email, onChange: handleInputChange, error: formErrors["email"] ? true : false, helperText: formErrors["email"] ? formErrors["email"] : "", id: "email", label: "Email Address", variant: "outlined", margin: "normal", fullWidth: true, autoFocus: true }),
                react_1.default.createElement(material_1.TextField, { value: formData.password, onChange: handleInputChange, error: formErrors["password"] ? true : false, helperText: formErrors["password"] ? formErrors["password"] : "", id: "password", label: "Password", type: "password", variant: "outlined", margin: "normal", fullWidth: true }),
                react_1.default.createElement("div", { className: "Actions" },
                    react_1.default.createElement("div", { className: "Secondary" }, isLoading && react_1.default.createElement(material_1.CircularProgress, null)),
                    react_1.default.createElement(material_1.Button, { variant: "contained", size: "large", type: "submit", disabled: isLoading }, "Login"))))));
}
exports.default = LoginPage;
