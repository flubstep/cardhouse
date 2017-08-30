import React, { Component } from 'react';
import Modal from './Modal';
import DialogCard from './DialogCard';

export default class ImageUploadModal extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      inputUrl: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log('okay');
  }

  render() {
    return (
      <Modal
        enabled={this.props.enabled}
        onClose={this.props.onClose}
        >
        <DialogCard>
          <div className="ImageUploadModal">
            <div>Input an image URL</div>
            <form onSubmit={this.onSubmit} className="flex-centered">
              <input ref="imageUrl" />
              <button className="btn">Upload</button>
            </form>
            <div>...or upload an image</div>
            <div className="dragarea" />
          </div>
          <style>{`
            .ImageUploadModal {
              margin: 10px 0;
              width: 50vw;
              max-width: 400px;
            }
            .ImageUploadModal input {
              width: 300px;
              margin: 10px;
              font-size: 16px;
            }
          `}
          </style>
        </DialogCard>
      </Modal>
    );
  }
}

ImageUploadModal.defaultProps = {
  enabled: false
};
