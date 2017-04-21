import React from 'react';
import { withRouter } from 'react-router';


class NavbarWithoutRouter extends React.Component {

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleUserPage = this.handleUserPage.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

  }


  handleHome(e) {
    e.preventDefault();
    if (this.username) {
      this.props.router.push('/stream');
    } else {
      this.props.router.push('/');
    }
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout().then(() => this.props.router.push('/'));
  }

  handleUserPage(e) {
    e.preventDefault();
    this.props.router.push(`/users/${this.props.userId}`);
  }

  handleUpload(e) {
    e.preventDefault();
    this.props.router.push('/upload');
  }

  render() {
    //Replace search with search component
    return (
      <ul className="navbar">
        <button className="left_search" onClick={this.handleHome}>Logo</button>
        <button className="left_search" onClick={this.handleHome}>Home</button>
        <div className="search">Search</div>
        <button onClick={this.handleUpload}>Upload</button>
        <button onClick={this.handleUserPage}>{this.props.username}</button>
        <button onClick={this.handleLogout}>Logout</button>
      </ul>
    );
  }
}

const Navbar = withRouter(NavbarWithoutRouter);

export default Navbar;
