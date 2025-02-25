from fastapi import FastAPI

# Initialize FastAPI app
app = FastAPI()

# ✅ Now include your existing routers
from fastapi import APIRouter, File, UploadFile, HTTPException
import numpy as np
from tensorflow import keras
from PIL import Image
import io

router = APIRouter()

# Load tumor model at startup
models = {}
try:
    models["tumor_model"] = keras.models.load_model("models/tumor_detectionmodel.keras",compile=False)
    print("✅ Tumor model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading tumor model: {e}")

TUMOR_CLASS_LABELS = {0: "Tumor Detected", 1: "No Tumor"}

def preprocess_image(image: Image.Image) -> np.ndarray:
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

@router.post("/predicttumor/{model_name}")
async def predict_tumor(model_name: str, file: UploadFile = File(...)):
    if model_name not in models:
        raise HTTPException(status_code=404, detail="Model not found!")
    
    if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(status_code=400, detail="Invalid file format. Use JPG or PNG.")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        image = preprocess_image(image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {e}")

    try:
        prediction = models[model_name].predict(image)[0][0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during prediction: {e}")

    threshold = 0.5
    predicted_label = TUMOR_CLASS_LABELS[int(prediction > threshold)]

    return {"model": model_name, "prediction": predicted_label, "probability": float(prediction)}

app.include_router(router)
