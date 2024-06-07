export default function Home() {
  const appEnv = process.env.APP_ENV
  return (
    <>
      <div>App: {appEnv}</div>
    </>
  );
}
