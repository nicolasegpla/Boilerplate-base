import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Button } from './Button';

describe('<Button />', () => {
    it('should render without crashing', () => {
        render(<Button />);
        expect(screen.getByText('Button works!')).toBeInTheDocument();
    });
});
