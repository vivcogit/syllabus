import './MenuGroup.scss';

interface IMenuGroupProps {
  title: string;
  children: React.ReactNode;
}

function MenuGroup(props: IMenuGroupProps) {
  const { title, children } = props;

  return (
    <div className="menuGroup">
      <h2 className="menuGroup-title">{title}</h2>

      {children}
    </div>
  );
}

export default MenuGroup;
