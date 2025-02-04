import React from "react";

const ChatMessage = ({name,message}) => {
  return (
    <div className="flex items-center p-2 shadow-lg">
      <img 
      className="h-8"
      alt = 'user'
      src="https://i1.wp.com/cdn.auth0.com/avatars/na.png?ssl=1" 
      />
      <span className="font-bold px-2">{name}</span>
      <span>{message}</span>
    </div>
  );
};

export default ChatMessage;
