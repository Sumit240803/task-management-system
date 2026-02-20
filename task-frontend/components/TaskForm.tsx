"use client";

import { useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TaskFormProps {
  refresh: () => void;
}

export default function TaskForm({ refresh }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = async () => {
    if (!title.trim()) {
      toast.error("Task title is required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/tasks", { title });
      setTitle("");
      toast.success("Task added");
      refresh();
    } catch {
      toast.error("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="flex gap-3 py-4">
        <Input
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button onClick={addTask} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </Button>
      </CardContent>
    </Card>
  );
}