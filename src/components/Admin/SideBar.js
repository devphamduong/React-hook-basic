import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaGem, FaGithub } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { DiReact } from 'react-icons/di';
import { useTranslation } from 'react-i18next';
import { MdDashboard } from 'react-icons/md';
import './SideBar.scss';
import { Link, useNavigate } from 'react-router-dom';

function SideBar({ image, collapsed, toggled, handleToggleSidebar }) {

    const navigate = useNavigate();
    const { t } = useTranslation();

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
                            padding: '24px 0 24px 0',
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
                                <DiReact style={{ cursor: 'pointer' }} size={'3em'} color={'00bfff'} className='brand-icon' onClick={() => { navigate('/'); }} /> :
                                <>
                                    <DiReact style={{ cursor: 'pointer' }} size={'3em'} color={'00bfff'} className='brand-icon' onClick={() => { navigate('/'); }} />
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
                            {t('admin.dash-board.title')}
                            <Link to={'/admin'} />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title={t('admin.feature.title')}
                        >
                            <MenuItem>{t('admin.feature.manage-user.title')}<Link to={'/admin/manage-users'} /></MenuItem>
                            <MenuItem>{t('admin.feature.manage-quiz.title')}<Link to={'/admin/manage-quizzes'} /></MenuItem>
                            <MenuItem>{t('admin.feature.manage-question.title')}<Link to={'/admin/manage-questions'} /></MenuItem>
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