import React from "react";
import NumberFormat from "react-number-format";

// Copied from https://material-ui.com/components/text-fields/#inputs
export function NumberFormatCustom(props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: parseFloat(values.value),
          },
        });
      }}
      isNumericString
    />
  );
}