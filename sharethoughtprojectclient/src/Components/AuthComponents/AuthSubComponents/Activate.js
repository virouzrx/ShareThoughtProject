import axios from 'axios';
import { createBrowserHistory } from "history";

function SendConfirmationToken(){
    const history = createBrowserHistory({forceRefresh:true});
    const routeParams = GetRouteAddress();
    let body = {
        UserId: routeParams[0],
        Token: routeParams[1]
    }
    axios.post('https://localhost:5001/api/v1/identity/confirm', body)
    .then(function (response) {
        localStorage.setItem("token", response.data.token)
        history.push('/');
        document.location.reload()
    })
    .catch(function (error) {
        document.getElementById("errorMessage").innerHTML = error.response.data.errors[0];
    });
}

function GetRouteAddress() {
    console.log(window.location.pathname)
    var parts = window.location.pathname.split('/');
    return [parts[2], parts[3]];
}

const Activate = () => {
    SendConfirmationToken();
    return (
        <div>
            
        </div>
    );
}

export default Activate;