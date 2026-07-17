import { LazyMotion, domAnimation, AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const Home = lazy(() => import("@/pages/Home"));
const Collection = lazy(() => import("@/pages/Collection"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Story = lazy(() => import("@/pages/Story"));
const Contact = lazy(() => import("@/pages/Contact"));

function LoadingScreen() {
  const [show, setShow] = useState(() => sessionStorage.getItem("rasa-loaded") !== "true");

  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("rasa-loaded", "true");
      setShow(false);
    }, 2400);
    return () => window.clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-obsidian"
        >
          <div className="text-center">
            <div className="overflow-hidden font-display text-[clamp(36px,6vw,80px)] font-light tracking-[0.14em] text-ivory">
              {"RASA ÉCLAT".split("").map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.055, duration: 0.45 }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="mx-auto mt-5 h-px w-72 origin-left bg-copper"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.45, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ScrollRestoration() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      window.setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" }), 80);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);
  return null;
}

export default function App() {
  useSmoothScroll();

  return (
    <LazyMotion features={domAnimation}>
      <ScrollRestoration />
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <PageTransition>
        <Suspense fallback={<div className="min-h-screen bg-obsidian" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/collection/:id" element={<ProductDetail />} />
            <Route path="/story" element={<Story />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </PageTransition>
      <Footer />
      <CartDrawer />
    </LazyMotion>
  );
}
