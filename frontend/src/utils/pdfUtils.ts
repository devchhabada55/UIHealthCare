import { PDFDocument, PDFPage, rgb } from 'pdf-lib';

// PDF page size constants
export const PDF_PAGE_SIZES = {
  A4: { width: 595.28, height: 841.89 },
  LETTER: { width: 612, height: 792 },
  LEGAL: { width: 612, height: 1008 },
};

// PDF color constants
export const PDF_COLORS = {
  BLACK: rgb(0, 0, 0),
  WHITE: rgb(1, 1, 1),
  RED: rgb(1, 0, 0),
  GREEN: rgb(0, 1, 0),
  BLUE: rgb(0, 0, 1),
  GRAY: rgb(0.5, 0.5, 0.5),
};

// PDF font size constants
export const PDF_FONT_SIZES = {
  SMALL: 8,
  MEDIUM: 12,
  LARGE: 16,
  XLARGE: 20,
  XXLARGE: 24,
};

// Create a new PDF document
export const createPDF = async (): Promise<PDFDocument> => {
  return await PDFDocument.create();
};

// Load an existing PDF document
export const loadPDF = async (pdfBytes: Uint8Array): Promise<PDFDocument> => {
  return await PDFDocument.load(pdfBytes);
};

// Save a PDF document
export const savePDF = async (pdfDoc: PDFDocument): Promise<Uint8Array> => {
  return await pdfDoc.save();
};

// Add a new page to a PDF document
export const addPage = (
  pdfDoc: PDFDocument,
  size: { width: number; height: number } = PDF_PAGE_SIZES.A4
): PDFPage => {
  return pdfDoc.addPage([size.width, size.height]);
};

// Get all pages from a PDF document
export const getPages = (pdfDoc: PDFDocument): PDFPage[] => {
  return pdfDoc.getPages();
};

// Get a specific page from a PDF document
export const getPage = (pdfDoc: PDFDocument, index: number): PDFPage => {
  return pdfDoc.getPage(index);
};

// Remove a page from a PDF document
export const removePage = (pdfDoc: PDFDocument, index: number): void => {
  pdfDoc.removePage(index);
};

// Insert a page into a PDF document
export const insertPage = (
  pdfDoc: PDFDocument,
  index: number,
  size: { width: number; height: number } = PDF_PAGE_SIZES.A4
): PDFPage => {
  return pdfDoc.insertPage(index, [size.width, size.height]);
};

// Copy pages from one PDF to another
export const copyPages = async (
  sourceDoc: PDFDocument,
  targetDoc: PDFDocument,
  pageIndices: number[]
): Promise<void> => {
  const copiedPages = await targetDoc.copyPages(sourceDoc, pageIndices);
  copiedPages.forEach((page) => targetDoc.addPage(page));
};

// Merge multiple PDF documents
export const mergePDFs = async (pdfDocs: PDFDocument[]): Promise<PDFDocument> => {
  const mergedPdf = await PDFDocument.create();
  for (const pdfDoc of pdfDocs) {
    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  return mergedPdf;
};

// Split a PDF document into multiple documents
export const splitPDF = async (
  pdfDoc: PDFDocument,
  pageRanges: number[][]
): Promise<PDFDocument[]> => {
  return await Promise.all(
    pageRanges.map(async (range) => {
      const newPdf = await PDFDocument.create();
      const [start, end] = range;
      const pages = await newPdf.copyPages(pdfDoc, Array.from({ length: end - start + 1 }, (_, i) => start + i));
      pages.forEach((page) => newPdf.addPage(page));
      return newPdf;
    })
  );
};

// Add text to a PDF page
export const addText = (
  page: PDFPage,
  text: string,
  options: {
    x: number;
    y: number;
    size?: number;
    color?: { r: number; g: number; b: number };
    font?: string;
  }
): void => {
  const { x, y, size = PDF_FONT_SIZES.MEDIUM, color = PDF_COLORS.BLACK, font = 'Helvetica' } = options;
  page.drawText(text, {
    x,
    y,
    size,
    color,
    font,
  });
};

// Add an image to a PDF page
export const addImage = async (
  page: PDFPage,
  imageBytes: Uint8Array,
  options: {
    x: number;
    y: number;
    width?: number;
    height?: number;
  }
): Promise<void> => {
  const { x, y, width, height } = options;
  const image = await page.doc.embedPng(imageBytes);
  page.drawImage(image, {
    x,
    y,
    width: width || image.width,
    height: height || image.height,
  });
};

// Add a rectangle to a PDF page
export const addRectangle = (
  page: PDFPage,
  options: {
    x: number;
    y: number;
    width: number;
    height: number;
    color?: { r: number; g: number; b: number };
    borderColor?: { r: number; g: number; b: number };
    borderWidth?: number;
  }
): void => {
  const {
    x,
    y,
    width,
    height,
    color = PDF_COLORS.WHITE,
    borderColor = PDF_COLORS.BLACK,
    borderWidth = 1,
  } = options;

  page.drawRectangle({
    x,
    y,
    width,
    height,
    color,
    borderColor,
    borderWidth,
  });
};

// Add a line to a PDF page
export const addLine = (
  page: PDFPage,
  options: {
    start: { x: number; y: number };
    end: { x: number; y: number };
    color?: { r: number; g: number; b: number };
    thickness?: number;
  }
): void => {
  const { start, end, color = PDF_COLORS.BLACK, thickness = 1 } = options;

  page.drawLine({
    start,
    end,
    color,
    thickness,
  });
};

// Add a table to a PDF page
export const addTable = (
  page: PDFPage,
  options: {
    x: number;
    y: number;
    data: string[][];
    headers?: string[];
    cellPadding?: number;
    fontSize?: number;
    headerColor?: { r: number; g: number; b: number };
    headerTextColor?: { r: number; g: number; b: number };
    cellColor?: { r: number; g: number; b: number };
    cellTextColor?: { r: number; g: number; b: number };
    borderColor?: { r: number; g: number; b: number };
    borderWidth?: number;
  }
): void => {
  const {
    x,
    y,
    data,
    headers,
    cellPadding = 5,
    fontSize = PDF_FONT_SIZES.MEDIUM,
    headerColor = PDF_COLORS.GRAY,
    headerTextColor = PDF_COLORS.WHITE,
    cellColor = PDF_COLORS.WHITE,
    cellTextColor = PDF_COLORS.BLACK,
    borderColor = PDF_COLORS.BLACK,
    borderWidth = 1,
  } = options;

  let currentY = y;
  const cellHeight = fontSize + cellPadding * 2;
  const columnWidths = data[0].map((_, colIndex) =>
    Math.max(
      ...data.map((row) => row[colIndex].length * (fontSize * 0.6)),
      headers ? headers[colIndex].length * (fontSize * 0.6) : 0
    )
  );

  // Draw headers if provided
  if (headers) {
    let currentX = x;
    headers.forEach((header, colIndex) => {
      page.drawRectangle({
        x: currentX,
        y: currentY,
        width: columnWidths[colIndex] + cellPadding * 2,
        height: cellHeight,
        color: headerColor,
        borderColor,
        borderWidth,
      });

      page.drawText(header, {
        x: currentX + cellPadding,
        y: currentY + cellPadding,
        size: fontSize,
        color: headerTextColor,
      });

      currentX += columnWidths[colIndex] + cellPadding * 2;
    });
    currentY += cellHeight;
  }

  // Draw data rows
  data.forEach((row) => {
    let currentX = x;
    row.forEach((cell, colIndex) => {
      page.drawRectangle({
        x: currentX,
        y: currentY,
        width: columnWidths[colIndex] + cellPadding * 2,
        height: cellHeight,
        color: cellColor,
        borderColor,
        borderWidth,
      });

      page.drawText(cell, {
        x: currentX + cellPadding,
        y: currentY + cellPadding,
        size: fontSize,
        color: cellTextColor,
      });

      currentX += columnWidths[colIndex] + cellPadding * 2;
    });
    currentY += cellHeight;
  });
};

// Add a watermark to a PDF page
export const addWatermark = (
  page: PDFPage,
  text: string,
  options: {
    opacity?: number;
    angle?: number;
    fontSize?: number;
    color?: { r: number; g: number; b: number };
  } = {}
): void => {
  const {
    opacity = 0.3,
    angle = -45,
    fontSize = PDF_FONT_SIZES.XXLARGE,
    color = PDF_COLORS.GRAY,
  } = options;

  const { width, height } = page.getSize();
  const centerX = width / 2;
  const centerY = height / 2;

  page.drawText(text, {
    x: centerX,
    y: centerY,
    size: fontSize,
    color: { ...color, a: opacity },
    rotate: { type: 'degrees', angle },
  });
};

// Add page numbers to a PDF document
export const addPageNumbers = (
  pdfDoc: PDFDocument,
  options: {
    startNumber?: number;
    fontSize?: number;
    color?: { r: number; g: number; b: number };
    position?: 'top' | 'bottom';
    margin?: number;
  } = {}
): void => {
  const {
    startNumber = 1,
    fontSize = PDF_FONT_SIZES.MEDIUM,
    color = PDF_COLORS.BLACK,
    position = 'bottom',
    margin = 20,
  } = options;

  const pages = pdfDoc.getPages();
  pages.forEach((page, index) => {
    const { width, height } = page.getSize();
    const pageNumber = (startNumber + index).toString();
    const textWidth = pageNumber.length * (fontSize * 0.6);

    page.drawText(pageNumber, {
      x: (width - textWidth) / 2,
      y: position === 'top' ? height - margin : margin,
      size: fontSize,
      color,
    });
  });
}; 