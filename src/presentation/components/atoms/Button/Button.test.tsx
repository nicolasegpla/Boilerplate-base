import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Button } from './Button';

describe('<Button />', () => {
    it('should render without crashing', () => {
        render(<Button />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should display the label text', () => {
        render(<Button label="Click me" />);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });
});
