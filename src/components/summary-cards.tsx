import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Clock, Layers } from "lucide-react";

interface SummaryCardsProps {
  total: number;
  delayed: number;
  dueSoon: number;
  completed: number;
}

export function SummaryCards({ total, delayed, dueSoon, completed }: SummaryCardsProps) {
  const metrics = [
    { label: "Total Jobs", value: total, icon: Layers, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-l-indigo-500" },
    { label: "Delayed", value: delayed, icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", border: "border-l-red-500" },
    { label: "Due Soon", value: dueSoon, icon: Clock, color: "text-amber-600", bg: "bg-amber-50", border: "border-l-amber-500" },
    { label: "Completed", value: completed, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-l-emerald-500" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m) => (
        <Card key={m.label} className={`shadow-sm border-slate-200 border-l-4 ${m.border} bg-gradient-to-br from-white to-slate-50/50`}>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{m.label}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{m.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${m.bg} ${m.color} shadow-sm`}>
              <m.icon className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}