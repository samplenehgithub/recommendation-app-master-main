// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import {  applyMiddleware, compose } from 'redux';
// import { Router, Route, IndexRoute } from 'react-router';
// import reduxThunk from 'redux-thunk';
// import { AUTHENTICATE_THE_USER } from './actions/types';
// import RequireAuth from './components/auth/require_auth';
// import reducers from './reducers';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';

// /* ...import necessary components */

// const createStoreWithMiddleware = compose(applyMiddleware(reduxThunk))(createStore);

// const store = createStoreWithMiddleware(reducers);

// /* ... */

// // Check for token and update application state if required
// const token = localStorage.getItem('token');
// if (token) {
//     store.dispatch({ type: AUTHENTICATE_THE_USER });
// }

// /* ... */

// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history}>
//       <Route path="/" component={App}>
//         <IndexRoute component={Index} />
//         <Route path="signin" component={SignIn} />
//         <Route path="signup" component={SignUp} />
//         <Route path="dashboard" component={RequireAuth(Graph)} />
//         <Route path="isauthenticated" component={RequireAuth(IsAuthenticated)} />
//         ... some other route requires logged in ...
//       </Route>
//     </Router>
//   </Provider>
//   , document.getElementById('entry'));





import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

// const jwt = require('jsonwebtoken');
// const jwtkey='e-ecomm'; 

const root =
  ReactDOM.createRoot
    (document.getElementById('root'));
    

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);



















// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// export default App;

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();