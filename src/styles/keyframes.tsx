/* eslint-disable import/prefer-default-export */
import { keyframes } from '@emotion/react';

export const overlayRevealRight = keyframes`
  0% {
    transform: scaleX(0);
    transform-origin: 0% 50%;
  }
  50% {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
  51% {
    transform: scaleX(1);
    transform-origin: 100% 50%;
  }
  100% {
    transform: scaleX(0);
    transform-origin: 100% 50%;
  }
`;

export const overlayRevealLeft = keyframes`
0% {
    transform: scaleX(0);
    transform-origin: 100% 50%;
  }
  50% {
    transform: scaleX(1);
    transform-origin: 100% 50%;
  }
  51% {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
  100% {
    transform: scaleX(0);
    transform-origin: 0% 50%;
  }
`;

export const reveal = keyframes`
  0% { opacity: 0;}
  50% { opacity: 0;}
  51% { opacity: 1;}
  100% { opacity: 1;}
`;
