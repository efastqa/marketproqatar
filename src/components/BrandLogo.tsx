import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto' | 'icon-only';
  showSubtitle?: boolean;
  iconOnly?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'auto',
  showSubtitle = true,
  iconOnly = false,
  className = ''
}) => {
  const isIconOnly = iconOnly || variant === 'icon-only';
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }[size];

  const titleSize = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }[size];

  const subtitleSize = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm'
  }[size];

  // Colors exactly matching user logo
  const BRAND_NAVY = '#0c2b4e';
  const BRAND_GREEN = '#00a851';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Verified Emblem: Deep Navy + Emerald Green Circle + White Checkmark */}
      <div 
        className={`relative ${iconDimensions} rounded-2xl p-1 shadow-md hover:scale-105 transition-transform shrink-0 flex items-center justify-center`}
        style={{ backgroundColor: BRAND_NAVY }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Inner Bright Green Circle */}
          <circle cx="50" cy="50" r="38" fill={BRAND_GREEN} />
          
          {/* Exact Geometric White Checkmark */}
          <polygon
            points="30,49 37,42 44,49 63,30 70,37 44,63"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Brand Typography: Ebuymatale.lk */}
      {!isIconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center leading-none">
            <span className={`${titleSize} font-black tracking-tight ${
              variant === 'light' 
                ? 'text-white' 
                : variant === 'dark' 
                ? 'text-slate-900' 
                : 'text-slate-900 dark:text-white'
            }`}>
              <span style={{ color: BRAND_GREEN }}>E</span>
              <span className={variant === 'light' ? 'text-white' : 'text-slate-900 dark:text-white'}>
                buymatale.lk
              </span>
            </span>
          </div>

          {showSubtitle && (
            <p className={`${subtitleSize} font-semibold mt-0.5 text-slate-500 dark:text-slate-400 flex items-center gap-1 tracking-tight`}>
              <span>Sri Lanka • Matale Marketplace</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
