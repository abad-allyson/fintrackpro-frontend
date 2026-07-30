import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/constants/global.constants";
import { getSelectedLabel } from "@/lib/getSelectedLabel";

export default function BudgetTable({ budgets, onRowClick }) {
  if (budgets.length === 0) {
    return (
      <div className="rounded-sm border p-10 text-center text-muted-foreground">
        No budgets yet.
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-2">
        {budgets.map((budget, index) => (
          <Card
            key={budget._id}
            onClick={() => onRowClick(budget)}
            className="cursor-pointer hover:bg-muted/40 transition-colors px-2"
          >
            <CardContent className="py-2">
              <div className="grid grid-cols-[180px_140px_140px_140px_1fr_60px] items-center gap-6">
                {/* Category */}
                <div>
                  <p className="font-semibold text-lg">
                    {getSelectedLabel(categories, budget.category)}
                  </p>
                </div>

                {/* Monthly Limit */}
                <div>
                  <p className="text-xs text-muted-foreground">Monthly Limit</p>
                  <p className="font-semibold">
                    ₱{budget.monthlyLimit.toLocaleString()}
                  </p>
                </div>

                {/* Spent */}
                <div>
                  <p className="text-xs text-muted-foreground">Spent</p>
                  <p className="font-semibold">
                    ₱{budget.spent?.toLocaleString()}
                  </p>
                </div>

                {/* Remaining */}
                <div>
                  <p className="text-xs text-muted-foreground">Remaining</p>
                  <p
                    className={`font-semibold ${
                      budget.remaining < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    ₱{budget.remaining?.toLocaleString()}
                  </p>
                </div>

                {/* Progress */}

                {/* Percentage */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
