import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

type CurrencyData = Record<string, { value: number }>;

class CurrencyObserver {
  private subscribers: ((data: CurrencyData) => void)[] = [];

  subscribe(callback: (data: CurrencyData) => void): void {
    this.subscribers.push(callback);
  }

  notify(data: CurrencyData): void {
    this.subscribers.forEach((callback) => callback(data));
  }
}

const currencyObserver = new CurrencyObserver();

const useFetch = (url: string) => {
  const [data, setData] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();

        setData(result.data);
        currencyObserver.notify(result.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [url]);

  return { data, loading, error };
};

const Barchart = ({ currency }: { currency: string }) => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Exchange Rates",
        data: [] as number[],
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const updateChart = (data: CurrencyData) => {
      if (data[currency]) {
        setChartData({
          labels: [currency],
          datasets: [
            {
              label: `Exchange Rate (${currency})`,
              data: [data[currency]?.value || 0],
              backgroundColor: "rgba(23, 199, 46, 0.8)",
              borderColor: "rgb(5, 56, 26)",
              borderWidth: 2,
            },
          ],
        });
      }
    };

    currencyObserver.subscribe(updateChart);
  }, [currency]);

  useFetch("/api/currency");

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              titleColor: "#000",
              bodyColor: "#000",
              backgroundColor: "#fff",
              borderColor: "#ccc",
              borderWidth: 1,
            },
            legend: {
              labels: {
                color: "#333",
                font: {
                  size: 14,
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#333",
                font: {
                  size: 12,
                },
              },
              grid: {
                color: "rgb(200, 247, 214)",
              },
            },
            y: {
              ticks: {
                color: "#333",
                font: {
                  size: 12,
                },
              },
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          },
        }}
      />
    </div>
  );
};

export { Barchart, currencyObserver, useFetch };
