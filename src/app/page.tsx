"use client";

import { useState } from "react";
import { mockJobs } from "@/lib/mock-jobs";
import { Job, JobStatus } from "@/lib/types";
import { SummaryCards } from "@/components/summary-cards";
import { JobsToolbar } from "@/components/jobs-toolbar";
import { JobsTable } from "@/components/jobs-table";
import { JobDetailSheet } from "@/components/job-detail-sheet";
import { AddJobDialog } from "@/components/add-job-dialog";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Briefcase,
  Cpu,
  Settings,
  Bell,
  LogOut,
  Factory,
  RefreshCw,
} from "lucide-react";

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"dueDate" | "quantity">("dueDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // new states
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    const q = search.toLowerCase();
    const matchesSearch =
      job.id.toLowerCase().includes(q) ||
      job.productName.toLowerCase().includes(q) ||
      job.customer.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    let comparison =
      sortBy === "dueDate"
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : a.quantity - b.quantity;
    return sortDir === "asc" ? comparison : -comparison;
  });

  const totalJobs = jobs.length;
  const delayedJobs = jobs.filter((j) => j.status === "Delayed").length;
  const completedJobs = jobs.filter((j) => j.status === "Completed").length;
  const now = new Date();
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const dueSoonJobs = jobs.filter((j) => {
    const due = new Date(j.dueDate);
    return due >= now && due <= threeDaysFromNow && j.status !== "Completed";
  }).length;

  const handleSort = (field: "dueDate" | "quantity") => {
    if (sortBy === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  const handleStatusChange = (jobId: string, newStatus: JobStatus) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob({ ...selectedJob, status: newStatus });
    }
  };

  const handleAddJob = (newJob: Job) => {
    setJobs([newJob, ...jobs]);
  };

  // simulating a network call for refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setJobs(mockJobs);
      setSearch("");
      setStatusFilter("all");
      setSortBy("dueDate");
      setSortDir("asc");
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Factory className="h-6 w-6 text-indigo-500 mr-3" />
          <span className="text-white font-bold text-lg tracking-tight">
            FactoryOS
          </span>
        </div>
        <nav className="flex-1 py-6 px-3 space-y-1">
          <a
            href="#"
            className="flex items-center px-3 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <LayoutDashboard className="h-4 w-4 mr-3 text-indigo-400" /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 hover:bg-slate-800/50 hover:text-slate-200 rounded-lg text-sm font-medium transition-colors"
          >
            <Briefcase className="h-4 w-4 mr-3" /> Jobs / Work Orders
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 hover:bg-slate-800/50 hover:text-slate-200 rounded-lg text-sm font-medium transition-colors"
          >
            <Cpu className="h-4 w-4 mr-3" /> Machines
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 hover:bg-slate-800/50 hover:text-slate-200 rounded-lg text-sm font-medium transition-colors"
          >
            <Settings className="h-4 w-4 mr-3" /> Settings
          </a>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
            <LogOut className="h-4 w-4 mr-3" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-slate-800">
              Production Control
            </h1>
            <span className="text-xs bg-indigo-50 text-indigo-700 font-medium px-2.5 py-0.5 rounded-full border border-indigo-100">
              Live
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* Updated Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors font-medium flex items-center gap-2 px-3 py-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              {isRefreshing ? "Refreshing..." : "Refresh Data"}
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <button className="relative text-slate-400 hover:text-slate-600">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* User Nav Component */}
            <UserNav />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Jobs Overview
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Track and manage production jobs across all machines.
                </p>
              </div>
              <Button
                onClick={() => setIsAddJobOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
              >
                + Create New Job
              </Button>
            </div>

            <SummaryCards
              total={totalJobs}
              delayed={delayedJobs}
              dueSoon={dueSoonJobs}
              completed={completedJobs}
            />

            <div className="space-y-4">
              <JobsToolbar
                search={search}
                onSearchChange={setSearch}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                sortBy={sortBy}
                sortDir={sortDir}
                onSort={handleSort}
              />
              <JobsTable
                jobs={sortedJobs}
                onSelectJob={setSelectedJob}
                sortBy={sortBy}
                sortDir={sortDir}
                onSort={handleSort}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Sheet & Dialog */}
      <JobDetailSheet
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onStatusChange={handleStatusChange}
      />
      <AddJobDialog
        open={isAddJobOpen}
        onOpenChange={setIsAddJobOpen}
        onAddJob={handleAddJob}
      />
    </div>
  );
}