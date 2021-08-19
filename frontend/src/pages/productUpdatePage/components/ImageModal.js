import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import '../style.css';

const ImageModal = (props) => {
  const { show, handleClose, image } = props;
  return (
    <>
      <Modal
        show={show}
        size="lg"
        ClassName="modal-image"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-image"><img src={image} className="img-fluid" alt="" height="500" /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageModal;

ImageModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  image: PropTypes.string,
};
