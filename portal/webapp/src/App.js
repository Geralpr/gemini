import React, {Component} from "react";
import {withRouter} from "react-router-dom";
// import "react-datepicker/dist/react-datepicker.min.css";
import "./style/app.css";
import classnames from "classnames";
import Routes from "./Routes";
import moment from "moment";
import esLocale from "moment/locale/es";
import {connect} from "react-redux";
import {checkSession, logout, onBackAction, triggerErrorOff} from "./redux/actions";
import ReduxBlockUi from 'react-block-ui/redux';
import {bindActionCreators} from "redux";
import * as env from "./env";
import ModalHelper from "./components/ModalHelper";

moment.updateLocale('es', esLocale);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {showMenu: false};
        this.sessionCheck = false;
        this.onRouteChanged = this.onRouteChanged.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.goProfile = this.goProfile.bind(this);
        this.goBack = this.goBack.bind(this);
        this.goHome = this.goHome.bind(this);
        this.goAuthentication = this.goAuthentication.bind(this);
        this.blockUIRegEx = new RegExp(/^\S*_START$/);
        this.unblockUIActionsRegEx = new RegExp(/^(\S*_END)|(\S*_OFF)$/);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.generalErrorOccurred && nextProps.errorMessage) {
            this.refs.modal.open("Upss!!!", nextProps.errorMessage, () => {
                this.props.triggerErrorOff();
            });
        }
    }

    componentWillMount() {
        if (!env.isUserActionUrl(this.props.location.pathname) && !this.sessionCheck) {
            this.props.checkSession();
            this.sessionCheck = true;
        }
    }

    onRouteChanged(nextRoute) {
        this.setState({showMenu: !env.isPublicUrl(nextRoute.pathname) && this.props.authenticated});
    };

    goAuthentication() {
        this.props.history.push("/login");
    }

    goHome() {
        this.props.history.push(`/home`);
    }

    handleLogout() {
        this.props.logout(() => {
            this.props.history.push(`/login`);
        });
    }

    goProfile() {
        this.props.history.push("/profile");
    }

    componentDidMount() {
        //double check
        if (!this.state.showMenu) {
            let path = this.props.location.pathname;
            if (!env.isPublicUrl(path)) {
                this.setState({showMenu: true})
            }
        }
    }

    goBack() {
        let pathname = this.props.location.pathname;
        if (pathname.startsWith("/wizard")) {
            this.props.onBackAction(() => {
                this.props.history.goBack()
            });
        } else if (pathname !== "/" && pathname !== "/home")
            this.props.history.goBack();
    }

    render() {

        let pathname = this.props.location.pathname;
        let currentPageType = this.props.currentPageType;
        let baseClass = classnames({
            "signin": pathname === "/login",
            "instructions": pathname === "/wizard" && currentPageType === "INSTRUCTIONS",
            "question": pathname === "/wizard" && currentPageType === "IS_VOCATIONAL_STUDENT_QUESTION"
        });
        let showNavigation = pathname === "/"
            ? (<div className="col-md-1 navigation-section d-flex align-items-center"
                    onClick={this.goAuthentication}>
                <i className="icon-arrow"/>
            </div>)
            : (<div className="col-md-1 navigation-section violet d-flex align-items-center"
                    onClick={this.goBack}>
                <i className="icon-arrow mirror"/>
            </div>);
        console.log(`pathname = ${pathname} ${baseClass} ${currentPageType} ${currentPageType === "INSTRUCTIONS"}`);

        return (
            <ReduxBlockUi tag="div" block={this.blockUIRegEx} unblock={this.unblockUIActionsRegEx}>
                <div className={`container-fluid ${baseClass}`}>
                    {this.renderUserBar()}

                    <div className="row content">
                        {showNavigation}
                        <Routes loading={this.props.loading} authenticated={this.props.authenticated}
                                onRouteChanged={this.onRouteChanged}/>
                    </div>
                    <div className="row footer d-flex align-items-center">
                        <div className="col-md-1"/>
                        <div className="col-md-8">
                            <span>© 2018 All Rights Reserved</span>
                        </div>
                        <div className="col-md-3 text-right">
                            <span>Build Version: 1.0</span>
                        </div>
                    </div>
                </div>

                <ModalHelper ref="modal"/>
            </ReduxBlockUi>
        );
    }

    renderUserBar() {
        if (this.state.showMenu)
            return (<div className="fixed-top" style={{margin: 10}}>
                <div className="float-right">
                    <div className="dropdown">
                        <button id="user-bar" className="btn btn-secondary dropdown-toggle" type="button"
                                data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                            <span className="pr-2">{this.props.fullName}</span>
                            <i className="fas fa-user"/>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" onClick={this.goHome}>Solicitudes</a>
                            <a className="dropdown-item" onClick={this.handleLogout}>Salir</a>
                        </div>
                    </div>
                </div>
            </div>);
        return (null);
    }

}

function mapStateToProps(store) {
    return {
        fullName: store.profile.user.fullName || "Sin Nombre",
        authenticated: store.profile.authenticated,
        loading: store.profile.loading,
        currentPageType: store.wizard.currentPageType,
        errorMessage: store.profile.errorMessage,
        generalErrorOccurred: store.profile.generalErrorOccurred
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({logout, checkSession, onBackAction, triggerErrorOff}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(App));
