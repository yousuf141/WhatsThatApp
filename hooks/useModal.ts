import React from "react";

export const useModal = (): {
  visible: boolean;
  show: () => void;
  hide: () => void;
} => {
  const [visible, setVisible] = React.useState(false);

  function hide(): void {
    setVisible(false);
  }

  function show(): void {
    setVisible(true);
  }

  return { visible, show, hide };
};
