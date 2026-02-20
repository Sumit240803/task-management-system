"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

import TaskItem from "@/components/TaskItem";
import TaskForm from "@/components/TaskForm";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Task {
  id: string;
  title: string;
  status: boolean;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 5;

const fetchTasks = async () => {
  try {
    const res = await api.get("/tasks", {
      params: {
        search,
        status,
        page,
        limit,
      },
    });

    setTasks(res.data.data);
    setTotalPages(res.data.meta.totalPages);
  } catch {
    toast.error("Failed to fetch tasks");
  }
};

  useEffect(() => {
    fetchTasks();
  }, [search, status, page]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Task Dashboard
          </CardTitle>
        </CardHeader>

        <CardContent>
          <TaskForm refresh={fetchTasks} />

          <Separator className="my-6" />

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />

            <Select
              value={status || "all"}
              onValueChange={(value) => {
                setPage(1);
                setStatus(value === "all" ? "" : value);
              }}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Completed</SelectItem>
                <SelectItem value="false">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Task List */}
          <div>
            {tasks.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No tasks found.
              </p>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  refresh={fetchTasks}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setPage((prev) =>
                        prev > 1 ? prev - 1 : prev
                      )
                    }
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        isActive={page === pageNumber}
                        onClick={() => setPage(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setPage((prev) =>
                        prev < totalPages ? prev + 1 : prev
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
  );
}