const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${GEMINI_API_KEY}`;

async function fetchWithRetry(url, options, retries = 3, backoff = 2000) {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, options);
    if (response.status === 503 || response.status === 429 || response.status >= 500) {
      if (i === retries - 1) return response;
      console.warn(`[AI Service] API Error (Status ${response.status}). Retrying in ${backoff}ms...`);
      await new Promise(res => setTimeout(res, backoff));
      backoff *= 1.5;
      continue;
    }
    return response;
  }
}

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
    "address": "Alamat lengkap dan spesifik (contoh: Jl. Sudirman No.1, Jakarta Pusat, DKI Jakarta)"
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
          {
            text: `Deskripsi bisnis dari user: "${prompt}"\n\nGenerate konten website lengkap dalam format JSON:`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 4096,
    },
  };

  try {
    const response = await fetchWithRetry(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Gagal menghubungi Gemini API",
      );
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      throw new Error("Tidak ada respons dari AI");
    }

    // Clean the response - remove markdown code blocks if any
    let cleaned = textContent.trim();
    cleaned = cleaned
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "");

    const parsed = JSON.parse(cleaned);

    // Ensure templateId is always set
    if (parsed.theme) {
      parsed.theme.templateId = "template-01";
    }

    return { success: true, data: parsed };
  } catch (error) {
    console.error("AI Generation Error:", error);
    return { success: false, error: error.message };
  }
}

export async function upgradeThemeColor(businessContext) {
  const { businessName, description, services = [] } = businessContext;

  const serviceNames =
    services
      .slice(0, 5)
      .map((s) => s.name)
      .join(", ") || "tidak diketahui";

  const requestBody = {
    // systemInstruction dipisah agar lebih dipatuhi model
    systemInstruction: {
      parts: [
        {
          text: `Kamu adalah AI desainer warna untuk website bisnis. Tugas: pilihkan palet warna estetik dan profesional sesuai karakter bisnis. Selalu balas HANYA dengan JSON tanpa teks lain.`,
        },
      ],
    },
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Pilihkan palet warna terbaik untuk website bisnis berikut:

Nama bisnis: ${businessName}
Deskripsi: ${description}
Layanan: ${serviceNames}

Balas HANYA dengan JSON format berikut (tanpa teks lain, tanpa markdown):
{"primaryColor":"#hexcode","secondaryColor":"#hexcode","accentColor":"#hexcode","reason":"alasan singkat 1 kalimat"}

Contoh:
{"primaryColor":"#1a1a2e","secondaryColor":"#f5f0e8","accentColor":"#c9956c","reason":"Warna navy dan krem memberikan kesan mewah untuk wedding organizer."}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 1024,
      responseMimeType: "application/json",
    },
  };

  try {
    const response = await fetchWithRetry(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Gagal menghubungi Gemini API",
      );
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Debug: lihat raw AI response di console browser
    console.log("[AI Color] raw response:", textContent);

    if (!textContent) {
      throw new Error("Tidak ada respons dari AI");
    }

    // Helper: ekstrak field warna secara individual (robust terhadap JSON malformed/truncated)
    const extractFieldsViaRegex = (text) => {
      const primary = text.match(/"primaryColor"\s*:\s*"(#[0-9a-fA-F]{3,8})"/i);
      const secondary = text.match(
        /"secondaryColor"\s*:\s*"(#[0-9a-fA-F]{3,8})"/i,
      );
      const accent = text.match(/"accentColor"\s*:\s*"(#[0-9a-fA-F]{3,8})"/i);
      const reason = text.match(/"reason"\s*:\s*"([^"]{0,300})"/i);
      if (primary && secondary && accent) {
        return {
          primaryColor: primary[1],
          secondaryColor: secondary[1],
          accentColor: accent[1],
          reason: reason ? reason[1] : "",
        };
      }
      return null;
    };

    let parsed = null;
    let cleaned = textContent
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    // Stage 1: direct JSON.parse
    try {
      if (!cleaned.startsWith("{")) {
        const jsonBlock = cleaned.match(/\{[\s\S]*\}/);
        if (jsonBlock) cleaned = jsonBlock[0];
      }
      parsed = JSON.parse(cleaned);
    } catch (_) {
      // Stage 2: malformed JSON — regex per field
      console.warn("[AI Color] JSON.parse failed, trying regex extraction...");
      parsed = extractFieldsViaRegex(textContent);
    }

    // Stage 3: validate & last-resort regex
    if (
      !parsed ||
      !parsed.primaryColor ||
      !parsed.secondaryColor ||
      !parsed.accentColor
    ) {
      parsed = extractFieldsViaRegex(textContent);
      if (!parsed) {
        throw new Error(
          `AI tidak menghasilkan warna valid. Response: "${textContent?.slice(0, 100)}"`,
        );
      }
    }

    return { success: true, data: parsed };
  } catch (error) {
    console.error("AI Color Upgrade Error:", error);
    return { success: false, error: error.message };
  }
}
