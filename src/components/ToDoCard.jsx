import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ToDoCard = ({ data }) => {
  return (
    <div>
      <Link to={`to-do/${data.id}`}>
        <Card className="w-[600px] border-2 hover:shadow-lg cursor-pointer transition-transform duration-300 ease-out hover:scale-105 will-change-transform bg-slate-50">
          <CardHeader>
            <CardTitle>{data.title}</CardTitle>
          </CardHeader>
          <CardContent>Click to see full details.</CardContent>
          <CardFooter className="flex justify-between ">
            <h1>{data.date}</h1>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default ToDoCard;
