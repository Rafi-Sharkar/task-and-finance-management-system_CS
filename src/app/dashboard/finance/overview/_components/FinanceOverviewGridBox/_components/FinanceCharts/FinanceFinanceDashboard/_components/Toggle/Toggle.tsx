type ModeType = "monthly" | "weekly";

interface ToggleProps {
  mode: ModeType;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
}

function Toggle({ mode, setMode }: ToggleProps) {
  return (
    <div className="flex items-center bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setMode("monthly")}
        className={`px-5 py-1.5 text-sm rounded-full transition cursor-pointer 
          ${
            mode === "monthly"
              ? "text-gray-900 bg-white shadow-sm"
              : "text-gray-600"
          }`}
      >
        Monthly
      </button>

      <button
        onClick={() => setMode("weekly")}
        className={`px-5 py-1.5 text-sm rounded-full transition cursor-pointer 
          ${
            mode === "weekly"
              ? "text-gray-900 bg-white shadow-sm"
              : "text-gray-600"
          }`}
      >
        Weekly
      </button>
    </div>
  );
}

export default Toggle;
