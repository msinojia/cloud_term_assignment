sudo rm -rf python initializer_function.zip
mkdir python
docker run -v "$PWD":/var/task lambci/lambda:build-python3.8 /bin/sh -c "pip install -r requirements.txt -t python"
zip -r initializer_function.zip lambda_function.py python/
