import React, { useEffect, useState, useMemo } from "react";

import Controller from "../service/controller";
import { History } from "../index";
import { v4 as uuidv4 } from "uuid";
import styles from "./modal.module.scss";
import { useLocation } from "react-router-dom";
import "../styles/styles.scss";

export default function Modal({
  children,
  open,
  hideModal,
  header,
  fullHeight,
}) {
  const [ID] = useState(uuidv4().split("-")[0]);
  const location = useLocation();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  useEffect(() => {
    if (!open && queryParams.has("&modal=")) {
      queryParams.delete("?");
      History.replace({
        search: "",
      });
    }
  }, [queryParams]);

  useEffect(() => {
    if (open && queryParams) {
      Controller.instance.addModal(ID);
      History.push({
        search: `modal=${Controller.instance.getModalList().join("&modal=")}`,
      });
    } else if (!open && queryParams) {
      History.goBack();
      Controller.instance.emptyModal();
    } else {
      if (Controller.instance.currentModal === ID) {
        Controller.instance.removeModal(ID);
        History.replace({
          search: `modal=${Controller.instance.getModalList().join("&modal=")}`,
        });
      }
    }
  }, [open]);

  function onClose() {
    hideModal();
    History.replace({
      search: "",
    });
  }

  return (
    <>
      <div
        className={open && styles["modal-overlay"]}
        onClick={onClose}
        type="button"
        tabIndex={-1}
      ></div>
      <div
        className={`${styles.modal} ${fullHeight && styles["full-screen"]} ${
          open && styles["show"]
        }`}
      >
        <div className={styles.header}>
          <button onClick={onClose} className={styles.closeBtn}>
            X
          </button>
          <p className={styles.headerContent}>{header}</p>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </>
  );
}
