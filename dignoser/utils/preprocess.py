from PIL import Image
import numpy as np

def preprocess_image(image, size=(224, 224)):
    image = image.resize(size)  # Resize for model input
    image = np.array(image) / 255.0  # Normalize
    image = np.expand_dims(image, axis=0)  # Add batch dim
    return image
