import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ModalComponent = (props) => {
  const {
    show, handleClose, onDelete, id,
  } = props;
  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onDelete(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalComponent.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  onDelete: PropTypes.func,
  id: PropTypes.number,
};

ModalComponent.default = {
  onHide: null,
  show: true,
};

export default ModalComponent;
