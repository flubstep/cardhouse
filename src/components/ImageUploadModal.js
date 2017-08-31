import React, { Component } from 'react';
import Modal from './Modal';
import DialogCard from './DialogCard';

export default class ImageUploadModal extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      inputUrl: '',
      error: null
    };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = this.refs.imageUrl.value;
    const image = new Image();
    image.onload = () => {
      if (this.props.onImageUrl) {
        this.props.onImageUrl(imageUrl);
      }
    };
    image.onerror = () => {
      this.setState({
        error: 'We were unable to load that image.'
      });
    };
    image.src = imageUrl;
  }

  render() {
    return (
      <Modal
        enabled={this.props.enabled}
        onClose={this.props.onClose}
        >
        <DialogCard>
          <div className="ImageUploadModal">
            {
              this.state.error && (
                <div className="error">{ this.state.error }</div>
              )
            }
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
            .ImageUploadModal .error {
              margin-bottom: 10px;
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
