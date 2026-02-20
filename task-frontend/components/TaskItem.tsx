"use client";

import api from "@/lib/axios";
import toast from "react-hot-toast";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    status: boolean;
  };
  refresh: () => void;
}

export default function TaskItem({
  task,
  refresh,
}: TaskItemProps) {
  const toggle = async () => {
    try {
      await api.patch(`/tasks/${task.id}/toggle`);
      refresh();
    } catch {
      toast.error("Failed to update task");
    }
  };

  const remove = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      toast.success("Task deleted");
      refresh();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return (
    <Card className="mb-3">
      <CardContent className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={task.status}
            onCheckedChange={toggle}
          />

          <span
            className={`${
              task.status
                ? "line-through text-muted-foreground"
                : ""
            }`}
          >
            {task.title}
          </span>

          <Badge variant={task.status ? "secondary" : "default"}>
            {task.status ? "Completed" : "Pending"}
          </Badge>
        </div>

        <Button
          variant="destructive"
          size="sm"
          onClick={remove}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}