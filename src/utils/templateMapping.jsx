import React from 'react';

const componentMap = {
  image: React.lazy(() => import('@components/templates/Image')),
  
};

export default function getComponent(componentType) {
  return componentMap[componentType];
}
