'use client'
import { useState } from 'react'

export default function Home() {
  const [submitted, setSubmitted] = useState(false)

  const imageOptions = [
    "Motivational",
    "Business",
    "Education",
    "Marketing",
    "AI / Tech",
    "Minimal",
  ]

  const [selectedImage, setSelectedImage] = useState("")

  const handleSubmit = (e:any) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{background:"#000",height:"100vh",color:"#FFD700",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"22px"}}>
        ✅ Form submitted. Your response has been recorded.
      </div>
    )
  }

  return (
    <div style={{background:"#000",minHeight:"100vh",color:"white",padding:"40px",fontFamily:"Arial"}}>

      <h1 style={{color:"#FFD700",fontSize:"36px"}}>
        LinkedIn Post Planner
      </h1>
      <p style={{marginBottom:"30px"}}>
        Fill the details below for your post
      </p>

      <form onSubmit={handleSubmit}>

        {/* Full Name */}
        <Input label="Full Name" type="text" />

        {/* Email */}
        <Input label="Email" type="email" />

        {/* LinkedIn URL */}
        <Input label="LinkedIn Profile URL" type="text" />

        {/* Title */}
        <Input label="Post Title" type="text" />

        {/* Tone */}
        <Select label="Tone">
          <option>Professional</option>
          <option>Casual</option>
          <option>Inspirational</option>
          <option>Educational</option>
          <option>Storytelling</option>
        </Select>

        {/* Profession */}
        <Select label="Profession">
          <option>Teacher</option>
          <option>Student</option>
          <option>Founder</option>
          <option>Marketer</option>
          <option>Developer</option>
        </Select>

        {/* Post Date */}
        <Input label="Post Date" type="date" />

        {/* Post Time */}
        <Input label="Post Time" type="time" />

        {/* Word Count */}
        <Input label="Word Count" type="number" />

        {/* Previous LinkedIn Post */}
        <TextArea label="Share Your Previous LinkedIn Post" />

        {/* Custom Instructions */}
        <TextArea label="Custom Instructions" />

        {/* Upload Image */}
        <div style={{marginBottom:"20px"}}>
          <label>Upload Post Image</label><br/>
          <input type="file" style={inputStyle}/>
        </div>

        {/* Choose Image Grid */}
        <div style={{marginBottom:"20px"}}>
          <label>Choose Image Style</label>
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:"10px",
            marginTop:"10px"
          }}>
            {imageOptions.map((img)=>(
              <div
                key={img}
                onClick={()=>setSelectedImage(img)}
                style={{
                  padding:"15px",
                  border:selectedImage===img?"2px solid #FFD700":"1px solid gray",
                  textAlign:"center",
                  cursor:"pointer",
                  borderRadius:"8px"
                }}
              >
                {img}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          style={{
            padding:"12px 25px",
            background:"linear-gradient(90deg,#6a11cb,#2575fc)",
            border:"none",
            borderRadius:"30px",
            color:"white",
            fontSize:"16px",
            cursor:"pointer"
          }}
        >
          Submit
        </button>

      </form>
    </div>
  )
}

/* ---------- Reusable Components ---------- */

const inputStyle = {
  width:"100%",
  padding:"10px",
  marginTop:"5px",
  background:"#111",
  border:"1px solid gray",
  color:"white",
  borderRadius:"6px"
}

function Input({label,type}:{label:string,type:string}) {
  return (
    <div style={{marginBottom:"20px"}}>
      <label>{label}</label><br/>
      <input type={type} style={inputStyle}/>
    </div>
  )
}

function Select({label,children}:{label:string,children:any}) {
  return (
    <div style={{marginBottom:"20px"}}>
      <label>{label}</label><br/>
      <select style={inputStyle}>
        {children}
      </select>
    </div>
  )
}

function TextArea({label}:{label:string}) {
  return (
    <div style={{marginBottom:"20px"}}>
      <label>{label}</label><br/>
      <textarea rows={4} style={inputStyle}/>
    </div>
  )
}
