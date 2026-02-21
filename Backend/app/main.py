#app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import setup_logging
from app.core.middleware import add_custom_middleware 
from app.database import engine, Base 

# Initialize logging
setup_logging()

# Create database tables(Optional: use Alembic for migrations in production)
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Medical Management System API",
    description="API for managing patients, doctors, appointments, billing, pharmacy, and reports",
    version="1.0.0"
)

# CORS configuration
origins = settings.BACKEND_CORS_ORIGINS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add custom middleware (Logging, authentication, etc.)
add_custom_middleware(app)

#include API routers (versioned)
app.include_router(api_router, prefix="/api/v1")

# Startup event 
@app.on_event("startup")
async def startup_event():
    print("Medical Management System API is starting up...")
    # Initialize Redis, cache, background tasks
    # await init_redis_pool()
    # await init_cache()

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    print("Medical Management System API is shutting down...")
    # Close database connections, Redis pool, etc.
    # await close_redis_pool()

#Root endpoint
@app.get("/", tags=["Root"])
def root():
    return {"message": "Welcome to the Medical Management System API!"}


