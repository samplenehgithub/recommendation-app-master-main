// import { JsonWebTokenError } from 'jsonwebtoken';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AppUser from '../models/AppUser';
import { signInUser, signOutUser } from '../redux/AppUserSlice';
import { signInService } from '../services/AppUserService';



const SignIn = () => {

    const [appUser, setAppUser] = useState(new AppUser());
    const dispatch = useDispatch();
    const history = useHistory();

    const handleAppUser = (event) => {
        setAppUser({
            ...appUser,
            [event.target.name]: event.target.value
        });
    };

    const submitAppUser = (event) => {
        console.log(appUser);
        signInService(appUser)
            .then((response) => {
                dispatch(signInUser(response.data));
                alert(`Sign In successful for ${response.data.userName}!`);
                // alert. alert-success('Success!!');
                // <div class="container">
                // <h2>Alerts</h2>
                // <div class="alert alert-success">
                //   <strong>Success!</strong> Sign In successful for ${response.data.userName}!
                // </div>
                // </div>
                history.push("/");
            })

            .catch((error) => {
                dispatch(signOutUser());
                console.log(error.message);
            });
        event.preventDefault();
    }

    return (
        <div className="container" >
            {/* <div className="Login"><div></div>
             <div style="text-align:center"></div> */}
             {/* <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}> */}
             
 


           
            {/* <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}></Row> */}
            <p className="display-4 text-primary py-3">SignIn</p>
            
            <div className="col-3 mt-3 py-3 shadow bg-white" >
                <h1 className="lead text-primary pb-2">SignIn</h1>
                <form className="form form-group form-dark " onSubmit={submitAppUser}>
                    <div>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            className="form-control mb-3"
                            placeholder="Enter username"
                            value={appUser.userName}
                            onChange={handleAppUser}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control mb-3"
                            placeholder="Enter password"
                            value={appUser.password}
                            onChange={handleAppUser}
                            required
                        />
                        <div className="form-group">
                            <select className="form-control mb-3" name="role" id="role" onChange={handleAppUser}>
                                <option value="Role">Select a role</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
                        </div>
                        <input
                            type="submit"
                            string="submit"
                            name="submit"
                            className="form-control btn btn-outline-primary"
                            value="SignIn"
                        />
                    </div>
                    {/* const [visible, setVisible] = useState(false)
return (
  <>    
  <CAlert color="success">
  A simple success alert with <CAlertLink href="#">an example link</CAlertLink>. Give it a click if you like.
</CAlert>
  </>
) */}
                
                </form>
            </div>
            <div className="py-3 ">
                <Link to="/signUp" className="btn btn-outline-primary col-3">You can also Sign Up. Click here</Link>
            </div>
     
        </div>
    )
}
export default SignIn;


// app.post("/signUp",async(req,resp) => {
//     let appUser = new appUser(req.body);
//     let result = await user.save();
//     result = result.toObject();
//     delete result.password
//     resp.send(result);


// })

// app.post("/login",async(req, resp) => {
//     if(req.body.password && req.body.email) {
//         let appuser = await AppUser.findOne(req.body).select("-password");
//         if(appUser) {
//             Jwt.sign({ appUser },jwtKey,{expiresIn:"2h"},(err,token) => {
//                 if(err){
//                     resp.send({result: " something went wrong,please try after some time"})
//                 }
//                 resp.send(appUser,{auth:token})
// }
// })

//         } else {
//             resp.send({result : "No User found"})
//         }
//      else {
//         resp.send({result : "No User found"})
//     }

// }