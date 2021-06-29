import React, { useEffect, useState } from "react";

import { Button } from "@material-ui/core";
import Controller from "../service/controller";
import { History } from "../index";
import { v4 as uuidv4 } from "uuid";

export default function Modal({ children, open, hideModal, header }) {
  const [ID, setID] = useState(uuidv4().split("-")[0]);

  useEffect(() => {
    History.listen((data, action) => {
      if (action === "POP") {
        if (Controller.instance.currentModal === ID) {
          hideModal();
        }
      }
    });
  }, []);

  useEffect(() => {
    if (open) {
      Controller.instance.addModal(ID);
      History.push(`#${Controller.instance.getModalList().join("&")}`);
    } else {
      if (Controller.instance.currentModal === ID) {
        Controller.instance.removeModal(ID);
        History.replace(`#${Controller.instance.getModalList().join("&")}`);
      }
    }
  }, [open]);

  return (
    open && (
      <>
        <div className="modal">
          <div className="header">
            <Button onClick={hideModal}> X </Button>
            <p className="headerContent">{header}</p>
          </div>
          <div className="body">{children}</div>
        </div>

        <div className="modal-overlay" onClick={hideModal}></div>
      </>
    )
  );
}
