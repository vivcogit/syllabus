import './Button.scss';

interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode;
}

function Button(props: IButtonProps) {
  const { children, className = '', ...otherProps } = props;

  return (
    <button
      className={`button ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
