import Head from "next/head";
import Image from "next/image";
import Connect from "../components/Connect";
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Form />
    </div>
  );
}
