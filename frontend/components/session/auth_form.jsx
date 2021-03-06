import React from 'react';
import { withRouter } from 'react-router';
import { email_exists } from '../../util/session_api_util';
import SessionFormContainer from './session_form_container';
import { hideModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';


class AuthFormWithoutRouter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: "", errors: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGuest = this.handleGuest.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
      if (this.state.email.length > 3) {
        (email_exists(this.state.email)).then ((answer) => {
        if (answer) {
          this.setState({form: 'login'});
        } else {
          this.setState({form: 'signup'});
        }
      });
    } else {
      this.setState({errors: "Email must be longer than 3 characters"});
    }
  }

  handleChange(e) {
    const email = e.target.value;
    this.setState({email});
  }

  handleGuest(e) {
    e.preventDefault();
    let path;

    if (this.props.location.pathname === "/") {
      path = "/stream";
    } else {
      path = this.props.location.pathname;
    }

    const guest = {user: {email: 'guest@guest.com', password: 'password'}};
    this.props.login(guest).then(() => {
      this.props.hideModal();
      this.props.router.push(path);
    });
  }


  render() {
    const form = this.state.form;

    if (form) {
      return (<SessionFormContainer formType={form} email={this.state.email} />);
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <ul className="form">
            <h4>{this.state.errors}</h4>
            <input type="text" onChange={this.handleChange} value={this.state.email} placeholder="Enter Email Here" autoFocus/>
            <input type="submit" value="Continue"/>
            <button onClick={this.handleGuest}>Guest Log In</button>
          </ul>
        </form>
      );
    }
  }
}

const mapStateToProps = ( state , ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (user) => dispatch(login(user)),
  hideModal: () => dispatch(hideModal())
});

//had to add router and connect for guest log in
const AuthForm = withRouter(AuthFormWithoutRouter);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);
