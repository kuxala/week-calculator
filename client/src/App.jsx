import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";

function App() {
  const weeksPerYear = 52;
  const totalYears = 80;
  const totalWeeks = weeksPerYear * totalYears;

  const getInitialDate = () => {
    const storedDate = localStorage.getItem("birthDate");
    return storedDate ? new Date(storedDate) : new Date();
  };

  const getInitialCheckedWeeks = () => {
    const storedCheckedWeeks = localStorage.getItem("checkedWeeks");
    return storedCheckedWeeks
      ? JSON.parse(storedCheckedWeeks)
      : Array(totalWeeks).fill(false);
  };

  const [date, setDate] = useState(getInitialDate());
  const [checkedWeeks, setCheckedWeeks] = useState(getInitialCheckedWeeks());

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
      localStorage.setItem("checkedWeeks", JSON.stringify(newCheckedWeeks));
    };

    updateCheckedWeeks();
    localStorage.setItem("birthDate", date);
  }, [date, totalWeeks]);

  const handleCheckboxChange = (index) => {
    const newCheckedWeeks = [...checkedWeeks];
    newCheckedWeeks[index] = !newCheckedWeeks[index];
    setCheckedWeeks(newCheckedWeeks);
    localStorage.setItem("checkedWeeks", JSON.stringify(newCheckedWeeks));
  };

  return (
    <Wrapper>
      <div>
        Enter Birthdate{" "}
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>
      <GridContainer>
        {Array.from({ length: totalYears }, (_, yearIndex) => (
          <YearRow key={yearIndex}>
            {checkedWeeks
              .slice(yearIndex * weeksPerYear, (yearIndex + 1) * weeksPerYear)
              .map((checked, weekIndex) => (
                <label key={weekIndex} className="week-checkbox">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      handleCheckboxChange(yearIndex * weeksPerYear + weekIndex)
                    }
                  />
                </label>
              ))}
          </YearRow>
        ))}
      </GridContainer>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const YearRow = styled.div`
  display: flex;
  gap: 5px;
`;

const WeekCheckbox = styled.label`
  margin: 5px;
`;
