"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [images, setImages] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("business");
  const router = useRouter();

  const webhookUrl =
    " https://leanne-piliferous-efren.ngrok-free.dev/webhook/linkedin-custom-form";

  const searchImages = async () => {
    const res = await fetch(`/api/pexels?query=${search}`);
    const data = await res.json();
    setImages(data.photos || []);
  };

  const toggleImage = (url: string) => {
    setSelected((prev) =>
      prev.includes(url)
        ? prev.filter((item) => item !== url)
        : [...prev, url]
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const payload = {
      client_id:crypto.randomUUID(),
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      linkedinUrl: formData.get("linkedinUrl"),
      title: formData.get("title"),
      tone: formData.get("tone"),
      postDate: formData.get("postDate"),
      postTime: formData.get("postTime"),
      wordCount: formData.get("wordCount"),
      previousPost: formData.get("previousPost"),
      customInstructions: formData.get("customInstructions"),
      selectedImages: selected,
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning":"true"
        },
        body: JSON.stringify(payload),
      });

      router.push("/success"as any);
    } catch (error) {
      console.error("Webhook error:", error);
      alert("Error sending data to automation");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>LinkedIn Post Planner</h1>
        <p style={subtitleStyle}>
          Fill the details below for your LinkedIn post
        </p>

        <form onSubmit={handleSubmit}>
          <Input label="Full Name" name="fullName" />
          <Input label="Email" name="email" type="email" />
          <Input label="LinkedIn URL" name="linkedinUrl" />
          <Input label="Post Title" name="title" />
          <Input label="Post Date" name="postDate" type="date" />
          <Input label="Post Time" name="postTime" type="time" />
          <Input label="Word Count" name="wordCount" type="number" />

          <Select label="Tone" name="tone">
            <option>Professional</option>
            <option>Inspirational</option>
            <option>Casual</option>
          </Select>

          <TextArea label="Previous LinkedIn Post" name="previousPost" />
          <TextArea label="Custom Instructions" name="customInstructions" />

          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Search Images</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search images..."
              style={inputStyle}
            />
            <button type="button" onClick={searchImages} style={buttonSecondary}>
              Search Images
            </button>
          </div>

          <div style={gridStyle}>
            {images.map((img: any) => (
              <img
                key={img.id}
                src={img.src.medium}
                onClick={() => toggleImage(img.src.medium)}
                style={{
                  ...imageStyle,
                  border: selected.includes(img.src.medium)
                    ? "3px solid #2E2A8C"
                    : "2px solid #E5E7EB",
                }}
              />
            ))}
          </div>

          <button type="submit" style={buttonPrimary}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Input({ label, name, type = "text" }: any) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input name={name} type={type} style={inputStyle} />
    </div>
  );
}

function Select({ label, name, children }: any) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select name={name} style={inputStyle}>
        {children}
      </select>
    </div>
  );
}

function TextArea({ label, name }: any) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <textarea name={name} rows={4} style={inputStyle} />
    </div>
  );
}

/* STYLES */

const pageStyle = {
  backgroundColor: "#F5F6FA",
  minHeight: "100vh",
  padding: "50px 20px",
  fontFamily: "Inter, Arial, sans-serif",
};

const cardStyle = {
  maxWidth: "760px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  padding: "45px",
  borderRadius: "20px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
};

const titleStyle = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#2E2A8C",
  marginBottom: "12px",
};

const subtitleStyle = {
  color: "#6B7280",
  marginBottom: "30px",
  fontSize: "16px",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: 600,
  color: "#1E1E2F",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #E5E7EB",
  fontSize: "14px",
  marginBottom: "18px",
};

const buttonPrimary = {
  width: "100%",
  background: "linear-gradient(90deg, #2E2A8C, #5B4DFF)",
  color: "#ffffff",
  padding: "14px",
  border: "none",
  borderRadius: "50px",
  fontWeight: "600",
  cursor: "pointer",
};

const buttonSecondary = {
  width: "100%",
  backgroundColor: "transparent",
  border: "2px solid #F4C430",
  color: "#F4C430",
  padding: "14px",
  borderRadius: "50px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "15px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
  gap: "12px",
  marginBottom: "25px",
};

const imageStyle = {
  width: "100%",
  height: "140px",
  objectFit: "cover" as const,
  borderRadius: "14px",
  cursor: "pointer",
};
