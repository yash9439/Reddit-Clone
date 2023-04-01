import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SubGreddiitUsers from './SubGreddiitUsers';
import SubGreddiitPostPage from './SubGreddiitPostPage';
import SubGreddiitJoiningReqPage from './SubGreddiitJoiningReqPage';
import SubGreddiitStats from './SubGreddiitStats';
import SubGreddiitReportedPage from './SubGreddiitReportedPage';

import { useState } from 'react';

function SubGreddiitPostTabs() {

    const [Tab_EventKey, Set_Tab_EventKey] = useState("SubGreddiitPostPage_EventKey");

    const handleKeyDown = (event) => {
        if (event.key === '1') {
            Set_Tab_EventKey("SubGreddiitPostPage_EventKey");
        } else if (event.key === '2') {
            Set_Tab_EventKey("SubGreddiitUsers_EventKey");
        } else if (event.key === '3') {
            Set_Tab_EventKey("SubGreddiitJoiningReqPage_EventKey");
        } else if (event.key === '4') {
            Set_Tab_EventKey("SubGreddiitStats_EventKey");
        } else if (event.key === '5') {
            Set_Tab_EventKey("SubGreddiitReportedPage_EventKey");
        }
    }

    return (
        <div onKeyDown={handleKeyDown} tabIndex="0">
        <Tabs
            defaultActiveKey={Tab_EventKey}
            id="justify-tab-example"
            className="mb-3"
            justify
            activeKey={Tab_EventKey} onSelect={(k) => Set_Tab_EventKey(k)}
            onKeyDown={handleKeyDown}
        >
            <Tab eventKey="SubGreddiitPostPage_EventKey" title="SubGreddiitPostPage">
                <SubGreddiitPostPage />
                <div className='auth-card'>
                </div>
            </Tab>
            <Tab eventKey="SubGreddiitUsers_EventKey" title="SubGreddiitUsers">
                <SubGreddiitUsers />
                <div className='auth-card'>
                </div>
            </Tab>
            <Tab eventKey="SubGreddiitJoiningReqPage_EventKey" title="SubGreddiitJoiningReqPage">
                <SubGreddiitJoiningReqPage />
                <div className='auth-card'>
                </div>
            </Tab>
            <Tab eventKey="SubGreddiitStats_EventKey" title="SubGreddiitStats">
                <SubGreddiitStats />
                <div className='auth-card'>
                </div>
            </Tab>
            <Tab eventKey="SubGreddiitReportedPage_EventKey" title="SubGreddiitReortedPage">
                <SubGreddiitReportedPage />
                <div className='auth-card'>
                </div>
            </Tab>
        </Tabs>
    </div>
    );
}

export default SubGreddiitPostTabs;