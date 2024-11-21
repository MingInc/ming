import { PDFDocument, StandardFonts } from "pdf-lib";
import { addCorsHeaders } from "../helpers/CorsHeader";
import { join } from "path";
import fs from "fs";
import type { Payment } from "../models/Payment.Schema";

async function createInvoice(payment: any) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;

  // Add invoice header
  page.drawText("Invoice", { x: 50, y: height - 50, size: 24, font });

  // Add payment details to the invoice
  page.drawText(`Invoice #: ${payment.stripePaymentId}`, {
    x: 50,
    y: height - 100,
    size: fontSize,
    font,
  });
  page.drawText(`Date: ${new Date(payment.createdAt).toLocaleDateString()}`, {
    x: 50,
    y: height - 120,
    size: fontSize,
    font,
  });
  page.drawText(`User ID: ${payment.userId}`, {
    x: 50,
    y: height - 140,
    size: fontSize,
    font,
  });

  // Add payment details
  page.drawText(`Amount: ${payment.amount} ${payment.currency}`, {
    x: 50,
    y: height - 160,
    size: fontSize,
    font,
  });
  page.drawText(`Status: ${payment.status}`, {
    x: 50,
    y: height - 180,
    size: fontSize,
    font,
  });
  page.drawText(`Payment Method: ${payment.paymentMethod}`, {
    x: 50,
    y: height - 200,
    size: fontSize,
    font,
  });
  page.drawText(`Description: ${payment.description}`, {
    x: 50,
    y: height - 220,
    size: fontSize,
    font,
  });

  // Save PDF and write to file
  const pdfBytes = await pdfDoc.save();
  const fileName = `invoice-${payment.stripePaymentId}-${Date.now()}.pdf`;
  const filePath = join(process.cwd(), "invoices", fileName);

  const invoiceDir = join(process.cwd(), "invoices");
  if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir, { recursive: true });
  }
  fs.writeFileSync(filePath, pdfBytes);

  return fileName;
}

export async function handleDownloadInvoice(req: Request): Promise<Response> {
  try {
    const payment: Payment = await req.json();

    // Generate the PDF bytes
    const fileName = await createInvoice(payment);

    console.log("file name :", fileName);
    const filePath = join(process.cwd(), "invoices", fileName);

    if (fs.existsSync(filePath)) {
      const file = Bun.file(filePath);

      // Set the appropriate headers for file download
      const headers = new Headers();
      headers.set("Content-Type", "application/pdf");
      headers.set("Content-Disposition", `attachment; filename=${fileName}`);

      return addCorsHeaders(new Response(file, { headers }));
    }

    return addCorsHeaders(
      new Response(
        JSON.stringify({
          success: true,
          filePath,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    );
  } catch (error) {
    // Handle errors
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          error: `An error occurred: ${(error as Error).message}`,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    );
  }
}
