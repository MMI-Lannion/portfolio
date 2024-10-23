import * as RadixDialog from "@radix-ui/react-dialog";
import { Heading, IconButton, Text } from "@radix-ui/themes";
import { Cross1Icon, Cross2Icon } from "@radix-ui/react-icons";
import { keyframes, styled } from "@/lib/stitches";

const contentShow = keyframes({
  from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
  to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const overlayShow = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const StyledPortal = styled(RadixDialog.Portal, {});

const StyledTitle = styled(RadixDialog.Title, {
  margin: "0",
  fontWeight: 500,
  color: "var(--mauve-12)",
  fontSize: "17px",
});

const StyledOverlay = styled(RadixDialog.Overlay, {
  backgroundColor: "var(--black-a9)",
  position: "fixed",
  inset: "0",
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

const StyledContent = styled(RadixDialog.Content, {
  backgroundColor: "white",
  borderRadius: "6px",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px,\n      hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: "25px",
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  "&:focus": {
    outline: "none",
  },
});

export function Dialog({
  children,
  title,
  description,
  content,
  onCancel,
  open,
}) {
  return (
    <RadixDialog.Root open={open}>
      {children && (
        <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>
      )}

      {/* <StyledPortal> */}
      <StyledOverlay />
      <StyledContent
        style={{
          maxWidth: 450,
        }}
      >
        <StyledTitle
          style={{
            position: "relative",
          }}
        >
          <Heading size="2">{title}</Heading>

          <IconButton
            variant="soft"
            color="gray"
            onClick={onCancel}
            style={{
              position: "absolute",
              right: 0,
              top: "-50%",
            }}
          >
            <Cross1Icon />
          </IconButton>
        </StyledTitle>

        <RadixDialog.Description
          style={{
            position: "relative",
          }}
        >
          <Text>{description}</Text>
        </RadixDialog.Description>

        {content}
      </StyledContent>
      {/* </StyledPortal> */}
    </RadixDialog.Root>
  );
}
