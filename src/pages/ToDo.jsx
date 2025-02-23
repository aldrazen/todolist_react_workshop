import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { X, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SERVER_URL = "http://localhost:3000/todolist";

const ToDo = () => {
  const [todo, setTodo] = useState([]);
  const [editedTodo, setEditedTodo] = useState({ id:"", title: "", description: "", date: "" });
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/${id}`);
        setTodo(response.data);
        setEditedTodo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    setEditedTodo({ ...editedTodo, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${SERVER_URL}/${id}`, editedTodo);
      setTodo(editedTodo);
      setIsUpdateDialogOpen(false);
      toast.success("To-Do updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${SERVER_URL}/${id}`);
      navigate("/", { state: { deleted: true } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-[750px]">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <h1>{todo.title}</h1>
          <div className="flex gap-x-2">
            <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-700">
                  <SquarePen size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Update To Do</DialogTitle>
                  {/* <DialogDescription></DialogDescription> */}
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="">
                    <Label>Title</Label>
                    <Input name="title" value={editedTodo.title} onChange={handleChange} />
                  </div>
                  <div className="">
                    <Label>Description</Label>
                    <Textarea name="description" value={editedTodo.description} onChange={handleChange} />
                  </div>
                  <div className="">
                    <Label>Date</Label>
                    <Input name="date" type="date" value={editedTodo.date} onChange={handleChange} />
                  </div>
                </div>
                <DialogFooter>
                  <Button className="bg-zinc-700 hover:bg-black" onClick={() => setIsUpdateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-700" onClick={handleUpdate}>
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="hover:bg-red-700">
                  <X size={20} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-md rounded-lg bg-white p-6 shadow-lg border border-gray-200">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl font-bold text-red-600">Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600 text-sm">
                    This action cannot be undone. This will permanently delete your To-Do.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className=" hover:bg-gray-300 ">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
                    Yes, Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardTitle>
        <CardDescription>{todo.date}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center py-10">
        <p>{todo.description}</p>
      </CardContent>
    </Card>
  );
};

export default ToDo;
