import { Job, JobStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, ArrowUpDown, ChevronRight, SearchX } from "lucide-react";

interface JobsTableProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  sortBy: "dueDate" | "quantity";
  sortDir: "asc" | "desc";
  onSort: (field: "dueDate" | "quantity") => void;
}

export function JobsTable({ jobs, onSelectJob, sortBy, sortDir, onSort }: JobsTableProps) {
  const SortIcon = ({ field }: { field: "dueDate" | "quantity" }) => {
    if (sortBy !== field) return <ArrowUpDown className="h-3 w-3 text-slate-300 ml-1.5" />;
    return sortDir === "asc" ? <ArrowUp className="h-3 w-3 text-indigo-600 ml-1.5" /> : <ArrowDown className="h-3 w-3 text-indigo-600 ml-1.5" />;
  };

  const isOverdue = (dateStr: string, status: JobStatus) => {
    if (status === "Completed") return false;
    return new Date(dateStr) < new Date();
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-slate-500">Job ID</th>
              <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-slate-500">Product</th>
              <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-slate-500">Customer</th>
              <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => onSort("quantity")}>
                <div className="flex items-center">Quantity <SortIcon field="quantity" /></div>
              </th>
              <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => onSort("dueDate")}>
                <div className="flex items-center">Due Date <SortIcon field="dueDate" /></div>
              </th>
              <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-slate-500">Machine</th>
              <th className="px-5 py-3.5 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-24 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <div className="bg-slate-50 p-4 rounded-full mb-4">
                      <SearchX className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-lg font-semibold text-slate-900">No jobs found</p>
                    <p className="text-sm text-slate-500 mt-1 max-w-sm">We couldn't find any jobs matching your current search and filters. Try adjusting them.</p>
                  </div>
                </td>
              </tr>
            ) : (
              jobs.map((job) => {
                const overdue = isOverdue(job.dueDate, job.status);
                return (
                  <tr
                    key={job.id}
                    onClick={() => onSelectJob(job)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSelectJob(job);
                    }}
                    className="group cursor-pointer transition-all duration-200 hover:bg-indigo-50/60 select-none outline-none focus-visible:bg-indigo-50"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">{job.id}</td>
                    <td className="px-5 py-4 text-slate-700 font-medium">{job.productName}</td>
                    <td className="px-5 py-4 text-slate-700">{job.customer}</td>
                    <td className="px-5 py-4 text-slate-700 font-medium">{job.quantity.toLocaleString()}</td>
                    <td className={`px-5 py-4 font-medium ${overdue ? "text-red-600" : "text-slate-700"}`}>
                      <div className="flex items-center gap-2">
                        {new Date(job.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        {overdue && <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Overdue</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4"><StatusBadge status={job.status} /></td>
                    <td className="px-5 py-4 text-slate-700">{job.machineName}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 text-slate-300 group-hover:text-indigo-600 transition-colors">
                        <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">View</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: JobStatus }) {
  const styleMap: Record<JobStatus, string> = {
    Pending: "bg-slate-100 text-slate-700 border-slate-200",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
    Delayed: "bg-red-50 text-red-700 border-red-200",
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  const dotMap: Record<JobStatus, string> = {
    Pending: "bg-slate-400",
    "In Progress": "bg-blue-500",
    Delayed: "bg-red-500",
    Completed: "bg-emerald-500",
  };
  return (
    <Badge variant="outline" className={`font-medium text-[11px] px-2.5 py-0.5 flex items-center gap-1.5 w-fit ${styleMap[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotMap[status]}`}></span>
      {status}
    </Badge>
  );
}