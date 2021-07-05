import "./styles/styles.scss";

import Modal from "./components/Modal";
import useModal from "./utils/useModal";

export default function App() {
  const [visible, showModal, hideModal] = useModal(false);
  const [visible1, showModal1, hideModal1] = useModal(false);

  return (
    <div className="container">
      <button className="btn " type="button" onClick={showModal}>
        Click to open Modal
      </button>
      <Modal open={visible} hideModal={hideModal} header={"header"}>
        <button type="button" onClick={showModal1} className="btn">
          MODal2
        </button>
        <button type="button" onClick={showModal1} className="btn">
          MODal2
        </button>
      </Modal>
      <Modal open={visible1} hideModal={hideModal1} header={"header"}>
        new Modal
      </Modal>
    </div>
  );
}
