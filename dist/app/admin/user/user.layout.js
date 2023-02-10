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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./user.style.scss");
const material_1 = require("@mui/material");
const react_location_1 = require("@tanstack/react-location");
const admin_context_1 = require("../admin.context");
function UserLayout() {
    const navigate = (0, react_location_1.useNavigate)();
    const { list: { users, loadUsers } } = (0, react_1.useContext)(admin_context_1.AdminContext);
    const [searchText, setSearchText] = (0, react_1.useState)("");
    const init = async () => {
        await loadUsers();
    };
    (0, react_1.useEffect)(() => {
        init();
    }, []);
    const getFilteredUsers = () => {
        return users.filter(user => user.name ? user.name.toLowerCase().includes(searchText) : false);
    };
    const handleSearchInput = (event) => {
        event.preventDefault();
        const value = event.target.value;
        setSearchText(value);
    };
    const goToCreate = () => {
        navigate({ to: "/admin/user/create" });
    };
    return (react_1.default.createElement("div", { className: "UserLayout" },
        react_1.default.createElement("div", { className: "UserList" },
            react_1.default.createElement("div", { className: "Search" },
                react_1.default.createElement(material_1.TextField, { value: searchText, onChange: handleSearchInput, label: "Search...", variant: "outlined", size: "small", type: "search", fullWidth: true }),
                react_1.default.createElement(material_1.Button, { variant: "contained", onClick: () => { goToCreate(); } },
                    react_1.default.createElement(material_1.Icon, null, "add"),
                    react_1.default.createElement("span", { className: "Label" }, "Add New"))),
            react_1.default.createElement("div", { className: "Rows" }, getFilteredUsers().map(user => (react_1.default.createElement(react_location_1.Link, { to: `/admin/user/${user.id}`, className: "UserRow", key: user.id, getActiveProps: () => ({ className: 'Active' }) },
                react_1.default.createElement("span", { className: "Photo" },
                    react_1.default.createElement("span", { className: "Initials" }, user.name.split(' ').map((a) => a[0]).join(''))),
                react_1.default.createElement("span", { className: "Details" },
                    react_1.default.createElement("span", { className: "Name" }, user.name),
                    react_1.default.createElement("span", { className: "Meta" },
                        react_1.default.createElement("span", { className: "Email" }, user.email),
                        react_1.default.createElement("span", { className: "Role" },
                            "(",
                            user.role,
                            ")")))))))),
        react_1.default.createElement("div", { className: "UserView" },
            react_1.default.createElement(react_location_1.Outlet, null))));
}
exports.default = UserLayout;
