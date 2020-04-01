import styles from './Textarea.module.css';

interface ITextareaProps {
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
}

function Textarea(props: ITextareaProps) {
  const { onChange, value, placeholder } = props;

  return (
    <textarea
      className={styles.textarea}
      value={value}
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => onChange(e.target.value)}
    />
  );
}

export { Textarea };
