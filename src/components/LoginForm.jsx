import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  RadioCards,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { Combobox } from "./Combobox";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  console.log("Component rendered. Current showPassword state:", showPassword); // Log when component renders

  const handleTogglePassword = () => {
    console.log("Button clicked. showPassword before toggle:", showPassword); // Log before changing state
    setShowPassword(!showPassword);
    console.log("showPassword after toggle:", !showPassword); // Log after changing state
  };

  return (
    <Card style={{ width: "100%", maxWidth: "400px", padding: 24 }}>
      <form
        style={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form submitted");
        }}
      >
        <Flex gap="4" direction="column" width="100%">
          <Flex gap="2" direction="column" width="100%">
            <Label htmlFor="email" size="2" display="block">
              <Text size="6">BUT</Text>
            </Label>

            <Flex justify="center" width="100%">
              <RadioCards.Root columns="3">
                <RadioCards.Item value="but1">
                  <Flex direction="column" width="100%">
                    <Text weight="bold">BUT 1</Text>
                  </Flex>
                </RadioCards.Item>
                <RadioCards.Item value="but2">
                  <Flex direction="column" width="100%">
                    <Text weight="bold">BUT 2</Text>
                  </Flex>
                </RadioCards.Item>
                <RadioCards.Item value="but3">
                  <Flex direction="column" width="100%">
                    <Text weight="bold">BUT 3</Text>
                  </Flex>
                </RadioCards.Item>
              </RadioCards.Root>
            </Flex>
          </Flex>

          {/* Email Input */}
          <Flex gap="2" direction="column" width="100%">
            <Label htmlFor="email" size="2" display="block">
              <Text size="6">Email</Text>
            </Label>

            <TextField.Root
              size="3"
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Votre email"
              onChange={(e) =>
                console.log("Email field value:", e.target.value)
              }
            />
          </Flex>

          {/* Password Input with Show/Hide Password Button */}
          <Flex gap="2" direction="column">
            <Label htmlFor="password" size="2" marginBottom="1" display="block">
              <Text size="6">Password</Text>
            </Label>
            <TextField.Root
              size="3"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              onChange={(e) =>
                console.log("Password field value:", e.target.value)
              }
            >
              <TextField.Slot></TextField.Slot>
              <TextField.Slot pr="3">
                <IconButton
                  size="4"
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTogglePassword(); // Call toggle password function
                  }}
                >
                  {showPassword ? (
                    <EyeClosedIcon height="16" width="16" />
                  ) : (
                    <EyeOpenIcon height="16" width="16" />
                  )}
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          {/* Submit Button */}
          <Button size="4" type="submit" variant="solid" width="100%">
            Login
          </Button>
        </Flex>
      </form>
    </Card>
  );
};

export default LoginForm;
