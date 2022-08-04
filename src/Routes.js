import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BookData from './components/BookData';
import Header from './components/Header';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignOut from "./components/SignOut";
import SignUp from "./components/SignUp";
import UserProfile from './components/UserProfile';
import UpdateUser from './components/UpdateUser';

import Footer from './components/Footer';
import About from './components/About';
import AuthorData from "./components/AuthorData";
import CategoryData from "./components/CategoryData";


const Routes = () => {

    const signInStatus = useSelector((store) => { return store.appUser.isSignedIn; });

    return (
        <div>
            <div>
                {signInStatus &&
                    <div>
                        <BrowserRouter>
                            <Header />
                            <div style={{ minHeight: "92vh" }} >
                                <Switch>
                                <Route path='/categorydata'> <CategoryData /> </Route>
                                    <Route path='/bookdata'> <BookData /> </Route>
                                    <Route path='/authordata'> <AuthorData /> </Route>
                                    <Route path='/signout'> <SignOut /> </Route>
                                    <Route path='/profile'> <UserProfile />  </Route>
                                    <Route path='/update'> <UpdateUser />  </Route>
                                    <Route path='/footer'> <Footer /> </Route>
                                    <Route path='/'> <Home />  </Route>
                                </Switch>
                                <Footer />
                            </div>
                        </BrowserRouter>
                    </div>}

            </div>
            <div>
                {!signInStatus &&
                    <div>
                        <BrowserRouter>
                            <Header />
                            <div style={{ minHeight: "92vh" }} >
                                <Switch>
                                    <Route path='/signin'> <SignIn /> </Route>
                                    <Route path='/signup'> <SignUp /> </Route>
                                    <Route path='/about'> <About /> </Route>
                                    <Route path='/'> <Home />  </Route>
                                    <Route path='/footer'> <Footer /> </Route>
                                </Switch>
                            </div>
                        </BrowserRouter>
                    </div>}
            </div>
        </div >
    );
}

export default Routes;


{/* return (
            <div className="container-fluid">
                 <p>Routes Component</p>
                    {/* base url - http://localhost:3000/
    
                http://localhost:3000/home
                http://localhost:3000/signin
                http://localhost:3000/bookdata
                http://localhost:3000/authordata  
                if /login then display login component
                if /empdata then display empData component
                if /parent then display parent component
               */}
{/* 
              </div >
         );
     }
    
    //  export default Routes; */}