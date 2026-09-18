import { useState, useEffect } from "react";
import { Job, JobStatus } from "@/lib/types";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface JobDetailSheetProps {
  job: Job | null;
  onClose: () => void;
  onStatusChange: (jobId: string, newStatus: JobStatus) => void;
}

export function JobDetailSheet({ job, onClose, onStatusChange }: JobDetailSheetProps) {
  const [localStatus, setLocalStatus] = useState<JobStatus>("Pending");

  useEffect(() => {
    if (job) setLocalStatus(job.status);
  }, [job]);

  if (!job) return null;

  const handleUpdate = () => {
    onStatusChange(job.id, localStatus);
  };

  return (
    <Sheet open={!!job} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-md w-full overflow-y-auto p-0 bg-slate-50 border-l border-slate-200">
        <div className="p-6 bg-white border-b border-slate-200">
          <SheetHeader>
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold text-slate-900">{job.id}</SheetTitle>
              <Badge variant="outline" className="text-xs">{job.status}</Badge>
            </div>
            <SheetDescription className="text-slate-500 mt-1">
              {job.productName}
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Customer</p>
                <p className="font-medium text-slate-900">{job.customer}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Quantity</p>
                <p className="font-medium text-slate-900">{job.quantity.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Due Date</p>
                <p className="font-medium text-slate-900">{new Date(job.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Assigned Machine</p>
                <p className="font-medium text-slate-900">{job.machineName}</p>
              </div>
            </div>
            
            {(job.notes || job.issues) && <Separator className="my-4" />}
            
            {job.notes && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Notes</p>
                <p className="text-sm text-slate-700 leading-relaxed">{job.notes}</p>
              </div>
            )}
            
            {job.issues && (
              <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">Issues</p>
                <p className="text-sm text-red-700">{job.issues}</p>
              </div>
            )}
          </div>

          {/* Status Update Section */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-800 mb-4">Update Status</p>
            <div className="space-y-3">
              <Select value={localStatus} onValueChange={(v) => setLocalStatus(v as JobStatus)}>
                <SelectTrigger className="w-full bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleUpdate} 
                disabled={localStatus === job.status} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {localStatus === job.status ? "No changes to save" : "Save Status Update"}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}