import { $login, $setUser } from "@/store/Store";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import {
  Button,
  Callout,
  Card,
  Flex,
  IconButton,
  RadioCards,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Flex direction="column" align="center" justify="center">
      <Card style={{ width: "100%", maxWidth: "400px", padding: 24 }}>
        {showError && (
          <Callout.Root color="red">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              Nom utilisateur ou mot de passe invalide
            </Callout.Text>
          </Callout.Root>
        )}
        <form
          style={{ width: "100%" }}
          onSubmit={async (e) => {
            e.preventDefault();
            const valide = await $login();
            setShowError(!valide);
          }}
        >
          <Flex gap="4" direction="column" width="100%">
            <Flex gap="2" direction="column" width="100%">
              <Label htmlFor="email" size="2" display="block">
                <Text size="6">BUT</Text>
              </Label>

              <Flex justify="center" width="100%">
                <RadioCards.Root
                  columns="3"
                  onValueChange={(value) => {
                    console.log("value radio", value);
                    $setUser({ but: value });
                  }}
                >
                  <RadioCards.Item value="BUT1">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">BUT 1</Text>
                    </Flex>
                  </RadioCards.Item>
                  <RadioCards.Item value="BUT2">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">BUT 2</Text>
                    </Flex>
                  </RadioCards.Item>
                  <RadioCards.Item value="BUT3">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">BUT 3</Text>
                    </Flex>
                  </RadioCards.Item>
                </RadioCards.Root>
              </Flex>
            </Flex>

            {/* Email Input */}
            <Flex gap="2" direction="column" width="100%">
              <Label htmlFor="username" size="2" display="block">
                <Text size="6">Nom utilisateur</Text>
              </Label>

              <TextField.Root
                size="3"
                type="text"
                id="username"
                name="username"
                required
                placeholder="Nom utilisateur"
                onChange={(e) => {
                  console.log("Email field value:", e.target.value);
                  $setUser({ username: e.target.value });
                }}
              />
            </Flex>

            {/* Password Input with Show/Hide Password Button */}
            <Flex gap="2" direction="column">
              <Label
                htmlFor="password"
                size="2"
                marginBottom="1"
                display="block"
              >
                <Text size="6">Mot de passe</Text>
              </Label>
              <TextField.Root
                size="3"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="Mot de passe"
                onChange={(e) => {
                  console.log("Password field value:", e.target.value);
                  $setUser({ password: e.target.value });
                }}
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
    </Flex>
  );
};

export default LoginForm;
