import csv

def csv_to_js_array(filename, output_filename):
    moves = []
    with open(filename, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            formatted_row = ', '.join(repr(str(item)) for item in row)
            moves.append(f"[{formatted_row}]")

    js_array_content = "const moves = [\n    " + ",\n    ".join(moves) + "\n];\n"

    with open(output_filename, 'w', encoding='utf-8') as jsfile:
        jsfile.write(js_array_content)

csv_to_js_array('moves.csv', 'moves.js')