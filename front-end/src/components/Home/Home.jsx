import Logo from "../Logo/Logo.jsx";
import InputBox from "../InputBox/InputBox.jsx";
import { useEffect } from "react";

function Home({ativarMenu}) {

  useEffect(() => {
    ativarMenu()
  }, [])

  return (
    <>
      <Logo></Logo>
      <InputBox></InputBox>
    </>
  );
}

export default Home;
