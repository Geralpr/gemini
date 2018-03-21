import React, {Component} from "react";
import * as Utils from "../Utils";
import PropTypes from "prop-types";

// [^0-9~!@#$%^&*()_+={}[]|\\"':;?.<>]
let onlyLetter = /^[a-zA-Z]*$/;
let onlyLetterAndSpace = /^[a-zA-Z ]*$/;
let onlyNumber = /^[0-9]*$/;
let onlyLetterAndNumber = /^.*$/;
let emailAcceptedChar = /^\S*$/;
let emailValidation = /[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})/;
let passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&'])[^ ]{8,}$/;
let field = {
    string: {min: 1, max: 128, regex: onlyLetter},
    number: {min: 1, max: 6, regex: onlyNumber},
    name: {min: 1, max: 128, regex: onlyLetter},
    lastname: {min: 1, max: 128, regex: onlyLetterAndSpace},
    email: {regex: emailAcceptedChar, validation: emailValidation},
    lastSSN: {length: 4, regex: onlyNumber},
    studentNumber: {min: 4, max: 9, regex: onlyNumber},
    zipcode: {length: 5, regex: onlyNumber},
    addressLine: {min: 1, max: 100, regex: onlyLetterAndNumber},
    password: {min: 4, max: 20, regex: emailAcceptedChar, validation: onlyLetterAndNumber}
};

//TODO: fran check when lost focus weird behaviour
class TextInput extends Component {

    static defaultProps = {
        required: true,
        includeLabel: true
    };

    constructor(props) {
        super(props);
        this.editing = false;
        this.state = {value: '', hasError: true};
        this.inputHandler = this.inputHandler.bind(this);
        // this.onKeyDown = this.onKeyDown.bind(this)
    }

    valid() {
        return !this.state.hasError;
    }

    componentDidMount() {
        let value = this.props.value;
        this.setState({value: this.props.value ? this.props.value : "", hasError: this.hasError(value)});
    }

    componentWillReceiveProps(nextProps) {
        if (!this.editing) {
            this.setState({hasError: this.hasError(nextProps.value), value: nextProps.value ? nextProps.value : ""})
        }
    }

    componentWillMount() {
        this.config = field.string;
        if (this.props.type) {
            switch (this.props.type) {
                case 'number':
                    this.config = field.number;
                    break;
                case 'name':
                    this.config = field.name;
                    break;
                case 'lastname':
                    this.config = field.lastname;
                    break;
                case 'email':
                    this.config = field.email;
                    break;
                case 'lastSSN':
                    this.config = field.lastSSN;
                    break;
                case 'studentNumber':
                    this.config = field.studentNumber;
                    break;
                case 'addressLine':
                    this.config = field.addressLine;
                    break;
                case 'zipcode':
                    this.config = field.zipcode;
                    break;
                case 'password':
                    this.config = field.password;
                    break;
            }
        }
    }

    hasError(value) {
        let config = this.config;
        return Utils.isEmpty(value)
            || (config.min && value.length < config.min)
            || (config.length && value.length !== config.length)
            || (config.validation && !config.validation.test(value))
    }

    inputHandler(e) {
        e.persist();
        this.editing = true;

        let value = e.target.value;
        value = this.config.regex.test(value) || value === ""
            ? value.length === 1 ? value.trim() : value
            : this.state.value;

        this.setState({value: value, hasError: this.hasError(value)}, () => {
            if (this.props.onChange)
                this.props.onChange(e);
            this.editing = false;
        });

    }

    render() {
        let isPassword = this.props.type === 'password';
        let hasError = this.state.hasError && this.props.required;
        let grouped = this.props.grouped ? "group" : "";
        let groupClass = grouped + " form-group has-feedback".concat(hasError ? "has-error help-block" : "");
        let props = Object.assign({}, this.props);
        if (this.config.max || this.config.length)
            props = {...props, maxLength: this.config.max || this.config.length};

        let label = this.props.includeLabel
            ? `${this.props.label || this.props.placeholder}`
            : '';
        delete  props.includeLabel;
        let customCss = !props.iconName ? {paddingLeft: 0} : props.style;
        return (

            <div className={groupClass}>
                <input {...props}
                       style={customCss}
                       type={isPassword ? "password" : "text"}
                       className="inputMaterial"
                       onChange={this.inputHandler}
                       value={this.state.value}
                />

                <i className={`n ${this.props.iconName}`}/>
                {this.props.type === "password" ? (<i className="icon-eye"/>) : (null)}
                <span className="highlight"/>
                <span className="bar"/>
                {this.props.includeLabel ? (<label htmlFor={this.props.id}>{label}</label>) : (null)}

            </div>);
    }


}

TextInput.propTypes = {
    required: PropTypes.bool,
    includeLabel: PropTypes.bool
};

export default TextInput;
