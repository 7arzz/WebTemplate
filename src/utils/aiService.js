const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function generateWebsiteContent(prompt) {
  const systemPrompt = `Kamu adalah AI assistant yang membantu membuat konten website bisnis profesional dalam Bahasa Indonesia.

Berdasarkan deskripsi bisnis dari user, generate SEMUA konten website dalam format JSON berikut.
PENTING: Hanya balas dalam format JSON MURNI tanpa markdown, tanpa backtick, tanpa penjelasan.

Format JSON yang HARUS diikuti:
{
  "business": {
    "name": "Nama Bisnis",
    "description": "Deskripsi singkat bisnis (1-2 kalimat untuk hero section)",
    "about": "Paragraf panjang tentang bisnis (3-4 kalimat)",
    "logoURL": ""
  },
  "theme": {
    "primaryColor": "#hex warna gelap utama",
    "secondaryColor": "#hex warna terang",
    "accentColor": "#hex warna aksen",
    "templateId": "template-01"
  },
  "services": [
    {
      "id": 1,
      "name": "Nama Layanan",
      "description": "Deskripsi layanan",
      "price": "Rp X.XXX.XXX",
      "image": ""
    }
  ],
  "portfolio": [
    {
      "id": 1,
      "title": "Judul Portfolio",
      "category": "Kategori",
      "image": ""
    }
  ],
  "testimonials": [
    {
      "id": 1,
      "name": "Nama Customer",
      "text": "Review testimoni yang realistis",
      "rating": 5
    }
  ],
  "contact": {
    "whatsapp": "628123456789",
    "email": "email@bisnis.com",
    "address": "Alamat lengkap"
  }
}

ATURAN:
- Buat minimal 3 layanan dengan harga realistis dalam Rupiah
- Buat minimal 4 portfolio dengan judul yang relevan
- Buat minimal 3 testimoni dengan nama Indonesia yang realistis
- Pilih kombinasi warna yang ESTETIK dan sesuai dengan jenis bisnis
- Untuk bisnis mewah: gunakan warna gelap (navy, hitam, emas)
- Untuk bisnis kreatif: gunakan warna vibrant
- Untuk bisnis kesehatan: gunakan warna hijau/biru lembut
- Untuk bisnis makanan: gunakan warna hangat (oranye, merah)
- Semua konten HARUS dalam Bahasa Indonesia
- image dan logoURL biarkan string kosong ""`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: systemPrompt },
          { text: `Deskripsi bisnis dari user: "${prompt}"\n\nGenerate konten website lengkap dalam format JSON:` }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 4096,
    }
  };

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Gagal menghubungi Gemini API');
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      throw new Error('Tidak ada respons dari AI');
    }

    // Clean the response - remove markdown code blocks if any
    let cleaned = textContent.trim();
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '');
    
    const parsed = JSON.parse(cleaned);
    
    // Ensure templateId is always set
    if (parsed.theme) {
      parsed.theme.templateId = 'template-01';
    }

    return { success: true, data: parsed };
  } catch (error) {
    console.error('AI Generation Error:', error);
    return { success: false, error: error.message };
  }
}
