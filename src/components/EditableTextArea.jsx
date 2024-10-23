import TextArea from "@/components/TextAreaComponent";
import { setSaeData } from "@/store/Store";

export default function EditableTextArea({ key, ...rest }) {
  return (
    <TextArea
      {...rest}
      onChange={(v) => {
        setSaeData({ [key]: v });
      }}
    />
  );
}
