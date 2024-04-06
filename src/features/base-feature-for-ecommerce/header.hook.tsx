import { useLogin, createSrc } from '@magicjs.dev/frontend';
import React, { useState } from 'react';
import fetchCompanyProfile from './project-settings/fetch-project-settings.server';
import getLogoServer from './project-settings/get-logo.server';

export default function () {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { logout, isCurrentUserInAnyRoles } = useLogin();
    const [loading, setLoading] = useState(false);
    const [companyDetails, setCompanyDetails] = useState<any>(null);
    const imageSrc = createSrc(getLogoServer);

    const handleLogout = React.useCallback(() => {
        setLoading(true)
        logout().then(() => {
            setIsLogoutModalOpen(false)
        }).catch(() => {
            setLoading(false)
        });
    }, [])

    const refresh = React.useCallback(() => {
        fetchCompanyProfile().then(setCompanyDetails);
    }, []);

    React.useEffect(() => {
        refresh();
    }, []);


    const isSuperAdmin = React.useMemo(() => {
        return isCurrentUserInAnyRoles("SUPER_ADMIN")
    }, [isCurrentUserInAnyRoles])
    return {
        isLogoutModalOpen,
        loading,
        setIsLogoutModalOpen,
        handleLogout,
        imageSrc,
        companyDetails,
        isSuperAdmin
    }
}