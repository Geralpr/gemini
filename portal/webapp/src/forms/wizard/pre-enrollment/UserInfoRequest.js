import React, {Component} from "react";
import TextInput from "../../../components/TextInput";
import CodeSelect from "../../../components/CodeSelect";
import DateInput from "../../../components/DateInput";
import {saveProfile} from "../../../redux/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import profileIllustration from "../../../style/img/profile-illustration.png";
import SimpleDateInput from "../../../components/SimpleDateInput";

class UserInfoRequest extends Component {

    constructor(props) {
        super(props);
        this.inputHandler = this.inputHandler.bind(this);
        this.onValidDate = this.onValidDate.bind(this);
        this.onError = this.onError.bind(this);
    }

    inputHandler(e) {
        let form = this.props.form;
        let element = e.target;
        form[element.id] = element.value;
    }

    onValidDate(date) {
        let form = this.props.form;
        form.dateOfBirth = date;
    }


    onPress(onResult) {
        let form = this.props.form;
        this.props.saveProfile(form, onResult, this.onError);
    }

    onError(validationMessage) {
        alert(JSON.stringify(validationMessage));
    }

    render() {
        let form = this.props.form;

        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description"><h2>Su Perfil</h2>
                    <div className="violet-line"></div>
                </div>
            </div>
            <div className="body d-flex align-items-center flex-column justify-content-end" style={{padding: 20}}>
                <form id="profile-form">
                    <div className="row plr15">
                        <div className="col-md-3">
                            <TextInput id="firstName" type="name"
                                       label="Nombre"
                                       ref="firstName"
                                       onChange={this.inputHandler}
                                       value={form.firstName}
                                       grouped/>
                        </div>
                        <div className="col-md-3">
                            <TextInput id="middleName" type="name"
                                       label="Segundo Nombre"
                                       onChange={this.inputHandler}
                                       value={form.middleName}
                                       grouped/>
                        </div>
                        <div className="col-md-6">
                            <TextInput id="lastName" type="lastname"
                                       ref="lastName"
                                       label="Apellidos"
                                       onChange={this.inputHandler}
                                       value={form.lastName}
                                       grouped/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <SimpleDateInput showFormat={false}
                                             label="Fecha de Nacimiento"
                                             ref="dob"
                                             onValidDate={this.onValidDate}
                                             onInvalidDate={this.onInvalidDate}
                                             value={form.dateOfBirth}
                                             required
                                             grouped/>
                        </div>
                        <div className="col-md-6 pt-4">
                            <CodeSelect id="relationType"
                                        label="Seleccione relacion con el estudiante"
                                        ref="registrationRelations"
                                        codeType="registrationRelations"
                                        value={form.relationType}
                                        onChange={this.inputHandler}
                                        grouped/>
                        </div>
                    </div>
                    {/*<div className="row mt50 bt1p pt40">*/}
                    {/*<div className="col-md-12">*/}
                    {/*<button className="button-green mr30 mob-mb30px" type="submit"><span>s</span>Submit</button>*/}
                    {/*<a href="#" className="button-white"*/}
                    {/*onclick="window.open('instructions.html', '_self')"><span>s</span>Skip</a></div>*/}
                    {/*</div>*/}
                    {this.props.footer}
                </form>
            </div>
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src={profileIllustration} alt=""/></div>
            </div>];
    }

    renderOld() {
        let form = this.props.form;
        return (<form>
            <div className="row">
                <div className="col-md-3">
                    <TextInput id="firstName" type="name"
                               placeholder="Nombre"
                               ref="firstName"
                               onChange={this.inputHandler}
                               value={form.firstName}/>
                </div>
                <div className="col-md-3">
                    <TextInput id="middleName" type="name"
                               required={false}
                               placeholder="Segundo Nombre"
                               onChange={this.inputHandler}
                               value={form.middleName}/>
                </div>
                <div className="col-md-6">
                    <TextInput id="lastName" type="lastname"
                               ref="lastName"
                               placeholder="Apellidos"
                               onChange={this.inputHandler}
                               value={form.lastName}/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <DateInput showFormat={false}
                               label="Fecha de Nacimiento"
                               ref="dob"
                               onValidDate={this.onValidDate}
                               onInvalidDate={this.onInvalidDate}
                               value={form.dateOfBirth}/>
                </div>
                <div className="col-md-6">
                    <CodeSelect id="relationType"
                                label="Seleccione relacion con el estudiante"
                                ref="registrationRelations"
                                codeType="registrationRelations"
                                value={form.relationType}
                                onChange={this.inputHandler}/>
                </div>
            </div>

        </form>);
    }
}

function mapStateToProps(store) {
    return {
        form: store.profile.form
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({saveProfile}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(UserInfoRequest);