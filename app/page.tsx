'use client'
import { useState } from 'react'

export default function Home() {

  const [submitted,setSubmitted]=useState(false)
  const [images,setImages]=useState<any[]>([])
  const [selected,setSelected]=useState<string[]>([])
  const [search,setSearch]=useState("business")

  const webhookUrl = "http://localhost:5678/webhook/da707a5c-68f0-4d31-aac2-ba8e7c5d2dc6"

  const searchImages = async () => {
    const res = await fetch(/api/pexels?query=${search})
    const data = await res.json()
    setImages(data.photos)
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
      <div style={{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:"#fff",
        fontSize:"22px"
      }}>
        ✅ Form submitted. Your response has been recorded.
      </div>
    )
  }

  return(
    <div style={{background:"#fff",padding:"40px",fontFamily:"Arial"}}>
      <h1 style={{fontSize:"36px",fontWeight:"bold"}}>
        LinkedIn Post Planner
      </h1>
      <p style={{marginBottom:"30px"}}>
        Fill the details below for your post
      </p>

      <form onSubmit={handleSubmit}>

        <Input label="Full Name" name="fullName"/>
        <Input label="Email" name="email"/>
        <Input label="LinkedIn URL" name="linkedinUrl"/>
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

        {/* SEARCH IMAGES */}
        <div style={{marginBottom:"20px"}}>
          <input 
            placeholder="Search images..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            style={inputStyle}
          />
          <button type="button" onClick={searchImages}
            style={{marginTop:"10px",padding:"8px 15px"}}>
            Search Images
          </button>
        </div>

        {/* IMAGE GRID */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",
          gap:"10px",
          marginBottom:"30px"
        }}>
          {images.map((img:any)=>(
            <img
              key={img.id}
              src={img.src.medium}
              onClick={()=>toggleImage(img.src.medium)}
              style={{
                width:"100%",
                height:"150px",
                objectFit:"cover",
                cursor:"pointer",
                border:selected.includes(img.src.medium)
                  ?"3px solid blue"
                  :"2px solid #ddd"
              }}
            />
          ))}
        </div>

        <button type="submit"
          style={{
            padding:"12px 25px",
            background:"#4f46e5",
            color:"#fff",
            border:"none",
            borderRadius:"6px"
          }}>
          Submit
        </button>

      </form>
    </div>
  )
}

/* Components */

const inputStyle={
  width:"100%",
  padding:"10px",
  marginTop:"5px",
  border:"1px solid #ccc",
  borderRadius:"6px"
}

function Input({label,name,type="text"}:any){
  return(
    <div style={{marginBottom:"20px"}}>
      <label>{label}</label><br/>
      <input name={name} type={type} style={inputStyle}/>
    </div>
  )
}

function Select({label,name,children}:any){
  return(
    <div style={{marginBottom:"20px"}}>
      <label>{label}</label><br/>
      <select name={name} style={inputStyle}>
        {children}
      </select>
    </div>
  )
}

function TextArea({label,name}:any){
  return(
    <div style={{marginBottom:"20px"}}>
      <label>{label}</label><br/>
      <textarea name={name} rows={4} style={inputStyle}/>
    </div>
  )
}
