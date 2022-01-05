import { Field } from "formik";
import {
  Input,
  FormErrorMessage,
  FormControl,
  Textarea,
} from "@chakra-ui/react";

const TextField = ({ placeholder, name, type, textbox, multiple }) => {
  return (
    <Field name={name}>
      {({ field, meta }) => {
        return (
          <FormControl isInvalid={meta.error && meta.touched} my="6">
            {textbox ? (
              <Textarea
                {...field}
                variant="flushed"
                id={name}
                placeholder={placeholder}
                height="300px"
              />
            ) : (
              <Input
                {...field}
                variant="flushed"
                id={name}
                placeholder={placeholder}
                type={type}
                multiple={multiple}
              />
            )}
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
  textbox: false,
  multiple: false,
};

export default TextField;
