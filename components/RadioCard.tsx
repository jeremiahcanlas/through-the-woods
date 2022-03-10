import { Box, useRadio, Button } from "@chakra-ui/react";
import styles from "../styles/Nav.module.scss";

const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "#40916c",
          // color: "white",
          borderColor: "#40916c",
        }}
        className={styles.btn}
        px={[3, 4, 5]}
        py={[1.5, 2, 3]}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioCard;
