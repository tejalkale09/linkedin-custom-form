'use client'

import { useState } from 'react'

export default function Home() {
  const [submitted, setSubmitted] = useState(false)
  const [images, setImages] = useState<any[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [search, setSearch] = useState('business')

  const webhookUrl =
    "http://localhost:5678/webhook/da707a5c-68f0-4d31-aac2-ba8e7c5d2dc6"

  const searchImages = async () => {
    try {
      const res = await fetch(`/api/pexels?query=${search}`)
      const data = await res.json()
      setImages(data.photos || [])
    } catch (error) {
      console.error('Image fetch failed:', error)
    }
  }

  const toggleImage = (url: string) => {
    if (selected.includes(url)) {
      setSelected(selected.filter((i) => i !== url))
    } else {
      setSelected([...selected, url])
    }
  }

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const payload = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    linkedinUrl: formData.get("linkedinUrl"),
    title: formData.get("title"),
    postDate: formData.get("postDate"),
    postTime: formData.get("postTime"),
    wordCount: formData.get("wordCount"),
    tone: formData.get("tone"),
    previousPost: formData.get("previousPost"),
    customInstructions: formData.get("customInstructions"),
    selectedImages: selected,
  };

  await fetch("http://localhost:5678/webhook/linkedln-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  router.push("/success");
};
  if (submitted) {
    return (
      <div style={successStyle}>
        ✅ Form submitted successfully
      </div>
    )
  }

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>LinkedIn Post Planner</h1>
      <p style={subtitleStyle}>Fill the details below for your LinkedIn post</p>

      <form onSubmit={handleSubmit}>
        <Input label="Full Name" name="fullName" />
        <Input label="Email" name="email" />
        <Input label="LinkedIn URL" name="linkedinUrl" />
        <Input label="Post Title" name="title" />
        <Input type="date" label="Post Date" name="postDate" />
        <Input type="time" label="Post Time" name="postTime" />
        <Input type="number" label="Word Count" name="wordCount" />

        <Select label="Tone" name="tone">
          <option>Professional</option>
          <option>Inspirational</option>
          <option>Casual</option>
        </Select>

        
        <TextArea label="Previous LinkedIn Post" name="previousPost" />
        <TextArea label="Custom Instructions" name="customInstructions" />

        {/* IMAGE SEARCH */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Search Images</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images from Pexels"
            style={inputStyle}
          />
          <button type="button" onClick={searchImages} style={buttonSecondary}>
            Search Images
          </button>
        </div>

        {/* IMAGE GRID */}
        <div style={gridStyle}>
          {images.map((img: any) => (
            <img
              key={img.id}
              src={img.src.medium}
              onClick={() => toggleImage(img.src.medium)}
              style={{
                ...imageStyle,
                border: selected.includes(img.src.medium)
                  ? '3px solid #2563eb'
                  : '2px solid #e5e7eb',
              }}
            />
          ))}
        </div>

        <button type="submit" style={buttonPrimary}>
          Submit
        </button>
      </form>
    </div>
  )
}

/* ---------- COMPONENTS ---------- */

function Input({ label, name, type = 'text' }: any) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <label style={labelStyle}>{label}</label>
      <input name={name} type={type} style={inputStyle} />
    </div>
  )
}

function Select({ label, name, children }: any) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <label style={labelStyle}>{label}</label>
      <select name={name} style={inputStyle}>
        {children}
      </select>
    </div>
  )
}

function TextArea({ label, name }: any) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <label style={labelStyle}>{label}</label>
      <textarea name={name} rows={4} style={inputStyle} />
    </div>
  )
}

/* ---------- STYLES ---------- */

const pageStyle = {
  maxWidth: '720px',
  margin: '40px auto',
  padding: '40px',
  background: '#ffffff',
  fontFamily: 'Inter, Arial, sans-serif',
}

const titleStyle = {
  fontSize: '34px',
  fontWeight: '700',
  color: '#eab308',
  marginBottom: '8px',
}

const subtitleStyle = {
  color: '#6b7280',
  marginBottom: '28px',
}

const labelStyle = {
  color: '#7c3aed',
  fontWeight: '600',
  marginBottom: '6px',
  display: 'block',
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #d1d5db',
  color: '#000',
}

const buttonPrimary = {
  padding: '12px 28px',
  background: '#4f46e5',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
}

const buttonSecondary = {
  marginTop: '10px',
  padding: '8px 16px',
  background: '#7c3aed',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '12px',
  marginBottom: '30px',
}

const imageStyle = {
  width: '100%',
  height: '150px',
  objectFit: 'cover' as const,
  cursor: 'pointer',
  borderRadius: '6px',
}

const successStyle = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '22px',
  background: '#ffffff',
}
