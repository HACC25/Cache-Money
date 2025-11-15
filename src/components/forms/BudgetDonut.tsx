import React from "react";

interface BudgetDonutProps {
  totalContracted: number;
  totalPaidOut: number;
}

const BudgetDonut: React.FC<BudgetDonutProps> = ({
  totalContracted,
  totalPaidOut,
}) => {
  const paidPercent = (totalPaidOut / totalContracted) * 100;
  const remainingPercent = 100 - paidPercent;
  const remainingAmount = totalContracted - totalPaidOut;

  const circumference = 251.33;
  const paidDasharray = (paidPercent / 100) * circumference;
  const remainingDasharray = circumference - paidDasharray;

  const formatCompactCurrency = (value: number) => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value}`;
  };

  return (
    <div className="p-6 rounded-2xl  bg-white max-w-xl font-sans">
      {/* Header */}
      <div className="flex flex-col leading-tight mb-4">
        <span className="text-sm font-semibold text-gray-600">
          Total Contracted
        </span>
        <span className="text-2xl font-extrabold text-gray-900">
          {formatCompactCurrency(totalContracted)}
        </span>
      </div>

      {/* Donut + Legend container */}
      <div className="flex gap-10 items-start mb-6">
        {/* Donut Chart Wrapper */}
        <div className="relative w-48 h-48">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform -rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="15"
            />

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#28a745"
              strokeWidth="15"
              strokeDasharray={`${paidDasharray} ${circumference}`}
              strokeLinecap="round"
            />

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="15"
              strokeDasharray={`${remainingDasharray} ${circumference}`}
              strokeDashoffset={-paidDasharray}
              strokeLinecap="round"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="text-3xl font-bold text-green-600">
              {paidPercent.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-500">Spent</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-6">
          {/* Paid Out */}
          <div className="flex items-start gap-3">
            <div
              className="w-5 h-5 rounded"
              style={{ backgroundColor: "#28a745" }}
            ></div>
            <div>
              <div className="text-sm font-semibold text-gray-800">
                Paid Out
              </div>
              <div className="text-lg font-bold text-gray-900">
                {formatCompactCurrency(totalPaidOut)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {paidPercent.toFixed(1)}% of budget
              </div>
            </div>
          </div>

          {/* Remaining */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded bg-yellow-400"></div>
            <div>
              <div className="text-sm font-semibold text-gray-800">
                Remaining
              </div>
              <div className="text-lg font-bold text-gray-900">
                {formatCompactCurrency(remainingAmount)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {remainingPercent.toFixed(1)}% available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetDonut;
