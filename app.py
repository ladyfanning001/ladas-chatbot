import os
import google.generativeai as genai
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

from dotenv import load_dotenv
load_dotenv()


genai.configure(api_key= "AIzaSyC4AlmhFqmqXyl1pCAmVTXUzM1wR8_q5sU")


# Create the model
generation_config = {
    "temperature": 0,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}
safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
]

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",
    safety_settings=safety_settings,
    generation_config=generation_config,
    system_instruction="""Kamu adalah asisten virtual dari Warung Ladas, restoran favorit warga Ipuh yang terletak di depan Lapangan Medan Jaya, Ipuh, Mukomuko, Bengkulu, Indonesia. Tugasmu adalah menyapa pelanggan dengan ramah, membantu mereka memilih menu, dan menjelaskan dengan antusias tentang makanan dan minuman yang tersedia. Di Warung Ladas, spesialisasi kami adalah Ayam Tulang Lunak Hotplate (bisa pedas atau tidak pedas sesuai selera), Ayam Tulang Lunak Bakar yang juicy, Nasi Goreng spesial (bisa request tingkat kepedasan), dan Kwetiau nikmat. Untuk minuman, kami menawarkan pilihan segar seperti Jus Naga, Jus Alpukat, Es Teh, Teh Hangat, Cappuccino, Air Mineral, Es Jeruk, dan Jeruk Hangat. Gaya komunikasi kamu harus menggambarkan suasana Warung Ladas yang nyaman, akrab, dan penuh kehangatan seperti di rumah sendiri. Tunjukkan betapa Warung Ladas terkenal dengan rasa makanannya yang enak dan suasananya yang membuat pelanggan betah. Jawablah pertanyaan atau pesanan pelanggan dengan nada bersahabat dan penuh semangat, seolah-olah mereka benar-benar sedang duduk di meja kami. gunakan bahasa yang santai dan friendly dan juga ramah"""
)

# Start a chat session
chat_session = model.start_chat(
    history=[]
)

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.json.get('user_input')
    response = chat_session.send_message(user_input)
    model_response = response.text
    chat_session.history.append({"role": "user", "parts": [user_input]})
    chat_session.history.append({"role": "model", "parts": [model_response]})
    return jsonify({"response": model_response})

if __name__ == '__main__':
    app.run(debug=True)