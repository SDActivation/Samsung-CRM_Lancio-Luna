import React, { Component, type ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './v2/Studio';
import './styles.css';
class ErrorBoundary extends Component<{children:ReactNode},{error:boolean}>{state={error:false};static getDerivedStateFromError(){return {error:true};}render(){return this.state.error?<main className="empty"><h1>The studio could not load.</h1><p>Reload to restore the reproducible demo.</p><button onClick={()=>window.location.reload()}>Reload studio</button></main>:this.props.children;}}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><ErrorBoundary><App/></ErrorBoundary></React.StrictMode>);

import './v5/theme.css';
