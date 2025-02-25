from fastapi import FastAPI, APIRouter, File, UploadFile, HTTPException
import numpy as np
from tensorflow import keras
from PIL import Image
import io
import tensorflow as tf

# Initialize FastAPI app
app = FastAPI()

router = APIRouter()

# Load all models at startup
models = {}
try:
    models["covid_model"] = keras.models.load_model("models/covid_model.keras",compile=False)
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    print("Make sure the model is saved as 'models/covid_model.keras'")

# Define class labels based on training generator
CLASS_LABELS = {0: "COVID", 1: "Not COVID"}  # Change if your training labels are reversed

# Function to preprocess the image (consistent with training)
def preprocess_image(image: Image.Image) -> np.ndarray:
    """
    Preprocesses the input image for model prediction.
    """
    if image.mode != "RGB":
        image = image.convert("RGB")
    target_size = (224, 224)  # Match model training size
    image = image.resize(target_size)
    image_array = np.array(image) / 255.0  # Normalize pixel values
    image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
    return image_array

@router.post("/predictcovid/{model_name}")
async def predict(model_name: str, file: UploadFile = File(...)):
    """
    Endpoint to make predictions using the specified model.
    """
    # Check if model exists
    if model_name not in models:
        raise HTTPException(status_code=404, detail="Model not found!")

    # Verify valid image format
    if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(
            status_code=400, detail="Invalid file format. Use JPG or PNG."
        )

    # Load and preprocess image
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        image = preprocess_image(image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {e}")

    # Make prediction
    try:
        prediction = models[model_name].predict(image)[0][0]  # Get probability
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during prediction: {e}")

    # Define threshold and interpret result
    threshold = 0.5  # Adjust if needed
    predicted_label = CLASS_LABELS[int(prediction > threshold)]

    return {"model": model_name, "prediction": predicted_label, "probability": float(prediction)}

# ✅ Include the router in FastAPI app
app.include_router(router)
