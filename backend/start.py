import os
import subprocess

# Install dependencies
subprocess.run(["pip", "install", "-r", "requirements.txt"])

# Start FastAPI server
subprocess.run(["uvicorn", "main:app", "--reload"])
