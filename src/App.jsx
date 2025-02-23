import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Todos from "./pages/Todos";
import Todo from "./pages/Todo";
import AddToDo from "./pages/AddToDo";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Todos />} />
      <Route path="/to-do/:id" element={<Todo />} />
      <Route path="/add-to-do" element={<AddToDo />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
