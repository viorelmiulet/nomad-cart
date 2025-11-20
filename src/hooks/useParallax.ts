import { useEffect, useState } from 'react';

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
};

export const useParallaxMulti = (speeds: number[] = [0.3, 0.5, 0.7]) => {
  const [offsets, setOffsets] = useState<number[]>(speeds.map(() => 0));

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setOffsets(speeds.map(speed => scrollY * speed));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speeds]);

  return offsets;
};
