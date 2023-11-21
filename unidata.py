import pandas as pd
from thefuzz import fuzz
import json
import reference as ref;

SCHOOL_YEAR_START = 21
FILE_NAME = f'MERGED20{SCHOOL_YEAR_START}_{SCHOOL_YEAR_START + 1}_PP'

class UniversityData:
    def __init__(self):
        self.school_names = []
        with open(f'files/school_names.json', 'r') as file:
            self.school_names = json.load(file)['names']

        self.schools = {}
        with open(f'files/{FILE_NAME}.json', 'r') as file:
            self.schools = json.load(file)
        return

    # processes the file and stores only the important parts
    def process_file(self):
        df = pd.read_csv(f'files/{FILE_NAME}.csv', dtype='str') # reads in file
        df.fillna('n/a', inplace=True) # replace NULL with 'n/a'

        filtered_data = {} # school name : {header: value, etc}
        unfiltered_data = df.to_dict(orient='list') # dict --> key : column name, value : column values
        headers = ref.dict_headers # get all headers
        length = len(unfiltered_data['INSTNM'])

        for i in range(length):
            unfiltered_values = {}
            filtered_values = {}

            for header in range(len(headers)):
                unfiltered_values[headers[header]] = unfiltered_data[headers[header]][i]

            url = unfiltered_values['INSTURL']
            if url.startswith('www.'):
                unfiltered_values['INSTURL'] = 'https://' + url

            if unfiltered_values['NPT4_PUB'] == 'n/a':
                unfiltered_values = {k: v for k, v in unfiltered_values.items() if 'PUB' not in k}
            else:
                unfiltered_values = {k: v for k, v in unfiltered_values.items() if 'PRIV' not in k}
            if unfiltered_values['COSTT4_A'] == 'n/a':
                del unfiltered_values['COSTT4_A']
            else:
                del unfiltered_values['COSTT4_P']

            for key, value in unfiltered_values.items():
                try:
                    filtered_values[ref.key_filter[key]] = value
                except:
                    filtered_values[key] = value

            filtered_data[unfiltered_data['INSTNM'][i]] = filtered_values

        with open(f'files/{FILE_NAME}.json', 'w') as file:
            json.dump(filtered_data, file)
        return
    
    # returns the closest school name match
    def get_name_match(self, name_input):
        name_to_return = ''
        stored_similarity_value = 0
        for name in self.school_names:
            similarity_value = fuzz.token_sort_ratio(name_input, name)
            if (similarity_value > stored_similarity_value):
                stored_similarity_value = similarity_value
                name_to_return = name
        return name_to_return
    
    def process_school_data(self, data):
        try:
            for filter_name, filter_dict in ref.value_filter.items():
                data[filter_name] = filter_dict[data[filter_name]]
        except:
            return data
        return data

    def get_school_data(self, name_input):
        return self.process_school_data(self.schools[name_input])

'''ud = UniversityData()
ud.process_file()'''