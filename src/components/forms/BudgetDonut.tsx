import React from "react";

interface BudgetDonutProps {
  totalContracted: number;
  totalPaidOut: number;
}

const BudgetDonut: React.FC<BudgetDonutProps> = ({
  totalContracted,
  totalPaidOut,
}) => {
  // Calculate percentages
  const paidPercent = (totalPaidOut / totalContracted) * 100;
  const remainingPercent = 100 - paidPercent;
  const remainingAmount = totalContracted - totalPaidOut;

  // Calculate SVG arc values
  // Full circle circumference = 2πr = 2π(40) ≈ 251.33
  const circumference = 251.33;
  const paidDasharray = (paidPercent / 100) * circumference;
  const remainingDasharray = circumference - paidDasharray;

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format large numbers with K/M
  const formatCompactCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "40px",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      {/* Donut Chart */}
      <div style={{ width: "200px", height: "200px", flexShrink: 0 }}>
        <svg viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
          {/* Paid circle (green) */}
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
          {/* Remaining circle (orange) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#ffc107"
            strokeWidth="15"
            strokeDasharray={`${remainingDasharray} ${circumference}`}
            strokeDashoffset={-paidDasharray}
            strokeLinecap="round"
          />
        </svg>

        {/* Center text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            marginTop: "-100px",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#28a745",
            }}
          >
            {paidPercent.toFixed(0)}%
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#666",
            }}
          >
            Spent
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ flex: 1 }}>
        {/* Paid Out */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              background: "#28a745",
              flexShrink: 0,
            }}
          ></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "600", color: "#333", fontSize: "14px" }}>
              Paid Out
            </div>
            <div
              style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
            >
              {formatCompactCurrency(totalPaidOut)}
            </div>
            <div style={{ fontSize: "12px", color: "#999", marginTop: "3px" }}>
              {paidPercent.toFixed(1)}% of budget
            </div>
          </div>
        </div>

        {/* Remaining */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              background: "#ffc107",
              flexShrink: 0,
            }}
          ></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "600", color: "#333", fontSize: "14px" }}>
              Remaining
            </div>
            <div
              style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
            >
              {formatCompactCurrency(remainingAmount)}
            </div>
            <div style={{ fontSize: "12px", color: "#999", marginTop: "3px" }}>
              {remainingPercent.toFixed(1)}% available
            </div>
          </div>
        </div>

        {/* Total Contracted */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              background: "#007bff",
              flexShrink: 0,
            }}
          ></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "600", color: "#333", fontSize: "14px" }}>
              Total Contracted
            </div>
            <div
              style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
            >
              {formatCompactCurrency(totalContracted)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetDonut;
