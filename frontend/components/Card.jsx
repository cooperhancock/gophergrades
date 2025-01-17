import { Box, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Card({
  children,
  href = "",
  style,
  isSummary,
  onClick = () => {},
  isStatic = false,
  ...props
}) {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const extraStyles = style || {};
  const hoverStyles = href
    ? {
        cursor: "pointer",
        boxShadow: "0px 0px 4px rgba(111, 19, 29, 0.175)",
        background: "rgba(255,255,255,0.25)",
        transition: "opacity 0.1s",
      }
    : {};

  const summaryStyles = isSummary
    ? {
        background: "rgba(255,255,255,0.85)",
        boxShadow: "0px 0px 6px rgba(111, 19, 29, 0.175)",
        padding: "36px 20px",
      }
    : {};
  const staticStyles = isStatic
    ? {
        padding: 0,
        margin: 0,
        boxShadow: "none",
      }
    : {};
  const card = (
    <Box
      background={"rgba(255,255,255,0.35)"}
      boxShadow={"0px 0px 4px rgba(111, 19, 29, 0.1)"}
      as={href ? "button" : "div"}
      style={{
        borderRadius: 8,
        width: "100%",
        padding: "12px 20px",
        position: "relative",
        textAlign: "left",
        ...summaryStyles,
        ...extraStyles,
        ...staticStyles,
      }}
      _hover={hoverStyles}
      onClick={() => {
        if (href && !isStatic) setClicked(true);
        else if (isStatic) {
          const path = router.asPath.split("?")[0];
          window.parent.postMessage(
            { url: `https://umn.lol${path}?ref=ext` },
            "*"
          );
          onClick();
        }
        onClick();
      }}
      {...props}
    >
      {children}
      {clicked && (
        <Spinner size={"sm"} ml={2} position={"absolute"} left={-1.5} top={4} />
      )}
    </Box>
  );

  if (href && !isStatic) {
    return (
      <Link
        href={href}
        style={{
          width: "100%",
        }}
      >
        {card}
      </Link>
    );
  }
  return card;
}
