import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import BookData from './components/BookData';
import store from './redux/store';

// syntax 
// test(arg1, arg2);
// test('test description in English', () => { });

test('BookData component renders properly.', () => {
  render(
    <Provider store={store}>
      <BookData />
    </Provider>
  );
  const dataToTest = screen.getByText('Add New Book');
  expect(dataToTest).toBeInTheDocument();
});

test('BookData component renders properly.', () => {
  render(
    <Provider store={store}>
      <BookData />
    </Provider>
  );
  const dataToTest = screen.getByText('Add New Book');
  expect(dataToTest).toBeVisible();
});





// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
