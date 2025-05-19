
import PyPDF2
from google import genai

class PDFTextExtractor:
    def __init__(self, file_path, api_key):
        """
        Initializes the PDFTextExtractor with the path to the PDF file and Gemini API key.
        :param file_path: Path to the PDF file.
        :param api_key: Google Gemini API key.
        """
        self.file_path = file_path
        self.api_key = api_key
        
        # Initialize the Gemini client with the API key
        self.client = genai.Client(api_key=self.api_key)

    def extract_text(self):
        """
        Extracts text from the PDF file.
        :return: Extracted text as a string.
        """
        try:
            with open(self.file_path, 'rb') as pdf_file:
                reader = PyPDF2.PdfReader(pdf_file)
                text = ""
                for page in reader.pages:
                    text += page.extract_text()
                return text
        except FileNotFoundError:
            return "Error: File not found."
        except Exception as e:
            return f"An error occurred: {e}"

    def translate_to_english(self, text):
        """
        Translates the given text from Dutch to English using Gemini API.
        Handles text in appropriate chunk sizes for the API.
        :param text: Text in Dutch.
        :return: Translated text in English.
        """
        try:
            chunk_size = 10000
            chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
            
            translated_chunks = []
            for chunk in chunks:
                prompt = f"Translate the following Dutch text to English. Maintain the original formatting as much as possible:\n\n{chunk}"
                
                response = self.client.models.generate_content(
                    model="gemini-2.0-flash",
                    contents=[prompt]
                )
                
                translated_chunks.append(response.text)
            
            return " ".join(translated_chunks)
        except Exception as e:
            return f"An error occurred during translation with Gemini API: {e}"

# Example usage:
def main():
    # Replace with your actual Gemini API key
    API_KEY = "AIzaSyBDQfBKivNhofiw4_rqgQ46wMaf99XB6fM"
    
    extractor = PDFTextExtractor("E:/HealthcareProject/data/Bloedafname report-703469671.pdf", API_KEY)
    text = extractor.extract_text()
    print("Extracted Text:")
    print(text)

    translated_text = extractor.translate_to_english(text)
    print("\nTranslated Text:")
    print(translated_text)

# Run the main function
if __name__ == "__main__":
    main()