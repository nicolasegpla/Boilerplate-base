import './button.scss';

interface ButtonProps {
    label?: string;
}

export const Button = ({ label = 'Button' }: ButtonProps) => {
    return (
        <button type="button" className="button">
            {label}
        </button>
    );
};
