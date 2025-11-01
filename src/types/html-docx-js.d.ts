declare module "html-to-docx" {
  function HTMLtoDOCX(
    html: string,
    headerHTMLString?: string | null,
    options?: {
      table?: {
        row?: {
          cantSplit?: boolean;
        };
      };
      footer?: boolean;
      pageNumber?: boolean;
      font?: string;
      fontSize?: string;
      complexFields?: boolean;
      numberingLevel?: number;
    },
  ): Promise<ArrayBuffer>;

  export default HTMLtoDOCX;
}
