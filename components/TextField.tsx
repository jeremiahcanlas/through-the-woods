import { Field } from "formik";
import {
  Input,
  FormErrorMessage,
  FormControl,
  Textarea,
  Checkbox,
  NumberInput,
  NumberInputField,
  InputRightElement,
} from "@chakra-ui/react";

const TextField = ({
  placeholder,
  value,
  name,
  type,
  textbox,
  multiple,
  checkbox,
  numField,
  maxVal,
  minVal,
  element,
}) => {
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
            ) : numField ? (
              <NumberInput
                {...field}
                maxW={"8em"}
                variant={"flushed"}
                size="md"
                min={minVal}
                max={maxVal}
                id={name}
              >
                <NumberInputField placeholder={placeholder} />
                {element && (
                  // eslint-disable-next-line react/no-children-prop
                  <InputRightElement fontWeight={700} children={element} />
                )}
              </NumberInput>
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
  numField: false,
  element: false,
  value: "",
  minVal: 0,
  maxVal: 9999,
};

export default TextField;
