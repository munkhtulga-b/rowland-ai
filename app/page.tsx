import SessionLayout from "./chat/layout";
import SessionHomePage from "./chat/page";

export default function Home() {
  return (
    <>
      <SessionLayout>
        <SessionHomePage />
      </SessionLayout>
    </>
  );
}
