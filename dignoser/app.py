import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["CUDA_VISIBLE_DEVICES"] = "-1" 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.predictcovid import router as predictcovid_router
from routes.predicttumour import router as predicttumour_router
from routes.predictpneumonia import router as predictpneumonia_router
from routes.bloodreportreader import router as bloodreport_router
from routes.readDoctor import router as readDoctor_router
# Initialize FastAPI app



app = FastAPI(
    title="Multi-Model API",
    description="API for multiple ML models"
)

# ✅ Add CORS Middleware (Allow access from anywhere)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Include the prediction routes
app.include_router(predictcovid_router)
app.include_router(predicttumour_router)
app.include_router(predictpneumonia_router)
app.include_router(bloodreport_router)
app.include_router(readDoctor_router)
@app.get("/")
def read_root():
    return {"message": "Welcome to the ML Model API!"}
