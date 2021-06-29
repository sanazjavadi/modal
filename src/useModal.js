import { useEffect, useState } from "react";

const useModal = (initialValue = false) => {
  const [visible, setVisible] = useState(initialValue);

  function hideModal() {
    setVisible(false);
  }
  function showModal() {
    setVisible(true);
  }
  return [visible, showModal, hideModal];
};

export default useModal;
