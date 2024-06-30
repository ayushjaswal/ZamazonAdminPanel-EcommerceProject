import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import { Settings } from "react-feather";
import { NavLink } from "react-router-dom";
interface SidebarComponent {
  path: "/dashboard" | "/products" | "/categories" | "/orders" | "/settings";
  classValue: string;
  Title: "Dashboard" | "Products" | "Categories" | "Orders" | "Settings";
  setCurrentBoard: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarComponent = ({
  path,
  classValue,
  Title,
  setCurrentBoard,
}: SidebarComponent) => {
  return (
    <NavLink
      to={path}
      onClick={() => setCurrentBoard(Title.toLowerCase())}
      className={classValue}
    >
      {path === "/dashboard" ? (
        <DashboardRoundedIcon className="mx-2" />
      ) : path === "/categories" ? (
        <CategoryRoundedIcon className="mx-2" />
      ) : path === "/orders" ? (
        <ReceiptLongRoundedIcon className="mx-2" />
      ) : path === "/products" ? (
        <ShoppingCartRoundedIcon className="mx-2" />
      ) : (
        <Settings className="mx-2" />
      )}
      {Title}
    </NavLink>
  );
};

export default SidebarComponent;
