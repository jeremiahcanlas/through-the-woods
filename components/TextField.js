import { Field } from "formik";
import {
  Input,
  FormErrorMessage,
  FormControl,
  Textarea,
} from "@chakra-ui/react";

const TextField = ({ placeholder, name, type, textbox }) => {
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
};

export default TextField;
