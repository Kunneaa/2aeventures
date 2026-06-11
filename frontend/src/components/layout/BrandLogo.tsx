import Image from 'next/image';

type BrandLogoSize = 'sm' | 'md';

interface BrandLogoProps {
  labelClassName: string;
  priority?: boolean;
  size?: BrandLogoSize;
}

const logoSizes: Record<BrandLogoSize, { className: string; pixels: number }> = {
  sm: { className: 'h-8 w-8', pixels: 32 },
  md: { className: 'h-9 w-9', pixels: 36 },
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  labelClassName,
  priority = false,
  size = 'sm',
}) => {
  const logo = logoSizes[size];

  return (
    <>
      <span
        className={`flex ${logo.className} shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white`}
      >
        <Image
          src="/images/logo_2ae.jpg"
          alt="2AE VENTURES"
          width={logo.pixels}
          height={logo.pixels}
          priority={priority}
          className="h-full w-full object-contain"
        />
      </span>
      <span className={labelClassName}>2AE VENTURES</span>
    </>
  );
};
