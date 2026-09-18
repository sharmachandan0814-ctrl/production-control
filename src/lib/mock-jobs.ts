import { Job } from "./types";

const today = new Date();
const getFutureDate = (days: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

export const mockJobs: Job[] = [
  {
    id: "JOB-1001",
    productName: "Steel Bracket",
    customer: "Acme Corp",
    quantity: 500,
    dueDate: getFutureDate(1),
    status: "In Progress",
    machineId: "M-01",
    machineName: "CNC Mill 1",
    notes: "Customer wants a slight chamfer on edges.",
  },
  {
    id: "JOB-1002",
    productName: "Aluminum Housing",
    customer: "TechDyne",
    quantity: 1200,
    dueDate: getFutureDate(-1),
    status: "Delayed",
    machineId: "M-03",
    machineName: "Injection Molder",
    issues: "Raw material shipment late. Expect 2 day delay.",
  },
  {
    id: "JOB-1003",
    productName: "Copper Coil",
    customer: "Watt Systems",
    quantity: 300,
    dueDate: getFutureDate(5),
    status: "Pending",
    machineId: "M-02",
    machineName: "Winder A",
    notes: "Standard spec, no special instructions.",
  },
  {
    id: "JOB-1004",
    productName: "Plastic Knob",
    customer: "HomeGoods Inc",
    quantity: 5000,
    dueDate: getFutureDate(-5),
    status: "Completed",
    machineId: "M-04",
    machineName: "Injection Molder 2",
    notes: "Shipped on time.",
  },
  {
    id: "JOB-1005",
    productName: "Steel Shaft",
    customer: "Acme Corp",
    quantity: 800,
    dueDate: getFutureDate(2),
    status: "In Progress",
    machineId: "M-05",
    machineName: "Lathe 1",
    notes: "Tolerance ±0.05mm.",
  },
  {
    id: "JOB-1006",
    productName: "Rubber Gasket",
    customer: "SealPro",
    quantity: 2000,
    dueDate: getFutureDate(-2),
    status: "Delayed",
    machineId: "M-06",
    machineName: "Press 2",
    issues: "Mold needs repair. Waiting on maintenance.",
  },
  {
    id: "JOB-1007",
    productName: "Aluminum Plate",
    customer: "AeroParts",
    quantity: 150,
    dueDate: getFutureDate(10),
    status: "Pending",
    machineId: "M-01",
    machineName: "CNC Mill 1",
    notes: "Requires anodizing after milling.",
  },
];