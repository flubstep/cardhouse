import React from 'react';

const Modal = (props) => (
  props.enabled ? (
    <div
      className="Modal flex-centered"
      style={{
        backgroundColor: props.backgroundColor
      }}
      onClick={props.onClose}
      >
      <div onClick={e => e.stopPropagation()}>
        { props.children }
      </div>
      <style>{`
        .Modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1000;
          user-select: auto;
        }
      `}
      </style>
    </div>
  ) : false
);

export default Modal;

Modal.defaultProps = {
  backgroundColor: 'rgba(0,0,0,0.8)',
  enabled: false
};
