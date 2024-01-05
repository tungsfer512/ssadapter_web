import {Route, Switch} from "react-router";
import ApiKeys from "@/pages/KeysAndCertificates/ApiKeys";
import SecurityServerTlsKey from "@/pages/KeysAndCertificates/SecurityServerTlsKey";
import SignAndAuthKeys from "@/pages/KeysAndCertificates/SignAndAuthKeys";
import {NavLink} from "umi";

const KeysAndCertificate = () => {
    return (
        <>
            <ul className='menu-bar'>
                <li>
                    <NavLink to={'/keys-and-certificates/sign-and-auth-key'} activeClassName='active'>SIGN and AUTH Keys </NavLink>
                </li>
                <li>
                    <NavLink to={'/keys-and-certificates/api-key'} activeClassName='active'>API Keys </NavLink>
                </li>
                <li>
                    <NavLink to={'/keys-and-certificates/security-server-tls-key'} activeClassName='active'>Security Server TLS Key </NavLink>
                </li>
            </ul>
            <Switch>
                <Route exact path="/keys-and-certificates/api-key">
                    <ApiKeys/>
                </Route>
                <Route exact path="/keys-and-certificates/security-server-tls-key">
                    <SecurityServerTlsKey/>
                </Route>
                <Route exact path="/keys-and-certificates/sign-and-auth-key">
                    <SignAndAuthKeys/>
                </Route>
            </Switch>
        </>
    );
};

export default KeysAndCertificate;
