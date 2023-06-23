import React from "react";

const BaseModal = ({showModal, modalId, modalContent, modalTitle}) => {
  return (
    <div className={`modal fade ${showModal ? "show" : ""}`} id={modalId} tabIndex="-1" role="dialog" aria-hidden={!showModal}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-normal">{modalTitle}</h5>
            <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{modalContent}</div>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
