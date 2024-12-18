// In your test file:
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '../components/navbar';
import { useRouter } from 'next/router';
import React from 'react';

window.React = React

test('Basic test', async () =>{
    render(<NavBar/>)

    expect(screen.getByText('Home'))
});