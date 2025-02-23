import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const SERVER_URL = "http://localhost:3000/todolist";


const AddToDo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const id = Math.floor(Math.random() * 10);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(SERVER_URL, {
        id: id.toString(),
        title,
        description,
        date,
      });
      navigate("/", { state: { success: true } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <Card className="w-[750px]">
          <CardHeader>
            <CardTitle>Add To Do</CardTitle>
            <CardDescription>Fill all fields to add to do</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col py-10 gap-y-5 w-full">
            <div className="gap-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="gap-y-2">
              <Label>To do Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="gap-y-2">
              <Label>Date</Label>
              <Input value={date} type="date" onChange={(e) => setDate(e.target.value)} />
            </div>
            <Button onClick={handleSubmit}>Add To Do</Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <h1>By Al Drazen Sagarino</h1>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AddToDo;
