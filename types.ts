export interface CarSectionProps {
  opacity: number;
}

export interface SectionData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  color: string;
}

export const SECTIONS: SectionData[] = [
  {
    id: 'intro',
    title: 'THE RED MACHINE',
    subtitle: 'Industrial Excellence',
    description: 'A journey through the steel and spirit of Soviet automotive engineering.',
    year: '1922-1991',
    color: '#D90429'
  },
  {
    id: 'gaz',
    title: 'GAZ-21 VOLGA',
    subtitle: 'The Peoples Luxury',
    description: 'A symbol of high status in the Soviet Union. The deer on the hood represented speed and grace.',
    year: '1956',
    color: '#EDF2F4'
  },
  {
    id: 'zil',
    title: 'ZIL-41047',
    subtitle: 'Power of the Party',
    description: 'Constructed strictly for the Politburo. Hand-built, armored, and imposing.',
    year: '1985',
    color: '#111111'
  },
  {
    id: 'future',
    title: 'RETRO FUTURISM',
    subtitle: 'The Dream That Never Died',
    description: 'Soviet engineers dreamed of flying cars and atomic engines. We honor that ambition.',
    year: '2077',
    color: '#EF233C'
  }
];