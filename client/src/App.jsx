import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";

function App() {
  const [date, setDate] = useState(new Date());
  console.log(date);
  const totalWeeks = 52 * 80;
  const [checkedWeeks, setCheckedWeeks] = useState(
    Array(totalWeeks).fill(false)
  );
  useEffect(() => {
    const updateCheckedWeeks = () => {
      const now = new Date();
      const timeDiff = now - date;
      const weeksPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
      const newCheckedWeeks = Array(totalWeeks).fill(false);

      for (let i = 0; i < weeksPassed && i < totalWeeks; i++) {
        newCheckedWeeks[i] = true;
      }

      setCheckedWeeks(newCheckedWeeks);
    };

    updateCheckedWeeks();
  }, [date, totalWeeks]);

  const handleCheckboxChange = (index) => {
    const newCheckedWeeks = [...checkedWeeks];
    newCheckedWeeks[index] = !newCheckedWeeks[index];
    setCheckedWeeks(newCheckedWeeks);
  };
  return (
    <Wrapper>
      <div>
        Enter Birthdate{" "}
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>
      <CheckboxContainer>
        {checkedWeeks.map((checked, index) => (
          <label key={index} className="week-checkbox">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleCheckboxChange(index)}
            />
          </label>
        ))}
      </CheckboxContainer>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  padding: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const WeekCheckbox = styled.label`
  margin: 5px;
`;
