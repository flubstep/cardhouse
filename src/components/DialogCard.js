import React from 'react';

const DialogCard = (props) => (
  <div className="DialogCard">
    { props.children }
    <style>{`
      .DialogCard {
        background-color: white;
        border-radius: 5px;
        padding: 20px;
        box-shadow: 1px 1px 3px #666;
      }
    `}
    </style>
  </div>
);

export default DialogCard;
