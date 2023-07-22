mkdir python
docker run -v "$PWD":/var/task lambci/lambda:build-python3.8 /bin/sh -c "pip install -r requirements.txt -t python"
zip -r function.zip lambda_function.py python/
