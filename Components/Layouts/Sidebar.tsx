"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdDashboard, MdBuild, MdOutlineMessage, MdOutlineShoppingBag } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { userLogout } from "@/redux/auth/auth-action";
import { closeMobileSidebar } from "@/redux/ui/ui-slice";

const menuItems = [
  { title: "Dashboard", path: "/dashboard", Icon: MdDashboard },
  { title: "Repairs", path: "/repairs", Icon: MdBuild },
  { title: "Products", path: "/products", Icon: MdOutlineShoppingBag },
  { title: "Messages", path: "/messages", Icon: MdOutlineMessage },
];

const Sidebar: React.FC = () => {
  const { user } = useAppSelector((state: any) => state.auth);
  const { sidebarCollapsed, mobileSidebar } = useAppSelector((state: any) => state.ui);
  const pathname = usePathname();
  const navigate = useRouter();
  const dispatch = useAppDispatch();

  const isActive = (p: string) => pathname === p || pathname.startsWith(p + "/");

  return (
    <nav
      className={`pc-sidebar pc-trigger${sidebarCollapsed ? " pc-sidebar-hide" : ""}${
        mobileSidebar ? " mob-sidebar-active" : ""
      }`}
    >
      <div className="navbar-wrapper">
        <div className="m-header">
          <Link href="/dashboard" className="b-brand text-primary">
            <h4 className="mb-0 fw-bold">SDM Admin</h4>
          </Link>
        </div>
        <div className="navbar-content">
          <div className="card pc-user-card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <img
                    src="/assets/images/avatar-1.jpg"
                    alt="admin"
                    className="user-avtar wid-45 rounded-circle"
                  />
                </div>
                <div className="flex-grow-1 ms-3 me-2">
                  <h6 className="mb-0">{user?.name || "Admin"}</h6>
                  <small>Shree Dhandai Mata Mobile</small>
                </div>
              </div>
            </div>
          </div>

          <ul className="pc-navbar">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={isActive(item.path) ? "pc-link active" : "pc-link"}
                  onClick={() => dispatch(closeMobileSidebar())}
                >
                  <span className="pc-micon">
                    <item.Icon className="pc-icon" />
                  </span>
                  <span className="pc-mtext">{item.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#"
                className="pc-link"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(userLogout({ dispatch, navigate }));
                }}
              >
                <span className="pc-micon">
                  <BiLogOut className="pc-icon" />
                </span>
                <span className="pc-mtext">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
