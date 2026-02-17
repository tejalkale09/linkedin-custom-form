'use client'
import { useState } from 'react'

export default function Home() {

  const [submitted,setSubmitted]=useState(false)
  const [images,setImages]=useState<any[]>([])
  const [selected,setSelected]=useState<string[]>([])
  const [search,setSearch]=useState("business")

  const webhookUrl = "http://localhost:5678/webhook/da707a5c-68f0-4d31-aac2-ba8e7c5d2dc6"

  const searchImages = async () => {
    try {
      const res = await fetch(`/api/pexels?query=${search}`)
      const data = await res.json()
      setImages(data.photos || [])
    } catch (error) {
      console.error("Image fetch failed:", error)
    }
  }

  const toggleImage = (url:string)=>{
    if(selected.includes(url)){
      setSelected(selected.filter(i=>i!==url))
    }else{
      setSelected([...selected,url])
    }
  }

  const handleSubmit = async (e:any)=>{
    e.preventDefault()
    const formData = new FormData(e.target)

    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      linkedinUrl: formData.get("linkedinUrl"),
      title: formData.get("title"),
      tone: formData.get("tone"),
      postDate: formData.get("postDate"),
      postTime: formData.get("postTime"),
      wordCount: formData.get("wordCount"),
      profession: formData.get("profession"),
      previousPost: formData.get("previousPost"),
      customInstructions: formData.get("customInstructions"),
      selectedImages: selected
    }

    await fetch(webhookUrl,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(payload)
    })

    setSubmitted(true)
  }

  if(submitted){
    return(
      <div style={successContainer}>
        ✅ Form submitted successfully.
      </div>
    )
  }

  return(
    <div style={pageWrapper}>
      <div style={formCard}>
        
        <h1 style={headingStyle}>LinkedIn Post Planner</h1>
        <p style={subHeading}>
          Fill the details below to plan your next high-performing LinkedIn post
        </p>

        <form onSubmit={handleSubmit}>

          <Input label="Full Name" name="fullName"/>
          <Input label="Email Address" name="email"/>
          <Input label="LinkedIn Profile URL" name="linkedinUrl"/>
          <Input label="Post Title" name="title"/>
          <Input type="date" label="Post Date" name="postDate"/>
          <Input type="time" label="Post Time" name="postTime"/>
          <Input type="number" label="Word Count" name="wordCount"/>

          <Select label="Tone" name="tone">
            <option>Professional</option>
            <option>Inspirational</option>
            <option>Casual</option>
          </Select>

          <Select label="Profession" name="profession">
            <option>Teacher</option>
            <option>Student</option>
            <option>Founder</option>
            <option>Marketer</option>
          </Select>

          <TextArea label="Previous LinkedIn Post" name="previousPost"/>
          <TextArea label="Custom Instructions" name="customInstructions"/>

          {/* IMAGE SEARCH */}
          <div style={{marginBottom:"20px"}}>
            <input 
              placeholder="Search images..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              style={inputStyle}
            />
            <button type="button" onClick={searchImages} style={secondaryButton}>
              Search Images
            </button>
          </div>

          {/* IMAGE GRID */}
          <div style={imageGrid}>
            {images.map((img:any)=>(
              <img
                key={img.id}
                src={img.src.medium}
                onClick={()=>toggleImage(img.src.medium)}
                style={{
                  ...imageStyle,
                  border:selected.includes(img.src.medium)
                    ?"3px solid #2563eb"
                    :"2px solid #e5e7eb"
                }}
              />
            ))}
          </div>

          <button type="submit" style={primaryButton}>
            Submit Post Plan
          </button>

        </form>
      </div>
    </div>
  )
}

/* ================== STYLES ================== */

const pageWrapper={
  background:"#ffffff",
  minHeight:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  padding:"40px",
  fontFamily:"Inter, Arial, sans-serif"
}

const formCard={
  width:"100%",
  maxWidth:"700px",
  background:"#ffffff",
  padding:"40px",
  borderRadius:"14px",
  boxShadow:"0 10px 30px rgba(0,0,0,0.08)"
}

const headingStyle={
  fontSize:"34px",
  fontWeight:"700",
  color:"#facc15", // yellow like website
  marginBottom:"8px"
}

const subHeading={
  color:"#6b7280",
  marginBottom:"30px"
}

const inputStyle={
  width:"100%",
  padding:"12px",
  marginTop:"6px",
  marginBottom:"18px",
  border:"1px solid #d1d5db",
  borderRadius:"8px",
  fontSize:"15px",
  color:"#000000",
  outline:"none"
}

const primaryButton={
  width:"100%",
  padding:"14px",
  background:"#5b5bd6",
  color:"#ffffff",
  border:"none",
  borderRadius:"8px",
  fontWeight:"600",
  fontSize:"16px",
  cursor:"pointer",
  marginTop:"20px"
}

const secondaryButton={
  marginTop:"10px",
  padding:"10px 18px",
  background:"#5b5bd6",
  color:"#fff",
  border:"none",
  borderRadius:"8px",
  cursor:"pointer"
}

const imageGrid={
  display:"grid",
  gridTemplateColumns:"repeat(3,1fr)",
  gap:"12px",
  marginTop:"20px",
  marginBottom:"30px"
}

const imageStyle={
  width:"100%",
  height:"140px",
  objectFit:"cover",
  borderRadius:"8px",
  cursor:"pointer",
  transition:"all 0.2s ease"
}

const successContainer={
  height:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  fontSize:"22px",
  background:"#ffffff"
}

/* COMPONENTS */

function Input({label,name,type="text"}:any){
  return(
    <div>
      <label style={{fontWeight:"600",color:"#4f46e5"}}>
        {label}
      </label>
      <input name={name} type={type} style={inputStyle}/>
    </div>
  )
}

function Select({label,name,children}:any){
  return(
    <div>
      <label style={{fontWeight:"600",color:"#4f46e5"}}>
        {label}
      </label>
      <select name={name} style={inputStyle}>
        {children}
      </select>
    </div>
  )
}

function TextArea({label,name}:any){
  return(
    <div>
      <label style={{fontWeight:"600",color:"#4f46e5"}}>
        {label}
      </label>
      <textarea name={name} rows={4} style={inputStyle}/>
    </div>
  )
}
