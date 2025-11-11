import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/Dispatcher";

class BookStore extends EventEmitter {
  constructor() {
    super();
    this.books = [];

    AppDispatcher.register((action) => {
      switch (action.type) {
        case "ADD_BOOK":
          this.books.push(action.payload);
          this.emit("change");
          break;
        default:
          break;
      }
    });
  }

  getAllBooks() {
    return this.books;
  }

  addChangeListener(callback) {
    this.on("change", callback);
  }

  removeChangeListener(callback) {
    this.removeListener("change", callback);
  }
}

export default new BookStore();
