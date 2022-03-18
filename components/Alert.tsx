import {
  Text,
  Alert as AlertBox,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alert = useSelector((state: any) => state.alert);

  return (
    // <Text
    //   color={alert.alertType === "success" ? "green" : "red"}
    //   fontSize="0.8em"
    // >
    //   {alert.msg}
    // </Text>
    <AlertBox hidden={true} status="error">
      {alert.msg}
      {/* <CloseButton position='absolute' right='8px' top='8px' /> */}
    </AlertBox>
  );
};

export default Alert;
