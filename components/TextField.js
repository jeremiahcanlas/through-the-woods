import { Field } from "formik";
import {
  Input,
  FormErrorMessage,
  FormControl,
  Textarea,
  Checkbox,
  position,
} from "@chakra-ui/react";

const TextField = ({
  placeholder,
  value,
  name,
  type,
  textbox,
  multiple,
  checkbox,
}) => {
  return (
    <Field name={name}>
      {({ field, meta }) => {
        return (
          <FormControl
            isInvalid={meta.error && meta.touched}
            my="6"
            // position={checkbox && "absolute"}
            style={{ position: checkbox && "absolute" }}
          >
            {textbox ? (
              <Textarea
                {...field}
                variant="flushed"
                id={name}
                placeholder={placeholder}
                height={["400px", "300px"]}
              />
            ) : checkbox ? (
              <Checkbox
                {...field}
                size="sm"
                position="absolute"
                colorScheme="red"
                zIndex={10}
                value={value}
              >
                Delete
              </Checkbox>
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
  checkbox: false,
  value: "",
};

export default TextField;
