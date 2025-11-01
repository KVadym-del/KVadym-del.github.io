import { MarkdownConverter } from "../components/MarkdownConverter";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { siteMetadata, navigationLinks } from "../data/site";

/**
 * ConverterPage Component
 * Dedicated page for markdown conversion tool
 */
export function ConverterPage() {
  return (
    <>
      <Header siteName={siteMetadata.name} links={navigationLinks} />

      <main
        style={{
          flex: "1",
          width: "100%",
          position: "relative",
          "z-index": "1",
          "min-height": "calc(100vh - 200px)",
        }}
      >
        <MarkdownConverter />
      </main>

      <Footer metadata={siteMetadata} />
    </>
  );
}
