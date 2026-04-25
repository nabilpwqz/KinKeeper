export const statusStyles = {
  overdue: "bg-red-100 text-red-700",
  "almost due": "bg-amber-100 text-amber-700",
  "on-track": "bg-emerald-100 text-emerald-700",
};

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
