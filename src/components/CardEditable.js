import React, { Component } from 'react';
import _ from 'lodash';

const { IMAGE_URL, TITLE, TEXT } = require('./mockData.json');

export default class CardEditable extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      height: 480,
      width: 320,
      imageUrl: IMAGE_URL,
      imageWidth: 320,
      imageHeight: 'auto',
      imageOffsetX: 0,
      imageOffsetY: 0,
      title: TITLE,
      text: TEXT,
      dragStart: null,
      editing: 'image'
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

  handleDragStart = (e, el) => {
    e.preventDefault();
    const dragStart = {
      el,
      x0: e.clientX,
      y0: e.clientY,
      originalState: _.assign(this.state)
    };
    this.setState({ dragStart });
  }

  handleMouseMove = (e) => {
    if (this.state.dragStart) {
      const { el, x0, y0, originalState } = this.state.dragStart;
      const { height, width, imageWidth, imageHeight, imageOffsetX, imageOffsetY } = originalState;
      const dx = e.clientX - x0;
      const dy = e.clientY - y0;
      switch (el) {
        case 'top':
          this.setState({ height: height - 2 * dy });
          break;
        case 'bottom':
          this.setState({ height: height + 2 * dy });
          break;
        case 'left':
          this.setState({ width: width - 2 * dx });
          break;
        case 'right':
          this.setState({ width: width + 2 * dx });
          break;
        case 'bottomleft':
          this.setState({ height: height + 2 * dy, width: width - 2 * dx });
          break;
        case 'bottomright':
          this.setState({ height: height + 2 * dy, width: width + 2 * dx });
          break;
        case 'topleft':
          this.setState({ height: height - 2 * dy, width: width - 2 * dx });
          break;
        case 'topright':
          this.setState({ height: height - 2 * dy, width: width + 2 * dx });
          break;
        case 'image':
          this.setState({ imageOffsetX: imageOffsetX + dx, imageOffsetY: imageOffsetY + dy });
          break;
        case 'image-bottomright':
          this.setState({ imageWidth: imageWidth + dx });
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

  handleClick = (e, el) => {
    if (!this.state.editing) {
      this.setState({
        editing: el
      });
    } else {
      this.setState({
        editing: null
      });
    }
  }

  renderImgContainerFilters() {
    if (!this.refs.imgContainer) {
      return false;
    }
    const rect = this.refs.imgContainer.getBoundingClientRect();
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    if (!rect) {
      return false;
    }
    const { top, left, width, height } = rect;
    return (
      <div className="container-filters" style={{ width: ww, height: wh }}>
        <div
          className="bar"
          style={{ top: 0, left: 0,  width: ww, height: top }}
        />
        <div
          className="bar"
          style={{ top: top + height, left: 0, width: ww, height: wh - top - height }}
        />
        <div
          className="bar"
          style={{ top: top, left: 0, width: left, height: height }}
        />
        <div
          className="bar"
          style={{ top: top, left: left + width, width: ww - left - width, height: height }}
        />
        <style jsx>{`
          .container-filters {
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
          }
          .container-filters .bar {
            position: absolute;
            background-color: rgba(255,255,255,0.8);
            z-index: 5;
          }
        `}
        </style>
      </div>
    );
  }

  render() {
    const { width, height, imageWidth, imageOffsetX, imageOffsetY } = this.state;
    const edgeCls = this.state.editing ? 'edge disabled' : 'draggable edge';
    const cornerCls = this.state.editing ? 'corner disabled' : 'draggable corner';
    return (
      <div className="CardEditable flex-column" style={{ width, height }}>
        { this.state.imageUrl && (
          <div
            ref="imgContainer"
            className={'img-container' + (this.state.editing === 'image' ? ' translucent' : '')}
            style={{ position: 'relative', width, height: height / 2 }}
            >
            { this.state.editing === 'image' ? (
              <div style={{ zIndex: 1 }}>
                <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                  }}
                  onClick={this.handleClick}
                />
                <div
                  className='position-relative'
                  style={{
                    width: imageWidth,
                    transform: `translate(${imageOffsetX}px, ${imageOffsetY}px)`,
                  }}
                  >
                  <img
                    className="draggable"
                    alt={this.state.title}
                    src={this.state.imageUrl}
                    width={imageWidth}
                    style={{ margin: 0 }}
                    onMouseDown={e => this.handleDragStart(e, 'image')}
                  />
                  <div
                    className="draggable corner"
                    style={{
                      height: 20,
                      width: 20,
                      bottom: 0,
                      right: 0,
                      cursor: 'nwse-resize'
                    }}
                    onMouseDown={e => this.handleDragStart(e, 'image-bottomright')}
                  />
                </div>
                { this.renderImgContainerFilters() }
              </div>
            ) : (
              <img
                className="editable"
                alt={this.state.title}
                src={this.state.imageUrl}
                width={imageWidth}
                style={{
                  transform: `translate(${imageOffsetX}px, ${imageOffsetY}px)`
                }}
                onClick={e => this.handleClick(e, 'image')}
              />
            ) }
          </div>
        ) }
        <div className="text-container">
          <h1 className="editable">{ this.state.title }</h1>
          <p className="editable">{ this.state.text }</p>
        </div>

        <div
          className={edgeCls}
          style={{ top: -5, width: '100%', cursor: 'ns-resize' }}
          onMouseDown={e => this.handleDragStart(e, 'top')}
        />
        <div
          className={edgeCls}
          style={{ bottom: -5, width: '100%', cursor: 'ns-resize' }}
          onMouseDown={e => this.handleDragStart(e, 'bottom')}
        />
        <div
          className={edgeCls}
          style={{ right: -5, height: '100%', cursor: 'ew-resize' }}
          onMouseDown={e => this.handleDragStart(e, 'right')}
        />
        <div
          className={edgeCls}
          style={{ left: -5, height: '100%', cursor: 'ew-resize' }}
          onMouseDown={e => this.handleDragStart(e, 'left')}
        />

        <div
          className={cornerCls}
          style={{ top: -5, left: -5, cursor: 'nwse-resize' }}
          onMouseDown={e => this.handleDragStart(e, 'topleft')}
        />
        <div
          className={cornerCls}
          style={{ top: -5, right: -5, cursor: 'nesw-resize' }}
          onMouseDown={e => this.handleDragStart(e, 'topright')}
        />
        <div
          className={cornerCls}
          style={{ bottom: -5, left: -5, cursor: 'nesw-resize' }}
          onMouseDown={e => this.handleDragStart(e, 'bottomleft')}
        />
        <div
          className={cornerCls}
          style={{ bottom: -5, right: -5, cursor: 'nwse-resize' }}
          onMouseDown={e => this.handleDragStart(e, 'bottomright')}
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
          .CardEditable .img-container.translucent {
            overflow: visible;
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
          .CardEditable .editable {
            cursor: pointer;
          }
          .CardEditable .draggable {
            cursor: move;
          }
          .CardEditable .disabled {
            display: none;
          }
          .CardEditable .draggable.edge,
          .CardEditable .draggable.corner {
            position: absolute;
            width: 10px;
            height: 10px;
          }
          .CardEditable .draggable.edge:hover {
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
