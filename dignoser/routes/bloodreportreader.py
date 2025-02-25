from fastapi import APIRouter, File, UploadFile, HTTPException
import easyocr
import cv2
import numpy as np
import io
from PIL import Image
from pathlib import Path 
router = APIRouter()
import os

# 1. Determine the directory of this file (bloodreportreader.py)
CUSTOM_OCR_DIR = "/tmp/.EasyOCR"
USER_NETWORK_DIR = os.path.join(CUSTOM_OCR_DIR, "user_network")

# Ensure both directories exist
Path(CUSTOM_OCR_DIR).mkdir(parents=True, exist_ok=True)
Path(USER_NETWORK_DIR).mkdir(parents=True, exist_ok=True)

# Initialize EasyOCR
reader = easyocr.Reader(
    ['en'],
    gpu=False,  # CPU only
    model_storage_directory=CUSTOM_OCR_DIR,
    user_network_directory=USER_NETWORK_DIR
)

# 4. Ensure both directories exist
Path(CUSTOM_OCR_DIR).mkdir(parents=True, exist_ok=True)
Path(USER_NETWORK_DIR).mkdir(parents=True, exist_ok=True)

# 5. Initialize EasyOCR with custom directories
reader = easyocr.Reader(
    ['en'],
    gpu=False,  # if you want CPU only
    model_storage_directory=CUSTOM_OCR_DIR,
    user_network_directory=USER_NETWORK_DIR
)

print("EasyOCR model directory:", CUSTOM_OCR_DIR)
print("EasyOCR user network directory:", USER_NETWORK_DIR)

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
