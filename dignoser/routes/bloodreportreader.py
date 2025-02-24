from fastapi import APIRouter, File, UploadFile, HTTPException
import easyocr
import cv2
import numpy as np
import io
from PIL import Image

router = APIRouter()

# ✅ Initialize EasyOCR reader (English)
reader = easyocr.Reader(['en'])

def preprocess_image(image: Image.Image) -> np.ndarray:
    """
    Convert PIL image to OpenCV format and apply preprocessing.
    """
    # Convert PIL image to OpenCV format
    image = np.array(image)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply adaptive thresholding to enhance text
    processed_image = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

    return processed_image

@router.post("/bloodreport/read")
async def read_blood_report(file: UploadFile = File(...)):
    """
    Extract structured text from a blood report image using OpenCV and EasyOCR.
    """
    # Check file format
    if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(status_code=400, detail="Invalid file format. Use JPG or PNG.")

    try:
        # Read file contents
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        # Preprocess image
        processed_image = preprocess_image(image)

        # Convert back to bytes for OCR
        _, encoded_image = cv2.imencode('.png', processed_image)

        # Perform OCR
        extracted_text = reader.readtext(encoded_image.tobytes(), detail=0)

        return {"text": extracted_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {e}")
