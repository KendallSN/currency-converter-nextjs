export const AmountInput = ({ amount, setAmount }: { amount: string; setAmount: (value: string) => void }) => (
  <div className="mb-4">
    <label htmlFor="amount" className="block text-sm font-medium text-[#FFA500] mb-2">
      Amount
    </label>
    <input
      type="number"
      id="amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="w-full p-3 rounded-lg border border-gray-300 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter amount"
    />
  </div>
);

export const CurrencySelect = ({
  label,
  selectedCurrency,
  setCurrency,
  currencies,
}: {
  label: string;
  selectedCurrency: string;
  setCurrency: (value: string) => void;
  currencies: string[];
}) => (
  <div className="mb-4">
    <label htmlFor={label} className="block text-sm font-medium text-[#FFA500] mb-2">
      {label}
    </label>
    <select
      id={label}
      value={selectedCurrency}
      onChange={(e) => setCurrency(e.target.value)}
      className="w-full p-3 rounded-lg border border-gray-300 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" className="text-white">Select currency...</option>
      {currencies.map((currency) => (
        <option key={currency} value={currency} className="text-gray-800">
          {currency}
        </option>
      ))}
    </select>
  </div>
);

export const SwapButton = ({ handleSwap }: { handleSwap: () => void }) => (
  <div className="mb-4 text-center">
    <button
      onClick={handleSwap}
      className="text-white bg-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      ↔ Swap
    </button>
  </div>
);

export const ConvertButton = ({ handleConvert }: { handleConvert: () => void }) => (
  <div className="mb-4">
    <button
      onClick={handleConvert}
      className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      Convert
    </button>
  </div>
);

export const ResultDisplay = ({ result }: { result: string | null }) => (
  <div className="mt-4 text-center">
    <p className="text-lg font-semibold text-[#FFA500]">
      {result || "Result will appear here"}
    </p>
  </div>
);