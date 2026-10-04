import React from 'react';
import { LandGemsGuideModal } from './LandGemsGuideModal';

interface MetrashGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetrashGuideModal: React.FC<MetrashGuideModalProps> = (props) => {
  return <LandGemsGuideModal {...props} />;
};

export default MetrashGuideModal;
