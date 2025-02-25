# Use an official lightweight Python image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy requirement files and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all files to the container
COPY . .

# Run FastAPI on Hugging Face Spaces
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]


#python -m uvicorn app:app --host 0.0.0.0 --port 7860