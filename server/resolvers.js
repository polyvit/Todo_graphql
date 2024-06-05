import Todo from "./models/Todo.js";

const resolvers = {
  Query: {
    welcome: () => "Welcome here",
    getTodos: async () => {
      const todos = await Todo.find();
      return todos;
    },
    getTodo: async (_, args) => {
      const todo = await Todo.findById(args.id);
      return todo;
    },
  },
  Mutation: {
    addTodo: async (_, args) => {
      const newTodo = new Todo({
        title: args.title,
        detail: args.detail,
        date: args.date,
      });
      await newTodo.save();
      return newTodo;
    },
    deleteTodo: async (_, args) => {
      await Todo.findByIdAndDelete(args.id);
      return "Todo was deleted";
    },
    updateTodo: async (_, args) => {
      const { id, title, detail, date } = args;
      const updatedTodo = {};
      if (title != undefined) {
        updatedTodo.title = title;
      }
      if (detail != undefined) {
        updatedTodo.detail = detail;
      }
      if (date != undefined) {
        updatedTodo.date = date;
      }
      const todo = await Todo.findByIdAndUpdate(id, updatedTodo, {
        new: true,
      });
      return todo;
    },
  },
};

export default resolvers;
