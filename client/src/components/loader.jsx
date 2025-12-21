import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center space-x-1 py-10">
      {/* Three bars with different animation delays */}
      <div className="h-8 w-1 animate-bounce rounded-full bg-white [animation-duration:1s]"></div>
      <div className="h-12 w-1 animate-bounce rounded-full bg-white [animation-delay:0.1s] [animation-duration:1s]"></div>
      <div className="h-8 w-1 animate-bounce rounded-full bg-white  [animation-delay:0.2s] [animation-duration:1s]"></div>
    </div>
  );
};



export default Loader;
