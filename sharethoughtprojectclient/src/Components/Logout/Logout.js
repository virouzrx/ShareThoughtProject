import { createBrowserHistory } from 'history';

function onLoadLogout() {
        const history = createBrowserHistory({ forceRefresh: true });
        localStorage.removeItem("token");
        history.push('/');
        document.location.reload()
}

const Logout = () => {
    return ( <div>{onLoadLogout()}</div> );
}
 
export default Logout;