import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { categoryMap, typeMap } from "@/constants/transactions.constants";
import { formatDate } from "@/lib/format";

export default function TransactionsTable({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-sm border p-10 text-center text-muted-foreground">
        No transactions yet.
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{formatDate(transaction.date)}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{categoryMap[transaction.category]}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    transaction.type === "income" ? "accent" : "secondary"
                  }
                  className="py-3"
                >
                  {typeMap[transaction.type]}
                </Badge>
              </TableCell>
              <TableCell
                className={cn(
                  "text-right ",
                  transaction.type === "income"
                    ? "text-primary"
                    : "text-destructive",
                )}
              >
                {transaction.type === "expense" ? "-₱ " : "₱ "}
                {transaction.amount.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
