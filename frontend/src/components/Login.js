import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { useState } from 'react';

function Login() {

  const [Tab_EventKey, Set_Tab_EventKey] = useState("SignIn_EventKey");

  return (
    <Tabs
      defaultActiveKey={Tab_EventKey}
      id="justify-tab-example"
      className="mb-3"
      justify
      activeKey={Tab_EventKey} onSelect={(k) => Set_Tab_EventKey(k)}
    >
      <Tab eventKey="SignIn_EventKey" title="SignIn">
        <SignIn />
        <div className='auth-card'>
          <p onClick={(k) => Set_Tab_EventKey('SignUp_EventKey')} > Don't have an account? Sign Up </p>
        </div>
      </Tab>
      <Tab eventKey="SignUp_EventKey" title="SignUp">
        <SignUp />
        <div className='auth-card'>
          <p onClick={(k) => Set_Tab_EventKey('SignIn_EventKey')} > Already have an account? Sign in </p>
        </div>
      </Tab>
    </Tabs>
  );
}

export default Login;