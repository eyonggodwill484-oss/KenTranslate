export default function Head() {
  const href = '/favicon.svg?v=2';
  return (
    <>
      <link rel="icon" href={href} />
      <link rel="shortcut icon" href={href} />
      <link rel="apple-touch-icon" href={href} />
    </>
  );
}
