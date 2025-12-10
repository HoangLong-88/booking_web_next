import { Variants } from "framer-motion";

export const sidebarVariant: Variants = {
  collapsed: {
    width: 60,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  expanded: {
    width: 260,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export const overlayVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};
