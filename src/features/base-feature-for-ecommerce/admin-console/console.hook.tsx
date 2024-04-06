import { useLogin, useMounts, createSrc } from '@magicjs.dev/frontend';
import React, { useState, useRef } from 'react';
import listCompanyProfile from '../project-settings/fetch-project-settings.server';
import getLogoServer from '../project-settings/get-logo.server';

export default function () {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [companyDetails, setCompanyDetails] = useState<any[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { logout } = useLogin();
    const sidebarRef = useRef(null);
    const openSidebarButtonRef = useRef(null);
    const mounts = useMounts();
    const imageSrc = createSrc(getLogoServer);

    const refresh = React.useCallback(() => {
        listCompanyProfile().then(setCompanyDetails);
    }, []);

    React.useEffect(() => {
        refresh();
    }, []);

    const handleLogout = React.useCallback(() => {
        setLoading(true)
        logout().then(() => {
            setIsLogoutModalOpen(false)
        }).catch(() => {
            setLoading(false)
        });
    }, [])

    const navigations = React.useMemo(() => {
        return mounts.current.filter((n) => n.link === true).sort((a, b) => {
            if ((a as any).sortOrder < (b as any).sortOrder) {
                return -1;
            } else if ((a as any).sortOrder > (b as any).sortOrder) {
                return 1;
            } else {
                return 0;
            }
        })
    }, []);

    React.useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                sidebarRef.current &&
                openSidebarButtonRef.current
            ) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    React.useEffect(() => {
        if (window.location.pathname === "/admin") {
            const userNav: any = navigations.find((nav) => nav.appletId.includes("dashboard"))
            window.location.replace(`/admin/${userNav.path}`)
        }
    }, [navigations])

    const toggleSidebar = (e) => {
        e.stopPropagation();
        setIsSidebarOpen((prevState) => !prevState);
    };

    return {
        isLogoutModalOpen,
        loading,
        setIsLogoutModalOpen,
        handleLogout,
        isSidebarOpen,
        sidebarRef,
        openSidebarButtonRef,
        toggleSidebar,
        navigations,
        companyDetails,
        imageSrc
    }
}