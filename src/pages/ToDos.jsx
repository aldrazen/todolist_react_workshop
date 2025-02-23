import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ToDoCard from "@/components/ToDoCard";
import axios from "axios";

const SERVER_URL = "http://localhost:3000/todolist";


const ToDos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const toastShown = useRef(false);

  useEffect(() => {
    if (!toastShown.current) {
      if (location.state?.success) {
        toast.success("To-Do added successfully!");
      }
      if (location.state?.deleted) {
        toast.success("To-Do removed successfully!");
      }
      toastShown.current = true;
      navigate(".", { replace: true, state: {} });
    }

    const fetchTodo = async () => {
      try {
        const response = await axios.get(SERVER_URL);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodo();
  }, [location, navigate]);

  return (
    <div>
      <Card className="w-[750px] border-2 mb-5">
        <CardHeader>
          <CardTitle>To Do's</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-5 items-center">
            {data.map((todo, index) => (
              <ToDoCard key={index} data={todo} />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <h1>By Al Drazen Sagarino</h1>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ToDos;
