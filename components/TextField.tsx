import { Field } from "formik";
import {
  Input,
  FormErrorMessage,
  FormControl,
  Textarea,
  Checkbox,
  useRadioGroup,
  HStack,
} from "@chakra-ui/react";

import RadioCard from "./RadioCard";

const TextField = ({
  placeholder,
  value,
  name,
  type,
  textbox,
  multiple,
  checkbox,
  selectField,
  defaultVal,
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue: defaultVal,
  });

  const group = getRootProps();

  return (
    <Field name={name}>
      {({ field, meta }) => {
        return (
          <FormControl isInvalid={meta.error && meta.touched}>
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
            ) : selectField ? (
              <HStack {...field} {...group}>
                {selectField.map((value) => {
                  const radio = getRadioProps({ value });
                  return (
                    <RadioCard key={value} {...radio}>
                      {value}
                    </RadioCard>
                  );
                })}
              </HStack>
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
  selectField: false,
  defaultVal: "",
  value: "",
};

export default TextField;
