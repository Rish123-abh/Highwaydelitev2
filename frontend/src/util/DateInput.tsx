import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateInput.css';
import calendar from "../assets/calendar@2x.png";

interface Props {
  value: string;
  onChange: (date: string) => void;
  disabled?: boolean;
}

const DateInput: React.FC<Props> = ({ value, onChange, disabled = false }) => {
  const parsedDate = value ? new Date(value) : null;
  const isFilled = !!value;
  const datePickerRef = useRef<any>(null);
  const [open, setOpen] = useState(false);

  const handleIconClick = () => {
    if (!disabled) setOpen(true);
  };

  return (
    <div className="floating-input">
      <div className="datepicker-icon-wrapper">
        <DatePicker
          ref={datePickerRef}
          selected={parsedDate}
          onChange={(date) => {
            if (date) {
              onChange(date.toISOString());
              setOpen(false);
            }
          }}
          dateFormat="dd MMMM yyyy"
          placeholderText=" "
          className="datepicker-field"
          wrapperClassName="datepicker-wrapper"
          disabled={disabled}
          open={open}
          onClickOutside={() => setOpen(false)}
          onSelect={() => setOpen(false)}
        />
        <span className="calendar-icon" onClick={handleIconClick}>
          <img src={calendar} height={30} width={30} alt="calendar" />
        </span>
      </div>
      <label  className={isFilled ? 'filled ' : 'dateunfilled datelabel'}>Date of Birth</label>
    </div>
  );
};

export default DateInput;
