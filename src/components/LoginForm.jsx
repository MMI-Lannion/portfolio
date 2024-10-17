import React, { useState } from "react";
import { Box, Button, Flex } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  console.log("Component rendered. Current showPassword state:", showPassword); // Log when component renders

  const handleTogglePassword = () => {
    console.log("Button clicked. showPassword before toggle:", showPassword); // Log before changing state
    setShowPassword(!showPassword);
    console.log("showPassword after toggle:", !showPassword); // Log after changing state
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Form submitted");
      }}
    >
      <Flex gap="3" direction="column">
        {/* Email Input */}
        <Box>
          <Label htmlFor="email" size="2" display="block">
            Email
          </Label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            onChange={(e) => console.log("Email field value:", e.target.value)}
          />
        </Box>

        {/* Password Input with Show/Hide Password Button */}
        <Box>
          <Label htmlFor="password" size="2" marginBottom="1" display="block">
            Password
          </Label>
          <Flex align="center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              onChange={(e) =>
                console.log("Password field value:", e.target.value)
              }
            />

            {/* Button to Toggle Password Visibility */}
            <Button
              type="button"
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                handleTogglePassword(); // Call toggle password function
              }}
              style={{ marginLeft: "8px", padding: "8px" }}
            >
              {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
            </Button>
          </Flex>
        </Box>

        {/* Submit Button */}
        <Button type="submit" variant="solid" width="100%">
          Login
        </Button>
      </Flex>
    </form>
  );
};

export default LoginForm;
