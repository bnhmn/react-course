import { calculateInvestmentResults } from '../lib/investment';

export function Result({ input }) {
  const result = calculateInvestmentResults(input);
  return (
    <table id="result">
      <thead>
        <tr>
          <td>Year</td>
          <td>Investment Value</td>
          <td>Interest (Year)</td>
          <td>Total Interest</td>
          <td>Invested Capital</td>
        </tr>
      </thead>
      <tbody>
        {result.map(({ year, interest, valueEndOfYear, totalInterest, totalInvestment }) => (
          <tr key={year}>
            <td>{year}</td>
            <td>{formatter.format(valueEndOfYear)}</td>
            <td>{formatter.format(interest)}</td>
            <td>{formatter.format(totalInterest)}</td>
            <td>{formatter.format(totalInvestment)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * The browser-provided Intl API can be used to format numbers as currency.
 * Example Usage: formatter.format(1000) => yields "$1,000"
 */
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
