import React from 'react';
import FontAwesome from 'react-fontawesome';

const IconButton = (props) => (
  <div
    className={props.className + ' IconButton clickable flex-centered'}
    style={props.style}
    onClick={props.onClick}
    >
    <FontAwesome name={props.name} color={props.color} />
    { props.alt && (
      <div className="alt-text">
        { props.alt }
      </div>
      )
    }
    <style>{`
      .IconButton {
        position: relative;
        height: 28px;
        width: 28px;
        border-radius: 14px;
        background-color: rgba(255,255,255,0.5);
        transition: background-color 80ms ease-in-out;
      }
      .IconButton:hover {
        background-color: rgba(255,255,255,0.8);
      }
      .IconButton .alt-text {
        position: absolute;
        right: 38px;
        top: 0px;
        color: white;
        line-height: 28px;
        letter-spacing: 0.3pt;
        padding: 0px 10px;
        white-space: nowrap;
        font-size: 12px;
        font-weight: bold;
        background-color: rgba(0,0,0,0.6);
        z-index: 10;
        opacity: 0;
        transform: translateX(20px);
        transition: all 160ms ease-in-out;
      }
      .IconButton:hover .alt-text {
        opacity: 1;
        transform: translateX(0px);
      }
    `}</style>
  </div>
);

export default IconButton;

IconButton.defaultProps = {
  className: '',
  style: {},
  color: 'white',
  alt: null
};
