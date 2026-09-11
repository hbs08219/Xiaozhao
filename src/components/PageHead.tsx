export default function PageHead({ title, desc }: { title: string; desc: string }) {
  return (
    <header className="page-head">
      <h1>{title}</h1>
      <p>{desc}</p>
    </header>
  );
}
