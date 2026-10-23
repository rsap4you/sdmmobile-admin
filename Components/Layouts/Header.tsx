"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiFullscreenLine } from "react-icons/ri";
import { SlSizeFullscreen } from "react-icons/sl";
import { IoReorderThreeOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { userLogout } from "@/redux/auth/auth-action";
import { toggleSidebar, toggleMobileSidebar } from "@/redux/ui/ui-slice";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [full, setFull] = useState(false);
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: any) => state.auth);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
    setFull(!full);
  };

  return (
    <header className="pc-header">
      <div className="header-wrapper">
        <div className="me-auto pc-mob-drp">
          <ul className="list-unstyled">
            {/* desktop: hide / show sidebar */}
            <li className="pc-h-item pc-sidebar-collapse">
              <a
                href="#"
                className="pc-head-link ms-0"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(toggleSidebar());
                }}
              >
                <IoReorderThreeOutline />
              </a>
            </li>
            {/* mobile: open sidebar */}
            <li className="pc-h-item pc-sidebar-popup">
              <a
                href="#"
                className="pc-head-link ms-0"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(toggleMobileSidebar());
                }}
              >
                <IoReorderThreeOutline />
              </a>
            </li>
          </ul>
        </div>

        <div className="ms-auto">
          <ul className="list-unstyled">
            <li className="pc-h-item">
              <a
                className="pc-head-link ms-0"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFullscreen();
                }}
              >
                {full ? <SlSizeFullscreen className="pc-icon" /> : <RiFullscreenLine className="pc-icon" />}
              </a>
            </li>
            <li className="dropdown pc-h-item header-user-profile">
              <a className="pc-head-link me-0" role="button" onClick={() => setOpen(!open)}>
                <img src="/assets/images/avatar-1.jpg" alt="admin" className="user-avtar" />
              </a>
              {open && (
                <div className="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown show">
                  <div className="dropdown-body p-3">
                    <h6 className="mb-3">{user?.name || "Admin"}</h6>
                    <div className="d-grid">
                      <button
                        className="btn btn-primary"
                        onClick={() => dispatch(userLogout({ dispatch, navigate }))}
                      >
                        <BiLogOut className="me-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
