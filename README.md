# Production Control Dashboard

A small internal tool for factory operations managers to track production jobs, monitor machine status, and quickly spot jobs that need attention.

Built as part of a front-end engineer assignment. Focus was on product thinking, clean component structure, and sensible state handling — not feature bloat.

---

## Live Demo

🔗 [https://your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

## Screenshots

*(Add 2-3 screenshots here — dashboard view, job detail panel open, create job modal)*

---

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** for components
- **lucide-react** for icons

No other UI libraries, table libraries, or chart libraries were used. The table is built with plain HTML `<table>` elements and Tailwind.

---

## Features

### Summary Metrics
Four cards at the top: Total Jobs, Delayed, Due Soon (within 3 days), Completed. Colors and icons make the important ones (delayed) stand out.

### Jobs Table
Displays all jobs with Job ID, Product, Customer, Quantity, Due Date, Status, and Machine.

- Overdue jobs are highlighted in red with an "Overdue" badge.
- Status badges have a colored dot + colored background (Pending/In Progress/Delayed/Completed).
- Rows are keyboard-accessible (`tabIndex`, `Enter` to open).

### Search, Filter, Sort
- Search by job ID, product name, or customer.
- Filter by status.
- Sort by Due Date or Quantity, ascending/descending. Sort controls are in the toolbar AND on table headers.

### Job Detail Panel
Clicking a row opens a side sheet (shadcn `Sheet`) with:
- Full job details (product, customer, quantity, due date, machine)
- Notes and issues (issues highlighted in red)
- Status update dropdown + Save button

Updating the status updates the table row AND the summary cards immediately.

### Create New Job
A modal (`Dialog`) for adding a new job. Newly created jobs appear at the top of the table.

### Refresh
Simulates a network call — spinner for ~800ms, then resets the data to the mock set.

### User Menu
Dropdown with profile, settings, sign out (non-functional placeholders).

### Empty State
When filters return no results, a friendly empty state is shown with an icon and helpful text.

---

## Component Structure
