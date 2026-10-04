import React from 'react';
import { MataleMapExplorer } from './MataleMapExplorer';
import { Listing } from '../types';

interface QatarMapExplorerProps {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
  onOpenChat: (listing: Listing) => void;
  selectedLocation?: string;
  onLocationChange?: (location: string) => void;
}

export const QatarMapExplorer: React.FC<QatarMapExplorerProps> = (props) => {
  return <MataleMapExplorer {...props} />;
};

export default QatarMapExplorer;
