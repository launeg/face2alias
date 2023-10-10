import * as React from "react";
import Flashbar from "@cloudscape-design/components/flashbar";

const SuccessBar = ({header, content}) => {
  const [items, setItems] = React.useState([
    {
      header: header,
      type: "success",
      content: content,
      dismissible: true,
      dismissLabel: "Dismiss message",
      onDismiss: () => setItems([]),
      id: "message_1"
    }
  ], [header, content]);
  return <Flashbar items={items} />;
}

export default SuccessBar;
