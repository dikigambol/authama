import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HeaderAdmin({href}) {
    const [burgerMenu, setBurgerMenu] = useState("");
    const [notifMenu, setNotifMenu] = useState("");
    const [akunMenu, setAkunMenu] = useState("");

    const router = useRouter();

    const burgerMenuAction = (burgerMenu) => {
        setBurgerMenu(burgerMenu);
    };

    const notifMenuAction = (notifMenu) => {
        setNotifMenu(notifMenu);
    };

    const akunMenuAction = (akunMenu) => {
        setAkunMenu(akunMenu);
    };

    useEffect(() => {
        const handleClickOutsideMenu = (event) => {
            const notifArea = document.getElementById('notif-az-menu');
            const akunArea = document.getElementById('akun-az-menu');
            if (notifArea && !notifArea.contains(event.target)) {
                setNotifMenu('hide');
            }
            if (akunArea && !akunArea.contains(event.target)) {
                setAkunMenu('hide');
            }
        };

        document.addEventListener('click', handleClickOutsideMenu);
        document.addEventListener('touchstart', handleClickOutsideMenu);
        return () => {
            document.removeEventListener('click', handleClickOutsideMenu);
            document.removeEventListener('touchstart', handleClickOutsideMenu);
        };
    }, []);

    return (
        <div className="az-header">
            <div className="container">
                <div className="az-header-left">
                    <Link href="/" className="az-logo"><span /> authama.</Link>
                    <a onClick={() => burgerMenuAction("show")} className="az-header-menu-icon d-lg-none"><span /></a>
                </div>
                <div className={`az-header-menu ${burgerMenu}`}>
                    <div className="az-header-menu-header">
                        <Link href="/" className="az-logo"><span /> authama.</Link>
                        <a href="#" onClick={() => burgerMenuAction("hide")} className="close">×</a>
                    </div>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link href="/dashboard" className={`nav-link ${router.pathname === '/dashboard' ? 'active' : ''}`}><i className="typcn typcn-chart-area-outline" /> Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/products" className={`nav-link ${router.pathname === '/products' ? 'active' : ''}`}><i className="typcn typcn-th-menu-outline" />Products</Link>
                        </li>
                    </ul>
                </div>
                <div className="az-header-right">
                    <div id='notif-az-menu' className={`dropdown az-header-notification ${notifMenu}`}>
                        <a href="#" onClick={() => notifMenuAction("show")} className="new"><i className="typcn typcn-bell" /></a>
                        <div className="dropdown-menu">
                            <div className="az-dropdown-header mg-b-20 d-sm-none">
                                <a href="#" className="az-header-arrow">
                                    <i className="icon ion-md-arrow-back" onClick={() => notifMenuAction("hide")} />
                                </a>
                            </div>
                            <h6 className="az-notification-title">Notifications</h6>
                            <p className="az-notification-text">You have 2 unread notification</p>
                            <div className="az-notification-list">
                                <div className="media new">
                                    <div className="media-body">
                                        <p>
                                            <strong>Joyce Chua</strong> just created a new blog post
                                        </p>
                                        <span>Mar 13 04:16am</span>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-footer">
                                <a href="#">View All Notifications</a>
                            </div>
                        </div>
                    </div>
                    <div id="akun-az-menu" className={`dropdown az-profile-menu ${akunMenu}`}>
                        <a href="#" className="az-img-user" onClick={() => akunMenuAction("show")}>
                            <img src="https://i.ibb.co/rGX1hvv/account-icon-user-icon-vector-graphics-292645-552.jpg" alt="profil" />
                        </a>
                        <div className="dropdown-menu">
                            <div className="az-dropdown-header d-sm-none">
                                <a href="#" className="az-header-arrow" onClick={() => akunMenuAction("hide")}>
                                    <i className="icon ion-md-arrow-back" />
                                </a>
                            </div>
                            <div className="az-header-profile">
                                <h6>Aziana Pechon</h6>
                                <span>Dosen FTD</span>
                            </div>
                            <Link href="" className="dropdown-item"><i className="typcn typcn-user-outline"></i> Profile</Link>
                            <Link href="" className="dropdown-item"><i className="typcn typcn-power-outline" /> Sign Out</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`az-navbar-backdrop ${burgerMenu}`}></div>
        </div>
    )
}