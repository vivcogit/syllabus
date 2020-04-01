import styles from './Button.module.css';

interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode;
}

function Button(props: IButtonProps) {
  const { children, className = '', ...otherProps } = props;

  return (
    <button
      className={`${styles.button} ${styles[className]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
