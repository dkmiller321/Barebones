import os
import subprocess

# Install dependencies
try:
    subprocess.run(["C:/Program Files/nodejs/npm.cmd", "install"], check=True)
except FileNotFoundError:
    print("npm is not installed or not found in the system PATH.")
except subprocess.CalledProcessError as e:
    print(f"An error occurred while running npm install: {e}")

# Start React development server
try:
    subprocess.run(["C:/Program Files/nodejs/npm.cmd", "start"], check=True)
except FileNotFoundError:
    print("npm is not installed or not found in the system PATH.")
except subprocess.CalledProcessError as e:
    print(f"An error occurred while running npm start: {e}")
