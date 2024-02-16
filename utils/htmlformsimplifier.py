from bs4 import BeautifulSoup
import json
with open("data/formtn.html") as f:
    html_content = f.read()
# soup = BeautifulSoup(html_content, 'html.parser')

def get_input_type(input_tag):
    # Mapping of input types to Python data types
    input_types = {
        'text': str,
        'password': str,
        'email': str,
        'number': float,
        'checkbox': bool,
        'radio': str,
        'date': str,  # You might want to handle dates differently
        'hidden': str,
    }
    return input_types.get(input_tag.get('type', '').lower(), str)

def html_form_to_json(html):
    soup = BeautifulSoup(html, 'html.parser')
    form_data = {}

    # Find all form elements
    form = soup.find('form')
    if form:
        for element in form.find_all(['input', 'select', 'textarea']):
            name = element.get('name')
            if name:
                value = element.get('value', '')
                input_type = get_input_type(element)
                if input_type == bool:
                    value = element.get('checked') == 'checked'
                form_data[name] = element.get('type', '').lower()

    return json.dumps(form_data)

print(html_form_to_json(html_content))