"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "./Nav";
import Footer from "./Footer";
import Preloader from "./Preloader";
import Particles from "./Particles";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("pl-seen")) setReady(true);
  }, []);

  const done = () => {
    setReady(true);
    sessionStorage.setItem("pl-seen", "1");
  };

  return (
    <>
      <AnimatePresence>{!ready && <Preloader key="pl" onDone={done} />}</AnimatePresence>
      {ready && (
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.55, ease:[.16,1,.3,1] }}>
          <Particles />
          <Nav />
          <AnimatePresence mode="wait">{children}</AnimatePresence>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
