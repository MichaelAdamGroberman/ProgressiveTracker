export const getSavedBookIds = () => {
  const save_book_Id = localStorage.getItem('savedBooks')
    ? JSON.parse(localStorage.getItem('savedBooks'))
    : [];

  return save_book_Id;
};

export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('savedBooks', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('savedBooks');
  }
};

export const deleteBookId = (bookId) => {
  const save_book_Id = localStorage.getItem('savedBooks')
    ? JSON.parse(localStorage.getItem('savedBooks'))
    : null;

  if (!save_book_Id) {
    return false;
  }

  const updated_saved_book_Id = save_book_Id?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('savedBooks', JSON.stringify(updated_saved_book_Id));

  return true;
};
