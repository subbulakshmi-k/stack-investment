import React, { useState } from 'react'; // Removed useEffect as calculation will be on button click
// import logo from './logo.svg'; // Removed logo import
import './App.css';

function App() {
  // State variables for the calculator inputs
  const [stockName, setStockName] = useState('');
  const [initialInvestment, setInitialInvestment] = useState(''); // Changed to empty string
  const [growthRate, setGrowthRate] = useState(''); // Changed to empty string
  const [years, setYears] = useState(''); // Changed to empty string
  const [finalAmount, setFinalAmount] = useState(0); // Renamed from futureValue for clarity
  const [totalProfit, setTotalProfit] = useState(0);
  const [returnsPercentage, setReturnsPercentage] = useState(0);

  // Function to calculate the investment returns
  const calculateReturns = () => {
    const principal = parseFloat(initialInvestment);
    const rate = parseFloat(growthRate) / 100; // Convert percentage to decimal
    const numYears = parseFloat(years);

    if (isNaN(principal) || isNaN(rate) || isNaN(numYears) || principal <= 0 || numYears <= 0) {
      setFinalAmount(0);
      setTotalProfit(0);
      setReturnsPercentage(0);
      return;
    }

    // Compound interest formula: FV = P * (1 + r)^n
    const calculatedFinalAmount = principal * Math.pow((1 + rate), numYears);
    const calculatedTotalProfit = calculatedFinalAmount - principal;
    const calculatedReturnsPercentage = (calculatedTotalProfit / principal) * 100;

    setFinalAmount(calculatedFinalAmount.toFixed(2));
    setTotalProfit(calculatedTotalProfit.toFixed(2));
    setReturnsPercentage(calculatedReturnsPercentage.toFixed(2));
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> Removed logo */}
        <h1>Stock Investment Calculator</h1>

        <div className="calculator-container"> {/* Added a class for easier styling */}
          <div className="input-group">
            <label htmlFor="stockName">Stock Name:</label>
            <input
              type="text"
              id="stockName"
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
              placeholder="e.g., Gold,Silver,Diamond"
            />
          </div>

          <div className="input-group">
            <label htmlFor="initialInvestment">Initial Investment (₹):</label>
            <input
              type="number"
              id="initialInvestment"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              min="0"
              step="1000"
            />
          </div>

          <div className="input-group">
            <label htmlFor="growthRate">Expected Growth Rate (%):</label>
            <input
              type="number"
              id="growthRate"
              value={growthRate}
              onChange={(e) => setGrowthRate(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>

          <div className="input-group">
            <label htmlFor="years">Investment Period (Years):</label>
            <input
              type="number"
              id="years"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              min="1"
              step="1"
            />
          </div>

          <button className="calculate-button" onClick={calculateReturns}>
            Calculate Returns
          </button>

          {finalAmount > 0 && ( // Only show summary if calculation has been made
            <div className="investment-summary">
              <h2>Investment Summary</h2>
              <div className="summary-item">
                <span>Final Amount:</span>
                <span>₹{finalAmount}</span>
              </div>
              <div className="summary-item">
                <span>Total Profit:</span>
                <span>₹{totalProfit}</span>
              </div>
              <div className="summary-item">
                <span>Returns:</span>
                <span>{returnsPercentage}%</span>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;