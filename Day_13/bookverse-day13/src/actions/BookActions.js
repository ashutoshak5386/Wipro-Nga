import AppDispatcher from "../dispatcher/Dispatcher";

export const BookActions = {
  addBook(book) {
    AppDispatcher.dispatch({
      type: "ADD_BOOK",
      payload: book,
    });
  },
};
