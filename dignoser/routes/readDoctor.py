import cv2
import numpy as np
from fastapi import APIRouter, File, UploadFile, HTTPException
import easyocr
import io
from PIL import Image

router = APIRouter()
reader = easyocr.Reader(['en'])

def preprocess_image(image: Image.Image):
    # Convert PIL image to OpenCV format
    image_cv = np.array(image)
    image_cv = cv2.cvtColor(image_cv, cv2.COLOR_RGB2GRAY)  # Convert to grayscale

    # Apply Adaptive Thresholding
    image_cv = cv2.adaptiveThreshold(image_cv, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                     cv2.THRESH_BINARY, 11, 2)

    # Apply Dilation to make text thicker
    kernel = np.ones((2, 2), np.uint8)
    image_cv = cv2.dilate(image_cv, kernel, iterations=1)

    return image_cv

@router.post("/doctorprescription/read")
async def read_doctor_prescription(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(status_code=400, detail="Invalid file format. Use JPG or PNG.")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        # Preprocess Image for OCR
        processed_img = preprocess_image(image)

        # Convert OpenCV image to bytes for OCR
        _, image_bytes = cv2.imencode(".png", processed_img)

        # Perform OCR
        extracted_text = reader.readtext(image_bytes.tobytes(), detail=0)

        return {"text": extracted_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {e}")
