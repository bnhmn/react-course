export function UserInput({ input, onChange }) {
  const { initialInvestment, annualInvestment, expectedReturn, duration } = input;

  const setInitialInvest = (newValue) => onChange({ ...input, initialInvestment: newValue });
  const setAnnualInvest = (newValue) => onChange({ ...input, annualInvestment: newValue });
  const setExpectedReturn = (newValue) => onChange({ ...input, expectedReturn: newValue });
  const setDuration = (newValue) => onChange({ ...input, duration: newValue });

  return (
    <form id="user-input">
      <InputGroup>
        <Input name="initial-invest" label="Initial Investment" value={initialInvestment} onChange={setInitialInvest} />
        <Input name="annual-invest" label="Annual Investment" value={annualInvestment} onChange={setAnnualInvest} />
      </InputGroup>
      <InputGroup>
        <Input name="expected-return" label="Expected Return %" value={expectedReturn} onChange={setExpectedReturn} />
        <Input name="duration-years" label="Duration in Years" min={1} value={duration} onChange={setDuration} />
      </InputGroup>
    </form>
  );
}

function InputGroup({ children }) {
  return <div className="input-group">{children}</div>;
}

function Input({ name, label, value, min = 0, max, onChange }) {
  return (
    <p>
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        id={name}
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(parseInt(event.target.value))}
        required
      />
    </p>
  );
}
