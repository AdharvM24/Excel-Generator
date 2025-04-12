import { useState } from "react";
import PptxGenJS from "pptxgenjs";

const fontOptions = ["Arial", "Times New Roman", "Courier New", "Georgia"];
const alignOptions = ["left", "center", "right"];

function App() {
  const [slides, setSlides] = useState([
    {
      heading: "",
      headingFontSize: 28,
      headingColor: "#333333",
      headingFontFamily: "Arial",
      headingAlign: "center",
      content: "",
      contentFontSize: 18,
      contentColor: "#333333",
      contentFontFamily: "Arial",
      contentAlign: "left",
      image: null,
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...slides];
    updated[index][field] = value;
    setSlides(updated);
  };

  const handleImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...slides];
      updated[index].image = reader.result;
      setSlides(updated);
    };
    if (file) reader.readAsDataURL(file);
  };

  const addSlide = () => {
    setSlides([
      ...slides,
      {
        heading: "",
        headingFontSize: 28,
        headingColor: "#333333",
        headingFontFamily: "Arial",
        headingAlign: "center",
        content: "",
        contentFontSize: 18,
        contentColor: "#333333",
        contentFontFamily: "Arial",
        contentAlign: "left",
        image: null,
      },
    ]);
  };

  const generatePPT = () => {
    const pptx = new PptxGenJS();

    slides.forEach((slideData) => {
      const slide = pptx.addSlide();

      if (slideData.image) {
        slide.background = { data: slideData.image };
      }

      if (slideData.heading) {
        slide.addText(slideData.heading, {
          x: 0.5,
          y: 0.3,
          fontSize: parseInt(slideData.headingFontSize),
          color: slideData.headingColor,
          fontFace: slideData.headingFontFamily,
          bold: true,
          w: "90%",
          align: slideData.headingAlign,
        });
      }

      if (slideData.content) {
        slide.addText(slideData.content, {
          x: 0.5,
          y: 1.2, // Appears just below heading
          fontSize: parseInt(slideData.contentFontSize),
          color: slideData.contentColor,
          fontFace: slideData.contentFontFamily,
          w: "90%",
          h: 3, // height can be adjusted
          align: slideData.contentAlign || "center",
        });
      }
    });

    pptx.writeFile("custom-slides.pptx");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#333" }}>
          🎨 Custom Slide Generator
        </h1>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              marginBottom: "30px",
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "#fafafa",
            }}
          >
            <h3 style={{ fontSize: "18px", color: "#333" }}>
              Slide {index + 1}
            </h3>

            {/* Heading */}
            <input
              type="text"
              placeholder="Heading"
              value={slide.heading}
              onChange={(e) => handleChange(index, "heading", e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "10px",
              }}
            >
              <label>
                Font Size:
                <input
                  type="number"
                  value={slide.headingFontSize}
                  onChange={(e) =>
                    handleChange(index, "headingFontSize", e.target.value)
                  }
                  style={{
                    marginLeft: "5px",
                    width: "80px",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
              </label>
              <label>
                Text Color:
                <input
                  type="color"
                  value={slide.headingColor}
                  onChange={(e) =>
                    handleChange(index, "headingColor", e.target.value)
                  }
                  style={{
                    marginLeft: "5px",
                    padding: "8px",
                    borderRadius: "5px",
                  }}
                />
              </label>
              <label>
                Font:
                <select
                  value={slide.headingFontFamily}
                  onChange={(e) =>
                    handleChange(index, "headingFontFamily", e.target.value)
                  }
                  style={{
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                >
                  {fontOptions.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Align:
                <select
                  value={slide.headingAlign}
                  onChange={(e) =>
                    handleChange(index, "headingAlign", e.target.value)
                  }
                  style={{
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                >
                  {alignOptions.map((align) => (
                    <option key={align} value={align}>
                      {align}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Content */}
            <textarea
              placeholder="Content"
              rows="4"
              value={slide.content}
              onChange={(e) => handleChange(index, "content", e.target.value)}
              style={{
                width: "100%",
                marginBottom: "8px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "10px",
              }}
            >
              <label>
                Font Size:
                <input
                  type="number"
                  value={slide.contentFontSize}
                  onChange={(e) =>
                    handleChange(index, "contentFontSize", e.target.value)
                  }
                  style={{
                    marginLeft: "5px",
                    width: "80px",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
              </label>
              <label>
                Text Color:
                <input
                  type="color"
                  value={slide.contentColor}
                  onChange={(e) =>
                    handleChange(index, "contentColor", e.target.value)
                  }
                  style={{
                    marginLeft: "5px",
                    padding: "8px",
                    borderRadius: "5px",
                  }}
                />
              </label>
              <label>
                Font:
                <select
                  value={slide.contentFontFamily}
                  onChange={(e) =>
                    handleChange(index, "contentFontFamily", e.target.value)
                  }
                  style={{
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                >
                  {fontOptions.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Align:
                <select
                  value={slide.contentAlign}
                  onChange={(e) =>
                    handleChange(index, "contentAlign", e.target.value)
                  }
                  style={{
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                >
                  {alignOptions.map((align) => (
                    <option key={align} value={align}>
                      {align}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
              style={{ display: "block", marginBottom: "10px" }}
            />
            {slide.image && <p>✅ Background image selected</p>}

            {/* Slide Preview */}
            <div
              style={{
                border: "1px solid #ddd",
                height: "200px", // You can adjust this value
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                padding: "10px",
                marginTop: "10px",
                color: "#000",
                position: "relative",
                overflow: "auto", // Makes the content scrollable
              }}
            >
              <h3
                style={{
                  fontSize: `${slide.headingFontSize}px`,
                  color: slide.headingColor,
                  fontFamily: slide.headingFontFamily,
                  textAlign: slide.headingAlign,
                  margin: 0,
                }}
              >
                {slide.heading}
              </h3>
              <p
                style={{
                  fontSize: `${slide.contentFontSize}px`,
                  color: slide.contentColor,
                  fontFamily: slide.contentFontFamily,
                  textAlign: slide.contentAlign,
                  marginTop: "10px",
                }}
              >
                {slide.content}
              </p>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            onClick={addSlide}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ➕ Add Slide
          </button>
          <button
            onClick={generatePPT}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            📤 Generate PPT
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
