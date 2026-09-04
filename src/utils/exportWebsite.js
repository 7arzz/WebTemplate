import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const exportWebsite = async (data) => {
  const zip = new JSZip();

  // 1. Save data config
  zip.file("config.json", JSON.stringify(data, null, 2));

  // 2. Create a basic HTML file that users could use (in a real scenario, this would be a full bundled site)
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.business.name}</title>
  <style>
    body { font-family: sans-serif; background: ${data.theme.secondaryColor}; color: ${data.theme.primaryColor}; margin: 0; }
    header { background: ${data.theme.primaryColor}; color: ${data.theme.secondaryColor}; padding: 1rem; text-align: center; }
    .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
    .btn { background: ${data.theme.accentColor}; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 1rem; }
  </style>
</head>
<body>
  <header>
    <h1>${data.business.name}</h1>
  </header>
  <div class="container">
    <h2>Welcome to our website</h2>
    <p>${data.business.description}</p>
    <a href="https://wa.me/${data.contact.whatsapp}" class="btn">Contact Us on WhatsApp</a>
  </div>
</body>
</html>
  `;
  
  zip.file("index.html", htmlContent);

  // Generate the zip and trigger download
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, `${data.business.name.replace(/\s+/g, '-').toLowerCase()}-website.zip`);
};
