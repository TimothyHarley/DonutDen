import React from 'react';
import Menu from '../Pages/Menu/Menu';
import { 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
} from 'reactstrap';
import './AddToOrderModal.scss'

class AddToOrderModal extends React.Component {

  toggle() {
    this.props.toggle();
  }

  render(){
    return(
      <div>
        <Modal isOpen={this.props.showModal} toggle={this.toggle} className="MenuModal">
          <ModalHeader toggle={e => this.toggle(e)}>Add to Order</ModalHeader>
          <ModalBody>
            <Menu getMenuItem={this.props.getMenuItem} isCreatingOrder={this.props.isCreatingOrder} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={e => this.toggle(e)}>Do Something</Button>{' '}
            <Button color="secondary" onClick={e => this.toggle(e)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddToOrderModal;
