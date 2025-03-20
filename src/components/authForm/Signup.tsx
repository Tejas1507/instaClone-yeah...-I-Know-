import { Alert, Button, Input } from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";
import { useState } from "react";
import { ViewIcon } from "@chakra-ui/icons/View";
import { ViewOffIcon } from "@chakra-ui/icons/ViewOff";
import useSignUpWithEmailAndPassword from "../../hooks/useSignupWithEmailAndPassword";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { error, loading, signup } = useSignUpWithEmailAndPassword();

  return (
    <>
      <Input
        placeholder="Fullname"
        type="text"
        fontSize={14}
        size={"xs"}
        value={inputs.fullname}
        onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
      />
      <Input
        placeholder="Username"
        type="text"
        fontSize={14}
        size={"xs"}
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />
      <Input
        placeholder="Email"
        type="email"
        fontSize={14}
        size={"xs"}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />

      <InputGroup
        flex={1}
        w={"100%"}
        endElement={
          <Button
            variant={"ghost"}
            size={"xs"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        }
      >
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          fontSize={14}
          size={"xs"}
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
      </InputGroup>

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
        // _loading={loading}
        onClick={() => signup(inputs)}
      >
        SignUp
      </Button>
    </>
  );
};

export default Signup;
