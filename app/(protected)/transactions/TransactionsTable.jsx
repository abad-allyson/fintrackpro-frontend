export default function TransactionsTable({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-sm border p-10 text-center text-muted-foreground">
        No transactions yet.
      </div>
    );
  }

  return <div className="rounded-lg border"></div>;
}
