import React from "react";
import Select from "react-select";

function customTheme(theme) {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "orange",
      primary: "orange",
    },
  };
}

export default function SelectSection({ selectedOption, onChange, options }) {
  return (
    <div className="App">
      <Select
        theme={customTheme}
        defaultValue={selectedOption}
        onChange={onChange}
        options={options}
      />
    </div>
  );
}
