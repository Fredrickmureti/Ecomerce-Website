import { createSrc } from '@magicjs.dev/frontend';
import React, { useState } from 'react';
import listCompanyProfile from './project-settings/fetch-project-settings.server';
import getLogoServer from './project-settings/get-logo.server';

export default function () {
    const [companyDetails, setCompanyDetails] = useState<any>(null);
    const imageSrc = createSrc(getLogoServer);

    const refresh = React.useCallback(() => {
        listCompanyProfile().then(setCompanyDetails);
    }, []);

    React.useEffect(() => {
        refresh();
    }, []);

    return {
        imageSrc,
        companyDetails
    }
}