import useLogin from "../../hooks/useLogin";
import { Input, Button, Alert } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { loading, error, login } = useLogin();
  return (
    <>
      <Input
        placeholder="Email"
        type="email"
        fontSize={14}
        size={"xs"}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        placeholder="Password"
        type="password"
        fontSize={14}
        size={"xs"}
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />
      {error && (
        <Alert.Root
          status="error"
          fontSize={13}
          p={2}
          borderRadius={4}
          title="This is the alert title"
        >
          <Alert.Indicator fontSize={12} />
          <Alert.Title>{error.message}</Alert.Title>
        </Alert.Root>
      )}
      <Button
        w={"full"}
        colorScheme={"blue"}
        size={"sm"}
        fontSize={14}
        isloading={loading}
        onClick={() => login(inputs)}
      >
        Login
      </Button>
    </>
  );
};

export default Login;
