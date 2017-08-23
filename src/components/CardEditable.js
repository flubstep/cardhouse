import React, { Component } from 'react';

const MOCK_IMAGE_URL = 'https://images.unsplash.com/photo-1461272395971-7c6ffaa435b7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=720&fit=crop&s=8b41b3430d730690567af6feb472f40a';
const MOCK_TITLE = 'Martial Combat';
const MOCK_TEXT = 'Sword and shield, pole-arms, axes, war hammers, etc. If you can kill something by swinging it you can learn how to do it at a hero academy. Every common style of combat is covered in this course guaranteeing that a student will have at the very least a familiarity with most common martial weapons.';

export default class CardEditable extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      height: 480,
      width: 320,
      imageUrl: MOCK_IMAGE_URL,
      title: MOCK_TITLE,
      text: MOCK_TEXT
    };
  }

  render() {
    const { width, height } = this.state;
    return (
      <div className='CardEditable flex-column' style={{ width, height }}>
        { this.state.imageUrl && (
          <div className='img-container' style={{ width, height: height / 2 }}>
            <img alt={this.state.title} src={this.state.imageUrl} width={width} />
          </div>
        ) }
        <div className='text-container'>
          <h1>{ this.state.title }</h1>
          <p>{ this.state.text }</p>
        </div>
        <style jsx>{`
          .CardEditable {
            box-shadow: 1px 1px 3px #666;
            border-radius: 5px;
            background-color: #fafafa;
            transition: all 80ms ease-in-out;
            align-items: center;
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
        `}
        </style>
      </div>
    );
  }
};

CardEditable.defaultProps = {

};
