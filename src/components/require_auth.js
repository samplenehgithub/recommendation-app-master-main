// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { createStore } from "redux";
// const store = createStore(reducer);

// export default function (ComposedComponent) {

//   // If user not authenticated render out to root

//   class Authentication extends Component {
//     static contextTypes = {
//       router: React.PropTypes.object
//     };

//     componentWillMount() {
//       if (!this.props.authenticated) {
//         this.context.router.push('/');
//       }
//     }

//     componentWillUpdate(nextProps) {
//       if (!nextProps.authenticated) {
//         this.context.router.push('/');
//       }
//     }

//     render() {
//       return <ComposedComponent {...this.props} />;
//     }
//   }

//   function mapStateToProps(state) {
//     return { authenticated: state.authenticated };
//   }

//   return connect(mapStateToProps)(Authentication);
// }