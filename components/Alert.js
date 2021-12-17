import { Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alert = useSelector((state) => state.alert);

  return (
    <Text
      color={alert.alertType === "success" ? "green" : "red"}
      fontSize="0.8em"
    >
      {alert.msg}
    </Text>
  );
};

export default Alert;
