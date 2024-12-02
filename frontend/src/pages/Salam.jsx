import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";



const MyComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (value) => {
    setPhoneNumber(value);
  };

  const Salam = () => {
    const parsedNumber = parsePhoneNumberFromString(`+${phoneNumber}`);
    let formattedPhoneNumber;

    if (parsedNumber) {
      // Custom format for the phone number
      const nationalNumber = parsedNumber.nationalNumber; // Get the national part
      formattedPhoneNumber = `994 (${nationalNumber.slice(0, 2)})-${nationalNumber.slice(2, 5)}-${nationalNumber.slice(5, 7)}-${nationalNumber.slice(7)}`;
    } else {
      formattedPhoneNumber = phoneNumber; // Fallback for invalid input
    }

    console.log(formattedPhoneNumber);
  };

  return (
    <div>
      <PhoneInput
        id="phone-number"
        country="az"
        value={phoneNumber}
        placeholder="+111 (11) 111-11-11"
        onChange={handleChange}
        inputProps={{
          required: true,
        }}
        inputStyle={{
          height: "48px",
          width: "100%",
          borderRadius: "0.3rem",
        }}
        buttonStyle={{
          background: "#fff",
          borderRight: "none",
        }}
      />
      <button onClick={Salam}>Log Phone Number</button>
    </div>
  );
};

export default MyComponent;
