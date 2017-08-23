import React, { Component } from 'react';

const { IMAGE_URL, TITLE, TEXT } = require('./mockData.json');

export default class CardEditable extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      height: 480,
      width: 320,
      imageUrl: IMAGE_URL,
      title: TITLE,
      text: TEXT,
      dragStart: null
    };
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = (e, el) => {
    const dragStart = {
      el,
      x0: e.clientX,
      y0: e.clientY,
      originalHeight: this.state.height,
      originalWidth: this.state.width
    };
    this.setState({ dragStart });
  }

  handleMouseMove = (e) => {
    if (this.state.dragStart) {
      const { el, x0, y0, originalWidth, originalHeight } = this.state.dragStart;
      const dx = e.clientX - x0;
      const dy = e.clientY - y0;
      switch (el) {
        case 'top':
          this.setState({ height: originalHeight - 2 * dy });
          break;
        case 'bottom':
          this.setState({ height: originalHeight + 2 * dy });
          break;
        case 'left':
          this.setState({ width: originalWidth - 2 * dx });
          break;
        case 'right':
          this.setState({ width: originalWidth + 2 * dx });
          break;
        case 'bottomleft':
          this.setState({ height: originalHeight + 2 * dy, width: originalWidth - 2 * dx });
          break;
        case 'bottomright':
          this.setState({ height: originalHeight + 2 * dy, width: originalWidth + 2 * dx });
          break;
        case 'topleft':
          this.setState({ height: originalHeight - 2 * dy, width: originalWidth - 2 * dx });
          break;
        case 'topright':
          this.setState({ height: originalHeight - 2 * dy, width: originalWidth + 2 * dx });
          break;
        default:
          break;
      }
    }
  }

  handleMouseUp = (e) => {
    if (this.state.dragStart) {
      this.setState({
        dragStart: null
      });
    }
  }

  render() {
    const { width, height } = this.state;
    return (
      <div className="CardEditable flex-column" style={{ width, height }}>
        { this.state.imageUrl && (
          <div className="img-container" style={{ width, height: height / 2 }}>
            <img alt={this.state.title} src={this.state.imageUrl} width={width} />
          </div>
        ) }
        <div className="text-container">
          <h1>{ this.state.title }</h1>
          <p>{ this.state.text }</p>
        </div>

        <div
          className="draggable edge"
          style={{ top: -5, width: '100%', cursor: 'ns-resize' }}
          onMouseDown={(e) => this.handleMouseDown(e, 'top')}
        />
        <div
          className="draggable edge"
          style={{ bottom: -5, width: '100%', cursor: 'ns-resize' }}
          onMouseDown={(e) => this.handleMouseDown(e, 'bottom')}
        />
        <div
          className="draggable edge"
          style={{ right: -5, height: '100%', cursor: 'ew-resize' }}
          onMouseDown={(e) => this.handleMouseDown(e, 'right')}
        />
        <div
          className="draggable edge"
          style={{ left: -5, height: '100%', cursor: 'ew-resize' }}
          onMouseDown={(e) => this.handleMouseDown(e, 'left')}
        />

        <div
          className="draggable corner"
          style={{ top: -5, left: -5, cursor: 'nwse-resize' }}
          onMouseDown={(e) => this.handleMouseDown(e, 'topleft')}
        />
        <div
          className="draggable corner"
          style={{ top: -5, right: -5, cursor: 'nesw-resize' }}
          onMouseDown={(e) => this.handleMouseDown(e, 'topright')}
        />
        <div
          className="draggable corner"
          style={{ bottom: -5, left: -5, cursor: 'nesw-resize' }}
          onMouseDown={(e) => this.handleMouseDown(e, 'bottomleft')}
        />
        <div
          className="draggable corner"
          style={{ bottom: -5, right: -5, cursor: 'nwse-resize' }}
          onMouseDown={(e) => this.handleMouseDown(e, 'bottomright')}
        />

        <style jsx>{`
          .CardEditable {
            position: relative;
            box-shadow: 1px 1px 3px #666;
            border-radius: 5px;
            background-color: #fafafa;
            align-items: center;
            user-select: none;
          }
          .CardEditable:hover {

          }
          .CardEditable .img-container {
            border-radius: 5px 5px 0px 0px;
            overflow: hidden;
          }
          .CardEditable .text-container {
            padding: 0 20px;
          }
          .CardEditable h1 {
            margin: 15px 0;
            font-size: 16px;
          }
          .CardEditable p {
            font-size: 14px;
            text-align: left;
          }
          .CardEditable .draggable {
            position: absolute;
            width: 10px;
            height: 10px;
          }
          .CardEditable .draggable:hover {
            background-color: rgba(255,255,0,0.1);
          }
        `}
        </style>
      </div>
    );
  }
};

CardEditable.defaultProps = {

};
