import styles from './MenuGroup.module.css';

interface IMenuGroupProps {
  title: string;
  children: React.ReactNode;
}

function MenuGroup(props: IMenuGroupProps) {
  const { title, children } = props;

  return (
    <div className={styles.menuGroup}>
      <h2 className={styles.menuGroup_title}>
        {title}
      </h2>

      {children}
    </div>
  );
}

export default MenuGroup;
