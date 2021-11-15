import { Field } from "formik";
import { Input, FormErrorMessage, FormControl } from "@chakra-ui/react";
// import { useState, useEffect } from "react";

const TextField = ({ placeholder, name, type }) => {
  return (
    <Field name={name}>
      {({ field, meta }) => {
        return (
          <FormControl isInvalid={meta.error && meta.touched}>
            <Input
              {...field}
              variant="flushed"
              id={name}
              placeholder={placeholder}
              type={type}
            />

            <FormErrorMessage fontSize="0.8em">{meta.error}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

TextField.defaultProps = {
  placeholder: "",
  type: "text",
};

export default TextField;
