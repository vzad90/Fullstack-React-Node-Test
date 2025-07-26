import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input', () => {
  it('renders label and input', () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });
}); 