import SideBar from "./SideBar";
import { FaBars } from "react-icons/fa";
import './Admin.scss';
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Language from "../Header/Language";

function Admin() {

    const { t } = useTranslation();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="leftside" />
                    </span>
                    <div className="rightside">
                        <Language />
                        <NavDropdown title={t('admin.header.settings')} id="basic-nav-dropdown">
                            <NavDropdown.Item>{t('admin.header.profile')}</NavDropdown.Item>
                            <NavDropdown.Item>{t('admin.header.logout')}</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
}

export default Admin;