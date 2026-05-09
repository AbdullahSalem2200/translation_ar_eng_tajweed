from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load the translation model (Arabic to English)
translator = pipeline("translation", model="Helsinki-NLP/opus-mt-ar-en")

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    try:
        result = translator(text)
        translated_text = result[0]['translation_text']
        return jsonify({'translated_text': translated_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)