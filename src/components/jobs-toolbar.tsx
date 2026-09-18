import { Input } from "@/components/ui/input";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface JobsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  sortBy: "dueDate" | "quantity";
  sortDir: "asc" | "desc";
  onSort: (field: "dueDate" | "quantity") => void;
}

export function JobsToolbar({ 
  search, onSearchChange, statusFilter, onStatusFilterChange, sortBy, sortDir, onSort 
}: JobsToolbarProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by job ID, product, or customer..."
            className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => onStatusFilterChange(value)}>
          <SelectTrigger className="w-full sm:w-[180px] bg-slate-50 border-slate-200 focus:ring-indigo-500">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Delayed">Delayed</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Explicit Sort Controls */}
      <div className="flex items-center gap-2 border-t lg:border-t-0 lg:border-l border-slate-200 pt-4 lg:pt-0 lg:pl-4">
        <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Sort by:</span>
        <div className="flex items-center bg-slate-100 rounded-lg p-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onSort("dueDate")}
            className={`h-8 px-3 text-xs font-medium ${sortBy === "dueDate" ? "bg-white shadow-sm text-indigo-700" : "text-slate-600 hover:text-slate-900"}`}
          >
            Due Date
            {sortBy === "dueDate" && (
              sortDir === "asc" ? <ArrowUp className="ml-1.5 h-3.5 w-3.5" /> : <ArrowDown className="ml-1.5 h-3.5 w-3.5" />
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onSort("quantity")}
            className={`h-8 px-3 text-xs font-medium ${sortBy === "quantity" ? "bg-white shadow-sm text-indigo-700" : "text-slate-600 hover:text-slate-900"}`}
          >
            Quantity
            {sortBy === "quantity" && (
              sortDir === "asc" ? <ArrowUp className="ml-1.5 h-3.5 w-3.5" /> : <ArrowDown className="ml-1.5 h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}