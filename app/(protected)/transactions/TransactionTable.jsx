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
import { getSelectedLabel } from "@/lib/getSelectedLabel";
import { categories, types } from "@/constants/global.constants";
import { formatDate } from "@/lib/format";

export default function TransactionsTable({ transactions, onRowClick }) {
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
            <TableRow key={index} onClick={() => onRowClick(transaction)}>
              <TableCell>{formatDate(transaction.date)}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                {getSelectedLabel(categories, transaction.category)}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    transaction.type === "income" ? "accent" : "secondary"
                  }
                  className="py-3"
                >
                  {getSelectedLabel(types, transaction.type)}
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
                {transaction.type === "expense" ? "-₱" : "+₱"}
                {transaction.amount.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
