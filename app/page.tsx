'use client';

import { AppShell, SimpleGrid, Text } from '@mantine/core';
import DropdownComponent from './ui/dropdowns/dropdown';
import { useState } from 'react';
import InputNumberComponent from './ui/inputs/inputNumber';
import TextButton from './ui/buttons/textButton';
import MovieCard from './ui/movie-card/movie-card';

export default function HomePage() {
  const [value, setValue] = useState('');
  return (
    <AppShell navbar={{
      width: 280,
      breakpoint: 'sm',
    }}>
      <AppShell.Main>
        <div style={{ width: '100%', height: '100vh', padding: '40px 80px 0 80px', backgroundColor: '#F5F5F6' }}>
          <Text style={{ fontWeight: 700, fontFamily: 'Inter', fontSize: '32px' }}>Movies</Text>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: '16px',
            alignItems: 'flex-end',
            marginTop: 42,
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
            <DropdownComponent placeholder={'Select genre'} value={''} data={['Comedy', 'Thriller']} setValue={setValue}
                               label="Genres" />
            <DropdownComponent placeholder={'Select release year'} value={''} data={['2011', '2012']}
                               setValue={setValue} label="Release year" />
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
              <InputNumberComponent placeholder={'From'} label={'Ratings'} />
              <InputNumberComponent placeholder={'To'} label={''} />
            </div>
            <TextButton />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: '16px',
            alignItems: 'flex-end',
            marginTop: 24,
            justifyContent: 'flex-end',
          }}>
            <DropdownComponent placeholder={'Sort by'} value={''} data={['Most popular', 'Less popular']}
                               setValue={setValue}
                               label="Sort by" />
          </div>
          <SimpleGrid cols={{ base: 2, sm: 2 }} spacing="md" mt={24}>
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </SimpleGrid>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
