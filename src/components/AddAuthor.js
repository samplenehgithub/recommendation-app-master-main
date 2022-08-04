import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Book from "../models/Book";
import Author from "../models/Author";
import { fetchAuthorById } from "../redux/AuthorSlice";
import { getAuthorByIdService, getAuthorByNameService, getAllAuthorsService, addAuthorService } from "../services/AuthorService";
import {getAllBooksService} from "../services/BookService";



const AuthorData = () => {

    const [id, setId] = useState('');
    const [author, setAuthor] = useState(new Author());
    const [authorToBeAdded, setAuthorToBeAdded] = useState(new Author());
    const [book, setBook] = useState(new Book());
    const [allAuthors, setAllAuthors] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    
    // fetch data from store 
    const authorDataFromStore = useSelector((store) => { return store.author.authorObj; });
    // const bookDataFromStore = useSelector((store) => { return store.book. bookObj; });
    // send data to store - steps - 1, 2
    // step 1
    const dispatch = useDispatch();

    useEffect(
        () => {

        }
        , []);

    const handleChange = (evt) => {
        console.log(evt.target.name);
        console.log(evt.target.value);
        setId(evt.target.value);
    }

    const handleAddAuthor = (a) => {
        console.log(a.target.name);
        console.log(a.target.value);
        setAuthorToBeAdded({
            ...authorToBeAdded,
            [a.target.name]: a.target.value
        });

        setBook({
            ...book,
            [a.target.name]: a.target.value
        });
    }
   
    const submitGetAuthorById = (evt) => {
        console.log(id);
        evt.preventDefault();
        getAuthorByIdService(id)
            .then((response) => {
                console.log(response.data);
                setAuthor(response.data);
                dispatch(fetchAuthorById(response.data)); // step 2 
                setId('');
            })
            .catch((error) => {
                alert(error);
                setAuthor(new Author());
                setId('');
            })
    }
   
    const submitGetAllAuthors = (evt) => {
        evt.preventDefault();
        getAllAuthorsService()
            .then((response) => {
                setAllAuthors(response.data);
                console.log(response.data);
                console.log(allAuthors);
            })
            .catch((error) => {
                alert(error);
                setAllAuthors([]);
            });
    }
   
    const submitGetAllBooks= (evt) => {
        evt.preventDefault();
        getAllBooksService()
            .then((response) => {
                setAllBooks(response.data);
                console.log(response.data);
                console.log(allBooks);
            })
            .catch((error) => {
                alert(error);
                setAllBooks([]);
            });
    }
   
    const submitAddAuthor = (evt) => {
        evt.preventDefault();
        let authorTemp = { ...authorToBeAdded, book };
        addAuthorService(authorTemp)
            .then((response) => {
                console.log(response.data);
                alert(`Author with author name ${response.data.authorName} with authorId ${response.data.authorId} added successfully.`);
            })
            .catch(() => {
                setAuthorToBeAdded(new Author());
                authorTemp = '';
                alert("Author could not be added.");
            });
    }
   
    return (
        <div className="container">
            <p className="display-4 text-primary py-3">AuthorData</p>
            <hr />
            <div className="bg-white shadow shadow-regular mb-3 mt-3 px-3 py-3 pb-3 pt-3 col-4">
                <p className="lead">Add New Author</p>
                <div className="form form-group" >
                    
                    {/* <input
                        type="number"
                        id="authorId"
                        name="authorId"
                        className="form-control mb-3 mt-3"
                        value={authorToBeAdded.authorId}
                        onChange={handleAddAuthor}
                        placeholder="Enter Author Id" />
                     */}
                    <input
                        type="text"
                        id="authorName"
                        name="authorName"
                        className="form-control mb-3 mt-3"
                        value={authorToBeAdded.authorName}
                        onChange={handleAddAuthor}
                        placeholder="Enter Author Name" />
                                   
                     <input
                        type="submit"
                        className="btn btn-outline-primary form-control mb-3 mt-3"
                        value="Add Author"
                        onClick={submitAddAuthor}
                    />
                </div>
            </div>
            <div className="bg-white shadow shadow-regular mb-3 mt-3 px-3 py-3 pb-3 pt-3 col-4">
                <p className="lead">Find an Author</p>
                <div>
                    <form className="form form-group">
                        <input
                            type="number"
                            className="form-control mb-3 mt-3"
                            id="authorId"
                            value={id}
                            placeholder="Enter Author id"
                            onChange={handleChange}
                            autoFocus />
                        <input type="submit" className="form-control mb-3 mt-3 btn btn-outline-primary" value="Get Author" onClick={submitGetAuthorById} />
                    </form>
                </div>
                <div> {(author.authorId) &&
                    <div>
                        <p className="lead text-primary">Author Details from State Object</p>
                        <p>Author Id: {author.authorId} </p>
                        <p>Author Name: {author.authorName} </p>
                       
                        <p>Book Id:{(author.book && author.book.bookId)}</p>
                        <p>Book Name:{(author.book && author.book.bookName)}</p>   
                        <p>Price:{(author.book && author.book.price)}</p>
                        <p>Category Id:{(author.book && author.book.CategoryId)}</p>
                        <p>Category:{(author.book && author.book.category)}</p> 
                        <p>Rating:{(author.book && author.book.rating)}</p>                          
                    </div>
                }
                </div>
                <div> {(authorDataFromStore.authorId) &&
                    <div>
                        <p className="lead text-primary">Author Details from Store</p>
                        <p>Author Id: {authorDataFromStore.authorId} </p>
                        <p>Author Name: {authorDataFromStore.authorName} </p>
                      
                       <p>{(authorDataFromStore.book && authorDataFromStore.book.bookId)}</p>
                       {/* <p>{(authorDataFromStore.book && authorDataFromStore.book.bookName)}</p>
                       <p>{(authorDataFromStore.book && authorDataFromStore.book.price)}</p>
                       <p>{(authorDataFromStore.book && authorDataFromStore.book.categoryId)}</p>
                       <p>{(authorDataFromStore.book && authorDataFromStore.book.category)}</p>
                       <p>{(authorDataFromStore.book && authorDataFromStore.book.rating)}</p> */}
                        
                    </div>
                }
                </div>
            </div>
            <div className="bg-white shadow shadow-regular mb-3 mt-3 px-3 py-3 pb-3 pt-3 col-6">
                <p className="lead">Get All Authors</p>
                <div className="form form-group" >
                    <input
                        type="button"
                        className="btn btn-outline-primary form-control mb-3 mt-3"
                        value="Get All Authors"
                        onClick={submitGetAllAuthors}
                    />
                </div>
                <div>
                    <div> {(allAuthors) &&
                        <div>
                            <p className="text-primary text-center font-weight-bold lead">List of All Athors</p>
                            {
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Author Id</th>
                                            <th>Author Name</th>
                                        </tr>
                                    </thead>
                                    {allAuthors.map((a =>
                                        <tbody>
                                            <tr>
                                                <td>{a.authorId}</td>
                                                <td>{a.authorName}</td>
                                              
                                                <td>{(a.book && a.book.bookId)}</td>
                                                <td>{(a.book && a.book.bookName)}</td>
                                                <td>{(a.book && a.book.price)}</td>
                                                <td>{(a.book && a.book.rating)}</td>
                                                <td>{(a.book && a.book.authorId)}</td>
                                                <td>{(a.book && a.book.categoryId)}</td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            }
                        </div>
                    }
                    </div>
                </div>
            </div>
            <div className="bg-white shadow shadow-regular mb-3 mt-3 px-3 py-3 pb-3 pt-3 col-8">
                <p className="lead">Get Book By Authors</p>
                <div className="form form-group" >
                    <input
                        type="button"
                        className="btn btn-outline-primary form-control mb-3 mt-3"
                        value="Get All Authors"
                        onClick={submitGetAllBooks}
                    />
                </div>
                <div>
                    <div> {(allBooks) &&
                        <div>
                            <p className="text-primary text-center font-weight-bold lead">List of All Athors</p>
                            {
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Author Name</th>
                                            <th>Book Name</th>
                                            <th>Price</th>
                                            <th>Rating</th>
                                            <th>Category</th>
                                        </tr>
                                    </thead>
                                    { allBooks.map((b =>
                                        <tbody>
                                            <tr>
                                            <td>{(b.author && b.author.authorName)}</td>
                                                <td>{b.bookName}</td>
                                                <td>{b.price}</td>
                                                <td>{b.rating}</td>                                                
                                                <td>{(b.category && b.category.category)}</td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            }
                        </div>
                    }
                    </div>
                </div>
                </div>


        </div >
    );
}

export default AuthorData;






















// import axios from "axios";
// import { useEffect, useState } from "react";

// const AuthorData = () => {
//     let [id, setAuthorId] = useState('');
//     let [name, setAuthorName] = useState('');

//     let [authorDataToDisplay, setAuthorDataToDisplay] = useState('');

//     const handleChange = (evt) => {
//         setAuthorId(evt.target.value);
//         setAuthorDataToDisplay({
//             id: '',
//             name: ''
//         });
//     }

//     const getAuthorById = (evt) => {
//         console.log(id);
//         axios.get(`http://localhost:9999/user/get-author-by-id/${id}`)
//             .then((response) => {
//                 setAuthorDataToDisplay(response.data);
//                 setAuthorId('');
//             })
//             .catch(() => {
//                 alert(`Author with AuthorId ${id} not found!`);
//                 setAuthorId('');
//                 setAuthorDataToDisplay({
//                     id: '',
//                     name: ''
//                 });
//             });
//         evt.preventDefault();
//     }

//     const handleChange1 = (evt) => {
//         setAuthorName(evt.target.value);
//         setAuthorDataToDisplay({
//             id: '',
//             name: ''
//         });
//     }

//     const getAuthorByName = (evt) => {
//         console.log(name);
//         axios.get(`http://localhost:9999/user/get-author-by-name/${name}`)
//             .then((response) => {
//                 setAuthorDataToDisplay(response.data);
//                 setAuthorName(" ");
//             })
//             .catch(() => {
//                 alert(`Author with name ${name} not found!`);
//                 setAuthorName('');
//                 setAuthorDataToDisplay({
//                     id: '',
//                     name: ''
//                 });
//             });
//         evt.preventDefault();
//     }



//     return (
//         <div className="container">
//             <div>
//                 <p className="display-4 text-primary py-3">AuthorData</p>
//                 <hr />
//                 <p className="lead">Search Your Author Here!!!!!</p>
//                 <div className="row pt-3">
//                     <div className="col-3 md-auto px-3 pt-3 bg-white shadow">
//                         <p className="lead text-info">Search Author By Id:</p>
//                         <form className="form form-group">
//                             <input
//                                 className="form-control mb-3"
//                                 type="number"
//                                 id="id"
//                                 name="id"
//                                 value={id}
//                                 placeholder="Enter id"
//                                 onChange={handleChange}
//                                 autoFocus>
//                             </input>
//                             <input
//                                 className="form-control btn btn-outline-primary"
//                                 type="submit"
//                                 value="Search Author"
//                                 onClick={getAuthorById}>
//                             </input>
//                         </form>
//                     </div>    
//                     <p className="lead">Search Author by name</p>
//                 <div className="row pt-3">
//                     <div className="col-3 md-auto px-3 pt-3 bg-white shadow">
//                         <p className="lead text-info">Search Author:</p>
//                         <form className="form form-group">
//                             <input
//                                 className="form-control mb-3"
//                                 type="string"
//                                 id="name"
//                                 name="name"
//                                 value={name}
//                                 placeholder="Enter name"
//                                 onChange={handleChange1}
//                                 autoFocus>
//                             </input>
//                             <input
//                                 className="form-control btn btn-outline-primary"
//                                 type="submit"
//                                 value="Search Author"
//                                 onClick={getAuthorByName}>
//                             </input>
//                         </form>
//                     </div>
//                     <div className="col-4 ml-auto mr-auto px-3 py-3 bg-white shadow">
//                         <p className="lead text-info">Author details:</p>
//                         <hr />
//                         <p>AuthorId: {authorDataToDisplay.authorId}</p>
//                         <p>AuthorName: {authorDataToDisplay.authorName}</p>

//                     </div>
//                 </div>
//             </div>
//         </div>
//         </div>
//     );
// }


// export default AuthorData;



