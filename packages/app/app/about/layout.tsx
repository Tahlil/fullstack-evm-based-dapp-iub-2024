interface Props {
    children: React.ReactNode;
  }

export default function AboutLayout({ children }: Props) {
    return (
      <div>
        <main>{children}</main>
      </div>
    );
  }