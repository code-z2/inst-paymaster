const SiteHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="site-header">
      <div className="wrapper">{children}</div>
    </header>
  );
};

export default SiteHeader;
