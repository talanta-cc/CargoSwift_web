import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/lottie/loading-animation.json';

const LoadingIndicator = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="loading-indicator">
      <Lottie options={defaultOptions} height={70} width={70} />
    </div>
  );
};

export default LoadingIndicator;
