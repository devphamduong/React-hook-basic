import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaGem, FaGithub } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { DiReact } from 'react-icons/di';
import { MdDashboard } from 'react-icons/md';
import './SideBar.scss';
import { Link, useNavigate } from 'react-router-dom';

function SideBar({ image, collapsed, toggled, handleToggleSidebar }) {

    const navigate = useNavigate();

    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <div className='sidebar-header'>
                            {collapsed ?
                                <DiReact size={'3em'} color={'00bfff'} /> :
                                <>
                                    <DiReact size={'3em'} color={'00bfff'} />
                                    <span onClick={() => { navigate('/'); }}>Pham Chu Duong</span>
                                </>
                            }
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        >
                            Dashboard
                            <Link to={'/admin'} />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title='Features'
                        >
                            <MenuItem>Quản lý User<Link to={'/admin/manage-users'} /></MenuItem>
                            <MenuItem>Quản lý Bài Quiz<Link to={'/admin/manage-quizzes'} /></MenuItem>
                            <MenuItem>Quản lý Câu Hỏi<Link to={'/admin/manage-questions'} /></MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/phamduongdev"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            {collapsed ?
                                <FaGithub /> :
                                <>
                                    <FaGithub />
                                    <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>phamduongdev
                                    </span>
                                </>
                            }
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    );
}

export default SideBar;