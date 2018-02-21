import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

const clamp = (number, min, max) => {
  return Math.min(max, Math.max(min, number));
}

const offsetToTransformStyle = ({ x, y, scale = 1 }) => ({
  transform: `translate(${x}px, ${y}px) scale(${scale})`,
  transformOrigin: '50% 50%'
});

export default class SquareImageCropper extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dragging: false,
      dragStart: null,
      dragEnd: null,
      sliderValue: 100,
      imageProps: { width: 0, height: 0, minScale: 1, maxScale: 1 },
      imageOffset: { x: 0, y: 0 },
      imageScale: 1
    };
  }

  get squareOffset() {
    // Initial x, y coordinates of the "profile square" div
    return {
      x: (this.props.width - this.props.innerSquareSize) / 2,
      y: (this.props.height - this.props.innerSquareSize) / 2
    };
  }

  get imageOffset() {
    let { x, y } = this.state.imageOffset;
    const { width, height } = this.state.imageProps;
    const squareOffset = this.squareOffset;

    // If scale increases, the maximum offset of the image is affected by
    // half the length of the added dimension to the image
    const maxX = width * (this.state.imageScale - 1) / 2 + squareOffset.x;
    const minX = this.props.width - width - maxX;
    const maxY = height * (this.state.imageScale - 1) / 2 + squareOffset.y;
    const minY = this.props.height - height - maxY;

    // Offset image based on the current drag distance
    if (this.state.dragging) {
      x += this.state.dragEnd.x - this.state.dragStart.x;
      y += this.state.dragEnd.y - this.state.dragStart.y;
    }

    // Prevent taking crops outside of the image
    return {
      x: clamp(x, minX, maxX),
      y: clamp(y, minY, maxY)
    };
  }

  onImageLoad = (e) => {
    const naturalHeight = e.target.naturalHeight;
    const naturalWidth = e.target.naturalWidth;

    // Calculate the dimensions of the image if it were to be in
    // "contain" in the larger container div by calculating which
    // scaling factor is smaller
    const xScale = this.props.width / naturalWidth;
    const yScale = this.props.height / naturalHeight;
    const minScale = Math.min(xScale, yScale);
    const height = naturalHeight * minScale;
    const width = naturalWidth * minScale;

    // Calculate the minimum scaling that would "cover" the smaller
    // profile image square div (max of the two scaling factors)
    const squareScaleX = this.props.innerSquareSize / width;
    const squareScaleY = this.props.innerSquareSize / height;
    const minSquareScale = Math.max(squareScaleX, squareScaleY);

    const imageProps = {
      height: height,
      width: width,
      minScale: minSquareScale
    };
    // Start in the middle of the scaling factors
    this.setState({
      imageProps,
      imageScale: minSquareScale * 2,
      sliderValue: 100
    });
  }

  onMouseDown = (e) => {
    e.preventDefault();
    this.setState({
      dragging: true,
      dragStart: { x: e.clientX, y: e.clientY }, // TODO: check these props
      dragEnd: { x: e.clientX, y: e.clientY }
    });
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (e) => {
    e.preventDefault();
    if (this.state.dragging) {
      this.setState({
        dragEnd: { x: e.clientX, y: e.clientY }
      });
    }
  }

  onMouseUp = (e) => {
    e.preventDefault();
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    this.setState({
      dragging: false,
      dragStart: null,
      imageOffset: this.imageOffset
    });
  }

  onSliderChange = (e) => {
    e.preventDefault();
    const N = e.target.value / 100;
    const { minScale, maxScale } = this.state.imageProps;
    // Use exponential scaling to feel smoother
    const scale = minScale * Math.pow(2, N);
    this.setState({
      sliderValue: e.target.value,
      imageScale: scale
    });
  }

  render() {
    const offset = this.imageOffset;
    const squareOffset = this.squareOffset;
    const containerStyle = {
      height: this.props.height,
      width: this.props.width
    };
    return (
      <div className="SquareImageCropper">
        <div
          className="combined-image-container"
          style={containerStyle}
          onMouseDown={this.onMouseDown}
          >
          <div
            className="faded-container"
            style={containerStyle}
            >
            <img
              alt="Your Profile"
              src={this.props.src}
              onLoad={this.onImageLoad}
              style={{
                height: this.state.imageProps.height,
                width: this.state.imageProps.width,
                ...offsetToTransformStyle({
                  x: offset.x,
                  y: offset.y,
                  scale: this.state.imageScale
                })
              }}
            />
          </div>
          <div
            className="visible-container"
            style={containerStyle}
            >
            <div
              className="visible-square"
              style={{
                height: this.props.innerSquareSize,
                width: this.props.innerSquareSize,
                position: 'absolute',
                top: squareOffset.y,
                left: squareOffset.x
              }}
              >
              <img
                alt="Your Profile"
                src={this.props.src}
                style={{
                  height: this.state.imageProps.height,
                  width: this.state.imageProps.width,
                  position: 'absolute',
                  left: -squareOffset.x,
                  top: -squareOffset.y,
                  ...offsetToTransformStyle({
                    x: offset.x,
                    y: offset.y,
                    scale: this.state.imageScale
                  })
                }}
              />
            </div>
          </div>
        </div>
        <div className="control-footer">
          <FontAwesome name="image" size="1x" />
          <span className="slider-container">
            <input
              type="range" min="0" max="200"
              value={this.state.sliderValue}
              className="control-slider"
              onChange={this.onSliderChange}
            />
          </span>
          <FontAwesome name="image" size="2x" />
        </div>
        <style jsx>{`
          .SquareImageCropper {
            cursor: move;
            user-select: none;
          }

          .combined-image-container {
            position: relative;
            overflow: hidden;
          }

          .visible-container {
            position: absolute;
            top: 0;
            left: 0;
          }
          .visible-square {
            overflow: hidden;
          }

          .control-footer {
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .slider-container {
            margin: 0 10px;
          }

          .faded-container {
            position: absolute;
            top: 0;
            left: 0;
            background-color: #dedede;
          }
          .faded-container img {
            opacity: 0.2;
          }
        `}
        </style>
      </div>
    );
  }
};

SquareImageCropper.defaultProps = {
  height: 500,
  width: 500,
  innerSquareSize: 300
};
