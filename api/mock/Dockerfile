# Use the official Miniconda3 image from the Docker Hub
FROM continuumio/miniconda3 AS dev

# Set the working directory in the container
WORKDIR /app

# Copy the environment.yml file into the container
COPY environment.yml .

# Create the environment
RUN conda env create -f environment.yml

# Activate the environment
SHELL ["conda", "run", "-n", "api.mock", "/bin/bash", "-c"]

# # Install Poetry
# RUN conda run -n api.mock pip install poetry

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies using Poetry
RUN conda run -n api.mock poetry install

FROM dev AS runtime

WORKDIR /app

# Activate the environment
SHELL ["conda", "run", "-n", "api.mock", "/bin/bash", "-c"]

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run app.py when the container launches
CMD ["conda", "run", "--no-capture-output", "-n", "api.mock", "poetry", "run", "python", "app.py"]
