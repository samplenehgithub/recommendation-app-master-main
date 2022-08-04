import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Book from "../models/Book";
import Category from "../models/Category";


import { fetchCategoryByName } from "../redux/CategorySlice";
import { getCategoryByIdService, getCategoryByNameService, getAllCategoryService, addCategoryService } from "../services/CategoryService";
import {getAllBooksService} from "../services/BookService";



const CategoryData = () => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState(new Category());
    const [categoryToBeAdded, setCategoryToBeAdded] = useState(new Category());
    const [book, setBook] = useState(new Book());
    const [allCategory, setAllCategory] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    
    // fetch data from store 
    const categoryDataFromStore = useSelector((store) => { return store.category.categoryObj; });
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
        setName(evt.target.value);
    }

    const handleAddCategory = (c) => {
        console.log(c.target.name);
        console.log(c.target.value);
        setCategoryToBeAdded({
            ...categoryToBeAdded,
            [c.target.name]: c.target.value
        });

        setBook({
            ...book,
            [c.target.name]: c.target.value
        });
    }
   
    const submitGetCategoryByName = (evt) => {
        console.log(name);
        evt.preventDefault();
        getCategoryByNameService(name)
            .then((response) => {
                console.log(response.data);
                setCategory(response.data);
                dispatch(fetchCategoryByName(response.data)); // step 2 
                setName('');
            })
            .catch((error) => {
                alert(error);
                setCategory(new Category());
                setName('');
            })
    }
   
    const submitGetAllCategory = (evt) => {
        evt.preventDefault();
        getAllCategoryService()
            .then((response) => {
                setAllCategory(response.data);
                console.log(response.data);
                console.log(allCategory);
            })
            .catch((error) => {
                alert(error);
                setAllCategory([]);
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
   
    const submitAddCategory = (evt) => {
        evt.preventDefault();
        let categoryTemp = { ...categoryToBeAdded, book };
        addCategoryService(categoryTemp)
            .then((response) => {
                console.log(response.data);
                alert(`Category with categoryname ${response.data.categoryName} with categoryId ${response.data.categoryId} added successfully.`);
            })
            .catch(() => {
                setCategoryToBeAdded(new Category());
                categoryTemp = '';
                alert("Category could not be added.");
            });
    }
   
    return (
        <div className="container">
            <p className="display-4 text-primary py-3">CategoryData</p>
            <hr />
            <div className="bg-white shadow shadow-regular mb-3 mt-3 px-3 py-3 pb-3 pt-3 col-4">
                <p className="lead">Add New Category</p>
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
                        id="categoryName"
                        name="categoryName"
                        className="form-control mb-3 mt-3"
                        value={categoryToBeAdded.categoryName}
                        onChange={handleAddCategory}
                        placeholder="Enter Category Name" />
                                   
                     <input
                        type="submit"
                        className="btn btn-outline-primary form-control mb-3 mt-3"
                        value="Add Category"
                        onClick={submitAddCategory}
                    />
                </div>
            </div>
            <div className="bg-white shadow shadow-regular mb-3 mt-3 px-3 py-3 pb-3 pt-3 col-6">
                <p className="lead">Find an Category</p>
                <div>
                    <form className="form form-group">
                        <input
                            type="text"
                            className="form-control mb-3 mt-3"
                            id="categoryName"
                            value={name}
                            placeholder="Enter Category name"
                            onChange={handleChange}
                            autoFocus />
                        <input type="submit" className="form-control mb-3 mt-3 btn btn-outline-primary" value="Get Category" onClick={submitGetCategoryByName} />
                    </form>
                </div>
                <div> {(category.categoryName) &&
                    <div>

                        <p className="lead text-primary">Category Details from State Object</p>
                        <p>Category Id: {category.categoryId} </p>
                        <p>Category Name: {category.categoryName} </p>
                        <table className="table">
                                    <thead>
                                        <tr>
                                            <th>BookId</th>
                                            <th>BookName</th>
                                            <th>Price</th>
                                            <th>AuthorId</th>
                                            <th>AuthorName</th>
                                            <th>Rating</th>
                                        </tr>
                                    </thead>
                        {category.books.map((b => <tbody>
                        <tr>
                        <td>{b.bookId}</td>
                        <td>{b.bookName}</td>
                        <td>{b.price}</td>
                        <td>{b.author.authorId}</td>
                        <td>{b.author.authorName}</td>
                        <td>{b.rating}</td>
                        </tr>
                        </tbody>
                         ))}

                       </table>

                       
                        {/* <p>Book Id:{(category.books && category.books.bookId)}</p>
                        <p>Book Name:{(category.books && category.books.bookName)}</p>   
                        <p>Price:{(category.books && category.books.price)}</p>
                        <p>Category Id:{(category.books && category.books.CategoryId)}</p>
                        <p>Category:{(category.books && category.books.category)}</p> 
                        <p>Rating:{(category.books && category.books.rating)}</p> */}
                    </div>
                }
                </div>
                <div> {(categoryDataFromStore.categoryName) &&
                    <div>
                        <p className="lead text-primary">Category Details from Store</p>
                        <p>Category Id: {categoryDataFromStore.categoryId} </p>
                        <p>Category Name: {categoryDataFromStore.categoryName} </p>
                      
                       <p>{(categoryDataFromStore.books && categoryDataFromStore.books.bookId)}</p>
                       <p>{(categoryDataFromStore.books && categoryDataFromStore.books.bookName)}</p>
                       <p>{(categoryDataFromStore.books && categoryDataFromStore.books.price)}</p>
                       <p>{(categoryDataFromStore.books && categoryDataFromStore.books.categoryId)}</p>
                       <p>{(categoryDataFromStore.books && categoryDataFromStore.books.category)}</p>
                       <p>{(categoryDataFromStore.books && categoryDataFromStore.books.rating)}</p>
                        
                    </div>
                }
                </div>
            </div>
            {/* <div className="bg-white shadow shadow-regular mb-3 mt-3 px-3 py-3 pb-3 pt-3 col-6">
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
            </div> */}
            <div className="bg-white shadow shadow-regular mb-3 mt-3 px-3 py-3 pb-3 pt-3 col-8">
                <p className="lead">Get Book By Category</p>
                <div className="form form-group" >
                    <input
                        type="button"
                        className="btn btn-outline-primary form-control mb-3 mt-3"
                        value="Get All Category"
                        onClick={submitGetAllBooks}
                    />
                </div>
                <div>
                    <div> {(allCategory) &&
                        <div>
                            <p className="text-primary text-center font-weight-bold lead">List of All Category</p>
                            {
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Category </th>
                                            <th>Book Name</th>
                                            <th>Price</th>
                                            <th>Rating</th>
                                           
                                        </tr>
                                    </thead>
                                    { allBooks.map((c =>
                                        <tbody>
                                            <tr>
                                            <td>{(c.category && c.category.categoryName)}</td>
                                                <td>{c.bookName}</td>
                                                <td>{c.price}</td>
                                                <td>{c.rating}</td>                                                
                                                <td>{(c.category && c.category.category)}</td>
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

export default CategoryData;