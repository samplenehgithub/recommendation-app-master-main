import { Link } from 'react-router-dom';
const Footer = () => {

    return (
        <div className=' bg-dark'>
            <div className=' container-fluid'>
                <div className="py-3">
                <Link to="/contactUs" className="btn btn-outline-light col-2">Contact Us</Link>
            </div>
            </div>
        </div>
    );
}

export default Footer;












// // import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// const Footer = () => {

//     return (
//         <div className=' bg-dark'>
//             <div className=' container-fluid'>
//                 <div className="py-3">
//                 <Link to="/contactUs" className="btn btn-outline-light col-2">Contact Us</Link>
//             </div>
//             </div>
//         </div>



//     );
// }

// export default Footer;



