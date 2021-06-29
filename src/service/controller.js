export default class Controller {
  static instance = Controller.instance || new Controller();

  modalList = [];
  currentModal = "";

  addModal(id) {
    this.modalList.push(id);
    this.currentModal = id;
  }

  removeModal() {
    this.modalList.pop();
    this.currentModal = this.modalList[this.modalList.length - 1];
  }

  getModalList() {
    return this.modalList;
  }

  current() {
    return this.currentModal;
  }
}
